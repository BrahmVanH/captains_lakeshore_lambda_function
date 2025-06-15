import { userQueries } from './user';
import { bookingQueries } from './booking';
import { propertyQueries } from './property';
import { amenityQueries } from './amenity';
import { spaceQueries } from './space';
import { imageQueries } from './image';

export const queries = {
  ...userQueries,
  ...bookingQueries,
  ...propertyQueries,
  ...amenityQueries,
  ...spaceQueries,
  ...imageQueries,
};