"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const amenitySchema = new mongoose_1.Schema({
    amenityName: {
        type: String,
        required: true,
    },
    amenityType: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
});
const Amenity = (0, mongoose_1.model)('Amenity', amenitySchema);
exports.default = Amenity;
//# sourceMappingURL=Amenity.js.map