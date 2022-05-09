"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = __importStar(require("bcrypt"));
const trainers_service_1 = require("../trainers/trainers.service");
const sessions_service_1 = require("../sessions/sessions.service");
const inbodies_service_1 = require("../inbodies/inbodies.service");
const inbody_entity_1 = require("../inbodies/entities/inbody.entity");
const session_history_entity_1 = require("../session-histories/entities/session-history.entity");
const session_histories_service_1 = require("../session-histories/session-histories.service");
const generalStatus_types_1 = __importDefault(require("../types/generalStatus.types"));
const session_entity_1 = require("../sessions/entities/session.entity");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
let UsersService = class UsersService {
    constructor(usersRepository, trainersService, sessionsService, inbodiesService, sessionHistoriesService) {
        this.usersRepository = usersRepository;
        this.trainersService = trainersService;
        this.sessionsService = sessionsService;
        this.inbodiesService = inbodiesService;
        this.sessionHistoriesService = sessionHistoriesService;
    }
    async create(createUserInput) {
        try {
            const user = await this.findOneByEmail(createUserInput.email);
            const trainer = await this.trainersService.findOneByEmail(createUserInput.email);
            if (user || trainer) {
                throw new Error('This email is already in use.');
            }
            const newUser = this.usersRepository.create(createUserInput);
            const salt = await bcrypt.genSalt();
            const newUserPassword = newUser.password;
            const hash = await bcrypt.hash(newUserPassword, salt);
            newUser.dbPasswordSalt = salt;
            newUser.password = hash;
            const _a = await this.usersRepository.save(newUser), { password, dbPasswordSalt } = _a, savedNewUser = __rest(_a, ["password", "dbPasswordSalt"]);
            return savedNewUser;
        }
        catch (err) {
            throw err;
        }
    }
    async createSocialUser(createSocialUserInput) {
        try {
            const user = await this.findOneByEmail(createSocialUserInput.email);
            const trainer = await this.trainersService.findOneByEmail(createSocialUserInput.email);
            if (user || trainer) {
                throw new Error('This email is already in use.');
            }
            const newUser = this.usersRepository.create(createSocialUserInput);
            return await this.usersRepository.save(newUser);
        }
        catch (err) {
            throw err;
        }
    }
    findAll() {
        return this.usersRepository.find({
            where: { status: generalStatus_types_1.default.ACTIVE },
        });
    }
    findOneById(id) {
        return this.usersRepository.findOneOrFail({
            where: { id, status: generalStatus_types_1.default.ACTIVE },
        });
    }
    findOneByEmail(email) {
        return this.usersRepository.findOne({
            where: { email, status: generalStatus_types_1.default.ACTIVE },
        });
    }
    findOneByPhoneNumber(trainerId, phoneNumber) {
        return this.usersRepository.findOne({
            where: { trainerId, phoneNumber, status: generalStatus_types_1.default.ACTIVE },
        });
    }
    findAllByTrainerId(trainerId) {
        return this.usersRepository.find({
            where: { trainerId, status: generalStatus_types_1.default.ACTIVE },
        });
    }
    findAllSessionsByUserId(userId) {
        return this.sessionsService.findAllByUserId(userId);
    }
    findAllByUserCategoryId(userCategoryId) {
        return this.usersRepository.find({ userCategoryId });
    }
    findAllInbodiesByUserId(userId) {
        return this.inbodiesService.findAllByUserId(userId);
    }
    findAllSessionHistoriesByUserId(userId) {
        return this.sessionHistoriesService.findAllByUserId(userId);
    }
    async update(updateUserInput) {
        const newUser = await this.findOneById(updateUserInput.id);
        return this.usersRepository.save(Object.assign(Object.assign({}, newUser), updateUserInput));
    }
    async updatePasswordUser(updatePasswordUserInput) {
        const id = updatePasswordUserInput.id;
        const user = await this.findOneById(id);
        const currPassword = await this.findPasswordByEmailUsingQueryBuilder(user.email);
        const checkPassword = await bcrypt.compare(updatePasswordUserInput.prevPassword, currPassword);
        if (!checkPassword) {
            throw new Error('Invalid Password.');
        }
        const findSelectUser = await this.usersRepository
            .createQueryBuilder('users')
            .where('users.id = :id', { id })
            .addSelect('users.dbPasswordSalt')
            .getOne();
        const updatePassword = await bcrypt.hash(updatePasswordUserInput.nowPassword, findSelectUser.dbPasswordSalt);
        const _a = await this.usersRepository.save(Object.assign(Object.assign({}, findSelectUser), { password: updatePassword })), { password, dbPasswordSalt } = _a, savedUser = __rest(_a, ["password", "dbPasswordSalt"]);
        return savedUser;
    }
    async remove(id) {
        const user = await this.findOneById(id);
        user.status = generalStatus_types_1.default.REMOVED;
        return this.usersRepository.save(user);
    }
    async removeTrainerId(id) {
        const user = await this.findOneById(id);
        user.trainerId = null;
        return this.usersRepository.save(user);
    }
    async bulkRemoveTrainerId(trainerId, ids) {
        await this.usersRepository.update({
            trainerId,
            id: typeorm_2.In(ids),
        }, { trainerId: null });
        return this.usersRepository.find({ where: { id: typeorm_2.In(ids), trainerId } });
    }
    async findPasswordByEmailUsingQueryBuilder(email) {
        const user = await this.usersRepository
            .createQueryBuilder('users')
            .where('users.email = :email', { email })
            .addSelect('users.password')
            .getOne();
        return user.password;
    }
    async canMutate(currentUser, id) {
        if (currentUser instanceof trainer_entity_1.Trainer)
            return false;
        const user = await this.usersRepository.findOneOrFail(id);
        return user.id === currentUser.id;
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __param(1, common_1.Inject(common_1.forwardRef(() => trainers_service_1.TrainersService))),
    __param(2, common_1.Inject(common_1.forwardRef(() => sessions_service_1.SessionsService))),
    __param(3, common_1.Inject(common_1.forwardRef(() => inbodies_service_1.InbodiesService))),
    __param(4, common_1.Inject(common_1.forwardRef(() => session_histories_service_1.SessionHistoriesService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        trainers_service_1.TrainersService,
        sessions_service_1.SessionsService,
        inbodies_service_1.InbodiesService,
        session_histories_service_1.SessionHistoriesService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map