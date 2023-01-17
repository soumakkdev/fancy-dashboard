import { Dialog, Transition } from '@headlessui/react'
import { CalendarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { isSidebarOpenAtom } from './Layout.atoms'

const navigation = [
	{ name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
	{ name: 'Customers', href: '/customers', icon: UsersIcon, current: false },
	{ name: 'Products', href: '/products', icon: FolderIcon, current: false },
	{ name: 'Orders', href: '/orders', icon: CalendarIcon, current: false },
	{ name: 'Settings', href: '/settings', icon: InboxIcon, current: false },
]

export default function Sidebar() {
	const [sidebarOpen, setSidebarOpen] = useAtom(isSidebarOpenAtom)
	const router = useRouter()
	console.log(router)

	return (
		<div>
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
					</Transition.Child>

					<div className="fixed inset-0 z-40 flex">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
								<Transition.Child
									as={Fragment}
									enter="ease-in-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in-out duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="absolute top-0 right-0 -mr-12 pt-2">
										<button
											type="button"
											className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
											onClick={() => setSidebarOpen(false)}
										>
											<span className="sr-only">Close sidebar</span>
											<XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
										</button>
									</div>
								</Transition.Child>
								<div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
									<nav className="mt-5 space-y-1 px-2">
										{navigation.map((item) => (
											<Link
												key={item.name}
												href={item.href}
												className={clsx(
													item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
													'group flex items-center px-2 py-2 text-base font-medium rounded-md'
												)}
											>
												<item.icon
													className={clsx(
														item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
														'mr-4 flex-shrink-0 h-6 w-6'
													)}
													aria-hidden="true"
												/>
												{item.name}
											</Link>
										))}
									</nav>
								</div>
							</Dialog.Panel>
						</Transition.Child>
						<div className="w-14 flex-shrink-0">{/* Force sidebar to shrink to fit close icon */}</div>
					</div>
				</Dialog>
			</Transition.Root>

			{/* Static sidebar for desktop */}
			<div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
				{/* Sidebar component, swap this element with another sidebar if you like */}
				<div className="flex min-h-0 flex-1 flex-col border-r border-dashed border-gray-200">
					<div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
						<div className="flex flex-shrink-0 items-center px-4">
							<h1 className="font-bold text-2xl font-serif">Fancy Dashboard</h1>
						</div>

						<nav className="mt-5 flex-1 space-y-1 px-2">
							{navigation.map((item) => {
								const isActive = router.pathname.endsWith(item.href)
								return (
									<Link
										key={item.name}
										href={item.href}
										className={clsx(
											isActive ? 'bg-zinc-200 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
											'group flex items-center px-2 py-2 text-sm font-medium'
										)}
									>
										<item.icon
											className={clsx(
												isActive ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
												'mr-3 flex-shrink-0 h-6 w-6'
											)}
											aria-hidden="true"
										/>
										{item.name}
									</Link>
								)
							})}
						</nav>
					</div>
				</div>
			</div>
		</div>
	)
}
