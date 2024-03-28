import AWS from 'aws-sdk';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand, ListObjectsV2CommandOutput, S3 } from '@aws-sdk/client-s3';
import { IHomeUrls, S3Object } from '../types';
import { HideawayImgPack as IHideawayImgPack, CottageImgPack as ICottageImgPack, HomePgImgPack as IHomePgImgPack } from '../generated/graphql';
import { createImgGalArr } from './helpers';

// const bucketName = process.env.S3_BUCKET_NAME ?? '';

// const homeHeaderImgKey = process.env.HOME_HEADER_IMG_KEY ?? '';

// const homePgHideawayImgKey = process.env.HIDEAWAY_HOMEPAGE_IMG_KEY ?? '';

// const homePgCottageImgKey = process.env.COTTAGE_HOMEPAGE_IMG_KEY ?? '';

// const aboutImgKey = process.env.ABOUT_IMG_KEY ?? '';

// const homePageParams = {
// 	Bucket: bucketName,
// 	Prefix: 'home_page/',
// };

// const hideawayHeaderImgKey = process.env.HIDEAWAY_HEADER_IMG_KEY ?? '';
// const hideawayParams = {
// 	Bucket: bucketName,
// 	Prefix: 'captains_hideaway_png/',
// };

// const cottageHeaderImgKey = process.env.COTTAGE_HEADER_IMG_KEY ?? '';
// const cottageParams = {
// 	Bucket: bucketName,
// 	Prefix: 'captains_cottage_png/',
// };

// JS SDK v3 does not support global configuration.
// Codemod has attempted to pass values to each service client in this file.
// You may need to update clients outside of this file, if they use global config.
AWS.config.update({
	accessKeyId: process.env.S3_ACCESS_KEY,
	secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
	region: process.env.S3_REGION,
});

// const s3 = new S3({
// 	credentials: {
// 		accessKeyId: process.env.S3_ACCESS_KEY,
// 		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
// 	},

// 	region: process.env.S3_REGION,
// });

const s3 = new S3({
	region: process.env.S3_REGION,
});

const findImgIndex = (data: ListObjectsV2CommandOutput, imgKey: string) => {
	if (!data.Contents || !imgKey) {
		return 0;
	}
	const foundIndex: number = data.Contents.map((image, index) => (image.Key === imgKey ? index : -1)).filter((index) => index !== -1)[0];
	if (!foundIndex) {
		return 0;
	}
	return foundIndex;
};

const handleSignUrl = async (imageBucket: string, imageItem: S3Object | string) => {
	try {
		if (!imageItem || !imageBucket) {
			return '';
		}
		if (typeof imageItem === 'object') {
			return await getSignedUrl(
				s3,
				new GetObjectCommand({
					Bucket: imageBucket,
					Key: imageItem?.Key,
				}),
				{
					expiresIn: 60,
				}
			);
		}
		return await getSignedUrl(
			s3,
			new GetObjectCommand({
				Bucket: imageBucket,
				Key: imageItem,
			}),
			{
				expiresIn: 60,
			}
		);
	} catch (err) {
		console.error('there was an error in signing the url', err);
		return '';
	}
};

const getImgTag = async (imageBucket: string, imageItem: S3Object) => {
	try {
		if (imageItem) {
			const altTag = await s3.getObjectTagging({
				Bucket: imageBucket,
				Key: imageItem?.Key,
			});

			if (!altTag?.TagSet) {
				console.error('Error in retrieving image tags');
				throw new Error('Error in retrieving image tags');
			}
			return altTag.TagSet[0]?.Value;
		}
	} catch (err) {
		console.error('there was an error in retrieving image tags', err);
	}
};

export const getS3HomePageImgs = async () => {
	try {
		const bucketName = process.env.S3_BUCKET_NAME ?? '';
		const homeHeaderImgKey = process.env.HOME_HEADER_IMG_KEY ?? '';
		const homePgHideawayImgKey = process.env.HIDEAWAY_HOMEPAGE_IMG_KEY ?? '';
		const homePgCottageImgKey = process.env.COTTAGE_HOMEPAGE_IMG_KEY ?? '';
		const homePageParams = {
			Bucket: bucketName,
			Prefix: 'home_page/',
		};

		if (bucketName === '' || homeHeaderImgKey === '' || homePgHideawayImgKey === '' || homePgCottageImgKey === '') {
			console.error('Error in querying s3 for homepage images');
			throw new Error('Error in querying s3 for homepage images');
		}

		const data = await s3.listObjectsV2(homePageParams);
		const s3Objects = data?.Contents as S3Object[];

		if (!data?.Contents) {
			console.error('Error in querying s3 for homepage images');
			throw new Error('Error in querying s3 for homepage images');
		}
		const headerImgIndex = findImgIndex(data, homeHeaderImgKey);
		const headerImgUrl = await handleSignUrl(homePageParams.Bucket, s3Objects[headerImgIndex]);

		const hideawayImgIndex = findImgIndex(data, homePgHideawayImgKey);
		const hideawayImgUrl = await handleSignUrl(homePageParams.Bucket, s3Objects[hideawayImgIndex]);

		const cottageImgIndex = findImgIndex(data, homePgCottageImgKey);
		const cottageImgUrl = await handleSignUrl(homePageParams.Bucket, s3Objects[cottageImgIndex]);

		return { headerImgUrl, hideawayImgUrl, cottageImgUrl } as IHomePgImgPack;
	} catch (err: any) {
		return [{ message: 'Error in querying s3 for homepage images', details: err.message }];
	}
};

