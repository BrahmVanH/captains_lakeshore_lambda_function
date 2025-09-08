"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputs = void 0;
const amenity_inputs_1 = require("./amenity-inputs");
const booking_inputs_1 = require("./booking-inputs");
const image_inputs_1 = require("./image-inputs");
const page_inputs_1 = require("./page-inputs");
const property_inputs_1 = require("./property-inputs");
const user_inputs_1 = require("./user-inputs");
exports.inputs = [
    amenity_inputs_1.amenityInputs,
    booking_inputs_1.bookingInputs,
    image_inputs_1.imageInputs,
    page_inputs_1.pageInputs,
    property_inputs_1.propertyInputs,
    user_inputs_1.userInputs
].join('\n');
//# sourceMappingURL=index.js.map