"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    propertyName: {
        type: String,
        required: true,
    },
    dateValue: {
        type: String,
        required: true,
    },
});
const Booking = (0, mongoose_1.model)('BookingDate', bookingSchema);
exports.default = Booking;
//# sourceMappingURL=Date.js.map