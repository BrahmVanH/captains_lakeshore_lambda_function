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
exports.getS3AboutPgImgs = exports.getS3CottagePgImgs = exports.getS3HideawayPgImgs = exports.getS3HomePageImgs = exports.getImgTag = exports.handleSignUrl = void 0;
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
const getS3HomePageImgs = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    const bucketName = (_a = process.env.S3_BUCKET_NAME) !== null && _a !== void 0 ? _a : '';
    const homeHeaderImgKey = (_b = process.env.HOME_HEADER_IMG_KEY) !== null && _b !== void 0 ? _b : '';
    const homePgHideawayImgKey = (_c = process.env.HIDEAWAY_HOMEPAGE_IMG_KEY) !== null && _c !== void 0 ? _c : '';
    const homePgCottageImgKey = (_d = process.env.COTTAGE_HOMEPAGE_IMG_KEY) !== null && _d !== void 0 ? _d : '';
    const homePageParams = {
        Bucket: bucketName,
        Prefix: 'home_page/',
    };
    const s3 = new client_s3_1.S3Client({
        region: (_e = process.env.S3_REGION) !== null && _e !== void 0 ? _e : '',
        credentials: {
            accessKeyId: (_f = process.env.S3_ACCESS_KEY) !== null && _f !== void 0 ? _f : '',
            secretAccessKey: (_g = process.env.S3_SECRET_ACCESS_KEY) !== null && _g !== void 0 ? _g : '',
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
        const headerImgUrl = yield (0, exports.handleSignUrl)(s3Objects[headerImgIndex]);
        const hideawayImgIndex = findImgIndex(data, homePgHideawayImgKey);
        const hideawayImgUrl = yield (0, exports.handleSignUrl)(s3Objects[hideawayImgIndex]);
        const cottageImgIndex = findImgIndex(data, homePgCottageImgKey);
        const cottageImgUrl = yield (0, exports.handleSignUrl)(s3Objects[cottageImgIndex]);
        return { headerImgUrl, hideawayImgUrl, cottageImgUrl };
    }
    catch (err) {
        return [{ message: 'Error in querying s3 for homepage images', details: err.message }];
    }
});
exports.getS3HomePageImgs = getS3HomePageImgs;
// export const getS3Img = async (key: string) => {
// 	if (key === '') {
// 		console.error('Error in querying s3 for homepage image');
// 		throw new Error('Error in querying s3 for homepage image');
// 	}
// 	const bucket = process.env.S3_BUCKET_NAME ?? '';
// 	const s3 = new S3Client({
// 		region: process.env.S3_REGION ?? '',
// 		credentials: {
// 			accessKeyId: process.env.S3_ACCESS_KEY ?? '',
// 			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
// 		},
// 	});
// 	if (bucket === '' || key === '') {
// 		console.error('Error in querying s3 for homepage images');
// 		throw new Error('Error in querying s3 for homepage images');
// 	}
// 	const homePageParams = {
// 		Bucket: bucket,
// 		Prefix: 'home_page/',
// 	};
// 	try {
// 		const data = await s3.send(new ListObjectsV2Command(homePageParams));
// 		const s3Objects = data?.Contents as S3Object[];
// 		if (!data?.Contents) {
// 			console.error('Error in querying s3 for homepage images');
// 			throw new Error('Error in querying s3 for homepage images');
// 		}
// 		const headerImgIndex = findImgIndex(data, homeHeaderImgKey);
// 		const headerImgUrl = await handleSignUrl(s3Objects[headerImgIndex]);
// 		const hideawayImgIndex = findImgIndex(data, homePgHideawayImgKey);
// 		const hideawayImgUrl = await handleSignUrl(s3Objects[hideawayImgIndex]);
// 		const cottageImgIndex = findImgIndex(data, homePgCottageImgKey);
// 		const cottageImgUrl = await handleSignUrl(s3Objects[cottageImgIndex]);
// 		return { headerImgUrl, hideawayImgUrl, cottageImgUrl } as IHomePgImgPack;
// 	} catch (err: any) {
// 		return [{ message: 'Error in querying s3 for homepage images', details: err.message }];
// 	}
// };
const getS3HideawayPgImgs = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const bucket = (_a = process.env.S3_BUCKET_NAME) !== null && _a !== void 0 ? _a : '';
    const hideawayHeaderImgKey = (_b = process.env.HIDEAWAY_HEADER_IMG_KEY) !== null && _b !== void 0 ? _b : '';
    const s3 = new client_s3_1.S3Client({
        region: (_c = process.env.S3_REGION) !== null && _c !== void 0 ? _c : '',
        credentials: {
            accessKeyId: (_d = process.env.S3_ACCESS_KEY) !== null && _d !== void 0 ? _d : '',
            secretAccessKey: (_e = process.env.S3_SECRET_ACCESS_KEY) !== null && _e !== void 0 ? _e : '',
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
        const headerUrl = yield (0, exports.handleSignUrl)(s3Objects[headerImgIndex]);
        const hideawayGalleryObjects = yield Promise.all(s3Objects
            .filter((s3Object) => s3Object.Key !== 'captains_hideaway_png/')
            .map((s3Object) => __awaiter(void 0, void 0, void 0, function* () {
            const altTag = yield (0, exports.getImgTag)(s3Object);
            const signedUrl = yield (0, exports.handleSignUrl)(s3Object);
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
    var _a, _b, _c, _d, _e;
    const bucketName = (_a = process.env.S3_BUCKET_NAME) !== null && _a !== void 0 ? _a : '';
    const cottageHeaderImgKey = (_b = process.env.COTTAGE_HEADER_IMG_KEY) !== null && _b !== void 0 ? _b : '';
    const cottageParams = {
        Bucket: bucketName,
        Prefix: 'captains_cottage_png/',
    };
    const s3 = new client_s3_1.S3Client({
        region: (_c = process.env.S3_REGION) !== null && _c !== void 0 ? _c : '',
        credentials: {
            accessKeyId: (_d = process.env.S3_ACCESS_KEY) !== null && _d !== void 0 ? _d : '',
            secretAccessKey: (_e = process.env.S3_SECRET_ACCESS_KEY) !== null && _e !== void 0 ? _e : '',
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
        const headerUrl = yield (0, exports.handleSignUrl)(s3Objects[headerImgIndex]);
        if (!headerUrl) {
            console.error('Error in querying s3 for cottage images');
            throw new Error('Error in querying s3 for cottage images');
        }
        const cottageGalleryObjects = yield Promise.all(s3Objects
            .filter((s3Object) => s3Object.Key !== cottageHeaderImgKey.split('/')[0] + '/')
            .filter((s3Object) => s3Object.Key !== cottageHeaderImgKey)
            .map((s3Object) => __awaiter(void 0, void 0, void 0, function* () {
            const altTag = yield (0, exports.getImgTag)(s3Object);
            const signedUrl = yield (0, exports.handleSignUrl)(s3Object);
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
    var _a;
    try {
        const aboutImgKey = (_a = process.env.ABOUT_IMG_KEY) !== null && _a !== void 0 ? _a : '';
        if (aboutImgKey === '') {
            console.error('Error in querying s3 for about page images');
            throw new Error('Error in querying s3 for about page images');
        }
        const imgUrl = yield (0, exports.handleSignUrl)(aboutImgKey);
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