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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const chat_entity_1 = require("../../chats/entities/chat.entity");
const gender_types_1 = __importDefault(require("../../types/gender.types"));
const generalStatus_types_1 = __importDefault(require("../../types/generalStatus.types"));
const inbody_entity_1 = require("../../inbodies/entities/inbody.entity");
const class_validator_1 = require("class-validator");
const login_types_1 = __importDefault(require("../../types/login.types"));
const refreshToken_entity_1 = require("../../refresh-tokens/entities/refreshToken.entity");
const session_entity_1 = require("../../sessions/entities/session.entity");
const session_history_entity_1 = require("../../session-histories/entities/session-history.entity");
const trainer_entity_1 = require("../../trainers/entities/trainer.entity");
const user_category_entity_1 = require("../../user-categories/entities/user-category.entity");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    class_validator_1.IsEmail(),
    typeorm_1.Column({ unique: true, nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "userName", void 0);
__decorate([
    typeorm_1.Column({ select: false, nullable: true }),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], User.prototype, "birthDate", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "phoneNumber", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'gender',
        enum: gender_types_1.default,
        default: gender_types_1.default.MALE,
        nullable: false,
    }),
    graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "gender", void 0);
__decorate([
    typeorm_1.Column('boolean', { default: false, nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Boolean)
], User.prototype, "graduate", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'status',
        enum: generalStatus_types_1.default,
        default: generalStatus_types_1.default.ACTIVE,
        nullable: false,
    }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'loginType',
        enum: login_types_1.default,
        default: login_types_1.default.LOCAL,
        nullable: false,
    }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "loginType", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    typeorm_1.Index(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "trainerId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, select: false }),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "dbPasswordSalt", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "userCategoryId", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => trainer_entity_1.Trainer, (trainer) => trainer.users),
    graphql_1.Field((type) => trainer_entity_1.Trainer),
    __metadata("design:type", trainer_entity_1.Trainer)
], User.prototype, "trainer", void 0);
__decorate([
    typeorm_1.OneToMany(() => chat_entity_1.Chat, (chat) => chat.user),
    graphql_1.Field((type) => [chat_entity_1.Chat]),
    __metadata("design:type", Array)
], User.prototype, "chats", void 0);
__decorate([
    typeorm_1.OneToMany(() => session_entity_1.Session, (session) => session.user),
    graphql_1.Field((type) => [session_entity_1.Session]),
    __metadata("design:type", Array)
], User.prototype, "sessions", void 0);
__decorate([
    typeorm_1.OneToMany(() => inbody_entity_1.Inbody, (inbody) => inbody.user),
    graphql_1.Field((type) => [inbody_entity_1.Inbody]),
    __metadata("design:type", Array)
], User.prototype, "inbodies", void 0);
__decorate([
    typeorm_1.OneToMany(() => session_history_entity_1.SessionHistory, (sessionHistory) => sessionHistory.user),
    graphql_1.Field((type) => [session_history_entity_1.SessionHistory]),
    __metadata("design:type", Array)
], User.prototype, "sessionHistories", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_category_entity_1.UserCategory, (userCategory) => userCategory.users),
    graphql_1.Field((type) => user_category_entity_1.UserCategory),
    __metadata("design:type", user_category_entity_1.UserCategory)
], User.prototype, "userCategory", void 0);
__decorate([
    typeorm_1.OneToOne(() => refreshToken_entity_1.RefreshToken, (refreshToken) => refreshToken.user),
    __metadata("design:type", refreshToken_entity_1.RefreshToken)
], User.prototype, "refreshToken", void 0);
User = __decorate([
    typeorm_1.Entity('users'),
    graphql_1.ObjectType()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map