export interface IUser {
	firstName: string;
	lastName: string;
	username: string;
	password: string;
	comparePassword(password: string): Promise<boolean>;
}

export interface IBookingDate {
	propertyName: string;
	dateValue: string;
}
