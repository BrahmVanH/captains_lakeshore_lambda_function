"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
const user_1 = require("./user");
const booking_1 = require("./booking");
const property_1 = require("./property");
const amenity_1 = require("./amenity");
const space_1 = require("./space");
const image_1 = require("./image");
exports.mutations = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, user_1.userMutations), booking_1.bookingMutations), property_1.propertyMutations), amenity_1.amenityMutations), space_1.spaceMutations), image_1.imageMutations);
//# sourceMappingURL=index.js.map