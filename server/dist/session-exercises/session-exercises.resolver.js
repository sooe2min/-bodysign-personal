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
exports.SessionExercisesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const session_exercises_service_1 = require("./session-exercises.service");
const session_exercise_entity_1 = require("./entities/session-exercise.entity");
const create_session_exercise_input_1 = require("./dto/create-session-exercise.input");
const session_entity_1 = require("../sessions/entities/session.entity");
const session_exercise_volume_entity_1 = require("../session-exercise-volumes/entities/session-exercise-volume.entity");
const currentUser_param_1 = require("../auth/dto/currentUser.param");
const user_entity_1 = require("../users/entities/user.entity");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../auth/guards/jwtAuth.guard");
let SessionExercisesResolver = class SessionExercisesResolver {
    constructor(sessionExercisesService) {
        this.sessionExercisesService = sessionExercisesService;
    }
    findAll() {
        return this.sessionExercisesService.findAll();
    }
    findOneById(id) {
        return this.sessionExercisesService.findOneById(id);
    }
    createSessionExercise(createSessionExerciseInput) {
        return this.sessionExercisesService.create(createSessionExerciseInput);
    }
    bulkCreateSessionExercises(sessionId, names, exerciseCategoryNames) {
        return this.sessionExercisesService.bulkCreate(sessionId, names, exerciseCategoryNames);
    }
    async removeSessionExercise(id, currentUser) {
        const canMutate = await this.sessionExercisesService.canMutate(currentUser, id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return await this.sessionExercisesService.remove(id);
    }
    session(sessionExercise) {
        return this.sessionExercisesService.getSession(sessionExercise.sessionId);
    }
    sessionExerciseVolumes(sessionExercise) {
        const { id } = sessionExercise;
        return this.sessionExercisesService.getSessionExerciseVolumes(id);
    }
};
__decorate([
    graphql_1.Query(() => [session_exercise_entity_1.SessionExercise], { name: 'sessionExercises' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SessionExercisesResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => session_exercise_entity_1.SessionExercise, { name: 'sessionExercise' }),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SessionExercisesResolver.prototype, "findOneById", null);
__decorate([
    graphql_1.Mutation(() => session_exercise_entity_1.SessionExercise),
    __param(0, graphql_1.Args('createSessionExerciseInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_session_exercise_input_1.CreateSessionExerciseInput]),
    __metadata("design:returntype", void 0)
], SessionExercisesResolver.prototype, "createSessionExercise", null);
__decorate([
    graphql_1.Mutation(() => [session_exercise_entity_1.SessionExercise]),
    __param(0, graphql_1.Args('sessionId', { type: () => graphql_1.Int })),
    __param(1, graphql_1.Args('names', { type: () => [String] })),
    __param(2, graphql_1.Args('exerciseCategoryNames', { type: () => [String] })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, Array]),
    __metadata("design:returntype", Promise)
], SessionExercisesResolver.prototype, "bulkCreateSessionExercises", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SessionExercisesResolver.prototype, "removeSessionExercise", null);
__decorate([
    graphql_1.ResolveField((returns) => session_entity_1.Session),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_exercise_entity_1.SessionExercise]),
    __metadata("design:returntype", Promise)
], SessionExercisesResolver.prototype, "session", null);
__decorate([
    graphql_1.ResolveField((returns) => [session_exercise_volume_entity_1.SessionExerciseVolume]),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_exercise_entity_1.SessionExercise]),
    __metadata("design:returntype", Promise)
], SessionExercisesResolver.prototype, "sessionExerciseVolumes", null);
SessionExercisesResolver = __decorate([
    graphql_1.Resolver(() => session_exercise_entity_1.SessionExercise),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [session_exercises_service_1.SessionExercisesService])
], SessionExercisesResolver);
exports.SessionExercisesResolver = SessionExercisesResolver;
//# sourceMappingURL=session-exercises.resolver.js.map