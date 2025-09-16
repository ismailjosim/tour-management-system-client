// 🔹 Auth provider info
export interface IAuth {
	provider: string
	providerId: string
}

// 🔹 Base user model (used everywhere)
export interface IUser {
	_id: string
	name: string
	email: string
	phone: string
	address: string
	role: Role
	isDeleted: boolean
	isActive: IsActive
	isVerified: boolean
	auths: IAuth[]
	picture?: string
	createdAt: string
	updatedAt: string
}

// Types based on your interface
export type Role = 'ADMIN' | 'USER' | 'GUIDE' | 'SUPER_ADMIN'
export type IsActive = 'ACTIVE' | 'INACTIVE' | 'BLOCKED'

// -------------------- Auth Flow -------------------- //

// 🔹 Send OTP
export interface ISendOTP {
	email: string
}

// 🔹 Verify OTP
export interface IVerifyOTP {
	email: string
	otp: string
}

// 🔹 Login request
export interface ILogin {
	email: string
	password: string
}

// 🔹 Login response
export interface ILoginResult {
	statusCode: number
	success: boolean
	message: string
	data: ILoginData
}

export interface ILoginData {
	accessToken: string
	refreshToken: string
	user: IUser
}

// -------------------- User Info -------------------- //

// 🔹 User info response
export interface IUserInfo<T> {
	statusCode: number
	success: boolean
	message: string
	data: T
}
// -------------------- User Logout -------------------- //
export interface ILogoutResponse {
	statusCode: number
	success: boolean
	message: string
	data: null
}
