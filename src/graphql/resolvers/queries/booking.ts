import { connectToDb } from "@/connection/db";
import { QueryQueryBookingsByPropertyArgs, QueryResolvers } from "@/generated/graphql";
import { Booking } from "@/models";

export const bookingQueries: QueryResolvers = {
  queryBookingsByProperty: async (_: {}, { propertyId }: QueryQueryBookingsByPropertyArgs, __: any) => {
    try {
      await connectToDb();

      if (!propertyId) {
        throw new Error('No property name was presented for querying bookings');
      }
      const bookings = await Booking.find({ propertyId: propertyId });
      if (!bookings) {
        throw new Error('Cannot find booking in database');
      }
      return bookings;
    } catch (err: any) {
      console.error({ message: 'error in finding bookings', details: err });
      throw new Error('Error in finding dates: ' + err.message);
    }
  }
}