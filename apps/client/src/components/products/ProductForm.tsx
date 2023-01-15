import { FormikField } from '@/lib/FormikField'
import { IProduct } from '@/types/product'
import { FormikProvider, useFormik } from 'formik'
import React from 'react'
import { toast } from 'react-hot-toast'
import { Drawer, InputField } from 'ui'
import { useSaveProduct } from './Products.query'

interface IProductForm {
	open: boolean
	onClose: () => void
}

export default function ProductForm(props: IProductForm) {
	const { open, onClose } = props
	const { mutate: saveProduct } = useSaveProduct()

	const formik = useFormik({
		initialValues: {
			name: 'Adidas black',
			description: 'What?',
			sku: 'HYHRT345',
			price: '8900',
			image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/705c072d-0c30-49b3-81ce-42e95b118e31/pegasus-39-road-running-shoes-kmZSD6.png',
			status: 'active',
		},
		onSubmit,
	})

	function onSubmit(values: IProduct) {
		saveProduct(
			{ body: values },
			{
				onSuccess: () => {
					toast.success('Product created successfully')
				},
				onError: () => {
					toast.error('Failed to create product')
				},
			}
		)
	}

	return (
		<FormikProvider value={formik}>
			<Drawer title="Add Product" open={open} onClose={onClose} onConfirm={formik.handleSubmit}>
				<div className="flex flex-col gap-4">
					<FormikField name="name">
						<InputField label="Name" />
					</FormikField>
					<FormikField name="description">
						<InputField label="Description" />
					</FormikField>
					<FormikField name="sku">
						<InputField label="SKU" />
					</FormikField>
					<FormikField name="price">
						<InputField label="Price" />
					</FormikField>
					<FormikField name="status">
						<InputField label="Status" />
					</FormikField>
				</div>
			</Drawer>
		</FormikProvider>
	)
}
