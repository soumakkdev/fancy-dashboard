import { IOrderItem } from '@/types/product'

export const getOrderPriceInfo = (selectedProducts: IOrderItem[]) => {
	const subtotal = selectedProducts?.reduce((subtotal, product) => {
		return (subtotal += Number(product?.price) * product?.quantity)
	}, 0)
	const discount = 5
	const total = subtotal - (subtotal / 100) * discount

	return {
		subtotal,
		discount,
		total,
	}
}
