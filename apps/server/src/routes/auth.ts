import { Prisma } from '@prisma/client'
import express from 'express'
import createHttpError from 'http-errors'
import { prisma } from '../lib/prisma'
import verifyAuth from '../middleware/authVerify'
import { CustomRequest } from '../types'

const routes = express.Router()

routes.post('/signup', async (req, res, next) => {
	try {
		const { name, email, uid, happy } = req.body

		await prisma.user.create({
			data: {
				email,
				name,
				uid,
				happy,
			},
		})
		res.status(200).json({
			message: 'Signup successful',
		})
	} catch (err) {
		if (err instanceof Prisma.PrismaClientValidationError) {
			return next(createHttpError(403, 'Validation failed'))
		}
		next(createHttpError(400, 'Signup failed'))
	}
})

routes.get('/profile', verifyAuth, async (req: CustomRequest, res) => {
	const user = await prisma.user.findUnique({
		where: {
			email: req.payload.email,
		},
	})
	res.status(200).json({
		data: user,
	})
})

export default routes
