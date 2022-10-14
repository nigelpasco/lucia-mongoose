import { redirect } from '@sveltejs/kit';
import { getUser } from "lucia-sveltekit/load";
import type { Load } from "@sveltejs/kit";

export const load: Load = async (event) => {
	const user = await getUser(event);
	if (!user) {
		// authenticated
		throw redirect(302, '/auth');
	}
};