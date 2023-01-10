import DashboardLayout from '@/components/layout/DashboardLayout'
import Page from '@/lib/Page'
import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'ui'

export default function CustomersPage() {
	const router = useRouter()

	function handleAddCustomerClick() {
		router.push('/customers/add')
	}

	return (
		<Page title="Customers">
			<DashboardLayout title="Customers" action={<Button onClick={handleAddCustomerClick}>Add Customer</Button>}></DashboardLayout>
		</Page>
	)
}
