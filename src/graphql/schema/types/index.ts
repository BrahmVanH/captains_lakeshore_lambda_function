import { amenityTypes } from './amenity';
import { bookingTypes } from './booking';
import { imageTypes } from './image';
import { pageTypes } from './page';
import { propertyTypes } from './property';
import { userTypes } from './user';

export const types = [
  amenityTypes,
  bookingTypes,
  imageTypes,
  pageTypes,
  propertyTypes,
  userTypes
].join('\n');