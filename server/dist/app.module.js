"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const chat_gateway_1 = require("./chat.gateway");
const chats_module_1 = require("./chats/chats.module");
const database_config_1 = require("./configs/database.config");
const exercise_categories_module_1 = require("./exercise-categories/exercise-categories.module");
const exercises_module_1 = require("./exercises/exercises.module");
const graphql_1 = require("@nestjs/graphql");
const imgs_module_1 = require("./imgs/imgs.module");
const inbodies_module_1 = require("./inbodies/inbodies.module");
const common_1 = require("@nestjs/common");
const non_registered_users_module_1 = require("./non-registered-users/non-registered-users.module");
const refresh_tokens_module_1 = require("./refresh-tokens/refresh-tokens.module");
const session_exercise_volumes_module_1 = require("./session-exercise-volumes/session-exercise-volumes.module");
const session_exercises_module_1 = require("./session-exercises/session-exercises.module");
const session_histories_module_1 = require("./session-histories/session-histories.module");
const sessions_module_1 = require("./sessions/sessions.module");
const trainer_interest_module_1 = require("./trainer-interest/trainer-interest.module");
const trainers_module_1 = require("./trainers/trainers.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_categories_module_1 = require("./user-categories/user-categories.module");
const users_module_1 = require("./users/users.module");
const config_2 = require("./configs/config");
const path_1 = require("path");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [config_2.config],
            }),
            graphql_1.GraphQLModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    autoSchemaFile: path_1.join(process.cwd(), 'src/schema.gql'),
                    debug: true,
                    playground: true,
                    installSubscriptionHandlers: true,
                    context: ({ req, connection }) => {
                        if (req) {
                            const user = req.headers.authorization;
                            return Object.assign(Object.assign({}, req), { user });
                        }
                        else {
                            return connection;
                        }
                    },
                    cors: configService.get('corsOptions'),
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useClass: database_config_1.DatabaseConfig,
            }),
            imgs_module_1.ImgsModule,
            chats_module_1.ChatsModule,
            users_module_1.UsersModule,
            trainers_module_1.TrainersModule,
            sessions_module_1.SessionsModule,
            session_exercises_module_1.SessionExercisesModule,
            auth_module_1.AuthModule,
            exercise_categories_module_1.ExerciseCategoriesModule,
            exercises_module_1.ExercisesModule,
            non_registered_users_module_1.NonRegisteredUsersModule,
            inbodies_module_1.InbodiesModule,
            session_histories_module_1.SessionHistoriesModule,
            user_categories_module_1.UserCategoriesModule,
            session_exercise_volumes_module_1.SessionExerciseVolumesModule,
            trainer_interest_module_1.TrainerInterestModule,
            refresh_tokens_module_1.RefreshTokenModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, chat_gateway_1.ChatGateWay],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map