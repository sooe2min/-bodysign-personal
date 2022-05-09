"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainersModule = void 0;
const common_1 = require("@nestjs/common");
const exercise_categories_module_1 = require("../exercise-categories/exercise-categories.module");
const non_registered_users_module_1 = require("../non-registered-users/non-registered-users.module");
const refresh_tokens_module_1 = require("../refresh-tokens/refresh-tokens.module");
const session_histories_module_1 = require("../session-histories/session-histories.module");
const sessions_module_1 = require("../sessions/sessions.module");
const trainer_entity_1 = require("./entities/trainer.entity");
const trainer_interest_module_1 = require("../trainer-interest/trainer-interest.module");
const trainers_resolver_1 = require("./trainers.resolver");
const trainers_service_1 = require("./trainers.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_categories_module_1 = require("../user-categories/user-categories.module");
const users_module_1 = require("../users/users.module");
let TrainersModule = class TrainersModule {
};
TrainersModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([trainer_entity_1.Trainer]),
            common_1.forwardRef(() => users_module_1.UsersModule),
            common_1.forwardRef(() => sessions_module_1.SessionsModule),
            common_1.forwardRef(() => exercise_categories_module_1.ExerciseCategoriesModule),
            common_1.forwardRef(() => non_registered_users_module_1.NonRegisteredUsersModule),
            common_1.forwardRef(() => user_categories_module_1.UserCategoriesModule),
            common_1.forwardRef(() => session_histories_module_1.SessionHistoriesModule),
            common_1.forwardRef(() => trainer_interest_module_1.TrainerInterestModule),
            common_1.forwardRef(() => refresh_tokens_module_1.RefreshTokenModule),
        ],
        providers: [trainers_resolver_1.TrainersResolver, trainers_service_1.TrainersService],
        exports: [trainers_service_1.TrainersService],
    })
], TrainersModule);
exports.TrainersModule = TrainersModule;
//# sourceMappingURL=trainers.module.js.map