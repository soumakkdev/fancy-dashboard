import DashboardLayout from '@/components/layout/DashboardLayout'
import { FormikProvider, useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
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

	const getActionConfig = useMemo(() => {
		const config: any = {}
		switch (step) {
			case 0:
				config.cancelBtnTxt = 'Cancel'
				config.confirmBtnTxt = 'Next'
				config.onCancel = goBack
				config.onConfirm = nextStep
				break
			case 1:
				config.cancelBtnTxt = 'Back'
				config.confirmBtnTxt = 'Next'
				config.onCancel = prevStep
				config.onConfirm = nextStep
				break
			case 2:
				config.cancelBtnTxt = 'Back'
				config.confirmBtnTxt = 'Place Order'
				config.onCancel = prevStep
				config.onConfirm = () => {}
				break

			default:
				return
		}
		return config
	}, [step])

	return (
		<FormikProvider value={formik}>
			<DashboardLayout
				title="Add Order"
				action={
					<>
						<Button variant="secondary" onClick={getActionConfig.onCancel}>
							{getActionConfig.cancelBtnTxt}
						</Button>
						<Button variant="primary" onClick={getActionConfig.onConfirm}>
							{getActionConfig.confirmBtnTxt}
						</Button>
					</>
				}
			>
				{getStepFragment()}
			</DashboardLayout>
		</FormikProvider>
	)
}
