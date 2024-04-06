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
exports.getS3AboutPgImgs = exports.getS3CottagePgImgs = exports.getS3HideawayPgImgs = exports.getS3HomePageImgs = void 0;
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const client_s3_1 = require("@aws-sdk/client-s3");
const helpers_1 = require("./helpers");
// const bucketName = process.env.S3_BUCKET_NAME ?? '';
// const homeHeaderImgKey = process.env.HOME_HEADER_IMG_KEY ?? '';
// const homePgHideawayImgKey = process.env.HIDEAWAY_HOMEPAGE_IMG_KEY ?? '';
// const homePgCottageImgKey = process.env.COTTAGE_HOMEPAGE_IMG_KEY ?? '';
// const aboutImgKey = process.env.ABOUT_IMG_KEY ?? '';
// const homePageParams = {
// 	Bucket: bucketName,
// 	Prefix: 'home_page/',
// };
// const hideawayHeaderImgKey = process.env.HIDEAWAY_HEADER_IMG_KEY ?? '';
// const hideawayParams = {
// 	Bucket: bucketName,
// 	Prefix: 'captains_hideaway_png/',
// };
// const cottageHeaderImgKey = process.env.COTTAGE_HEADER_IMG_KEY ?? '';
// const cottageParams = {
// 	Bucket: bucketName,
// 	Prefix: 'captains_cottage_png/',
// };
// JS SDK v3 does not support global configuration.
// Codemod has attempted to pass values to each service client in this file.
// You may need to update clients outside of this file, if they use global config.
// AWS.config.update({
// 	accessKeyId: process.env.S3_ACCESS_KEY,
// 	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
// 	region: process.env.S3_REGION,
// });
// const s3 = new S3({
// 	region: process.env.S3_REGION,
// });
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
const handleSignUrl = (imageBucket, imageItem) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const s3 = new client_s3_1.S3Client({
        region: (_a = process.env.S3_REGION) !== null && _a !== void 0 ? _a : '',
        credentials: {
            accessKeyId: (_b = process.env.S3_ACCESS_KEY) !== null && _b !== void 0 ? _b : '',
            secretAccessKey: (_c = process.env.S3_SECRET_ACCESS_KEY) !== null && _c !== void 0 ? _c : '',
        },
    });
    try {
        if (!imageItem || !imageBucket) {
            return '';
        }
        if (typeof imageItem === 'object') {
            return yield (0, s3_request_presigner_1.getSignedUrl)(s3, new client_s3_1.GetObjectCommand({
                Bucket: imageBucket,
                Key: imageItem === null || imageItem === void 0 ? void 0 : imageItem.Key,
            }), {
                expiresIn: 60,
            });
        }
        return yield (0, s3_request_presigner_1.getSignedUrl)(s3, new client_s3_1.GetObjectCommand({
            Bucket: imageBucket,
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
const getImgTag = (imageBucket, imageItem) => __awaiter(void 0, void 0, void 0, function* () {
    var _d, _e, _f, _g;
    const s3 = new client_s3_1.S3Client({
        region: (_d = process.env.S3_REGION) !== null && _d !== void 0 ? _d : '',
        credentials: {
            accessKeyId: (_e = process.env.S3_ACCESS_KEY) !== null && _e !== void 0 ? _e : '',
            secretAccessKey: (_f = process.env.S3_SECRET_ACCESS_KEY) !== null && _f !== void 0 ? _f : '',
        },
    });
    if (!imageItem) {
        console.error('Error in retrieving image tags');
        throw new Error('Error in retrieving image tags');
    }
    const altTag = new client_s3_1.GetObjectTaggingCommand({
        Bucket: imageBucket,
        Key: imageItem === null || imageItem === void 0 ? void 0 : imageItem.Key,
    });
    try {
        const response = yield s3.send(altTag);
        if (!(response === null || response === void 0 ? void 0 : response.TagSet)) {
            console.error('Error in retrieving image tags');
            throw new Error('Error in retrieving image tags');
        }
        return (_g = response.TagSet[0]) === null || _g === void 0 ? void 0 : _g.Value;
    }
    catch (err) {
        console.error('there was an error in retrieving image tags', err);
    }
});
const getS3HomePageImgs = () => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j, _k, _l, _m, _o, _p;
    const bucketName = (_h = process.env.S3_BUCKET_NAME) !== null && _h !== void 0 ? _h : '';
    const homeHeaderImgKey = (_j = process.env.HOME_HEADER_IMG_KEY) !== null && _j !== void 0 ? _j : '';
    const homePgHideawayImgKey = (_k = process.env.HIDEAWAY_HOMEPAGE_IMG_KEY) !== null && _k !== void 0 ? _k : '';
    const homePgCottageImgKey = (_l = process.env.COTTAGE_HOMEPAGE_IMG_KEY) !== null && _l !== void 0 ? _l : '';
    const homePageParams = {
        Bucket: bucketName,
        Prefix: 'home_page/',
    };
    const s3 = new client_s3_1.S3Client({
        region: (_m = process.env.S3_REGION) !== null && _m !== void 0 ? _m : '',
        credentials: {
            accessKeyId: (_o = process.env.S3_ACCESS_KEY) !== null && _o !== void 0 ? _o : '',
            secretAccessKey: (_p = process.env.S3_SECRET_ACCESS_KEY) !== null && _p !== void 0 ? _p : '',
        },
    });
    if (bucketName === '' || homeHeaderImgKey === '' || homePgHideawayImgKey === '' || homePgCottageImgKey === '') {
        console.error('Error in querying s3 for homepage images');
        throw new Error('Error in querying s3 for homepage images');
    }
    try {
        const data = yield s3.send(new client_s3_1.ListObjectsV2Command(homePageParams));
        const s3Objects = data === null || data === void 0 ? void 0 : data.Contents;
        if (!(data === null || data === void 0 ? void 0 : data.Contents)) {
            console.error('Error in querying s3 for homepage images');
            throw new Error('Error in querying s3 for homepage images');
        }
        const headerImgIndex = findImgIndex(data, homeHeaderImgKey);
        const headerImgUrl = yield handleSignUrl(homePageParams.Bucket, s3Objects[headerImgIndex]);
        const hideawayImgIndex = findImgIndex(data, homePgHideawayImgKey);
        const hideawayImgUrl = yield handleSignUrl(homePageParams.Bucket, s3Objects[hideawayImgIndex]);
        const cottageImgIndex = findImgIndex(data, homePgCottageImgKey);
        const cottageImgUrl = yield handleSignUrl(homePageParams.Bucket, s3Objects[cottageImgIndex]);
        return { headerImgUrl, hideawayImgUrl, cottageImgUrl };
    }
    catch (err) {
        return [{ message: 'Error in querying s3 for homepage images', details: err.message }];
    }
});
exports.getS3HomePageImgs = getS3HomePageImgs;
const getS3HideawayPgImgs = () => __awaiter(void 0, void 0, void 0, function* () {
    var _q, _r, _s, _t, _u;
    const bucket = (_q = process.env.S3_BUCKET_NAME) !== null && _q !== void 0 ? _q : '';
    const hideawayHeaderImgKey = (_r = process.env.HIDEAWAY_HEADER_IMG_KEY) !== null && _r !== void 0 ? _r : '';
    const s3 = new client_s3_1.S3Client({
        region: (_s = process.env.S3_REGION) !== null && _s !== void 0 ? _s : '',
        credentials: {
            accessKeyId: (_t = process.env.S3_ACCESS_KEY) !== null && _t !== void 0 ? _t : '',
            secretAccessKey: (_u = process.env.S3_SECRET_ACCESS_KEY) !== null && _u !== void 0 ? _u : '',
        },
    });
    if (bucket === '' || hideawayHeaderImgKey === '') {
        console.error('Error in querying s3 for hideaway images');
        throw new Error('Error in querying s3 for hideaway images');
    }
    const hideawayParams = {
        Bucket: bucket,
        Prefix: 'captains_hideaway_png/',
    };
    try {
        const data = yield s3.send(new client_s3_1.ListObjectsV2Command(hideawayParams));
        const s3Objects = data === null || data === void 0 ? void 0 : data.Contents;
        if (!s3Objects) {
            console.error('Error in querying s3 for hideaway images');
            throw new Error('Error in querying s3 for hideaway images');
        }
        const headerImgIndex = findImgIndex(data, hideawayHeaderImgKey);
        const headerUrl = yield handleSignUrl(hideawayParams.Bucket, s3Objects[headerImgIndex]);
        const hideawayGalleryObjects = yield Promise.all(s3Objects
            .filter((s3Object) => s3Object.Key !== 'captains_hideaway_png/')
            .map((s3Object) => __awaiter(void 0, void 0, void 0, function* () {
            const altTag = yield getImgTag(hideawayParams.Bucket, s3Object);
            const signedUrl = yield handleSignUrl(hideawayParams.Bucket, s3Object);
            if (!altTag || !signedUrl) {
                throw new Error('Error in querying s3 for hideaway images');
            }
            return { altTag, signedUrl, key: s3Object.Key };
        })));
        if (!hideawayGalleryObjects) {
            console.error('Error in querying s3 for hideaway images');
            throw new Error('Error in querying s3 for hideaway images');
        }
        const galleryArray = (0, helpers_1.createImgGalArr)(hideawayGalleryObjects.map((obj) => obj.altTag), hideawayGalleryObjects.map((obj) => obj.signedUrl), hideawayGalleryObjects.map((obj) => obj.key));
        if (!galleryArray) {
            console.error('Error in querying s3 for hideaway images');
            throw new Error('Error in querying s3 for hideaway images');
        }
        return { headerUrl, galleryArray };
    }
    catch (err) {
        console.error('Error in querying s3 for hideaway images', err);
        throw new Error('Error in querying s3 for hideaway images');
    }
});
exports.getS3HideawayPgImgs = getS3HideawayPgImgs;
const getS3CottagePgImgs = () => __awaiter(void 0, void 0, void 0, function* () {
    var _v, _w, _x, _y, _z;
    const bucketName = (_v = process.env.S3_BUCKET_NAME) !== null && _v !== void 0 ? _v : '';
    const cottageHeaderImgKey = (_w = process.env.COTTAGE_HEADER_IMG_KEY) !== null && _w !== void 0 ? _w : '';
    const cottageParams = {
        Bucket: bucketName,
        Prefix: 'captains_cottage_png/',
    };
    const s3 = new client_s3_1.S3Client({
        region: (_x = process.env.S3_REGION) !== null && _x !== void 0 ? _x : '',
        credentials: {
            accessKeyId: (_y = process.env.S3_ACCESS_KEY) !== null && _y !== void 0 ? _y : '',
            secretAccessKey: (_z = process.env.S3_SECRET_ACCESS_KEY) !== null && _z !== void 0 ? _z : '',
        },
    });
    if (cottageHeaderImgKey === '') {
        console.error('Error in querying s3 for cottage images');
        throw new Error('Error in querying s3 for cottage images');
    }
    try {
        const data = yield s3.send(new client_s3_1.ListObjectsV2Command(cottageParams));
        const s3Objects = data === null || data === void 0 ? void 0 : data.Contents;
        if (!s3Objects) {
            console.error('Error in querying s3 for cottage images');
            throw new Error('Error in querying s3 for cottage images');
        }
        const headerImgIndex = findImgIndex(data, cottageHeaderImgKey);
        const headerUrl = yield handleSignUrl(cottageParams.Bucket, s3Objects[headerImgIndex]);
        if (!headerUrl) {
            console.error('Error in querying s3 for cottage images');
            throw new Error('Error in querying s3 for cottage images');
        }
        const cottageGalleryObjects = yield Promise.all(s3Objects
            .filter((s3Object) => s3Object.Key !== cottageHeaderImgKey.split('/')[0] + '/')
            .filter((s3Object) => s3Object.Key !== cottageHeaderImgKey)
            .map((s3Object) => __awaiter(void 0, void 0, void 0, function* () {
            const altTag = yield getImgTag(cottageParams.Bucket, s3Object);
            const signedUrl = yield handleSignUrl(cottageParams.Bucket, s3Object);
            if (!altTag || !signedUrl) {
                throw new Error('Error in querying s3 for cottage images');
            }
            return { altTag, signedUrl, key: s3Object.Key };
        })));
        if (!cottageGalleryObjects) {
            console.error('Error in querying s3 for cottage images');
            throw new Error('Error in querying s3 for cottage images');
        }
        const galleryArray = (0, helpers_1.createImgGalArr)(cottageGalleryObjects.map((obj) => obj.altTag), cottageGalleryObjects.map((obj) => obj.signedUrl), cottageGalleryObjects.map((obj) => obj.key));
        if (!galleryArray) {
            console.error('Error in querying s3 for cottage images');
            throw new Error('Error in querying s3 for cottage images');
        }
        return { headerUrl, galleryArray };
    }
    catch (err) {
        console.error('Error in querying s3 for cottage images', err);
        throw new Error('Error in querying s3 for cottage images');
    }
});
exports.getS3CottagePgImgs = getS3CottagePgImgs;
const getS3AboutPgImgs = () => __awaiter(void 0, void 0, void 0, function* () {
    var _0, _1;
    try {
        const bucketName = (_0 = process.env.S3_BUCKET_NAME) !== null && _0 !== void 0 ? _0 : '';
        const aboutImgKey = (_1 = process.env.ABOUT_IMG_KEY) !== null && _1 !== void 0 ? _1 : '';
        if (bucketName === '' || aboutImgKey === '') {
            console.error('Error in querying s3 for about page images');
            throw new Error('Error in querying s3 for about page images');
        }
        const imgUrl = yield handleSignUrl(bucketName, aboutImgKey);
        if (!imgUrl) {
            console.error('Error in querying s3 for homepage images');
            throw new Error('Error in querying s3 for homepage images');
        }
        return imgUrl;
    }
    catch (err) {
        console.error('Error in querying s3 for about page images', err);
        throw new Error('Error in querying s3 for about page images');
    }
});
exports.getS3AboutPgImgs = getS3AboutPgImgs;
//# sourceMappingURL=s3Query.js.map