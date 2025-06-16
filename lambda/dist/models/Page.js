"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const pageSchema = new mongoose_1.Schema({
    slug: {
        type: String,
        required: true
    },
    heroImgKey: {
        type: String,
        required: true
    },
    heading: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: false
    }
});
const PageModel = (0, mongoose_1.model)('Page', pageSchema);
exports.default = PageModel;
//# sourceMappingURL=Page.js.map