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
exports.propertyQueries = void 0;
const models_1 = require("../../../models");
const db_1 = require("../../../connection/db");
const s3Query_1 = require("../../../utils/s3Query");
exports.propertyQueries = {
    getPropertyInfo: (_1, _a, __1) => __awaiter(void 0, [_1, _a, __1], void 0, function* (_, { _id }, __) {
        try {
            yield (0, db_1.connectToDb)();
            if (!_id) {
                throw new Error('No ID was presented for querying property info');
            }
            const propertyInfo = yield models_1.Property.findOne({ _id }).populate('bookings').populate('amenities').populate('spacesItems').populate('overviewItems');
            if (!propertyInfo) {
                throw new Error('Could not find property with that name');
            }
            return propertyInfo;
        }
        catch (err) {
            console.error('Error in getting property info', err);
            throw new Error('Error in getting property info: ' + err.message);
        }
    }),
    getProperties: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, db_1.connectToDb)();
            const properties = yield models_1.Property.find().populate('bookings').populate('amenities').populate('spacesItems').populate('overviewItems');
            if (!properties) {
                throw new Error('Error fetching all properties from database');
            }
            return properties;
        }
        catch (err) {
            console.error({ message: 'error in finding properties', details: err });
            throw new Error('Error in finding properties: ' + err.message);
        }
    }),
    getPropertiesLite: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, db_1.connectToDb)();
            const properties = yield models_1.Property.find();
            if (true) {
                throw new Error("This should show up in Sentry!");
            }
            if (!properties) {
                throw new Error('Error fetching all properties from database');
            }
            return properties.map(({ _id, propertyName, propertyDescription, headerImgKey }) => ({
                _id,
                propertyName,
                propertyDescription: propertyDescription !== null && propertyDescription !== void 0 ? propertyDescription : '',
                headerImgKey: headerImgKey !== null && headerImgKey !== void 0 ? headerImgKey : '',
            }));
        }
        catch (err) {
            console.error({ message: 'error in finding properties', details: err });
            throw new Error('Error in finding properties: ' + err.message);
        }
    }),
    getPropertyById: (_1, _a, __1) => __awaiter(void 0, [_1, _a, __1], void 0, function* (_, { _id }, __) {
        try {
            yield (0, db_1.connectToDb)();
            if (!_id) {
                throw new Error('No ID was presented for querying property');
            }
            const property = yield models_1.Property.findOne({ _id }).populate('bookings').populate('amenities').populate('spacesItems').populate('overviewItems');
            if (!property) {
                throw new Error('Could not find property with that name');
            }
            return property;
        }
        catch (err) {
            console.error('Error in getting property info', err);
            throw new Error('Error in getting property info: ' + err.message);
        }
    }),
    getPropertyImgs: (_1, _a, __1) => __awaiter(void 0, [_1, _a, __1], void 0, function* (_, { _id }, __) {
        try {
            yield (0, db_1.connectToDb)();
            if (!_id) {
                console.error("No id parameter present in getPropertyImgs");
                throw new Error('Invalid ID');
            }
            const property = yield models_1.Property.findOne({ _id });
            if (!property) {
                console.error("Could not find property with that name");
                throw new Error('Could not find property with that name');
            }
            const { s3DirectoryPrefix } = property;
            if (!s3DirectoryPrefix) {
                return [];
            }
            const images = yield (0, s3Query_1.getS3ImagesByDirectoryPrefix)(s3DirectoryPrefix);
            return images;
        }
        catch (err) {
            console.error('Error in getting property info', err);
            throw new Error('Error in getting property info: ' + err.message);
        }
    })
};
//# sourceMappingURL=property.js.map