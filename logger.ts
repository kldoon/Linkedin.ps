import winston from "winston";

const baseLogger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { project: 'linked.ps', time: new Date() },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/all.log' }),
  ],
});

// This only will log when the environment is not production
if (process.env.NODE_ENV !== 'production') {
  baseLogger.add(
    new winston.transports.Console({ format: winston.format.simple() })
  )
}

export default baseLogger;