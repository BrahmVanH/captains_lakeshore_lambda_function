import { IGalleryContent } from '../types';

// Takes in alt tags, gallery image urls and header url from property pages and
// formats an array for image gallery in client
export const createImgGalArr = (galleryAltTags: string[], imageUrls: string[], headerUrl: string) => {
  console.log('TO DO: follow headerUrl to see if it needs to pass through this function');
	const galleryContent: IGalleryContent[] = imageUrls.map((url) => {
		const original = url;
		return {
			original: original,
			thumbnail: original,
			originalAlt: null,
			thumbnailAlt: null,
		};
	});
	for (let i = 0; i < galleryContent.length; i++) {
		galleryContent[i].originalAlt = galleryAltTags[i];
		galleryContent[i].thumbnailAlt = galleryAltTags[i];
	}
	// this one works
	return { headerUrl, galleryContent };
};


// Retrieves Home page image URLs from server-side S3 query

// OBSOLETE USE getHomePgIms from s3Query.ts
// export const getHomeImgUrls = async () => {
// 	try {
// 		const homeImgs = await getImages('homePage');
//     if (!homeImgs?.headerImgUrl || !homeImgs?.hideawayImgUrl || !homeImgs?.cottageImgUrl) {
//       throw new Error('Something went wrong in fetching object from s3');
//     }
//     const { headerImgUrl, hideawayImgUrl, cottageImgUrl } = homeImgs;

// 		if (headerImgUrl && hideawayImgUrl && cottageImgUrl) {
// 			return { headerImgUrl, hideawayImgUrl, cottageImgUrl };
// 		}
// 	} catch (err) {
// 		throw new Error('there was an error fetching homepage images');
// 	}
// };
