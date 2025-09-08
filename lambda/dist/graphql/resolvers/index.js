"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e0ea12ae-2d7e-539c-ac90-299469ace607")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
const queries_1 = require("./queries");
const mutations_1 = require("./mutations");
const resolvers = {
    Query: queries_1.queries,
    Mutation: mutations_1.mutations
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map
//# debugId=e0ea12ae-2d7e-539c-ac90-299469ace607
