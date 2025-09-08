"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ca152487-2163-5346-9316-3a9d54bd1ca1")}catch(e){}}();

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
exports.connectToDb = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const connectToDb = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    dotenv_1.default.config({ quiet: true });
    const MONGODB_URI = (_a = process.env.MONGODB_URI) !== null && _a !== void 0 ? _a : '';
    try {
        (0, mongoose_1.set)('strictQuery', true);
        yield (0, mongoose_1.connect)(MONGODB_URI);
    }
    catch (error) {
        console.error('Error connecting to MongoDB', error);
        throw new Error('Error connecting to MongoDB');
    }
});
exports.connectToDb = connectToDb;
//# sourceMappingURL=db.js.map
//# debugId=ca152487-2163-5346-9316-3a9d54bd1ca1
