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
exports.InbodiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const user_entity_1 = require("../users/entities/user.entity");
const users_service_1 = require("../users/users.service");
const typeorm_2 = require("typeorm");
const inbody_entity_1 = require("./entities/inbody.entity");
let InbodiesService = class InbodiesService {
    constructor(inbodiesRepository, usersService) {
        this.inbodiesRepository = inbodiesRepository;
        this.usersService = usersService;
    }
    create(createInbodyInput) {
        const newInbody = this.inbodiesRepository.create(createInbodyInput);
        return this.inbodiesRepository.save(newInbody);
    }
    findAll() {
        return this.inbodiesRepository.find();
    }
    findOneById(id) {
        return this.inbodiesRepository.findOneOrFail(id);
    }
    findAllByUserId(userId) {
        return this.inbodiesRepository.find({ userId });
    }
    getUser(userId) {
        return this.usersService.findOneById(userId);
    }
    async update(updateInbodyInput) {
        const inbody = await this.inbodiesRepository.findOneOrFail(updateInbodyInput.id);
        return this.inbodiesRepository.save(Object.assign(Object.assign({}, inbody), updateInbodyInput));
    }
    async remove(id) {
        const inbody = await this.inbodiesRepository.findOneOrFail(id);
        return this.inbodiesRepository.remove(inbody);
    }
    async canMutate(currentUser, id) {
        if (currentUser instanceof trainer_entity_1.Trainer)
            return false;
        const inbody = await this.inbodiesRepository.findOneOrFail(id);
        if (inbody.userId !== currentUser.id) {
            return false;
        }
        return true;
    }
};
InbodiesService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(inbody_entity_1.Inbody)),
    __param(1, common_1.Inject(common_1.forwardRef(() => users_service_1.UsersService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], InbodiesService);
exports.InbodiesService = InbodiesService;
//# sourceMappingURL=inbodies.service.js.map