export interface IProduct {
	id: string
	name: string
	description: string
	sku: string
	price: string
	image: string
	status: string
}

export interface IOrderItem {
	productId: string
	quantity: number
}
