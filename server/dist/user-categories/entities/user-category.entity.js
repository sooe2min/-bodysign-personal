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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCategory = void 0;
const non_registered_user_entity_1 = require("../../non-registered-users/entities/non-registered-user.entity");
const trainer_entity_1 = require("../../trainers/entities/trainer.entity");
const generalStatus_types_1 = __importDefault(require("../../types/generalStatus.types"));
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
let UserCategory = class UserCategory {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UserCategory.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'status',
        enum: generalStatus_types_1.default,
        default: generalStatus_types_1.default.ACTIVE,
    }),
    graphql_1.Field(),
    __metadata("design:type", String)
], UserCategory.prototype, "status", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], UserCategory.prototype, "name", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], UserCategory.prototype, "trainerId", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], UserCategory.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], UserCategory.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => trainer_entity_1.Trainer, (trainer) => trainer.userCategories),
    graphql_1.Field((type) => trainer_entity_1.Trainer, { nullable: false }),
    __metadata("design:type", trainer_entity_1.Trainer)
], UserCategory.prototype, "trainer", void 0);
__decorate([
    typeorm_1.OneToMany(() => user_entity_1.User, (user) => user.userCategory),
    graphql_1.Field((type) => [user_entity_1.User], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], UserCategory.prototype, "users", void 0);
__decorate([
    typeorm_1.OneToMany(() => non_registered_user_entity_1.NonRegisteredUser, (nonRegisteredUser) => nonRegisteredUser.userCategory),
    graphql_1.Field((type) => [non_registered_user_entity_1.NonRegisteredUser], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], UserCategory.prototype, "nonRegisteredUsers", void 0);
UserCategory = __decorate([
    typeorm_1.Entity('userCategories'),
    graphql_1.ObjectType()
], UserCategory);
exports.UserCategory = UserCategory;
//# sourceMappingURL=user-category.entity.js.map