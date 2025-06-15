import { readFileSync } from 'fs';
import { join } from 'path';

const loadGraphQLFile = (relativePath: string): string => {
  return readFileSync(join(__dirname, relativePath), 'utf-8')
}

const userTypes = loadGraphQLFile('./types/user.graphql');
const propertyTypes = loadGraphQLFile('./types/property.graphql');
const bookingTypes = loadGraphQLFile('./types/booking.graphql');
const amenityTypes = loadGraphQLFile('./types/amenity.graphql');
const imageTypes = loadGraphQLFile('./types/image.graphql');
const pageTypes = loadGraphQLFile('./types/page.graphql');

const userInputs = loadGraphQLFile('./inputs/user-inputs.graphql');
const propertyInputs = loadGraphQLFile('./inputs/property-inputs.graphql');
const bookingInputs = loadGraphQLFile('./inputs/booking-inputs.graphql');
const imageInputs = loadGraphQLFile('./inputs/image-inputs.graphql');
const amenityInputs = loadGraphQLFile('./inputs/amenity-inputs.graphql');
const pageInputs = loadGraphQLFile('./inputs/page-inputs.graphql');

const queries = loadGraphQLFile('./queries/queries.graphql');
const mutations = loadGraphQLFile('./mutations/mutations.graphql');


const typeDefs = [
  userTypes,
  propertyTypes,
  bookingTypes,
  amenityTypes,
  imageTypes,
  pageTypes,
  userInputs,
  propertyInputs,
  bookingInputs,
  amenityInputs,
  imageInputs,
  pageInputs,
  queries,
  mutations
].join('\n');

export default typeDefs;