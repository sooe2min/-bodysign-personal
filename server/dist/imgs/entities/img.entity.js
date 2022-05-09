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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Img = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const chat_entity_1 = require("../../chats/entities/chat.entity");
let Img = class Img {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Img.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(),
    __metadata("design:type", String)
], Img.prototype, "url", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ nullable: true }),
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Img.prototype, "chatId", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ nullable: true }),
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Img.prototype, "userId", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ nullable: true }),
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Img.prototype, "trainerId", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], Img.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], Img.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => chat_entity_1.Chat, (chat) => chat.imgs, { onDelete: 'CASCADE' }),
    graphql_1.Field((type) => chat_entity_1.Chat),
    __metadata("design:type", chat_entity_1.Chat)
], Img.prototype, "chat", void 0);
Img = __decorate([
    typeorm_1.Entity('imgs'),
    typeorm_1.Index(['userId', 'trainerId']),
    graphql_1.ObjectType()
], Img);
exports.Img = Img;
//# sourceMappingURL=img.entity.js.map