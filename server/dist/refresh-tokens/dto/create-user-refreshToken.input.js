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
exports.CreateRefreshTokenInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const user_types_1 = __importDefault(require("../../types/user.types"));
let CreateRefreshTokenInput = class CreateRefreshTokenInput {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], CreateRefreshTokenInput.prototype, "targetId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateRefreshTokenInput.prototype, "targetType", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CreateRefreshTokenInput.prototype, "refreshToken", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CreateRefreshTokenInput.prototype, "providerId", void 0);
CreateRefreshTokenInput = __decorate([
    graphql_1.InputType()
], CreateRefreshTokenInput);
exports.CreateRefreshTokenInput = CreateRefreshTokenInput;
//# sourceMappingURL=create-user-refreshToken.input.js.map