import {metas} from "@/constants";
import {GraphQLClient} from "graphql-request";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let getSdkFunc: any;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const {getSdk} = require("./resource");
  getSdkFunc = getSdk;
} catch (error) {}

export const createResourceGqlClient = (headers?: Record<string, string>) =>
  getSdkFunc?.(new GraphQLClient(metas.graphqlApiUrl, {headers})) ?? {};
export const createAuthedResourceGqlClient = (token: string) =>
  createResourceGqlClient({Authorization: `Bearer ${token}`});

export type ResourceApi = ReturnType<typeof createAuthedResourceGqlClient>;
