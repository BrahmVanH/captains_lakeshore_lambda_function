"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="51e89957-836f-5d1d-ae9a-c8daa40c281b")}catch(e){}}();

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
exports.userQueries = void 0;
const models_1 = require("../../../models");
const db_1 = require("../../../connection/db");
exports.userQueries = {
    getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, db_1.connectToDb)();
            const allUsers = yield models_1.User.find();
            if (!allUsers) {
                throw new Error('Error fetching all users from database');
            }
            return allUsers;
        }
        catch (err) {
            console.error({ message: 'error in finding user', details: err });
            throw new Error('Error in finding users: ' + err.message);
        }
    })
};
//# sourceMappingURL=user.js.map
//# debugId=51e89957-836f-5d1d-ae9a-c8daa40c281b
