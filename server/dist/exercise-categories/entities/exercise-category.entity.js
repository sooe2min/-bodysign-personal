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
exports.ExerciseCategory = void 0;
const exercise_entity_1 = require("../../exercises/entities/exercise.entity");
const trainer_entity_1 = require("../../trainers/entities/trainer.entity");
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
let ExerciseCategory = class ExerciseCategory {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], ExerciseCategory.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    graphql_1.Field(),
    __metadata("design:type", String)
], ExerciseCategory.prototype, "name", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column(),
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], ExerciseCategory.prototype, "trainerId", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], ExerciseCategory.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], ExerciseCategory.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => trainer_entity_1.Trainer, (trainer) => trainer.exerciseCategories),
    graphql_1.Field((type) => trainer_entity_1.Trainer),
    __metadata("design:type", trainer_entity_1.Trainer)
], ExerciseCategory.prototype, "trainer", void 0);
__decorate([
    typeorm_1.OneToMany(() => exercise_entity_1.Exercise, (exercise) => exercise.exerciseCategory),
    graphql_1.Field((type) => [exercise_entity_1.Exercise], { nullable: 'itemsAndList' }),
    __metadata("design:type", Array)
], ExerciseCategory.prototype, "exercises", void 0);
ExerciseCategory = __decorate([
    typeorm_1.Entity('exerciseCategories'),
    graphql_1.ObjectType()
], ExerciseCategory);
exports.ExerciseCategory = ExerciseCategory;
//# sourceMappingURL=exercise-category.entity.js.map