import lucia from "lucia-sveltekit";
import adapter from '@lucia-sveltekit/adapter-mongoose';
import mongoose from 'mongoose';
import { dev } from '$app/environment';

// Pull environment variables
const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : 'mongodb+srv://<dummy>:<dummy>@cluster0.pnyak.mongodb.net/<dummy>?retryWrites=true&w=majority';

// Set the User Model
export const User = mongoose.model(
  "user",
  new mongoose.Schema(
    {
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
      email: String,
      user_name: String
    },
    { _id: false }
  )
);

// Set the Session Model
export const Session = mongoose.model(
  "session",
  new mongoose.Schema({
    access_token: {
      type: String,
      unique: true,
      required: true,
    },
    user_id: {
      type: String,
      required: true
    },
    expires: {
      type: Number,
      required: true,
    },
  })
);

// Set the RefreshToken Model
export const RefreshToken = mongoose.model(
  "refresh_token",
  new mongoose.Schema({
    refresh_token: {
      unique: true,
      required: true,
      type: String,
    },
    user_id: {
      required: true,
      type: String,
    },
  })
);

// Initialise lucia with mongoose adapter
export const auth = lucia({
  adapter: adapter(mongoose, url),
  env: dev ? 'DEV' : 'PROD'
});