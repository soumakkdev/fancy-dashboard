import { cva, VariantProps } from 'class-variance-authority'
import React, { HTMLAttributes } from 'react'

const buttonStyles = cva('inline-flex items-center justify-center border border-transparent text-sm font-medium', {
	variants: {
		variant: {
			primary: 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
			secondary: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
		},
		size: {
			small: 'px-3 py-1 rounded-md',
			medium: 'px-4 py-2 rounded-lg',
			large: 'px-5 py-3 rounded-xl',
		},
		fullWidth: {
			true: 'w-full',
		},
	},
	defaultVariants: {
		variant: 'primary',
		size: 'medium',
		fullWidth: false,
	},
})

interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonStyles> {
	type?: 'button' | 'submit' | 'reset'
}

export function Button(props: ButtonProps) {
	const { children, size, variant, fullWidth, ...rest } = props
	return (
		<button className={buttonStyles({ size, variant, fullWidth })} {...rest}>
			{children}
		</button>
	)
}
