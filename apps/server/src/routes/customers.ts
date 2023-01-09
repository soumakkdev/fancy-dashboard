import express from 'express'
import verifyAuth from '../middleware/authVerify'
import { prisma } from '../lib/prisma'
import createHttpError from 'http-errors'

const routes = express.Router()

routes.get('/', verifyAuth, async (req, res, next) => {
	try {
		const customers = await prisma.customer.findMany({})
		res.status(200).json({ data: customers, status: 'success' })
	} catch (err) {
		if (err instanceof Error) {
			next(createHttpError(500, err?.message ?? 'Unexpected error occurred while fetching customers'))
		}
	}
})

routes.post('/', verifyAuth, async (req, res, next) => {
	const { address, callingCode, emailId, firstName, lastName, mobileNo, payment, status } = req.body
	try {
		const newCustomer = await prisma.customer.create({
			data: {
				firstName,
				lastName,
				emailId,
				mobileNo,
				callingCode,
				address,
				payment,
				status,
			},
		})
		res.status(200).json({ data: newCustomer, status: 'success' })
	} catch (err) {
		if (err instanceof Error) {
			next(createHttpError(500, err?.message ?? 'Unexpected error occurred while creating the customer'))
		}
	}
})

routes.put('/:customerId', verifyAuth, async (req, res, next) => {
	const { customerId } = req.params
	const { address, callingCode, emailId, firstName, lastName, mobileNo, payment, orders, status } = req.body
	try {
		const updatedCustomer = await prisma.customer.update({
			data: {
				firstName,
				lastName,
				emailId,
				mobileNo,
				callingCode,
				address,
				payment,
				status,
			},
			where: {
				id: customerId,
			},
		})
		res.status(200).json({ data: updatedCustomer, status: 'success' })
	} catch (err) {
		if (err instanceof Error) {
			next(createHttpError(500, err?.message ?? 'Unexpected error occurred while updating the customer'))
		}
	}
})

routes.delete('/:customerId', verifyAuth, async (req, res, next) => {
	const { customerId } = req.params
	try {
		await prisma.customer.delete({
			where: {
				id: customerId,
			},
		})
		res.status(200).json({ status: 'success' })
	} catch (err) {
		if (err instanceof Error) {
			next(createHttpError(500, err?.message ?? 'Unexpected error occurred while deleting the customer'))
		}
	}
})

export default routes
