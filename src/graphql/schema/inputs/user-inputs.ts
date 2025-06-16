export const userInputs = /* GraphQL */ `
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