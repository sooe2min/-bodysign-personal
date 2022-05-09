import {
	ForbiddenException,
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { RefreshTokenService } from 'src/refresh-tokens/refresh-tokens.service'
import { Trainer } from 'src/trainers/entities/trainer.entity'
import { TrainersService } from 'src/trainers/trainers.service'
import Time from 'src/types/time.types'
import UserType from 'src/types/user.types'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'
import { LoginUserInput } from './dto/auth-login-user.input'

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private trainersService: TrainersService,
		private configService: ConfigService,
		@Inject(forwardRef(() => RefreshTokenService))
		private refreshTokensService: RefreshTokenService
	) {}

	async validateUser(payload: {
		type: string
		sub: number
		email: string
	}): Promise<User | Trainer | null> {
		const userType = payload.type
		if (userType === UserType.USER) {
			return await this.usersService.findOneById(payload.sub)
		} else if (userType === UserType.TRAINER) {
			return await this.trainersService.findOneById(payload.sub)
		}
		return null
	}

	async verifyOwner(payload: {
		type: string
		sub: number
		email: string
	}): Promise<User | Trainer> {
		const userType = payload.type
		if (userType === UserType.USER) {
			return await this.usersService.findOneById(payload.sub)
		} else if (userType === UserType.TRAINER) {
			return await this.trainersService.findOneById(payload.sub)
		}
	}

	async localLogin(loginUserInput: LoginUserInput) {
		let owner: User | Trainer
		let password: string
		let type: UserType

		const user = await this.usersService.findOneByEmail(
			loginUserInput.email
		)
		const trainer = await this.trainersService.findOneByEmail(
			loginUserInput.email
		)

		if (!user && !trainer) {
			throw new NotFoundException('User/Trainer does not exist')
		}

		if (user) {
			owner = user
			password =
				await this.usersService.findPasswordByEmailUsingQueryBuilder(
					loginUserInput.email
				)
			type = UserType.USER
		} else if (trainer) {
			owner = trainer
			password =
				await this.trainersService.findPasswordByEmailUsingQueryBuilder(
					loginUserInput.email
				)
			type = UserType.TRAINER
		}

		const isValidPassword = await bcrypt.compare(
			loginUserInput.password,
			password
		)

		if (!isValidPassword) {
			throw new ForbiddenException('Invalid email or password')
		}

		const accessToken = this.jwtService.sign({
			email: owner.email,
			sub: owner.id,
			type: type
		})
		const refreshToken = (
			await this.refreshTokensService.createRefreshToken({
				targetId: user ? user.id : trainer.id,
				targetType: user ? UserType.USER : UserType.TRAINER
			})
		).refreshToken

		console.log(owner instanceof User)
		console.log(
			this.configService.get(
				owner instanceof User ? 'userAuthLogin' : 'trainerAuthLogin'
			)
		)
		console.log('3', process.env.USER_AUTH_LOGIN)
		console.log('3', process.env.TRAINER_AUTH_LOGIN)

		const redirectUrl = this.configService.get(
			owner instanceof User ? 'userAuthLogin' : 'trainerAuthLogin'
		)

		console.log(redirectUrl)

		return { accessToken, refreshToken, redirectUrl }
	}

	async googleLogin(req, res) {
		const user = await this.usersService.findOneByEmail(req.user.email)
		const trainer = await this.trainersService.findOneByEmail(
			req.user.email
		)
		const owner = user || trainer

		if (!owner) {
			return {
				redirectUrl: `${this.configService.get(
					'redirectURL'
				)}?logintype=google&email=${req.user.email}`
			}
		}

		const payload = {
			email: owner.email,
			sub: owner.id,
			type: owner instanceof User ? UserType.USER : UserType.TRAINER
		}
		const accessToken = this.jwtService.sign(payload)
		const refreshToken = (
			await this.refreshTokensService.createRefreshToken({
				targetId: owner.id,
				targetType:
					owner instanceof User ? UserType.USER : UserType.TRAINER,
				refreshToken: req.user.refreshToken,
				providerId: req.user.providerId
			})
		).refreshToken
		const redirectUrl = this.configService.get(
			owner instanceof User ? 'userAuthLogin' : 'trainerAuthLogin'
		)

		return { accessToken, refreshToken, redirectUrl }
	}

	async renewToken(
		req: Request,
		res: Response
	): Promise<{ accessToken: string; refreshToken: string }> {
		let { body } = req
		const refreshTokenFromDB =
			await this.refreshTokensService.findOneByRefreshToken(
				body.refreshToken
			)
		if (!refreshTokenFromDB) {
			throw new NotFoundException('Refresh token not found')
		}

		try {
			// check if refreshToken is generated from our service or social login
			const isSocialRefreshToken = !!refreshTokenFromDB.providerId
			let owner, accessToken, refreshToken

			if (refreshTokenFromDB.targetType === UserType.USER) {
				owner = await this.usersService.findOneById(
					refreshTokenFromDB.targetId
				)
			} else {
				owner = await this.trainersService.findOneById(
					refreshTokenFromDB.targetId
				)
			}
			// if social refresh token, generate accessToken, but not refreshToken
			if (isSocialRefreshToken) {
				accessToken = this.jwtService.sign(
					{
						email: owner.email,
						sub: owner.id,
						type: refreshTokenFromDB.targetType
					},
					{
						secret: this.configService.get('JWTSECRET'),
						expiresIn: Time.SEC_IN_HOUR
					}
				)
				refreshToken = refreshTokenFromDB.refreshToken
			} else {
				// if local refresh token, generate both accessToken and refreshToken
				accessToken = this.jwtService.sign(
					{
						email: owner.email,
						sub: owner.id,
						type: refreshTokenFromDB.targetType
					},
					{
						secret: this.configService.get('JWTSECRET'),
						expiresIn: Time.SEC_IN_HOUR
					}
				)
				const refreshTokenPayload = await this.jwtService.verify(
					refreshTokenFromDB.refreshToken,
					{ secret: this.configService.get('JWTSECRET') }
				)
				refreshToken = (
					await this.refreshTokensService.createRefreshToken({
						targetId: refreshTokenPayload.sub,
						targetType: refreshTokenPayload.type,
						refreshToken: refreshTokenFromDB.refreshToken,
						providerId: null
					})
				).refreshToken
			}

			return { accessToken, refreshToken }
		} catch (err) {
			throw new UnauthorizedException('Invalid or expired token')
		}
	}
}
