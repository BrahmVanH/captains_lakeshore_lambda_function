"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingInputs = void 0;
exports.bookingInputs = `
    input NewBookingInput {
        propertyId: ID!
        dateValue: String!
    }

    input CreateBookingInput {
        bookings: [NewBookingInput!]
    }

    input RemoveBookingInput {
        bookingIds: [ID!]!
    }

    type RemoveBookingResponse {
        deletedCount: Int!
    }
`;
//# sourceMappingURL=booking-inputs.js.map