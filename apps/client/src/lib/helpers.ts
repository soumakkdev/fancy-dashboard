import nookies from 'nookies'

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
	const cookies = nookies.get(undefined, 'token')

	const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
		method,
		body: JSON.stringify(body),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${cookies.token}`,
		},
	})

	const data = await res.json()
	if (!res.ok) {
		throw new Error(data?.message)
	}
	return data
}
