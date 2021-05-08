import {Theme} from "./components";

export const metas = {
  isNonProduction: process.env.NEXT_PUBLIC_MODE !== "production",
  url: "https://www.nafkhanzam.com",
  title: "@nafkhanzam/template-webapp",
  description: "template-webapp description",
  twitterHandle: "@nafkhanzam",
  graphqlApiUrl: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT,
};

export const assets = {
  favicon: "/favicon.ico",
};

export const theme: Theme = {colors: {}};
