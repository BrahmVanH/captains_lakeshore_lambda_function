import { connectToDb } from "../../../connection/db";
import { Property } from "../../../models";

import {
  MutationCreatePropertyArgs, MutationResolvers, MutationUpdatePropertyAmenitiesArgs,
  MutationUpdatePropertyInfoArgs,
  MutationRemovePropertyArgs,
  MutationUpdatePropertyDescriptionArgs,
  MutationUpdatePropertyHeaderImgArgs,
  MutationUpdatePropertyOverviewItemsArgs,
  MutationUpdatePropertyRoomsAndBedsArgs,
  MutationUpdatePropertyNameArgs,
  MutationUpdatePropertyHouseRulesArgs,
  MutationUpdatePropertyImportantInfoArgs,
  MutationUpdatePropertySpacesArgs,
  MutationUpdatePropertyS3DirectoryPrefixArgs,
} from '../../../generated/graphql';
import { invalidatePropertyCaches } from "../../../utils/redis";
import { triggerRebuild } from "../../../utils/webhook";

export const propertyMutations: MutationResolvers = {

  createProperty: async (_: {}, args: MutationCreatePropertyArgs, __: any) => {
    if (!args.input) {
      throw new Error('No input object was presented for creating property');
    }
    const { propertyName } = args.input;
    if (!propertyName) {
      throw new Error('Property name is undefined');
    }
    try {
      await connectToDb();
      const property = await Property.create(args.input);
      if (!property) {
        throw new Error('Could not create property');
      }

      await invalidatePropertyCaches();

      return property;
    } catch (err: any) {
      throw new Error('Error in creating property: ' + err.message);
    }
  },
  updatePropertyAmenities: async (_: {}, args: MutationUpdatePropertyAmenitiesArgs, __: any) => {
    if (!args.input) {
      throw new Error('No input object was presented for updating property');
    }
    const { _id, amenities } = args.input;
    if (!_id) {
      throw new Error('Property name is undefined');
    }
    if (!amenities) {
      throw new Error('Update object is undefined');
    }
    try {
      await connectToDb();
      const property = await Property.findOneAndUpdate({ _id }, { $set: { amenities } }, { new: true }).populate('amenities');
      if (!property) {
        throw new Error('Could not find property with that name');
      }

      await invalidatePropertyCaches();

      triggerRebuild({
        metadata: { action: 'updatePropertyAmenities', propertyId: property.id }
      })

      return property;
    } catch (err: any) {
      throw new Error('Error in updating property: ' + err.message);
    }
  },
  updatePropertyDescription: async (_: {}, args: MutationUpdatePropertyDescriptionArgs, __: any) => {
    if (!args.input) {
      throw new Error('No input object was presented for updating property');
    }
    const { _id, propertyDescription } = args.input;
    if (!_id) {
      throw new Error('Property name is undefined');
    }
    if (!propertyDescription) {
      throw new Error('Update object is undefined');
    }
    try {
      await connectToDb();
      const property = await Property.findOneAndUpdate({ _id }, { $set: { propertyDescription } });
      if (!property) {
        throw new Error('Could not find property with that name');
      }

      await invalidatePropertyCaches();

      triggerRebuild({
        metadata: { action: 'updatePropertyDescription', propertyId: property.id }
      })

      return property;
    } catch (err: any) {
      throw new Error('Error in updating property: ' + err.message);
    }
  },
  updatePropertyHeaderImg: async (_: {}, args: MutationUpdatePropertyHeaderImgArgs, __: any) => {
    if (!args.input) {
      throw new Error('No input object was presented for updating property');
    }
    const { _id, headerImgKey } = args.input;
    if (!_id) {
      throw new Error('Property name is undefined');
    }
    if (!headerImgKey) {
      throw new Error('Update object is undefined');
    }
    try {
      await connectToDb();
      const property = await Property.findOneAndUpdate({ _id }, { $set: { headerImgKey } });
      if (!property) {
        throw new Error('Could not find property with that name');
      }

      await invalidatePropertyCaches();

      triggerRebuild({
        metadata: { action: 'updatePropertyHeaderImg', propertyId: property.id }
      })
      return property;
    } catch (err: any) {
      throw new Error('Error in updating property: ' + err.message);
    }
  },
  UpdatePropertyS3DirectoryPrefix: async (_: {}, args: MutationUpdatePropertyS3DirectoryPrefixArgs, __: any) => {
    if (!args.input) {
      throw new Error('No input object was presented for updating property');
    }
    const { _id, s3DirectoryPrefix } = args.input;
    if (!_id) {
      throw new Error('Property name is undefined');
    }
    if (!s3DirectoryPrefix) {
      throw new Error('Update object is undefined');
    }
    try {
      await connectToDb();
      const property = await Property.findOneAndUpdate({ _id }, { $set: { s3DirectoryPrefix } });
      if (!property) {
        throw new Error('Could not find property with that name');
      }

      await invalidatePropertyCaches();

      triggerRebuild({
        metadata: { action: 'updatePropertyS3DirectoryPrefix', propertyId: property.id }
      })
      return property;
    } catch (err: any) {
      throw new Error('Error in updating property: ' + err.message);
    }
  },
  updatePropertyOverviewItems: async (_: {}, args: MutationUpdatePropertyOverviewItemsArgs, __: any) => {
    if (!args.input) {
      throw new Error('No input object was presented for updating property');
    }
    const { _id, overviewItems } = args.input;
    if (!_id) {
      throw new Error('Property name is undefined');
    }
    if (!overviewItems) {
      throw new Error('Update object is undefined');
    }
    try {
      await connectToDb();
      const property = await Property.findOneAndUpdate({ _id }, { $set: { overviewItems: overviewItems } }, { new: true });
      if (!property) {
        throw new Error('Could not find property with that name');
      }

      await invalidatePropertyCaches();
      triggerRebuild({
        metadata: { action: 'updatePropertyOverviewItems', propertyId: property.id }
      })
      return property;
    } catch (err: any) {
      throw new Error('Error in updating property: ' + err.message);
    }
  },
  updatePropertyRoomsAndBeds: async (_: {}, args: MutationUpdatePropertyRoomsAndBedsArgs, __: any) => {
    if (!args.input) {
      throw new Error('No input object was presented for updating property');
    }
    const { _id, roomsAndBeds } = args.input;
    if (!_id) {
      throw new Error('Property name is undefined');
    }
    if (!roomsAndBeds) {
      throw new Error('Update object is undefined');
    }
    try {
      await connectToDb();
      const property = await Property.findOneAndUpdate({ _id }, { $set: { roomsAndBeds } }, { new: true });
      if (!property) {
        throw new Error('Could not find property with that name');
      }

      await invalidatePropertyCaches();

      triggerRebuild({
        metadata: { action: 'updatePropertyRoomsAndBeds', propertyId: property.id }
      })
      return property;
    } catch (err: any) {
      throw new Error('Error in updating property: ' + err.message);
    }
  },
  updatePropertyName: async (_: {}, args: MutationUpdatePropertyNameArgs, __: any) => {
    if (!args.input) {
      throw new Error('No input object was presented for updating property');
    }
    const { _id, propertyName } = args.input;
    if (!_id) {
      throw new Error('Property name is undefined');
    }
    if (!propertyName) {
      throw new Error('Update object is undefined');
    }
    try {
      await connectToDb();
      const property = await Property.findOneAndUpdate({ _id }, { $set: { propertyName } }, { new: true });
      if (!property) {
        throw new Error('Could not find property with that name');
      }

      // await invalidatePropertyCaches();

      triggerRebuild({
        metadata: { action: 'updatePropertyName', propertyId: property.id }
      })
      return property;
    } catch (err: any) {
      throw new Error('Error in updating property: ' + err.message);
    }
  },
  updatePropertyHouseRules: async (_: {}, args: MutationUpdatePropertyHouseRulesArgs, __: any) => {
    if (!args.input) {
      throw new Error('No input object was presented for updating property');
    }
    const { _id, houseRules } = args.input;
    if (!_id) {
      throw new Error('Property name is undefined');
    }
    if (!houseRules) {
      throw new Error('Update object is undefined');
    }
    try {
      await connectToDb();
      const property = await Property.findOneAndUpdate({ _id }, { $set: { houseRules } }, { new: true });
      if (!property) {
        throw new Error('Could not find property with that name');
      }

      await invalidatePropertyCaches();

      triggerRebuild({
        metadata: { action: 'updatePropertyHouseRules', propertyId: property.id }
      })

      return property;
    } catch (err: any) {
      throw new Error('Error in updating property: ' + err.message);
    }
  },
  updatePropertyImportantInfo: async (_: {}, args: MutationUpdatePropertyImportantInfoArgs, __: any) => {
    if (!args.input) {
      throw new Error('No input object was presented for updating property');
    }
    const { _id, importantInfo } = args.input;
    if (!_id) {
      throw new Error('Property name is undefined');
    }
    if (!importantInfo) {
      throw new Error('Update object is undefined');
    }
    try {
      await connectToDb();
      const property = await Property.findOneAndUpdate({ _id }, { $set: { importantInfo } }, { new: true });
      if (!property) {
        throw new Error('Could not find property with that name');
      }

      await invalidatePropertyCaches();
      triggerRebuild({
        metadata: { action: 'updatePropertyImportantInfo', propertyId: property.id }
      })
      return property;
    } catch (err: any) {
      throw new Error('Error in updating property: ' + err.message);
    }
  },
  updatePropertySpaces: async (_: {}, args: MutationUpdatePropertySpacesArgs, __: any) => {
    if (!args.input) {
      throw new Error('No input object was presented for updating property');
    }
    const { _id, spacesItems } = args.input;
    if (!_id) {
      throw new Error('Property name is undefined');
    }
    if (!spacesItems) {
      throw new Error('Update object is undefined');
    }
    try {
      await connectToDb();
      const property = await Property.findOneAndUpdate({ _id }, { $set: { spacesItems } }, { new: true }).populate('spacesItems');
      if (!property) {
        throw new Error('Could not find property with that name');
      }

      await invalidatePropertyCaches();

      triggerRebuild({
        metadata: { action: 'updatePropertySpaces', propertyId: property.id }
      })
      return property;
    } catch (err: any) {
      throw new Error('Error in updating property: ' + err.message);
    }
  },
  removeProperty: async (_: {}, args: MutationRemovePropertyArgs, __: any) => {
    if (!args._id) {
      throw new Error('No input object was presented for removing property');
    }
    const { _id } = args;
    if (!_id) {
      throw new Error('Property name is undefined');
    }
    try {
      await connectToDb();
      const property = await Property.findOneAndDelete({ _id });
      if (!property) {
        throw new Error('Could not find property with that name');
      }

      await invalidatePropertyCaches();

      triggerRebuild({
        metadata: { action: 'removeProperty', propertyId: property.id }
      })
      return property;
    } catch (err: any) {
      throw new Error('Error in removing property: ' + err.message);
    }
  },

  updatePropertyInfo: async (_: {}, args: MutationUpdatePropertyInfoArgs, __: any) => {
    if (!args.input) {
      throw new Error('No input object was presented for updating property info');
    }

    const { _id, update } = args.input;

    if (!_id) {
      throw new Error('Property name is undefined');
    }


    try {
      await connectToDb();

      const property = await Property.findOneAndUpdate({ _id }, { $set: update }, { new: true });

      if (!property) {
        throw new Error('Could not find property with that name');
      }

      await invalidatePropertyCaches();

      triggerRebuild({
        metadata: { action: 'updatePropertyInfo', propertyId: property.id }
      })
      return property;
    } catch (err: any) {
      throw new Error('Error in updating property info: ' + err.message);
    }
  },
}