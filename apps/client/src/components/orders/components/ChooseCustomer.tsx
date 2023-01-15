import { useCustomers } from '@/components/customers/Customers.query'
import { ICustomer } from '@/types/customer'

export default function ChooseCustomer() {
	const { data } = useCustomers()
	return (
		<div className="max-w-2xl mx-auto">
			<h3 className="text-2xl mb-2 font-semibold">Choose Customer</h3>

			<div className="flex flex-col gap-4">
				{data?.map((customer: ICustomer) => (
					<div key={customer.id} className="bg-white p-4">
						<p>{customer.firstName}</p>
						<p>{customer.emailId}</p>
					</div>
				))}
			</div>
		</div>
	)
}
