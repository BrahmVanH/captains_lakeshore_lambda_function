import { connectToDb } from "@/connection/db";
import { Amenity, QueryResolvers } from "@/generated/graphql";
import AmenityModel from "@/models/Amenity";

export const amenityQueries: QueryResolvers = {
  getAmenities: async () => {
    try {
      await connectToDb();
      const amenities: Amenity[] = await AmenityModel.find();
      if (!amenities) {
        throw new Error('Error fetching all amenities from database');
      }
      return amenities;
    } catch (err: any) {
      console.error({ message: 'error in finding amenities', details: err });
      throw new Error('Error in finding amenities: ' + err.message);
    }
  },
}