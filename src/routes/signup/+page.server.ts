import { auth } from '$lib/server/lucia';
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
			const user = await auth.createUser('email', email, {
				password,
				userData: {
					userName: email,
					email
				}
			});
			const { tokens } = await auth.createSession(user.userId);
			setCookie(cookies, ...tokens.cookies);
			// setCookie(cookies, ...createUser.cookies)
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