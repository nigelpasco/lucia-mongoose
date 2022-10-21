import lucia from "lucia-sveltekit";
import adapter from '@lucia-sveltekit/adapter-mongoose';
import mongoose from 'mongoose';
import { dev } from '$app/environment';

// Set the User Model
export const User = mongoose.model(
  "user",
  new mongoose.Schema({
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString()
    },
    provider_id: {
      type: String,
      unique: true,
      required: true,
    },
    hashed_password: String,
    username: String
  },
    { _id: false }
  )
);

// Set the Session Model
export const Session = mongoose.model(
  "session",
  new mongoose.Schema({
    _id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString()
    },
    user_id: {
      type: String,
      required: true
    },
    expires: {
      type: Number,
      required: true,
    },
    idle_expires: {
      type: Number,
      required: true,
    }
  },
    { _id: false })
);

// Initialise lucia with mongoose adapter
export const auth = lucia({
  adapter: adapter(mongoose),
  env: dev ? 'DEV' : 'PROD',
  transformUserData: (userData) => {
    return {
      userId: userData.id,
      username: userData.username,
    };
  },
});

export type Auth = typeof auth