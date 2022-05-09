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
exports.UpdateSessionExerciseVolumeInput = void 0;
const class_validator_1 = require("class-validator");
const graphql_1 = require("@nestjs/graphql");
const create_session_exercise_volume_input_1 = require("./create-session-exercise-volume.input");
let UpdateSessionExerciseVolumeInput = class UpdateSessionExerciseVolumeInput extends graphql_1.PartialType(create_session_exercise_volume_input_1.CreateSessionExerciseVolumeInput) {
};
__decorate([
    class_validator_1.IsNotEmpty(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: false }),
    __metadata("design:type", Number)
], UpdateSessionExerciseVolumeInput.prototype, "id", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateSessionExerciseVolumeInput.prototype, "reps", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateSessionExerciseVolumeInput.prototype, "sets", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field((type) => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateSessionExerciseVolumeInput.prototype, "weight", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field((type) => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateSessionExerciseVolumeInput.prototype, "seq", void 0);
UpdateSessionExerciseVolumeInput = __decorate([
    graphql_1.InputType()
], UpdateSessionExerciseVolumeInput);
exports.UpdateSessionExerciseVolumeInput = UpdateSessionExerciseVolumeInput;
//# sourceMappingURL=update-session-exercise-volume.input.js.map