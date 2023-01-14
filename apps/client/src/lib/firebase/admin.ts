import * as admin from 'firebase-admin'
import { getApp } from 'firebase-admin/app'
import { Auth, getAuth } from 'firebase-admin/auth'

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert('./serviceAccountKey.json'),
	})
}

const app = getApp()
const auth = getAuth(app)

export { app, auth }
