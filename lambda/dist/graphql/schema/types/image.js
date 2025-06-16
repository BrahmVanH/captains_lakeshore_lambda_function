"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageTypes = void 0;
exports.imageTypes = `
    type imageObject {
        imgKey: String!
        original: String!
        thumbnail: String!
        originalAlt: String!
        thumbnailAlt: String!
    }

    type Image {
        url: String!
        alt: String!
    }

    type DeleteS3ObjectResponse {
        status: Int!
        message: String!
    }

    type homePgImgPack {
        headerImgUrl: String!
        hideawayImgUrl: String!
        cottageImgUrl: String!
    }

    type hideawayImgPack {
        headerUrl: String!
        galleryArray: [imageObject!]!
    }

    type cottageImgPack {
        headerUrl: String!
        galleryArray: [imageObject!]!
    }
`;
//# sourceMappingURL=image.js.map