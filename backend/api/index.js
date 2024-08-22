import 'dotenv/config'
import express from 'express'
import path from 'path'
import rootRoute from '../routes/root.js'
import userRoute from '../routes/userRoutes.js'
import taskRoute from '../routes/taskRoutes.js'
import authRoute from '../routes/authRoutes.js'
import { fileURLToPath } from 'url'
import { logger, logEvents } from '../middleware/logger.js'
import { errorHandler } from '../middleware/errorHandler.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import corsOptions from '../config/corsOption.js'
import connectDB from '../config/dbConn.js'
import mongoose from 'mongoose'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PORT = process.env.PORT || 3500
const app = express()

connectDB()

app.use(logger)
app.use(cors(corsOptions)) //for a public api
app.use(express.json())
app.use(cookieParser())
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', rootRoute)
app.use('/users', userRoute)
app.use('/tasks', taskRoute)
app.use('/auth', authRoute)

console.log(process.env.NODE_ENV)

app.all('*', (req, res) => {
	res.status(404)
	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'views', '404.html'))
	} else if (req.accepts('json')) {
		res.json({ message: '404 Not Found' })
	} else {
		res.type('txt').send('404 Not Found')
	}
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
	console.log('Connected to MongoDB')
	app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})

mongoose.connection.on('error', (err) => {
	console.log(err)
	logEvents(
		`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
		'mongoErrDb.log'
	)
})