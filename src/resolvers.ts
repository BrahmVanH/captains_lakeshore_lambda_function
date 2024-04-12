import { Booking, User, Property } from './models';
import { signToken } from './utils/auth';
import { getS3HomePageImgs, getS3HideawayPgImgs, getS3CottagePgImgs, getS3AboutPgImgs } from './utils/s3Query';
import { connectToDb } from './connection/db';
import { IQueryBookingsArgs, ILoginUserArgs, IRemoveUserArgs, ICreateBookingArgs, IRemoveBookingArgs, IUser, IUpdatePropertyArgs } from './types';
import {
	CreateUserInput,
	Resolvers,
	MutationCreateUserArgs,
	MutationLoginUserArgs,
	MutationCreateBookingArgs,
	MutationRemoveUserArgs,
	MutationRemoveBookingArgs,
	MutationUpdatePropertyInfoArgs,
	Property as IProperty,
	MutationDeleteS3ObjectsArgs,
	QueryQueryBookingsByPropertyArgs,
	RemoveBookingResponse,
} from './generated/graphql';
import { getPresignedUrl, deleteS3Objects } from './utils/s3Upload';

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
		queryBookingsByProperty: async (_: {}, { propertyId }: QueryQueryBookingsByPropertyArgs, __: any) => {
			try {
				await connectToDb();

				if (!propertyId) {
					throw new Error('No property name was presented for querying bookings');
				}
				const bookings = await Booking.find({ propertyId: propertyId });
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
		getPresignedS3Url: async (_: {}, { imgKey, commandType, altTag }: { imgKey: string; commandType: string; altTag: string }, __: any) => {
			try {
				console.log('imgKey', imgKey, 'commandType', commandType, 'altTag', altTag);
				const preSignedUrl = await getPresignedUrl(imgKey, commandType, altTag);
				if (!preSignedUrl) {
					console.error('Error in getting presigned URL');
					throw new Error('Error in getting presigned URL');
				}
				console.log('preSignedUrl', preSignedUrl);
				return preSignedUrl;
			} catch (err: any) {
				console.log('Error in getting Upload URL for s3', err);
				throw new Error('Error in getting upload url for s3: ' + err.message);
			}
		},
		getPropertyInfo: async (_: {}, { _id }: { _id: string }, __: any) => {
			try {
				await connectToDb();

				if (!_id) {
					throw new Error('No ID was presented for querying property info');
				}

				const propertyInfo: IProperty | null = await Property.findOne({ _id }).populate('bookings');

				if (!propertyInfo) {
					throw new Error('Could not find property with that name');
				}

				return propertyInfo;
			} catch (err: any) {
				console.error('Error in getting property info', err);
				throw new Error('Error in getting property info: ' + err.message);
			}
		},
		getProperties: async () => {
			try {
				await connectToDb();

				const properties: IProperty[] = await Property.find().populate('bookings');

				if (!properties) {
					throw new Error('Error fetching all properties from database');
				}

				return properties;
			} catch (err: any) {
				console.error({ message: 'error in finding properties', details: err });
				throw new Error('Error in finding properties: ' + err.message);
			}
		},
	},
	Mutation: {
		createUser: async (_: {}, args: MutationCreateUserArgs, __: any) => {
			const { firstName, lastName, username, userPassword, adminCode } = args.input;

			if (!firstName || !lastName || !username || !userPassword || !adminCode) {
				throw new Error('All fields must be filled to create a user.');
			} else if (adminCode !== process.env.ADMIN_CODE) {
				throw new Error('Incorrect admin code');
			}

			try {
				await connectToDb();

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
		loginUser: async (_: {}, args: MutationLoginUserArgs, __: any) => {
			try {
				const { username, userPassword } = args.input as ILoginUserArgs;
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
		removeUser: async (_: {}, args: MutationRemoveUserArgs, __: any) => {
			try {
				const { username, userPassword } = args.input as IRemoveUserArgs;
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
		createBooking: async (_: {}, args: MutationCreateBookingArgs, __: any) => {
			try {
				const { bookings } = args.input;

				await connectToDb();
				if (!bookings || bookings.length === 0) {
					throw new Error('No bookings provided to create');
				}
				const createdBookings = await Booking.create(bookings);

				if (!createdBookings) {
					throw new Error('Could not create new date');
				}
				return createdBookings;
			} catch (err: any) {
				throw new Error('Error in creating booking in db: ' + err.message);
			}
		},
		removeBooking: async (_: {}, args: MutationRemoveBookingArgs, __: any) => {
			try {
				const { bookingIds } = args.input;
				await connectToDb();
				if (!bookingIds || bookingIds.length === 0) {
					throw new Error('booking ID is undefined');
				}
				const booking = await Booking.deleteMany({ _id: { $in: bookingIds } });
				if (!booking) {
					throw new Error('could not find unavailable date with that value...');
				}

				return booking;
			} catch (err: any) {
				throw new Error('Error in removing unavailable booking from db: ' + err.message);
			}
		},
		updatePropertyInfo: async (_: {}, args: MutationUpdatePropertyInfoArgs, __: any) => {
			if (!args.input) {
				throw new Error('No input object was presented for updating property info');
			}

			const { _id, update } = args.input;

			if (!_id) {
				throw new Error('Property name is undefined');
			}

			if (!update?.propertyDescription || !update?.amenities || !update?.headerImgKey) {
				throw new Error('Update object is undefined');
			}
			try {
				await connectToDb();

				const property = await Property.findOneAndUpdate({ _id }, { $set: update });

				if (!property) {
					throw new Error('Could not find property with that name');
				}

				return property;
			} catch (err: any) {
				throw new Error('Error in updating property info: ' + err.message);
			}
		},
		deleteS3Objects: async (_: {}, args: MutationDeleteS3ObjectsArgs, __: any) => {
			const { imgKeys } = args?.input;
			if (!imgKeys || imgKeys.length === 0) {
				throw new Error('No key was presented for deleting object');
			}
			try {
				await connectToDb();

				const response = await deleteS3Objects(imgKeys);

				if (!response) {
					throw new Error('Could not delete object from s3');
				}
				return response;
			} catch (err: any) {
				throw new Error('Error in deleting object from s3: ' + err.message);
			}
		},
	},
};

export default resolvers;
