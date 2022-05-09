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
exports.UpdateSessionHistoryInput = void 0;
const generalStatus_types_1 = __importDefault(require("../../types/generalStatus.types"));
const graphql_1 = require("@nestjs/graphql");
const create_session_history_input_1 = require("./create-session-history.input");
let UpdateSessionHistoryInput = class UpdateSessionHistoryInput extends graphql_1.PartialType(create_session_history_input_1.CreateSessionHistoryInput) {
};
__decorate([
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], UpdateSessionHistoryInput.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Date)
], UpdateSessionHistoryInput.prototype, "date", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateSessionHistoryInput.prototype, "costPerSession", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateSessionHistoryInput.prototype, "totalCount", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateSessionHistoryInput.prototype, "usedCount", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], UpdateSessionHistoryInput.prototype, "status", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Int),
    __metadata("design:type", Number)
], UpdateSessionHistoryInput.prototype, "commission", void 0);
UpdateSessionHistoryInput = __decorate([
    graphql_1.InputType()
], UpdateSessionHistoryInput);
exports.UpdateSessionHistoryInput = UpdateSessionHistoryInput;
//# sourceMappingURL=update-session-history.input.js.map