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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const server_1 = require("@apollo/server");
const schema_1 = __importDefault(require("./schema"));
const resolvers_1 = __importDefault(require("./resolvers"));
const aws_lambda_1 = require("@as-integrations/aws-lambda");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = new server_1.ApolloServer({
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default,
    introspection: true,
});
const allowedOrigins = ((_a = process.env.ALLOWED_ORIGINS) === null || _a === void 0 ? void 0 : _a.split(',')) || [];
const requestHandler = aws_lambda_1.handlers.createAPIGatewayProxyEventV2RequestHandler();
const corsMiddleware = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const origin = event.headers.origin;
    console.log('origin', origin);
    if (origin && allowedOrigins.includes(origin)) {
        console.log('origin allowed' + origin);
        return (result) => {
            result.headers = Object.assign(Object.assign({}, result.headers), { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' });
            return Promise.resolve();
        };
    }
    else {
        return (result) => {
            result.statusCode = 403;
            result.body = 'Origin not allowed' + origin;
            return Promise.resolve();
        };
    }
});
exports.handler = (0, aws_lambda_1.startServerAndCreateLambdaHandler)(server, aws_lambda_1.handlers.createAPIGatewayProxyEventV2RequestHandler(), {
    middleware: [corsMiddleware],
});
//# sourceMappingURL=server.js.map