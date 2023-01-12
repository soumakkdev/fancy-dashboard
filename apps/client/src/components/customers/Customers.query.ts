import { httpRequestWithAuth } from '@/lib/helpers'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useCustomers() {
	return useQuery(['customers'], () => httpRequestWithAuth('GET', '/customers'))
}

export function useSaveCustomer() {
	return useMutation({
		mutationFn: ({ body, isEdit, customerId }: any) => {
			if (isEdit) {
				return httpRequestWithAuth('PUT', `/customers/${customerId}`, body)
			} else {
				return httpRequestWithAuth('POST', '/customers', body)
			}
		},
	})
}

export function useDeleteCustomer() {
	return useMutation({
		mutationFn: ({ customerId }: any) => {
			return httpRequestWithAuth('DELETE', `/customers/${customerId}`)
		},
	})
}
