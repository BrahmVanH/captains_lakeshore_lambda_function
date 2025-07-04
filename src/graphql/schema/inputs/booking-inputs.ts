export const bookingInputs = /* GraphQL */ `
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