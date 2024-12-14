import { GraphQLClient } from "graphql-request";
import { config } from "../config";

// Create a server-side GraphQL client
export const serverClient = new GraphQLClient(config.graphqlUrl, {
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  },
});

// Create a client-side GraphQL client specifically for mutations
export const clientClient = new GraphQLClient(config.graphqlUrl, {
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "include",
});

// // Log in development
// if (config.isDevelopment) {
//   console.log("GraphQL URL:", config.graphqlUrl);
// }

// export const graphqlClient = new GraphQLClient(WORDPRESS_API_URL, {
//   headers: {
//     "Content-Type": "application/json",
//   },
//   mode: "cors",
//   credentials: "include",
// });
