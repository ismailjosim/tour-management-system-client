export const role = {
	SUPER_ADMIN: 'SUPER_ADMIN',
	ADMIN: 'ADMIN',
	USER: 'USER',
	GUIDE: 'GUIDE',
} as const

export type Role = (typeof role)[keyof typeof role]
