"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = ({ username, _id }) => {
    var _a, _b;
    const expiration = (_a = process.env.AUTH_EXPIRATION) !== null && _a !== void 0 ? _a : '';
    const secret = (_b = process.env.AUTH_SECRET) !== null && _b !== void 0 ? _b : '';
    if (secret === '' || expiration === '') {
        console.error('Error in signToken: secret is not defined');
        return '';
    }
    const payload = { username, _id };
    const token = jsonwebtoken_1.default.sign({ data: payload }, secret, { expiresIn: expiration });
    if (!token || token === '') {
        console.error('Error in signToken: token is not defined');
        return '';
    }
    return token;
};
exports.signToken = signToken;
const authMiddleware = ({ req }) => {
    var _a, _b;
    const expiration = (_a = process.env.AUTH_EXPIRATION) !== null && _a !== void 0 ? _a : '';
    const secret = (_b = process.env.AUTH_SECRET) !== null && _b !== void 0 ? _b : '';
    if (secret === '' || expiration === '') {
        console.error('Error in authMiddleware: secret is not defined');
        return req;
    }
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }
    if (!token) {
        return req;
    }
    const { data } = jsonwebtoken_1.default.verify(token, secret, { maxAge: expiration });
    if (!data) {
        return req;
    }
    req.user = data;
    return req;
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map