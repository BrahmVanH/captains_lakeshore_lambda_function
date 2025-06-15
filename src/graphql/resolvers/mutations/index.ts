import { userMutations } from './user';
import { bookingMutations } from './booking';
import { propertyMutations } from './property';
import { amenityMutations } from './amenity';
import { spaceMutations } from './space';
import { imageMutations } from './image';

export const mutations = {
  ...userMutations,
  ...bookingMutations,
  ...propertyMutations,
  ...amenityMutations,
  ...spaceMutations,
  ...imageMutations,
};