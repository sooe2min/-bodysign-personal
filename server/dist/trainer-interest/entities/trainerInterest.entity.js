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
exports.TrainerInterest = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const generalStatus_types_1 = __importDefault(require("../../types/generalStatus.types"));
const trainer_entity_1 = require("../../trainers/entities/trainer.entity");
let TrainerInterest = class TrainerInterest {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], TrainerInterest.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], TrainerInterest.prototype, "interest", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column(),
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], TrainerInterest.prototype, "trainerId", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'status',
        enum: generalStatus_types_1.default,
        default: generalStatus_types_1.default.ACTIVE,
    }),
    graphql_1.Field(),
    __metadata("design:type", String)
], TrainerInterest.prototype, "status", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], TrainerInterest.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], TrainerInterest.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => trainer_entity_1.Trainer, (trainer) => trainer.trainerInterests),
    graphql_1.Field((type) => trainer_entity_1.Trainer),
    __metadata("design:type", trainer_entity_1.Trainer)
], TrainerInterest.prototype, "trainer", void 0);
TrainerInterest = __decorate([
    typeorm_1.Entity('trainerInterests'),
    graphql_1.ObjectType()
], TrainerInterest);
exports.TrainerInterest = TrainerInterest;
//# sourceMappingURL=trainerInterest.entity.js.map