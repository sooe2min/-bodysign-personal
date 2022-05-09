"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionHistoriesModule = void 0;
const trainers_module_1 = require("../trainers/trainers.module");
const users_module_1 = require("../users/users.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const session_history_entity_1 = require("./entities/session-history.entity");
const session_histories_resolver_1 = require("./session-histories.resolver");
const session_histories_service_1 = require("./session-histories.service");
let SessionHistoriesModule = class SessionHistoriesModule {
};
SessionHistoriesModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([session_history_entity_1.SessionHistory]),
            common_1.forwardRef(() => users_module_1.UsersModule),
            common_1.forwardRef(() => trainers_module_1.TrainersModule),
        ],
        providers: [session_histories_resolver_1.SessionHistoriesResolver, session_histories_service_1.SessionHistoriesService],
        exports: [session_histories_service_1.SessionHistoriesService],
    })
], SessionHistoriesModule);
exports.SessionHistoriesModule = SessionHistoriesModule;
//# sourceMappingURL=session-histories.module.js.map