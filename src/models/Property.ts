import { model, Schema, Types } from 'mongoose';
import { Amenity, Property } from '../generated/graphql';

const amenitiesSchema: Schema<Amenity> = new Schema<Amenity>({
	amenityName: {
		type: String,
	},
	amenityType: {
		type: String,
	},
});

const propertySchema: Schema<Property> = new Schema<Property>({
	propertyName: {
		type: String,
	},
	propertyDescription: {
		type: String,
	},
	amenities: {
		type: [amenitiesSchema],
	},
	headerImgKey: {
		type: String,
	},
	bookings: [
		{
			type: Types.ObjectId,
			ref: 'Booking',
		},
	],
});

const Property = model<Property>('Property', propertySchema);

export default Property;
