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
exports.ExerciseCategoriesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const exercise_categories_service_1 = require("./exercise-categories.service");
const exercise_category_entity_1 = require("./entities/exercise-category.entity");
const create_exercise_category_input_1 = require("./dto/create-exercise-category.input");
const update_exercise_category_input_1 = require("./dto/update-exercise-category.input");
const exercise_entity_1 = require("../exercises/entities/exercise.entity");
const exercises_service_1 = require("../exercises/exercises.service");
const currentUser_param_1 = require("../auth/dto/currentUser.param");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const user_entity_1 = require("../users/entities/user.entity");
const common_1 = require("@nestjs/common");
const jwtAuth_guard_1 = require("../auth/guards/jwtAuth.guard");
let ExerciseCategoriesResolver = class ExerciseCategoriesResolver {
    constructor(exerciseCategoriesService, exercisesService) {
        this.exerciseCategoriesService = exerciseCategoriesService;
        this.exercisesService = exercisesService;
    }
    findAll() {
        return this.exerciseCategoriesService.findAll();
    }
    findOneById(id) {
        return this.exerciseCategoriesService.findOneById(id);
    }
    createExerciseCategory(createExerciseCategoryInput) {
        return this.exerciseCategoriesService.create(createExerciseCategoryInput);
    }
    async updateExerciseCategory(updateExerciseCategoryInput, currentUser) {
        const canMutate = await this.exerciseCategoriesService.canMutate(currentUser, updateExerciseCategoryInput.id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.exerciseCategoriesService.update(updateExerciseCategoryInput);
    }
    async removeExerciseCategory(id, currentUser) {
        const canMutate = await this.exerciseCategoriesService.canMutate(currentUser, id);
        if (!canMutate) {
            throw new common_1.ForbiddenException();
        }
        return this.exerciseCategoriesService.remove(id);
    }
    async bulkRemoveExerciseCategory(ids, currentUser) {
        const bulkCanMutate = await this.exerciseCategoriesService.bulkCanMutate(currentUser, ids);
        if (!bulkCanMutate) {
            throw new common_1.ForbiddenException();
        }
        return await this.exerciseCategoriesService.bulkRemove(ids);
    }
    exercises(exerciseCategory) {
        const { id } = exerciseCategory;
        return this.exercisesService.findAllByExerciseCategoryId(id);
    }
};
__decorate([
    graphql_1.Query(() => [exercise_category_entity_1.ExerciseCategory], { name: 'exerciseCategories' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ExerciseCategoriesResolver.prototype, "findAll", null);
__decorate([
    graphql_1.Query(() => exercise_category_entity_1.ExerciseCategory, { name: 'exerciseCategory' }),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ExerciseCategoriesResolver.prototype, "findOneById", null);
__decorate([
    graphql_1.Mutation(() => exercise_category_entity_1.ExerciseCategory),
    __param(0, graphql_1.Args('createExerciseCategoryInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_exercise_category_input_1.CreateExerciseCategoryInput]),
    __metadata("design:returntype", Promise)
], ExerciseCategoriesResolver.prototype, "createExerciseCategory", null);
__decorate([
    graphql_1.Mutation(() => exercise_category_entity_1.ExerciseCategory),
    __param(0, graphql_1.Args('updateExerciseCategoryInput')),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_exercise_category_input_1.UpdateExerciseCategoryInput, Object]),
    __metadata("design:returntype", Promise)
], ExerciseCategoriesResolver.prototype, "updateExerciseCategory", null);
__decorate([
    graphql_1.Mutation((returns) => Boolean),
    __param(0, graphql_1.Args('id', { type: () => graphql_1.Int })),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ExerciseCategoriesResolver.prototype, "removeExerciseCategory", null);
__decorate([
    graphql_1.Mutation((returns) => Boolean),
    __param(0, graphql_1.Args('ids', { type: () => [graphql_1.Int] })),
    __param(1, currentUser_param_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], ExerciseCategoriesResolver.prototype, "bulkRemoveExerciseCategory", null);
__decorate([
    graphql_1.ResolveField(),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [exercise_category_entity_1.ExerciseCategory]),
    __metadata("design:returntype", Promise)
], ExerciseCategoriesResolver.prototype, "exercises", null);
ExerciseCategoriesResolver = __decorate([
    graphql_1.Resolver(() => exercise_category_entity_1.ExerciseCategory),
    common_1.UseGuards(jwtAuth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [exercise_categories_service_1.ExerciseCategoriesService,
        exercises_service_1.ExercisesService])
], ExerciseCategoriesResolver);
exports.ExerciseCategoriesResolver = ExerciseCategoriesResolver;
//# sourceMappingURL=exercise-categories.resolver.js.map