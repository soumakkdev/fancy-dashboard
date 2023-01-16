import express from 'express'
import verifyAuth from '../middleware/authVerify'
import { prisma } from '../lib/prisma'
import createHttpError from 'http-errors'

const routes = express.Router()

routes.get('/', verifyAuth, async (req, res, next) => {
	try {
		const orders = await prisma.order.findMany({
			include: {
				customer: true,
				items: {
					include: {
						product: true,
					},
				},
			},
		})
		res.status(200).json({ data: orders, status: 'success' })
	} catch (err) {
		console.log(err)
		if (err instanceof Error) {
			next(createHttpError(500, err?.message ?? 'Unexpected error occurred while fetching orders'))
		}
	}
})

routes.post('/', verifyAuth, async (req, res, next) => {
	const { customerId, discount, subtotal, total, products } = req.body
	try {
		const newOrder = await prisma.order.create({
			data: {
				customer: {
					connect: {
						id: customerId,
					},
				},
				discount,
				subtotal,
				total,
				items: {
					createMany: {
						data: products,
					},
				},
			},
		})
		res.status(200).json({ data: newOrder, status: 'success' })
	} catch (err) {
		if (err instanceof Error) {
			next(createHttpError(500, err?.message ?? 'Unexpected error occurred while creating the order'))
		}
	}
})

routes.delete('/:orderId', verifyAuth, async (req, res, next) => {
	const { orderId } = req.params
	try {
		await prisma.order.delete({
			where: {
				id: orderId,
			},
		})
		res.status(200).json({ status: 'success' })
	} catch (err) {
		if (err instanceof Error) {
			next(createHttpError(500, err?.message ?? 'Unexpected error occurred while deleting the order'))
		}
	}
})

export default routes
