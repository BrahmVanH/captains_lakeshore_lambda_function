import { ImageObject } from '../generated/graphql';

// Takes in alt tags, gallery image urls and header url from property pages and
// formats an array for image gallery in client
export const createImgGalArr = (galleryAltTags: string[], imageUrls: string[], imageKeys: string[]) => {
	const galleryArray: ImageObject[] = imageUrls.map((url) => {
		const original = url;
		const imgKey = imageKeys[imageUrls.indexOf(url)];
		return {
			imgKey: imgKey,
			original: original,
			thumbnail: original,
			originalAlt: 'null',
			thumbnailAlt: 'null',
		};
	});
	for (let i = 0; i < galleryArray.length; i++) {
		galleryArray[i].originalAlt = galleryAltTags[i];
		galleryArray[i].thumbnailAlt = galleryAltTags[i];
	}
	// this one works
	return galleryArray;
};

 
