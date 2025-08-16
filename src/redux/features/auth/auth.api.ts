import type {
	ILogin,
	ILoginResult,
	IResponse,
	ISendOTP,
	IVerifyOTP,
} from '../../../types'
import { baseApi } from '../../app/baseApi'

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<ILoginResult, ILogin>({
			query: (userInfo) => ({
				url: '/auth/login',
				method: 'POST',
				data: userInfo,
			}),
		}),
		register: builder.mutation({
			query: (userInfo) => ({
				url: '/user/register',
				method: 'POST',
				data: userInfo,
			}),
		}),
		sendOTP: builder.mutation<IResponse<null>, ISendOTP>({
			query: (userInfo) => ({
				url: '/otp/send',
				method: 'POST',
				data: userInfo,
			}),
		}),
		verifyOTP: builder.mutation<IResponse<null>, IVerifyOTP>({
			query: (userInfo) => ({
				url: '/otp/verify',
				method: 'POST',
				data: userInfo,
			}),
		}),
	}),
})

export const {
	useRegisterMutation,
	useLoginMutation,
	useSendOTPMutation,
	useVerifyOTPMutation,
} = authApi
