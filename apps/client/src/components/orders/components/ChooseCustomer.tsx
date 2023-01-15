import { useCustomers } from '@/components/customers/Customers.query'
import { ICustomer } from '@/types/customer'
import clsx from 'clsx'
import { useAtom } from 'jotai'
import { selectedCustomerAtom } from '../Orders.utils'

export default function ChooseCustomer() {
	const { data } = useCustomers()
	const [selectedCustomer, setSelectedCustomer] = useAtom(selectedCustomerAtom)
	return (
		<div className="max-w-2xl mx-auto">
			<h3 className="text-2xl mb-2 font-semibold">Choose Customer</h3>

			<div className="flex flex-col gap-4">
				{data?.map((customer: ICustomer) => (
					<div
						key={customer.id}
						className={clsx('bg-white p-4 border-2 ', {
							'border-blue-400': customer.id === selectedCustomer?.id,
						})}
						onClick={() => setSelectedCustomer(customer)}
					>
						<p>{customer.firstName}</p>
						<p>{customer.emailId}</p>
					</div>
				))}
			</div>
		</div>
	)
}
