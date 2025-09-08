"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ecfe4b6d-d48d-5654-a669-6a16dd6cb0f5")}catch(e){}}();

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingQueries = void 0;
const db_1 = require("../../../connection/db");
const models_1 = require("../../../models");
exports.bookingQueries = {
    queryBookingsByProperty: (_1, _a, __1) => __awaiter(void 0, [_1, _a, __1], void 0, function* (_, { propertyId }, __) {
        try {
            yield (0, db_1.connectToDb)();
            if (!propertyId) {
                throw new Error('No property name was presented for querying bookings');
            }
            const bookings = yield models_1.Booking.find({ propertyId: propertyId });
            if (!bookings) {
                throw new Error('Cannot find booking in database');
            }
            return bookings;
        }
        catch (err) {
            console.error({ message: 'error in finding bookings', details: err });
            throw new Error('Error in finding dates: ' + err.message);
        }
    })
};
//# sourceMappingURL=booking.js.map
//# debugId=ecfe4b6d-d48d-5654-a669-6a16dd6cb0f5
