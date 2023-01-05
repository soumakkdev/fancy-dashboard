import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { createContext, ReactNode, useContext } from 'react'
import { ILoginSchema, ISignupSchema } from '../types/auth'
import { auth } from './firebase'

interface IAuthContext {
	login: (params: ILoginSchema) => void
	signup: (params: ISignupSchema) => void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = (props: { children: ReactNode }) => {
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
