let appRoot = require('app-root-path');

let winston = require('winston');

let options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    format : winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss A ZZ'
      }),
      winston.format.json()
    ),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    timestamp : true
  },
  console: {
    level: 'error',
    filename: `${appRoot}/logs/app.log`,
    format : winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss A ZZ'
      }),
      winston.format.json()
    ),
    handleExceptions: true,
    json: true,
    colorize: true,
    timestamp : true
  }
};

let logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function(message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

module.exports = logger;
