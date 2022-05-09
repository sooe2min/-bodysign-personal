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
exports.SessionHistory = void 0;
const trainer_entity_1 = require("../../trainers/entities/trainer.entity");
const generalStatus_types_1 = __importDefault(require("../../types/generalStatus.types"));
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
let SessionHistory = class SessionHistory {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], SessionHistory.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'status',
        enum: generalStatus_types_1.default,
        default: generalStatus_types_1.default.ACTIVE,
    }),
    graphql_1.Field(),
    __metadata("design:type", String)
], SessionHistory.prototype, "status", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    graphql_1.Field(),
    __metadata("design:type", Date)
], SessionHistory.prototype, "date", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], SessionHistory.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], SessionHistory.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], SessionHistory.prototype, "costPerSession", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], SessionHistory.prototype, "totalCount", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    graphql_1.Field((type) => graphql_1.Int, { defaultValue: 0 }),
    __metadata("design:type", Number)
], SessionHistory.prototype, "usedCount", void 0);
__decorate([
    typeorm_1.Column({ default: 0 }),
    graphql_1.Field((type) => graphql_1.Int, { defaultValue: 0 }),
    __metadata("design:type", Number)
], SessionHistory.prototype, "commission", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column(),
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], SessionHistory.prototype, "userId", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column(),
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], SessionHistory.prototype, "trainerId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.sessionHistories),
    graphql_1.Field((type) => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], SessionHistory.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => trainer_entity_1.Trainer, (trainer) => trainer.sessionHistories),
    graphql_1.Field((type) => trainer_entity_1.Trainer),
    __metadata("design:type", trainer_entity_1.Trainer)
], SessionHistory.prototype, "trainer", void 0);
SessionHistory = __decorate([
    typeorm_1.Entity('sessionHistories'),
    graphql_1.ObjectType()
], SessionHistory);
exports.SessionHistory = SessionHistory;
//# sourceMappingURL=session-history.entity.js.map