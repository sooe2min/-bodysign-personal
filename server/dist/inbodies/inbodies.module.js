"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InbodiesModule = void 0;
const users_module_1 = require("../users/users.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const inbody_entity_1 = require("./entities/inbody.entity");
const inbodies_resolver_1 = require("./inbodies.resolver");
const inbodies_service_1 = require("./inbodies.service");
let InbodiesModule = class InbodiesModule {
};
InbodiesModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([inbody_entity_1.Inbody]), common_1.forwardRef(() => users_module_1.UsersModule)],
        providers: [inbodies_resolver_1.InbodiesResolver, inbodies_service_1.InbodiesService],
        exports: [inbodies_service_1.InbodiesService],
    })
], InbodiesModule);
exports.InbodiesModule = InbodiesModule;
//# sourceMappingURL=inbodies.module.js.map