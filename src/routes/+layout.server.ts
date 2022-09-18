import { auth } from '$lib/lucia.js';
import { handleSession } from "lucia-sveltekit"

// export const load = auth.handleServerLoad(handleSession(), async ({ getSession }) => {
export const load = auth.handleServerLoad(handleSession(), async () => {
  console.log("load")
  return {
    message: "hello"
  }
})