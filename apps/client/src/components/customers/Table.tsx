import { createColumnHelper, flexRender, useReactTable } from '@tanstack/react-table'
import { getCoreRowModel } from '@tanstack/table-core'
import React from 'react'

interface ITable {
	data: any[]
	columns: any[]
}

export default function Table(props: ITable) {
	const { columns, data } = props
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})
	return (
		<table className="min-w-full divide-y divide-gray-300">
			<thead className="bg-gray-50">
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th key={header.id} scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
								{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody className="divide-y divide-gray-200 bg-white">
				{table.getRowModel().rows.map((row) => (
					<tr key={row.id}>
						{row.getVisibleCells().map((cell) => (
							<td key={cell.id} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}
