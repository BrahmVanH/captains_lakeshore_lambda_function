import { Page } from "@/generated/graphql";
import { model, Schema } from "mongoose";

const pageSchema: Schema<Page> = new Schema<Page>({
  slug: {
    type: String,
    required: true
  },
  heroImgKey: {
    type: String,
    required: true
  },
  heading: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: false
  }
})

const PageModel = model<Page>('Page', pageSchema);

export default PageModel;