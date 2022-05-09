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
exports.Inbody = void 0;
const generalStatus_types_1 = __importDefault(require("../../types/generalStatus.types"));
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
let Inbody = class Inbody {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: 'int', name: 'id' }),
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], Inbody.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ name: 'bodyWeight', type: 'float', default: 0.0 }),
    graphql_1.Field((type) => graphql_1.Float),
    __metadata("design:type", Number)
], Inbody.prototype, "bodyWeight", void 0);
__decorate([
    typeorm_1.Column({ name: 'muscleWeight', type: 'float', default: 0.0 }),
    graphql_1.Field((type) => graphql_1.Float),
    __metadata("design:type", Number)
], Inbody.prototype, "muscleWeight", void 0);
__decorate([
    typeorm_1.Column({ name: 'bodyFat', type: 'float', default: 0.0 }),
    graphql_1.Field((type) => graphql_1.Float),
    __metadata("design:type", Number)
], Inbody.prototype, "bodyFat", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'status',
        enum: generalStatus_types_1.default,
        default: generalStatus_types_1.default.ACTIVE,
    }),
    graphql_1.Field(),
    __metadata("design:type", String)
], Inbody.prototype, "status", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    graphql_1.Field(),
    __metadata("design:type", Date)
], Inbody.prototype, "measuredDate", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column(),
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], Inbody.prototype, "userId", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Inbody.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Inbody.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.inbodies),
    graphql_1.Field((type) => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], Inbody.prototype, "user", void 0);
Inbody = __decorate([
    typeorm_1.Entity('inbodies'),
    graphql_1.ObjectType()
], Inbody);
exports.Inbody = Inbody;
//# sourceMappingURL=inbody.entity.js.map