import lucia from "lucia-sveltekit";
import adapter from '@lucia-sveltekit/adapter-mongoose';
import mongoose from 'mongoose';
import { dev } from '$app/env';

// Pull environment variables
const url = process.env.MONGODB_URI ? process.env.MONGODB_URI : '';
const apisecret = process.env.API_SECRET ? process.env.API_SECRET : '';

// Set the User Model
export const User = mongoose.model(
  "user",
  new mongoose.Schema(
    {
      _id: String,
      identifier_token: {
        type: String,
        unique: true,
        required: true,
      },
      hashed_password: String
    },
    { _id: false }
  )
);

// Set the RefreshToken Model
export const RefreshToken = mongoose.model(
  'refresh_token',
  new mongoose.Schema({
    refresh_token: String,
    user_id: String
  })
);

// Initialise lucia with mongoose adapter
export const auth = lucia({
  adapter: adapter(mongoose, url),
  secret: apisecret,
  env: dev ? 'DEV' : 'PROD'
});