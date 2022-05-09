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
exports.Chat = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const chatSender_types_1 = __importDefault(require("../../types/chatSender.types"));
const generalStatus_types_1 = __importDefault(require("../../types/generalStatus.types"));
const img_entity_1 = require("../../imgs/entities/img.entity");
const trainer_entity_1 = require("../../trainers/entities/trainer.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Chat = class Chat {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Chat.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(),
    __metadata("design:type", String)
], Chat.prototype, "text", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column(),
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], Chat.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.chats),
    graphql_1.Field((type) => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Chat.prototype, "user", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column(),
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], Chat.prototype, "trainerId", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'status',
        enum: generalStatus_types_1.default,
        default: generalStatus_types_1.default.ACTIVE,
    }),
    graphql_1.Field(),
    __metadata("design:type", String)
], Chat.prototype, "status", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Chat.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Chat.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column('enum', {
        name: 'sender',
        enum: chatSender_types_1.default,
        nullable: false,
    }),
    graphql_1.Field(),
    __metadata("design:type", String)
], Chat.prototype, "sender", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false }),
    graphql_1.Field((type) => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], Chat.prototype, "seen", void 0);
__decorate([
    typeorm_1.ManyToOne(() => trainer_entity_1.Trainer, (trainer) => trainer.chats),
    graphql_1.Field((type) => trainer_entity_1.Trainer),
    __metadata("design:type", trainer_entity_1.Trainer)
], Chat.prototype, "trainer", void 0);
__decorate([
    typeorm_1.OneToMany(() => img_entity_1.Img, (img) => img.chat),
    graphql_1.Field((type) => [img_entity_1.Img], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], Chat.prototype, "imgs", void 0);
Chat = __decorate([
    typeorm_1.Entity('chats'),
    typeorm_1.Index(['userId', 'trainerId']),
    graphql_1.ObjectType()
], Chat);
exports.Chat = Chat;
//# sourceMappingURL=chat.entity.js.map