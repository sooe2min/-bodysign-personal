"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.RefreshTokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const trainers_service_1 = require("../trainers/trainers.service");
const login_types_1 = __importDefault(require("../types/login.types"));
const user_types_1 = __importDefault(require("../types/user.types"));
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const refreshToken_entity_1 = require("./entities/refreshToken.entity");
let RefreshTokenService = class RefreshTokenService {
    constructor(refreshTokensRepository, usersService, trainersService, jwtService) {
        this.refreshTokensRepository = refreshTokensRepository;
        this.usersService = usersService;
        this.trainersService = trainersService;
        this.jwtService = jwtService;
    }
    async createRefreshToken(createRefreshTokenInput) {
        let owner;
        const { targetId, targetType, refreshToken, providerId } = createRefreshTokenInput;
        if (targetType === user_types_1.default.USER) {
            owner = await this.usersService.findOneById(targetId);
        }
        else {
            owner = await this.trainersService.findOneById(targetId);
        }
        const refreshTokenFromDB = await this.refreshTokensRepository.find({
            where: {
                targetType,
                targetId: owner.id,
            },
        });
        if (refreshTokenFromDB) {
            await this.refreshTokensRepository.remove(refreshTokenFromDB);
        }
        const createParams = Object.assign({}, createRefreshTokenInput);
        if (owner.loginType === login_types_1.default.LOCAL) {
            createParams.refreshToken = this.jwtService.sign({
                email: owner.email,
                sub: owner.id,
                type: targetType,
            });
        }
        const newRefreshToken = this.refreshTokensRepository.create(createParams);
        return await this.refreshTokensRepository.save(newRefreshToken);
    }
    findOneByTargetTypeAndTargetId(targetType, targetId) {
        return this.refreshTokensRepository.findOneOrFail({
            targetType,
            targetId,
        });
    }
    findOneByRefreshToken(refreshToken) {
        return this.refreshTokensRepository.findOne({ refreshToken });
    }
};
RefreshTokenService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(refreshToken_entity_1.RefreshToken)),
    __param(1, common_1.Inject(common_1.forwardRef(() => users_service_1.UsersService))),
    __param(2, common_1.Inject(common_1.forwardRef(() => trainers_service_1.TrainersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        trainers_service_1.TrainersService,
        jwt_1.JwtService])
], RefreshTokenService);
exports.RefreshTokenService = RefreshTokenService;
//# sourceMappingURL=refresh-tokens.service.js.map