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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgsController = void 0;
const common_1 = require("@nestjs/common");
const files_interceptor_1 = require("@nestjs/platform-express/multer/interceptors/files.interceptor");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const imgs_service_1 = require("./imgs.service");
const s3 = new aws_sdk_1.default.S3();
aws_sdk_1.default.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
let ImgsController = class ImgsController {
    constructor(imgsService) {
        this.imgsService = imgsService;
    }
    async create(file, req) {
        return this.imgsService.uploadImg(file, req);
    }
};
__decorate([
    common_1.Post(),
    common_1.UseInterceptors(files_interceptor_1.FilesInterceptor('image', 1, {
        storage: multer_s3_1.default({
            s3: s3,
            bucket: process.env.AWS_S3_BUCKET_NAME,
            acl: 'public-read',
            key: function (request, file, cb) {
                cb(null, `${Date.now().toString()}-${file.originalname}`);
            },
        }),
    })),
    __param(0, common_1.UploadedFile()),
    __param(1, common_1.Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ImgsController.prototype, "create", null);
ImgsController = __decorate([
    common_1.Controller('imgs'),
    __metadata("design:paramtypes", [imgs_service_1.ImgsService])
], ImgsController);
exports.ImgsController = ImgsController;
//# sourceMappingURL=imgs.controller.js.map