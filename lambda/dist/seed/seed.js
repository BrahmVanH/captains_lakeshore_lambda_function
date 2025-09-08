"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="bf4c2989-be85-5a7a-aca8-793220be43d4")}catch(e){}}();

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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const dotenv_1 = __importDefault(require("dotenv"));
// const propertiesData = require('./properties.json');
const properties_json_1 = __importDefault(require("./properties.json"));
dotenv_1.default.config();
// Connect to MongoDB
const uri = (_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : '';
mongoose_1.default.connect(uri);
// Define the seed function
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Load the JSON file
            // Create Property objects from the JSON data
            const properties = properties_json_1.default.map((propertyData) => new models_1.Property(propertyData));
            // Save the Property objects to the database
            yield models_1.Property.create(properties);
            console.log('Seed data inserted successfully!');
        }
        catch (error) {
            console.error('Error seeding data:', error);
        }
        finally {
            // Disconnect from MongoDB
            mongoose_1.default.disconnect();
        }
    });
}
// Call the seed function
seed();
//# sourceMappingURL=seed.js.map
//# debugId=bf4c2989-be85-5a7a-aca8-793220be43d4
