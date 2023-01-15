import { httpRequestWithAuth } from '@/lib/helpers'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useProducts() {
	return useQuery(['products'], () => httpRequestWithAuth('GET', '/products'), {
		select: (res) => res.data,
		staleTime: 60000,
	})
}

export function useSaveProduct() {
	return useMutation({
		mutationFn: ({ body, productId }: any) => {
			if (productId) {
				return httpRequestWithAuth('PUT', `/products/${productId}`, body)
			} else {
				return httpRequestWithAuth('POST', '/products', body)
			}
		},
	})
}

export function useDeleteProduct() {
	return useMutation({
		mutationFn: ({ productId }: any) => {
			return httpRequestWithAuth('DELETE', `/products/${productId}`)
		},
	})
}
