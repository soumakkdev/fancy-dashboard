import { FormikField } from '@/lib/FormikField'
import { useFormik, FormikProvider } from 'formik'
import { toast } from 'react-hot-toast'
import { Button, InputField } from 'ui'
import DashboardLayout from '../layout/DashboardLayout'
import { useSaveCustomer } from './Customers.query'

export default function CustomerForm() {
	const { mutate: saveCustomer } = useSaveCustomer()
	const formik = useFormik({
		initialValues: {},
		onSubmit,
	})

	function onSubmit(values) {
		saveCustomer(
			{
				body: values,
			},
			{
				onSuccess: () => {
					toast.success('Customer created successfully')
				},
				onError: () => {
					toast.error('Failed to create customer')
				},
			}
		)
	}

	return (
		<FormikProvider value={formik}>
			<DashboardLayout
				title="Add Customer"
				action={
					<>
						<Button variant="secondary">Cancel</Button>
						<Button onClick={() => formik.handleSubmit()}>Submit</Button>
					</>
				}
			>
				<div className="max-w-2xl mx-auto flex flex-col gap-4">
					<div className="bg-white flex flex-col gap-3 p-8">
						<h3 className="text-gray-400 uppercase">Profile Info</h3>
						<div className="grid grid-cols-2 gap-4">
							<FormikField name="firstName">
								<InputField label="First Name" />
							</FormikField>
							<FormikField name="lastName">
								<InputField label="Last Name" />
							</FormikField>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<FormikField name="emailId">
								<InputField label="Email Address" />
							</FormikField>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<FormikField name="callingCode">
								<InputField label="Calling Code" />
							</FormikField>
							<FormikField name="mobileNo">
								<InputField label="Mobile Number" />
							</FormikField>
						</div>
					</div>

					<div className="bg-white flex flex-col gap-3 p-8">
						<h3 className="text-gray-400 uppercase">Address Info</h3>
						<FormikField name="address.address">
							<InputField label="Address" />
						</FormikField>
						<div className="grid grid-cols-2 gap-4">
							<FormikField name="address.city">
								<InputField label="City" />
							</FormikField>
							<FormikField name="address.state">
								<InputField label="State" />
							</FormikField>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<FormikField name="address.country">
								<InputField label="Country" />
							</FormikField>
							<FormikField name="address.pinCode">
								<InputField label="Pin Code" />
							</FormikField>
						</div>
					</div>

					<div className="bg-white flex flex-col gap-3 p-8">
						<h3 className="text-gray-400 uppercase">Payment Info</h3>
						<div className="grid grid-cols-2 gap-4">
							<FormikField name="payment.number">
								<InputField label="Card Number" />
							</FormikField>
							<FormikField name="payment.name">
								<InputField label="Card Name" />
							</FormikField>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<FormikField name="payment.expiry">
								<InputField label="Expiry Date" />
							</FormikField>
							<FormikField name="payment.cvv">
								<InputField label="CVV" />
							</FormikField>
						</div>
					</div>

					<div className="bg-white flex flex-col gap-3 p-8">
						<h3 className="text-gray-400 uppercase">Others Info</h3>
						<div className="grid grid-cols-2 gap-4">
							<FormikField name="status">
								<InputField label="Status" />
							</FormikField>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<InputField label="Notes" />
						</div>
					</div>
				</div>
			</DashboardLayout>
		</FormikProvider>
	)
}
