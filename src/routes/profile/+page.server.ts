import { dev } from "$app/environment";
import { auth } from "$lib/server/lucia";
import { invalid, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, locals }) => {
	const session = await locals.getSession();
	if (!session) throw redirect(302, "/auth");
	const notes = cookies.get("notes") || "";
	return {
		notes,
	};
};

export const actions: Actions = {
	updateNote: async ({ cookies, request, locals }) => {
		const session = await locals.getSession();
		if (!session) return invalid(403);
		const formData = await request.formData();
		const notes = formData.get("notes")?.toString();
		if (notes === undefined) return invalid(400);
		cookies.set("notes", notes, {
			httpOnly: true,
			secure: !dev,
			path: "/",
		});
	},
	updateUser: async ({ request, locals }) => {
		const session = await locals.getSession();
		if (!session) return invalid(403);
		const data = await request.formData()
		const username = data.get("username")

		try {
			await auth.updateUserAttributes(session.userId, {
				// phoneNumber: "000-0000-0000",
				// profilePicture: null,
				username: username
			});
		} catch (e) {
			const error = e as Error;
			if (
				error.message === 'AUTH_INVALID_REQUEST'
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
		throw redirect(302, "/profile"); // refresh the page to refresh userData, cookies etc.
	},
	updatePassword: async ({ request, locals }) => {
		const session = await locals.getSession();
		if (!session) return invalid(403);
		const data = await request.formData()
		const password = data.get("password")

		try {
			await auth.updateUserPassword(session.userId, password);
			// return { success: true };
		} catch (e) {
			const error = e as Error;
			if (
				error.message === 'AUTH_INVALID_PASSWORD'
			) {
				return invalid(400, { password, incorrect: true });
			}

			if (
				error.message === 'DATABASE_UPDATE_FAILED'
			) {
				return invalid(400, { password, failed: true });
			}

			// otherwise assume a database connection error
			console.error(error)
			return invalid(400, { password, failed: true });
		}
		throw redirect(302, "/auth"); // need to redirect as the userPassword function seems to delete the session also.
	},
	deleteUser: async ({ locals }) => {
		const session = await locals.getSession();
		if (!session) return invalid(403);

		try {
			await auth.deleteUser(session.userId);
		} catch (e) {
			const error = e as Error;
			if (
				error.message === 'AUTH_INVALID_REQUEST'
			) {
				return invalid(400, { userId: session.userId, incorrect: true });
			}

			if (
				error.message === 'DATABASE_UPDATE_FAILED'
			) {
				return invalid(400, { userId: session.userId, failed: true });
			}

			// otherwise assume a database connection error
			console.error(error)
			return invalid(400, { userId: session.userId, failed: true });
		}
		throw redirect(302, "/auth"); // return to auth on successful deletion
	}
};
