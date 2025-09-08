"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="15101e54-86ad-5b7a-8af7-bc87a01ffbe6")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
const amenity_1 = require("./amenity");
const booking_1 = require("./booking");
const image_1 = require("./image");
const page_1 = require("./page");
const property_1 = require("./property");
const user_1 = require("./user");
exports.types = [
    amenity_1.amenityTypes,
    booking_1.bookingTypes,
    image_1.imageTypes,
    page_1.pageTypes,
    property_1.propertyTypes,
    user_1.userTypes
].join('\n');
//# sourceMappingURL=index.js.map
//# debugId=15101e54-86ad-5b7a-8af7-bc87a01ffbe6
