import { Page } from "../generated/graphql";
import { model, Schema } from "mongoose";

const pageSchema = new Schema<Page>({
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
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
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
    type: Schema.Types.ObjectId,
    ref: 'PageComponent'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

const PageModel = model<Page>('Page', pageSchema);

export default PageModel;