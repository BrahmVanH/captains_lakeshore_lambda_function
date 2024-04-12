import { DeleteObjectCommandOutput } from '@aws-sdk/client-s3';

const typeDefs = `#graphql


 type User {
	_id: ID
	firstName: String!
	lastName: String!
	username: String!
	password: String
}

type Booking {
	_id: ID!
	propertyId: ID!
	dateValue: String!
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
	bookings: [Booking!]
}

type Auth {
	token: ID!
	user: User!
}



type imageObject {
	imgKey: String!
	original: String!
	thumbnail: String!
	originalAlt: String!
	thumbnailAlt: String!
}



type DeleteS3ObjectResponse {
	status: Int!
	message: String!
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

input NewBookingInput {
	propertyId: ID!
	dateValue: String!
}

input CreateBookingInput {
	bookings: [NewBookingInput!]
}



input RemoveBookingInput {
	bookingIds: [ID!]!
}

type RemoveBookingResponse {
	deletedCount: Int!
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
	imgKeys: [String!]!
}



type Query {
	getAllUsers: [User!]
	queryBookingsByProperty(propertyId: ID!): [Booking!]
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
	createBooking(input: CreateBookingInput!): [Booking]!
	removeBooking(input: RemoveBookingInput!): RemoveBookingResponse!
	updatePropertyInfo(input: UpdatePropertyInput!): Property!
	deleteS3Objects(input: DeleteS3ObjectInput!): DeleteS3ObjectResponse!
}

`;

export default typeDefs;
