import { Bars3Icon } from '@heroicons/react/24/outline'
import { useSetAtom } from 'jotai'
import { ReactNode } from 'react'
import { isSidebarOpenAtom } from './Layout.atoms'
import Sidebar from './Sidebar'

interface IDashboardLayout {
	title: string
	action?: ReactNode
	children?: ReactNode
}

export default function DashboardLayout(props: IDashboardLayout) {
	const { title, children, action } = props
	const setSidebarOpen = useSetAtom(isSidebarOpenAtom)

	return (
		<div>
			<Sidebar />

			<div className="flex flex-1 flex-col md:pl-64">
				<div className="sticky top-0 z-10 bg-white pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
					<button
						type="button"
						className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
						onClick={() => setSidebarOpen(true)}
					>
						<span className="sr-only">Open sidebar</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<main className="flex-1">
					<div className="mx-auto max-w-7xl py-5 px-4 sm:px-6 md:px-8">
						<div className="flex items-center justify-between">
							<h1 className="text-2xl font-semibold text-gray-900">{title}</h1>

							<div className="flex items-center gap-3">{action}</div>
						</div>
					</div>
					<div className="mx-auto max-w-7xl pb-5 px-4 sm:px-6 md:px-8">{children}</div>
				</main>
			</div>
		</div>
	)
}
