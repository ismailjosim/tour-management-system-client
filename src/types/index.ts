/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface ApiError {
	success: boolean
	message: string
	errorSources: unknown[]
	err?: Record<string, any>
	stack?: string
}

export type TRole = 'SUPER_ADMIN' | 'ADMIN' | 'USER' | 'GUIDE'
