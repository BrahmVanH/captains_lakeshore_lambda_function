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
exports.getPresignedUrl = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const createPresignedUrlWithClient = ({ region, bucket, key }) => {
    const client = new client_s3_1.S3Client({ region });
    const command = new client_s3_1.PutObjectCommand({ Bucket: bucket, Key: key });
    return (0, s3_request_presigner_1.getSignedUrl)(client, command, { expiresIn: 3600 });
};
const getPresignedUrl = (key) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!key) {
        console.error('No key provided');
        throw new Error();
        return;
    }
    const REGION = (_a = process.env.S3_REGION) !== null && _a !== void 0 ? _a : '';
    const BUCKET = (_b = process.env.S3_BUCKET_NAME) !== null && _b !== void 0 ? _b : '';
    const KEY = key;
    try {
        const clientUrl = yield createPresignedUrlWithClient({
            region: REGION,
            bucket: BUCKET,
            key: KEY,
        });
        return clientUrl;
    }
    catch (err) {
        console.error(err);
    }
});
exports.getPresignedUrl = getPresignedUrl;
//# sourceMappingURL=s3Upload.js.map