import Head from 'next/head'
import React, { ReactNode } from 'react'

interface IPage {
	title: string
	description?: string
	keywords?: string[]
	children: ReactNode
}

export default function Page(props: IPage) {
	const { title, description, keywords, children } = props
	return (
		<>
			<Head>
				<title>{title}</title>
				{description ? <meta name="description" content={description} /> : null}
				{keywords?.length ? <meta name="keywords" content={keywords?.join(',')} /> : null}
			</Head>

			{children}
		</>
	)
}
