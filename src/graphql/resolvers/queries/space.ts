import { connectToDb } from "@/connection/db";
import { QueryResolvers, Space as SpaceType } from "@/generated/graphql";
import Space from "@/models/Space";

export const spaceQueries: QueryResolvers = {
  getSpaces: async () => {
    try {
      await connectToDb();

      const spaces: SpaceType[] = await Space.find();

      if (!spaces) {
        throw new Error('Error fetching all spaces from database');
      }

      return spaces;
    } catch (err: any) {
      console.error({ message: 'error in finding spaces', details: err });
      throw new Error('Error in finding spaces: ' + err.message);
    }
  }
}