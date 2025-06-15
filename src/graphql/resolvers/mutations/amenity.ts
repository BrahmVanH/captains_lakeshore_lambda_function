import { connectToDb } from "../../../connection/db";
import { MutationCreateAmenityArgs, MutationRemoveAmenityArgs, MutationResolvers, MutationUpdateAmenityArgs } from "../../../generated/graphql";
import { Property } from "../../../models";
import Amenity from "../../../models/Amenity";

export const amenityMutations: MutationResolvers = {
  createAmenity: async (_: {}, args: MutationCreateAmenityArgs, __: any) => {
    if (!args.input) {
      throw new Error('No input object was presented for creating amenity');
    }
    const { amenityName, amenityType } = args.input;
    if (!amenityName || !amenityType) {
      throw new Error('Amenity name or type is undefined');
    }
    try {
      await connectToDb();
      const amenity = await Amenity.create(args.input);
      if (!amenity) {
        throw new Error('Could not create amenity');
      }
      return amenity;
    } catch (err: any) {
      throw new Error('Error in creating amenity: ' + err.message);
    }
  },
  updateAmenity: async (_: {}, args: MutationUpdateAmenityArgs, __: any) => {
    if (!args.input) {
      throw new Error('No input object was presented for updating amenity');
    }
    const { amenityName, amenityType } = args.input;
    const { _id } = args;

    if (!_id) {
      throw new Error('Amenity name is undefined');
    }
    if (!amenityName || !amenityType) {
      throw new Error('Update object is undefined');
    }
    try {
      await connectToDb();
      const amenity = await Amenity.findOneAndUpdate({ _id }, { $set: args.input }, { new: true }).populate('amenities');
      if (!amenity) {
        throw new Error('Could not find amenity with that name');
      }
      return amenity;
    } catch (err: any) {
      throw new Error('Error in updating amenity: ' + err.message);
    }
  },
  removeAmenity: async (_: {}, args: MutationRemoveAmenityArgs, __: any) => {
    if (!args._id) {
      throw new Error('No input object was presented for removing amenity');
    }
    const { _id } = args;
    if (!_id) {
      throw new Error('Amenity name is undefined');
    }
    try {
      await connectToDb();
      const properties = await Property.find({ amenities: _id });
      if (properties.length > 0) {
        await Property.updateMany({ amenities: _id }, { $pull: { amenities: _id } });
      }
      const amenity = await Amenity.findOneAndDelete({ _id });
      if (!amenity) {
        throw new Error('Could not find amenity with that name');
      }
      return amenity;
    } catch (err: any) {
      throw new Error('Error in removing amenity: ' + err.message);
    }
  },
}