import { connectToDb } from "@/connection/db";
import { MutationCreateBookingArgs, MutationRemoveBookingArgs, MutationResolvers } from "@/generated/graphql";
import { Booking } from "@/models";

export const bookingMutations: MutationResolvers = {
  createBooking: async (_: {}, args: MutationCreateBookingArgs, __: any) => {
    try {
      const { bookings } = args.input;

      await connectToDb();
      if (!bookings || bookings.length === 0) {
        throw new Error('No bookings provided to create');
      }
      const createdBookings = await Booking.create(bookings);

      if (!createdBookings) {
        throw new Error('Could not create new date');
      }
      return createdBookings;
    } catch (err: any) {
      throw new Error('Error in creating booking in db: ' + err.message);
    }
  },
  removeBooking: async (_: {}, args: MutationRemoveBookingArgs, __: any) => {
    try {
      const { bookingIds } = args.input;
      await connectToDb();
      if (!bookingIds || bookingIds.length === 0) {
        throw new Error('booking ID is undefined');
      }
      const booking = await Booking.deleteMany({ _id: { $in: bookingIds } });
      if (!booking) {
        throw new Error('could not find unavailable date with that value...');
      }

      return booking;
    } catch (err: any) {
      throw new Error('Error in removing unavailable booking from db: ' + err.message);
    }
  },
}