"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="14716caa-1fdc-58d6-b091-0c66fd5880be")}catch(e){}}();

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
//# debugId=14716caa-1fdc-58d6-b091-0c66fd5880be
