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
exports.TrainersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const trainers_service_1 = require("./trainers.service");
const trainer_entity_1 = require("./entities/trainer.entity");
const create_trainer_input_1 = require("./dto/create-trainer.input");
const update_trainer_input_1 = require("./dto/update-trainer.input");
const updatePassword_trainer_input_1 = require("./dto/updatePassword-trainer.input");
const user_entity_1 = require("../users/entities/user.entity");
const create_socialTrainer_input_1 = require("./dto/create-socialTrainer.input");
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../auth/guards/jwtAuth.guard");
const currentUser_param_1 = require("../auth/dto/currentUser.param");
let TrainersResolver = class TrainersResolver {
    constructor(trainersService) {
        this.trainersService = trainersService;
    }
    findAll() {
        return this.trainersService.findAll();
    }
    findOneById(id) {
        return this.trainersService.findOneById(id);
    }
    async findOneUserByPhoneNumber(phoneNumber) {
        const user = await this.trainersService.findOneUserByPhoneNumber(phoneNumber);
        if (!(user instanceof user_entity_1.User)) {
            throw new common_1.NotFoundException();
        }
        return user;
    }
    createTrainer(createTrainerInput) {
        return this.trainersService.create(createTrainerInput);
    }
    createSocialTrainer(createSocialTrainerInput) {
        return this.trainersService.createSocialTrainer(createSocialTrainerInput);
    }
    updateTrainer(updateTrainerInput, currentUser) {
        const canMutate = this.trainersService.canMutate(currentUser, updateTrainerInput.id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.trainersService.update(updateTrainerInput);
    }
    removeTrainer(id) {
        return this.trainersService.remove(id);
    }
    updatePasswordTrainer(updatePasswordTrainerInput, currentUser) {
        const canMutate = this.trainersService.canMutate(currentUser, updatePasswordTrainerInput.id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.trainersService.updatePasswordTrainer(updatePasswordTrainerInput);
    }
    users(trainer) {
        const { id } = trainer;
        return this.trainersService.findAllUsers(id);
    }
    sessions(trainer) {
        const { id } = trainer;
        return this.trainersService.findAllSessionsByTrainerId(id);
    }
    exerciseCategories(trainer) {
        const { id } = trainer;
        return this.trainersService.findAllExerciseCategoriesByTrainerId(id);
    }
    nonRegisteredUsers(trainer) {
        const { id } = trainer;
        return this.trainersService.findAllNonRegisteredUsersByTrainerId(id);
    }
    userCategories(trainer) {
        const { id } = trainer;
        return this.trainersService.findAllUserCategoriesByTrainerId(id);
    }
    sessionHistories(trainer) {
        const { id } = trainer;
        return this.trainersService.findAllSessionHistoriesByTrainerId(id);
    }
    trainerInterests(trainer) {
        const { id } = trainer;
        return this.trainersService.findAllTrainerInterestsByTrainerId(id);
    }
};
__decorate([
    graphql_1.Query(() => [trainer_entity_1.Trainer], { name: 'trainers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrainersResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => trainer_entity_1.Trainer, { name: 'trainer' }),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TrainersResolver.prototype, "findOneById", null);
__decorate([
    graphql_1.Query(() => user_entity_1.User),
    __param(0, graphql_1.Args('phoneNumber', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TrainersResolver.prototype, "findOneUserByPhoneNumber", null);
__decorate([
    graphql_1.Mutation(() => trainer_entity_1.Trainer),
    __param(0, graphql_1.Args('createTrainerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_trainer_input_1.CreateTrainerInput]),
    __metadata("design:returntype", Promise)
], TrainersResolver.prototype, "createTrainer", null);
__decorate([
    graphql_1.Mutation(() => trainer_entity_1.Trainer),
    __param(0, graphql_1.Args('createSocialTrainerInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_socialTrainer_input_1.CreateSocialTrainerInput]),
    __metadata("design:returntype", void 0)
], TrainersResolver.prototype, "createSocialTrainer", null);
__decorate([
    graphql_1.Mutation(() => trainer_entity_1.Trainer),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    __param(0, graphql_1.Args('updateTrainerInput')),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_trainer_input_1.UpdateTrainerInput, Object]),
    __metadata("design:returntype", void 0)
], TrainersResolver.prototype, "updateTrainer", null);
__decorate([
    graphql_1.Mutation(() => trainer_entity_1.Trainer),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TrainersResolver.prototype, "removeTrainer", null);
__decorate([
    graphql_1.Mutation(() => trainer_entity_1.Trainer),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    __param(0, graphql_1.Args('updatePasswordTrainerInput')),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatePassword_trainer_input_1.UpdatePasswordTrainerInput, Object]),
    __metadata("design:returntype", Promise)
], TrainersResolver.prototype, "updatePasswordTrainer", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trainer_entity_1.Trainer]),
    __metadata("design:returntype", void 0)
], TrainersResolver.prototype, "users", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trainer_entity_1.Trainer]),
    __metadata("design:returntype", void 0)
], TrainersResolver.prototype, "sessions", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trainer_entity_1.Trainer]),
    __metadata("design:returntype", void 0)
], TrainersResolver.prototype, "exerciseCategories", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trainer_entity_1.Trainer]),
    __metadata("design:returntype", void 0)
], TrainersResolver.prototype, "nonRegisteredUsers", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trainer_entity_1.Trainer]),
    __metadata("design:returntype", void 0)
], TrainersResolver.prototype, "userCategories", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trainer_entity_1.Trainer]),
    __metadata("design:returntype", void 0)
], TrainersResolver.prototype, "sessionHistories", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trainer_entity_1.Trainer]),
    __metadata("design:returntype", void 0)
], TrainersResolver.prototype, "trainerInterests", null);
TrainersResolver = __decorate([
    graphql_1.Resolver(() => trainer_entity_1.Trainer),
    __metadata("design:paramtypes", [trainers_service_1.TrainersService])
], TrainersResolver);
exports.TrainersResolver = TrainersResolver;
//# sourceMappingURL=trainers.resolver.js.map