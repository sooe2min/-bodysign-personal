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
exports.UserCategoriesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_categories_service_1 = require("./user-categories.service");
const user_category_entity_1 = require("./entities/user-category.entity");
const create_user_category_input_1 = require("./dto/create-user-category.input");
const update_user_category_input_1 = require("./dto/update-user-category.input");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const user_entity_1 = require("../users/entities/user.entity");
const non_registered_user_entity_1 = require("../non-registered-users/entities/non-registered-user.entity");
const currentUser_param_1 = require("../auth/dto/currentUser.param");
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../auth/guards/jwtAuth.guard");
let UserCategoriesResolver = class UserCategoriesResolver {
    constructor(userCategoriesService) {
        this.userCategoriesService = userCategoriesService;
    }
    findAll() {
        return this.userCategoriesService.findAll();
    }
    findOneById(id) {
        return this.userCategoriesService.findOneById(id);
    }
    createUserCategory(createUserCategoryInput) {
        return this.userCategoriesService.create(createUserCategoryInput);
    }
    updateUserCategory(updateUserCategoryInput, currentUser) {
        const canMutate = this.userCategoriesService.canMutate(currentUser, updateUserCategoryInput.id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.userCategoriesService.update(updateUserCategoryInput);
    }
    removeUserCategory(id, currentUser) {
        const canMutate = this.userCategoriesService.canMutate(currentUser, id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.userCategoriesService.remove(id);
    }
    trainer(userCategory) {
        const { trainerId } = userCategory;
        return this.userCategoriesService.getTrainer(trainerId);
    }
    users(userCategory) {
        const { id } = userCategory;
        return this.userCategoriesService.getUsers(id);
    }
    nonRegisteredUsers(userCategory) {
        const { id } = userCategory;
        return this.userCategoriesService.getNonRegisteredUsers(id);
    }
};
__decorate([
    graphql_1.Query(() => [user_category_entity_1.UserCategory], { name: 'userCategories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserCategoriesResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => user_category_entity_1.UserCategory, { name: 'userCategory' }),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserCategoriesResolver.prototype, "findOneById", null);
__decorate([
    graphql_1.Mutation(() => user_category_entity_1.UserCategory),
    __param(0, graphql_1.Args('createUserCategoryInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_category_input_1.CreateUserCategoryInput]),
    __metadata("design:returntype", Promise)
], UserCategoriesResolver.prototype, "createUserCategory", null);
__decorate([
    graphql_1.Mutation(() => user_category_entity_1.UserCategory),
    __param(0, graphql_1.Args('updateUserCategoryInput')),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_category_input_1.UpdateUserCategoryInput, Object]),
    __metadata("design:returntype", Promise)
], UserCategoriesResolver.prototype, "updateUserCategory", null);
__decorate([
    graphql_1.Mutation(() => user_category_entity_1.UserCategory),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserCategoriesResolver.prototype, "removeUserCategory", null);
__decorate([
    graphql_1.ResolveField((returns) => trainer_entity_1.Trainer),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_category_entity_1.UserCategory]),
    __metadata("design:returntype", Promise)
], UserCategoriesResolver.prototype, "trainer", null);
__decorate([
    graphql_1.ResolveField((returns) => [user_entity_1.User]),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_category_entity_1.UserCategory]),
    __metadata("design:returntype", Promise)
], UserCategoriesResolver.prototype, "users", null);
__decorate([
    graphql_1.ResolveField((returns) => [non_registered_user_entity_1.NonRegisteredUser]),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_category_entity_1.UserCategory]),
    __metadata("design:returntype", Promise)
], UserCategoriesResolver.prototype, "nonRegisteredUsers", null);
UserCategoriesResolver = __decorate([
    graphql_1.Resolver(() => user_category_entity_1.UserCategory),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [user_categories_service_1.UserCategoriesService])
], UserCategoriesResolver);
exports.UserCategoriesResolver = UserCategoriesResolver;
//# sourceMappingURL=user-categories.resolver.js.map