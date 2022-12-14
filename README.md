# lucia-mongoose

This is a basic implementation of sveltekit with lucia-sveltekit by PilcrowOnPaper, and utilising the mongoose-adapter courtesy of SkepticMystic.

## Setting up project

Follow the guide here (thanks again to PilcrowOnPaper) [guide](https://lucia-sveltekit.vercel.app/)

You will then need to install npm dependencies...

This version uses:
		"@lucia-sveltekit/adapter-mongoose": "^0.4.1"
		"@sveltejs/adapter-node": "1.0.0-next.99"
		"lucia-sveltekit": "^0.14.0"
		"mongoose": "^6.6.6"
    "env-cmd": "^10.1.0" (to expose environment variables)

```bash
# install npm dependencies (npm, pnpm, yarn etc.)
pnpm install @lucia-sveltekit/adapter-mongoose@0.4.1 @sveltejs/adapter-node@1.0.0-next.99 lucia-sveltekit@0.14.0 mongoose@6.6.6
pnpm install -D env-cmd@10.1.0
```

and add an .env file to the root directory...

```bash
# add .env file
touch .env
```

which should at least have the following records for your mongoDB database:

```bash
MONGODB_URI=
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```
