import {rateLimit} from 'express-rate-limit'
import { logEvents } from './logger.js'

const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 5,
    message: {
        message: 'Too many login attempts from this IP, please try again after a 60 seconds pause.'
    },
    handler: (req, res, next, options) => {
        logEvents(`Too many requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false,
})

export default loginLimiter;