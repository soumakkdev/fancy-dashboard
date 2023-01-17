import { cva, VariantProps } from 'class-variance-authority'
import React, { HTMLAttributes, HTMLInputTypeAttribute } from 'react'

const inputStyles = cva('block border-black/20 focus:border-brand focus:ring-brand', {
	variants: {
		size: {
			small: 'h-[34px] text-sm',
			medium: 'h-[40px]',
			large: 'h-[48px]',
		},
		fullWidth: {
			true: 'w-full',
		},
		danger: {
			true: 'border-red-600 ',
		},
	},
	defaultVariants: {
		size: 'medium',
		fullWidth: true,
	},
})

interface InputFieldProps extends HTMLAttributes<HTMLInputElement>, VariantProps<typeof inputStyles> {
	label?: string
	name?: string
	type?: HTMLInputTypeAttribute
	error?: string | boolean
}

export function InputField(props: InputFieldProps) {
	const { label, name, size, fullWidth, type = 'text', error, ...rest } = props

	return (
		<div>
			{label ? (
				<label htmlFor={name} className="block text-sm font-medium text-gray-700">
					{label}
				</label>
			) : null}

			<div className="mt-1">
				<input {...rest} type={type} name={name} id={name} className={inputStyles({ size, fullWidth, danger: !!error })} />
			</div>

			{error ? <p className="mt-0.5 text-sm text-red-600">{error}</p> : null}
		</div>
	)
}
