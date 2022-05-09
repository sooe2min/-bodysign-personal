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
exports.UpdateUserCategoryInput = void 0;
const class_validator_1 = require("class-validator");
const generalStatus_types_1 = __importDefault(require("../../types/generalStatus.types"));
const graphql_1 = require("@nestjs/graphql");
const create_user_category_input_1 = require("./create-user-category.input");
let UpdateUserCategoryInput = class UpdateUserCategoryInput extends graphql_1.PartialType(create_user_category_input_1.CreateUserCategoryInput) {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], UpdateUserCategoryInput.prototype, "id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserCategoryInput.prototype, "name", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateUserCategoryInput.prototype, "status", void 0);
UpdateUserCategoryInput = __decorate([
    graphql_1.InputType()
], UpdateUserCategoryInput);
exports.UpdateUserCategoryInput = UpdateUserCategoryInput;
//# sourceMappingURL=update-user-category.input.js.map