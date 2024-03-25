import jwt, { JwtPayload } from 'jsonwebtoken';

import { ISignTokenArgs } from '../types.d';

const secret = process.env.AUTH_SECRET ?? '';
const expiration = process.env.AUTH_EXPIRATION ?? '';

export const signToken = ({ username, _id }: ISignTokenArgs) => {
	const payload = { username, _id };
	return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};
export const authMiddleware = ({ req }: any) => {
	let token = req.body.token || req.query.token || req.headers.authorization;

	if (req.headers.authorization) {
		token = token.split(' ').pop().trim();
	}

	if (!token) {
		return req;
	}

	try {
		const { data } = jwt.verify(token, secret, { maxAge: expiration }) as JwtPayload;
		req.user = data;
	} catch {
		console.log('Invalid token');
	}

	return req;
};
