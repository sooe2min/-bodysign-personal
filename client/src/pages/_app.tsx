import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { useEffect } from 'react'
import Layout from '../components/Layout'
import '../components/loading.css'
import '../styles/globals.css'
import { client } from '../utils/ApolloClient'
import AuthHandler from '../utils/AuthHandler'

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()

	useEffect(() => {
		AuthHandler(router)
	}, [router])

	return (
		<>
			<Head>
				<meta charSet="utf-8"></meta>
				<meta
					name="viewport"
					content="width=device-width, height=device-height, initial-scale=1.0"
				/>
				<meta
					name="google-site-verification"
					content="oojpITtzz6oGU6-ExzRxY0VVCJkgJ-gJg_M0p6zeRDo"
				/>
			</Head>
			<ApolloProvider client={client}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ApolloProvider>
		</>
	)
}

export default MyApp
