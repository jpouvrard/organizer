# organizer

## Contents

The unchanged vite-generated files: `.gitignore`, `index.html`, `tsconfig.app.js`, `tsconfig.node.json`, `tsconfig.json`, `vite-config` files.

A `package.json` (and `package-lock.json`) file with ESLint, Prettier and their dependencies removed. Biome and TailwindCSS are installed as devDependencies. Available scripts are:

- `dev`, `build`, `preview` as provided by Vite
- `format`: formats the project using Biome's formatter
- `lint`: lints the project using Biome's linter

Biome config file `biome.json`. In addition to default config, it has git integration enabled, and has the experimental useSortedClasses (sorting of tailwind classes) rule enabled.

Lefthook config file `lefthook.yml` with pre-commit hooks for Biome and TypeScript type checking.

## Usage

1. Clone to your machine. Do this by:
    - Copying using [degit](https://github.com/Rich-Harris/degit) to download the files in the repo without the git history. (RECOMMENDED)
      - `npx degit jpouvrard/organizer project-name`

    - Cloning this repo to your machine. This will keep the git history of this repo.
       - `git clone https://github.com/jpouvrard/organizer.git`

    - Creating a repo using this template. Note that your repo will signify that it was built from this template.
      - Click [here](https://github.com/jpouvrard/organizer/generate), or the 'Use this template' green button in the top right.

2. Install dependencies though `npm install`.
3. Alter for your needs. Remember to:
   - Update the `LICENSE` to the correct license and name
   - Change the `name` and `author` properties in `package.json`
   - Clean up the `README.md`
4. You are good to go. Start the project with `npm run dev` and you will see an altered Vite starting screen with Vite, React, Biome and Tailwind styled using Tailwind classes.
