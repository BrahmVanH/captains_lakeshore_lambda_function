export const mutations = /* GraphQL */ `
    type Mutation {
        createUser(input: CreateUserInput!): Auth!
        loginUser(input: LoginUserInput!): Auth!
        removeUser(input: RemoveUserInput!): Auth!
        createBooking(input: CreateBookingInput!): [Booking]!
        removeBooking(input: RemoveBookingInput!): RemoveBookingResponse!
        updatePropertyInfo(input: UpdatePropertyInput!): Property!
        updatePropertyName(input: UpdatePropertyNameInput!): Property!
        updatePropertyAmenities(input: UpdatePropertyAmenitiesInput!): Property!
        updatePropertyOverviewItems(input: UpdatePropertyOverviewItemsInput!): Property!
        updatePropertyDescription(input: UpdatePropertyDescriptionInput!): Property!
        updatePropertyRoomsAndBeds(input: UpdatePropertyRoomsAndBedsInput!): Property!
        updatePropertySpaces(input: UpdatePropertySpacesInput!): Property!
        updatePropertyImportantInfo(input: UpdatePropertyImportantInfoInput!): Property!
        updatePropertyHouseRules(input: UpdatePropertyHouseRulesInput!): Property!
        updatePropertyHeaderImg(input: UpdatePropertyHeaderImgInput!): Property!
        deleteS3Objects(input: DeleteS3ObjectInput!): DeleteS3ObjectResponse!
        removeProperty(_id: ID!): Property!
        createProperty(input: CreatePropertyInput!): Property!
        createAmenity(input: AmenityInput!): Amenity!
        updateAmenity(_id: ID!, input: AmenityInput!): Amenity!
        removeAmenity(_id: ID!): Amenity!
        createSpace(input: SpaceInput!): Space!
        updateSpace(_id: ID!, input: SpaceInput!): Space!
        removeSpace(_id: ID!): Space!
        createSeedAmenities: [Amenity!]!
        createSeedSpaces: [Space!]!
        UpdatePageHeroImgKey(slug: String!, imgKey: String!): Page!
        UpdatePageHeading(slug: String!, heading: String!): Page!
        UpdatePageText(slug: String!, text: String!): Page!
    }
`;