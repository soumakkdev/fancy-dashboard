import OrderForm from '@/components/orders/OrderForm'
import Page from '@/lib/Page'
import React from 'react'

export default function AddOrderPage() {
	return (
		<Page title="Add Order">
			<OrderForm />
		</Page>
	)
}
