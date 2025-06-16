export const userTypes = /* GraphQL */ `
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