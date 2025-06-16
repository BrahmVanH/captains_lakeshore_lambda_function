"use strict";
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