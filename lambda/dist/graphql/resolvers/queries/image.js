"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="a3fb6cba-880f-5753-9746-61ec43958c92")}catch(e){}}();

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
                return { url: preSignedUrl, alt: "placeholder", key: imgKey };
            }
            return { url: preSignedUrl, alt, key: imgKey };
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
            const imgs = filteredUrls.map((url, i) => { var _a; return ({ url, alt: (_a = correctedAltTags[i]) !== null && _a !== void 0 ? _a : "", key: imgKeys[i] }); });
            return imgs;
        }
        catch (err) {
            throw new Error('Error in getting upload url for s3: ' + err.message);
        }
    }),
};
//# sourceMappingURL=image.js.map
//# debugId=a3fb6cba-880f-5753-9746-61ec43958c92
