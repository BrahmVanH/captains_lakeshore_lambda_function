"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const queries_1 = require("./queries");
const mutations_1 = require("./mutations");
const resolvers = {
    Query: queries_1.queries,
    Mutation: mutations_1.mutations
};
exports.default = resolvers;
//# sourceMappingURL=index.js.map