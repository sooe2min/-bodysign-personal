"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt = __importStar(require("bcrypt"));
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const trainers_service_1 = require("../trainers/trainers.service");
const user_entity_1 = require("../users/entities/user.entity");
const user_types_1 = __importDefault(require("../types/user.types"));
const users_service_1 = require("../users/users.service");
const refresh_tokens_service_1 = require("../refresh-tokens/refresh-tokens.service");
const time_types_1 = __importDefault(require("../types/time.types"));
let AuthService = class AuthService {
    constructor(usersService, jwtService, trainersService, configService, refreshTokensService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.trainersService = trainersService;
        this.configService = configService;
        this.refreshTokensService = refreshTokensService;
    }
    async validateUser(payload) {
        const userType = payload.type;
        if (userType === user_types_1.default.USER) {
            return await this.usersService.findOneById(payload.sub);
        }
        else if (userType === user_types_1.default.TRAINER) {
            return await this.trainersService.findOneById(payload.sub);
        }
        return null;
    }
    async verifyOwner(payload) {
        const userType = payload.type;
        if (userType === user_types_1.default.USER) {
            return await this.usersService.findOneById(payload.sub);
        }
        else if (userType === user_types_1.default.TRAINER) {
            return await this.trainersService.findOneById(payload.sub);
        }
    }
    async localLogin(loginUserInput) {
        let owner;
        let password;
        let type;
        const user = await this.usersService.findOneByEmail(loginUserInput.email);
        const trainer = await this.trainersService.findOneByEmail(loginUserInput.email);
        if (!user && !trainer) {
            throw new common_1.NotFoundException('User/Trainer does not exist');
        }
        if (user) {
            owner = user;
            password = await this.usersService.findPasswordByEmailUsingQueryBuilder(loginUserInput.email);
            type = user_types_1.default.USER;
        }
        else if (trainer) {
            owner = trainer;
            password =
                await this.trainersService.findPasswordByEmailUsingQueryBuilder(loginUserInput.email);
            type = user_types_1.default.TRAINER;
        }
        const isValidPassword = await bcrypt.compare(loginUserInput.password, password);
        if (!isValidPassword) {
            throw new common_1.ForbiddenException('Invalid email or password');
        }
        const accessToken = this.jwtService.sign({
            email: owner.email,
            sub: owner.id,
            type: type,
        });
        const refreshToken = (await this.refreshTokensService.createRefreshToken({
            targetId: user ? user.id : trainer.id,
            targetType: user ? user_types_1.default.USER : user_types_1.default.TRAINER,
        })).refreshToken;
        const redirectUrl = this.configService.get(owner instanceof user_entity_1.User ? 'userAuthLogin' : 'trainerAuthLogin');
        return { accessToken, refreshToken, redirectUrl };
    }
    async googleLogin(req, res) {
        const user = await this.usersService.findOneByEmail(req.user.email);
        const trainer = await this.trainersService.findOneByEmail(req.user.email);
        const owner = user || trainer;
        if (!owner) {
            return {
                redirectUrl: `${this.configService.get('redirectURL')}?logintype=google&email=${req.user.email}`,
            };
        }
        const payload = {
            email: owner.email,
            sub: owner.id,
            type: owner instanceof user_entity_1.User ? user_types_1.default.USER : user_types_1.default.TRAINER,
        };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = (await this.refreshTokensService.createRefreshToken({
            targetId: owner.id,
            targetType: owner instanceof user_entity_1.User ? user_types_1.default.USER : user_types_1.default.TRAINER,
            refreshToken: req.user.refreshToken,
            providerId: req.user.providerId,
        })).refreshToken;
        const redirectUrl = this.configService.get(owner instanceof user_entity_1.User ? 'userAuthLogin' : 'trainerAuthLogin');
        return { accessToken, refreshToken, redirectUrl };
    }
    async renewToken(req, res) {
        let { body } = req;
        const refreshTokenFromDB = await this.refreshTokensService.findOneByRefreshToken(body.refreshToken);
        if (!refreshTokenFromDB) {
            throw new common_1.NotFoundException('Refresh token not found');
        }
        try {
            const isSocialRefreshToken = !!refreshTokenFromDB.providerId;
            let owner, accessToken, refreshToken;
            if (refreshTokenFromDB.targetType === user_types_1.default.USER) {
                owner = await this.usersService.findOneById(refreshTokenFromDB.targetId);
            }
            else {
                owner = await this.trainersService.findOneById(refreshTokenFromDB.targetId);
            }
            if (isSocialRefreshToken) {
                accessToken = this.jwtService.sign({
                    email: owner.email,
                    sub: owner.id,
                    type: refreshTokenFromDB.targetType,
                }, {
                    secret: this.configService.get('JWTSECRET'),
                    expiresIn: time_types_1.default.SEC_IN_HOUR,
                });
                refreshToken = refreshTokenFromDB.refreshToken;
            }
            else {
                accessToken = this.jwtService.sign({
                    email: owner.email,
                    sub: owner.id,
                    type: refreshTokenFromDB.targetType,
                }, {
                    secret: this.configService.get('JWTSECRET'),
                    expiresIn: time_types_1.default.SEC_IN_HOUR,
                });
                const refreshTokenPayload = await this.jwtService.verify(refreshTokenFromDB.refreshToken, { secret: this.configService.get('JWTSECRET') });
                refreshToken = (await this.refreshTokensService.createRefreshToken({
                    targetId: refreshTokenPayload.sub,
                    targetType: refreshTokenPayload.type,
                    refreshToken: refreshTokenFromDB.refreshToken,
                    providerId: null,
                })).refreshToken;
            }
            return { accessToken, refreshToken };
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __param(4, common_1.Inject(common_1.forwardRef(() => refresh_tokens_service_1.RefreshTokenService))),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        trainers_service_1.TrainersService,
        config_1.ConfigService,
        refresh_tokens_service_1.RefreshTokenService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map