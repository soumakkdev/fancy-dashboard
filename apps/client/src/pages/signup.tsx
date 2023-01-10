import { useAuth } from '@/lib/AuthContext'
import { FormikField } from '@/lib/FormikField'
import { ISignupSchema, ZSignupSchema } from '@/types/auth'
import { Form, FormikProvider, useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { Button, Checkbox, InputField } from 'ui'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export default function SignupPage() {
	const { signup } = useAuth()
	const router = useRouter()
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			password: '',
		},
		validationSchema: toFormikValidationSchema(ZSignupSchema),
		onSubmit,
	})

	async function onSubmit(values: ISignupSchema) {
		try {
			await signup(values)
			router.push('/')
		} catch (err) {
			toast.error('Signup failed')
		}
	}

	return (
		<div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Create a new account</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl sm:px-10">
					<FormikProvider value={formik}>
						<Form className="space-y-6">
							<FormikField name="name">
								<InputField label="Name" />
							</FormikField>

							<FormikField name="email">
								<InputField label="Email" />
							</FormikField>

							<FormikField name="password">
								<InputField label="Password" />
							</FormikField>

							<div className="flex items-center justify-between">
								<FormikField name="happy">
									<Checkbox label="Are you happy?" />
								</FormikField>
							</div>

							<Button type="submit" fullWidth>
								Sign up
							</Button>

							<p className="text-sm text-center text-slate-600">
								Already have an account?{' '}
								<Link href="/login" className="text-blue-600">
									Login
								</Link>
							</p>
						</Form>
					</FormikProvider>
				</div>
			</div>
		</div>
	)
}
