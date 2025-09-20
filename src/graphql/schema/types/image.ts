export const imageTypes = /* GraphQL */ `
    type ImageObject {
        imgKey: String!
        original: String!
        thumbnail: String!
        originalAlt: String!
        thumbnailAlt: String!
    }

    type Image {
        alt: String!
        key: String!
    }


    type DeleteS3ObjectResponse {
        status: Int!
        message: String!
    }



  
`;