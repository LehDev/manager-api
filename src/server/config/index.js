const dotenv = require('dotenv');

dotenv.config();

const { env } = process;

const config = {
    backend: {
        host: env.BACKEND_SERVER_HOST,
        port:  env.BACKEND_SERVER_PORT,
    },
    database: {
        client: env.DATABASE_CLIENT,
        pool: {
            min: 2,
            max: 35,
        },
        connection: {
            host:  env.DATABASE_CONNECTION_HOST,
            user: env.DATABASE_USER,
            password:  env.DATABASE_PASSWORD,
            database: env.DATABASE_SCHEMA,
        },
    },
    jwt: {
        token: env.JWT_TOKEN,
        expires: {
            time: env.JWT_EXPIRES_TIME,
            format: env.JWT_EXPIRES_FORMAT,
        },
    },
};

module.exports = config;
