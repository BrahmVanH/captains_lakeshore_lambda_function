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
	_id: string;
}