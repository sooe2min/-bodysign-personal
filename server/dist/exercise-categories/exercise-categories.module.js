"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExerciseCategoriesModule = void 0;
const exercises_module_1 = require("../exercises/exercises.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exercise_category_entity_1 = require("./entities/exercise-category.entity");
const exercise_categories_resolver_1 = require("./exercise-categories.resolver");
const exercise_categories_service_1 = require("./exercise-categories.service");
let ExerciseCategoriesModule = class ExerciseCategoriesModule {
};
ExerciseCategoriesModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([exercise_category_entity_1.ExerciseCategory]),
            common_1.forwardRef(() => exercises_module_1.ExercisesModule),
        ],
        providers: [exercise_categories_resolver_1.ExerciseCategoriesResolver, exercise_categories_service_1.ExerciseCategoriesService],
        exports: [exercise_categories_service_1.ExerciseCategoriesService],
    })
], ExerciseCategoriesModule);
exports.ExerciseCategoriesModule = ExerciseCategoriesModule;
//# sourceMappingURL=exercise-categories.module.js.map