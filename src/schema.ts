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

type OverviewItem {
	name: String!
	icon: String
}

type Amenity {
	_id: ID!
	amenityName: String!
	amenityType: String!
	icon: String
}

type Space {
	_id: ID!
	name: String!
	icon: String
}
type Bed {
	name: String!
	quantity: Int!
	icon: String
}
type RoomBed {
	name: String!
	beds: [Bed]

}

type HouseRules {
	general: [String]
	children: String
	events: String
	pets: String
	smoking: String
	additional: [String]	
	damages: [String]
}


type Property {
	_id: ID!
	propertyName: String!
	overviewItems: [OverviewItem]
	propertyDescription: String
	roomsAndBeds: [RoomBed]
	spacesItems: [Space]
	amenities: [Amenity]
	importantInfo: [String]
	houseRules: HouseRules
	headerImgKey: String
	bookings: [Booking!]
}

type PropertyLite {
	_id: ID!
	propertyName: String!
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
	icon: String
}

input CreatePropertyInput {
	propertyName: String!
}

input Update {
	propertyName: String!
	propertyDescription: String!
	amenities: [AmenityInput!]
	headerImgKey: String!
}

input UpdatePropertyNameInput {
	_id: ID!
	propertyName: String!
}

input UpdatePropertyInput {
	_id: ID!
	update: Update!
}

input UpdatePropertyDescriptionInput {
	_id: ID!
	propertyDescription: String!
}

input UpdatePropertyAmenitiesInput {
	_id: ID!
	amenities: [ID!]
}

input UpdatePropertyHeaderImgInput {
	_id: ID!
	headerImgKey: String!
}

input OverviewInput {
	name: String!
	icon: String
}

input UpdatePropertyOverviewItemsInput {
	_id: ID!
	overviewItems: [OverviewInput!]
}

input BedInput {
	name: String!
	quantity: Int!
	icon: String
}

input RoomBedInput {
	name: String!
	beds: [BedInput]
}
input UpdatePropertyRoomsAndBedsInput {
	_id: ID!
	roomsAndBeds: [RoomBedInput]
}

input SpaceInput {
	name: String!
	icon: String
}

input UpdatePropertySpacesInput {
	_id: ID!
	spacesItems: [ID!]
}

input UpdatePropertyImportantInfoInput {
	_id: ID!
	importantInfo: [String]
}

input HouseRulesInput {
	general: [String]
	children: String
	events: String
	pets: String
	smoking: String
	additional: [String]
	damages: [String]
}

input UpdatePropertyHouseRulesInput {
	_id: ID!
	houseRules: HouseRulesInput
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
	getPropertiesLite: [PropertyLite]
	getPropertyById(_id: ID!): Property!
	getAmenities: [Amenity!]!
	getSpaces: [Space!]!

}
type Mutation {
	createUser(input: CreateUserInput!): Auth!
	loginUser(input: LoginUserInput!): Auth!
	removeUser(input: RemoveUserInput!): Auth!
	createBooking(input: CreateBookingInput!): [Booking]!
	removeBooking(input: RemoveBookingInput!): RemoveBookingResponse!
	updatePropertyInfo(input: UpdatePropertyInput!): Property!
	updatePropertyName(input: UpdatePropertyNameInput!): Property!
	updatePropertyAmenities(input: UpdatePropertyAmenitiesInput!): Property!
	updatePropertyOverviewItems(input: UpdatePropertyOverviewItemsInput!): Property!
	updatePropertyDescription(input: UpdatePropertyDescriptionInput!): Property!
	updatePropertyRoomsAndBeds(input: UpdatePropertyRoomsAndBedsInput!): Property!
	updatePropertySpaces(input: UpdatePropertySpacesInput!): Property!
	updatePropertyImportantInfo(input: UpdatePropertyImportantInfoInput!): Property!
	updatePropertyHouseRules(input: UpdatePropertyHouseRulesInput!): Property!
	updatePropertyHeaderImg(input: UpdatePropertyHeaderImgInput!): Property!
	deleteS3Objects(input: DeleteS3ObjectInput!): DeleteS3ObjectResponse!
	removeProperty(_id: ID!): Property!
	createProperty(input: CreatePropertyInput!): Property!
	createAmenity(input: AmenityInput!): Amenity!
	updateAmenity(_id: ID!, input: AmenityInput!): Amenity!
	removeAmenity(_id: ID!): Amenity!
	createSpace(input: SpaceInput!): Space!
	updateSpace(_id: ID!, input: SpaceInput!): Space!
	removeSpace(_id: ID!): Space!
	createSeedAmenities: [Amenity!]!
	createSeedSpaces: [Space!]!
}

`;

export default typeDefs;
