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
exports.SessionHistoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const trainers_service_1 = require("../trainers/trainers.service");
const user_entity_1 = require("../users/entities/user.entity");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const session_history_entity_1 = require("./entities/session-history.entity");
let SessionHistoriesService = class SessionHistoriesService {
    constructor(sessionHistoriesRepository, usersService, trainersService) {
        this.sessionHistoriesRepository = sessionHistoriesRepository;
        this.usersService = usersService;
        this.trainersService = trainersService;
    }
    async create(createSessionHistoryInput) {
        const user = await this.usersService.findOneById(createSessionHistoryInput.userId);
        const createParams = Object.assign(Object.assign({}, createSessionHistoryInput), { trainerId: user.trainerId });
        const newSessionHistory = this.sessionHistoriesRepository.create(createParams);
        return this.sessionHistoriesRepository.save(newSessionHistory);
    }
    findAll() {
        return this.sessionHistoriesRepository.find();
    }
    findOneById(id) {
        return this.sessionHistoriesRepository.findOneOrFail(id);
    }
    findAllByUserId(userId) {
        return this.sessionHistoriesRepository.find({ userId });
    }
    findAllByTrainerId(trainerId) {
        return this.sessionHistoriesRepository.find({ trainerId });
    }
    async findOneToAddUsedCountByUserIdAndTrainerId(userId, trainerId) {
        return await this.sessionHistoriesRepository
            .createQueryBuilder('sessionHistory')
            .where('sessionHistory.trainerId = :trainerId AND sessionHistory.userId = :userId', { userId, trainerId })
            .where('sessionHistory.totalCount - sessionHistory.usedCount > 0')
            .orderBy('sessionHistory.createdAt', 'ASC')
            .take(1)
            .getOne();
    }
    async findOneToSubtractUsedCountByUserIdAndTrainerId(userId, trainerId) {
        const sessionHistory = await this.sessionHistoriesRepository
            .createQueryBuilder('sessionHistory')
            .where('sessionHistory.trainerId = :trainerId AND sessionHistory.userId = :userId', { userId, trainerId })
            .where('sessionHistory.usedCount != sessionHistory.totalCount')
            .orderBy('sessionHistory.createdAt', 'ASC')
            .take(1)
            .getOne();
        if (sessionHistory && sessionHistory.usedCount > 0) {
            return sessionHistory;
        }
        return await this.sessionHistoriesRepository
            .createQueryBuilder('sessionHistory')
            .where('sessionHistory.trainerId = :trainerId AND sessionHistory.userId = :userId', { userId, trainerId })
            .where('sessionHistory.usedCount = sessionHistory.totalCount')
            .orderBy('sessionHistory.createdAt', 'DESC')
            .take(1)
            .getOne();
    }
    getUser(userId) {
        return this.usersService.findOneById(userId);
    }
    getTrainer(trainerId) {
        return this.trainersService.findOneById(trainerId);
    }
    async update(updateSessionHistoryInput) {
        const sessionHistory = await this.sessionHistoriesRepository.findOneOrFail(updateSessionHistoryInput.id);
        return this.sessionHistoriesRepository.save(Object.assign(Object.assign({}, sessionHistory), updateSessionHistoryInput));
    }
    async remove(id) {
        const sessionHistory = await this.sessionHistoriesRepository.findOneOrFail(id);
        return this.sessionHistoriesRepository.remove(sessionHistory);
    }
    async canMutate(currentUser, id) {
        if (currentUser instanceof user_entity_1.User)
            return false;
        const sessionHistory = await this.sessionHistoriesRepository.findOneOrFail(id);
        if (sessionHistory.trainerId !== currentUser.id) {
            return false;
        }
        return true;
    }
};
SessionHistoriesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(session_history_entity_1.SessionHistory)),
    __param(1, common_1.Inject(common_1.forwardRef(() => users_service_1.UsersService))),
    __param(2, common_1.Inject(common_1.forwardRef(() => trainers_service_1.TrainersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        trainers_service_1.TrainersService])
], SessionHistoriesService);
exports.SessionHistoriesService = SessionHistoriesService;
//# sourceMappingURL=session-histories.service.js.map