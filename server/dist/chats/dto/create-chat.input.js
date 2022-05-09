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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateChatInput = void 0;
const class_validator_1 = require("class-validator");
const chatSender_types_1 = __importDefault(require("../../types/chatSender.types"));
const graphql_1 = require("@nestjs/graphql");
let CreateChatInput = class CreateChatInput {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], CreateChatInput.prototype, "userId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], CreateChatInput.prototype, "trainerId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], CreateChatInput.prototype, "text", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], CreateChatInput.prototype, "sender", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsNumber({}, { each: true }),
    graphql_1.Field((type) => [graphql_1.Int], { nullable: true }),
    __metadata("design:type", Array)
], CreateChatInput.prototype, "imgIds", void 0);
CreateChatInput = __decorate([
    graphql_1.InputType()
], CreateChatInput);
exports.CreateChatInput = CreateChatInput;
//# sourceMappingURL=create-chat.input.js.map