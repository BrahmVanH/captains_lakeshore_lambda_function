"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("./models");
const auth_1 = require("./utils/auth");
const s3Query_1 = require("./utils/s3Query");
const db_1 = require("./connection/db");
const s3Upload_1 = require("./utils/s3Upload");
const resolvers = {
    Query: {
        getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, db_1.connectToDb)();
                const allUsers = yield models_1.User.find();
                if (!allUsers) {
                    throw new Error('Error fetching all users from database');
                }
                return allUsers;
            }
            catch (err) {
                console.error({ message: 'error in finding user', details: err });
                throw new Error('Error in finding users: ' + err.message);
            }
        }),
        queryBookingsByProperty: (_1, _a, __1) => __awaiter(void 0, [_1, _a, __1], void 0, function* (_, { propertyId }, __) {
            try {
                yield (0, db_1.connectToDb)();
                if (!propertyId) {
                    throw new Error('No property name was presented for querying bookings');
                }
                const bookings = yield models_1.Booking.find({ propertyId: propertyId });
                if (!bookings) {
                    throw new Error('Cannot find booking in database');
                }
                return bookings;
            }
            catch (err) {
                console.error({ message: 'error in finding bookings', details: err });
                throw new Error('Error in finding dates: ' + err.message);
            }
        }),
        getHomePgImgs: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const homePgImgs = yield (0, s3Query_1.getS3HomePageImgs)();
                if (homePgImgs instanceof Array) {
                    console.error('Error in querying s3 for homepage images', homePgImgs);
                    throw new Error('Error in querying s3 for homepage images');
                }
                if (!(homePgImgs === null || homePgImgs === void 0 ? void 0 : homePgImgs.headerImgUrl) || !(homePgImgs === null || homePgImgs === void 0 ? void 0 : homePgImgs.hideawayImgUrl) || !(homePgImgs === null || homePgImgs === void 0 ? void 0 : homePgImgs.cottageImgUrl)) {
                    console.error('Error in querying s3 for homepage images');
                    throw new Error('Something went wrong in fetching object from s3');
                }
                return homePgImgs;
            }
            catch (err) {
                console.error('Error in querying s3 for homepage images', err);
                throw new Error('Error in querying s3 for homepage images: ' + err.message);
            }
        }),
        getHideawayImgs: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const hideawayImgs = yield (0, s3Query_1.getS3HideawayPgImgs)();
                if (!hideawayImgs) {
                    throw new Error('Something went wrong in fetching hideaway object from S3');
                }
                return hideawayImgs;
            }
            catch (err) {
                console.error('Error in getHideawayImgs...', err);
                throw new Error('Error in getting hideaway images from s3: ' + err.message);
            }
        }),
        getCottageImgs: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const cottageImgs = yield (0, s3Query_1.getS3CottagePgImgs)();
                if (!cottageImgs) {
                    throw new Error('Something went wrong in fetching cottage object from S3');
                }
                return cottageImgs;
            }
            catch (err) {
                console.error('Error in getCottageImgs...', err);
                throw new Error('Error in getting cottage images from s3: ' + err.message);
            }
        }),
        getAboutPgImg: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const aboutPgImgs = yield (0, s3Query_1.getS3AboutPgImgs)();
                if (!aboutPgImgs) {
                    throw new Error('Something went wrong in fetching object from s3');
                }
                return aboutPgImgs;
            }
            catch (err) {
                console.error('Error in querying s3 for about page image', err);
                throw new Error('Error in querying s3 for about page image: ' + err.message);
            }
        }),
        getPresignedS3Url: (_2, _b, __2) => __awaiter(void 0, [_2, _b, __2], void 0, function* (_, { imgKey, commandType, altTag }, __) {
            try {
                const preSignedUrl = yield (0, s3Upload_1.getPresignedUrl)(imgKey, commandType, altTag);
                if (!preSignedUrl) {
                    console.error('Error in getting presigned URL');
                    throw new Error('Error in getting presigned URL');
                }
                return preSignedUrl;
            }
            catch (err) {
                throw new Error('Error in getting upload url for s3: ' + err.message);
            }
        }),
        getPropertyInfo: (_3, _c, __3) => __awaiter(void 0, [_3, _c, __3], void 0, function* (_, { _id }, __) {
            try {
                yield (0, db_1.connectToDb)();
                if (!_id) {
                    throw new Error('No ID was presented for querying property info');
                }
                const propertyInfo = yield models_1.Property.findOne({ _id }).populate('bookings');
                if (!propertyInfo) {
                    throw new Error('Could not find property with that name');
                }
                return propertyInfo;
            }
            catch (err) {
                console.error('Error in getting property info', err);
                throw new Error('Error in getting property info: ' + err.message);
            }
        }),
        getProperties: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield (0, db_1.connectToDb)();
                const properties = yield models_1.Property.find().populate('bookings');
                if (!properties) {
                    throw new Error('Error fetching all properties from database');
                }
                return properties;
            }
            catch (err) {
                console.error({ message: 'error in finding properties', details: err });
                throw new Error('Error in finding properties: ' + err.message);
            }
        }),
    },
    Mutation: {
        createUser: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { firstName, lastName, username, userPassword, adminCode } = args.input;
            if (!firstName || !lastName || !username || !userPassword || !adminCode) {
                throw new Error('All fields must be filled to create a user.');
            }
            else if (adminCode !== process.env.ADMIN_CODE) {
                throw new Error('Incorrect admin code');
            }
            try {
                yield (0, db_1.connectToDb)();
                const user = yield models_1.User.create({
                    firstName,
                    lastName,
                    username,
                    password: userPassword,
                });
                if (!user) {
                    throw new Error('There was an error creating user. Try again.');
                }
                const token = (0, auth_1.signToken)(user);
                return { token, user };
            }
            catch (err) {
                throw new Error('Error in creating user: ' + err.message);
            }
        }),
        loginUser: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { username, userPassword } = args.input;
                yield (0, db_1.connectToDb)();
                if (!username || !userPassword) {
                    throw new Error('username and password fields must be filled to log in');
                }
                const user = yield models_1.User.findOne({ username });
                if (!(user === null || user === void 0 ? void 0 : user.comparePassword)) {
                    throw new Error("Can't find user with that username");
                }
                const isPasswordValid = yield user.comparePassword(userPassword);
                if (!isPasswordValid) {
                    throw new Error('Incorrect Password!');
                }
                const token = (0, auth_1.signToken)(user);
                return { token, user };
            }
            catch (err) {
                throw new Error('Error in logging in user: ' + err.message);
            }
        }),
        removeUser: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { username, userPassword } = args.input;
                yield (0, db_1.connectToDb)();
                if (!username) {
                    throw new Error('username  fields must be filled to remove');
                }
                const user = yield models_1.User.findOne({ username });
                if (!(user === null || user === void 0 ? void 0 : user.comparePassword)) {
                    throw new Error("Can't find user with that username");
                }
                const isPasswordValid = yield user.comparePassword(userPassword);
                if (!isPasswordValid) {
                    throw new Error('Incorrect Password!');
                }
                const deletedUser = yield models_1.User.findOneAndDelete({ username });
                if (!deletedUser) {
                    throw new Error('Could not delete user');
                }
                return { token: '', user: deletedUser };
            }
            catch (err) {
                throw new Error('Error in removing in user: ' + err.message);
            }
        }),
        createBooking: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { bookings } = args.input;
                yield (0, db_1.connectToDb)();
                if (!bookings || bookings.length === 0) {
                    throw new Error('No bookings provided to create');
                }
                const createdBookings = yield models_1.Booking.create(bookings);
                if (!createdBookings) {
                    throw new Error('Could not create new date');
                }
                return createdBookings;
            }
            catch (err) {
                throw new Error('Error in creating booking in db: ' + err.message);
            }
        }),
        removeBooking: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const { bookingIds } = args.input;
                yield (0, db_1.connectToDb)();
                if (!bookingIds || bookingIds.length === 0) {
                    throw new Error('booking ID is undefined');
                }
                const booking = yield models_1.Booking.deleteMany({ _id: { $in: bookingIds } });
                if (!booking) {
                    throw new Error('could not find unavailable date with that value...');
                }
                return booking;
            }
            catch (err) {
                throw new Error('Error in removing unavailable booking from db: ' + err.message);
            }
        }),
        updatePropertyInfo: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            if (!args.input) {
                throw new Error('No input object was presented for updating property info');
            }
            const { _id, update } = args.input;
            if (!_id) {
                throw new Error('Property name is undefined');
            }
            if (!(update === null || update === void 0 ? void 0 : update.propertyDescription) || !(update === null || update === void 0 ? void 0 : update.amenities) || !(update === null || update === void 0 ? void 0 : update.headerImgKey)) {
                throw new Error('Update object is undefined');
            }
            try {
                yield (0, db_1.connectToDb)();
                const property = yield models_1.Property.findOneAndUpdate({ _id }, { $set: update });
                if (!property) {
                    throw new Error('Could not find property with that name');
                }
                return property;
            }
            catch (err) {
                throw new Error('Error in updating property info: ' + err.message);
            }
        }),
        deleteS3Objects: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const { imgKeys } = args === null || args === void 0 ? void 0 : args.input;
            if (!imgKeys || imgKeys.length === 0) {
                throw new Error('No key was presented for deleting object');
            }
            try {
                yield (0, db_1.connectToDb)();
                const response = yield (0, s3Upload_1.deleteS3Objects)(imgKeys);
                if (!response) {
                    throw new Error('Could not delete object from s3');
                }
                return response;
            }
            catch (err) {
                throw new Error('Error in deleting object from s3: ' + err.message);
            }
        }),
    },
};
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map