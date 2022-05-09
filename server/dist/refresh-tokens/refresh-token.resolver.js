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
exports.RefreshTokensResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_types_1 = __importDefault(require("../types/user.types"));
const create_user_refreshToken_input_1 = require("./dto/create-user-refreshToken.input");
const refreshToken_entity_1 = require("./entities/refreshToken.entity");
const refresh_tokens_service_1 = require("./refresh-tokens.service");
let RefreshTokensResolver = class RefreshTokensResolver {
    constructor(refreshTokensService) {
        this.refreshTokensService = refreshTokensService;
    }
    findOneById(targetId, targetType) {
        return this.refreshTokensService.findOneByTargetTypeAndTargetId(targetType, targetId);
    }
    async createRefreshToken(createRefreshTokenInput) {
        return await this.refreshTokensService.createRefreshToken(createRefreshTokenInput);
    }
};
__decorate([
    graphql_1.Query(() => refreshToken_entity_1.RefreshToken, { name: 'refreshToken' }),
    __param(0, graphql_1.Args('targetId', { type: () => graphql_1.Int })),
    __param(1, graphql_1.Args('targetType', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], RefreshTokensResolver.prototype, "findOneById", null);
__decorate([
    graphql_1.Mutation(() => refreshToken_entity_1.RefreshToken),
    __param(0, graphql_1.Args('createRefreshTokenInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_refreshToken_input_1.CreateRefreshTokenInput]),
    __metadata("design:returntype", Promise)
], RefreshTokensResolver.prototype, "createRefreshToken", null);
RefreshTokensResolver = __decorate([
    graphql_1.Resolver(() => refreshToken_entity_1.RefreshToken),
    __metadata("design:paramtypes", [refresh_tokens_service_1.RefreshTokenService])
], RefreshTokensResolver);
exports.RefreshTokensResolver = RefreshTokensResolver;
//# sourceMappingURL=refresh-token.resolver.js.map