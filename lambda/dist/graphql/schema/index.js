"use strict";
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="98ec0ea3-ce18-53ae-a6eb-0ace332f064a")}catch(e){}}();

// import { readFileSync } from 'fs';
// import { join } from 'path';
Object.defineProperty(exports, "__esModule", { value: true });
// const loadGraphQLFile = (relativePath: string): string => {
//   return readFileSync(join(__dirname, relativePath), 'utf-8')
// }
// const userTypes = loadGraphQLFile('./types/user.graphql');
// const propertyTypes = loadGraphQLFile('./types/property.graphql');
// const bookingTypes = loadGraphQLFile('./types/booking.graphql');
// const amenityTypes = loadGraphQLFile('./types/amenity.graphql');
// const imageTypes = loadGraphQLFile('./types/image.graphql');
// const pageTypes = loadGraphQLFile('./types/page.graphql');
// const userInputs = loadGraphQLFile('./inputs/user-inputs.graphql');
// const propertyInputs = loadGraphQLFile('./inputs/property-inputs.graphql');
// const bookingInputs = loadGraphQLFile('./inputs/booking-inputs.graphql');
// const imageInputs = loadGraphQLFile('./inputs/image-inputs.graphql');
// const amenityInputs = loadGraphQLFile('./inputs/amenity-inputs.graphql');
// const pageInputs = loadGraphQLFile('./inputs/page-inputs.graphql');
// const queries = loadGraphQLFile('./queries/queries.graphql');
// const mutations = loadGraphQLFile('./mutations/mutations.graphql');
// const typeDefs = [
//   userTypes,
//   propertyTypes,
//   bookingTypes,
//   amenityTypes,
//   imageTypes,
//   pageTypes,
//   userInputs,
//   propertyInputs,
//   bookingInputs,
//   amenityInputs,
//   imageInputs,
//   pageInputs,
//   queries,
//   mutations
// ].join('\n');
// export default typeDefs;
const types_1 = require("./types");
const inputs_1 = require("./inputs");
const queries_1 = require("./queries/queries");
const mutations_1 = require("./mutations/mutations");
const typeDefs = [
    types_1.types,
    inputs_1.inputs,
    queries_1.queries,
    mutations_1.mutations
].join('\n');
exports.default = typeDefs;
//# sourceMappingURL=index.js.map
//# debugId=98ec0ea3-ce18-53ae-a6eb-0ace332f064a
