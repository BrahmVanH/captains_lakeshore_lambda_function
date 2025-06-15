import { connectToDb } from '../../../connection/db';
import { MutationCreateSpaceArgs, MutationResolvers, MutationUpdateSpaceArgs, MutationRemoveSpaceArgs } from '../../../generated/graphql';
import { Property } from '../../../models';
import Space from '../../../models/Space';


export const spaceMutations: MutationResolvers = {

  createSpace: async (_: {}, args: MutationCreateSpaceArgs, __: any) => {
    if (!args.input) {
      throw new Error('No input object was presented for creating space');
    }
    const { name, icon } = args.input;
    if (!name || !icon) {
      throw new Error('Space name or icon is undefined');
    }
    try {
      await connectToDb();
      const space = await Space.create(args.input);
      if (!space) {
        throw new Error('Could not create space');
      }
      return space;
    } catch (err: any) {
      throw new Error('Error in creating space: ' + err.message);
    }
  },
  updateSpace: async (_: {}, args: MutationUpdateSpaceArgs, __: any) => {
    if (!args.input) {
      throw new Error('No input object was presented for updating space');
    }
    const { name, icon } = args.input;
    const { _id } = args;

    if (!_id) {
      throw new Error('Space name is undefined');
    }
    if (!name || !icon) {
      throw new Error('Update object is undefined');
    }
    try {
      await connectToDb();
      const space = await Space.findOneAndUpdate({ _id }, { $set: args.input }, { new: true });
      if (!space) {
        throw new Error('Could not find space with that name');
      }
      return space;
    } catch (err: any) {
      throw new Error('Error in updating space: ' + err.message);
    }
  },
  removeSpace: async (_: {}, args: MutationRemoveSpaceArgs, __: any) => {
    if (!args._id) {
      throw new Error('No input object was presented for removing space');
    }
    const { _id } = args;
    if (!_id) {
      throw new Error('Space name is undefined');
    }
    try {
      await connectToDb();
      const properties = await Property.find({ spacesItems: _id });
      if (properties.length > 0) {
        await Property.updateMany({ spacesItems: _id }, { $pull: { spacesItems: _id } });
      }
      const space = await Space.findOneAndDelete({ _id });
      if (!space) {
        throw new Error('Could not find space with that name');
      }
      return space;
    } catch (err: any) {
      throw new Error('Error in removing space: ' + err.message);
    }
  },
  createSeedSpaces: async (_: {}, __: any) => {
    const spacesSeedData = await import('../../../seed/spaces.json');
    try {
      await connectToDb();
      if (!spacesSeedData) {
        throw new Error('No seed data was presented for creating spaces');
      }
      const spaces = await Space.create(spacesSeedData.default);

      if (!spaces) {
        throw new Error('Could not create spaces');
      }
      return spaces;
    } catch (err: any) {
      throw new Error('Error in creating seed spaces' + err.message);
    }
  },
}