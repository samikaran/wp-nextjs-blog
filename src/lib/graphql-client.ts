import { GraphQLClient } from "graphql-request";

const WORDPRESS_API_URL =
  process.env.WORDPRESS_API_URL || "http://localhost:8080/graphql";

if (process.env.NODE_ENV === "development" && !process.env.WORDPRESS_API_URL) {
  console.warn("Warning: WORDPRESS_API_URL is not defined in .env.local");
}

export const graphqlClient = new GraphQLClient(WORDPRESS_API_URL, {
  headers: {
    "Content-Type": "application/json",
  },
});
