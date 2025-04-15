import { Schema, model } from 'mongoose';
import { Amenity as AmenityType } from '../generated/graphql';

const amenitySchema: Schema<AmenityType> = new Schema<AmenityType>({
  amenityName: {
    type: String,
    required: true,
  },
  amenityType: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
  },
});

const Amenity = model<AmenityType>('Amenity', amenitySchema);

export default Amenity;