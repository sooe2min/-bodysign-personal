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
exports.ChatsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const chats_service_1 = require("./chats.service");
const chat_entity_1 = require("./entities/chat.entity");
const create_chat_input_1 = require("./dto/create-chat.input");
const update_chat_input_1 = require("./dto/update-chat.input");
const imgs_service_1 = require("../imgs/imgs.service");
const currentUser_param_1 = require("../auth/dto/currentUser.param");
const user_entity_1 = require("../users/entities/user.entity");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const common_1 = require("@nestjs/common");
const find_chats_input_1 = require("./dto/find-chats.input");
const jwtAuth_guard_1 = require("../auth/guards/jwtAuth.guard");
let ChatsResolver = class ChatsResolver {
    constructor(chatsService, imgsService) {
        this.chatsService = chatsService;
        this.imgsService = imgsService;
    }
    createChat(createChatInput) {
        return this.chatsService.create(createChatInput);
    }
    findAll() {
        return this.chatsService.findAll();
    }
    findOneById(id) {
        return this.chatsService.findOneById(id);
    }
    findChatsByUserIdAndTrainerId(findChatsInput) {
        return this.chatsService.findChatsByUserIdAndTrainerId(findChatsInput);
    }
    imgs(chat) {
        const { id } = chat;
        return this.imgsService.findAllByChatId(id);
    }
    async updateChat(updateChatInput, currentUser) {
        const canMutate = await this.chatsService.canMutate(currentUser, updateChatInput.id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.chatsService.update(updateChatInput);
    }
    async removeChat(id, currentUser) {
        const canMutate = await this.chatsService.canMutate(currentUser, id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return await this.chatsService.remove(id);
    }
};
__decorate([
    graphql_1.Mutation(() => chat_entity_1.Chat),
    __param(0, graphql_1.Args('createChatInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_input_1.CreateChatInput]),
    __metadata("design:returntype", void 0)
], ChatsResolver.prototype, "createChat", null);
__decorate([
    graphql_1.Query(() => [chat_entity_1.Chat], { name: 'chats' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatsResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => chat_entity_1.Chat, { name: 'chat' }),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ChatsResolver.prototype, "findOneById", null);
__decorate([
    graphql_1.Query((returns) => [chat_entity_1.Chat]),
    __param(0, graphql_1.Args('findChatsInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_chats_input_1.FindChatsInput]),
    __metadata("design:returntype", Promise)
], ChatsResolver.prototype, "findChatsByUserIdAndTrainerId", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chat_entity_1.Chat]),
    __metadata("design:returntype", void 0)
], ChatsResolver.prototype, "imgs", null);
__decorate([
    graphql_1.Mutation((returns) => chat_entity_1.Chat),
    __param(0, graphql_1.Args('updateChatInput')),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_chat_input_1.UpdateChatInput, Object]),
    __metadata("design:returntype", Promise)
], ChatsResolver.prototype, "updateChat", null);
__decorate([
    graphql_1.Mutation((returns) => Boolean),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ChatsResolver.prototype, "removeChat", null);
ChatsResolver = __decorate([
    graphql_1.Resolver(() => chat_entity_1.Chat),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [chats_service_1.ChatsService,
        imgs_service_1.ImgsService])
], ChatsResolver);
exports.ChatsResolver = ChatsResolver;
//# sourceMappingURL=chats.resolver.js.map