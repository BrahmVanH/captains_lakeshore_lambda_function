"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="abab4be9-d0ee-5b93-895e-563cde6c0a69")}catch(e){}}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = `
    type Query {
        getAllUsers: [User!]
        queryBookingsByProperty(propertyId: ID!): [Booking!]
        getPropertyImgs(_id: ID!): [Image]!
        getImg(imgKey: String!): Image!
        getImgs(imgKeys: [String!]!): [Image!]!
        getPropertyInfo(_id: ID!): Property!
        getProperties: [Property!]!
        getPropertiesLite: [PropertyLite]
        getPropertyById(_id: ID!): Property!
        getAmenities: [Amenity!]!
        getSpaces: [Space!]!
        getPageBySlug(slug: String!): Page!

      # Pages
      pages(status: PageStatus, limit: Int, offset: Int): [Page!]!
    page(id: ID, slug: String): Page

    # Component Types
    componentTypes(isActive: Boolean): [ComponentType!]!
    componentType(id: ID!): ComponentType

    # Components
    pageComponents(pageId: ID!, section: ComponentSection): [PageComponent!]!

    # Media
    mediaAssets(tags: [String!], limit: Int, offset: Int): [MediaAsset!]!
    mediaAsset(id: ID!): MediaAsset
    }
`;
//# sourceMappingURL=queries.js.map
//# debugId=abab4be9-d0ee-5b93-895e-563cde6c0a69
