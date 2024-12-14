const WORDPRESS_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://samikaranadhikari.com.np";

export const config = {
  wordPressUrl: WORDPRESS_URL,
  graphqlUrl: `${WORDPRESS_URL}/graphql`,
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
};

// Log configuration in development
if (process.env.NODE_ENV === "development") {
  console.log("Config:", config);
}
