export const pageInputs = /* GraphQL */ `
    input UpdatePageHeroImgKey {
        slug: String!
        imgKey: String!
    }

    input UpdatePageHeading {
        slug: String!
        heading: String!
    }

    input UpdatePageText {
        slug: String!
        text: String!
    }
    input CreatePageInput {
    slug: String!
    title: String!
    metaDescription: String
    metaKeywords: [String!]
    layoutTemplate: String
    featuredImage: FeaturedImageInput
  }

  input UpdatePageInput {
    slug: String
    title: String
    metaDescription: String
    metaKeywords: [String!]
    layoutTemplate: String
    status: PageStatus
    featuredImage: FeaturedImageInput
  }

  input FeaturedImageInput {
    url: String!
    alt: String
    width: Int
    height: Int
  }

  input AddComponentInput {
    pageId: ID!
    componentTypeId: ID!
    componentData: JSON!
    section: ComponentSection
    sortOrder: Int
  }

  input UpdateComponentInput {
    componentData: JSON
    sortOrder: Int
    section: ComponentSection
    isVisible: Boolean
    customCSS: String
    customClasses: [String!]
  }

  input CreateComponentTypeInput {
    name: String!
    displayName: String!
    description: String
    category: String!
    schema: JSON!
    defaultData: JSON
    icon: String
    previewTemplate: String
  }

  input UpdateComponentTypeInput {
    displayName: String
    description: String
    schema: JSON
    defaultData: JSON
    isActive: Boolean
    icon: String
    previewTemplate: String
  }

  input UpdateMediaInput {
    altText: String
    caption: String
    tags: [String!]
  }
`;