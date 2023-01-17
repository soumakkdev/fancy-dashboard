import React, { HTMLAttributes } from 'react'

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
	label?: string
	name?: string
}

export function Checkbox(props: CheckboxProps) {
	const { label, name, ...rest } = props
	return (
		<div className="relative flex items-start">
			<div className="flex h-5 items-center">
				<input
					{...rest}
					id={name}
					name={name}
					type="checkbox"
					className="h-4 w-4  rounded-none border-gray-300 text-brand focus:ring-brand focus:ring-offset-1"
				/>
			</div>
			<div className="ml-2 text-sm">
				<label htmlFor={name} className="font-medium text-gray-700">
					{label}
				</label>
			</div>
		</div>
	)
}
