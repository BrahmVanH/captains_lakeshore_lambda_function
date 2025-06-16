"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTypes = void 0;
exports.userTypes = `
    type User {
        _id: ID
        firstName: String!
        lastName: String!
        username: String!
        password: String
    }

    type Auth {
        token: ID!
        user: User!
    }
`;
//# sourceMappingURL=user.js.map