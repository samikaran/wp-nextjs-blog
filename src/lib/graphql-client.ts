import { GraphQLClient } from "graphql-request";

if (!process.env.WORDPRESS_API_URL) {
  throw new Error("WORDPRESS_API_URL is not defined");
}

export const graphqlClient = new GraphQLClient(process.env.WORDPRESS_API_URL, {
  headers: {
    "Content-Type": "application/json",
  },
});
