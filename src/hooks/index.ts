import { auth } from '$lib/lucia';
import type { Handle } from "@sveltejs/kit/types";

export const handle: Handle = auth.handleAuth;
