import { NextFunction, Request, Response } from 'express'
import { auth } from '../lib/firebase'
import createHttpError from 'http-errors'
import { CustomRequest } from '../types'

export default async function verifyAuth(req: CustomRequest, res: Response, next: NextFunction) {
	try {
		const authHeader = req.headers['authorization']
		const token = authHeader?.split('Bearer ')[1]

		if (token) {
			const payload = await auth.verifyIdToken(token)
			req.payload = payload
			next()
		} else {
			next(createHttpError.Unauthorized())
		}
	} catch (err) {
		next(createHttpError.Unauthorized())
	}
}
