import { QueryResolvers } from "../../../generated/graphql";
import { getImgAltTag } from "../../../utils/s3Query";

export const imageQueries: QueryResolvers = {
  getImg: async (_: {}, { imgKey }: { imgKey: string; }, __: any) => {
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
  getImgs: async (_: {}, { imgKeys }: { imgKeys: string[]; }, __: any) => {
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