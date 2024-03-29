import https from 'https';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { fromIni } from '@aws-sdk/credential-providers';
import { HttpRequest } from '@smithy/protocol-http';
import { getSignedUrl, S3RequestPresigner } from '@aws-sdk/s3-request-presigner';
import { parseUrl } from '@smithy/url-parser';
import { formatUrl } from '@aws-sdk/util-format-url';
import { Hash } from '@smithy/hash-node';

const createPresignedUrlWithClient = ({ region, bucket, key }: { region: string; bucket: string; key: string }) => {
	const client = new S3Client({ region });
	const command = new PutObjectCommand({ Bucket: bucket, Key: key });
	return getSignedUrl(client, command, { expiresIn: 3600 });
};

export const getPresignedUrl = async (key: string) => {
	if (!key) {
		console.error('No key provided');
		throw new Error();
		return;
	}
	const REGION = process.env.S3_REGION ?? '';
	const BUCKET = process.env.S3_BUCKET_NAME ?? '';
	const KEY = key;

	try {
		const clientUrl = await createPresignedUrlWithClient({
			region: REGION,
			bucket: BUCKET,
			key: KEY,
		});

		return clientUrl;
	} catch (err) {
		console.error(err);
	}
};
