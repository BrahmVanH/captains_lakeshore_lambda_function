"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const amenitiesSchema = new mongoose_1.Schema({
    amenityName: {
        type: String,
    },
    amenityType: {
        type: String,
    },
});
const propertySchema = new mongoose_1.Schema({
    propertyName: {
        type: String,
    },
    propertyDescription: {
        type: String,
    },
    amenities: {
        type: [amenitiesSchema],
    },
    headerImgKey: {
        type: String,
    },
    bookings: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Booking',
        },
    ],
});
const Property = (0, mongoose_1.model)('Property', propertySchema);
exports.default = Property;
//# sourceMappingURL=Property.js.map