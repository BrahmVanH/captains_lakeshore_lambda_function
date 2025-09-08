"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="b7ae0f4f-67ff-5f01-bc00-48f5125e8b3e")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    propertyId: {
        type: String,
        required: true,
    },
    dateValue: {
        type: String,
        required: true,
    },
});
const Booking = (0, mongoose_1.model)('Booking', bookingSchema);
exports.default = Booking;
//# sourceMappingURL=Booking.js.map
//# debugId=b7ae0f4f-67ff-5f01-bc00-48f5125e8b3e
