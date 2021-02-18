const config = {
    development: {
        PORT: 5000,
        DB_CONNECTION: 'mongodb://localhost/cubicle',
        SALT_ROUNDS: 10,
        SECRET: 'navuhodonosor',
    },
    production: {
        PORT: 80,
        DB_CONNECTION: 'insert mongodb atlas connection ',
        SALT_ROUNDS: 10,
        SECRET: 'navuhodonosor',
    }
};

module.exports = config[process.env.NODE_ENV.trim()];