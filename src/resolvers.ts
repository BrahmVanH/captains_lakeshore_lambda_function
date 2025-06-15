import { Booking, User, Property } from '@/models';
import { signToken } from './utils/auth';
import { getS3HomePageImgs, getS3HideawayPgImgs, getS3CottagePgImgs, getS3AboutPgImgs, handleSignUrl, getImgTag } from './utils/s3Query';
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
	MutationCreatePropertyArgs,
	MutationRemovePropertyArgs,
	MutationUpdatePropertyAmenitiesArgs,
	MutationUpdatePropertyDescriptionArgs,
	MutationUpdatePropertyHeaderImgArgs,
	MutationUpdatePropertyOverviewItemsArgs,
	MutationUpdatePropertyRoomsAndBedsArgs,
	MutationUpdatePropertyNameArgs,
	MutationUpdatePropertyHouseRulesArgs,
	MutationUpdatePropertyImportantInfoArgs,
	MutationUpdatePropertySpacesArgs,
	MutationCreateAmenityArgs,
	MutationUpdateAmenityArgs,
	MutationRemoveAmenityArgs,
	MutationCreateSpaceArgs,
	MutationUpdateSpaceArgs,
	MutationRemoveSpaceArgs,
	Space as SpaceType,
	Amenity,
} from './generated/graphql';
import { getPresignedUrl, deleteS3Objects } from './utils/s3Upload';
import AmenityModel from './models/Amenity';
import Space from './models/Space';

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
		getSpaces: async () => {
			try {
				await connectToDb();

				const spaces: SpaceType[] = await Space.find();

				if (!spaces) {
					throw new Error('Error fetching all spaces from database');
				}

				return spaces;
			} catch (err: any) {
				console.error({ message: 'error in finding spaces', details: err });
				throw new Error('Error in finding spaces: ' + err.message);
			}
		},
		getAmenities: async () => {
			try {
				await connectToDb();
				const amenities: Amenity[] = await AmenityModel.find();
				if (!amenities) {
					throw new Error('Error fetching all amenities from database');
				}
				return amenities;
			} catch (err: any) {
				console.error({ message: 'error in finding amenities', details: err });
				throw new Error('Error in finding amenities: ' + err.message);
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
		getImg: async (_: {}, { imgKey }: { imgKey: string; }, __: any) => {
			try {
				const preSignedUrl = await handleSignUrl(imgKey)
				if (!preSignedUrl) {
					console.error('Error in getting presigned URL');
					throw new Error('Error in getting presigned URL');
				}
				const alt = await getImgTag(imgKey);
				if (!alt) {
					console.error('Error in getting alt tag');
					throw new Error('Error in getting alt tag');
				}
				return { url: preSignedUrl, alt };
			} catch (err: any) {
				throw new Error('Error in getting upload url for s3: ' + err.message);
			}
		},
		getImgs: async (_: {}, { imgKeys }: { imgKeys: string[]; }, __: any) => {
			try {

				const preSignedUrls = await Promise.all(imgKeys.map(async (key: string, i: number) =>
					await handleSignUrl(key)
				)).catch(e => {
					throw new Error(`Error in presigning urls for imgs: ${e}`)
				})

				const filteredUrls = preSignedUrls.filter((url) => url !== undefined)

				if (!filteredUrls) {
					console.error('Error in getting presigned URL');
					throw new Error('Error in getting presigned URL');
				}

				const altTags = await Promise.all(imgKeys.map(async (key: string, i: number) =>
					await getImgTag(key)
				)).catch(e => {
					throw new Error(`Error in getting alt tags for imgs: ${e}`)
				})

				console.log("altTags: ", altTags)

				const correctedAltTags = altTags.map(t => t ?? "placeholder");
				const imgs = filteredUrls.map((url, i) => ({ url, alt: correctedAltTags[i] ?? "" }))

				return imgs;
			} catch (err: any) {
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

				const properties: IProperty[] = await Property.find().populate('bookings').populate('amenities').populate('spacesItems').populate('overviewItems');

				if (!properties) {
					throw new Error('Error fetching all properties from database');
				}

				return properties;
			} catch (err: any) {
				console.error({ message: 'error in finding properties', details: err });
				throw new Error('Error in finding properties: ' + err.message);
			}
		},
		getPropertiesLite: async () => {
			try {
				await connectToDb();

				const properties: IProperty[] = await Property.find();

				if (!properties) {
					throw new Error('Error fetching all properties from database');
				}

				return properties.map(({ _id, propertyName, propertyDescription, headerImgKey }) => ({
					_id,
					propertyName,
					propertyDescription: propertyDescription ?? '',
					headerImgKey: headerImgKey ?? '',
				}));
			} catch (err: any) {
				console.error({ message: 'error in finding properties', details: err });
				throw new Error('Error in finding properties: ' + err.message);
			}
		},
		getPropertyById: async (_: {}, { _id }: { _id: string }, __: any) => {
			try {
				console.log('getting property by id');
				await connectToDb();
				if (!_id) {
					throw new Error('No ID was presented for querying property');
				}
				const property: IProperty | null = await Property.findOne({ _id }).populate('bookings').populate('amenities').populate('spacesItems').populate('overviewItems');
				if (!property) {
					throw new Error('Could not find property with that name');
				}
				return property;
			} catch (err: any) {
				console.error('Error in getting property info', err);
				throw new Error('Error in getting property info: ' + err.message);
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
		createProperty: async (_: {}, args: MutationCreatePropertyArgs, __: any) => {
			if (!args.input) {
				throw new Error('No input object was presented for creating property');
			}
			const { propertyName } = args.input;
			if (!propertyName) {
				throw new Error('Property name is undefined');
			}
			try {
				await connectToDb();
				const property = await Property.create(args.input);
				if (!property) {
					throw new Error('Could not create property');
				}
				return property;
			} catch (err: any) {
				throw new Error('Error in creating property: ' + err.message);
			}
		},
		updatePropertyAmenities: async (_: {}, args: MutationUpdatePropertyAmenitiesArgs, __: any) => {
			if (!args.input) {
				throw new Error('No input object was presented for updating property');
			}
			const { _id, amenities } = args.input;
			if (!_id) {
				throw new Error('Property name is undefined');
			}
			if (!amenities) {
				throw new Error('Update object is undefined');
			}
			try {
				await connectToDb();
				const property = await Property.findOneAndUpdate({ _id }, { $set: { amenities } }, { new: true }).populate('amenities');
				if (!property) {
					throw new Error('Could not find property with that name');
				}
				return property;
			} catch (err: any) {
				throw new Error('Error in updating property: ' + err.message);
			}
		},
		updatePropertyDescription: async (_: {}, args: MutationUpdatePropertyDescriptionArgs, __: any) => {
			if (!args.input) {
				throw new Error('No input object was presented for updating property');
			}
			const { _id, propertyDescription } = args.input;
			if (!_id) {
				throw new Error('Property name is undefined');
			}
			if (!propertyDescription) {
				throw new Error('Update object is undefined');
			}
			try {
				await connectToDb();
				const property = await Property.findOneAndUpdate({ _id }, { $set: { propertyDescription } });
				if (!property) {
					throw new Error('Could not find property with that name');
				}
				return property;
			} catch (err: any) {
				throw new Error('Error in updating property: ' + err.message);
			}
		},
		updatePropertyHeaderImg: async (_: {}, args: MutationUpdatePropertyHeaderImgArgs, __: any) => {
			if (!args.input) {
				throw new Error('No input object was presented for updating property');
			}
			const { _id, headerImgKey } = args.input;
			if (!_id) {
				throw new Error('Property name is undefined');
			}
			if (!headerImgKey) {
				throw new Error('Update object is undefined');
			}
			try {
				await connectToDb();
				const property = await Property.findOneAndUpdate({ _id }, { $set: { headerImgKey } });
				if (!property) {
					throw new Error('Could not find property with that name');
				}
				return property;
			} catch (err: any) {
				throw new Error('Error in updating property: ' + err.message);
			}
		},
		updatePropertyOverviewItems: async (_: {}, args: MutationUpdatePropertyOverviewItemsArgs, __: any) => {
			if (!args.input) {
				throw new Error('No input object was presented for updating property');
			}
			const { _id, overviewItems } = args.input;
			if (!_id) {
				throw new Error('Property name is undefined');
			}
			if (!overviewItems) {
				throw new Error('Update object is undefined');
			}
			console.log('overviewItems', overviewItems);
			try {
				await connectToDb();
				const property = await Property.findOneAndUpdate({ _id }, { $set: { overviewItems: overviewItems } }, { new: true });
				if (!property) {
					throw new Error('Could not find property with that name');
				}
				return property;
			} catch (err: any) {
				throw new Error('Error in updating property: ' + err.message);
			}
		},
		updatePropertyRoomsAndBeds: async (_: {}, args: MutationUpdatePropertyRoomsAndBedsArgs, __: any) => {
			if (!args.input) {
				throw new Error('No input object was presented for updating property');
			}
			const { _id, roomsAndBeds } = args.input;
			if (!_id) {
				throw new Error('Property name is undefined');
			}
			if (!roomsAndBeds) {
				throw new Error('Update object is undefined');
			}
			try {
				await connectToDb();
				const property = await Property.findOneAndUpdate({ _id }, { $set: { roomsAndBeds } }, { new: true });
				if (!property) {
					throw new Error('Could not find property with that name');
				}
				return property;
			} catch (err: any) {
				throw new Error('Error in updating property: ' + err.message);
			}
		},
		updatePropertyName: async (_: {}, args: MutationUpdatePropertyNameArgs, __: any) => {
			if (!args.input) {
				throw new Error('No input object was presented for updating property');
			}
			const { _id, propertyName } = args.input;
			if (!_id) {
				throw new Error('Property name is undefined');
			}
			if (!propertyName) {
				throw new Error('Update object is undefined');
			}
			try {
				await connectToDb();
				const property = await Property.findOneAndUpdate({ _id }, { $set: { propertyName } }, { new: true });
				if (!property) {
					throw new Error('Could not find property with that name');
				}
				return property;
			} catch (err: any) {
				throw new Error('Error in updating property: ' + err.message);
			}
		},
		updatePropertyHouseRules: async (_: {}, args: MutationUpdatePropertyHouseRulesArgs, __: any) => {
			if (!args.input) {
				throw new Error('No input object was presented for updating property');
			}
			const { _id, houseRules } = args.input;
			if (!_id) {
				throw new Error('Property name is undefined');
			}
			if (!houseRules) {
				throw new Error('Update object is undefined');
			}
			try {
				await connectToDb();
				const property = await Property.findOneAndUpdate({ _id }, { $set: { houseRules } }, { new: true });
				if (!property) {
					throw new Error('Could not find property with that name');
				}
				return property;
			} catch (err: any) {
				throw new Error('Error in updating property: ' + err.message);
			}
		},
		updatePropertyImportantInfo: async (_: {}, args: MutationUpdatePropertyImportantInfoArgs, __: any) => {
			if (!args.input) {
				throw new Error('No input object was presented for updating property');
			}
			const { _id, importantInfo } = args.input;
			if (!_id) {
				throw new Error('Property name is undefined');
			}
			if (!importantInfo) {
				throw new Error('Update object is undefined');
			}
			try {
				await connectToDb();
				const property = await Property.findOneAndUpdate({ _id }, { $set: { importantInfo } }, { new: true });
				if (!property) {
					throw new Error('Could not find property with that name');
				}
				return property;
			} catch (err: any) {
				throw new Error('Error in updating property: ' + err.message);
			}
		},
		updatePropertySpaces: async (_: {}, args: MutationUpdatePropertySpacesArgs, __: any) => {
			if (!args.input) {
				throw new Error('No input object was presented for updating property');
			}
			const { _id, spacesItems } = args.input;
			if (!_id) {
				throw new Error('Property name is undefined');
			}
			if (!spacesItems) {
				throw new Error('Update object is undefined');
			}
			try {
				await connectToDb();
				const property = await Property.findOneAndUpdate({ _id }, { $set: { spacesItems } }, { new: true }).populate('spacesItems');
				if (!property) {
					throw new Error('Could not find property with that name');
				}
				return property;
			} catch (err: any) {
				throw new Error('Error in updating property: ' + err.message);
			}
		},
		removeProperty: async (_: {}, args: MutationRemovePropertyArgs, __: any) => {
			if (!args._id) {
				throw new Error('No input object was presented for removing property');
			}
			const { _id } = args;
			if (!_id) {
				throw new Error('Property name is undefined');
			}
			try {
				await connectToDb();
				const property = await Property.findOneAndDelete({ _id });
				if (!property) {
					throw new Error('Could not find property with that name');
				}
				return property;
			} catch (err: any) {
				throw new Error('Error in removing property: ' + err.message);
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

				const property = await Property.findOneAndUpdate({ _id }, { $set: update }, { new: true });

				if (!property) {
					throw new Error('Could not find property with that name');
				}

				return property;
			} catch (err: any) {
				throw new Error('Error in updating property info: ' + err.message);
			}
		},
		createAmenity: async (_: {}, args: MutationCreateAmenityArgs, __: any) => {
			if (!args.input) {
				throw new Error('No input object was presented for creating amenity');
			}
			const { amenityName, amenityType } = args.input;
			if (!amenityName || !amenityType) {
				throw new Error('Amenity name or type is undefined');
			}
			try {
				await connectToDb();
				const amenity = await AmenityModel.create(args.input);
				if (!amenity) {
					throw new Error('Could not create amenity');
				}
				return amenity;
			} catch (err: any) {
				throw new Error('Error in creating amenity: ' + err.message);
			}
		},
		updateAmenity: async (_: {}, args: MutationUpdateAmenityArgs, __: any) => {
			if (!args.input) {
				throw new Error('No input object was presented for updating amenity');
			}
			const { amenityName, amenityType } = args.input;
			const { _id } = args;

			if (!_id) {
				throw new Error('Amenity name is undefined');
			}
			if (!amenityName || !amenityType) {
				throw new Error('Update object is undefined');
			}
			try {
				await connectToDb();
				const amenity = await AmenityModel.findOneAndUpdate({ _id }, { $set: args.input }, { new: true }).populate('amenities');
				if (!amenity) {
					throw new Error('Could not find amenity with that name');
				}
				return amenity;
			} catch (err: any) {
				throw new Error('Error in updating amenity: ' + err.message);
			}
		},
		removeAmenity: async (_: {}, args: MutationRemoveAmenityArgs, __: any) => {
			if (!args._id) {
				throw new Error('No input object was presented for removing amenity');
			}
			const { _id } = args;
			if (!_id) {
				throw new Error('Amenity name is undefined');
			}
			try {
				await connectToDb();
				const properties = await Property.find({ amenities: _id });
				if (properties.length > 0) {
					await Property.updateMany({ amenities: _id }, { $pull: { amenities: _id } });
				}
				const amenity = await AmenityModel.findOneAndDelete({ _id });
				if (!amenity) {
					throw new Error('Could not find amenity with that name');
				}
				return amenity;
			} catch (err: any) {
				throw new Error('Error in removing amenity: ' + err.message);
			}
		},
		createSpace: async (_: {}, args: MutationCreateSpaceArgs, __: any) => {
			if (!args.input) {
				throw new Error('No input object was presented for creating space');
			}
			const { name, icon } = args.input;
			if (!name || !icon) {
				throw new Error('Space name or icon is undefined');
			}
			try {
				await connectToDb();
				const space = await Space.create(args.input);
				if (!space) {
					throw new Error('Could not create space');
				}
				return space;
			} catch (err: any) {
				throw new Error('Error in creating space: ' + err.message);
			}
		},
		updateSpace: async (_: {}, args: MutationUpdateSpaceArgs, __: any) => {
			if (!args.input) {
				throw new Error('No input object was presented for updating space');
			}
			const { name, icon } = args.input;
			const { _id } = args;

			if (!_id) {
				throw new Error('Space name is undefined');
			}
			if (!name || !icon) {
				throw new Error('Update object is undefined');
			}
			try {
				await connectToDb();
				const space = await Space.findOneAndUpdate({ _id }, { $set: args.input }, { new: true });
				if (!space) {
					throw new Error('Could not find space with that name');
				}
				return space;
			} catch (err: any) {
				throw new Error('Error in updating space: ' + err.message);
			}
		},
		removeSpace: async (_: {}, args: MutationRemoveSpaceArgs, __: any) => {
			if (!args._id) {
				throw new Error('No input object was presented for removing space');
			}
			const { _id } = args;
			if (!_id) {
				throw new Error('Space name is undefined');
			}
			try {
				await connectToDb();
				const properties = await Property.find({ spacesItems: _id });
				if (properties.length > 0) {
					await Property.updateMany({ spacesItems: _id }, { $pull: { spacesItems: _id } });
				}
				const space = await Space.findOneAndDelete({ _id });
				if (!space) {
					throw new Error('Could not find space with that name');
				}
				return space;
			} catch (err: any) {
				throw new Error('Error in removing space: ' + err.message);
			}
		},
		deleteS3Objects: async (_: {}, args: MutationDeleteS3ObjectsArgs, __: any) => {
			const { imgKeys } = args.input;
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
		createSeedAmenities: async (_: {}, __: any) => {
			const amenitiesSeedData = await import('./seed/amenities.json');
			try {
				await connectToDb();
				if (!amenitiesSeedData) {
					throw new Error('No seed data was presented for creating amenities');
				}
				// const amenities = await Amenity.insertMany(amenitiesSeedData);
				const amenities = await AmenityModel.create(amenitiesSeedData.default);

				if (!amenities) {
					throw new Error('Could not create amenities');
				}
				return amenities;
			} catch (err: any) {
				throw new Error('Error in creating seed amenities' + err.message);
			}
		},
		createSeedSpaces: async (_: {}, __: any) => {
			const spacesSeedData = await import('./seed/spaces.json');
			try {
				await connectToDb();
				if (!spacesSeedData) {
					throw new Error('No seed data was presented for creating spaces');
				}
				const spaces = await Space.create(spacesSeedData.default);

				if (!spaces) {
					throw new Error('Could not create spaces');
				}
				return spaces;
			} catch (err: any) {
				throw new Error('Error in creating seed spaces' + err.message);
			}
		},
	},
};

export default resolvers;
