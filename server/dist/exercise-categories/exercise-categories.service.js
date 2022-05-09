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
exports.ExerciseCategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exercises_service_1 = require("../exercises/exercises.service");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const exercise_category_entity_1 = require("./entities/exercise-category.entity");
let ExerciseCategoriesService = class ExerciseCategoriesService {
    constructor(exerciseCategoriesRepository, exercisesService) {
        this.exerciseCategoriesRepository = exerciseCategoriesRepository;
        this.exercisesService = exercisesService;
    }
    create(createExerciseCategoryInput) {
        const newExerciseCategory = this.exerciseCategoriesRepository.create(createExerciseCategoryInput);
        return this.exerciseCategoriesRepository.save(newExerciseCategory);
    }
    findAll() {
        return this.exerciseCategoriesRepository.find();
    }
    findOneById(id) {
        return this.exerciseCategoriesRepository.findOneOrFail(id);
    }
    findAllByTrainerId(trainerId) {
        return this.exerciseCategoriesRepository.find({ trainerId });
    }
    async update(updateExerciseCategoryInput) {
        const exerciseCategory = await this.exerciseCategoriesRepository.findOneOrFail(updateExerciseCategoryInput.id);
        return this.exerciseCategoriesRepository.save(Object.assign(Object.assign({}, exerciseCategory), updateExerciseCategoryInput));
    }
    async remove(id) {
        const result = await this.exerciseCategoriesRepository.delete(id);
        return result.affected == 1;
    }
    async bulkRemove(ids) {
        const result = await this.exerciseCategoriesRepository.delete(ids);
        return result.affected == ids.length;
    }
    async canMutate(currentUser, id) {
        if (currentUser instanceof user_entity_1.User)
            return false;
        const exerciseCategory = await this.exerciseCategoriesRepository.findOneOrFail(id);
        if (exerciseCategory.trainerId !== currentUser.id) {
            return false;
        }
        return true;
    }
    async bulkCanMutate(currentUser, ids) {
        if (currentUser instanceof user_entity_1.User)
            return false;
        ids = ids.sort();
        const exerciseCategoryIds = await this.exerciseCategoriesRepository.find({
            where: {
                id: typeorm_2.In(ids),
            },
            order: {
                id: 'ASC',
            },
            select: ['id'],
        });
        if (exerciseCategoryIds.length !== ids.length ||
            ids.find((id, idx) => exerciseCategoryIds[idx].id !== id)) {
            return false;
        }
    }
    async createDefault(trainerId) {
        const createParams = { trainerId };
        const exerciseCategoryNames = [
            '가슴',
            '어깨',
            '등',
            '하체',
            '팔',
            '바벨',
            '덤벨',
            '스미스 머신',
            '유산소',
        ];
        const exerciseCategories = await Promise.all(exerciseCategoryNames.map((name) => this.create(Object.assign(Object.assign({}, createParams), { name }))));
        await this.exerciseCategoriesRepository.save(exerciseCategories);
        const exerciseNames = [
            ['벤치프레스', '펙덱 플라이', '체스트머신'],
            ['숄더프레스 머신', '래터럴레이즈 머신', '케이블 레이즈(프론트, 사이드)'],
            ['랫풀다운', '케이블 암풀다운', '티바로우'],
            ['레그 익스텐션', '레그 컬', '힙 어덕션, 어브덕션'],
            ['암 컬', '케이블 컬', '푸쉬다운 머신'],
            ['백 스쿼트', '프론트 스쿼트', '런지', '바벨 로우', '오버헤드 프레스'],
            [
                '덤벨 로우',
                '덤벨 플라이',
                '체스트 프레스',
                '숄더 프레스',
                '사이드 레터럴 레이즈',
            ],
            ['인클라인 프레스', '디클라인 프레스', '밀리터리 프레스'],
            ['트레드밀', '사이클', '마이 마운틴'],
        ];
        await Promise.all(exerciseCategories.map((exerciseCategory, idx) => this.exercisesService.bulkCreateDefault(exerciseCategory.id, exerciseNames[idx])));
        return true;
    }
};
ExerciseCategoriesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(exercise_category_entity_1.ExerciseCategory)),
    __param(1, common_1.Inject(common_1.forwardRef(() => exercises_service_1.ExercisesService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        exercises_service_1.ExercisesService])
], ExerciseCategoriesService);
exports.ExerciseCategoriesService = ExerciseCategoriesService;
//# sourceMappingURL=exercise-categories.service.js.map