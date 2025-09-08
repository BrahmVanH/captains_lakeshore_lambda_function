"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="511ab768-cbef-50fe-b04c-6e7aa9afb4b4")}catch(e){}}();

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getS3ImagesByDirectoryPrefix = exports.getImgTag = exports.handleSignUrl = void 0;
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const client_s3_1 = require("@aws-sdk/client-s3");
const findImgIndex = (data, imgKey) => {
    if (!data.Contents || !imgKey) {
        return 0;
    }
    const foundIndex = data.Contents.map((image, index) => (image.Key === imgKey ? index : -1)).filter((index) => index !== -1)[0];
    if (!foundIndex) {
        return 0;
    }
    return foundIndex;
};
const handleSignUrl = (imageItem) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const bucketName = process.env.S3_BUCKET_NAME;
    const s3 = new client_s3_1.S3Client({
        region: (_a = process.env.S3_REGION) !== null && _a !== void 0 ? _a : '',
        credentials: {
            accessKeyId: (_b = process.env.S3_ACCESS_KEY) !== null && _b !== void 0 ? _b : '',
            secretAccessKey: (_c = process.env.S3_SECRET_ACCESS_KEY) !== null && _c !== void 0 ? _c : '',
        },
    });
    try {
        if (!imageItem || !bucketName) {
            return '';
        }
        if (typeof imageItem === 'object') {
            return yield (0, s3_request_presigner_1.getSignedUrl)(s3, new client_s3_1.GetObjectCommand({
                Bucket: bucketName,
                Key: imageItem === null || imageItem === void 0 ? void 0 : imageItem.Key,
            }), {
                expiresIn: 60,
            });
        }
        return yield (0, s3_request_presigner_1.getSignedUrl)(s3, new client_s3_1.GetObjectCommand({
            Bucket: bucketName,
            Key: imageItem,
        }), {
            expiresIn: 60,
        });
    }
    catch (err) {
        console.error('there was an error in signing the url', err);
        return '';
    }
});
exports.handleSignUrl = handleSignUrl;
const getImgTag = (imageItem) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const bucketName = process.env.S3_BUCKET_NAME;
    const s3 = new client_s3_1.S3Client({
        region: (_a = process.env.S3_REGION) !== null && _a !== void 0 ? _a : '',
        credentials: {
            accessKeyId: (_b = process.env.S3_ACCESS_KEY) !== null && _b !== void 0 ? _b : '',
            secretAccessKey: (_c = process.env.S3_SECRET_ACCESS_KEY) !== null && _c !== void 0 ? _c : '',
        },
    });
    if (!imageItem) {
        console.error('Error in retrieving image tags');
        throw new Error('Error in retrieving image tags');
    }
    let command;
    if (typeof imageItem === 'object') {
        command = new client_s3_1.GetObjectTaggingCommand({
            Bucket: bucketName,
            Key: imageItem === null || imageItem === void 0 ? void 0 : imageItem.Key,
        });
    }
    else {
        command = new client_s3_1.GetObjectTaggingCommand({
            Bucket: bucketName,
            Key: imageItem,
        });
    }
    try {
        const response = yield s3.send(command);
        if (!(response === null || response === void 0 ? void 0 : response.TagSet)) {
            console.error('Error in retrieving image tags');
            throw new Error('Error in retrieving image tags');
        }
        return (_d = response.TagSet[0]) === null || _d === void 0 ? void 0 : _d.Value;
    }
    catch (err) {
        console.error('there was an error in retrieving image tags', err);
        return "";
    }
});
exports.getImgTag = getImgTag;
const getS3ImagesByDirectoryPrefix = (directoryPrefix) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const Bucket = (_a = process.env.S3_BUCKET_NAME) !== null && _a !== void 0 ? _a : '';
    const Prefix = directoryPrefix + '/';
    const listObjectsCommandParams = {
        Bucket,
        Prefix
    };
    const s3 = new client_s3_1.S3Client({
        region: (_b = process.env.S3_REGION) !== null && _b !== void 0 ? _b : '',
        credentials: {
            accessKeyId: (_c = process.env.S3_ACCESS_KEY) !== null && _c !== void 0 ? _c : '',
            secretAccessKey: (_d = process.env.S3_SECRET_ACCESS_KEY) !== null && _d !== void 0 ? _d : '',
        },
    });
    try {
        const data = yield s3.send(new client_s3_1.ListObjectsV2Command(listObjectsCommandParams));
        const s3Objects = data === null || data === void 0 ? void 0 : data.Contents;
        if (!s3Objects) {
            console.error('Error in querying s3 for image objects');
            throw new Error('Error in querying s3 for image objects');
        }
        const images = yield Promise.all(s3Objects
            .filter((s3Object) => s3Object.Key !== Prefix) // Remove root object from s3 bucket directory list
            .filter((obj) => !!obj.Key).map((obj) => __awaiter(void 0, void 0, void 0, function* () {
            const alt = yield (0, exports.getImgTag)(obj);
            const url = yield (0, exports.handleSignUrl)(obj);
            if (!alt) {
                console.error("Error in getting image alt tag");
            }
            if (!url) {
                console.error("Error in getting signed image url");
                throw new Error("Could not sign image url");
            }
            return {
                url,
                alt: alt !== null && alt !== void 0 ? alt : "",
                key: obj.Key
            };
        })));
        return images;
    }
    catch (err) {
        console.error('Error in querying s3 for property images', err);
        throw new Error('Error in querying s3 for property images');
    }
});
exports.getS3ImagesByDirectoryPrefix = getS3ImagesByDirectoryPrefix;
//# sourceMappingURL=s3Query.js.map
//# debugId=511ab768-cbef-50fe-b04c-6e7aa9afb4b4
