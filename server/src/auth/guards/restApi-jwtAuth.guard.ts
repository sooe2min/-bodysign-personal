import {
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class RestApiJwtAuthGuard extends AuthGuard('jwt') {
	getRequest(context: ExecutionContext) {
		const ctx = context.switchToHttp().getRequest()
		return ctx
	}

	handleRequest(err: any, user: any, _info: any, _context: any) {
		if (err) {
			throw err
		} else if (!user) {
			throw new UnauthorizedException('Invalid or expired token')
		}

		return user
	}
}
