import { QueryResolvers } from "../../../generated/graphql";
import { getImgAltTag, handleSignUrl } from "../../../utils/s3Query";

export const imageQueries: QueryResolvers = {



  getImg: async (_: {}, { imgKey }: { imgKey: string; }, __: any) => {
    try {
      const preSignedUrl = await handleSignUrl(imgKey)
      if (!preSignedUrl) {
        console.error('Error in getting presigned URL');
        throw new Error('Error in getting presigned URL');
      }
      const alt = await getImgAltTag(imgKey);
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
        await getImgAltTag(key)
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
  getImg2: async (_: {}, { imgKey }: { imgKey: string; }, __: any) => {
    try {
      const alt = await getImgAltTag(imgKey);

      if (!alt) {
        console.warn('Error in getting alt tag');
        return { alt: "placeholder", key: imgKey };

      }
      return { alt, key: imgKey };
    } catch (err: any) {
      throw new Error('Error getting images: ' + err.message);

    }
  },
  getImgs2: async (_: {}, { imgKeys }: { imgKeys: string[]; }, __: any) => {
    try {
      const imgs = await Promise.all(imgKeys.map(async (key: string, i: number) => {
        const alt = await getImgAltTag(key)
        return { alt: alt ?? 'placeholder', key }
      }
      )).catch(e => {
        throw new Error(`Error in getting alt tags for imgs: ${e}`)
      })

      return imgs

    } catch (err: any) {
      throw new Error('Error in getting upload url for s3: ' + err.message);
    }
  }
}