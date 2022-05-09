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
exports.SessionExerciseVolumesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const session_exercise_volumes_service_1 = require("./session-exercise-volumes.service");
const session_exercise_volume_entity_1 = require("./entities/session-exercise-volume.entity");
const create_session_exercise_volume_input_1 = require("./dto/create-session-exercise-volume.input");
const update_session_exercise_volume_input_1 = require("./dto/update-session-exercise-volume.input");
const currentUser_param_1 = require("../auth/dto/currentUser.param");
const user_entity_1 = require("../users/entities/user.entity");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../auth/guards/jwtAuth.guard");
let SessionExerciseVolumesResolver = class SessionExerciseVolumesResolver {
    constructor(sessionExerciseVolumesService) {
        this.sessionExerciseVolumesService = sessionExerciseVolumesService;
    }
    findAll() {
        return this.sessionExerciseVolumesService.findAll();
    }
    findOne(id) {
        return this.sessionExerciseVolumesService.findOneById(id);
    }
    createSessionExerciseVolume(createSessionExerciseVolumeInput) {
        return this.sessionExerciseVolumesService.create(createSessionExerciseVolumeInput);
    }
    async updateSessionExerciseVolume(updateSessionExerciseVolumeInput, currentUser) {
        const canMutate = await this.sessionExerciseVolumesService.canMutate(currentUser, updateSessionExerciseVolumeInput.id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.sessionExerciseVolumesService.update(updateSessionExerciseVolumeInput);
    }
    async removeSessionExerciseVolume(id, currentUser) {
        const canMutate = await this.sessionExerciseVolumesService.canMutate(currentUser, id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.sessionExerciseVolumesService.remove(id);
    }
    sessionExercise(sessionExerciseVolume) {
        const { sessionExerciseId } = sessionExerciseVolume;
        return this.sessionExerciseVolumesService.getSessionExercise(sessionExerciseId);
    }
};
__decorate([
    graphql_1.Query(() => [session_exercise_volume_entity_1.SessionExerciseVolume], { name: 'sessionExerciseVolumes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SessionExerciseVolumesResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => session_exercise_volume_entity_1.SessionExerciseVolume, { name: 'sessionExerciseVolume' }),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], SessionExerciseVolumesResolver.prototype, "findOne", null);
__decorate([
    graphql_1.Mutation(() => session_exercise_volume_entity_1.SessionExerciseVolume),
    __param(0, graphql_1.Args('createSessionExerciseVolumeInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_session_exercise_volume_input_1.CreateSessionExerciseVolumeInput]),
    __metadata("design:returntype", Promise)
], SessionExerciseVolumesResolver.prototype, "createSessionExerciseVolume", null);
__decorate([
    graphql_1.Mutation(() => session_exercise_volume_entity_1.SessionExerciseVolume),
    __param(0, graphql_1.Args('updateSessionExerciseVolumeInput')),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_session_exercise_volume_input_1.UpdateSessionExerciseVolumeInput, Object]),
    __metadata("design:returntype", Promise)
], SessionExerciseVolumesResolver.prototype, "updateSessionExerciseVolume", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SessionExerciseVolumesResolver.prototype, "removeSessionExerciseVolume", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [session_exercise_volume_entity_1.SessionExerciseVolume]),
    __metadata("design:returntype", void 0)
], SessionExerciseVolumesResolver.prototype, "sessionExercise", null);
SessionExerciseVolumesResolver = __decorate([
    graphql_1.Resolver(() => session_exercise_volume_entity_1.SessionExerciseVolume),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [session_exercise_volumes_service_1.SessionExerciseVolumesService])
], SessionExerciseVolumesResolver);
exports.SessionExerciseVolumesResolver = SessionExerciseVolumesResolver;
//# sourceMappingURL=session-exercise-volumes.resolver.js.map