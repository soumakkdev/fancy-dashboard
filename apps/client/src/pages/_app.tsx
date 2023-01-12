import '../styles/globals.css'
import 'ui/styles.css'

import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import { AuthProvider } from '../lib/AuthContext'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<div className={inter.className}>
					<Component {...pageProps} />
				</div>
				<Toaster position="bottom-center" />
			</AuthProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
