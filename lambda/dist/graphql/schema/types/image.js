"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d832bc2e-813b-5459-bffe-fb371ca42861")}catch(e){}}();

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
//# debugId=d832bc2e-813b-5459-bffe-fb371ca42861
