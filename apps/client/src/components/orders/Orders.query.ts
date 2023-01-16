import { httpRequestWithAuth } from '@/lib/helpers'
import { IOrderReqBody } from '@/types/order'
import { useMutation, useQuery } from '@tanstack/react-query'

export function useOrders() {
	return useQuery(['orders'], () => httpRequestWithAuth('GET', '/orders'), {
		select: (res) => res.data,
		staleTime: 60000,
	})
}

export function usePlaceOrder() {
	return useMutation({
		mutationFn: ({ body }: { body: IOrderReqBody }) => {
			return httpRequestWithAuth('POST', '/orders', body)
		},
	})
}
