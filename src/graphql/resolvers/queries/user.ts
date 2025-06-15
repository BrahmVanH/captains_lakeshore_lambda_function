import { User } from '../../../models';
import { connectToDb } from '../../../connection/db';
import { IUser } from '../../../types';
import { QueryResolvers } from '../../../generated/graphql';


export const userQueries: QueryResolvers = {

  getAllUsers: async () => {
    try {
      await connectToDb();

      const allUsers: IUser[] = await User.find();

      if (!allUsers) {
        throw new Error('Error fetching all users from database');
      }

      return allUsers;
    } catch (err: any) {
      console.error({ message: 'error in finding user', details: err });
      throw new Error('Error in finding users: ' + err.message);
    }
  }
}