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
exports.SessionExercisesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const session_exercise_volume_entity_1 = require("../session-exercise-volumes/entities/session-exercise-volume.entity");
const session_exercise_volumes_service_1 = require("../session-exercise-volumes/session-exercise-volumes.service");
const session_entity_1 = require("../sessions/entities/session.entity");
const sessions_service_1 = require("../sessions/sessions.service");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const session_exercise_entity_1 = require("./entities/session-exercise.entity");
let SessionExercisesService = class SessionExercisesService {
    constructor(sessionExercisesRepository, sessionsService, sessionExerciseVolumesService) {
        this.sessionExercisesRepository = sessionExercisesRepository;
        this.sessionsService = sessionsService;
        this.sessionExerciseVolumesService = sessionExerciseVolumesService;
    }
    create(createSessionExerciseInput) {
        const newSessionExercise = this.sessionExercisesRepository.create(createSessionExerciseInput);
        return this.sessionExercisesRepository.save(newSessionExercise);
    }
    async bulkCreate(sessionId, names, exerciseCategoryNames) {
        const newSessionExercises = await Promise.all(names.map((name, idx) => this.create({
            sessionId,
            name,
            exerciseCategoryName: exerciseCategoryNames[idx],
        })));
        return this.sessionExercisesRepository.save(newSessionExercises);
    }
    findAll() {
        return this.sessionExercisesRepository.find();
    }
    findOneById(id) {
        return this.sessionExercisesRepository.findOneOrFail(id);
    }
    findAllBySessionId(sessionId) {
        return this.sessionExercisesRepository.find({ sessionId });
    }
    getSession(sessionId) {
        return this.sessionsService.findOneById(sessionId);
    }
    getSessionExerciseVolumes(id) {
        return this.sessionExerciseVolumesService.findAllBySessionExerciseId(id);
    }
    async remove(id) {
        const result = await this.sessionExercisesRepository.delete(id);
        return result.affected === 1;
    }
    async canMutate(currentUser, id) {
        if (currentUser instanceof user_entity_1.User)
            return false;
        const sessionExercise = await this.sessionExercisesRepository.findOneOrFail({
            where: { id },
            relations: ['session'],
        });
        return sessionExercise.session.trainerId === currentUser.id;
    }
};
SessionExercisesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(session_exercise_entity_1.SessionExercise)),
    __param(1, common_1.Inject(common_1.forwardRef(() => sessions_service_1.SessionsService))),
    __param(2, common_1.Inject(common_1.forwardRef(() => session_exercise_volumes_service_1.SessionExerciseVolumesService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        sessions_service_1.SessionsService,
        session_exercise_volumes_service_1.SessionExerciseVolumesService])
], SessionExercisesService);
exports.SessionExercisesService = SessionExercisesService;
//# sourceMappingURL=session-exercises.service.js.map