"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerInterestModule = void 0;
const common_1 = require("@nestjs/common");
const trainerInterest_entity_1 = require("./entities/trainerInterest.entity");
const trainer_interest_service_1 = require("./trainer-interest.service");
const trainers_module_1 = require("../trainers/trainers.module");
const typeorm_1 = require("@nestjs/typeorm");
let TrainerInterestModule = class TrainerInterestModule {
};
TrainerInterestModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([trainerInterest_entity_1.TrainerInterest]),
            common_1.forwardRef(() => trainers_module_1.TrainersModule),
        ],
        providers: [trainer_interest_service_1.TrainerInterestService],
        exports: [trainer_interest_service_1.TrainerInterestService],
    })
], TrainerInterestModule);
exports.TrainerInterestModule = TrainerInterestModule;
//# sourceMappingURL=trainer-interest.module.js.map