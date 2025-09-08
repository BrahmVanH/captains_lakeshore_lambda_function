"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f61b91b7-b565-5fcb-9eb4-533fe0ae5737")}catch(e){}}();

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.spaceMutations = void 0;
const db_1 = require("../../../connection/db");
const models_1 = require("../../../models");
const Space_1 = __importDefault(require("../../../models/Space"));
exports.spaceMutations = {
    createSpace: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args.input) {
            throw new Error('No input object was presented for creating space');
        }
        const { name, icon } = args.input;
        if (!name || !icon) {
            throw new Error('Space name or icon is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const space = yield Space_1.default.create(args.input);
            if (!space) {
                throw new Error('Could not create space');
            }
            return space;
        }
        catch (err) {
            throw new Error('Error in creating space: ' + err.message);
        }
    }),
    updateSpace: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args.input) {
            throw new Error('No input object was presented for updating space');
        }
        const { name, icon } = args.input;
        const { _id } = args;
        if (!_id) {
            throw new Error('Space name is undefined');
        }
        if (!name || !icon) {
            throw new Error('Update object is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const space = yield Space_1.default.findOneAndUpdate({ _id }, { $set: args.input }, { new: true });
            if (!space) {
                throw new Error('Could not find space with that name');
            }
            return space;
        }
        catch (err) {
            throw new Error('Error in updating space: ' + err.message);
        }
    }),
    removeSpace: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
        if (!args._id) {
            throw new Error('No input object was presented for removing space');
        }
        const { _id } = args;
        if (!_id) {
            throw new Error('Space name is undefined');
        }
        try {
            yield (0, db_1.connectToDb)();
            const properties = yield models_1.Property.find({ spacesItems: _id });
            if (properties.length > 0) {
                yield models_1.Property.updateMany({ spacesItems: _id }, { $pull: { spacesItems: _id } });
            }
            const space = yield Space_1.default.findOneAndDelete({ _id });
            if (!space) {
                throw new Error('Could not find space with that name');
            }
            return space;
        }
        catch (err) {
            throw new Error('Error in removing space: ' + err.message);
        }
    }),
    createSeedSpaces: (_, __) => __awaiter(void 0, void 0, void 0, function* () {
        const spacesSeedData = yield Promise.resolve().then(() => __importStar(require('../../../seed/spaces.json')));
        try {
            yield (0, db_1.connectToDb)();
            if (!spacesSeedData) {
                throw new Error('No seed data was presented for creating spaces');
            }
            const spaces = yield Space_1.default.create(spacesSeedData.default);
            if (!spaces) {
                throw new Error('Could not create spaces');
            }
            return spaces;
        }
        catch (err) {
            throw new Error('Error in creating seed spaces' + err.message);
        }
    }),
};
//# sourceMappingURL=space.js.map
//# debugId=f61b91b7-b565-5fcb-9eb4-533fe0ae5737
