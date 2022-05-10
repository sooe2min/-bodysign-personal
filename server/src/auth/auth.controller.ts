import {
	BadRequestException,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UseGuards
} from '@nestjs/common'
import { Request, Response } from 'express'
import APIStatus from 'src/types/APIStatus.types'
import { AuthService } from './auth.service'
import { GoogleAuthGuard } from './guards/google.guard'
import { RestApiJwtAuthGuard } from './guards/restApi-jwtAuth.guard'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Get('profile')
	@UseGuards(RestApiJwtAuthGuard)
	getProfile(@Req() req) {
		return req.user
	}

	@Get('google')
	@UseGuards(GoogleAuthGuard)
	oauthGoogle(@Req() req) {}

	@Get('google/callback')
	@UseGuards(GoogleAuthGuard)
	async oauthGoogleRedirect(@Req() req, @Res() res) {
		const { accessToken, refreshToken, redirectUrl } =
			await this.authService.googleLogin(req, res)

		// accessToken and refreshToken returned if already existing user
		if (accessToken && refreshToken) {
			res
				.cookie('accessToken', accessToken)
				.cookie('refreshToken', refreshToken)
		}

		return res.redirect(redirectUrl)
	}

	// @Get('kakao')
	// @UseGuards(KakaoAuthGuard)
	// oauthKakao(@Req() req) {}

	// @Get('kakao/callback')
	// @UseGuards(KakaoAuthGuard)
	// oauthKakaoRedirect(@Req() req, @Res() res): any {
	//   return this.authService.kakaoLogin(req, res);
	// }

	@Post('accessToken')
	async renewToken(@Req() req: Request, @Res() res: Response) {
		if (
			!req.body.refreshToken ||
			typeof req.body.refreshToken !== 'string'
		) {
			throw new BadRequestException(
				'Missing or mismatching request body: refreshToken'
			)
		}
		const { accessToken, refreshToken } =
			await this.authService.renewToken(req, res)
		res
			.cookie('accessToken', accessToken)
			.cookie('refreshToken', refreshToken)

		return res
			.status(APIStatus.CREATED)
			.json({ accessToken, refreshToken })
	}

	@Post('localLogin')
	async localLoginRedirect(@Req() req, @Res() res) {
		if (!req.body.email || typeof req.body.email !== 'string') {
			throw new BadRequestException(
				'Missing or mismatching request body: email'
			)
		}

		if (!req.body.password || typeof req.body.password !== 'string') {
			throw new BadRequestException(
				'Missing or mismatching request body: password'
			)
		}

		const { accessToken, refreshToken, redirectUrl } =
			await this.authService.localLogin({
				email: req.body.email,
				password: req.body.password
			})

		res
			.cookie('accessToken', accessToken)
			.cookie('refreshToken', refreshToken)

		return res
			.status(APIStatus.SUCCESS)
			.json({ accessToken, refreshToken, redirectUrl })
	}
}
