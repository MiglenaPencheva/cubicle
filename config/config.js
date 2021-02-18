const config = {
    development: {
        PORT: 5000,
        DB_CONNECTION: 'mongodb://localhost/cubicle',
        SALT_ROUNDS: 10
    },
    production: {
        PORT: 80,
        SALT_ROUNDS: 10,
        DB_CONNECTION: 'insert mongodb atlas connection ',
    }
};

module.exports = config[process.env.NODE_ENV.trim()];