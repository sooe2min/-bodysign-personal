"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonRegisteredUsersModule = void 0;
const trainers_module_1 = require("../trainers/trainers.module");
const user_categories_module_1 = require("../user-categories/user-categories.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const non_registered_user_entity_1 = require("./entities/non-registered-user.entity");
const non_registered_users_resolver_1 = require("./non-registered-users.resolver");
const non_registered_users_service_1 = require("./non-registered-users.service");
let NonRegisteredUsersModule = class NonRegisteredUsersModule {
};
NonRegisteredUsersModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([non_registered_user_entity_1.NonRegisteredUser]),
            common_1.forwardRef(() => trainers_module_1.TrainersModule),
            common_1.forwardRef(() => user_categories_module_1.UserCategoriesModule),
        ],
        providers: [non_registered_users_resolver_1.NonRegisteredUsersResolver, non_registered_users_service_1.NonRegisteredUsersService],
        exports: [non_registered_users_service_1.NonRegisteredUsersService],
    })
], NonRegisteredUsersModule);
exports.NonRegisteredUsersModule = NonRegisteredUsersModule;
//# sourceMappingURL=non-registered-users.module.js.map