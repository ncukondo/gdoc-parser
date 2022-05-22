# gdoc-parser

Parse google document and make text, markdown, and zipFile.

## Tech Stack

- [google/clasp](https://github.com/google/clasp)
- [rollup](https://rollupjs.org/)
- [TypeScript](http://www.typescriptlang.org/)
- [ESLint](https://github.com/eslint/eslint)
- [Prettier](https://prettier.io/)
- [Jest](https://facebook.github.io/jest/)
- [Docker](https://www.docker.com/)

## Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

## Getting Started

### Clone the repository

```
git clone --depth=1 git@github.com:ncukondo/gdoc-parser.git <project_name>
cd <project_name>
rm -Rf .git
```

### Install dependencies

```
yarn
```

### Configuration

#### Make `.env` in root folder, and input as followed

What is scriptId ? https://github.com/google/clasp#scriptid-required

```
CLASP_SCRIPT_ID=<your script id>
CLASPRC_ACCESS_TOKEN=<from clasprc.json>
CLASPRC_CLIENT_ID=<from clasprc.json>
CLASPRC_CLIENT_SECRET=<from clasprc.json>
CLASPRC_EXPIRY_DATE=<from clasprc.json>
CLASPRC_ID_TOKEN=<from clasprc.json>
CLASPRC_REFRESH_TOKEN=<from clasprc.json>
```

#### Open `src/appsscript.json`, change timeZone (optional)

[Apps Script Manifests](https://developers.google.com/apps-script/concepts/manifests)

```
{
  "timeZone": "Asia/Tokyo", ## Change timeZone
  "dependencies": {
  },
  "exceptionLogging": "STACKDRIVER"
}
```

### Development and build project

```
yarn build
```

### Push

```
yarn run deploy
```

### Deploy using Github workflow

```
yarn release
```
