import { ICustomer, ICustomerWithId } from './customer'
import { IOrderItem, IProduct } from './product'

export interface IOrderReqBody {
	customerId: string
	discount: number
	subtotal: number
	total: number
	products: {
		productId: string
		quantity: number
	}[]
}

export interface IOrder {
	id?: string
	cutomerId: string
	subtotal: number
	discount: number
	total: number
	customer: ICustomer
	items: {
		id: string
		quantity: number
		productId: string
		orderId: string
		product: IProduct
	}[]
}

export interface IOrderFormValues {
	customer: ICustomerWithId | null
	products: IOrderItem[]
}
