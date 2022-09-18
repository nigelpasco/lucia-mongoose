import { auth } from '$lib/lucia';
import type { Actions } from "@sveltejs/kit";
import { setCookie } from 'lucia-sveltekit';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');
		if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
			return {
				errors: {
					message: 'Invalid input',
					email: ''
				}
			};
		}
		try {
			const createUser = await auth.createUser('email', email, {
				password,
				user_data: {
					userName: email,
					email
				}
			});
			setCookie(cookies, ...createUser.cookies)
			return {
				location: "/profile"
			}
		} catch (e) {
			const error = e as Error;
			if (
				error.message === 'AUTH_DUPLICATE_IDENTIFIER_TOKEN' ||
				error.message === 'AUTH_DUPLICATE_USER_DATA'
			) {
				return {
					errors: {
						email: 'Email already taken',
						message: ''
					}
				};
			}
			console.error(error)
			return {
				status: 500,
				errors: {
					message: 'Unknown error',
					email: ''
				}
			};
		}
	}
}