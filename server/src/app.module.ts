import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { ChatGateWay } from './chat.gateway'
import { ChatsModule } from './chats/chats.module'
import { config } from './configs/config'
import { DatabaseConfig } from './configs/database.config'
import { ExerciseCategoriesModule } from './exercise-categories/exercise-categories.module'
import { ExercisesModule } from './exercises/exercises.module'
import { ImgsModule } from './imgs/imgs.module'
import { InbodiesModule } from './inbodies/inbodies.module'
import { NonRegisteredUsersModule } from './non-registered-users/non-registered-users.module'
import { RefreshTokenModule } from './refresh-tokens/refresh-tokens.module'
import { SessionExerciseVolumesModule } from './session-exercise-volumes/session-exercise-volumes.module'
import { SessionExercisesModule } from './session-exercises/session-exercises.module'
import { SessionHistoriesModule } from './session-histories/session-histories.module'
import { SessionsModule } from './sessions/sessions.module'
import { TrainerInterestModule } from './trainer-interest/trainer-interest.module'
import { TrainersModule } from './trainers/trainers.module'
import { UserCategoriesModule } from './user-categories/user-categories.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [config]
		}),
		GraphQLModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
				debug: true,
				playground: true,
				installSubscriptionHandlers: true,
				context: ({ req, connection }) => {
					if (req) {
						const user = req.headers.authorization
						return { ...req, user }
					} else {
						return connection
					}
				},
				cors: configService.get('corsOptions')
			}),
			inject: [ConfigService]
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useClass: DatabaseConfig
		}),
		ImgsModule,
		ChatsModule,
		UsersModule,
		TrainersModule,
		SessionsModule,
		SessionExercisesModule,
		AuthModule,
		ExerciseCategoriesModule,
		ExercisesModule,
		NonRegisteredUsersModule,
		InbodiesModule,
		SessionHistoriesModule,
		UserCategoriesModule,
		SessionExerciseVolumesModule,
		TrainerInterestModule,
		RefreshTokenModule
	],
	controllers: [AppController],
	providers: [AppService, ChatGateWay]
})
export class AppModule {}
