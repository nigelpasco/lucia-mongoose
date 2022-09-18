import { redirect } from '@sveltejs/kit';
import { handleLoad } from 'lucia-sveltekit/load';
import type { PageLoad } from './$types';

export const load: PageLoad = handleLoad(async ({ getSession }) => {
  const session = await getSession();
  if (session) throw redirect(302, '/profile');
  return {};
});