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
exports.CreateSessionExerciseVolumeInput = void 0;
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
let CreateSessionExerciseVolumeInput = class CreateSessionExerciseVolumeInput {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], CreateSessionExerciseVolumeInput.prototype, "sessionExerciseId", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], CreateSessionExerciseVolumeInput.prototype, "reps", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], CreateSessionExerciseVolumeInput.prototype, "sets", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field((type) => graphql_1.Float, { nullable: false }),
    __metadata("design:type", Number)
], CreateSessionExerciseVolumeInput.prototype, "weight", void 0);
CreateSessionExerciseVolumeInput = __decorate([
    graphql_1.InputType()
], CreateSessionExerciseVolumeInput);
exports.CreateSessionExerciseVolumeInput = CreateSessionExerciseVolumeInput;
//# sourceMappingURL=create-session-exercise-volume.input.js.map