import { cva, VariantProps } from 'class-variance-authority'
import React, { HTMLAttributes, HTMLInputTypeAttribute } from 'react'

const inputStyles = cva('block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm')

interface InputFieldProps extends HTMLAttributes<HTMLInputElement>, VariantProps<typeof inputStyles> {
	label?: string
	name?: string
	type?: HTMLInputTypeAttribute
	error?: string | boolean
}

export function InputField(props: InputFieldProps) {
	const { label, name, type = 'text', error, ...rest } = props

	return (
		<div>
			{label ? (
				<label htmlFor={name} className="block text-sm font-medium text-gray-700">
					{label}
				</label>
			) : null}

			<div className="mt-1">
				<input {...rest} type={type} name={name} id={name} className={inputStyles()} />
			</div>

			{error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}
		</div>
	)
}
