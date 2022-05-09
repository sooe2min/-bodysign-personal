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
exports.UpdateSessionInput = void 0;
const class_validator_1 = require("class-validator");
const sessionStatus_types_1 = __importDefault(require("../../types/sessionStatus.types"));
const graphql_1 = require("@nestjs/graphql");
const create_session_input_1 = require("./create-session.input");
let UpdateSessionInput = class UpdateSessionInput extends graphql_1.PartialType(create_session_input_1.CreateSessionInput) {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], UpdateSessionInput.prototype, "id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateSessionInput.prototype, "status", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateSessionInput.prototype, "feedback", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateSessionInput.prototype, "sentFeedback", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateSessionInput.prototype, "completedSession", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], UpdateSessionInput.prototype, "date", void 0);
UpdateSessionInput = __decorate([
    graphql_1.InputType()
], UpdateSessionInput);
exports.UpdateSessionInput = UpdateSessionInput;
//# sourceMappingURL=update-session.input.js.map