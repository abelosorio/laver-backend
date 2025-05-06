export const IS_PRODUCTION = process.env.ENVIRONMENT === 'production'
export const PORT = process.env.PORT ?? 3001
export const DB_NAME = process.env.DB_NAME ?? 'laver'
export const DB_USER = process.env.DB_USER ?? 'laver'
export const DB_PASSWORD = process.env.DB_PASSWORD ?? 'laver'
export const DB_HOST = process.env.DB_HOST ?? 'localhost'
export const DB_PORT = parseInt(process.env.DB_PORT) ?? 5432
export const DB_DIALECT = 'postgres'
export const ALLOWED_CORS_ORIGINS_REGEX= process.env.ALLOWED_CORS_ORIGINS_REGEX ?? /^(http:\/\/localhost:3000|https:\/\/studio.apollographql.com)$$/
