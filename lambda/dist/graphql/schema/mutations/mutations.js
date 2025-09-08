"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="32934e2b-b80e-5293-9e77-b061943ca804")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `
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
        UpdatePropertyS3DirectoryPrefix(input: UpdatePropertyS3DirectoryPrefixInput!): Property!
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
            # Pages
        createPage(input: CreatePageInput!): Page!
        updatePage(id: ID!, input: UpdatePageInput!): Page!
        deletePage(id: ID!): Boolean!
        publishPage(id: ID!): Page!

        # Components
        # addComponentToPage(input: AddComponentInput!): PageComponent!
        # updateComponent(id: ID!, input: UpdateComponentInput!): PageComponent!
        # deleteComponent(id: ID!): Boolean!
        # reorderComponents(pageId: ID!, componentIds: [ID!]!): [PageComponent!]!

        # # Component Types
        # createComponentType(input: CreateComponentTypeInput!): ComponentType!
        # updateComponentType(id: ID!, input: UpdateComponentTypeInput!): ComponentType!

        # # Media
        # uploadMedia(file: Upload!): MediaAsset!
        # updateMediaAsset(id: ID!, input: UpdateMediaInput!): MediaAsset!
        # deleteMediaAsset(id: ID!): Boolean!
    }
`;
//# sourceMappingURL=mutations.js.map
//# debugId=32934e2b-b80e-5293-9e77-b061943ca804
