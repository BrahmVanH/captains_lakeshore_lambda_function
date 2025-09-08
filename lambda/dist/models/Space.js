"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f88cf7f1-8e9d-5d92-a50c-ee9d9bea8c17")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const spaceSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    icon: {
        type: String,
    },
});
const Space = (0, mongoose_1.model)('Space', spaceSchema);
exports.default = Space;
//# sourceMappingURL=Space.js.map
//# debugId=f88cf7f1-8e9d-5d92-a50c-ee9d9bea8c17
