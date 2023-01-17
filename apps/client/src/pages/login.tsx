import { FormikField } from '@/lib/FormikField'
import { Form, FormikProvider, useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next/types'
import toast from 'react-hot-toast'
import { Button, Checkbox, InputField } from 'ui'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { useAuth } from '../lib/AuthContext'
import { ILoginSchema, ZLoginSchema } from '../types/auth'
import nookies from 'nookies'

export default function LoginPage() {
	const { login } = useAuth()
	const router = useRouter()
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: toFormikValidationSchema(ZLoginSchema),
		onSubmit,
	})

	async function onSubmit(values: ILoginSchema) {
		try {
			await login(values)
			router.push('/')
		} catch (error) {
			toast.error('Login failed')
		}
	}

	return (
		<div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white p-8 sm:px-10">
					<FormikProvider value={formik}>
						<Form className="space-y-6">
							<FormikField name="email">
								<InputField label="Email" size="large" />
							</FormikField>

							<FormikField name="password">
								<InputField label="Password" type="password" size="large" />
							</FormikField>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<Checkbox label="Agree all terms" name="agree" />
								</div>
							</div>

							<Button type="submit" size="large" fullWidth>
								Sign in
							</Button>

							<p className="text-sm text-center text-slate-600">
								Don&apos;t have an account?{' '}
								<Link href="/signup" className="text-blue-600">
									Create an account
								</Link>
							</p>
						</Form>
					</FormikProvider>
				</div>
			</div>
		</div>
	)
}
