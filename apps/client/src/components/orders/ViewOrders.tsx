import { IOrder } from '@/types/order'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import React from 'react'
import { Button, Table } from 'ui'
import DashboardLayout from '../layout/DashboardLayout'
import { useOrders } from './Orders.query'

export default function ViewOrders() {
	const router = useRouter()
	const { data, isLoading, isError } = useOrders()
	console.log(data)
	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return <p>Something went wrong</p>
	}

	return (
		<DashboardLayout title="Orders" action={<Button onClick={() => router.push('/orders/add')}>Add Order</Button>}>
			<Table columns={getColumns()} data={data} />
		</DashboardLayout>
	)
}

function getColumns() {
	const columnHelper = createColumnHelper<IOrder>()

	const columns = [
		columnHelper.accessor('customer.firstName', {
			header: 'Customer',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('items', {
			header: 'Item Count',
			cell: (info) => info.getValue().length,
		}),
		columnHelper.accessor('total', {
			header: 'Total',
			cell: (info) => info.getValue(),
		}),
	]

	return columns
}
