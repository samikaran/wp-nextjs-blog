namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_WORDPRESS_API_URL: string;
    WORDPRESS_PROTOCOL: string;
    WORDPRESS_HOST: string;
    NODE_ENV: "development" | "production" | "test";
  }
}
