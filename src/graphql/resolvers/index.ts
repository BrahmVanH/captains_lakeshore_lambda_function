import { queries } from "./queries";
import { mutations } from "./mutations";
import { Resolvers } from "@/generated/graphql";

const resolvers: Resolvers = {
  Query: queries,
  Mutation: mutations
}

export default resolvers