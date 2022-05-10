import axios from 'axios'
import { NextRouter } from 'next/dist/client/router'
import { userDataVar } from '../graphql/vars'
import UserData from '../types/userData'

const AuthHandler = async (router: NextRouter) => {
	const getProfile = async () => {
		try {
			const accessToken =
				window.sessionStorage.getItem('accessToken') || null

			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/profile`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				}
			)

			const userData: UserData = res.data
			userDataVar(userData)
		} catch (error) {
			const oldRefreshToken =
				window.sessionStorage.getItem('refreshToken') || null
			await getAccessToken(oldRefreshToken)
		}
	}

	const getAccessToken = async (oldRefreshToken: string | null) => {
		try {
			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_SERVER_HOST}/auth/accessToken`,
				{ refreshToken: oldRefreshToken }
			)

			const {
				accessToken,
				refreshToken
			}: { accessToken: string; refreshToken: string } = res.data

			window.sessionStorage.setItem('accessToken', accessToken)
			window.sessionStorage.setItem('refreshToken', refreshToken)
			await getProfile()
		} catch (error) {
			router.push('/')
		}
	}

	if (router.pathname === '/') return
	if (userDataVar()) return
	else {
		getProfile()
	}
}

export default AuthHandler
