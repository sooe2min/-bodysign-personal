"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const trainer_entity_1 = require("./entities/trainer.entity");
const bcrypt = __importStar(require("bcrypt"));
const users_service_1 = require("../users/users.service");
const sessions_service_1 = require("../sessions/sessions.service");
const exercise_categories_service_1 = require("../exercise-categories/exercise-categories.service");
const session_entity_1 = require("../sessions/entities/session.entity");
const exercise_category_entity_1 = require("../exercise-categories/entities/exercise-category.entity");
const non_registered_user_entity_1 = require("../non-registered-users/entities/non-registered-user.entity");
const non_registered_users_service_1 = require("../non-registered-users/non-registered-users.service");
const user_category_entity_1 = require("../user-categories/entities/user-category.entity");
const user_categories_service_1 = require("../user-categories/user-categories.service");
const user_entity_1 = require("../users/entities/user.entity");
const generalStatus_types_1 = __importDefault(require("../types/generalStatus.types"));
const session_history_entity_1 = require("../session-histories/entities/session-history.entity");
const session_histories_service_1 = require("../session-histories/session-histories.service");
const trainer_interest_service_1 = require("../trainer-interest/trainer-interest.service");
const trainerInterest_entity_1 = require("../trainer-interest/entities/trainerInterest.entity");
const refresh_tokens_service_1 = require("../refresh-tokens/refresh-tokens.service");
let TrainersService = class TrainersService {
    constructor(trainersRepository, usersService, sessionsService, exerciseCategoriesService, nonRegisteredUsersService, userCategoriesService, sessionHistoriesService, trainerInterestService, refreshTokensService) {
        this.trainersRepository = trainersRepository;
        this.usersService = usersService;
        this.sessionsService = sessionsService;
        this.exerciseCategoriesService = exerciseCategoriesService;
        this.nonRegisteredUsersService = nonRegisteredUsersService;
        this.userCategoriesService = userCategoriesService;
        this.sessionHistoriesService = sessionHistoriesService;
        this.trainerInterestService = trainerInterestService;
        this.refreshTokensService = refreshTokensService;
    }
    async create(createTrainerInput) {
        const user = await this.usersService.findOneByEmail(createTrainerInput.email);
        const trainer = await this.findOneByEmail(createTrainerInput.email);
        if (trainer || user) {
            throw new common_1.ConflictException('Existing Email');
        }
        const { interests } = createTrainerInput, createParams = __rest(createTrainerInput, ["interests"]);
        const newTrainer = this.trainersRepository.create(createParams);
        const salt = await bcrypt.genSalt();
        const password = newTrainer.password;
        const hash = await bcrypt.hash(password, salt);
        newTrainer.dbPasswordSalt = salt;
        newTrainer.password = hash;
        await this.trainersRepository.save(newTrainer);
        await this.trainerInterestService.bulkCreate(newTrainer.id, interests);
        this.exerciseCategoriesService.createDefault(newTrainer.id);
        this.userCategoriesService.createDefault(newTrainer.id);
        return this.trainersRepository.findOneOrFail(newTrainer.id);
    }
    async createSocialTrainer(createSocialTrainerInput) {
        const user = await this.usersService.findOneByEmail(createSocialTrainerInput.email);
        const trainer = await this.findOneByEmail(createSocialTrainerInput.email);
        if (trainer || user) {
            throw new common_1.ConflictException('Existing Email');
        }
        const { interests } = createSocialTrainerInput, createParams = __rest(createSocialTrainerInput, ["interests"]);
        const newTrainer = this.trainersRepository.create(createParams);
        await this.trainersRepository.save(newTrainer);
        await this.trainerInterestService.bulkCreate(newTrainer.id, interests);
        this.exerciseCategoriesService.createDefault(newTrainer.id);
        this.userCategoriesService.createDefault(newTrainer.id);
        return this.trainersRepository.findOneOrFail(newTrainer.id);
    }
    findAll() {
        return this.trainersRepository.find({
            where: { status: generalStatus_types_1.default.ACTIVE },
        });
    }
    findOneById(id) {
        return this.trainersRepository.findOneOrFail({
            where: { id, status: generalStatus_types_1.default.ACTIVE },
        });
    }
    findOneByEmail(email) {
        return this.trainersRepository.findOne({
            where: { email, status: generalStatus_types_1.default.ACTIVE },
        });
    }
    findOneUserByPhoneNumber(phoneNumber) {
        return this.usersService.findOneByPhoneNumber(null, phoneNumber);
    }
    findAllUsers(id) {
        return this.usersService.findAllByTrainerId(id);
    }
    findAllSessionsByTrainerId(trainerId) {
        return this.sessionsService.findAllByTrainerId(trainerId);
    }
    findAllExerciseCategoriesByTrainerId(trainerId) {
        return this.exerciseCategoriesService.findAllByTrainerId(trainerId);
    }
    findAllNonRegisteredUsersByTrainerId(trainerId) {
        return this.nonRegisteredUsersService.findAllByTrainerId(trainerId);
    }
    findAllUserCategoriesByTrainerId(trainerId) {
        return this.userCategoriesService.findAllByTrainerId(trainerId);
    }
    findAllSessionHistoriesByTrainerId(trainerId) {
        return this.sessionHistoriesService.findAllByTrainerId(trainerId);
    }
    findAllTrainerInterestsByTrainerId(trainerId) {
        return this.trainerInterestService.findAllByTrainerId(trainerId);
    }
    async update(updateTrainerInput) {
        const trainer = await this.findOneById(updateTrainerInput.id);
        const { interests } = updateTrainerInput, updateParams = __rest(updateTrainerInput, ["interests"]);
        if (interests && interests.length > 0) {
            await this.trainerInterestService.bulkRemove(trainer.id);
            await this.trainerInterestService.bulkCreate(trainer.id, interests);
        }
        await this.trainersRepository.save(Object.assign(Object.assign({}, trainer), updateParams));
        return this.trainersRepository.findOneOrFail(trainer.id);
    }
    async updatePasswordTrainer(updatePasswordTrainerInput) {
        const id = updatePasswordTrainerInput.id;
        const trainer = await this.findOneById(id);
        const currPassword = await this.findPasswordByEmailUsingQueryBuilder(trainer.email);
        const checkPassword = await bcrypt.compare(updatePasswordTrainerInput.prevPassword, currPassword);
        if (!checkPassword) {
            throw new Error('Invalid Password.');
        }
        const findSelectTrainer = await this.trainersRepository
            .createQueryBuilder('trainers')
            .where('trainers.id = :id', { id })
            .addSelect('trainers.dbPasswordSalt')
            .getOne();
        const updatePassword = await bcrypt.hash(updatePasswordTrainerInput.nowPassword, findSelectTrainer.dbPasswordSalt);
        const _a = await this.trainersRepository.save(Object.assign(Object.assign({}, trainer), { password: updatePassword })), { password, dbPasswordSalt } = _a, updatedTrainer = __rest(_a, ["password", "dbPasswordSalt"]);
        return updatedTrainer;
    }
    async remove(id) {
        const trainer = await this.findOneById(id);
        trainer.status = generalStatus_types_1.default.REMOVED;
        return this.trainersRepository.save(trainer);
    }
    async findPasswordByEmailUsingQueryBuilder(email) {
        const trainer = await this.trainersRepository
            .createQueryBuilder('trainers')
            .where('trainers.email = :email', { email })
            .addSelect('trainers.password')
            .getOne();
        return trainer.password;
    }
    async canMutate(currentUser, id) {
        if (currentUser instanceof user_entity_1.User)
            return false;
        const trainer = await this.trainersRepository.findOneOrFail(id);
        return trainer.id === currentUser.id;
    }
};
TrainersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(trainer_entity_1.Trainer)),
    __param(1, common_1.Inject(common_1.forwardRef(() => users_service_1.UsersService))),
    __param(2, common_1.Inject(common_1.forwardRef(() => sessions_service_1.SessionsService))),
    __param(3, common_1.Inject(common_1.forwardRef(() => exercise_categories_service_1.ExerciseCategoriesService))),
    __param(4, common_1.Inject(common_1.forwardRef(() => non_registered_users_service_1.NonRegisteredUsersService))),
    __param(5, common_1.Inject(common_1.forwardRef(() => user_categories_service_1.UserCategoriesService))),
    __param(6, common_1.Inject(common_1.forwardRef(() => session_histories_service_1.SessionHistoriesService))),
    __param(7, common_1.Inject(common_1.forwardRef(() => trainer_interest_service_1.TrainerInterestService))),
    __param(8, common_1.Inject(common_1.forwardRef(() => refresh_tokens_service_1.RefreshTokenService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        sessions_service_1.SessionsService,
        exercise_categories_service_1.ExerciseCategoriesService,
        non_registered_users_service_1.NonRegisteredUsersService,
        user_categories_service_1.UserCategoriesService,
        session_histories_service_1.SessionHistoriesService,
        trainer_interest_service_1.TrainerInterestService,
        refresh_tokens_service_1.RefreshTokenService])
], TrainersService);
exports.TrainersService = TrainersService;
//# sourceMappingURL=trainers.service.js.map