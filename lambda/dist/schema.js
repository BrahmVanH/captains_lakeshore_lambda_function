"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `#graphql


 type User {
	_id: ID
	firstName: String!
	lastName: String!
	username: String!
	password: String
}

type Amenity {
	amenityName: String!
	amenityType: String!
}

type Property {
	_id: ID!
	propertyName: String!
	propertyDescription: String!
	amenities: [Amenity!]!
	headerImgKey: String!
}

type Auth {
	token: ID!
	user: User!
}

type Booking {
	_id: ID!
	propertyName: String!
	dateValue: String!
}

type imageObject {
	imgKey: String!
	original: String!
	thumbnail: String!
	originalAlt: String!
	thumbnailAlt: String!
}

type homePgImgPack {
	headerImgUrl: String!
	hideawayImgUrl: String!
	cottageImgUrl: String!
}

type hideawayImgPack {
	headerUrl: String!
	galleryArray: [imageObject!]!
}

type cottageImgPack {
	headerUrl: String!
	galleryArray: [imageObject!]!
}

input CreateUserInput {
	firstName: String!
	lastName: String!
	username: String!
	userPassword: String!
	adminCode: String!
}

input LoginUserInput {
	username: String!
	userPassword: String!
}

input RemoveUserInput {
	username: String!
	userPassword: String!
}

input CreateBookingInput {
	propertyName: String!
	dateValue: String!
}

input RemoveBookingInput {
	propertyName: String!
	dateValue: String!
}

input AmenityInput {
	amenityName: String!
	amenityType: String!
}

input Update {
	propertyName: String!
	propertyDescription: String!
	amenities: [AmenityInput!]
	headerImgKey: String!
}
input UpdatePropertyInput {
	_id: ID!
	update: Update!
}

input DeleteS3ObjectInput {
	imgKey: String!
}

type Query {
	getAllUsers: [User!]
	queryBookingsByProperty(propertyName: String!): [Booking!]!
	getHomePgImgs: homePgImgPack!
	getHideawayImgs: hideawayImgPack!
	getCottageImgs: cottageImgPack!
	getAboutPgImg: String!
	getPresignedS3Url(imgKey: String!, commandType: String!, altTag: String!): String!
	getPropertyInfo(_id: ID!): Property!
	getProperties: [Property!]!

}
type Mutation {
	createUser(input: CreateUserInput!): Auth!
	loginUser(input: LoginUserInput!): Auth!
	removeUser(input: RemoveUserInput!): Auth!
	createBooking(input: CreateBookingInput!): Booking!
	removeBooking(input: RemoveBookingInput!): Booking!
	updatePropertyInfo(input: UpdatePropertyInput!): Property!
	deleteS3Object(input: DeleteS3ObjectInput!): String!
}

`;
exports.default = typeDefs;
//# sourceMappingURL=schema.js.map