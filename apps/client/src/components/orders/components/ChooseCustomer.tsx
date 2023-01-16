import { useCustomers } from '@/components/customers/Customers.query'
import { ICustomer, ICustomerWithId } from '@/types/customer'
import { IOrderFormValues } from '@/types/order'
import clsx from 'clsx'
import { useFormikContext } from 'formik'

export default function ChooseCustomer() {
	const { data } = useCustomers()
	const { values, setFieldValue } = useFormikContext<IOrderFormValues>()
	return (
		<div className="max-w-2xl mx-auto">
			<h3 className="text-2xl mb-2 font-semibold">Choose Customer</h3>

			<div className="flex flex-col gap-4">
				{data?.map((customer: ICustomerWithId) => (
					<div
						key={customer.id}
						className={clsx('bg-white p-4 border-2 ', {
							'border-blue-400': customer.id === values?.customer?.id,
						})}
						onClick={() => setFieldValue('customer', customer)}
					>
						<p>{customer.firstName}</p>
						<p>{customer.emailId}</p>
					</div>
				))}
			</div>
		</div>
	)
}
