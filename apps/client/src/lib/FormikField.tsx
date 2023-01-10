import { useField, FieldInputProps, FieldMetaProps } from 'formik'
import React, { ReactElement } from 'react'

type RenderProps = (field: FieldInputProps<any>, meta: FieldMetaProps<any>) => void

interface IField {
	children?: RenderProps | ReactElement
	name: string
	required?: boolean
	defaultValue?: string | number | readonly string[]
}

export const FormikField = (props: IField) => {
	const { children, name, required, defaultValue } = props
	const [field, meta, helpers] = useField({
		name,
		required,
		defaultValue,
	})

	const fieldProps = { ...field, error: (meta.touched && meta.error) || undefined }

	if (typeof children === 'function') {
		return <>{children(field, meta)}</>
	} else {
		const childrenWithProps = React.Children.map(children, (child) => {
			if (React.isValidElement(child)) {
				return React.cloneElement(child, fieldProps)
			}
			return child
		})
		return <>{childrenWithProps}</>
	}
}
