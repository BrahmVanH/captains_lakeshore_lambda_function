import { connectToDb } from "../../../connection/db";
import { MutationCreateUserArgs, MutationLoginUserArgs, MutationRemoveUserArgs, MutationResolvers } from "../../../generated/graphql";
import { User } from "../../../models";
import { ILoginUserArgs, IRemoveUserArgs, IUser } from "../../../types";
import { signToken } from "../../../utils/auth";

export const userMutations: MutationResolvers = {
  createUser: async (_: {}, args: MutationCreateUserArgs, __: any) => {
    const { firstName, lastName, username, userPassword, adminCode } = args.input;

    if (!firstName || !lastName || !username || !userPassword || !adminCode) {
      throw new Error('All fields must be filled to create a user.');
    } else if (adminCode !== process.env.ADMIN_CODE) {
      throw new Error('Incorrect admin code');
    }

    try {
      await connectToDb();

      const user: IUser = await User.create({
        firstName,
        lastName,
        username,
        password: userPassword,
      });

      if (!user) {
        throw new Error('There was an error creating user. Try again.');
      }

      const token = signToken(user);

      return { token, user };
    } catch (err: any) {
      throw new Error('Error in creating user: ' + err.message);
    }
  },
  loginUser: async (_: {}, args: MutationLoginUserArgs, __: any) => {
    try {
      const { username, userPassword } = args.input as ILoginUserArgs;
      await connectToDb();
      if (!username || !userPassword) {
        throw new Error('username and password fields must be filled to log in');
      }

      const user: IUser | null = await User.findOne({ username });
      if (!user?.comparePassword) {
        throw new Error("Can't find user with that username");
      }

      const isPasswordValid = await user.comparePassword(userPassword);

      if (!isPasswordValid) {
        throw new Error('Incorrect Password!');
      }

      const token = signToken(user);
      return { token, user };
    } catch (err: any) {
      throw new Error('Error in logging in user: ' + err.message);
    }
  },
  removeUser: async (_: {}, args: MutationRemoveUserArgs, __: any) => {
    try {
      const { username, userPassword } = args.input as IRemoveUserArgs;
      await connectToDb();
      if (!username) {
        throw new Error('username  fields must be filled to remove');
      }

      const user: IUser | null = await User.findOne({ username });

      if (!user?.comparePassword) {
        throw new Error("Can't find user with that username");
      }

      const isPasswordValid = await user.comparePassword(userPassword);
      if (!isPasswordValid) {
        throw new Error('Incorrect Password!');
      }
      const deletedUser = await User.findOneAndDelete({ username });
      if (!deletedUser) {
        throw new Error('Could not delete user');
      }
      return { token: '', user: deletedUser };
    } catch (err: any) {
      throw new Error('Error in removing in user: ' + err.message);
    }
  },
}

