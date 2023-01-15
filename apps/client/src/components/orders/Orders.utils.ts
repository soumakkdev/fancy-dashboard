import { ICustomer } from '@/types/customer'
import { IOrderItem } from '@/types/product'
import { atom } from 'jotai'

export const selectedCustomerAtom = atom<ICustomer | null>(null)

export const selectedProductsAtom = atom<IOrderItem[]>([])
