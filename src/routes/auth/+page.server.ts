import { redirect, invalid, type Actions } from "@sveltejs/kit";
import { auth } from '$lib/server/lucia';
import { setCookie } from "lucia-sveltekit";

export const actions: Actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData()
		const email = data.get("email")
		const password = data.get("password")

		if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
			return invalid(400, { email, incorrect: true });
		}
		try {
			const user = await auth.authenticateUser('email', email, password);
			const { tokens } = await auth.createSession(user.userId);
			setCookie(cookies, ...tokens.cookies);
		} catch (e) {
			const error = e as Error;
			if (
				error.message === 'AUTH_INVALID_PROVIDER_ID' ||
				error.message === 'AUTH_INVALID_PASSWORD' ||
				error.message === 'AUTH_OUTDATED_PASSWORD'
			) {
				return invalid(400, { email, incorrect: true });
			}

			if (
				error.message === 'DATABASE_FETCH_FAILED'
			) {
				return invalid(400, { email, failed: true });
			}

			// otherwise assume a database connection error
			console.error(error)
			return invalid(400, { email, failed: true });
		}
		throw redirect(302, "/profile"); // refresh the page by redirecting the user
	},
	register: async ({ cookies, request }) => {
		const data = await request.formData()
		const email = data.get("email")
		const password = data.get("password")

		if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
			return invalid(400, { email, incorrect: true });
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
		} catch (e) {
			const error = e as Error;
			if (
				error.message === 'AUTH_DUPLICATE_PROVIDER_ID' ||
				error.message === 'AUTH_DUPLICATE_USER_DATA'
			) {
				return invalid(400, { email, incorrect: true });
			}

			if (
				error.message === 'DATABASE_UPDATE_FAILED'
			) {
				return invalid(400, { email, failed: true });
			}

			// otherwise assume a database connection error
			console.error(error)
			return invalid(400, { email, failed: true });
		}
		throw redirect(302, "/profile"); // refresh the page by redirecting the user
	}
}