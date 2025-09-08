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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.amenityMutations = void 0;
const db_1 = require("../../../connection/db");
const models_1 = require("../../../models");
const Amenity_1 = __importDefault(require("../../../models/Amenity"));
exports.amenityMutations = {
    createAmenity: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args.input) {
            throw new Error('No input object was presented for creating amenity');
        }
        const { amenityName, amenityType } = args.input;
        if (!amenityName || !amenityType) {
            throw new Error('Amenity name or type is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const amenity = yield Amenity_1.default.create(args.input);
            if (!amenity) {
                throw new Error('Could not create amenity');
            }
            return amenity;
        }
        catch (err) {
            throw new Error('Error in creating amenity: ' + err.message);
        }
    }),
    updateAmenity: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args.input) {
            throw new Error('No input object was presented for updating amenity');
        }
        const { amenityName, amenityType } = args.input;
        const { _id } = args;
        if (!_id) {
            throw new Error('Amenity name is undefined');
        }
        if (!amenityName || !amenityType) {
            throw new Error('Update object is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const amenity = yield Amenity_1.default.findOneAndUpdate({ _id }, { $set: args.input }, { new: true }).populate('amenities');
            if (!amenity) {
                throw new Error('Could not find amenity with that name');
            }
            return amenity;
        }
        catch (err) {
            throw new Error('Error in updating amenity: ' + err.message);
        }
    }),
    removeAmenity: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args._id) {
            throw new Error('No input object was presented for removing amenity');
        }
        const { _id } = args;
        if (!_id) {
            throw new Error('Amenity name is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const properties = yield models_1.Property.find({ amenities: _id });
            if (properties.length > 0) {
                yield models_1.Property.updateMany({ amenities: _id }, { $pull: { amenities: _id } });
            }
            const amenity = yield Amenity_1.default.findOneAndDelete({ _id });
            if (!amenity) {
                throw new Error('Could not find amenity with that name');
            }
            return amenity;
        }
        catch (err) {
            throw new Error('Error in removing amenity: ' + err.message);
        }
    }),
};
//# sourceMappingURL=amenity.js.map