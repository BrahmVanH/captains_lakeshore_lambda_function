import { Booking, User } from './models';
import { signToken } from './utils/auth';
import { getS3HomePageImgs, getS3HideawayPgImgs, getS3CottagePgImgs, getS3AboutPgImgs } from './utils/s3Query';
import { connectToDb } from './connection/db';
import { IQueryBookingsArgs, ICreateUserArgs, ILoginUserArgs, IRemoveUserArgs, ICreateBookingArgs, IRemoveBookingArgs } from './types';

const resolvers = {
	Query: {
		getAllUsers: async () => {
			try {
				await connectToDb();

				const allUsers = await User.find().exec();

				if (!allUsers) {
					throw new Error('Error fetching all users from database');
				}

				return allUsers;
			} catch (err) {
				console.error({ message: 'error in finding user', details: err });
				throw new Error('Error in finding users');
			}
		},
		queryUnavailableDatesByProperty: async (_: {}, args: IQueryBookingsArgs, __: any) => {
			try {
				await connectToDb();

				const { propertyName } = args;

				if (!propertyName) {
					throw new Error('No property name was presented for querying dates');
				}
				const dates = await Booking.find({ propertyName: propertyName });
				if (!dates) {
					throw new Error('Cannot find all dates in database');
				}
				return dates;
			} catch (err: any) {
				console.error({ message: 'error in finding dates', details: err });
				throw new Error('Error in finding dates');
			}
		},
		getHomePgImgs: async () => {
			try {
				const homePgImgs = await getS3HomePageImgs();
				if (homePgImgs instanceof Array) {
					console.error('Error in querying s3 for homepage images', homePgImgs);
					throw new Error('Error in querying s3 for homepage images');
				}
				// const { headerImgUrl, hideawayImgUrl, cottageImgUrl } = homePgImgs as { headerImgUrl: string; hideawayImgUrl: string; cottageImgUrl: string };

				if (!homePgImgs?.headerImgUrl || !homePgImgs?.hideawayImgUrl || !homePgImgs?.cottageImgUrl) {
					console.error('Error in querying s3 for homepage images');
					throw new Error('Something went wrong in fetching object from s3');
				}
				return homePgImgs;
			} catch (err: any) {
				console.error('Error in querying s3 for homepage images', err);
				throw new Error('Error in querying s3 for homepage images');
			}
		},
		getHideawayImgs: async () => {
			try {
				const hideawayImgs = await getS3HideawayPgImgs();

				if (!hideawayImgs) {
					throw new Error('Something went wrong in fetching hideaway object from S3');
				}
				return hideawayImgs;
			} catch (err: any) {
				return [{ message: 'Error in getHideawayImages...', details: err.message }];
			}
		},
		getCottageImgs: async () => {
			try {
				const cottageImgs = await getS3CottagePgImgs();

				if (!cottageImgs) {
					throw new Error('Something went wrong in fetching cottage object from S3');
				}
				return cottageImgs;
			} catch (err: any) {
				return [{ message: 'Error in getCottageImgs...', details: err.message }];
			}
		},
		getAboutPgImg: async () => {
			try {
				const aboutPgImgs = await getS3AboutPgImgs();
				if (!aboutPgImgs) {
					throw new Error('Something went wrong in fetching object from s3');
				}
				return aboutPgImgs;
			} catch (err: any) {
				return [{ message: 'Error in getHomePgImgs...', details: err.message }];
			}
		},
	},
	Mutation: {
		createUser: async (_: {}, { firstName, lastName, username, userPassword, adminCode }: ICreateUserArgs, __: any) => {
			try {
				await connectToDb();
				if (!firstName || !lastName || !username || !userPassword || !adminCode) {
					throw new Error('All fields must be filled to create a user.');
				} else if (adminCode !== process.env.ADMIN_CODE) {
					throw new Error('Incorrect admin code');
				} else {
					const newUser = await User.create({
						firstName,
						lastName,
						username,
						password: userPassword,
					});

					if (!newUser) {
						throw new Error('There was an error creating user. Try again.');
					}

					const token = signToken(newUser);

					return { token, newUser };
				}
			} catch (err: any) {
				throw new Error('Error in creating user: ' + err.message);
			}
		},
		loginUser: async (_: {}, { username, userPassword }: ILoginUserArgs, __: any) => {
			try {
				if (!username || !userPassword) {
					throw new Error('username and password fields must be filled to log in');
				}
				const user = await User.findOne({ username });
				if (!user) {
					throw new Error("Can't find user with that username");
				}

				const isPasswordValid = await user.comparePassword(userPassword);

				if (!isPasswordValid) {
					throw new Error('Incorrect Password!');
				}

				const token = signToken(user);
				return { token, user };
			} catch (err: any) {
				throw new Error('Error in logging in user: ' + err.message);
			}
		},
		removeUser: async (_: {}, { username, userPassword }: IRemoveUserArgs, __: any) => {
			try {
				if (!username) {
					throw new Error('username  fields must be filled to remove');
				}

				const user = await User.findOne({ username });

				if (!user) {
					throw new Error("Can't find user with that username");
				}

				const isPasswordValid = await user.comparePassword(userPassword);
				if (!isPasswordValid) {
					throw new Error('Incorrect Password!');
				}
				user.deleteOne();
				return { message: 'User has been deleted' };
			} catch (err: any) {
				throw new Error('Error in removing in user: ' + err.message);
			}
		},
		createBooking: async (_: {}, { propertyName, dateValue }: ICreateBookingArgs) => {
			try {
				if (!dateValue) {
					throw new Error('date object is undefined');
				} else if (!propertyName) {
					throw new Error('property name is undefined');
				}
				const unavailableDate = await Booking.create({ propertyName, dateValue });

				if (!unavailableDate) {
					throw new Error('Could not create new date');
				}
				return unavailableDate;
			} catch (err: any) {
				throw new Error('Error in creating date in db: ' + err.message);
			}
		},
		removeBooking: async (_: {}, { propertyName, dateValue }: IRemoveBookingArgs) => {
			try {
				if (!propertyName) {
					throw new Error('property name is undefined');
				} else if (!dateValue) {
					throw new Error('date object is undefined');
				}
				const unavailableDate = await Booking.findOneAndDelete({ propertyName, dateValue });
				if (!unavailableDate) {
					throw new Error('could not find unavailable date with that value...');
				}

				return unavailableDate;
			} catch (err: any) {
				throw new Error('Error in removing unavailable date from db: ' + err.message);
			}
		},
	},
};

module.exports = resolvers;
