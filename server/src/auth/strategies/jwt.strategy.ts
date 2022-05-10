import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from '../auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWTSECRET
		})
	}

	async validate(validationPayload: {
		email: string
		sub: number
		type: string
	}) {
		const user = this.authService.validateUser(validationPayload)
		if (!user) {
			throw new UnauthorizedException()
		}
		return user
	}
}
