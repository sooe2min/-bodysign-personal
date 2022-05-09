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
exports.SessionHistoriesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const session_histories_service_1 = require("./session-histories.service");
const session_history_entity_1 = require("./entities/session-history.entity");
const create_session_history_input_1 = require("./dto/create-session-history.input");
const update_session_history_input_1 = require("./dto/update-session-history.input");
const user_entity_1 = require("../users/entities/user.entity");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const currentUser_param_1 = require("../auth/dto/currentUser.param");
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../auth/guards/jwtAuth.guard");
let SessionHistoriesResolver = class SessionHistoriesResolver {
    constructor(sessionHistoriesService) {
        this.sessionHistoriesService = sessionHistoriesService;
    }
    findAll() {
        return this.sessionHistoriesService.findAll();
    }
    findOneById(id) {
        return this.sessionHistoriesService.findOneById(id);
    }
    createSessionHistory(createSessionHistoryInput) {
        return this.sessionHistoriesService.create(createSessionHistoryInput);
    }
    async updateSessionHistory(updateSessionHistoryInput, currentUser) {
        const canMutate = await this.sessionHistoriesService.canMutate(currentUser, updateSessionHistoryInput.id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.sessionHistoriesService.update(updateSessionHistoryInput);
    }
    async removeSessionHistory(id, currentUser) {
        const canMutate = await this.sessionHistoriesService.canMutate(currentUser, id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.sessionHistoriesService.remove(id);
    }
    user(sessionHistory) {
        const { userId } = sessionHistory;
        return this.sessionHistoriesService.getUser(userId);
    }
    trainer(sessionHistory) {
        const { trainerId } = sessionHistory;
        return this.sessionHistoriesService.getTrainer(trainerId);
    }
};
__decorate([
    graphql_1.Query(() => [session_history_entity_1.SessionHistory], { name: 'sessionHistories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SessionHistoriesResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => session_history_entity_1.SessionHistory, { name: 'sessionHistory' }),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SessionHistoriesResolver.prototype, "findOneById", null);
__decorate([
    graphql_1.Mutation(() => session_history_entity_1.SessionHistory),
    __param(0, graphql_1.Args('createSessionHistoryInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_session_history_input_1.CreateSessionHistoryInput]),
    __metadata("design:returntype", Promise)
], SessionHistoriesResolver.prototype, "createSessionHistory", null);
__decorate([
    graphql_1.Mutation(() => session_history_entity_1.SessionHistory),
    __param(0, graphql_1.Args('updateSessionHistoryInput')),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_session_history_input_1.UpdateSessionHistoryInput, Object]),
    __metadata("design:returntype", Promise)
], SessionHistoriesResolver.prototype, "updateSessionHistory", null);
__decorate([
    graphql_1.Mutation(() => session_history_entity_1.SessionHistory),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SessionHistoriesResolver.prototype, "removeSessionHistory", null);
__decorate([
    graphql_1.ResolveField((returns) => user_entity_1.User),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_history_entity_1.SessionHistory]),
    __metadata("design:returntype", Promise)
], SessionHistoriesResolver.prototype, "user", null);
__decorate([
    graphql_1.ResolveField((returns) => trainer_entity_1.Trainer),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_history_entity_1.SessionHistory]),
    __metadata("design:returntype", Promise)
], SessionHistoriesResolver.prototype, "trainer", null);
SessionHistoriesResolver = __decorate([
    graphql_1.Resolver(() => session_history_entity_1.SessionHistory),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [session_histories_service_1.SessionHistoriesService])
], SessionHistoriesResolver);
exports.SessionHistoriesResolver = SessionHistoriesResolver;
//# sourceMappingURL=session-histories.resolver.js.map