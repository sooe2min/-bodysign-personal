"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCategoriesModule = void 0;
const non_registered_users_module_1 = require("../non-registered-users/non-registered-users.module");
const trainers_module_1 = require("../trainers/trainers.module");
const users_module_1 = require("../users/users.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_category_entity_1 = require("./entities/user-category.entity");
const user_categories_resolver_1 = require("./user-categories.resolver");
const user_categories_service_1 = require("./user-categories.service");
let UserCategoriesModule = class UserCategoriesModule {
};
UserCategoriesModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_category_entity_1.UserCategory]),
            common_1.forwardRef(() => trainers_module_1.TrainersModule),
            common_1.forwardRef(() => users_module_1.UsersModule),
            common_1.forwardRef(() => non_registered_users_module_1.NonRegisteredUsersModule),
        ],
        providers: [user_categories_resolver_1.UserCategoriesResolver, user_categories_service_1.UserCategoriesService],
        exports: [user_categories_service_1.UserCategoriesService],
    })
], UserCategoriesModule);
exports.UserCategoriesModule = UserCategoriesModule;
//# sourceMappingURL=user-categories.module.js.map