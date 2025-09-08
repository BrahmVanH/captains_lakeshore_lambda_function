"use strict";
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