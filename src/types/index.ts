import type { ComponentType } from 'react'

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

export interface ISidebarItem {
	title: string
	items: {
		title: string
		url: string
		component: ComponentType
	}[]
}
