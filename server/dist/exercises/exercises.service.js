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
exports.ExercisesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exercise_category_entity_1 = require("../exercise-categories/entities/exercise-category.entity");
const exercise_categories_service_1 = require("../exercise-categories/exercise-categories.service");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const exercise_entity_1 = require("./entities/exercise.entity");
let ExercisesService = class ExercisesService {
    constructor(exercisesRepository, exerciseCategoriesService) {
        this.exercisesRepository = exercisesRepository;
        this.exerciseCategoriesService = exerciseCategoriesService;
    }
    create(createExerciseInput) {
        const newExercise = this.exercisesRepository.create(createExerciseInput);
        return this.exercisesRepository.save(newExercise);
    }
    bulkCreateDefault(exerciseCategoryId, names) {
        const newExercises = names.map((name) => this.exercisesRepository.create({ exerciseCategoryId, name }));
        return this.exercisesRepository.save(newExercises);
    }
    findAll() {
        return this.exercisesRepository.find();
    }
    findOneById(id) {
        return this.exercisesRepository.findOneOrFail(id);
    }
    findAllByExerciseCategoryId(exerciseCategoryId) {
        return this.exercisesRepository.find({ exerciseCategoryId });
    }
    getExerciseCategory(exerciseCategoryId) {
        return this.exerciseCategoriesService.findOneById(exerciseCategoryId);
    }
    async update(updateExerciseInput) {
        const exercise = await this.exercisesRepository.findOneOrFail(updateExerciseInput.id);
        return this.exercisesRepository.save(Object.assign(Object.assign({}, exercise), updateExerciseInput));
    }
    async remove(id) {
        const exercise = await this.exercisesRepository.findOneOrFail(id);
        return this.exercisesRepository.remove(exercise);
    }
    async canMutate(currentUser, id) {
        if (currentUser instanceof user_entity_1.User)
            return false;
        const exercise = await this.exercisesRepository.findOneOrFail({
            where: { id },
            relations: ['exerciseCategory'],
        });
        if (exercise.exerciseCategory.trainerId !== currentUser.id) {
            return false;
        }
        return true;
    }
};
ExercisesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(exercise_entity_1.Exercise)),
    __param(1, common_1.Inject(common_1.forwardRef(() => exercise_categories_service_1.ExerciseCategoriesService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        exercise_categories_service_1.ExerciseCategoriesService])
], ExercisesService);
exports.ExercisesService = ExercisesService;
//# sourceMappingURL=exercises.service.js.map