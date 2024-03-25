import { model, Schema } from 'mongoose';
import {Booking as IBooking} from '../generated/graphql';

const bookingSchema: Schema = new Schema<IBooking>({
	propertyName: {
		type: String,
		required: true,
	},
	dateValue: {
		type: String,
		required: true,
	},
});

const Booking = model<IBooking>('BookingDate', bookingSchema);

export default Booking;
