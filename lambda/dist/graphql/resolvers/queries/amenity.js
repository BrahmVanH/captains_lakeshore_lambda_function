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
exports.amenityQueries = void 0;
const db_1 = require("../../../connection/db");
const Amenity_1 = __importDefault(require("../../../models/Amenity"));
exports.amenityQueries = {
    getAmenities: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, db_1.connectToDb)();
            const amenities = yield Amenity_1.default.find();
            if (!amenities) {
                throw new Error('Error fetching all amenities from database');
            }
            return amenities;
        }
        catch (err) {
            console.error({ message: 'error in finding amenities', details: err });
            throw new Error('Error in finding amenities: ' + err.message);
        }
    }),
};
//# sourceMappingURL=amenity.js.map