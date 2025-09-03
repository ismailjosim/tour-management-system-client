import type {
	ILogin,
	ILoginResult,
	ILogoutResponse,
	IResponse,
	ISendOTP,
	IUserInfo,
	IVerifyOTP,
} from '../../../types'
import type { IUser } from '../../../types/auth.type'
import { baseApi } from '../../app/baseApi'

export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (userInfo) => ({
				url: '/user/register',
				method: 'POST',
				data: userInfo,
			}),
		}),
		login: builder.mutation<ILoginResult, ILogin>({
			query: (userInfo) => ({
				url: '/auth/login',
				method: 'POST',
				data: userInfo,
			}),
		}),
		logout: builder.mutation<ILogoutResponse, undefined>({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
			invalidatesTags: ['USER'],
		}),
		userInfo: builder.query<IUserInfo<IUser>, undefined>({
			query: () => ({
				url: '/user/me',
				method: 'GET',
			}),
			providesTags: ['USER'],
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
		updateProfile: builder.mutation({
			query: ({ id, ...userInfo }) => ({
				url: `/user/${id}`,
				method: 'PATCH',
				data: userInfo,
			}),
			invalidatesTags: ['USER'],
		}),
	}),
})

export const {
	useRegisterMutation,
	useLoginMutation,
	useSendOTPMutation,
	useVerifyOTPMutation,
	useUserInfoQuery,
	useLogoutMutation,
	useUpdateProfileMutation,
} = authApi
