import { auth } from '$lib/server/lucia.js';
import type { RequestHandler } from './$types';
import { generateRandomString } from "lucia-auth";

export const GET: RequestHandler = async ({ request }) => {
	try {
		auth.validateRequestHeaders(request); // validate the user session
		const randomString = generateRandomString(8);
		return new Response(
			JSON.stringify({
				randomString
			})
		);
	} catch (e) {
		return new Response(
			JSON.stringify({
				error: 'Unauthorized'
			}),
			{
				status: 401
			}
		);
	}
};