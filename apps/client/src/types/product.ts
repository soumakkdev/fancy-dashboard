export interface IProduct {
	name: string
	description: string
	sku: string
	price: number
	image: string
	status: string
}

export interface IProductWithId extends IProduct {
	id: string
}

export interface IOrderItem extends IProductWithId {
	quantity: number
}
