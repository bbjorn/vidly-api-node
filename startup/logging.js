const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');


module.exports = function() {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new winston.transports.File({ filename: 'logfile.log' }),
      new winston.transports.File({ filename: 'uncaughtExceptions.log', level: 'error' }),
    ],
  });
  
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  // winston.add(winston.transports.MongoDB, { 
  //   db: 'mongodb://localhost/vidly',
  //   level: 'info'
  // });

  winston.add(logger)
}