import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import Cookies from 'js-cookie'
import { createContext, ReactNode, useContext, useEffect } from 'react'
import { ILoginSchema, ISignupSchema } from '../types/auth'
import { auth } from './firebase'

interface IAuthContext {
	login: (params: ILoginSchema) => void
	signup: (params: ISignupSchema) => void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = (props: { children: ReactNode }) => {
	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (user) {
				const token = await user.getIdToken()
				if (token) {
					Cookies.set('token', token)
				}
			}
		})
	}, [])

	async function login(params: ILoginSchema) {
		await signInWithEmailAndPassword(auth, params.email, params.password)
	}

	async function signup(params: ISignupSchema) {
		const { email, password } = params
		await createUserWithEmailAndPassword(auth, email, password)
	}

	const contextValues = { login, signup }

	return <AuthContext.Provider value={contextValues}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
