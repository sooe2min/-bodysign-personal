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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const chats_service_1 = require("../chats/chats.service");
const typeorm_2 = require("typeorm");
const img_entity_1 = require("./entities/img.entity");
const chat_entity_1 = require("../chats/entities/chat.entity");
const AWS = __importStar(require("aws-sdk"));
const user_entity_1 = require("../users/entities/user.entity");
const trainer_entity_1 = require("../trainers/entities/trainer.entity");
const chatSender_types_1 = __importDefault(require("../types/chatSender.types"));
const s3 = new AWS.S3();
AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
let ImgsService = class ImgsService {
    constructor(imgsRepository, chatsService) {
        this.imgsRepository = imgsRepository;
        this.chatsService = chatsService;
    }
    async createImg(createImgInput) {
        const chat = await this.chatsService.findOneById(createImgInput.chatId);
        const createParams = Object.assign(Object.assign({}, createImgInput), { trainerId: chat.trainerId, userId: chat.userId });
        const newImg = this.imgsRepository.create(createParams);
        return this.imgsRepository.save(newImg);
    }
    findAll() {
        return this.imgsRepository.find();
    }
    findOneById(id) {
        return this.imgsRepository.findOneOrFail(id);
    }
    findAllByChatId(chatId) {
        return this.imgsRepository.find({ chatId });
    }
    findByUserIdAndTrainerId(findImgsInput) {
        const { userId, trainerId, page, per } = findImgsInput;
        return this.imgsRepository.find({
            where: { userId, trainerId },
            take: per,
            skip: page * per,
            order: {
                createdAt: 'DESC',
            },
        });
    }
    getChat(chatId) {
        return this.chatsService.findOneById(chatId);
    }
    async uploadImg(file, req) {
        try {
            return await this.imgsRepository.save({ url: req.files[0].location });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async bulkUpdateChatId(chatId, ids) {
        const chat = await this.chatsService.findOneById(chatId);
        return this.imgsRepository.update({ id: typeorm_2.In(ids) }, { chatId, userId: chat.userId, trainerId: chat.trainerId });
    }
    async remove(id) {
        const result = await this.imgsRepository.delete(id);
        return result.affected === 1;
    }
    async bulkRemove(ids) {
        const result = await this.imgsRepository.delete(ids);
        return result.affected == ids.length;
    }
    async canMutate(currentUser, id) {
        const img = await this.imgsRepository.findOneOrFail({
            where: { id },
            relations: ['chat'],
        });
        if ((currentUser instanceof user_entity_1.User &&
            img.chat.sender === chatSender_types_1.default.USER &&
            currentUser.id === img.userId) ||
            (currentUser instanceof trainer_entity_1.Trainer &&
                img.chat.sender === chatSender_types_1.default.TRAINER &&
                currentUser.id === img.trainerId)) {
            return true;
        }
        return false;
    }
    async bulkCanMutate(currentUser, ids) {
        const imgs = await this.imgsRepository.find({
            where: {
                id: typeorm_2.In(ids),
            },
            relations: ['chat'],
        });
        if (imgs.length !== ids.length) {
            return false;
        }
        for (let img of imgs) {
            if ((currentUser instanceof user_entity_1.User &&
                img.chat.sender === chatSender_types_1.default.USER &&
                currentUser.id === img.userId) ||
                (currentUser instanceof trainer_entity_1.Trainer &&
                    img.chat.sender === chatSender_types_1.default.TRAINER &&
                    currentUser.id === img.trainerId)) {
                continue;
            }
            else {
                return false;
            }
        }
        return true;
    }
};
ImgsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(img_entity_1.Img)),
    __param(1, common_1.Inject(common_1.forwardRef(() => chats_service_1.ChatsService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        chats_service_1.ChatsService])
], ImgsService);
exports.ImgsService = ImgsService;
//# sourceMappingURL=imgs.service.js.map