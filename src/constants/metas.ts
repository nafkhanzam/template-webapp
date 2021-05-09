const MODE = process.env.NEXT_PUBLIC_MODE?.toLowerCase();
export const metas = {
  isProduction: MODE === "production" || MODE === "prod",
  url: "https://www.nafkhanzam.com",
  title: "@nafkhanzam/template-webapp",
  description: "template-webapp description",
  twitter: {
    handle: "@nafkhanzam",
    url: "https://twitter.com/nafkhanzam",
  },
  graphqlApiUrl: process.env.NEXT_PUBLIC_GRAPHQL_API_ENDPOINT ?? "http://localhost:4000/graphql",
};
