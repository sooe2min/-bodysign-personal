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
exports.CreateSessionHistoryInput = void 0;
const generalStatus_types_1 = __importDefault(require("../../types/generalStatus.types"));
const graphql_1 = require("@nestjs/graphql");
let CreateSessionHistoryInput = class CreateSessionHistoryInput {
};
__decorate([
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], CreateSessionHistoryInput.prototype, "userId", void 0);
__decorate([
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], CreateSessionHistoryInput.prototype, "date", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], CreateSessionHistoryInput.prototype, "costPerSession", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], CreateSessionHistoryInput.prototype, "totalCount", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CreateSessionHistoryInput.prototype, "status", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateSessionHistoryInput.prototype, "commission", void 0);
CreateSessionHistoryInput = __decorate([
    graphql_1.InputType()
], CreateSessionHistoryInput);
exports.CreateSessionHistoryInput = CreateSessionHistoryInput;
//# sourceMappingURL=create-session-history.input.js.map