import { invalid, redirect, type Actions } from "@sveltejs/kit";
import { auth } from "$lib/server/lucia";

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
			return invalid(400);
		try {
			const user = await auth.authenticateUser(
				"username",
				username,
				password
			);
			const session = await auth.createSession(user.userId);
			locals.setSession(session);
		} catch (e) {
			const error = e as Error;
			if (
				error.message === 'AUTH_INVALID_PROVIDER_ID' ||
				error.message === 'AUTH_INVALID_PASSWORD' ||
				error.message === 'AUTH_OUTDATED_PASSWORD'
			) {
				return invalid(400, { username, incorrect: true });
			}

			if (
				error.message === 'DATABASE_FETCH_FAILED'
			) {
				return invalid(400, { username, failed: true });
			}

			// otherwise assume a database connection error
			console.error(error)
			return invalid(400, { username, failed: true });
		}
		throw redirect(302, "/profile"); // refresh the page by redirecting the user
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
			return invalid(400);
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
			const error = e as Error;
			if (
				error.message === 'AUTH_DUPLICATE_PROVIDER_ID' ||
				error.message === 'AUTH_DUPLICATE_USER_DATA'
			) {
				return invalid(400, { username, incorrect: true });
			}

			if (
				error.message === 'DATABASE_UPDATE_FAILED'
			) {
				return invalid(400, { username, failed: true });
			}

			// otherwise assume a database connection error
			console.error(error)
			return invalid(400, { username, failed: true });
		}
		throw redirect(302, "/profile");
	},
};