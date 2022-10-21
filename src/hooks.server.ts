import { auth } from "$lib/server/lucia";
import mongoose from "mongoose";

// Pull environment variables
const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb+srv://<dummy>:<dummy>@cluster0.pnyak.mongodb.net/<dummy>?retryWrites=true&w=majority';

try {
  mongoose.connect(url, { autoIndex: false });
} catch (error) {
  console.log(error);
}

export const handle = auth.handleHooks();