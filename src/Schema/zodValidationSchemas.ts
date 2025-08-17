import z from 'zod'

export const loginSchema = z.object({
	email: z
		.email({ message: 'Please enter a valid email address.' })
		.min(1, { message: 'Email is required.' }),

	password: z
		.string()
		.min(6, { message: 'Password must be at least 6 characters long.' })
		.max(100, { message: 'Password cannot exceed 100 characters.' }),
})

export const registerSchema = z
	.object({
		name: z
			.string()
			.min(2, { message: 'Name must be at least 2 characters long.' })
			.max(50, { message: 'Name cannot exceed 50 characters.' })
			.regex(/^[a-zA-Z\s]+$/, {
				message: 'Name can only contain letters and spaces.',
			}),

		email: z
			.email({ message: 'Please enter a valid email address.' })
			.min(1, { message: 'Email is required.' }),

		password: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters long.' })
			.max(100, { message: 'Password cannot exceed 100 characters.' })
			.regex(/[A-Z]/, {
				message: 'Password must contain at least one uppercase letter.',
			})
			.regex(/[a-z]/, {
				message: 'Password must contain at least one lowercase letter.',
			})
			.regex(/[0-9]/, {
				message: 'Password must contain at least one number.',
			})
			.regex(/[@$!%*?&]/, {
				message:
					'Password must contain at least one special character (@, $, !, %, *, ?, &).',
			}),

		confirmPassword: z
			.string()
			.min(6, { message: 'Password must be at least 6 characters long.' })
			.max(100, { message: 'Password cannot exceed 100 characters.' })
			.regex(/[A-Z]/, {
				message: 'Password must contain at least one uppercase letter.',
			})
			.regex(/[a-z]/, {
				message: 'Password must contain at least one lowercase letter.',
			})
			.regex(/[0-9]/, {
				message: 'Password must contain at least one number.',
			})
			.regex(/[@$!%*?&]/, {
				message:
					'Password must contain at least one special character (@, $, !, %, *, ?, &).',
			}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match.',
		path: ['confirmPassword'],
	})

export const tourTypeSchema = z.object({
	name: z.string().min(5, { message: 'Tour Type Name is required.' }),
})

export const OTPSchema = z.object({
	pin: z.string().min(6, {
		message: 'Your OTP must be 6 characters.',
	}),
})
