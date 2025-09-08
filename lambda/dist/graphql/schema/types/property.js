"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f6ab157d-ee83-559e-b01e-8f548e8773bb")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyTypes = void 0;
exports.propertyTypes = `
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
        s3DirectoryPrefix: String
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
//# sourceMappingURL=property.js.map
//# debugId=f6ab157d-ee83-559e-b01e-8f548e8773bb
