export const queries = /* GraphQL */ `
    type Query {
        getAllUsers: [User!]
        queryBookingsByProperty(propertyId: ID!): [Booking!]
        getHomePgImgs: homePgImgPack!
        getHideawayImgs: hideawayImgPack!
        getCottageImgs: cottageImgPack!
        getAboutPgImg: String!
        getImg(imgKey: String!): Image!
        getImgs(imgKeys: [String!]!): [Image!]!
        getPropertyInfo(_id: ID!): Property!
        getProperties: [Property!]!
        getPropertiesLite: [PropertyLite]
        getPropertyById(_id: ID!): Property!
        getAmenities: [Amenity!]!
        getSpaces: [Space!]!
        getPageBySlug(slug: String!): Page!
    }
`;