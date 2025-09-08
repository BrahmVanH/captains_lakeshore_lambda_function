"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="02e863d1-654b-54b2-8e60-47c1377dcbab")}catch(e){}}();

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
exports.spaceQueries = void 0;
const db_1 = require("../../../connection/db");
const Space_1 = __importDefault(require("../../../models/Space"));
exports.spaceQueries = {
    getSpaces: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, db_1.connectToDb)();
            const spaces = yield Space_1.default.find();
            if (!spaces) {
                throw new Error('Error fetching all spaces from database');
            }
            return spaces;
        }
        catch (err) {
            console.error({ message: 'error in finding spaces', details: err });
            throw new Error('Error in finding spaces: ' + err.message);
        }
    })
};
//# sourceMappingURL=space.js.map
//# debugId=02e863d1-654b-54b2-8e60-47c1377dcbab
