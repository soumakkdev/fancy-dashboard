import { cva, VariantProps } from 'class-variance-authority'
import React, { HTMLAttributes } from 'react'

const buttonStyles = cva('inline-flex items-center justify-center border border-transparent font-medium', {
	variants: {
		variant: {
			primary: 'bg-brand text-white shadow-sm hover:bg-brand focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1',
			secondary: 'bg-slate-200 text-slate-700 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-1',
		},
		size: {
			small: 'px-4 h-[30px] text-xs',
			medium: 'px-5 h-[40px] text-sm',
			large: 'px-6 h-[50px] text-base',
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
