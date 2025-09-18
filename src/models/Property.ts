import { model, Schema, Types } from 'mongoose';
import { Property as PropertyType } from '../generated/graphql';


const propertySchema: Schema<PropertyType> = new Schema<PropertyType>({
	propertyName: {
		type: String,
	},
	overviewItems: {
		type: [
			{
				name: {
					type: String,
				},
				icon: {
					type: String,
				},
			},
		],
	},
	propertyDescription: {
		type: String,
	},
	roomsAndBeds: [
		{
			name: {
				type: String,
			},
			beds: [
				{
					name: {
						type: String,
					},
					quantity: {
						type: Number,
					},
					icon: {
						type: String,
					},
				},
			],
		},
	],
	spacesItems: [
		{
			type: Types.ObjectId,
			ref: 'Space',
		},
	],
	amenities: {
		type: [
			{
				type: Types.ObjectId,
				ref: 'Amenity',
			},
		],
	},
	importantInfo: {
		type: [String],
	},
	houseRules: {
		general: {
			type: [String],
		},
		children: {
			type: String,
		},
		events: {
			type: String,
		},
		pets: {
			type: String,
		},
		smoking: {
			type: String,
		},
		additional: {
			type: [String],
		},
		damages: {
			type: [String],
		},
	},

	headerImgKey: {
		type: String,
	},
	s3DirectoryPrefix: {
		type: String,
	},
	bookings: [
		{
			type: Types.ObjectId,
			ref: 'Booking',
		},
	],
});

const Property = model<PropertyType>('Property', propertySchema);

export default Property;
