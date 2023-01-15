import { useProducts } from '@/components/products/Products.query'
import { IProduct } from '@/types/product'
import { useAtom } from 'jotai'
import { Button } from 'ui'
import { selectedProductsAtom } from '../Orders.utils'

export default function ChooseProduct() {
	const { data } = useProducts()
	const [selectedProducts, setSelectedProducts] = useAtom(selectedProductsAtom)

	function handleAddProduct(product: IProduct) {
		setSelectedProducts((products) => {
			return products?.concat([
				{
					productId: product.id,
					quantity: 1,
				},
			])
		})
	}

	function handleRemoveProduct(product: IProduct) {
		setSelectedProducts((products) => {
			return products?.filter((p) => p.productId !== product.id)
		})
	}

	return (
		<div className="max-w-2xl mx-auto">
			<h3 className="text-2xl mb-2 font-semibold">Choose Customer</h3>

			<div className="flex flex-col gap-4">
				{data?.map((product: IProduct) => (
					<div key={product.id} className={'bg-white p-4 border-2 flex items-start justify-between'}>
						<div>
							<p>{product.name}</p>
							<p>{product.sku}</p>
						</div>
						<div>
							<p>{product.price}</p>
							{selectedProducts?.find((p) => p.productId === product.id) ? (
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
