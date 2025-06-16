import { set, connect } from 'mongoose';
import dotenv from 'dotenv';

export const connectToDb = async () => {
	dotenv.config();
	const MONGODB_URI = process.env.MONGODB_URI ?? '';

	try {
		set('strictQuery', true);
		await connect(MONGODB_URI);
	} catch (error) {
		console.error('Error connecting to MongoDB', error);
		throw new Error('Error connecting to MongoDB');
	}
};
