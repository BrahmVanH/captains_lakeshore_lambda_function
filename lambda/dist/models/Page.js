"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("../generated/graphql");
const mongoose_1 = require("mongoose");
const pageSchema = new mongoose_1.Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    metaDescription: {
        type: String,
        maxLength: 160
    },
    metaKeywords: [String],
    layoutTemplate: {
        type: String,
        default: 'default',
        enum: ['default', 'property', 'landing', 'contact']
    },
    status: {
        type: String,
        enum: Object.values(graphql_1.PageStatus),
        default: graphql_1.PageStatus.Draft,
        index: true
    },
    featuredImage: {
        url: String,
        alt: String,
        width: Number,
        height: Number
    },
    publishedAt: Date,
    components: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'PageComponent'
        }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
const PageModel = (0, mongoose_1.model)('Page', pageSchema);
exports.default = PageModel;
//# sourceMappingURL=Page.js.map