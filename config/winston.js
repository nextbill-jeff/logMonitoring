let appRoot = require('app-root-path');
let winston = require('winston');
const MESSAGE = Symbol.for('message');

const jsonFormatter = (logEntry) => {
  const base = {
    timestamp: new Date()
  };
  const json = Object.assign(base, logEntry)
  logEntry[MESSAGE] = JSON.stringify(json);
  return logEntry;
}




let options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    format: winston.format(jsonFormatter)(),
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    timestamp: true
  },
  console: {
    level: 'error',
    filename: `${appRoot}/logs/app.log`,
    format: winston.format(jsonFormatter)(),
    handleExceptions: true,
    json: true,
    colorize: true,
    timestamp: true
  }
};

let logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});


const elasticSearch = require('elasticsearch');
const client = new elasticSearch.Client()
client.index({
  index: 'logs',
  type: "log",
  body: logger.error('ssssssssssssssssssssssssssssssssssdddddddddd')
}, function (err, resp, status) {
  console.log("Response================================", resp);
  console.log("status================================", status);
  // console.log("Status",status);
})

// create a stream object with a 'write' function that will be used by `morgan`
// logger.stream = {
//   write: function(message, encoding) {
//     const elasticSearch = require('elasticsearch');
//     const client = new elasticSearch.Client()
//     console.log("================================================")
//     // use the 'info' log level so the output will be picked up by both transports (file and console)
//     client.index({
//       index : 'logs',
//       type : "log",
//       body : logger.error(message)
//   },function(err,resp,status){
//       console.log("Response",resp);
//       console.log("Error",err);
//       console.log("Status",status);
//   })
//   logger.info(message);
//   },
// };

module.exports = logger;