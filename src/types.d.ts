import { Types } from "mongoose";
import { User } from "../generated/graphql";

export interface IUser extends User {
	_id: string;
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	comparePassword?(password: string): Promise<boolean>;
}

export interface IBooking {
	propertyName: string;
	dateValue: string;
}

export interface IQueryBookingsArgs {
	propertyName: string;
}

export interface ICreateUserArgs {
	firstName: string;
	lastName: string;
	username: string;
	userPassword: string;
	adminCode: string;
}

export interface ILoginUserArgs {
	username: string;
	userPassword: string;
}

export interface IRemoveUserArgs {
	username: string;
	userPassword: string;
}

export interface ICreateBookingArgs {
	propertyName: string;
	dateValue: string;
}

export interface IRemoveBookingArgs {
	propertyName: string;
	dateValue: string;
}

export interface ISignTokenArgs {
	username: string;
	_id: Types.ObjectId;
}

export interface IUpdatePropertyArgs {
	propertyName: string;
	update: {
		propertyDescription?: string;
		amenities?: {
			amenityName: string;
			amenityIconJSX: string;
		}[];
		headerImgKey?: string;
	};
}

export interface IGalleryContent {
	original: string;
	thumbnail: string;
	originalAlt: string | null;
	thumbnailAlt: string | null;
}

export interface IHomeUrls {
	headerImgUrl: string;
	hideawayImgUrl: string;
	cottageImgUrl: string;
}

export interface IError {
	message: string;
	details: string;
}

export type S3Object = {
	Key: string;
	LastModified: Date;
	ETag: string;
	ChecksumAlgorithm: string[]; // You might want to specify the actual type here
	Size: number;
	StorageClass: string;
};