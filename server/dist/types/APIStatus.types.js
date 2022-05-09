"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var APIStatus;
(function (APIStatus) {
    APIStatus[APIStatus["SUCCESS"] = 200] = "SUCCESS";
    APIStatus[APIStatus["CREATED"] = 201] = "CREATED";
    APIStatus[APIStatus["ERROR"] = 400] = "ERROR";
    APIStatus[APIStatus["AUTH_ERROR"] = 401] = "AUTH_ERROR";
    APIStatus[APIStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
})(APIStatus || (APIStatus = {}));
exports.default = APIStatus;
//# sourceMappingURL=APIStatus.types.js.map