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
exports.ChatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const imgs_service_1 = require("../imgs/imgs.service");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const chatSender_types_1 = __importDefault(require("../types/chatSender.types"));
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const chat_entity_1 = require("./entities/chat.entity");
let ChatsService = class ChatsService {
    constructor(chatsRepository, imgsService) {
        this.chatsRepository = chatsRepository;
        this.imgsService = imgsService;
    }
    async create(createChatInput) {
        const { imgIds } = createChatInput, newChatInput = __rest(createChatInput, ["imgIds"]);
        const newChat = this.chatsRepository.create(newChatInput);
        await this.chatsRepository.save(newChat);
        if (imgIds.length > 0) {
            await this.imgsService.bulkUpdateChatId(newChat.id, imgIds);
        }
        return this.chatsRepository.findOneOrFail(newChat.id, {
            relations: ['imgs'],
        });
    }
    findAll() {
        return this.chatsRepository.find();
    }
    findOneById(id) {
        return this.chatsRepository.findOneOrFail(id);
    }
    findRecentChatByUserIdAndTrainerId(userId, trainerId) {
        return this.chatsRepository.find({
            where: {
                userId,
                trainerId,
            },
            order: {
                createdAt: 'DESC',
            },
            relations: ['imgs'],
            take: 10,
        });
    }
    findChatsByUserIdAndTrainerId(findChatsInput) {
        const { userId, trainerId, page, per } = findChatsInput;
        return this.chatsRepository.find({
            where: {
                userId,
                trainerId,
            },
            relations: ['imgs'],
            take: per,
            skip: page * per,
            order: {
                createdAt: 'DESC',
            },
        });
    }
    async update(updateChatInput) {
        const chat = await this.chatsRepository.findOneOrFail(updateChatInput.id);
        return this.chatsRepository.save(Object.assign(Object.assign({}, chat), updateChatInput));
    }
    async remove(id) {
        const result = await this.chatsRepository.delete(id);
        const imgs = await this.imgsService.findAllByChatId(id);
        return result.affected == 1 && imgs.length == 0;
    }
    async canMutate(currentUser, id) {
        const chat = await this.findOneById(id);
        if (chat.sender === chatSender_types_1.default.USER && currentUser instanceof user_entity_1.User) {
            return chat.userId === currentUser.id;
        }
        else if (chat.sender === chatSender_types_1.default.TRAINER &&
            currentUser instanceof trainer_entity_1.Trainer) {
            return chat.trainerId === currentUser.id;
        }
        return false;
    }
};
ChatsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(chat_entity_1.Chat)),
    __param(1, common_1.Inject(common_1.forwardRef(() => imgs_service_1.ImgsService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        imgs_service_1.ImgsService])
], ChatsService);
exports.ChatsService = ChatsService;
//# sourceMappingURL=chats.service.js.map