const WHITE_LIST =
	process.env.NODE_ENV === 'prod'
		? /(https:\/\/)?(([^.]+)\.)?bodysign-personal.netlify.app/gi
		: new RegExp(
				'http://localhost:' +
					`(${process.env.PORT}|${process.env.CLIENT_PORT})`,
				'gi'
		  )

export const config = () => ({
	database: {
		type: process.env.DB_TYPE,
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		synchronize: true,
		entities: ['dist/**/*.entity{.ts,.js}']
	},
	awsBucketName: process.env.AWS_S3_BUCKET_NAME,
	port: process.env.PORT,
	jwtSecret: process.env.JWTSECRET,
	redirectURL: process.env.SIGNUP_REDIRECT_URL,
	userAuthLogin: process.env.USER_AUTH_LOGIN,
	trainerAuthLogin: process.env.TRAINER_AUTH_LOGIN,
	corsOptions: {
		origin: (
			origin: string | undefined,
			cb: (err: Error | null, allow?: boolean) => void
		) => {
			if (origin === undefined || origin.match(WHITE_LIST) !== null) {
				return cb(null, true)
			} else {
				return cb(new Error('Not allowed by CORS'))
			}
		},
		methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
		credentials: true
	}
})
