import {Theme} from "./components";

export const metas = {
  isNonProduction: process.env.NEXT_PUBLIC_MODE !== "production",
  url: "https://www.nafkhanzam.com",
  title: "@nafkhanzam/template-webapp",
  description: "template-webapp description",
  twitterHandle: "@nafkhanzam",
  graphqlApiUrl: "https://localhost:4000/graphql",
};

export const assets = {
  favicon: "/favicon.ico",
};

export const theme: Theme = {colors: {}};
