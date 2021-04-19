# Commands

yarn plug n play doesn't generate node_modules anymore. Use command below to enable PnP support in VS Code: https://stackoverflow.com/questions/54954337/is-it-possible-to-use-yarn-pnp-with-typescript-vscode

* yarn dlx @yarnpkg/pnpify --sdk vscode

* yarn clean cache

Installing dependencies, populating node_modules
* yarn install

Compiling
* yarn run build

Starting the server
* yarn run start

# Environment variables

Local .env file contains
* PORT - default port number to run on, for example `PORT=9999`

# Tools

* babel
* webpack
* yarn. To install yarn:
npm install -g yarn

Adding a dev-dependency, for example
* yarn add @types/react-redux --dev

## Available Scripts

In the project directory, you can run:

### `yarn run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
