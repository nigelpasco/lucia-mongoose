import type { Action } from '@sveltejs/kit';
import { auth } from '$lib/lucia';

export const POST: Action = async ({ request, setHeaders }) => {
	const form = await request.formData();
	const email = form.get('email');
	const password = form.get('password');

	if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
		return {
			errors: {
				message: 'Invalid input'
			}
		};
	}

	try {
		const authenticateUser = await auth.authenticateUser('userName', email, password);
		setHeaders({
			'set-cookie': authenticateUser.cookies
		});
		return {
			location: '/profile'
		};
	} catch (e) {
		console.log(e)
		const error = e as Error;
		if (
			error.message === 'AUTH_INVALID_IDENTIFIER_TOKEN' ||
			error.message === 'AUTH_INVALID_PASSWORD'
		) {
			return {
				errors: {
					message: 'Incorrect userName or password.'
				}
			};
		}
		// database connection error
		return {
			status: 500,
			errors: {
				message: 'Unknown error.'
			}
		};
	}
};
