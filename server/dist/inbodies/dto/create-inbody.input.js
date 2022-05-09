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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInbodyInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let CreateInbodyInput = class CreateInbodyInput {
};
__decorate([
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], CreateInbodyInput.prototype, "userId", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Float, { nullable: false }),
    __metadata("design:type", Number)
], CreateInbodyInput.prototype, "bodyWeight", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Float, { nullable: false }),
    __metadata("design:type", Number)
], CreateInbodyInput.prototype, "muscleWeight", void 0);
__decorate([
    graphql_1.Field((type) => graphql_1.Float, { nullable: false }),
    __metadata("design:type", Number)
], CreateInbodyInput.prototype, "bodyFat", void 0);
__decorate([
    graphql_1.Field({ nullable: false }),
    __metadata("design:type", Date)
], CreateInbodyInput.prototype, "measuredDate", void 0);
CreateInbodyInput = __decorate([
    graphql_1.InputType()
], CreateInbodyInput);
exports.CreateInbodyInput = CreateInbodyInput;
//# sourceMappingURL=create-inbody.input.js.map