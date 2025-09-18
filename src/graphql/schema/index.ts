

import { types } from './types';
import { inputs } from './inputs';
import { queries } from './queries/queries';
import { mutations } from './mutations/mutations';

const typeDefs = [
  types,
  inputs,
  queries,
  mutations
].join('\n');

export default typeDefs;