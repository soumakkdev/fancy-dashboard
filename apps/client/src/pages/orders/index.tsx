import ViewOrders from '@/components/orders/ViewOrders'
import Page from '@/lib/Page'
import React from 'react'

export default function OrdersPage() {
	return (
		<Page title="Orders">
			<ViewOrders />
		</Page>
	)
}
