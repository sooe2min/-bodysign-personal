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
exports.InbodiesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const inbodies_service_1 = require("./inbodies.service");
const inbody_entity_1 = require("./entities/inbody.entity");
const create_inbody_input_1 = require("./dto/create-inbody.input");
const update_inbody_input_1 = require("./dto/update-inbody.input");
const user_entity_1 = require("../users/entities/user.entity");
const currentUser_param_1 = require("../auth/dto/currentUser.param");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../auth/guards/jwtAuth.guard");
let InbodiesResolver = class InbodiesResolver {
    constructor(inbodiesService) {
        this.inbodiesService = inbodiesService;
    }
    findAll() {
        return this.inbodiesService.findAll();
    }
    findOneById(id) {
        return this.inbodiesService.findOneById(id);
    }
    createInbody(createInbodyInput) {
        return this.inbodiesService.create(createInbodyInput);
    }
    async updateInbody(updateInbodyInput, currentUser) {
        const canMutate = await this.inbodiesService.canMutate(currentUser, updateInbodyInput.id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.inbodiesService.update(updateInbodyInput);
    }
    async removeInbody(id, currentUser) {
        const canMutate = await this.inbodiesService.canMutate(currentUser, id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.inbodiesService.remove(id);
    }
    user(inbody) {
        const { userId } = inbody;
        return this.inbodiesService.getUser(userId);
    }
};
__decorate([
    graphql_1.Query(() => [inbody_entity_1.Inbody], { name: 'inbodies' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InbodiesResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => inbody_entity_1.Inbody, { name: 'inbody' }),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], InbodiesResolver.prototype, "findOneById", null);
__decorate([
    graphql_1.Mutation(() => inbody_entity_1.Inbody),
    __param(0, graphql_1.Args('createInbodyInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_inbody_input_1.CreateInbodyInput]),
    __metadata("design:returntype", Promise)
], InbodiesResolver.prototype, "createInbody", null);
__decorate([
    graphql_1.Mutation(() => inbody_entity_1.Inbody),
    __param(0, graphql_1.Args('updateInbodyInput')),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_inbody_input_1.UpdateInbodyInput, Object]),
    __metadata("design:returntype", Promise)
], InbodiesResolver.prototype, "updateInbody", null);
__decorate([
    graphql_1.Mutation(() => inbody_entity_1.Inbody),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], InbodiesResolver.prototype, "removeInbody", null);
__decorate([
    graphql_1.ResolveField((returns) => user_entity_1.User),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [inbody_entity_1.Inbody]),
    __metadata("design:returntype", Promise)
], InbodiesResolver.prototype, "user", null);
InbodiesResolver = __decorate([
    graphql_1.Resolver(() => inbody_entity_1.Inbody),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [inbodies_service_1.InbodiesService])
], InbodiesResolver);
exports.InbodiesResolver = InbodiesResolver;
//# sourceMappingURL=inbodies.resolver.js.map