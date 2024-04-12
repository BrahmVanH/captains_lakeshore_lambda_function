import { model, Schema } from 'mongoose';
import { Booking as IBooking } from '../generated/graphql';

const bookingSchema: Schema = new Schema<IBooking>({
	propertyId: {
		type: String,
		required: true,
	},
	dateValue: {
		type: String,
		required: true,
	},
});

const Booking = model<IBooking>('Booking', bookingSchema);

export default Booking;
