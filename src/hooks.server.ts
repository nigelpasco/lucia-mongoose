import { auth } from "$lib/server/lucia";
import { handleHooks } from "@lucia-auth/sveltekit";
import type { Handle } from "@sveltejs/kit";
import mongoose from "mongoose";

// Pull environment variables
const mongoUri = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb+srv://<dummy>:<dummy>@cluster0.pnyak.mongodb.net/<dummy>?retryWrites=true&w=majority';

//TODO: move this to db.ts as per lucia docs???
try {
  mongoose.connect(mongoUri, { autoIndex: false });
} catch (error) {
  console.log(error);
}

export const handle: Handle = handleHooks(auth);