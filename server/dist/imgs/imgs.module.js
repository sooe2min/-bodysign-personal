"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgsModule = void 0;
const common_1 = require("@nestjs/common");
const chats_module_1 = require("../chats/chats.module");
const img_entity_1 = require("./entities/img.entity");
const imgs_controller_1 = require("./imgs.controller");
const imgs_resolver_1 = require("./imgs.resolver");
const imgs_service_1 = require("./imgs.service");
const typeorm_1 = require("@nestjs/typeorm");
let ImgsModule = class ImgsModule {
};
ImgsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([img_entity_1.Img]), common_1.forwardRef(() => chats_module_1.ChatsModule)],
        providers: [imgs_service_1.ImgsService, imgs_resolver_1.ImgsResolver],
        exports: [imgs_service_1.ImgsService],
        controllers: [imgs_controller_1.ImgsController],
    })
], ImgsModule);
exports.ImgsModule = ImgsModule;
//# sourceMappingURL=imgs.module.js.map