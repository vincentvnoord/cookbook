
export const DEV_API_URL = "http://192.168.178.53:8080"
export const PROD_API_URL = "https://cookbook.vincentvnoord.dev";

export const API_URL = process.env.NODE_ENV === "development" ? DEV_API_URL : PROD_API_URL;