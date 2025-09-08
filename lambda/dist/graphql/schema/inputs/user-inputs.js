"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="247d4417-fbdb-5034-b45a-c1e18e47811c")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.userInputs = void 0;
exports.userInputs = `
    input CreateUserInput {
        firstName: String!
        lastName: String!
        username: String!
        userPassword: String!
        adminCode: String!
    }

    input LoginUserInput {
        username: String!
        userPassword: String!
    }

    input RemoveUserInput {
        username: String!
        userPassword: String!
    }
`;
//# sourceMappingURL=user-inputs.js.map
//# debugId=247d4417-fbdb-5034-b45a-c1e18e47811c
