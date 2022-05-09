"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExercisesModule = void 0;
const exercise_categories_module_1 = require("../exercise-categories/exercise-categories.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const exercise_entity_1 = require("./entities/exercise.entity");
const exercises_resolver_1 = require("./exercises.resolver");
const exercises_service_1 = require("./exercises.service");
let ExercisesModule = class ExercisesModule {
};
ExercisesModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([exercise_entity_1.Exercise]),
            common_1.forwardRef(() => exercise_categories_module_1.ExerciseCategoriesModule),
        ],
        providers: [exercises_resolver_1.ExercisesResolver, exercises_service_1.ExercisesService],
        exports: [exercises_service_1.ExercisesService],
    })
], ExercisesModule);
exports.ExercisesModule = ExercisesModule;
//# sourceMappingURL=exercises.module.js.map