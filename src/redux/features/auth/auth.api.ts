import { baseApi } from '../../app/baseApi'

interface ISendOTP {
	email: string
}

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
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
		sendOTP: builder.mutation<null, ISendOTP>({
			query: (userInfo) => ({
				url: '/otp/send',
				method: 'POST',
				data: userInfo,
			}),
		}),
	}),
})

export const { useRegisterMutation, useLoginMutation, useSendOTPMutation } =
	authApi
