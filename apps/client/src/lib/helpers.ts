import Cookies from 'js-cookie'

export async function httpRequest(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, body?: object) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
		method,
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
		},
	})
	return await res.json()
}

export async function httpRequestWithAuth(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, body?: object) {
	const token = Cookies.get('token')
	const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
		method,
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	})
	return await res.json()
}
