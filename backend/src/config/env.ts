import * as dotenv from "dotenv";
dotenv.config({ path: "src/.env" });

export const {
    NODE_ENV,
    PORT,
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    JWT_SECRET,
    JWT_EXPIRES_IN,
} = process.env;