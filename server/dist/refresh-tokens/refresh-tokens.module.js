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
exports.RefreshTokenModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const refreshToken_entity_1 = require("./entities/refreshToken.entity");
const refresh_tokens_service_1 = require("./refresh-tokens.service");
const refresh_token_resolver_1 = require("./refresh-token.resolver");
const time_types_1 = __importDefault(require("../types/time.types"));
const trainers_module_1 = require("../trainers/trainers.module");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
let RefreshTokenModule = class RefreshTokenModule {
};
RefreshTokenModule = __decorate([
    common_1.Module({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forFeature([refreshToken_entity_1.RefreshToken]),
            common_1.forwardRef(() => users_module_1.UsersModule),
            common_1.forwardRef(() => trainers_module_1.TrainersModule),
            jwt_1.JwtModule.register({
                secret: process.env.JWTSECRET,
                signOptions: { expiresIn: time_types_1.default.SEC_IN_DAY * 30 },
            }),
        ],
        providers: [refresh_tokens_service_1.RefreshTokenService, refresh_token_resolver_1.RefreshTokensResolver],
        exports: [refresh_tokens_service_1.RefreshTokenService],
    })
], RefreshTokenModule);
exports.RefreshTokenModule = RefreshTokenModule;
//# sourceMappingURL=refresh-tokens.module.js.map