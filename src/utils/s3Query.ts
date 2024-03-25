import AWS from 'aws-sdk';

if (process.env.NODE_ENV !== 'production') {
	AWS.config.loadFromPath('./utils/awsCredentials.json');
} else if (process.env.NODE_ENV == 'production') {
	AWS.config.update({
		accessKeyId: process.env.S3_ACCESS_KEY,
		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
		region: process.env.S3_REGION,
	});
}

const s3 = new AWS.S3();

const findImgIndex = (data: AWS.S3.ListObjectsV2Output, imgKey: string) => {
	if (!data.Contents || !imgKey) {
		return 0;
	}
	const foundIndex: number = data.Contents.map((image, index) => (image.Key === imgKey ? index : -1)).filter((index) => index !== -1)[0];
	if (!foundIndex) {
		return 0;
	}
	return foundIndex;
};

const getSignedUrl = (imageBucket: string, imageItem: any) => {
	console.log('add type for imageItem: ', typeof imageItem);
	if (imageItem.Key) {
		return s3.getSignedUrl('getObject', {
			Bucket: imageBucket,
			Key: imageItem.Key,
			Expires: 60,
		});
	} else {
		return s3.getSignedUrl('getObject', {
			Bucket: imageBucket,
			Key: imageItem,
			Expires: 60,
		});
	}
};

const getImgTag = async (imageBucket: string, imageItem: any) => {
	console.log('add type for imageItem: ', typeof imageItem);
	try {
		if (imageItem) {
			const altTag = await s3
				.getObjectTagging({
					Bucket: imageBucket,
					Key: imageItem?.Key,
				})
				.promise();

			if (altTag) {
				return altTag.TagSet[0]?.Value;
			}
		}
	} catch (err) {
		console.error('there was an error in retrieving image tags', err);
	}
};

const getImages = async (request: string) => {
	try {
		const bucketName = process.env.S3_BUCKET_NAME ?? '';

		const homeHeaderImgKey = process.env.HOME_HEADER_IMG_KEY ?? '';

		const homePgHideawayImgKey = process.env.HIDEAWAY_HOMEPAGE_IMG_KEY ?? '';

		const homePgCottageImgKey = process.env.COTTAGE_HOMEPAGE_IMG_KEY ?? '';

		const homePageParams = {
			Bucket: bucketName,
			Prefix: 'home_page/',
		};

		const hideawayHeaderImgKey = process.env.HIDEAWAY_HEADER_IMG_KEY ?? '';
		const hideawayParams = {
			Bucket: bucketName,
			Prefix: 'captains_hideaway_png/',
		};

		const cottageHeaderImgKey = process.env.COTTAGE_HEADER_IMG_KEY ?? '';
		const cottageParams = {
			Bucket: bucketName,
			Prefix: 'captains_cottage_png/',
		};

		const aboutImgKey = process.env.ABOUT_IMG_KEY ?? '';

		switch (request) {
			case 'homePage':
				try {
					const data = await s3.listObjectsV2(homePageParams).promise();
					if (data?.Contents) {
						const headerImgIndex = findImgIndex(data, homeHeaderImgKey);
						const headerImgUrl = getSignedUrl(homePageParams.Bucket, data.Contents[headerImgIndex]);

						const hideawayImgIndex = findImgIndex(data, homePgHideawayImgKey);
						const hideawayImgUrl = getSignedUrl(homePageParams.Bucket, data.Contents[hideawayImgIndex]);

						const cottageImgIndex = findImgIndex(data, homePgCottageImgKey);
						const cottageImgUrl = getSignedUrl(homePageParams.Bucket, data.Contents[cottageImgIndex]);

						return { headerImgUrl, hideawayImgUrl, cottageImgUrl };
					}
				} catch (err: any) {
					return [{ message: 'Error in querying s3 for homepage images', details: err.message }];
				}
				break;
			case 'hideawayImgPack':
				try {
					const data = await s3.listObjectsV2(hideawayParams).promise();
					if (data?.Contents) {
						const headerImgIndex = findImgIndex(data, hideawayHeaderImgKey);
						const headerUrl = getSignedUrl(hideawayParams.Bucket, data.Contents[headerImgIndex]);
						const hideawayGalleryObjects = await Promise.all(
							data?.Contents.filter((object) => object.Key !== 'captains_hideaway_png/').map(async (item) => {
								const altTag = await getImgTag(hideawayParams.Bucket, item);
								const signedUrl = getSignedUrl(hideawayParams.Bucket, item);
								if (!altTag || !signedUrl) {
									return null;
								}
								return { altTag, signedUrl };
							})
						);

						if (!headerUrl || !hideawayGalleryObjects) {
							console.error('Error in querying s3 for hideaway images');
							throw new Error('Error in querying s3 for hideaway images');
						}
						return { headerUrl, hideawayGalleryObjects };
					}
				} catch (err: any) {
					return [{ message: 'Error in querying s3 for cottage images', details: err.message }];
				}
				break;
			case 'cottageImgPack':
				try {
					const data = await s3.listObjectsV2(cottageParams).promise();

					if (!data.Contents) {
						console.error('Error in querying s3 for cottage images');
						throw new Error('Error in querying s3 for cottage images');
					}

					const headerImgIndex = findImgIndex(data, cottageHeaderImgKey);
					const headerUrl = getSignedUrl(cottageParams.Bucket, data.Contents[headerImgIndex]);

					const cottageGalleryObjects = await Promise.all(
						data?.Contents.filter((object) => object.Key !== cottageHeaderImgKey.split('/')[0] + '/')
							.filter((object) => object.Key !== cottageHeaderImgKey)
							.map(async (item) => {
								const altTag = await getImgTag(cottageParams.Bucket, item);
								const signedUrl = getSignedUrl(cottageParams.Bucket, item);
								if (!altTag || !signedUrl) {
									return null;
								}
								return { altTag, signedUrl };
							})
					);

					if (!headerUrl || !cottageGalleryObjects) {
						console.error('Error in querying s3 for cottage images');
						throw new Error('Error in querying s3 for cottage images');
					}
					return { headerUrl, cottageGalleryObjects };
          
				} catch (err: any) {
					return [{ message: 'Error in querying s3 for cottage images', details: err.message }];
				}

				
			case 'aboutPage':
				try {
					const imgUrl = getSignedUrl(bucketName, aboutImgKey);
					if (!imgUrl) {
						console.error('Error in querying s3 for homepage images');
						throw new Error('Error in querying s3 for homepage images');
					}
					return imgUrl;
				} catch (err: any) {
					return [{ message: 'Error in querying s3 for homepage images', details: err.message }];
				}
			default:
				return null;
		}
	} catch (err: any) {
		console.log('Error in getImages...', err.message);
		throw new Error('Error in getImages...');
	}
};
