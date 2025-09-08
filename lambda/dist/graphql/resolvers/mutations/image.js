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
exports.imageMutations = void 0;
const db_1 = require("../../../connection/db");
const s3Upload_1 = require("../../../utils/s3Upload");
exports.imageMutations = {
    deleteS3Objects: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        const { imgKeys } = args.input;
        if (!imgKeys || imgKeys.length === 0) {
            throw new Error('No key was presented for deleting object');
        }
        try {
            yield (0, db_1.connectToDb)();
            const response = yield (0, s3Upload_1.deleteS3Objects)(imgKeys);
            if (!response) {
                throw new Error('Could not delete object from s3');
            }
            return response;
        }
        catch (err) {
            throw new Error('Error in deleting object from s3: ' + err.message);
        }
    }),
};
//# sourceMappingURL=image.js.map