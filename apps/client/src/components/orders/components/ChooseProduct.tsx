import { useProducts } from '@/components/products/Products.query'
import { IOrderFormValues } from '@/types/order'
import { IProductWithId } from '@/types/product'
import { useFormikContext } from 'formik'
import { Button } from 'ui'

export default function ChooseProduct() {
	const { data } = useProducts()
	const { values, setFieldValue } = useFormikContext<IOrderFormValues>()

	function handleAddProduct(product: IProductWithId) {
		setFieldValue(
			'products',
			values?.products?.concat([
				{
					...product,
					quantity: 1,
				},
			])
		)
	}

	function handleRemoveProduct(product: IProductWithId) {
		setFieldValue(
			'products',
			values?.products?.filter((p) => p.id !== product.id)
		)
	}

	return (
		<div className="max-w-2xl mx-auto">
			<h3 className="text-2xl mb-2 font-semibold">Choose Products</h3>

			<div className="flex flex-col gap-4">
				{data?.map((product: IProductWithId) => (
					<div key={product.id} className={'bg-white p-4 border-2 flex items-start justify-between'}>
						<div>
							<p>{product.name}</p>
							<p>{product.sku}</p>
						</div>
						<div>
							<p>{product.price}</p>
							{values?.products?.find((p) => p.id === product.id) ? (
								<Button variant="secondary" size="small" onClick={() => handleRemoveProduct(product)}>
									Remove
								</Button>
							) : (
								<Button variant="secondary" size="small" onClick={() => handleAddProduct(product)}>
									Add
								</Button>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
