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
exports.SessionExerciseVolumesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const session_exercise_entity_1 = require("../session-exercises/entities/session-exercise.entity");
const session_exercises_service_1 = require("../session-exercises/session-exercises.service");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const session_exercise_volume_entity_1 = require("./entities/session-exercise-volume.entity");
let SessionExerciseVolumesService = class SessionExerciseVolumesService {
    constructor(sessionExerciseVolumesRepository, sessionExercisesService) {
        this.sessionExerciseVolumesRepository = sessionExerciseVolumesRepository;
        this.sessionExercisesService = sessionExercisesService;
    }
    async create(createSessionExerciseVolumeInput) {
        const [lastSeqSessionExerciseVolume] = await this.sessionExerciseVolumesRepository.find({
            where: {
                sessionExerciseId: createSessionExerciseVolumeInput.sessionExerciseId,
            },
            order: {
                seq: 'DESC',
            },
            take: 1,
        });
        const newSessionExerciseVolume = this.sessionExerciseVolumesRepository.create(createSessionExerciseVolumeInput);
        if (lastSeqSessionExerciseVolume) {
            newSessionExerciseVolume.seq = lastSeqSessionExerciseVolume.seq + 1;
        }
        return this.sessionExerciseVolumesRepository.save(newSessionExerciseVolume);
    }
    findAll() {
        return this.sessionExerciseVolumesRepository.find();
    }
    findOneById(id) {
        return this.sessionExerciseVolumesRepository.findOneOrFail(id);
    }
    findAllBySessionExerciseId(sessionExerciseId) {
        return this.sessionExerciseVolumesRepository.find({
            sessionExerciseId,
        });
    }
    getSessionExercise(sessionExerciseId) {
        return this.sessionExercisesService.findOneById(sessionExerciseId);
    }
    async update(updateSessionExerciseVolumeInput) {
        const sessionExerciseVolume = await this.sessionExerciseVolumesRepository.findOneOrFail(updateSessionExerciseVolumeInput.id);
        return this.sessionExerciseVolumesRepository.save(Object.assign(Object.assign({}, sessionExerciseVolume), updateSessionExerciseVolumeInput));
    }
    async remove(id) {
        const result = await this.sessionExerciseVolumesRepository.delete(id);
        return result.affected === 1;
    }
    async canMutate(currentUser, id) {
        if (currentUser instanceof user_entity_1.User)
            return false;
        const sessionExerciseVolume = await this.sessionExerciseVolumesRepository.findOneOrFail({
            where: { id },
            relations: ['sessionExercise', 'sessionExercise.session'],
        });
        return (sessionExerciseVolume.sessionExercise.session.trainerId === currentUser.id);
    }
};
SessionExerciseVolumesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(session_exercise_volume_entity_1.SessionExerciseVolume)),
    __param(1, common_1.Inject(common_1.forwardRef(() => session_exercises_service_1.SessionExercisesService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        session_exercises_service_1.SessionExercisesService])
], SessionExerciseVolumesService);
exports.SessionExerciseVolumesService = SessionExerciseVolumesService;
//# sourceMappingURL=session-exercise-volumes.service.js.map