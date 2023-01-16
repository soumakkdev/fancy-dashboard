import { IOrderFormValues } from '@/types/order'
import { useFormikContext } from 'formik'
import { getOrderPriceInfo } from '../Orders.utils'

export default function OrderSummary() {
	const { values } = useFormikContext<IOrderFormValues>()
	const priceInfo = getOrderPriceInfo(values?.products)

	return (
		<div className="max-w-3xl mx-auto grid grid-cols-3 gap-4">
			<div className="bg-white flex flex-col divide-y col-span-2">
				{values?.products?.map((product) => (
					<div key={product.id} className="p-3">
						<p>{product.name}</p>
						<p>{product.sku}</p>
					</div>
				))}
			</div>

			<div className="flex flex-col gap-4">
				<div className="bg-white p-4">
					<p>{values?.customer?.firstName}</p>
					<p>{values?.customer?.emailId}</p>
				</div>
				<div className="bg-white p-4">
					<p>{values?.customer?.payment.number}</p>
					<p>{values?.customer?.payment.cvv}</p>
				</div>

				<div className="bg-white p-4">
					<div className="flex items-center justify-between">
						<p>Subtotal</p>
						<p>{priceInfo.subtotal}</p>
					</div>
					<div className="flex items-center justify-between">
						<p>Discount</p>
						<p>{priceInfo.discount}%</p>
					</div>
					<div className="flex items-center justify-between border-t border-gray-100 mt-2 pt-2">
						<p>Total</p>
						<p>{priceInfo.total}</p>
					</div>
				</div>
			</div>
		</div>
	)
}
