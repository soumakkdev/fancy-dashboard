import express, { Errback, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import createHttpError from 'http-errors'
import { Prisma } from '@prisma/client'

import authRoutes from './routes/auth'
import customerRoutes from './routes/customers'
import productRoutes from './routes/products'
import orderRoutes from './routes/orders'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(helmet())
app.use(
	cors({
		origin: ['http://localhost:3000'],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
)
app.use(morgan('dev'))

app.use('/auth', authRoutes)
app.use('/customers', customerRoutes)
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

app.get('/ping', (req, res) => {
	res.send('pong')
})

app.use((req, res, next) => {
	next(createHttpError.NotFound())
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	res.status(err.status || 500)
	res.json({
		status: 'error',
		message: err.message || 'Internal server error',
	})
})

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`)
})
