import { PutObjectCommand, DeleteObjectCommand, S3Client, PutObjectTaggingCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const createPresignedUrlWithClient = ({ region, bucket, key, commandType, altTag }: { region: string; bucket: string; key: string; commandType: string; altTag: string }) => {
	const client = new S3Client({ region });
	let command;
	if (commandType === 'put') {
		command = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: 'image/jpg', Tagging: `alt=${altTag}` });
	} else if (commandType === 'delete') {
		command = new DeleteObjectCommand({ Bucket: bucket, Key: key });
	} else {
		console.error('Invalid command type');
		throw new Error();
	}
	return getSignedUrl(client, command, { expiresIn: 3600, unhoistableHeaders: new Set(['x-amz-tagging']) });
};

export const getPresignedUrl = async (key: string, commandType: string, altTag: string) => {
	if (!key) {
		console.error('No key provided');
		throw new Error();
	}
	const REGION = process.env.S3_REGION ?? '';
	const BUCKET = process.env.S3_BUCKET_NAME ?? '';
	const KEY = key;

	try {
		const uploadUrl = await createPresignedUrlWithClient({
			region: REGION,
			bucket: BUCKET,
			key: KEY,
			commandType,
			altTag,
		});

		return uploadUrl;
	} catch (err) {
		console.error(err);
	}
};
