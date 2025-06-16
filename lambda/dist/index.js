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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const schema_1 = __importDefault(require("./graphql/schema/"));
const resolvers_1 = __importDefault(require("./graphql/resolvers/"));
const server_1 = require("@apollo/server");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express4_1 = require("@apollo/server/express4");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 4000;
const server = new server_1.ApolloServer({
    typeDefs: schema_1.default,
    resolvers: resolvers_1.default,
    introspection: true,
    plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
});
const allowedOrigins = ((_b = process.env.ALLOWED_ORIGINS) === null || _b === void 0 ? void 0 : _b.split(',')) || [];
const startApolloServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server.start();
        app.use('/graphql', (0, cors_1.default)({ origin: '*' }), express_1.default.json(), (0, express4_1.expressMiddleware)(server));
        app.use((req, res, next) => {
            var _a;
            if (!allowedOrigins.includes((_a = req.headers.origin) !== null && _a !== void 0 ? _a : '')) {
                console.log('Origin not allowed:', req.headers.origin);
            }
            next();
        });
    }
    catch (err) {
        console.error('Error starting server', err);
    }
});
const startHttpServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
        console.log(`🚀 Server ready at http://localhost:4000/graphql`);
    }
    catch (err) {
        console.error('Error starting server', err);
    }
});
startApolloServer()
    .then(() => {
    startHttpServer();
})
    .catch((err) => {
    console.error('Error starting server', err);
});
//# sourceMappingURL=index.js.map