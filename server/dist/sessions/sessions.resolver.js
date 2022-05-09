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
exports.SessionsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const sessions_service_1 = require("./sessions.service");
const session_entity_1 = require("./entities/session.entity");
const create_session_input_1 = require("./dto/create-session.input");
const update_session_input_1 = require("./dto/update-session.input");
const session_exercises_service_1 = require("../session-exercises/session-exercises.service");
const currentUser_param_1 = require("../auth/dto/currentUser.param");
const user_entity_1 = require("../users/entities/user.entity");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../auth/guards/jwtAuth.guard");
let SessionsResolver = class SessionsResolver {
    constructor(sessionsService, sessionExerciseService) {
        this.sessionsService = sessionsService;
        this.sessionExerciseService = sessionExerciseService;
    }
    findAll() {
        return this.sessionsService.findAll();
    }
    findOneById(id) {
        return this.sessionsService.findOneById(id);
    }
    findAllSessionsByUserId(userId) {
        return this.sessionsService.findAllByUserId(userId);
    }
    findAllSessionsByTrainerId(trainerId) {
        return this.sessionsService.findAllByTrainerId(trainerId);
    }
    createSession(createSessionInput) {
        return this.sessionsService.create(createSessionInput);
    }
    async updateSession(updateSessionInput, currentUser) {
        const canMutate = await this.sessionsService.canMutate(currentUser, updateSessionInput.id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.sessionsService.update(updateSessionInput);
    }
    async removeSession(id, currentUser) {
        const canMutate = await this.sessionsService.canMutate(currentUser, id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.sessionsService.remove(id);
    }
    sessionExercises(session) {
        const { id } = session;
        return this.sessionExerciseService.findAllBySessionId(id);
    }
    user(session) {
        const { userId } = session;
        return this.sessionsService.getUser(userId);
    }
    trainer(session) {
        const { trainerId } = session;
        return this.sessionsService.getTrainer(trainerId);
    }
};
__decorate([
    graphql_1.Query(() => [session_entity_1.Session], { name: 'sessions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SessionsResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => session_entity_1.Session, { name: 'session' }),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SessionsResolver.prototype, "findOneById", null);
__decorate([
    graphql_1.Query(() => [session_entity_1.Session]),
    __param(0, graphql_1.Args('userId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SessionsResolver.prototype, "findAllSessionsByUserId", null);
__decorate([
    graphql_1.Query(() => [session_entity_1.Session]),
    __param(0, graphql_1.Args('trainerId', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SessionsResolver.prototype, "findAllSessionsByTrainerId", null);
__decorate([
    graphql_1.Mutation(() => session_entity_1.Session),
    __param(0, graphql_1.Args('createSessionInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_session_input_1.CreateSessionInput]),
    __metadata("design:returntype", Promise)
], SessionsResolver.prototype, "createSession", null);
__decorate([
    graphql_1.Mutation(() => session_entity_1.Session),
    __param(0, graphql_1.Args('updateSessionInput')),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_session_input_1.UpdateSessionInput, Object]),
    __metadata("design:returntype", Promise)
], SessionsResolver.prototype, "updateSession", null);
__decorate([
    graphql_1.Mutation(() => session_entity_1.Session),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SessionsResolver.prototype, "removeSession", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_entity_1.Session]),
    __metadata("design:returntype", void 0)
], SessionsResolver.prototype, "sessionExercises", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_entity_1.Session]),
    __metadata("design:returntype", void 0)
], SessionsResolver.prototype, "user", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_entity_1.Session]),
    __metadata("design:returntype", void 0)
], SessionsResolver.prototype, "trainer", null);
SessionsResolver = __decorate([
    graphql_1.Resolver(() => session_entity_1.Session),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [sessions_service_1.SessionsService,
        session_exercises_service_1.SessionExercisesService])
], SessionsResolver);
exports.SessionsResolver = SessionsResolver;
//# sourceMappingURL=sessions.resolver.js.map