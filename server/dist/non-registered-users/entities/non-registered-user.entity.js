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
exports.NonRegisteredUser = void 0;
const trainer_entity_1 = require("../../trainers/entities/trainer.entity");
const gender_types_1 = __importDefault(require("../../types/gender.types"));
const generalStatus_types_1 = __importDefault(require("../../types/generalStatus.types"));
const user_category_entity_1 = require("../../user-categories/entities/user-category.entity");
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
let NonRegisteredUser = class NonRegisteredUser {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int' }),
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], NonRegisteredUser.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], NonRegisteredUser.prototype, "userName", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], NonRegisteredUser.prototype, "phoneNumber", void 0);
__decorate([
    typeorm_1.Column('boolean', { nullable: false, default: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Boolean)
], NonRegisteredUser.prototype, "graduate", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'gender',
        enum: gender_types_1.default,
        default: gender_types_1.default.MALE,
        nullable: false,
    }),
    graphql_1.Field(),
    __metadata("design:type", String)
], NonRegisteredUser.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'status',
        enum: generalStatus_types_1.default,
        default: generalStatus_types_1.default.ACTIVE,
        nullable: false,
    }),
    graphql_1.Field(),
    __metadata("design:type", String)
], NonRegisteredUser.prototype, "status", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], NonRegisteredUser.prototype, "trainerId", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], NonRegisteredUser.prototype, "userCategoryId", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], NonRegisteredUser.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], NonRegisteredUser.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => trainer_entity_1.Trainer, (trainer) => trainer.nonRegisteredUsers),
    graphql_1.Field((type) => trainer_entity_1.Trainer),
    __metadata("design:type", trainer_entity_1.Trainer)
], NonRegisteredUser.prototype, "trainer", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_category_entity_1.UserCategory, (userCategory) => userCategory.nonRegisteredUsers),
    graphql_1.Field((type) => user_category_entity_1.UserCategory),
    __metadata("design:type", user_category_entity_1.UserCategory)
], NonRegisteredUser.prototype, "userCategory", void 0);
NonRegisteredUser = __decorate([
    typeorm_1.Entity('nonRegisteredUsers'),
    graphql_1.ObjectType()
], NonRegisteredUser);
exports.NonRegisteredUser = NonRegisteredUser;
//# sourceMappingURL=non-registered-user.entity.js.map