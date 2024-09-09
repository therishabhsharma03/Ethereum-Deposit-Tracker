/**
 * Sets up a logger using Winston for logging information, warnings, and errors.
 * Logs are outputted to both the console and a file ('tracker.log') with timestamps and in JSON format.
 */
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'tracker.log' })
    ]
});

module.exports = {
    logger,
};
