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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const exercises_service_1 = require("./exercises.service");
const exercise_entity_1 = require("./entities/exercise.entity");
const create_exercise_input_1 = require("./dto/create-exercise.input");
const update_exercise_input_1 = require("./dto/update-exercise.input");
const exercise_category_entity_1 = require("../exercise-categories/entities/exercise-category.entity");
const common_1 = require("@nestjs/common");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const user_entity_1 = require("../users/entities/user.entity");
const currentUser_param_1 = require("../auth/dto/currentUser.param");
const jwtAuth_guard_1 = require("../auth/guards/jwtAuth.guard");
let ExercisesResolver = class ExercisesResolver {
    constructor(exercisesService) {
        this.exercisesService = exercisesService;
    }
    findAll() {
        return this.exercisesService.findAll();
    }
    findOneById(id) {
        return this.exercisesService.findOneById(id);
    }
    createExercise(createExerciseInput) {
        return this.exercisesService.create(createExerciseInput);
    }
    async updateExercise(updateExerciseInput, currentUser) {
        const canMutate = await this.exercisesService.canMutate(currentUser, updateExerciseInput.id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.exercisesService.update(updateExerciseInput);
    }
    async removeExercise(id, currentUser) {
        const canMutate = await this.exercisesService.canMutate(currentUser, id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.exercisesService.remove(id);
    }
    exerciseCategory(exercise) {
        const { exerciseCategoryId } = exercise;
        return this.exercisesService.getExerciseCategory(exerciseCategoryId);
    }
};
__decorate([
    graphql_1.Query(() => [exercise_entity_1.Exercise], { name: 'exercises' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ExercisesResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => exercise_entity_1.Exercise, { name: 'exercise' }),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ExercisesResolver.prototype, "findOneById", null);
__decorate([
    graphql_1.Mutation(() => exercise_entity_1.Exercise),
    __param(0, graphql_1.Args('createExerciseInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exercise_input_1.CreateExerciseInput]),
    __metadata("design:returntype", Promise)
], ExercisesResolver.prototype, "createExercise", null);
__decorate([
    graphql_1.Mutation(() => exercise_entity_1.Exercise),
    __param(0, graphql_1.Args('updateExerciseInput')),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_exercise_input_1.UpdateExerciseInput, Object]),
    __metadata("design:returntype", Promise)
], ExercisesResolver.prototype, "updateExercise", null);
__decorate([
    graphql_1.Mutation(() => exercise_entity_1.Exercise),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ExercisesResolver.prototype, "removeExercise", null);
__decorate([
    graphql_1.ResolveField((returns) => exercise_category_entity_1.ExerciseCategory),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exercise_entity_1.Exercise]),
    __metadata("design:returntype", Promise)
], ExercisesResolver.prototype, "exerciseCategory", null);
ExercisesResolver = __decorate([
    graphql_1.Resolver(() => exercise_entity_1.Exercise),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [exercises_service_1.ExercisesService])
], ExercisesResolver);
exports.ExercisesResolver = ExercisesResolver;
//# sourceMappingURL=exercises.resolver.js.map