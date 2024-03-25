const typeDefs = `#graphql
  type User {
		_id: ID!
		firstName: String!
		lastName: String!
		username: String!
		password: String!
	}

	type Auth {
		token: ID!
		user: User
	}

	type Date {
		_id: ID!
		propertyName: String!
		dateValue: String!
	}

	type imageObject {
		original: String
		thumbnail: String
		originalAlt: String
		thumbnailAlt: String
	}

	type homePgImgPack {
		headerImgUrl: String
		hideawayImgUrl: String
		cottageImgUrl: String
	}

	type hideawayImgPack {
		headerUrl: String
		galleryArray: [imageObject]
	}

	type cottageImgPack {
		headerUrl: String
		galleryArray: [imageObject]
	}

	type Query {
		getAllUsers: [User]
		queryUnavailableDatesByProperty(propertyName: String!): [Date]
		getHomePgImgs: homePgImgPack
		getHideawayImgs: hideawayImgPack
		getCottageImgs: cottageImgPack
		getAboutPgImg: String
	}
	type Mutation {
		createUser(firstName: String!, lastName: String!, username: String!, userPassword: String!, adminCode: String!): Auth
		loginUser(username: String!, userPassword: String!): Auth
		removeUser(username: String!, userPassword: String!): Auth
		createUnavailableDate(propertyName: String!, dateValue: String!): Date
		removeUnavailableDate(propertyName: String!, dateValue: String!): Date
	}
`;

export default typeDefs;
