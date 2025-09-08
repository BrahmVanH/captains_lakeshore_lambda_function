"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageTypes = void 0;
exports.imageTypes = `
    type ImageObject {
        imgKey: String!
        original: String!
        thumbnail: String!
        originalAlt: String!
        thumbnailAlt: String!
    }

    type Image {
        url: String!
        alt: String!
        key: String!
    }

    type DeleteS3ObjectResponse {
        status: Int!
        message: String!
    }



  
`;
//# sourceMappingURL=image.js.map