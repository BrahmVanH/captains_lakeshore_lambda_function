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
exports.propertyMutations = void 0;
const db_1 = require("../../../connection/db");
const models_1 = require("../../../models");
exports.propertyMutations = {
    createProperty: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args.input) {
            throw new Error('No input object was presented for creating property');
        }
        const { propertyName } = args.input;
        if (!propertyName) {
            throw new Error('Property name is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const property = yield models_1.Property.create(args.input);
            if (!property) {
                throw new Error('Could not create property');
            }
            return property;
        }
        catch (err) {
            throw new Error('Error in creating property: ' + err.message);
        }
    }),
    updatePropertyAmenities: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args.input) {
            throw new Error('No input object was presented for updating property');
        }
        const { _id, amenities } = args.input;
        if (!_id) {
            throw new Error('Property name is undefined');
        }
        if (!amenities) {
            throw new Error('Update object is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const property = yield models_1.Property.findOneAndUpdate({ _id }, { $set: { amenities } }, { new: true }).populate('amenities');
            if (!property) {
                throw new Error('Could not find property with that name');
            }
            return property;
        }
        catch (err) {
            throw new Error('Error in updating property: ' + err.message);
        }
    }),
    updatePropertyDescription: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args.input) {
            throw new Error('No input object was presented for updating property');
        }
        const { _id, propertyDescription } = args.input;
        if (!_id) {
            throw new Error('Property name is undefined');
        }
        if (!propertyDescription) {
            throw new Error('Update object is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const property = yield models_1.Property.findOneAndUpdate({ _id }, { $set: { propertyDescription } });
            if (!property) {
                throw new Error('Could not find property with that name');
            }
            return property;
        }
        catch (err) {
            throw new Error('Error in updating property: ' + err.message);
        }
    }),
    updatePropertyHeaderImg: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args.input) {
            throw new Error('No input object was presented for updating property');
        }
        const { _id, headerImgKey } = args.input;
        if (!_id) {
            throw new Error('Property name is undefined');
        }
        if (!headerImgKey) {
            throw new Error('Update object is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const property = yield models_1.Property.findOneAndUpdate({ _id }, { $set: { headerImgKey } });
            if (!property) {
                throw new Error('Could not find property with that name');
            }
            return property;
        }
        catch (err) {
            throw new Error('Error in updating property: ' + err.message);
        }
    }),
    updatePropertyOverviewItems: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args.input) {
            throw new Error('No input object was presented for updating property');
        }
        const { _id, overviewItems } = args.input;
        if (!_id) {
            throw new Error('Property name is undefined');
        }
        if (!overviewItems) {
            throw new Error('Update object is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const property = yield models_1.Property.findOneAndUpdate({ _id }, { $set: { overviewItems: overviewItems } }, { new: true });
            if (!property) {
                throw new Error('Could not find property with that name');
            }
            return property;
        }
        catch (err) {
            throw new Error('Error in updating property: ' + err.message);
        }
    }),
    updatePropertyRoomsAndBeds: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args.input) {
            throw new Error('No input object was presented for updating property');
        }
        const { _id, roomsAndBeds } = args.input;
        if (!_id) {
            throw new Error('Property name is undefined');
        }
        if (!roomsAndBeds) {
            throw new Error('Update object is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const property = yield models_1.Property.findOneAndUpdate({ _id }, { $set: { roomsAndBeds } }, { new: true });
            if (!property) {
                throw new Error('Could not find property with that name');
            }
            return property;
        }
        catch (err) {
            throw new Error('Error in updating property: ' + err.message);
        }
    }),
    updatePropertyName: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args.input) {
            throw new Error('No input object was presented for updating property');
        }
        const { _id, propertyName } = args.input;
        if (!_id) {
            throw new Error('Property name is undefined');
        }
        if (!propertyName) {
            throw new Error('Update object is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const property = yield models_1.Property.findOneAndUpdate({ _id }, { $set: { propertyName } }, { new: true });
            if (!property) {
                throw new Error('Could not find property with that name');
            }
            return property;
        }
        catch (err) {
            throw new Error('Error in updating property: ' + err.message);
        }
    }),
    updatePropertyHouseRules: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args.input) {
            throw new Error('No input object was presented for updating property');
        }
        const { _id, houseRules } = args.input;
        if (!_id) {
            throw new Error('Property name is undefined');
        }
        if (!houseRules) {
            throw new Error('Update object is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const property = yield models_1.Property.findOneAndUpdate({ _id }, { $set: { houseRules } }, { new: true });
            if (!property) {
                throw new Error('Could not find property with that name');
            }
            return property;
        }
        catch (err) {
            throw new Error('Error in updating property: ' + err.message);
        }
    }),
    updatePropertyImportantInfo: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args.input) {
            throw new Error('No input object was presented for updating property');
        }
        const { _id, importantInfo } = args.input;
        if (!_id) {
            throw new Error('Property name is undefined');
        }
        if (!importantInfo) {
            throw new Error('Update object is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const property = yield models_1.Property.findOneAndUpdate({ _id }, { $set: { importantInfo } }, { new: true });
            if (!property) {
                throw new Error('Could not find property with that name');
            }
            return property;
        }
        catch (err) {
            throw new Error('Error in updating property: ' + err.message);
        }
    }),
    updatePropertySpaces: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args.input) {
            throw new Error('No input object was presented for updating property');
        }
        const { _id, spacesItems } = args.input;
        if (!_id) {
            throw new Error('Property name is undefined');
        }
        if (!spacesItems) {
            throw new Error('Update object is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const property = yield models_1.Property.findOneAndUpdate({ _id }, { $set: { spacesItems } }, { new: true }).populate('spacesItems');
            if (!property) {
                throw new Error('Could not find property with that name');
            }
            return property;
        }
        catch (err) {
            throw new Error('Error in updating property: ' + err.message);
        }
    }),
    removeProperty: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args._id) {
            throw new Error('No input object was presented for removing property');
        }
        const { _id } = args;
        if (!_id) {
            throw new Error('Property name is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const property = yield models_1.Property.findOneAndDelete({ _id });
            if (!property) {
                throw new Error('Could not find property with that name');
            }
            return property;
        }
        catch (err) {
            throw new Error('Error in removing property: ' + err.message);
        }
    }),
    updatePropertyInfo: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args.input) {
            throw new Error('No input object was presented for updating property info');
        }
        const { _id, update } = args.input;
        if (!_id) {
            throw new Error('Property name is undefined');
        }
        if (!(update === null || update === void 0 ? void 0 : update.propertyDescription) || !(update === null || update === void 0 ? void 0 : update.amenities) || !(update === null || update === void 0 ? void 0 : update.headerImgKey)) {
            throw new Error('Update object is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const property = yield models_1.Property.findOneAndUpdate({ _id }, { $set: update }, { new: true });
            if (!property) {
                throw new Error('Could not find property with that name');
            }
            return property;
        }
        catch (err) {
            throw new Error('Error in updating property info: ' + err.message);
        }
    }),
};
//# sourceMappingURL=property.js.map