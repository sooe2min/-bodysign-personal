"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const auth_module_1 = require("../auth/auth.module");
const inbodies_module_1 = require("../inbodies/inbodies.module");
const session_histories_module_1 = require("../session-histories/session-histories.module");
const sessions_module_1 = require("../sessions/sessions.module");
const trainers_module_1 = require("../trainers/trainers.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const users_resolver_1 = require("./users.resolver");
const users_service_1 = require("./users.service");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User]),
            common_1.forwardRef(() => trainers_module_1.TrainersModule),
            common_1.forwardRef(() => auth_module_1.AuthModule),
            common_1.forwardRef(() => sessions_module_1.SessionsModule),
            common_1.forwardRef(() => inbodies_module_1.InbodiesModule),
            common_1.forwardRef(() => session_histories_module_1.SessionHistoriesModule),
        ],
        providers: [users_resolver_1.UsersResolver, users_service_1.UsersService],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map