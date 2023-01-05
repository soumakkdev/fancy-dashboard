import React, { HTMLAttributes } from 'react'

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
	label?: string
}

export function Checkbox(props: CheckboxProps) {
	const { label, ...rest } = props
	return (
		<div className="relative flex items-start">
			<div className="flex h-5 items-center">
				<input {...rest} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-1" />
			</div>
			<div className="ml-2 text-sm">
				<label htmlFor="comments" className="font-medium text-gray-700">
					{label}
				</label>
			</div>
		</div>
	)
}
