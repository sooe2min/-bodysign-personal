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
exports.RefreshToken = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const trainer_entity_1 = require("../../trainers/entities/trainer.entity");
const user_entity_1 = require("../../users/entities/user.entity");
const user_types_1 = __importDefault(require("../../types/user.types"));
let RefreshToken = class RefreshToken {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], RefreshToken.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('enum', {
        enum: user_types_1.default,
        nullable: false,
    }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], RefreshToken.prototype, "targetType", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], RefreshToken.prototype, "targetId", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], RefreshToken.prototype, "refreshToken", void 0);
__decorate([
    typeorm_1.Column('varchar', { nullable: true }),
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", String)
], RefreshToken.prototype, "providerId", void 0);
__decorate([
    typeorm_1.OneToOne(() => user_entity_1.User, (user) => user.refreshToken),
    __metadata("design:type", user_entity_1.User)
], RefreshToken.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToOne(() => trainer_entity_1.Trainer, (trainer) => trainer.refreshToken),
    __metadata("design:type", trainer_entity_1.Trainer)
], RefreshToken.prototype, "trainer", void 0);
RefreshToken = __decorate([
    typeorm_1.Entity('refreshTokens'),
    graphql_1.ObjectType()
], RefreshToken);
exports.RefreshToken = RefreshToken;
//# sourceMappingURL=refreshToken.entity.js.map