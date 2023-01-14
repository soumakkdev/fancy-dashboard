import { auth } from '@/lib/firebase/admin'
import { GetServerSidePropsContext } from 'next/types'
import nookies from 'nookies'
import DashboardLayout from '../components/layout/DashboardLayout'

export default function HomePage() {
	return <DashboardLayout title="Dashboard"></DashboardLayout>
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	try {
		const cookies = nookies.get(ctx)
		const payload = await auth.verifyIdToken(cookies.token)
		const { uid, email } = payload

		return {
			props: { uid, email },
		}
	} catch (error) {
		return {
			redirect: {
				permanent: false,
				destination: '/login',
			},
		}
	}
}
