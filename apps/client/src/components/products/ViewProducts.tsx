import { IProduct } from '@/types/product'
import { createColumnHelper } from '@tanstack/react-table'
import { useState } from 'react'
import { Button, Table } from 'ui'
import DashboardLayout from '../layout/DashboardLayout'
import ProductForm from './ProductForm'
import { useProducts } from './Products.query'

export default function ViewProducts() {
	const [isAddProductDrawerOpen, setIsAddProductDrawerOpen] = useState(false)
	const { data, isLoading, isError } = useProducts()

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return <p>Something went wrong</p>
	}

	return (
		<DashboardLayout title="Products" action={<Button onClick={() => setIsAddProductDrawerOpen(true)}>Add Product</Button>}>
			<Table columns={getColumns()} data={data} />

			<ProductForm open={isAddProductDrawerOpen} onClose={() => setIsAddProductDrawerOpen(false)} />
		</DashboardLayout>
	)
}

function getColumns() {
	const columnHelper = createColumnHelper<IProduct>()

	const columns = [
		columnHelper.accessor('name', {
			header: 'Product Name',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('sku', {
			header: 'SKU',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('price', {
			header: 'Price',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('status', {
			header: 'Status',
			cell: (info) => info.getValue(),
		}),
	]

	return columns
}
