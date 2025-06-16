export const propertyInputs = /* GraphQL */ `
    input CreatePropertyInput {
        propertyName: String!
    }

    input Update {
        propertyName: String!
        propertyDescription: String!
        amenities: [AmenityInput!]
        headerImgKey: String!
    }

    input UpdatePropertyNameInput {
        _id: ID!
        propertyName: String!
    }

    input UpdatePropertyInput {
        _id: ID!
        update: Update!
    }

    input UpdatePropertyDescriptionInput {
        _id: ID!
        propertyDescription: String!
    }

    input UpdatePropertyAmenitiesInput {
        _id: ID!
        amenities: [ID!]
    }

    input UpdatePropertyHeaderImgInput {
        _id: ID!
        headerImgKey: String!
    }

    input OverviewInput {
        name: String!
        icon: String
    }

    input UpdatePropertyOverviewItemsInput {
        _id: ID!
        overviewItems: [OverviewInput!]
    }

    input BedInput {
        name: String!
        quantity: Int!
        icon: String
    }

    input RoomBedInput {
        name: String!
        beds: [BedInput]
    }

    input UpdatePropertyRoomsAndBedsInput {
        _id: ID!
        roomsAndBeds: [RoomBedInput]
    }

    input SpaceInput {
        name: String!
        icon: String
    }

    input UpdatePropertySpacesInput {
        _id: ID!
        spacesItems: [ID!]
    }

    input UpdatePropertyImportantInfoInput {
        _id: ID!
        importantInfo: [String]
    }

    input HouseRulesInput {
        general: [String]
        children: String
        events: String
        pets: String
        smoking: String
        additional: [String]
        damages: [String]
    }

    input UpdatePropertyHouseRulesInput {
        _id: ID!
        houseRules: HouseRulesInput
    }
`;