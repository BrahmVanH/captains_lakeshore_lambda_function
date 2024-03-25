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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getS3AboutPgImgs = exports.getS3CottagePgImgs = exports.getS3HideawayPgImgs = exports.getS3HomePageImgs = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
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
aws_sdk_1.default.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: process.env.S3_REGION,
});
const s3 = new aws_sdk_1.default.S3();
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
const getSignedUrl = (imageBucket, imageItem) => {
    if (!imageItem || !imageBucket) {
        return '';
    }
    console.log('add type for imageItem: ', imageItem);
    if (typeof imageItem === 'object') {
        return s3.getSignedUrl('getObject', {
            Bucket: imageBucket,
            Key: imageItem === null || imageItem === void 0 ? void 0 : imageItem.Key,
            Expires: 60,
        });
    }
    return s3.getSignedUrl('getObject', {
        Bucket: imageBucket,
        Key: imageItem,
        Expires: 60,
    });
};
const getImgTag = (imageBucket, imageItem) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('add type for imageItem: ', typeof imageItem);
    try {
        if (imageItem) {
            const altTag = yield s3
                .getObjectTagging({
                Bucket: imageBucket,
                Key: imageItem === null || imageItem === void 0 ? void 0 : imageItem.Key,
            })
                .promise();
            if (altTag) {
                return (_a = altTag.TagSet[0]) === null || _a === void 0 ? void 0 : _a.Value;
            }
        }
    }
    catch (err) {
        console.error('there was an error in retrieving image tags', err);
    }
});
const getS3HomePageImgs = () => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e;
    try {
        const bucketName = (_b = process.env.S3_BUCKET_NAME) !== null && _b !== void 0 ? _b : '';
        const homeHeaderImgKey = (_c = process.env.HOME_HEADER_IMG_KEY) !== null && _c !== void 0 ? _c : '';
        const homePgHideawayImgKey = (_d = process.env.HIDEAWAY_HOMEPAGE_IMG_KEY) !== null && _d !== void 0 ? _d : '';
        const homePgCottageImgKey = (_e = process.env.COTTAGE_HOMEPAGE_IMG_KEY) !== null && _e !== void 0 ? _e : '';
        const homePageParams = {
            Bucket: bucketName,
            Prefix: 'home_page/',
        };
        if (bucketName === '' || homeHeaderImgKey === '' || homePgHideawayImgKey === '' || homePgCottageImgKey === '') {
            console.error('Error in querying s3 for homepage images');
            throw new Error('Error in querying s3 for homepage images');
        }
        const data = yield s3.listObjectsV2(homePageParams).promise();
        const s3Objects = data === null || data === void 0 ? void 0 : data.Contents;
        if (!(data === null || data === void 0 ? void 0 : data.Contents)) {
            console.error('Error in querying s3 for homepage images');
            throw new Error('Error in querying s3 for homepage images');
        }
        const headerImgIndex = findImgIndex(data, homeHeaderImgKey);
        const headerImgUrl = getSignedUrl(homePageParams.Bucket, s3Objects[headerImgIndex]);
        const hideawayImgIndex = findImgIndex(data, homePgHideawayImgKey);
        const hideawayImgUrl = getSignedUrl(homePageParams.Bucket, s3Objects[hideawayImgIndex]);
        const cottageImgIndex = findImgIndex(data, homePgCottageImgKey);
        const cottageImgUrl = getSignedUrl(homePageParams.Bucket, s3Objects[cottageImgIndex]);
        return { headerImgUrl, hideawayImgUrl, cottageImgUrl };
    }
    catch (err) {
        return [{ message: 'Error in querying s3 for homepage images', details: err.message }];
    }
});
exports.getS3HomePageImgs = getS3HomePageImgs;
const getS3HideawayPgImgs = () => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    try {
        const bucket = (_f = process.env.S3_BUCKET_NAME) !== null && _f !== void 0 ? _f : '';
        const hideawayHeaderImgKey = (_g = process.env.HIDEAWAY_HEADER_IMG_KEY) !== null && _g !== void 0 ? _g : '';
        if (bucket === '' || hideawayHeaderImgKey === '') {
            console.error('Error in querying s3 for hideaway images');
            throw new Error('Error in querying s3 for hideaway images');
        }
        const hideawayParams = {
            Bucket: bucket,
            Prefix: 'captains_hideaway_png/',
        };
        const data = yield s3.listObjectsV2(hideawayParams).promise();
        const s3Objects = data === null || data === void 0 ? void 0 : data.Contents;
        if (!s3Objects) {
            console.error('Error in querying s3 for hideaway images');
            throw new Error('Error in querying s3 for hideaway images');
        }
        const headerImgIndex = findImgIndex(data, hideawayHeaderImgKey);
        const headerUrl = getSignedUrl(hideawayParams.Bucket, s3Objects[headerImgIndex]);
        const hideawayGalleryObjects = yield Promise.all(s3Objects
            .filter((s3Object) => s3Object.Key !== 'captains_hideaway_png/')
            .map((s3Object) => __awaiter(void 0, void 0, void 0, function* () {
            const altTag = yield getImgTag(hideawayParams.Bucket, s3Object);
            const signedUrl = getSignedUrl(hideawayParams.Bucket, s3Object);
            if (!altTag || !signedUrl) {
                throw new Error('Error in querying s3 for hideaway images');
            }
            return { altTag, signedUrl };
        })));
        if (!hideawayGalleryObjects) {
            console.error('Error in querying s3 for hideaway images');
            throw new Error('Error in querying s3 for hideaway images');
        }
        const galleryArray = (0, helpers_1.createImgGalArr)(hideawayGalleryObjects.map((obj) => obj.altTag), hideawayGalleryObjects.map((obj) => obj.signedUrl));
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
    var _h, _j;
    try {
        const bucketName = (_h = process.env.S3_BUCKET_NAME) !== null && _h !== void 0 ? _h : '';
        const cottageHeaderImgKey = (_j = process.env.COTTAGE_HEADER_IMG_KEY) !== null && _j !== void 0 ? _j : '';
        const cottageParams = {
            Bucket: bucketName,
            Prefix: 'captains_cottage_png/',
        };
        if (cottageHeaderImgKey === '') {
            console.error('Error in querying s3 for cottage images');
            throw new Error('Error in querying s3 for cottage images');
        }
        const data = yield s3.listObjectsV2(cottageParams).promise();
        const s3Objects = data === null || data === void 0 ? void 0 : data.Contents;
        if (!s3Objects) {
            console.error('Error in querying s3 for cottage images');
            throw new Error('Error in querying s3 for cottage images');
        }
        const headerImgIndex = findImgIndex(data, cottageHeaderImgKey);
        const headerUrl = getSignedUrl(cottageParams.Bucket, s3Objects[headerImgIndex]);
        if (!headerUrl) {
            console.error('Error in querying s3 for cottage images');
            throw new Error('Error in querying s3 for cottage images');
        }
        const cottageGalleryObjects = yield Promise.all(s3Objects
            .filter((s3Object) => s3Object.Key !== cottageHeaderImgKey.split('/')[0] + '/')
            .filter((s3Object) => s3Object.Key !== cottageHeaderImgKey)
            .map((s3Object) => __awaiter(void 0, void 0, void 0, function* () {
            const altTag = yield getImgTag(cottageParams.Bucket, s3Object);
            const signedUrl = getSignedUrl(cottageParams.Bucket, s3Object);
            if (!altTag || !signedUrl) {
                throw new Error('Error in querying s3 for cottage images');
            }
            return { altTag, signedUrl };
        })));
        if (!cottageGalleryObjects) {
            console.error('Error in querying s3 for cottage images');
            throw new Error('Error in querying s3 for cottage images');
        }
        const galleryArray = (0, helpers_1.createImgGalArr)(cottageGalleryObjects.map((obj) => obj.altTag), cottageGalleryObjects.map((obj) => obj.signedUrl));
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
    var _k, _l;
    try {
        const bucketName = (_k = process.env.S3_BUCKET_NAME) !== null && _k !== void 0 ? _k : '';
        const aboutImgKey = (_l = process.env.ABOUT_IMG_KEY) !== null && _l !== void 0 ? _l : '';
        if (bucketName === '' || aboutImgKey === '') {
            console.error('Error in querying s3 for about page images');
            throw new Error('Error in querying s3 for about page images');
        }
        const imgUrl = getSignedUrl(bucketName, aboutImgKey);
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