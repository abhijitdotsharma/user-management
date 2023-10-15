import winston from 'winston'

const { combine, timestamp, json } = winston.format

// log file location
enum LogFile {
  'info' = 'info.log',
  'error' = 'error.log',
}
const LOG_DIR = '/var/log/user-app'

let format = combine(timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }), json())

// Development
const consoleFormat = winston.format.printf(
  ({ level, message, timestamp, stack }) => {
    return `${level} : ${timestamp} : ${stack || message}`
  },
)

const logger = winston.createLogger({
  level: 'info',
  format: format,
  transports: [
    new winston.transports.File({
      dirname: LOG_DIR,
      filename: LogFile.info,
      level: 'info',
    }),
    new winston.transports.File({
      dirname: LOG_DIR,
      filename: LogFile.error,
      level: 'error',
    }),
  ],
})

export { logger }
