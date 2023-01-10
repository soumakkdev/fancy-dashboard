import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import Cookies from 'js-cookie'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ILoginSchema, ISignupSchema } from '../types/auth'
import { auth } from './firebase'
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
			if (user) {
				const token = await user.getIdToken()
				if (token) {
					Cookies.set('token', token)

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
