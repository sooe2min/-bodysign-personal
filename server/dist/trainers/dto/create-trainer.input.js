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
exports.CreateTrainerInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const gender_types_1 = __importDefault(require("../../types/gender.types"));
const login_types_1 = __importDefault(require("../../types/login.types"));
const trainerInterest_types_1 = __importDefault(require("../../types/trainerInterest.types"));
let CreateTrainerInput = class CreateTrainerInput {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsEmail(),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], CreateTrainerInput.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], CreateTrainerInput.prototype, "userName", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], CreateTrainerInput.prototype, "password", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], CreateTrainerInput.prototype, "gender", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", String)
], CreateTrainerInput.prototype, "loginType", void 0);
__decorate([
    graphql_1.Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], CreateTrainerInput.prototype, "interests", void 0);
CreateTrainerInput = __decorate([
    graphql_1.InputType()
], CreateTrainerInput);
exports.CreateTrainerInput = CreateTrainerInput;
//# sourceMappingURL=create-trainer.input.js.map