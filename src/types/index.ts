export type {
	ISendOTP,
	IVerifyOTP,
	ILogin,
	ILoginResult,
	IUserInfo,
	ILogoutResponse,
} from './auth.type'

export interface IResponse<T> {
	statusCode: number
	success: boolean
	message: string
	data: T
}
