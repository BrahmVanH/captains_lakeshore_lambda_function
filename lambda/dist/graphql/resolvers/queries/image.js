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
exports.imageQueries = void 0;
const s3Query_1 = require("../../../utils/s3Query");
exports.imageQueries = {
    getHomePgImgs: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const homePgImgs = yield (0, s3Query_1.getS3HomePageImgs)();
            if (homePgImgs instanceof Array) {
                console.error('Error in querying s3 for homepage images', homePgImgs);
                throw new Error('Error in querying s3 for homepage images');
            }
            if (!(homePgImgs === null || homePgImgs === void 0 ? void 0 : homePgImgs.headerImgUrl) || !(homePgImgs === null || homePgImgs === void 0 ? void 0 : homePgImgs.hideawayImgUrl) || !(homePgImgs === null || homePgImgs === void 0 ? void 0 : homePgImgs.cottageImgUrl)) {
                console.error('Error in querying s3 for homepage images');
                throw new Error('Something went wrong in fetching object from s3');
            }
            return homePgImgs;
        }
        catch (err) {
            console.error('Error in querying s3 for homepage images', err);
            throw new Error('Error in querying s3 for homepage images: ' + err.message);
        }
    }),
    getHideawayImgs: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hideawayImgs = yield (0, s3Query_1.getS3HideawayPgImgs)();
            if (!hideawayImgs) {
                throw new Error('Something went wrong in fetching hideaway object from S3');
            }
            return hideawayImgs;
        }
        catch (err) {
            console.error('Error in getHideawayImgs...', err);
            throw new Error('Error in getting hideaway images from s3: ' + err.message);
        }
    }),
    getCottageImgs: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cottageImgs = yield (0, s3Query_1.getS3CottagePgImgs)();
            if (!cottageImgs) {
                throw new Error('Something went wrong in fetching cottage object from S3');
            }
            return cottageImgs;
        }
        catch (err) {
            console.error('Error in getCottageImgs...', err);
            throw new Error('Error in getting cottage images from s3: ' + err.message);
        }
    }),
    getAboutPgImg: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const aboutPgImgs = yield (0, s3Query_1.getS3AboutPgImgs)();
            if (!aboutPgImgs) {
                throw new Error('Something went wrong in fetching object from s3');
            }
            return aboutPgImgs;
        }
        catch (err) {
            console.error('Error in querying s3 for about page image', err);
            throw new Error('Error in querying s3 for about page image: ' + err.message);
        }
    }),
    getImg: (_1, _a, __1) => __awaiter(void 0, [_1, _a, __1], void 0, function* (_, { imgKey }, __) {
        try {
            const preSignedUrl = yield (0, s3Query_1.handleSignUrl)(imgKey);
            if (!preSignedUrl) {
                console.error('Error in getting presigned URL');
                throw new Error('Error in getting presigned URL');
            }
            const alt = yield (0, s3Query_1.getImgTag)(imgKey);
            if (!alt) {
                console.warn('Error in getting alt tag');
                return { url: preSignedUrl, alt: "placeholder" };
            }
            return { url: preSignedUrl, alt };
        }
        catch (err) {
            throw new Error('Error in getting upload url for s3: ' + err.message);
        }
    }),
    getImgs: (_1, _a, __1) => __awaiter(void 0, [_1, _a, __1], void 0, function* (_, { imgKeys }, __) {
        try {
            const preSignedUrls = yield Promise.all(imgKeys.map((key, i) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, s3Query_1.handleSignUrl)(key); }))).catch(e => {
                throw new Error(`Error in presigning urls for imgs: ${e}`);
            });
            const filteredUrls = preSignedUrls.filter((url) => url !== undefined);
            if (!filteredUrls) {
                console.error('Error in getting presigned URL');
                throw new Error('Error in getting presigned URL');
            }
            const altTags = yield Promise.all(imgKeys.map((key, i) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, s3Query_1.getImgTag)(key); }))).catch(e => {
                throw new Error(`Error in getting alt tags for imgs: ${e}`);
            });
            const correctedAltTags = altTags.map(t => t !== null && t !== void 0 ? t : "placeholder");
            const imgs = filteredUrls.map((url, i) => { var _a; return ({ url, alt: (_a = correctedAltTags[i]) !== null && _a !== void 0 ? _a : "" }); });
            return imgs;
        }
        catch (err) {
            throw new Error('Error in getting upload url for s3: ' + err.message);
        }
    }),
};
//# sourceMappingURL=image.js.map