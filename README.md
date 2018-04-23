# README: Vanilla JavaScript Environment Template

This repo is a template for developing Vanilla JavaScript projects. API integration is also setup.

## Quick Start Guide

Below is a quick start guide to using the template for your project.

_note: on Windows, ensure the path to the folder does not contain capital letters, otherwise this will cause linting errors_

```sh
git clone git@github.com:daraclare/vanilla-js-env.git myProjectName

cd myProjectName

# MAC/LINUX USERS ONLY: remove the existing GIT files
rm -rf .git

# WINDOWS USERS ONLY: remove the existing GIT files
rd .git /S/Q

# initialise another GIT repo locally
git init  
git add .  
git commit -m "Initial commit"

# create a repo and connect this to your local files
git remote add origin <repo-address>  
git push -u origin master

# install all node modules in the package.json file  
npm install

# start the application — this will enable hot-reloading, linting and run tests and display the coverage in the console
npm start
```

The app will open at [http://localhost:3000/](http://localhost:3000/).

For production, run the build to transpile code to 'dist' folder. This runs the app in localhost and ensure app is running correctly using the 'dist' folder files:  
`npm run build`

To view the build files run:  
`npm run start:dist`

## Basic Tech Stack

This template is built using Vanilla JavaScript (ES8) and **Webpack 3**. **Docker** is also configured. All image types can be used (GIF, JPEG, JPG, PNG, SVG). Use either **CSS** or **SCSS**, simple change the file extension as required. CSS/SCSS files can be stored in the component folder, or in the 'styles' folder. A test folder is also setup and runs automatically. Any test files ending in spec.js will also be picked up and ran.

### Webpack & Babel

This repo is implemented using Webpack 3 and Babel. Webpack is a module bundler which takes modules with dependencies and generates static assets representing those modules. Babel is used to transpile ES8 code into readable vanilla ES5 with source maps.

### Testing

Mocha is setup as the JavaScript testing framework for this repo, with Chai. Test can be written in **ES8**, test files are transpiled to ES5 for Mocha and Istanbul.  
Test files can be placed in the 'tests' folder, or placed in the relevant component folder as preferred. All test files with the extension `.spec.js` (for instance `homepage.spec.js`) are run when `npm start` is run, and can also be run with the command `npm test`.

ES Linting is also implemented to reveal errors in JavaScript code and sure best practices. It may be useful to download an ESLint plugin for your IDE.

#### Test Coverage

Istanbul is used for test coverage. Istanbul is coverage tool that computes statement, line, function and branch coverage with module loader hooks. It is ran when testing and can also be viewed in the browser using `npm run coverage`.

#### Public Folder

The repo contains a 'public' folder. This folder is published and all assets are copied to the 'dist' folder on `npm run build`.

## JSON Package File for NPM

Below is a list of each entry in the package.json file and the explanation for each entry:

### Scripts

Scripts are used to speed up the restarting of the application. By running 'npm start' the developer can start the lint watch to watch for errors in the 'src' folder, run the tests in the 'tests' folders, open the browser at localhost:{portnumber} and watch for changes, as well as enable hot-reloading. The instructions for express are loaded from the files in the 'tools' folder.

The security-check script runs a check to ensure no known vulnerabilities are found in the node modules used.

### Build Process

The production build is managed by the prebuild, build and postbuild scripts. Prebuild cleans out the existing code by deleting the 'dist' folder and making a new directory. The build command builds the HTML, creates the bundle.js file, and extracts the CSS into a separate files. These are all found in the 'dist' folder. Postbuild will run after and run the server file so the results can be viewed.

### Babel

Babel is used to transpile ES Next code into readable vanilla ES5 with source maps.  
**babel-cli:** Used to compile files from the command line.  
**babel-core:** The core of the Babel compiler  
**babel-loader:** This package allows transpiling JavaScript files using Babel and webpack.  
**babel-polyfill:** Provides polyfills necessary for a full ES2015+ environment, such as Promises and Object.assign  
**babel-preset-es2017:** Babel preset for all ES2017 plugins, for compiling ES2017(ES8) to ES5  
**babel-register:** One of the ways you can use Babel is through the require hook. The require hook will bind itself to node’s require and automatically compile files on the fly.

### Remaining Entries

**axios:** A Promise based HTTP client for the browser and node.js  
**compression:** Node.js compression middleware. Returns the compression middleware using the given options. The middleware will attempt to compress response bodies for all request that traverse through the middleware, based on the given options.  
**cross-env:** This micro-lib allows you to provide a script which sets an environment using unix style and have it work on windows too  
**css-loader:** css loader module for webpack  
**eslint:** ES Linting Core to reveal errors in JavaScript code and sure best practices  
**eslint-plugin-import:** This plugin intends to support linting of ES2016+ (ES7+) import/export syntax, and prevent issues with misspelling of file paths and import names. All the goodness that the ES2016+ static module syntax intends to provide, marked up in your editor.  
**eslint-watch:** Run eslint with watch mode  
**eventsource-polyfill:** Polyfill for EventSource  
**expect:** improves assertions when testing  
**express:** a Node.js web server framework  
**extract-text-webpack-plugin:** Extract text from bundle into a file, makes it possible to generate a native css output file.  
**file-loader:** A file loader module for webpack  
**html-webpack-plugin:** creates HTML files to serve webpack bundles  
**image-webpack-loader:** Image loader module for webpack  
**istanbul:** A coverage tool that computes statement, line, function and branch coverage  
**jsdom:** A JavaScript implementation of the DOM and HTML standards, jsdom will inject document, window and other DOM API into your Node.js environment. Useful for running, in Node.js, tests that are made for browsers.  
**mkdirp**: Recursively mkdir, like `mkdir -p`, but in node.js, needed for Windows support  
**mocha:** JavaScript Testing  
**nock:** Nock is an HTTP mocking and expectations library for Node.js, Nock can be used to test modules that perform HTTP requests in isolation.  
**node-sass**: A library that provides binding for Node.js to LibSass  
**npm-run-all:** A CLI tool to run multiple npm-scripts in parallel or sequential.  
**nsp:** Node Security Platform command-line tool which helps to identify known vulnerabilities in your project  
**nyc**: The Istanbul command line interface  
**open:** open a file or url in the user's preferred application  
**rim-raf:** A cross platform way to remove folders forcefully, used in the building and destruction of the 'dist' folder  
**sass-loader**: sass loader for webpack  
**style-loader:** style loader module for webpack  
**url-loader:** The url loader works like the file loader, but can return a Data Url if the file is smaller than a limit.  
**webpack:** Webpack is a module bundler. Webpack takes modules with dependencies and generates static assets representing those modules.  
**webpack-dev-middleware:** It's a simple wrapper middleware for webpack. It serves the files emitted from webpack over a connect server.  
**webpack-hot-middleware:** Webpack hot reloading using only webpack-dev-middleware. This allows you to add hot reloading into an existing server without webpack-dev-server.  
**webpack-md5-hash**: A plugin to replace a standard webpack chunkhash with md5.
