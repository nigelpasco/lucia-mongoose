import { redirect, invalid, type Actions } from "@sveltejs/kit";
import { auth } from '$lib/server/lucia';

// default function is to update the users password
export const actions: Actions = {
	updateUser: async ({ request }) => {
		const data = await request.formData()
		const userName = data.get("userName")
		const userId = data.get("userId")

		try {
			await auth.updateUserData(userId, {
				// phoneNumber: "000-0000-0000",
				// profilePicture: null,
				userName
			});
		} catch (e) {
			const error = e as Error;
			if (
				error.message === 'AUTH_INVALID_REQUEST'
			) {
				return invalid(400, { userName, incorrect: true });
			}

			if (
				error.message === 'DATABASE_UPDATE_FAILED'
			) {
				return invalid(400, { userName, failed: true });
			}

			// otherwise assume a database connection error
			console.error(error)
			return invalid(400, { userName, failed: true });
		}
		throw redirect(302, "/profile"); // refresh the page to refresh userData, cookies etc.
	},
	updatePassword: async ({ request }) => {
		const data = await request.formData()
		const password = data.get("password")
		const userId = data.get("userId")

		try {
			await auth.updateUserPassword(userId, password);
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
		throw redirect(302, "/profile"); // refresh the page to refresh userData, cookies etc.
	},
	deleteUser: async ({ request }) => {
		const data = await request.formData()
		const userId = data.get("userId")

		try {
			await auth.deleteUser(userId);
		} catch (e) {
			const error = e as Error;
			if (
				error.message === 'AUTH_INVALID_REQUEST'
			) {
				return invalid(400, { userId, incorrect: true });
			}

			if (
				error.message === 'DATABASE_UPDATE_FAILED'
			) {
				return invalid(400, { userId, failed: true });
			}

			// otherwise assume a database connection error
			console.error(error)
			return invalid(400, { userId, failed: true });
		}
		throw redirect(302, "/auth"); // return to auth on successful deletion
	}
}