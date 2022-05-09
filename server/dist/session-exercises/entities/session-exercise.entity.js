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
exports.SessionExercise = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const session_entity_1 = require("../../sessions/entities/session.entity");
const session_exercise_volume_entity_1 = require("../../session-exercise-volumes/entities/session-exercise-volume.entity");
let SessionExercise = class SessionExercise {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], SessionExercise.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(),
    __metadata("design:type", String)
], SessionExercise.prototype, "name", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column(),
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], SessionExercise.prototype, "sessionId", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], SessionExercise.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], SessionExercise.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], SessionExercise.prototype, "exerciseCategoryName", void 0);
__decorate([
    typeorm_1.ManyToOne(() => session_entity_1.Session, (session) => session.sessionExercises, {
        onDelete: 'CASCADE',
    }),
    graphql_1.Field((type) => session_entity_1.Session),
    __metadata("design:type", session_entity_1.Session)
], SessionExercise.prototype, "session", void 0);
__decorate([
    typeorm_1.OneToMany(() => session_exercise_volume_entity_1.SessionExerciseVolume, (sessionExerciseVolume) => sessionExerciseVolume.sessionExercise),
    graphql_1.Field((type) => [session_exercise_volume_entity_1.SessionExerciseVolume], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], SessionExercise.prototype, "sessionExerciseVolumes", void 0);
SessionExercise = __decorate([
    typeorm_1.Entity('sessionExercises'),
    graphql_1.ObjectType()
], SessionExercise);
exports.SessionExercise = SessionExercise;
//# sourceMappingURL=session-exercise.entity.js.map