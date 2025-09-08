"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="bcdc54f2-bfd0-5598-ac7d-bf05dc372022")}catch(e){}}();

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
//# debugId=bcdc54f2-bfd0-5598-ac7d-bf05dc372022
