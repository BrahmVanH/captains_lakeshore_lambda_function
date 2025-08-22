"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageTypes = void 0;
exports.pageTypes = `

    scalar JSON
  scalar DateTime

  enum PageStatus {
    DRAFT
    PUBLISHED
    ARCHIVED
  }

  enum ComponentSection {
    HEADER
    HERO
    MAIN
    SIDEBAR
    FOOTER
  }

  type FeaturedImage {
    url: String
    alt: String
    width: Int
    height: Int
  }

  type Page {
    id: ID!
    slug: String!
    title: String!
    metaDescription: String
    metaKeywords: [String!]
    layoutTemplate: String!
    status: PageStatus!
    featuredImage: FeaturedImage
    publishedAt: DateTime
    components: [PageComponent!]!
    url: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type ComponentType {
    id: ID!
    name: String!
    displayName: String!
    description: String
    category: String!
    schema: JSON!
    defaultData: JSON
    isActive: Boolean!
    icon: String
    previewTemplate: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type PageComponent {
    id: ID!
    page: Page!
    componentType: ComponentType!
    componentData: JSON!
    sortOrder: Int!
    section: ComponentSection!
    isVisible: Boolean!
    customCSS: String
    customClasses: [String!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type MediaAsset {
    id: ID!
    filename: String!
    originalName: String!
    mimeType: String!
    size: Int!
    url: String!
    thumbnailUrl: String
    dimensions: JSON
    altText: String
    caption: String
    tags: [String!]
    usedIn: [JSON!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
//# sourceMappingURL=page.js.map