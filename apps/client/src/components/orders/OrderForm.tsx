import DashboardLayout from '@/components/layout/DashboardLayout'
import { FormikProvider, useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { Button } from 'ui'
import ChooseCustomer from './components/ChooseCustomer'
import ChooseProduct from './components/ChooseProduct'
import OrderSummary from './components/OrderSummary'

export default function OrderForm() {
	const router = useRouter()
	const [step, setStep] = useState(0)
	const formik = useFormik({
		initialValues: {},
		onSubmit,
	})

	function onSubmit() {}

	const getStepFragment = useCallback(() => {
		switch (step) {
			case 0:
				return <ChooseCustomer />
			case 1:
				return <ChooseProduct />
			case 2:
				return <OrderSummary />
			default:
				return null
		}
	}, [step])

	const nextStep = () => setStep((s) => s + 1)
	const prevStep = () => setStep((s) => s - 1)
	const goBack = () => router.back()

	const getActionFragment = useCallback(() => {
		switch (step) {
			case 0:
				return (
					<>
						<Button variant="secondary" onClick={goBack}>
							Cancel
						</Button>
						<Button onClick={nextStep}>Next</Button>
					</>
				)
			case 1:
				return (
					<>
						<Button variant="secondary" onClick={prevStep}>
							Back
						</Button>
						<Button onClick={nextStep}>Next</Button>
					</>
				)
			case 2:
				return (
					<>
						<Button variant="secondary" onClick={prevStep}>
							Back
						</Button>
						<Button>Place Order</Button>
					</>
				)
			default:
				return null
		}
	}, [step])

	return (
		<FormikProvider value={formik}>
			<DashboardLayout title="Add Order" action={getActionFragment()}>
				{getStepFragment()}
			</DashboardLayout>
		</FormikProvider>
	)
}
