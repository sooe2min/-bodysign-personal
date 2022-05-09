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
exports.Session = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const session_exercise_entity_1 = require("../../session-exercises/entities/session-exercise.entity");
const trainer_entity_1 = require("../../trainers/entities/trainer.entity");
const sessionStatus_types_1 = __importDefault(require("../../types/sessionStatus.types"));
const user_entity_1 = require("../../users/entities/user.entity");
let Session = class Session {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Session.prototype, "id", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], Session.prototype, "userId", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], Session.prototype, "trainerId", void 0);
__decorate([
    typeorm_1.Column('enum', {
        name: 'status',
        enum: sessionStatus_types_1.default,
        default: sessionStatus_types_1.default.ACTIVE,
        nullable: false,
    }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], Session.prototype, "status", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Session.prototype, "feedback", void 0);
__decorate([
    typeorm_1.Column('boolean', { nullable: false, default: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Boolean)
], Session.prototype, "sentFeedback", void 0);
__decorate([
    typeorm_1.Column('boolean', { nullable: false, default: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Boolean)
], Session.prototype, "completedSession", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], Session.prototype, "date", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], Session.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], Session.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (user) => user.sessions),
    graphql_1.Field((type) => user_entity_1.User, { nullable: false }),
    __metadata("design:type", user_entity_1.User)
], Session.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => trainer_entity_1.Trainer, (trainer) => trainer.sessions),
    graphql_1.Field((type) => trainer_entity_1.Trainer, { nullable: false }),
    __metadata("design:type", trainer_entity_1.Trainer)
], Session.prototype, "trainer", void 0);
__decorate([
    typeorm_1.OneToMany(() => session_exercise_entity_1.SessionExercise, (sessionExercise) => sessionExercise.session),
    graphql_1.Field((type) => [session_exercise_entity_1.SessionExercise], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], Session.prototype, "sessionExercises", void 0);
Session = __decorate([
    typeorm_1.Entity('sessions'),
    typeorm_1.Index(['userId', 'trainerId']),
    graphql_1.ObjectType()
], Session);
exports.Session = Session;
//# sourceMappingURL=session.entity.js.map