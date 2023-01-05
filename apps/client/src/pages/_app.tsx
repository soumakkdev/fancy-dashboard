import '../styles/globals.css'
import 'ui/styles.css'

import type { AppProps } from 'next/app'
import { Inter } from '@next/font/google'
import { AuthProvider } from '../lib/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
	return (
		<AuthProvider>
			<div className={inter.className}>
				<Component {...pageProps} />
			</div>
		</AuthProvider>
	)
}
