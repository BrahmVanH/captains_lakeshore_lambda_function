import { model, Schema, Types } from 'mongoose';
import { Space as SpaceType } from '../generated/graphql';

const spaceSchema: Schema<SpaceType> = new Schema<SpaceType>({
	name: {
		type: String,
	},
	icon: {
		type: String,
	},
});

const Space = model<SpaceType>('Space', spaceSchema);

export default Space;
