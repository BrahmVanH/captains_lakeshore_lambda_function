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
exports.userMutations = void 0;
const db_1 = require("../../../connection/db");
const models_1 = require("../../../models");
const auth_1 = require("../../../utils/auth");
exports.userMutations = {
    createUser: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        const { firstName, lastName, username, userPassword, adminCode } = args.input;
        if (!firstName || !lastName || !username || !userPassword || !adminCode) {
            throw new Error('All fields must be filled to create a user.');
        }
        else if (adminCode !== process.env.ADMIN_CODE) {
            throw new Error('Incorrect admin code');
        }
        try {
            yield (0, db_1.connectToDb)();
            const user = yield models_1.User.create({
                firstName,
                lastName,
                username,
                password: userPassword,
            });
            if (!user) {
                throw new Error('There was an error creating user. Try again.');
            }
            const token = (0, auth_1.signToken)(user);
            return { token, user };
        }
        catch (err) {
            throw new Error('Error in creating user: ' + err.message);
        }
    }),
    loginUser: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, userPassword } = args.input;
            yield (0, db_1.connectToDb)();
            if (!username || !userPassword) {
                throw new Error('username and password fields must be filled to log in');
            }
            const user = yield models_1.User.findOne({ username });
            if (!(user === null || user === void 0 ? void 0 : user.comparePassword)) {
                throw new Error("Can't find user with that username");
            }
            const isPasswordValid = yield user.comparePassword(userPassword);
            if (!isPasswordValid) {
                throw new Error('Incorrect Password!');
            }
            const token = (0, auth_1.signToken)(user);
            return { token, user };
        }
        catch (err) {
            throw new Error('Error in logging in user: ' + err.message);
        }
    }),
    removeUser: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { username, userPassword } = args.input;
            yield (0, db_1.connectToDb)();
            if (!username) {
                throw new Error('username  fields must be filled to remove');
            }
            const user = yield models_1.User.findOne({ username });
            if (!(user === null || user === void 0 ? void 0 : user.comparePassword)) {
                throw new Error("Can't find user with that username");
            }
            const isPasswordValid = yield user.comparePassword(userPassword);
            if (!isPasswordValid) {
                throw new Error('Incorrect Password!');
            }
            const deletedUser = yield models_1.User.findOneAndDelete({ username });
            if (!deletedUser) {
                throw new Error('Could not delete user');
            }
            return { token: '', user: deletedUser };
        }
        catch (err) {
            throw new Error('Error in removing in user: ' + err.message);
        }
    }),
};
//# sourceMappingURL=user.js.map