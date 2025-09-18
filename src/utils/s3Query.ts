import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand, GetObjectTaggingCommand, ListObjectsV2Command, ListObjectsV2CommandOutput, S3Client } from '@aws-sdk/client-s3';
import { S3Object } from '../types';
import { Image } from '../generated/graphql';



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

export const handleSignUrl = async (imageItem: S3Object | string) => {
	const bucketName = process.env.S3_BUCKET_NAME;
	const s3 = new S3Client({
		region: process.env.S3_REGION ?? '',
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY ?? '',
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
		},
	});
	try {
		if (!imageItem || !bucketName) {
			return '';
		}
		if (typeof imageItem === 'object') {
			return await getSignedUrl(
				s3,
				new GetObjectCommand({
					Bucket: bucketName,
					Key: imageItem?.Key,
				}),
				{
					expiresIn: 60 * 60 * 24 * 7, // 7 days
				}
			);
		}
		return await getSignedUrl(
			s3,
			new GetObjectCommand({
				Bucket: bucketName,
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


export const getImgAltTag = async (imageItem: S3Object | string) => {
	const bucketName = process.env.S3_BUCKET_NAME;
	const s3 = new S3Client({
		region: process.env.S3_REGION ?? '',
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY ?? '',
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
		},
	});
	if (!imageItem) {
		console.error('Error in retrieving image tags');
		throw new Error('Error in retrieving image tags');
	}
	let command;

	if (typeof imageItem === 'object') {

		command = new GetObjectTaggingCommand({
			Bucket: bucketName,
			Key: imageItem?.Key,
		});
	} else {
		command = new GetObjectTaggingCommand({
			Bucket: bucketName,
			Key: imageItem,
		});
	}

	try {
		const response = await s3.send(command);

		if (!response?.TagSet) {
			console.error('Error in retrieving image tags');
			throw new Error('Error in retrieving image tags');
		}
		return response.TagSet[0]?.Value;
	} catch (err) {
		console.error('there was an error in retrieving image tags', err);
		return ""
	}
};


export const getS3ImagesByDirectoryPrefix = async (directoryPrefix: string) => {
	const Bucket = process.env.S3_BUCKET_NAME ?? '';
	const Prefix = directoryPrefix + '/'

	const listObjectsCommandParams = {
		Bucket,
		Prefix
	}


	const s3 = new S3Client({
		region: process.env.S3_REGION ?? '',
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY ?? '',
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
		},
	});
	try {
		const data = await s3.send(new ListObjectsV2Command(listObjectsCommandParams));

		const s3Objects = data?.Contents as S3Object[];


		if (!s3Objects) {
			console.error('Error in querying s3 for image objects');
			throw new Error('Error in querying s3 for image objects');
		}

		const images = await Promise.all(s3Objects
			.filter((s3Object) => s3Object.Key !== Prefix) // Remove root object from s3 bucket directory list
			.filter((obj) => !!obj.Key).map(async (obj) => {
				const alt = await getImgAltTag(obj);
				const url = await handleSignUrl(obj);

				if (!alt) {
					console.error("Error in getting image alt tag");

				}

				if (!url) {
					console.error("Error in getting signed image url");
					throw new Error("Could not sign image url");
				}

				return {
					url,
					alt: alt ?? "",
					key: obj.Key
				} as Image
			}))


		return images

	} catch (err: any) {
		console.error('Error in querying s3 for property images', err);
		throw new Error('Error in querying s3 for property images');
	}

}