import {metas} from "@/constants/metas";
import {GraphQLClient} from "graphql-request";
import {getSdk} from "./resource";

export const createResourceGqlClient = (headers?: Record<string, string>) =>
  getSdk(new GraphQLClient(metas.graphqlApiUrl, {headers}));
export const createAuthedResourceGqlClient = (token: string) =>
  createResourceGqlClient({Authorization: `Bearer ${token}`});

export type ResourceApi = ReturnType<typeof createAuthedResourceGqlClient>;
