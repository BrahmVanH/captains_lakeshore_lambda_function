"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const amenitiesSchema = new mongoose_1.Schema({
    amenityName: {
        type: String,
    },
    amenityType: {
        type: String,
    },
});
const propertySchema = new mongoose_1.Schema({
    propertyName: {
        type: String,
    },
    overviewItems: {
        type: [
            {
                name: {
                    type: String,
                },
                icon: {
                    type: String,
                },
            },
        ],
    },
    propertyDescription: {
        type: String,
    },
    roomsAndBeds: [
        {
            name: {
                type: String,
            },
            beds: [
                {
                    name: {
                        type: String,
                    },
                    quantity: {
                        type: Number,
                    },
                    icon: {
                        type: String,
                    },
                },
            ],
        },
    ],
    spacesItems: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Space',
        },
    ],
    amenities: {
        type: [
            {
                type: mongoose_1.Types.ObjectId,
                ref: 'Amenity',
            },
        ],
    },
    importantInfo: {
        type: [String],
    },
    houseRules: {
        general: {
            type: [String],
        },
        children: {
            type: String,
        },
        events: {
            type: String,
        },
        pets: {
            type: String,
        },
        smoking: {
            type: String,
        },
        additional: {
            type: [String],
        },
        damages: {
            type: [String],
        },
    },
    headerImgKey: {
        type: String,
    },
    s3DirectoryPrefix: {
        type: String,
    },
    bookings: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Booking',
        },
    ],
});
const Property = (0, mongoose_1.model)('Property', propertySchema);
exports.default = Property;
//# sourceMappingURL=Property.js.map