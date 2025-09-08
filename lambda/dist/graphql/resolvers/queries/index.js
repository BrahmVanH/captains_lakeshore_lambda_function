"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8d541508-a320-5ac3-811a-ddc48623b8f6")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
const user_1 = require("./user");
const booking_1 = require("./booking");
const property_1 = require("./property");
const amenity_1 = require("./amenity");
const space_1 = require("./space");
const image_1 = require("./image");
exports.queries = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, user_1.userQueries), booking_1.bookingQueries), property_1.propertyQueries), amenity_1.amenityQueries), space_1.spaceQueries), image_1.imageQueries);
//# sourceMappingURL=index.js.map
//# debugId=8d541508-a320-5ac3-811a-ddc48623b8f6
