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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgsResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const currentUser_param_1 = require("../auth/dto/currentUser.param");
const jwtAuth_guard_1 = require("../auth/guards/jwtAuth.guard");
const chat_entity_1 = require("../chats/entities/chat.entity");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const user_entity_1 = require("../users/entities/user.entity");
const create_img_input_1 = require("./dto/create-img.input");
const find_imgs_input_1 = require("./dto/find-imgs.input");
const img_entity_1 = require("./entities/img.entity");
const imgs_service_1 = require("./imgs.service");
let ImgsResolver = class ImgsResolver {
    constructor(imgsService) {
        this.imgsService = imgsService;
    }
    findImgsByUserIdAndTrainerId(findImgsInput) {
        return this.imgsService.findByUserIdAndTrainerId(findImgsInput);
    }
    getImg(id) {
        return this.imgsService.findOneById(id);
    }
    async removeImg(id, currentUser) {
        const canMutate = await this.imgsService.canMutate(currentUser, id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.imgsService.remove(id);
    }
    async bulkRemoveImg(ids, currentUser) {
        const bulkCanMutate = await this.imgsService.bulkCanMutate(currentUser, ids);
        if (!bulkCanMutate) {
            throw new common_1.ForbiddenException();
        }
        return await this.imgsService.bulkRemove(ids);
    }
    chat(img) {
        return this.imgsService.getChat(img.chatId);
    }
    createImg(createImgInput) {
        return this.imgsService.createImg(createImgInput);
    }
};
__decorate([
    graphql_1.Query((returns) => [img_entity_1.Img]),
    __param(0, graphql_1.Args('findImgsInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_imgs_input_1.FindImgsInput]),
    __metadata("design:returntype", Promise)
], ImgsResolver.prototype, "findImgsByUserIdAndTrainerId", null);
__decorate([
    graphql_1.Query((returns) => img_entity_1.Img),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ImgsResolver.prototype, "getImg", null);
__decorate([
    graphql_1.Mutation((returns) => Boolean),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ImgsResolver.prototype, "removeImg", null);
__decorate([
    graphql_1.Mutation((returns) => Boolean),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    __param(0, graphql_1.Args('ids', { type: () => [graphql_1.Int] })),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], ImgsResolver.prototype, "bulkRemoveImg", null);
__decorate([
    graphql_1.ResolveField((returns) => chat_entity_1.Chat),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [img_entity_1.Img]),
    __metadata("design:returntype", Promise)
], ImgsResolver.prototype, "chat", null);
__decorate([
    graphql_1.Mutation((returns) => img_entity_1.Img),
    __param(0, graphql_1.Args('createImgInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_img_input_1.CreateImgInput]),
    __metadata("design:returntype", Promise)
], ImgsResolver.prototype, "createImg", null);
ImgsResolver = __decorate([
    graphql_1.Resolver((of) => img_entity_1.Img),
    __metadata("design:paramtypes", [imgs_service_1.ImgsService])
], ImgsResolver);
exports.ImgsResolver = ImgsResolver;
//# sourceMappingURL=imgs.resolver.js.map