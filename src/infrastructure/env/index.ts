require('custom-env').env('dev')
import dotenv from 'dotenv'
dotenv.config()
/** export env constant */
export const env = {
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    TOKEN_HEADER_KEY: process.env.TOKEN_HEADER_KEY,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    APPPORT: process.env.PORT,
    JWT_TIMEOUT_DURATION: process.env.JWT_TIMEOUT_DURATION,
    LOG_LEVEL:process.env.LOG_LEVEL,
    HOST:process.env.HOST,
    NODE_ENV:process.env.NODE_ENV,
    FCM_SERVER_KEY:process.env.FCM_SERVER_KEY,
    SITE_TITLE:process.env.SITE_TITLE,
    AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET_NAME:process.env.AWS_BUCKET_NAME,
    IOS_NOTIFICATION_TEAM_ID:process.env.IOS_NOTIFICATION_TEAM_ID,
    IOS_NOTIFICATION_PASSWARD:process.env.IOS_NOTIFICATION_PASSWARD,
    EMAIL_HOST:process.env.EMAIL_HOST,
    EMAIL_USERNAME:process.env.EMAIL_USERNAME,
    EMAIL_PASSWORD:process.env.EMAIL_PASSWORD,
    EMAIL_FROM_TEXT:process.env.EMAIL_FROM_TEXT,
    SANDGRID_API_KEY:process.env.TO_EMAIL,
    TO_EMAIL:process.env.TO_EMAIL
}