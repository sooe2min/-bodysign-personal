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
exports.SessionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const session_histories_service_1 = require("../session-histories/session-histories.service");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const trainers_service_1 = require("../trainers/trainers.service");
const sessionStatus_types_1 = __importDefault(require("../types/sessionStatus.types"));
const user_entity_1 = require("../users/entities/user.entity");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const session_entity_1 = require("./entities/session.entity");
let SessionsService = class SessionsService {
    constructor(sessionsRepository, usersService, trainersService, sessionHistoriesService) {
        this.sessionsRepository = sessionsRepository;
        this.usersService = usersService;
        this.trainersService = trainersService;
        this.sessionHistoriesService = sessionHistoriesService;
    }
    create(createSessionInput) {
        const newSession = this.sessionsRepository.create(createSessionInput);
        return this.sessionsRepository.save(newSession);
    }
    findAll() {
        return this.sessionsRepository.find();
    }
    findOneById(id) {
        return this.sessionsRepository.findOneOrFail(id);
    }
    findAllByTrainerId(trainerId) {
        return this.sessionsRepository.find({
            where: {
                trainerId,
                status: sessionStatus_types_1.default.ACTIVE,
            },
            order: {
                userId: 'ASC',
            },
        });
    }
    findAllByUserId(userId) {
        return this.sessionsRepository.find({
            where: {
                userId,
                status: sessionStatus_types_1.default.ACTIVE,
            },
            order: {
                userId: 'ASC',
            },
        });
    }
    getUser(userId) {
        return this.usersService.findOneById(userId);
    }
    getTrainer(trainerId) {
        return this.trainersService.findOneById(trainerId);
    }
    async update(updateSessionInput) {
        const session = await this.sessionsRepository.findOneOrFail(updateSessionInput.id);
        if (session.completedSession && updateSessionInput.completedSession) {
            throw new common_1.BadRequestException('Session is already completed');
        }
        if ('completedSession' in updateSessionInput &&
            updateSessionInput.completedSession != session.completedSession) {
            const { completedSession } = updateSessionInput;
            let sessionHistory;
            if (completedSession) {
                sessionHistory =
                    await this.sessionHistoriesService.findOneToAddUsedCountByUserIdAndTrainerId(session.userId, session.trainerId);
            }
            else {
                sessionHistory =
                    await this.sessionHistoriesService.findOneToSubtractUsedCountByUserIdAndTrainerId(session.userId, session.trainerId);
            }
            if (!sessionHistory) {
                throw new common_1.BadRequestException('User does not have available session');
            }
            await this.sessionHistoriesService.update({
                id: sessionHistory.id,
                usedCount: sessionHistory.usedCount + (completedSession ? 1 : -1),
            });
        }
        return this.sessionsRepository.save(Object.assign(Object.assign({}, session), updateSessionInput));
    }
    async remove(id) {
        const session = await this.sessionsRepository.findOneOrFail(id);
        return this.sessionsRepository.remove(session);
    }
    async canMutate(currentUser, id) {
        const session = await this.findOneById(id);
        if (currentUser instanceof user_entity_1.User) {
            return session.userId === currentUser.id;
        }
        else {
            return session.trainerId === currentUser.id;
        }
    }
};
SessionsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(session_entity_1.Session)),
    __param(1, common_1.Inject(common_1.forwardRef(() => users_service_1.UsersService))),
    __param(2, common_1.Inject(common_1.forwardRef(() => trainers_service_1.TrainersService))),
    __param(3, common_1.Inject(common_1.forwardRef(() => session_histories_service_1.SessionHistoriesService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        trainers_service_1.TrainersService,
        session_histories_service_1.SessionHistoriesService])
], SessionsService);
exports.SessionsService = SessionsService;
//# sourceMappingURL=sessions.service.js.map