import { QueryResolvers } from "@/generated/graphql";
import { getImgTag, getS3AboutPgImgs, getS3CottagePgImgs, getS3HideawayPgImgs, getS3HomePageImgs, handleSignUrl } from "@/utils/s3Query";

export const imageQueries: QueryResolvers = {

  getHomePgImgs: async () => {
    try {
      const homePgImgs = await getS3HomePageImgs();
      if (homePgImgs instanceof Array) {
        console.error('Error in querying s3 for homepage images', homePgImgs);
        throw new Error('Error in querying s3 for homepage images');
      }

      if (!homePgImgs?.headerImgUrl || !homePgImgs?.hideawayImgUrl || !homePgImgs?.cottageImgUrl) {
        console.error('Error in querying s3 for homepage images');
        throw new Error('Something went wrong in fetching object from s3');
      }
      return homePgImgs;
    } catch (err: any) {
      console.error('Error in querying s3 for homepage images', err);
      throw new Error('Error in querying s3 for homepage images: ' + err.message);
    }
  },
  getHideawayImgs: async () => {
    try {
      const hideawayImgs = await getS3HideawayPgImgs();

      if (!hideawayImgs) {
        throw new Error('Something went wrong in fetching hideaway object from S3');
      }
      return hideawayImgs;
    } catch (err: any) {
      console.error('Error in getHideawayImgs...', err);
      throw new Error('Error in getting hideaway images from s3: ' + err.message);
    }
  },
  getCottageImgs: async () => {
    try {
      const cottageImgs = await getS3CottagePgImgs();

      if (!cottageImgs) {
        throw new Error('Something went wrong in fetching cottage object from S3');
      }
      return cottageImgs;
    } catch (err: any) {
      console.error('Error in getCottageImgs...', err);
      throw new Error('Error in getting cottage images from s3: ' + err.message);
    }
  },
  getAboutPgImg: async () => {
    try {
      const aboutPgImgs = await getS3AboutPgImgs();
      if (!aboutPgImgs) {
        throw new Error('Something went wrong in fetching object from s3');
      }
      return aboutPgImgs;
    } catch (err: any) {
      console.error('Error in querying s3 for about page image', err);
      throw new Error('Error in querying s3 for about page image: ' + err.message);
    }
  },
  getImg: async (_: {}, { imgKey }: { imgKey: string; }, __: any) => {
    try {
      const preSignedUrl = await handleSignUrl(imgKey)
      if (!preSignedUrl) {
        console.error('Error in getting presigned URL');
        throw new Error('Error in getting presigned URL');
      }
      const alt = await getImgTag(imgKey);
      if (!alt) {
        console.error('Error in getting alt tag');
        throw new Error('Error in getting alt tag');
      }
      return { url: preSignedUrl, alt };
    } catch (err: any) {
      throw new Error('Error in getting upload url for s3: ' + err.message);
    }
  },
  getImgs: async (_: {}, { imgKeys }: { imgKeys: string[]; }, __: any) => {
    try {

      const preSignedUrls = await Promise.all(imgKeys.map(async (key: string, i: number) =>
        await handleSignUrl(key)
      )).catch(e => {
        throw new Error(`Error in presigning urls for imgs: ${e}`)
      })

      const filteredUrls = preSignedUrls.filter((url) => url !== undefined)

      if (!filteredUrls) {
        console.error('Error in getting presigned URL');
        throw new Error('Error in getting presigned URL');
      }

      const altTags = await Promise.all(imgKeys.map(async (key: string, i: number) =>
        await getImgTag(key)
      )).catch(e => {
        throw new Error(`Error in getting alt tags for imgs: ${e}`)
      })

      console.log("altTags: ", altTags)

      const correctedAltTags = altTags.map(t => t ?? "placeholder");
      const imgs = filteredUrls.map((url, i) => ({ url, alt: correctedAltTags[i] ?? "" }))

      return imgs;
    } catch (err: any) {
      throw new Error('Error in getting upload url for s3: ' + err.message);
    }
  },
}