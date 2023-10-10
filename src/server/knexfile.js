require('dotenv').config();

const { env } = process;

module.exports = {
        client: env.DATABASE_CLIENT,
        pool: {
            min: 2,
            max: 35,
        },
        connection: {
            host: env.DATABASE_CONNECTION_HOST,
            user: env.DATABASE_USER,
            password: env.DATABASE_PASSWORD,
            database: env.DATABASE_SCHEMA,
        },

    development: {
        client: env.DATABASE_CLIENT,
        pool: {
            min: 2,
            max: 35,
        },
        connection: {
            host: env.DATABASE_CONNECTION_HOST,
            user: env.DATABASE_USER,
            password: env.DATABASE_PASSWORD,
            database: env.DATABASE_SCHEMA,
        },
    },
};
