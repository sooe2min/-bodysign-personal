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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const APIStatus_types_1 = __importDefault(require("../types/APIStatus.types"));
const auth_service_1 = require("./auth.service");
const google_guard_1 = require("./guards/google.guard");
const restApi_jwtAuth_guard_1 = require("./guards/restApi-jwtAuth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    getProfile(req) {
        return req.user;
    }
    oauthGoogle(req) { }
    async oauthGoogleRedirect(req, res) {
        const { accessToken, refreshToken, redirectUrl } = await this.authService.googleLogin(req, res);
        if (accessToken && refreshToken) {
            res
                .cookie('accessToken', accessToken)
                .cookie('refreshToken', refreshToken);
        }
        return res.redirect(redirectUrl);
    }
    async renewToken(req, res) {
        if (!req.body.refreshToken || typeof req.body.refreshToken !== 'string') {
            throw new common_1.BadRequestException('Missing or mismatching request body: refreshToken');
        }
        const { accessToken, refreshToken } = await this.authService.renewToken(req, res);
        res.cookie('accessToken', accessToken).cookie('refreshToken', refreshToken);
        return res.status(APIStatus_types_1.default.CREATED).json({});
    }
    async localLoginRedirect(req, res) {
        if (!req.body.email || typeof req.body.email !== 'string') {
            throw new common_1.BadRequestException('Missing or mismatching request body: email');
        }
        if (!req.body.password || typeof req.body.password !== 'string') {
            throw new common_1.BadRequestException('Missing or mismatching request body: password');
        }
        const { accessToken, refreshToken, redirectUrl } = await this.authService.localLogin({
            email: req.body.email,
            password: req.body.password,
        });
        res.cookie('accessToken', accessToken).cookie('refreshToken', refreshToken);
        return res
            .status(APIStatus_types_1.default.SUCCESS)
            .json({ accessToken, refreshToken, redirectUrl });
    }
};
__decorate([
    common_1.Get('profile'),
    common_1.UseGuards(restApi_jwtAuth_guard_1.RestApiJwtAuthGuard),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    common_1.Get('google'),
    common_1.UseGuards(google_guard_1.GoogleAuthGuard),
    __param(0, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "oauthGoogle", null);
__decorate([
    common_1.Get('google/callback'),
    common_1.UseGuards(google_guard_1.GoogleAuthGuard),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "oauthGoogleRedirect", null);
__decorate([
    common_1.Post('accessToken'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "renewToken", null);
__decorate([
    common_1.Post('localLogin'),
    __param(0, common_1.Req()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "localLoginRedirect", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map