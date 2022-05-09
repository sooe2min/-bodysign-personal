"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerInterestService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const trainerInterest_entity_1 = require("./entities/trainerInterest.entity");
let TrainerInterestService = class TrainerInterestService {
    constructor(trainerInterestsRepository) {
        this.trainerInterestsRepository = trainerInterestsRepository;
    }
    bulkCreate(trainerId, interests) {
        const newTrainerInterest = interests.map((interest) => this.trainerInterestsRepository.create({ trainerId, interest }));
        return this.trainerInterestsRepository.save(newTrainerInterest);
    }
    findAllByTrainerId(trainerId) {
        return this.trainerInterestsRepository.find({ where: { trainerId } });
    }
    async remove(id) {
        const result = await this.trainerInterestsRepository.delete(id);
        return result.affected == 1;
    }
    async bulkRemove(trainerId) {
        const interests = await this.trainerInterestsRepository.find({
            where: { trainerId },
        });
        if (interests.length === 0) {
            return true;
        }
        const result = await this.trainerInterestsRepository.delete(interests.map((interest) => interest.id));
        return result.affected === interests.length;
    }
};
TrainerInterestService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(trainerInterest_entity_1.TrainerInterest)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TrainerInterestService);
exports.TrainerInterestService = TrainerInterestService;
//# sourceMappingURL=trainer-interest.service.js.map