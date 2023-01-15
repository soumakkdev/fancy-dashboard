import { ICustomer } from '@/types/customer'
import { createColumnHelper } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { Button, Table } from 'ui'
import DashboardLayout from '../layout/DashboardLayout'
import { useCustomers } from './Customers.query'

export default function ViewCustomers() {
	const router = useRouter()
	const { data, isLoading, isError } = useCustomers()

	function handleAddCustomerClick() {
		router.push('/customers/add')
	}

	if (isLoading) {
		return <p>Loading...</p>
	}

	if (isError) {
		return <p>Something went wrong</p>
	}

	return (
		<DashboardLayout title="Customers" action={<Button onClick={handleAddCustomerClick}>Add Customer</Button>}>
			<Table columns={getColumns()} data={data} />
		</DashboardLayout>
	)
}

function getColumns() {
	const columnHelper = createColumnHelper<ICustomer>()

	const columns = [
		columnHelper.accessor('firstName', {
			header: 'First Name',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('lastName', {
			header: 'Last Name',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('emailId', {
			header: 'Email Id',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('address.country', {
			header: 'Country',
			cell: (info) => info.getValue(),
		}),
	]

	return columns
}
