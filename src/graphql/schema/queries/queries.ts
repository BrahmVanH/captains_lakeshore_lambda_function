export const queries = /* GraphQL */ `
    type Query {
        getAllUsers: [User!]
        queryBookingsByProperty(propertyId: ID!): [Booking!]
        getHomePgImgs: homePgImgPack!
        getHideawayImgs: hideawayImgPack!
        getCottageImgs: cottageImgPack!
        getPropertyImgs(_id: ID!): [ImageObject]!
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