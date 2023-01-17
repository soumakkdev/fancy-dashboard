import { Bars3Icon } from '@heroicons/react/24/outline'
import { useSetAtom } from 'jotai'
import { ReactNode } from 'react'
import { isSidebarOpenAtom } from './Layout.atoms'
import Sidebar from './Sidebar'

interface IDashboardLayout {
	title: string
	action?: ReactNode
	children?: ReactNode
	goBack?: () => void
}

export default function DashboardLayout(props: IDashboardLayout) {
	const { title, children, action, goBack } = props
	const setSidebarOpen = useSetAtom(isSidebarOpenAtom)

	return (
		<div>
			<Sidebar />

			<div className="flex flex-1 flex-col md:pl-64">
				<main className="flex-1">
					<div className="mx-auto max-w-7xl py-5 px-4 sm:px-6 md:px-8">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className="sticky top-0 z-10 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
									<button
										type="button"
										className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
										onClick={() => setSidebarOpen(true)}
									>
										<span className="sr-only">Open sidebar</span>
										<Bars3Icon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>

								{goBack ? (
									<svg onClick={goBack} width="27" height="11" viewBox="0 0 27 11" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g clip-path="url(#clip0_9_203)">
											<path
												d="M25.7143 6.41674L26.6786 6.41674L26.6786 4.58341L25.7143 4.58341L25.7143 6.41674ZM25.7143 4.58341L1.28573 4.58341L1.28573 6.41674L25.7143 6.41674L25.7143 4.58341ZM5.9413 10.3889C5.9413 7.21116 3.31086 4.58336 1.7792e-05 4.58336L1.7792e-05 6.41669C2.18663 6.41669 4.01273 8.16655 4.01273 10.3889L5.9413 10.3889ZM1.7792e-05 6.41669C3.31086 6.41669 5.94143 3.78893 5.94143 0.611138L4.01286 0.611138C4.01286 2.83348 2.18663 4.58336 1.7792e-05 4.58336L1.7792e-05 6.41669Z"
												fill="black"
											/>
										</g>
										<defs>
											<clipPath id="clip0_9_203">
												<rect width="27" height="11" fill="white" transform="translate(27 11) rotate(180)" />
											</clipPath>
										</defs>
									</svg>
								) : null}
								<h1 className="text-2xl font-bold text-gray-900 font-serif">{title}</h1>
							</div>

							<div className="flex items-center gap-3">{action}</div>
						</div>
					</div>
					<div className="mx-auto max-w-7xl pb-5 px-4 sm:px-6 md:px-8">{children}</div>
				</main>
			</div>
		</div>
	)
}
