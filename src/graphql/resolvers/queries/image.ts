import { QueryResolvers } from "../../../generated/graphql";
import { getImgTag, handleSignUrl } from "../../../utils/s3Query";

export const imageQueries: QueryResolvers = {



  getImg: async (_: {}, { imgKey }: { imgKey: string; }, __: any) => {
    try {
      const preSignedUrl = await handleSignUrl(imgKey)
      if (!preSignedUrl) {
        console.error('Error in getting presigned URL');
        throw new Error('Error in getting presigned URL');
      }
      const alt = await getImgTag(imgKey);
      if (!alt) {
        console.warn('Error in getting alt tag');
        return { url: preSignedUrl, alt: "placeholder", key: imgKey };

      }
      return { url: preSignedUrl, alt, key: imgKey };
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


      const correctedAltTags = altTags.map(t => t ?? "placeholder");
      const imgs = filteredUrls.map((url, i) => ({ url, alt: correctedAltTags[i] ?? "", key: imgKeys[i] }))

      return imgs;
    } catch (err: any) {
      throw new Error('Error in getting upload url for s3: ' + err.message);
    }
  },
}