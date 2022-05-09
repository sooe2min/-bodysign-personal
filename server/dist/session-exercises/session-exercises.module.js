"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionExercisesModule = void 0;
const session_exercise_volumes_module_1 = require("../session-exercise-volumes/session-exercise-volumes.module");
const sessions_module_1 = require("../sessions/sessions.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const session_exercise_entity_1 = require("./entities/session-exercise.entity");
const session_exercises_resolver_1 = require("./session-exercises.resolver");
const session_exercises_service_1 = require("./session-exercises.service");
let SessionExercisesModule = class SessionExercisesModule {
};
SessionExercisesModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([session_exercise_entity_1.SessionExercise]),
            common_1.forwardRef(() => sessions_module_1.SessionsModule),
            common_1.forwardRef(() => session_exercise_volumes_module_1.SessionExerciseVolumesModule),
        ],
        providers: [session_exercises_resolver_1.SessionExercisesResolver, session_exercises_service_1.SessionExercisesService],
        exports: [session_exercises_service_1.SessionExercisesService],
    })
], SessionExercisesModule);
exports.SessionExercisesModule = SessionExercisesModule;
//# sourceMappingURL=session-exercises.module.js.map