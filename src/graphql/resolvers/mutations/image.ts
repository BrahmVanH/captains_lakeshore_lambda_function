import { connectToDb } from "../../../connection/db";
import { MutationDeleteS3ObjectsArgs, MutationResolvers } from "../../../generated/graphql";
import { deleteS3Objects } from "../../../utils/s3Upload";

export const imageMutations: MutationResolvers = {
  deleteS3Objects: async (_: {}, args: MutationDeleteS3ObjectsArgs, __: any) => {
    const { imgKeys } = args.input;
    if (!imgKeys || imgKeys.length === 0) {
      throw new Error('No key was presented for deleting object');
    }
    try {
      await connectToDb();

      const response = await deleteS3Objects(imgKeys);

      if (!response) {
        throw new Error('Could not delete object from s3');
      }
      return response;
    } catch (err: any) {
      throw new Error('Error in deleting object from s3: ' + err.message);
    }
  },
}