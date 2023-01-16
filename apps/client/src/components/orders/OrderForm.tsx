import DashboardLayout from '@/components/layout/DashboardLayout'
import { IOrderFormValues, IOrderReqBody } from '@/types/order'
import { FormikProvider, useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from 'ui'
import ChooseCustomer from './components/ChooseCustomer'
import ChooseProduct from './components/ChooseProduct'
import OrderSummary from './components/OrderSummary'
import { usePlaceOrder } from './Orders.query'
import { getOrderPriceInfo } from './Orders.utils'

export default function OrderForm() {
	const router = useRouter()
	const [step, setStep] = useState(0)
	const { mutate: placeOrder } = usePlaceOrder()
	const formik = useFormik({
		initialValues: {
			products: [],
			customer: null,
		},
		onSubmit,
	})

	function onSubmit(values: IOrderFormValues) {
		const priceInfo = getOrderPriceInfo(values.products)
		const body: IOrderReqBody = {
			...priceInfo,
			customerId: values.customer?.id as string,
			products: values?.products?.map((product) => ({
				productId: product.id,
				quantity: product.quantity,
			})),
		}

		placeOrder(
			{
				body,
			},
			{
				onSuccess: () => {
					toast.success('Order placed successfully')
				},
				onError: () => {
					toast.error('Failed to create order')
				},
			}
		)
	}

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
	const goBack = useCallback(() => router.back(), [router])

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
				config.onConfirm = formik.handleSubmit
				break

			default:
				return
		}
		return config
	}, [step, formik.handleSubmit, goBack])

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