export const getS3HideawayPgImgs = async () => {
	try {
		const bucket = process.env.S3_BUCKET_NAME ?? '';
		const hideawayHeaderImgKey = process.env.HIDEAWAY_HEADER_IMG_KEY ?? '';

		if (bucket === '' || hideawayHeaderImgKey === '') {
			console.error('Error in querying s3 for hideaway images');
			throw new Error('Error in querying s3 for hideaway images');
		}
		const hideawayParams = {
			Bucket: bucket,
			Prefix: 'captains_hideaway_png/',
		};
		const data = await s3.listObjectsV2(hideawayParams);
		const s3Objects = data?.Contents as S3Object[];

		if (!s3Objects) {
			console.error('Error in querying s3 for hideaway images');
			throw new Error('Error in querying s3 for hideaway images');
		}

		const headerImgIndex = findImgIndex(data, hideawayHeaderImgKey);
		const headerUrl = await handleSignUrl(hideawayParams.Bucket, s3Objects[headerImgIndex]);
		const hideawayGalleryObjects = await Promise.all(
			s3Objects
				.filter((s3Object) => s3Object.Key !== 'captains_hideaway_png/')
				.map(async (s3Object) => {
					const altTag = await getImgTag(hideawayParams.Bucket, s3Object);
					const signedUrl = await handleSignUrl(hideawayParams.Bucket, s3Object);
					if (!altTag || !signedUrl) {
						throw new Error('Error in querying s3 for hideaway images');
					}
					return { altTag, signedUrl };
				})
		);

		if (!hideawayGalleryObjects) {
			console.error('Error in querying s3 for hideaway images');
			throw new Error('Error in querying s3 for hideaway images');
		}

		const galleryArray = createImgGalArr(
			hideawayGalleryObjects.map((obj) => obj.altTag),
			hideawayGalleryObjects.map((obj) => obj.signedUrl)
		);

		if (!galleryArray) {
			console.error('Error in querying s3 for hideaway images');
			throw new Error('Error in querying s3 for hideaway images');
		}

		return { headerUrl, galleryArray } as IHideawayImgPack;
	} catch (err: any) {
		console.error('Error in querying s3 for hideaway images', err);
		throw new Error('Error in querying s3 for hideaway images');
	}
};

export const getS3CottagePgImgs = async () => {
	try {
		const bucketName = process.env.S3_BUCKET_NAME ?? '';
		const cottageHeaderImgKey = process.env.COTTAGE_HEADER_IMG_KEY ?? '';
		const cottageParams = {
			Bucket: bucketName,
			Prefix: 'captains_cottage_png/',
		};
		if (cottageHeaderImgKey === '') {
			console.error('Error in querying s3 for cottage images');
			throw new Error('Error in querying s3 for cottage images');
		}

		const data = await s3.listObjectsV2(cottageParams);
		const s3Objects = data?.Contents as S3Object[];

		if (!s3Objects) {
			console.error('Error in querying s3 for cottage images');
			throw new Error('Error in querying s3 for cottage images');
		}

		const headerImgIndex = findImgIndex(data, cottageHeaderImgKey);
		const headerUrl = await handleSignUrl(cottageParams.Bucket, s3Objects[headerImgIndex]);

		if (!headerUrl) {
			console.error('Error in querying s3 for cottage images');
			throw new Error('Error in querying s3 for cottage images');
		}

		const cottageGalleryObjects = await Promise.all(
			s3Objects
				.filter((s3Object) => s3Object.Key !== cottageHeaderImgKey.split('/')[0] + '/')
				.filter((s3Object) => s3Object.Key !== cottageHeaderImgKey)
				.map(async (s3Object) => {
					const altTag = await getImgTag(cottageParams.Bucket, s3Object);
					const signedUrl = await handleSignUrl(cottageParams.Bucket, s3Object);
					if (!altTag || !signedUrl) {
						throw new Error('Error in querying s3 for cottage images');
					}

					return { altTag, signedUrl };
				})
		);

		if (!cottageGalleryObjects) {
			console.error('Error in querying s3 for cottage images');
			throw new Error('Error in querying s3 for cottage images');
		}

		const galleryArray = createImgGalArr(
			cottageGalleryObjects.map((obj) => obj.altTag),
			cottageGalleryObjects.map((obj) => obj.signedUrl)
		);

		if (!galleryArray) {
			console.error('Error in querying s3 for cottage images');
			throw new Error('Error in querying s3 for cottage images');
		}
		return { headerUrl, galleryArray } as ICottageImgPack;
	} catch (err: any) {
		console.error('Error in querying s3 for cottage images', err);
		throw new Error('Error in querying s3 for cottage images');
	}
};

export const getS3AboutPgImgs = async () => {
	try {
		const bucketName = process.env.S3_BUCKET_NAME ?? '';
		const aboutImgKey = process.env.ABOUT_IMG_KEY ?? '';

		if (bucketName === '' || aboutImgKey === '') {
			console.error('Error in querying s3 for about page images');
			throw new Error('Error in querying s3 for about page images');
		}
		const imgUrl = await handleSignUrl(bucketName, aboutImgKey);
		if (!imgUrl) {
			console.error('Error in querying s3 for homepage images');
			throw new Error('Error in querying s3 for homepage images');
		}
		return imgUrl;
	} catch (err: any) {
		console.error('Error in querying s3 for about page images', err);
		throw new Error('Error in querying s3 for about page images');
	}
};
