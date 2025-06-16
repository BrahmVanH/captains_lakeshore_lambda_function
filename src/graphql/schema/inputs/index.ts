import { amenityInputs } from './amenity-inputs';
import { bookingInputs } from './booking-inputs';
import { imageInputs } from './image-inputs';
import { pageInputs } from './page-inputs';
import { propertyInputs } from './property-inputs';
import { userInputs } from './user-inputs';

export const inputs = [
  amenityInputs,
  bookingInputs,
  imageInputs,
  pageInputs,
  propertyInputs,
  userInputs
].join('\n');