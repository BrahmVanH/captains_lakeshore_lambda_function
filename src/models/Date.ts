import { model, Schema } from 'mongoose';
import { IBookingDate } from '../types';

const bookingDateSchema: Schema = new Schema<IBookingDate>({
	propertyName: {
		type: String,
		required: true,
	},
	dateValue: {
		type: String,
		required: true,
	},
});

const BookingDate = model('BookingDate', bookingDateSchema);

export default BookingDate;
