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
exports.NonRegisteredUsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const trainers_service_1 = require("../trainers/trainers.service");
const user_category_entity_1 = require("../user-categories/entities/user-category.entity");
const user_categories_service_1 = require("../user-categories/user-categories.service");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const non_registered_user_entity_1 = require("./entities/non-registered-user.entity");
let NonRegisteredUsersService = class NonRegisteredUsersService {
    constructor(nonRegisteredUsersRepository, trainersService, userCategoriesService) {
        this.nonRegisteredUsersRepository = nonRegisteredUsersRepository;
        this.trainersService = trainersService;
        this.userCategoriesService = userCategoriesService;
    }
    create(createNonRegisteredUserInput) {
        const newNonRegisteredUser = this.nonRegisteredUsersRepository.create(createNonRegisteredUserInput);
        return this.nonRegisteredUsersRepository.save(newNonRegisteredUser);
    }
    findAll() {
        return this.nonRegisteredUsersRepository.find();
    }
    findOneById(id) {
        return this.nonRegisteredUsersRepository.findOneOrFail(id);
    }
    findAllByTrainerId(trainerId) {
        return this.nonRegisteredUsersRepository.find({ trainerId });
    }
    findAllByUserCategoryId(userCategoryId) {
        return this.nonRegisteredUsersRepository.find({ userCategoryId });
    }
    getTrainer(trainerId) {
        return this.trainersService.findOneById(trainerId);
    }
    getUserCategory(userCategoryId) {
        return this.userCategoriesService.findOneById(userCategoryId);
    }
    async update(updateNonRegisteredUserInput) {
        const nonRegisteredUser = await this.nonRegisteredUsersRepository.findOneOrFail(updateNonRegisteredUserInput.id);
        return this.nonRegisteredUsersRepository.save(Object.assign(Object.assign({}, nonRegisteredUser), updateNonRegisteredUserInput));
    }
    async remove(id) {
        const nonRegisteredUser = await this.nonRegisteredUsersRepository.findOneOrFail(id);
        return this.nonRegisteredUsersRepository.remove(nonRegisteredUser);
    }
    async canMutate(currentUser, id) {
        if (currentUser instanceof user_entity_1.User)
            return false;
        const nonRegisteredUser = await this.nonRegisteredUsersRepository.findOneOrFail(id);
        if (nonRegisteredUser.trainerId !== currentUser.id) {
            return false;
        }
        return true;
    }
};
NonRegisteredUsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(non_registered_user_entity_1.NonRegisteredUser)),
    __param(1, common_1.Inject(common_1.forwardRef(() => trainers_service_1.TrainersService))),
    __param(2, common_1.Inject(common_1.forwardRef(() => user_categories_service_1.UserCategoriesService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        trainers_service_1.TrainersService,
        user_categories_service_1.UserCategoriesService])
], NonRegisteredUsersService);
exports.NonRegisteredUsersService = NonRegisteredUsersService;
//# sourceMappingURL=non-registered-users.service.js.map