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
exports.SessionExerciseVolume = void 0;
const session_exercise_entity_1 = require("../../session-exercises/entities/session-exercise.entity");
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
let SessionExerciseVolume = class SessionExerciseVolume {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], SessionExerciseVolume.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], SessionExerciseVolume.prototype, "reps", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], SessionExerciseVolume.prototype, "sets", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field((type) => graphql_1.Float, { nullable: false }),
    __metadata("design:type", Number)
], SessionExerciseVolume.prototype, "weight", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: 0 }),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], SessionExerciseVolume.prototype, "seq", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], SessionExerciseVolume.prototype, "sessionExerciseId", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], SessionExerciseVolume.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], SessionExerciseVolume.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => session_exercise_entity_1.SessionExercise, (sessionExercise) => sessionExercise.sessionExerciseVolumes, {
        onDelete: 'CASCADE',
    }),
    graphql_1.Field((type) => session_exercise_entity_1.SessionExercise),
    __metadata("design:type", session_exercise_entity_1.SessionExercise)
], SessionExerciseVolume.prototype, "sessionExercise", void 0);
SessionExerciseVolume = __decorate([
    typeorm_1.Entity('sessionExerciseVolumes'),
    graphql_1.ObjectType()
], SessionExerciseVolume);
exports.SessionExerciseVolume = SessionExerciseVolume;
//# sourceMappingURL=session-exercise-volume.entity.js.map