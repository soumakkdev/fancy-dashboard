export interface ICustomer {
	id?: string
	firstName: string
	lastName: string
	emailId: string
	mobileNo: string
	callingCode: string
	payment: {
		number: string
		expiry: string
		cvv: string
		name: string
		card: string
	}
	address: {
		address: string
		city: string
		state: string
		country: string
		pinCode: string
	}
	status: string
}
