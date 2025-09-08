"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6c92c9c9-8052-5189-b32e-d5ebf9430313")}catch(e){}}();

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
//# debugId=6c92c9c9-8052-5189-b32e-d5ebf9430313
