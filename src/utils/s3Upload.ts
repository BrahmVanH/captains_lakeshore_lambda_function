import { PutObjectCommand, DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const createPresignedUrlWithClient = ({ region, bucket, key, commandType }: { region: string; bucket: string; key: string; commandType: string }) => {
	const client = new S3Client({ region });
	let command;
	if (commandType === 'put') {
		command = new PutObjectCommand({ Bucket: bucket, Key: key });
	} else if (commandType === 'delete') {
		command = new DeleteObjectCommand({ Bucket: bucket, Key: key });
	} else {
		console.error('Invalid command type');
		throw new Error();
	}
	return getSignedUrl(client, command, { expiresIn: 3600 });
};

export const getPresignedUrl = async (key: string, commandType: string) => {
	if (!key) {
		console.error('No key provided');
		throw new Error();
	}
	const REGION = process.env.S3_REGION ?? '';
	const BUCKET = process.env.S3_BUCKET_NAME ?? '';
	const KEY = key;

	try {
		const clientUrl = await createPresignedUrlWithClient({
			region: REGION,
			bucket: BUCKET,
			key: KEY,
			commandType,
		});

		return clientUrl;
	} catch (err) {
		console.error(err);
	}
};
