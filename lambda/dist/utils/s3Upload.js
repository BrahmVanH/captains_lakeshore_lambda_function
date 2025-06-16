"use strict";
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
exports.deleteS3Objects = exports.getPresignedUrl = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const createPresignedUrlWithClient = ({ region, bucket, key, commandType, altTag }) => {
    var _a, _b, _c;
    const client = new client_s3_1.S3Client({
        region: (_a = process.env.S3_REGION) !== null && _a !== void 0 ? _a : '',
        credentials: {
            accessKeyId: (_b = process.env.S3_ACCESS_KEY) !== null && _b !== void 0 ? _b : '',
            secretAccessKey: (_c = process.env.S3_SECRET_ACCESS_KEY) !== null && _c !== void 0 ? _c : '',
        },
    });
    let command;
    if (commandType === 'put') {
        command = new client_s3_1.PutObjectCommand({ Bucket: bucket, Key: key, ContentType: 'image/jpg', Tagging: `alt=${altTag}` });
        return (0, s3_request_presigner_1.getSignedUrl)(client, command, { expiresIn: 3600, unhoistableHeaders: new Set(['x-amz-tagging']) });
    }
    else if (commandType === 'delete') {
        command = new client_s3_1.DeleteObjectCommand({ Bucket: bucket, Key: key });
        return (0, s3_request_presigner_1.getSignedUrl)(client, command, { expiresIn: 3600 });
    }
    else {
        console.error('Invalid command type');
        throw new Error();
    }
};
const getPresignedUrl = (key, commandType, altTag) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!key) {
        console.error('No key provided');
        throw new Error();
    }
    const REGION = (_a = process.env.S3_REGION) !== null && _a !== void 0 ? _a : '';
    const BUCKET = (_b = process.env.S3_BUCKET_NAME) !== null && _b !== void 0 ? _b : '';
    const KEY = key;
    try {
        const uploadUrl = yield createPresignedUrlWithClient({
            region: REGION,
            bucket: BUCKET,
            key: KEY,
            commandType,
            altTag,
        });
        return uploadUrl;
    }
    catch (err) {
        console.error(err);
    }
});
exports.getPresignedUrl = getPresignedUrl;
const deleteS3Objects = (keys) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const client = new client_s3_1.S3Client({
        region: (_a = process.env.S3_REGION) !== null && _a !== void 0 ? _a : '',
        credentials: {
            accessKeyId: (_b = process.env.S3_ACCESS_KEY) !== null && _b !== void 0 ? _b : '',
            secretAccessKey: (_c = process.env.S3_SECRET_ACCESS_KEY) !== null && _c !== void 0 ? _c : '',
        },
    });
    if (!keys.length) {
        console.error('No keys provided');
        throw new Error('No image keys provided');
    }
    const params = {
        Bucket: (_d = process.env.S3_BUCKET_NAME) !== null && _d !== void 0 ? _d : '',
        Delete: {
            Objects: keys.map((key) => ({ Key: key })),
        },
    };
    const command = new client_s3_1.DeleteObjectsCommand(params);
    try {
        const data = yield client.send(command);
        if (data.$metadata.httpStatusCode === 204 || data.$metadata.httpStatusCode === 200) {
            return {
                status: data.$metadata.httpStatusCode,
                message: 'Successfully deleted image(s)',
            };
        }
        console.error('Failed to delete object', data);
        return {
            status: 400,
            message: 'Failed to delete image(s)',
        };
    }
    catch (err) {
        console.error(err);
    }
});
exports.deleteS3Objects = deleteS3Objects;
//# sourceMappingURL=s3Upload.js.map