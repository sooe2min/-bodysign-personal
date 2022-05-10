import {
	ApolloClient,
	ApolloLink,
	concat,
	HttpLink,
	InMemoryCache
} from '@apollo/client'

const httpLink = new HttpLink({
	uri: process.env.NEXT_PUBLIC_API_DOMAIN_GRAPHQL
})

const authMiddleware = new ApolloLink((operation, forward) => {
	const accessToken = window.sessionStorage.getItem('accessToken') || null

	// add the authorization to the headers
	operation.setContext(({ headers = {} }) => ({
		headers: {
			...headers,
			// TODO: 액세스토큰을 여기 담아서 요청들에 보내기 완료. 제대로 작동하는지 체크 필요
			authorization: `Bearer ${accessToken}`
		}
	}))

	return forward(operation)
})

export const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: concat(authMiddleware, httpLink),
	connectToDevTools: true
})
