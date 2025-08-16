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
	role: string
	isDeleted: boolean
	isActive: boolean | string // 👈 depends on API (boolean preferred)
	isVerified: boolean
	auths: IAuth[]
	picture?: string
	createdAt: string
	updatedAt: string
}

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
export interface IUserInfo {
	statusCode: number
	success: boolean
	message: string
	data: IUser
}
// -------------------- User Logout -------------------- //
export interface ILogoutResponse {
	statusCode: number
	success: boolean
	message: string
	data: null
}
