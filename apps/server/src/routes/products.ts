import express from 'express'
import verifyAuth from '../middleware/authVerify'
import { prisma } from '../lib/prisma'
import createHttpError from 'http-errors'

const routes = express.Router()

routes.get('/', verifyAuth, async (req, res, next) => {
	try {
		const products = await prisma.product.findMany({
			include: {
				orderItems: true,
			},
		})
		res.status(200).json({ data: products, status: 'success' })
	} catch (err) {
		if (err instanceof Error) {
			next(createHttpError(500, err?.message ?? 'Unexpected error occurred while fetching products'))
		}
	}
})

routes.post('/', verifyAuth, async (req, res, next) => {
	const { name, image, price, sku, description, status } = req.body
	try {
		const newProduct = await prisma.product.create({
			data: {
				name,
				image,
				price,
				sku,
				description,
				status,
			},
		})
		res.status(200).json({ data: newProduct, status: 'success' })
	} catch (err) {
		if (err instanceof Error) {
			next(createHttpError(500, err?.message ?? 'Unexpected error occurred while creating the product'))
		}
	}
})

routes.put('/:productId', verifyAuth, async (req, res, next) => {
	const { productId } = req.params
	const { name, image, price, sku, description, status } = req.body
	try {
		const updatedProduct = await prisma.product.update({
			data: {
				name,
				image,
				price,
				sku,
				description,
				status,
			},
			where: {
				id: productId,
			},
		})
		res.status(200).json({ data: updatedProduct, status: 'success' })
	} catch (err) {
		if (err instanceof Error) {
			next(createHttpError(500, err?.message ?? 'Unexpected error occurred while updating the product'))
		}
	}
})

routes.delete('/:productId', verifyAuth, async (req, res, next) => {
	const { productId } = req.params
	try {
		await prisma.product.delete({
			where: {
				id: productId,
			},
		})
		res.status(200).json({ status: 'success' })
	} catch (err) {
		if (err instanceof Error) {
			next(createHttpError(500, err?.message ?? 'Unexpected error occurred while deleting the product'))
		}
	}
})

export default routes
