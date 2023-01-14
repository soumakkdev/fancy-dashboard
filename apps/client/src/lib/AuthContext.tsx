import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import nookies from 'nookies'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ILoginSchema, ISignupSchema } from '../types/auth'
import { auth } from './firebase/client'
import { httpRequest, httpRequestWithAuth } from './helpers'

interface IAuthContext {
	login: (params: ILoginSchema) => void
	signup: (params: ISignupSchema) => void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = (props: { children: ReactNode }) => {
	const [user, setUser] = useState(null)

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (!user) {
				setUser(null)
				nookies.set(undefined, 'token', '', { path: '/' })
			} else {
				const token = await user.getIdToken()
				if (token) {
					nookies.set(undefined, 'token', token, { path: '/' })

					const res = await httpRequestWithAuth('GET', '/auth/profile')
					setUser(res.data)
				}
			}
		})
	}, [])

	function login(params: ILoginSchema) {
		return signInWithEmailAndPassword(auth, params.email, params.password)
	}

	async function signup(params: ISignupSchema) {
		try {
			const { email, password, name, happy } = params
			const res = await createUserWithEmailAndPassword(auth, email, password)

			await httpRequest('POST', '/auth/signup', {
				name,
				email,
				uid: res.user.uid,
				happy,
			})
		} catch (error) {
			throw error
		}
	}

	const contextValues = { login, signup }

	return <AuthContext.Provider value={contextValues}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
