import { Types } from "mongoose";

export interface IUser {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	comparePassword(password: string): Promise<boolean>;
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

