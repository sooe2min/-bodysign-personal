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
exports.Trainer = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const chat_entity_1 = require("../../chats/entities/chat.entity");
const exercise_category_entity_1 = require("../../exercise-categories/entities/exercise-category.entity");
const gender_types_1 = __importDefault(require("../../types/gender.types"));
const generalStatus_types_1 = __importDefault(require("../../types/generalStatus.types"));
const class_validator_1 = require("class-validator");
const login_types_1 = __importDefault(require("../../types/login.types"));
const non_registered_user_entity_1 = require("../../non-registered-users/entities/non-registered-user.entity");
const refreshToken_entity_1 = require("../../refresh-tokens/entities/refreshToken.entity");
const session_entity_1 = require("../../sessions/entities/session.entity");
const session_history_entity_1 = require("../../session-histories/entities/session-history.entity");
const trainerInterest_entity_1 = require("../../trainer-interest/entities/trainerInterest.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const user_category_entity_1 = require("../../user-categories/entities/user-category.entity");
let Trainer = class Trainer {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], Trainer.prototype, "id", void 0);
__decorate([
    class_validator_1.IsEmail(),
    typeorm_1.Column({ unique: true, nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], Trainer.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], Trainer.prototype, "userName", void 0);
__decorate([
    typeorm_1.Column({ select: false, nullable: true }),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Trainer.prototype, "password", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: true }),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], Trainer.prototype, "birthDate", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Trainer.prototype, "phoneNumber", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'gender',
        enum: gender_types_1.default,
        default: gender_types_1.default.MALE,
        nullable: false,
    }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], Trainer.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'status',
        enum: generalStatus_types_1.default,
        default: generalStatus_types_1.default.ACTIVE,
        nullable: false,
    }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], Trainer.prototype, "status", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'loginType',
        enum: login_types_1.default,
        default: login_types_1.default.LOCAL,
        nullable: false,
    }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], Trainer.prototype, "loginType", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, select: false }),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Trainer.prototype, "dbPasswordSalt", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], Trainer.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], Trainer.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => user_entity_1.User, (user) => user.trainer),
    graphql_1.Field((type) => [user_entity_1.User], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], Trainer.prototype, "users", void 0);
__decorate([
    typeorm_1.OneToMany(() => chat_entity_1.Chat, (chat) => chat.trainer),
    graphql_1.Field((type) => [chat_entity_1.Chat], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], Trainer.prototype, "chats", void 0);
__decorate([
    typeorm_1.OneToMany(() => session_entity_1.Session, (session) => session.trainer),
    graphql_1.Field((type) => [session_entity_1.Session], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], Trainer.prototype, "sessions", void 0);
__decorate([
    typeorm_1.OneToMany(() => exercise_category_entity_1.ExerciseCategory, (exerciseCategory) => exerciseCategory.trainer),
    graphql_1.Field((type) => [exercise_category_entity_1.ExerciseCategory], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], Trainer.prototype, "exerciseCategories", void 0);
__decorate([
    typeorm_1.OneToMany(() => non_registered_user_entity_1.NonRegisteredUser, (nonRegisteredUser) => nonRegisteredUser.trainer),
    graphql_1.Field((type) => [non_registered_user_entity_1.NonRegisteredUser], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], Trainer.prototype, "nonRegisteredUsers", void 0);
__decorate([
    typeorm_1.OneToMany(() => user_category_entity_1.UserCategory, (userCategory) => userCategory.trainer),
    graphql_1.Field((type) => [user_category_entity_1.UserCategory], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], Trainer.prototype, "userCategories", void 0);
__decorate([
    typeorm_1.OneToMany(() => session_history_entity_1.SessionHistory, (sessionHistory) => sessionHistory.user),
    graphql_1.Field((type) => [session_history_entity_1.SessionHistory]),
    __metadata("design:type", Array)
], Trainer.prototype, "sessionHistories", void 0);
__decorate([
    typeorm_1.OneToMany(() => trainerInterest_entity_1.TrainerInterest, (trainerInterest) => trainerInterest.trainer),
    graphql_1.Field((type) => [trainerInterest_entity_1.TrainerInterest], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], Trainer.prototype, "trainerInterests", void 0);
__decorate([
    typeorm_1.OneToOne(() => refreshToken_entity_1.RefreshToken, (refreshToken) => refreshToken.trainer),
    __metadata("design:type", refreshToken_entity_1.RefreshToken)
], Trainer.prototype, "refreshToken", void 0);
Trainer = __decorate([
    typeorm_1.Entity('trainers'),
    graphql_1.ObjectType()
], Trainer);
exports.Trainer = Trainer;
//# sourceMappingURL=trainer.entity.js.map