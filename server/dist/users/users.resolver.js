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
exports.UsersResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const users_service_1 = require("./users.service");
const user_entity_1 = require("./entities/user.entity");
const create_user_input_1 = require("./dto/create-user.input");
const update_user_input_1 = require("./dto/update-user.input");
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../auth/guards/jwtAuth.guard");
const updatePassword_user_input_1 = require("./dto/updatePassword-user.input");
const create_socialUser_input_1 = require("./dto/create-socialUser.input");
const currentUser_param_1 = require("../auth/dto/currentUser.param");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
let UsersResolver = class UsersResolver {
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAll() {
        return this.usersService.findAll();
    }
    findOneById(id) {
        return this.usersService.findOneById(id);
    }
    findOneByEmail(email) {
        return this.usersService.findOneByEmail(email);
    }
    createUser(createUserInput) {
        return this.usersService.create(createUserInput);
    }
    createSocialUser(createSocialUserInput) {
        return this.usersService.createSocialUser(createSocialUserInput);
    }
    updateUser(currentUser, updateUserInput) {
        const canMutate = this.usersService.canMutate(currentUser, updateUserInput.id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.usersService.update(updateUserInput);
    }
    removeUser(id) {
        return this.usersService.remove(id);
    }
    updatePasswordUser(updatePasswordUserInput, currentUser) {
        const canMutate = this.usersService.canMutate(currentUser, updatePasswordUserInput.id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.usersService.updatePasswordUser(updatePasswordUserInput);
    }
    sessions(user) {
        const { id } = user;
        return this.usersService.findAllSessionsByUserId(id);
    }
    inbodies(user) {
        const { id } = user;
        return this.usersService.findAllInbodiesByUserId(id);
    }
    sessionHistories(user) {
        const { id } = user;
        return this.usersService.findAllSessionHistoriesByUserId(id);
    }
};
__decorate([
    graphql_1.Query(() => [user_entity_1.User], { name: 'users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => user_entity_1.User, { name: 'user' }),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "findOneById", null);
__decorate([
    graphql_1.Query(() => user_entity_1.User, { name: 'userEmail' }),
    __param(0, graphql_1.Args('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "findOneByEmail", null);
__decorate([
    graphql_1.Mutation(() => user_entity_1.User),
    __param(0, graphql_1.Args('createUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "createUser", null);
__decorate([
    graphql_1.Mutation(() => user_entity_1.User),
    __param(0, graphql_1.Args('createSocialUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_socialUser_input_1.CreateSocialUserInput]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "createSocialUser", null);
__decorate([
    graphql_1.Mutation(() => user_entity_1.User),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    __param(0, currentUser_param_1.CurrentUser()),
    __param(1, graphql_1.Args('updateUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_user_input_1.UpdateUserInput]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "updateUser", null);
__decorate([
    graphql_1.Mutation(() => user_entity_1.User),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "removeUser", null);
__decorate([
    graphql_1.Mutation(() => user_entity_1.User),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    __param(0, graphql_1.Args('updatePasswordUserInput')),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatePassword_user_input_1.UpdatePasswordUserInput, Object]),
    __metadata("design:returntype", Promise)
], UsersResolver.prototype, "updatePasswordUser", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "sessions", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "inbodies", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], UsersResolver.prototype, "sessionHistories", null);
UsersResolver = __decorate([
    graphql_1.Resolver(() => user_entity_1.User),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersResolver);
exports.UsersResolver = UsersResolver;
//# sourceMappingURL=users.resolver.js.map