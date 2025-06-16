export const propertyTypes = /* GraphQL */ `
    type Property {
        _id: ID!
        propertyName: String!
        overviewItems: [OverviewItem]
        propertyDescription: String
        roomsAndBeds: [RoomBed]
        spacesItems: [Space]
        amenities: [Amenity]
        importantInfo: [String]
        houseRules: HouseRules
        headerImgKey: String
        bookings: [Booking!]
    }

    type PropertyLite {
        _id: ID!
        propertyName: String!
        propertyDescription: String!
        headerImgKey: String!
    }

    type Bed {
        name: String!
        quantity: Int!
        icon: String
    }

    type RoomBed {
        name: String!
        beds: [Bed]
    }

    type HouseRules {
        general: [String]
        children: String
        events: String
        pets: String
        smoking: String
        additional: [String]	
        damages: [String]
    }

    type OverviewItem {
        name: String!
        icon: String
    }

    type Space {
        _id: ID!
        name: String!
        icon: String
    }
`;