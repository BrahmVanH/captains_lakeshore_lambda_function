import { Booking, User } from './models';
import { signToken } from './utils/auth';
import { getS3HomePageImgs, getS3HideawayPgImgs, getS3CottagePgImgs, getS3AboutPgImgs } from './utils/s3Query';
import { connectToDb } from './connection/db';
import { IQueryBookingsArgs, ILoginUserArgs, IRemoveUserArgs, ICreateBookingArgs, IRemoveBookingArgs, IUser } from './types';
import { CreateUserInput, MutationCreateUserArgs, Resolvers } from './generated/graphql';

const resolvers: Resolvers = {
	Query: {
		getAllUsers: async () => {
			try {
				await connectToDb();

				const allUsers: IUser[] = await User.find();

				if (!allUsers) {
					throw new Error('Error fetching all users from database');
				}

				return allUsers;
			} catch (err: any) {
				console.error({ message: 'error in finding user', details: err });
				throw new Error('Error in finding users: ' + err.message);
			}
		},
		queryBookingsByProperty: async (_: {}, { propertyName }: IQueryBookingsArgs, __: any) => {
			try {
				await connectToDb();

				if (!propertyName) {
					throw new Error('No property name was presented for querying bookings');
				}
				const bookings = await Booking.find({ propertyName: propertyName });
				if (!bookings) {
					throw new Error('Cannot find booking in database');
				}
				return bookings;
			} catch (err: any) {
				console.error({ message: 'error in finding bookings', details: err });
				throw new Error('Error in finding dates: ' + err.message);
			}
		},
		getHomePgImgs: async () => {
			try {
				const homePgImgs = await getS3HomePageImgs();
				if (homePgImgs instanceof Array) {
					console.error('Error in querying s3 for homepage images', homePgImgs);
					throw new Error('Error in querying s3 for homepage images');
				}

				if (!homePgImgs?.headerImgUrl || !homePgImgs?.hideawayImgUrl || !homePgImgs?.cottageImgUrl) {
					console.error('Error in querying s3 for homepage images');
					throw new Error('Something went wrong in fetching object from s3');
				}
				return homePgImgs;
			} catch (err: any) {
				console.error('Error in querying s3 for homepage images', err);
				throw new Error('Error in querying s3 for homepage images: ' + err.message);
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
				console.error('Error in getHideawayImgs...', err);
				throw new Error('Error in getting hideaway images from s3: ' + err.message);
			}
		},
		getCottageImgs: async () => {
			try {
				const cottageImgs = await getS3CottagePgImgs();
				console.log('cottageImgs', cottageImgs);

				if (!cottageImgs) {
					throw new Error('Something went wrong in fetching cottage object from S3');
				}
				return cottageImgs;
			} catch (err: any) {
				console.error('Error in getCottageImgs...', err);
				throw new Error('Error in getting cottage images from s3: ' + err.message);
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
				console.error('Error in querying s3 for about page image', err);
				throw new Error('Error in querying s3 for about page image: ' + err.message);
			}
		},
	},
	Mutation: {
		createUser: async (_: {}, args: MutationCreateUserArgs, __: any) => {
			const { firstName, lastName, username, userPassword, adminCode } = args.input as CreateUserInput;
			try {
				await connectToDb();
				if (!firstName || !lastName || !username || !userPassword || !adminCode) {
					throw new Error('All fields must be filled to create a user.');
				} else if (adminCode !== process.env.ADMIN_CODE) {
					throw new Error('Incorrect admin code');
				}
				const user: IUser = await User.create({
					firstName,
					lastName,
					username,
					password: userPassword,
				});

				if (!user) {
					throw new Error('There was an error creating user. Try again.');
				}

				const token = signToken(user);

				return { token, user };
			} catch (err: any) {
				throw new Error('Error in creating user: ' + err.message);
			}
		},
		loginUser: async (_: {}, { username, userPassword }: ILoginUserArgs, __: any) => {
			try {
				await connectToDb();
				if (!username || !userPassword) {
					throw new Error('username and password fields must be filled to log in');
				}

				const user: IUser | null = await User.findOne({ username });
				if (!user?.comparePassword) {
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
				await connectToDb();
				if (!username) {
					throw new Error('username  fields must be filled to remove');
				}

				const user: IUser | null = await User.findOne({ username });

				if (!user?.comparePassword) {
					throw new Error("Can't find user with that username");
				}

				const isPasswordValid = await user.comparePassword(userPassword);
				if (!isPasswordValid) {
					throw new Error('Incorrect Password!');
				}
				const deletedUser = await User.findOneAndDelete({ username });
				if (!deletedUser) {
					throw new Error('Could not delete user');
				}
				return { token: '', user: deletedUser };
			} catch (err: any) {
				throw new Error('Error in removing in user: ' + err.message);
			}
		},
		createBooking: async (_: {}, { propertyName, dateValue }: ICreateBookingArgs, __: any) => {
			try {
				await connectToDb();
				if (!dateValue) {
					throw new Error('date object is undefined');
				} else if (!propertyName) {
					throw new Error('property name is undefined');
				}
				const booking = await Booking.create({ propertyName, dateValue });

				if (!booking) {
					throw new Error('Could not create new date');
				}
				return booking;
			} catch (err: any) {
				throw new Error('Error in creating booking in db: ' + err.message);
			}
		},
		removeBooking: async (_: {}, { propertyName, dateValue }: IRemoveBookingArgs, __: any) => {
			try {
				await connectToDb();
				if (!propertyName) {
					throw new Error('property name is undefined');
				} else if (!dateValue) {
					throw new Error('date value is undefined');
				}
				const booking = await Booking.findOneAndDelete({ propertyName, dateValue });
				if (!booking) {
					throw new Error('could not find unavailable date with that value...');
				}

				return booking;
			} catch (err: any) {
				throw new Error('Error in removing unavailable booking from db: ' + err.message);
			}
		},
	},
};

export default resolvers;
