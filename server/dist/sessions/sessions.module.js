"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionsModule = void 0;
const session_exercises_module_1 = require("../session-exercises/session-exercises.module");
const session_histories_module_1 = require("../session-histories/session-histories.module");
const trainers_module_1 = require("../trainers/trainers.module");
const users_module_1 = require("../users/users.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const session_entity_1 = require("./entities/session.entity");
const sessions_resolver_1 = require("./sessions.resolver");
const sessions_service_1 = require("./sessions.service");
let SessionsModule = class SessionsModule {
};
SessionsModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([session_entity_1.Session]),
            common_1.forwardRef(() => session_exercises_module_1.SessionExercisesModule),
            common_1.forwardRef(() => users_module_1.UsersModule),
            common_1.forwardRef(() => trainers_module_1.TrainersModule),
            common_1.forwardRef(() => session_histories_module_1.SessionHistoriesModule),
        ],
        providers: [sessions_resolver_1.SessionsResolver, sessions_service_1.SessionsService],
        exports: [sessions_service_1.SessionsService],
    })
], SessionsModule);
exports.SessionsModule = SessionsModule;
//# sourceMappingURL=sessions.module.js.map