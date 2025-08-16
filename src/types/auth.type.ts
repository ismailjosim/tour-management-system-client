export interface ISendOTP {
	email: string
}
export interface IVerifyOTP {
	email: string
	otp: string
}

export interface ILogin {
	email: string
	password: string
}

export interface ILoginResult {
	statusCode: number
	success: boolean
	message: string
	data: Data
}

export interface Data {
	accessToken: string
	refreshToken: string
	user: User
}

export interface User {
	_id: string
	name: string
	email: string
	phone: string
	address: string
	role: string
	isDeleted: boolean
	isActive: string
	isVerified: boolean
	auths: Auth[]
	createdAt: string
	updatedAt: string
}

export interface Auth {
	provider: string
	providerId: string
}
