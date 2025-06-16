"use strict";
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
exports.bookingMutations = void 0;
const db_1 = require("../../../connection/db");
const models_1 = require("../../../models");
exports.bookingMutations = {
    createBooking: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bookings } = args.input;
            yield (0, db_1.connectToDb)();
            if (!bookings || bookings.length === 0) {
                throw new Error('No bookings provided to create');
            }
            const createdBookings = yield models_1.Booking.create(bookings);
            if (!createdBookings) {
                throw new Error('Could not create new date');
            }
            return createdBookings;
        }
        catch (err) {
            throw new Error('Error in creating booking in db: ' + err.message);
        }
    }),
    removeBooking: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bookingIds } = args.input;
            yield (0, db_1.connectToDb)();
            if (!bookingIds || bookingIds.length === 0) {
                throw new Error('booking ID is undefined');
            }
            const booking = yield models_1.Booking.deleteMany({ _id: { $in: bookingIds } });
            if (!booking) {
                throw new Error('could not find unavailable date with that value...');
            }
            return booking;
        }
        catch (err) {
            throw new Error('Error in removing unavailable booking from db: ' + err.message);
        }
    }),
};
//# sourceMappingURL=booking.js.map