"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const auth_controller_1 = require("./auth.controller");
const auth_resolver_1 = require("./auth.resolver");
const auth_service_1 = require("./auth.service");
const config_1 = require("@nestjs/config");
const google_strategy_1 = require("./strategies/google.strategy");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
const kakao_strategy_1 = require("./strategies/kakao.strategy");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const refresh_tokens_module_1 = require("../refresh-tokens/refresh-tokens.module");
const time_types_1 = __importDefault(require("../types/time.types"));
const trainers_module_1 = require("../trainers/trainers.module");
const users_module_1 = require("../users/users.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            users_module_1.UsersModule,
            trainers_module_1.TrainersModule,
            passport_1.PassportModule,
            refresh_tokens_module_1.RefreshTokenModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWTSECRET,
                signOptions: {
                    expiresIn: process.env.NODE_ENV === 'prod'
                        ? time_types_1.default.SEC_IN_HOUR
                        : time_types_1.default.SEC_IN_MINUTE,
                },
            }),
        ],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            auth_resolver_1.AuthResolver,
            google_strategy_1.GoogleStrategy,
            kakao_strategy_1.KakaoStrategy,
        ],
        exports: [auth_service_1.AuthService],
        controllers: [auth_controller_1.AuthController],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map