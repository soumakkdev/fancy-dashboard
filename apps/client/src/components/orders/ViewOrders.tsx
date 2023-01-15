import { useRouter } from 'next/router'
import React from 'react'
import { Button } from 'ui'
import DashboardLayout from '../layout/DashboardLayout'

export default function ViewOrders() {
	const router = useRouter()
	return <DashboardLayout title="Orders" action={<Button onClick={() => router.push('/orders/add')}>Add Order</Button>}></DashboardLayout>
}
