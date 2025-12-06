declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development"
        PORT: string
        DATABASE_URI: string
    }