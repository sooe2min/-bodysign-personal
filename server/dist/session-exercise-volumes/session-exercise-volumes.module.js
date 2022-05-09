"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionExerciseVolumesModule = void 0;
const session_exercises_module_1 = require("../session-exercises/session-exercises.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const session_exercise_volume_entity_1 = require("./entities/session-exercise-volume.entity");
const session_exercise_volumes_resolver_1 = require("./session-exercise-volumes.resolver");
const session_exercise_volumes_service_1 = require("./session-exercise-volumes.service");
let SessionExerciseVolumesModule = class SessionExerciseVolumesModule {
};
SessionExerciseVolumesModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([session_exercise_volume_entity_1.SessionExerciseVolume]),
            common_1.forwardRef(() => session_exercises_module_1.SessionExercisesModule),
        ],
        providers: [session_exercise_volumes_resolver_1.SessionExerciseVolumesResolver, session_exercise_volumes_service_1.SessionExerciseVolumesService],
        exports: [session_exercise_volumes_service_1.SessionExerciseVolumesService],
    })
], SessionExerciseVolumesModule);
exports.SessionExerciseVolumesModule = SessionExerciseVolumesModule;
//# sourceMappingURL=session-exercise-volumes.module.js.map