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
exports.UserCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const non_registered_user_entity_1 = require("../non-registered-users/entities/non-registered-user.entity");
const non_registered_users_service_1 = require("../non-registered-users/non-registered-users.service");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const trainers_service_1 = require("../trainers/trainers.service");
const gender_types_1 = __importDefault(require("../types/gender.types"));
const user_entity_1 = require("../users/entities/user.entity");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const user_category_entity_1 = require("./entities/user-category.entity");
let UserCategoriesService = class UserCategoriesService {
    constructor(userCategoriesRepository, trainersService, usersService, nonRegisteredUsersService) {
        this.userCategoriesRepository = userCategoriesRepository;
        this.trainersService = trainersService;
        this.usersService = usersService;
        this.nonRegisteredUsersService = nonRegisteredUsersService;
    }
    create(createUserCategoryInput) {
        const newUserCategory = this.userCategoriesRepository.create(createUserCategoryInput);
        return this.userCategoriesRepository.save(newUserCategory);
    }
    findAll() {
        return this.userCategoriesRepository.find();
    }
    findOneById(id) {
        return this.userCategoriesRepository.findOneOrFail(id);
    }
    findAllByTrainerId(trainerId) {
        return this.userCategoriesRepository.find({ trainerId });
    }
    getTrainer(trainerId) {
        return this.trainersService.findOneById(trainerId);
    }
    getUsers(id) {
        return this.usersService.findAllByUserCategoryId(id);
    }
    getNonRegisteredUsers(id) {
        return this.nonRegisteredUsersService.findAllByUserCategoryId(id);
    }
    async getLoungeInfo(trainerId) {
        const entityManager = typeorm_2.getManager();
        const data = await entityManager.query(`
    SELECT uc.id              as userCategoryId,
          uc.name            as userCategoryName,
          u.id               as userId,
          u.userName         as userName,
          u.gender           as gender,
          SUM(sh.usedCount)  as usedCount,
          SUM(sh.totalCount) as totalCount,
          CASE
              WHEN EXISTS(SELECT id FROM chats WHERE u.id = userId AND seen = false)
                  THEN true
              ELSE false
              END            as hasUnreadMessages
    FROM userCategories uc
          LEFT JOIN users u ON uc.id = u.userCategoryId
          LEFT JOIN sessionHistories sh ON u.id = sh.userId
    WHERE uc.trainerId = ${trainerId}
    GROUP BY u.id, uc.id
    ORDER BY uc.id, u.id
    `);
        return data;
    }
    async update(updateUserCategoryInput) {
        const userCategory = await this.userCategoriesRepository.findOneOrFail(updateUserCategoryInput.id);
        return this.userCategoriesRepository.save(Object.assign(Object.assign({}, userCategory), updateUserCategoryInput));
    }
    async remove(id) {
        const userCategory = await this.userCategoriesRepository.findOneOrFail(id);
        return this.userCategoriesRepository.remove(userCategory);
    }
    async canMutate(currentUser, id) {
        if (currentUser instanceof user_entity_1.User)
            return false;
        const userCategory = await this.userCategoriesRepository.findOneOrFail(id);
        if (userCategory.trainerId !== currentUser.id) {
            return false;
        }
        return true;
    }
    async createDefault(trainerId) {
        const createParams = { trainerId };
        const userCategoryNames = ['다이어트', '바디프로필', '강남점', '선릉점'];
        const userCategories = await Promise.all(userCategoryNames.map((name) => this.create(Object.assign(Object.assign({}, createParams), { name }))));
        await this.userCategoriesRepository.save(userCategories);
        return true;
    }
};
UserCategoriesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_category_entity_1.UserCategory)),
    __param(1, common_1.Inject(common_1.forwardRef(() => trainers_service_1.TrainersService))),
    __param(2, common_1.Inject(common_1.forwardRef(() => users_service_1.UsersService))),
    __param(3, common_1.Inject(common_1.forwardRef(() => non_registered_users_service_1.NonRegisteredUsersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        trainers_service_1.TrainersService,
        users_service_1.UsersService,
        non_registered_users_service_1.NonRegisteredUsersService])
], UserCategoriesService);
exports.UserCategoriesService = UserCategoriesService;
//# sourceMappingURL=user-categories.service.js.map