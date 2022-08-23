# lucia-mongoose

This is a basic implementation of sveltekit@next with [`lucia-sveltekit`](https://https://github.com/pilcrowOnPaper/lucia-sveltekit) by PilcrowOnPaper, and utilising the mongoose-adapter courtesy of SkepticMystic.

## Setting up project

You will need to install npm dependencies...

```bash
# install npm dependencies (npm, pnpm, yarn etc.)
pnpm install
```

and add an .env file to the root directory...

```bash
# add .env file
touch .env
```
which should at least have the following records for your mongoDB database:

```bash
API_SECRET=
MONGODB_URI=
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
