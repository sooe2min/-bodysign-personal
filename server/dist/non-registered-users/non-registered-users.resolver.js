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
exports.NonRegisteredUsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const non_registered_users_service_1 = require("./non-registered-users.service");
const non_registered_user_entity_1 = require("./entities/non-registered-user.entity");
const create_non_registered_user_input_1 = require("./dto/create-non-registered-user.input");
const update_non_registered_user_input_1 = require("./dto/update-non-registered-user.input");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const user_category_entity_1 = require("../user-categories/entities/user-category.entity");
const user_entity_1 = require("../users/entities/user.entity");
const currentUser_param_1 = require("../auth/dto/currentUser.param");
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../auth/guards/jwtAuth.guard");
let NonRegisteredUsersResolver = class NonRegisteredUsersResolver {
    constructor(nonRegisteredUsersService) {
        this.nonRegisteredUsersService = nonRegisteredUsersService;
    }
    findAll() {
        return this.nonRegisteredUsersService.findAll();
    }
    findOneById(id) {
        return this.nonRegisteredUsersService.findOneById(id);
    }
    createNonRegisteredUser(createNonRegisteredUserInput) {
        return this.nonRegisteredUsersService.create(createNonRegisteredUserInput);
    }
    async updateNonRegisteredUser(updateNonRegisteredUserInput, currentUser) {
        const canMutate = await this.nonRegisteredUsersService.canMutate(currentUser, updateNonRegisteredUserInput.id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.nonRegisteredUsersService.update(updateNonRegisteredUserInput);
    }
    async removeNonRegisteredUser(id, currentUser) {
        const canMutate = await this.nonRegisteredUsersService.canMutate(currentUser, id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.nonRegisteredUsersService.remove(id);
    }
    trainer(nonRegisteredUser) {
        const { trainerId } = nonRegisteredUser;
        return this.nonRegisteredUsersService.getTrainer(trainerId);
    }
    userCategory(nonRegisteredUser) {
        const { userCategoryId } = nonRegisteredUser;
        return this.nonRegisteredUsersService.getUserCategory(userCategoryId);
    }
};
__decorate([
    graphql_1.Query(() => [non_registered_user_entity_1.NonRegisteredUser], { name: 'nonRegisteredUsers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NonRegisteredUsersResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => non_registered_user_entity_1.NonRegisteredUser, { name: 'nonRegisteredUser' }),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], NonRegisteredUsersResolver.prototype, "findOneById", null);
__decorate([
    graphql_1.Mutation(() => non_registered_user_entity_1.NonRegisteredUser),
    __param(0, graphql_1.Args('createNonRegisteredUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_non_registered_user_input_1.CreateNonRegisteredUserInput]),
    __metadata("design:returntype", Promise)
], NonRegisteredUsersResolver.prototype, "createNonRegisteredUser", null);
__decorate([
    graphql_1.Mutation(() => non_registered_user_entity_1.NonRegisteredUser),
    __param(0, graphql_1.Args('updateNonRegisteredUserInput')),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_non_registered_user_input_1.UpdateNonRegisteredUserInput, Object]),
    __metadata("design:returntype", Promise)
], NonRegisteredUsersResolver.prototype, "updateNonRegisteredUser", null);
__decorate([
    graphql_1.Mutation(() => non_registered_user_entity_1.NonRegisteredUser),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], NonRegisteredUsersResolver.prototype, "removeNonRegisteredUser", null);
__decorate([
    graphql_1.ResolveField((returns) => trainer_entity_1.Trainer),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [non_registered_user_entity_1.NonRegisteredUser]),
    __metadata("design:returntype", Promise)
], NonRegisteredUsersResolver.prototype, "trainer", null);
__decorate([
    graphql_1.ResolveField((returns) => user_category_entity_1.UserCategory),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [non_registered_user_entity_1.NonRegisteredUser]),
    __metadata("design:returntype", Promise)
], NonRegisteredUsersResolver.prototype, "userCategory", null);
NonRegisteredUsersResolver = __decorate([
    graphql_1.Resolver(() => non_registered_user_entity_1.NonRegisteredUser),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [non_registered_users_service_1.NonRegisteredUsersService])
], NonRegisteredUsersResolver);
exports.NonRegisteredUsersResolver = NonRegisteredUsersResolver;
//# sourceMappingURL=non-registered-users.resolver.js.map