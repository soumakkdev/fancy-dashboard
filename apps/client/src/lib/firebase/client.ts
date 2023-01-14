import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
}

// if firebase client is called from browser and no apps is present then initialize the app
// if (typeof window !== 'undefined' && !getApps().length) {}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }
