import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from '../types.d';
const userSchema: Schema<IUser> = new Schema<IUser>(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

userSchema.methods.comparePassword = async function (password: string) {
	return bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;
