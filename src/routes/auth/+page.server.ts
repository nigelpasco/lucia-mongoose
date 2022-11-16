import { invalid, redirect } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";
import type { PageServerLoad, Actions } from "./$types";
import { LuciaError } from "lucia-auth";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.getSession();
	if (session) throw redirect(302, '/profile');
	return {};
};

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const form = await request.formData();
		const username = form.get("username");
		const password = form.get("password");
		// check for empty values
		if (
			!username ||
			!password ||
			typeof username !== "string" ||
			typeof password !== "string"
		)
			return invalid(400, {
				message: 'Invalid input'
			});
		try {
			const user = await auth.authenticateUser(
				"username",
				username,
				password
			);
			const session = await auth.createSession(user.userId);
			locals.setSession(session);
		} catch (e) {
			if (e instanceof LuciaError) {
				const message = e.message;
				return invalid(400, {
					message
				});
			}
			const error = e as Error;
			if (
				error.message === 'AUTH_INVALID_PROVIDER_ID' ||
				error.message === 'AUTH_INVALID_PASSWORD' ||
				error.message === 'AUTH_OUTDATED_PASSWORD'
			) {
				return invalid(400, {
					message: 'Incorrect username or password.'
				});
			}
			// otherwise assume a database connection error
			console.error(error)
			return invalid(500, {
				message: 'Unknown error occurred'
			});
		}
	},
	register: async ({ request, locals }) => {
		const form = await request.formData();
		const username = form.get("username");
		const password = form.get("password");
		// check for empty values
		if (
			!username ||
			!password ||
			typeof username !== "string" ||
			typeof password !== "string"
		)
			return invalid(400, {
				message: 'Invalid input'
			});
		try {
			const user = await auth.createUser("username", username, {
				password,
				attributes: {
					username,
				},
			});
			const session = await auth.createSession(user.userId);
			locals.setSession(session);
		} catch (e) {
			if (e instanceof LuciaError) {
				const message = e.message;
				return invalid(400, {
					message
				});
			}
			const error = e as Error;
			if (
				error.message === 'AUTH_DUPLICATE_PROVIDER_ID' ||
				error.message === 'AUTH_DUPLICATE_USER_DATA'
			) {
				return invalid(400, {
					message: 'Incorrect username or password.'
				});
			}
			// otherwise assume a database connection error
			console.error(error)
			return invalid(500, {
				message: 'Unknown error occurred'
			});
		}
	},
};