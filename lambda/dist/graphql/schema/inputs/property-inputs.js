"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="da5d8dab-cc1d-5fae-abef-da10936e636b")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyInputs = void 0;
exports.propertyInputs = `
    input CreatePropertyInput {
        propertyName: String!
    }

    input Update {
        propertyName: String
        propertyDescription: String
        amenities: [AmenityInput]
        headerImgKey: String
        s3DirectoryPrefix: String
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

    input UpdatePropertyS3DirectoryPrefixInput {
        _id: ID!
        s3DirectoryPrefix: String

    }
`;
//# sourceMappingURL=property-inputs.js.map
//# debugId=da5d8dab-cc1d-5fae-abef-da10936e636b
