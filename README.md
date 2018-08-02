# FlickrPictures

This project is a shareable wall of pictures based on keyword search query using Flickr API.

A live version is available at the following URL: https://fanilorandria.github.io/Senior-Front-End-Coding-Challenge/

## Features

- Display most recent photos from Flickr if no keyword is typed
- Display keyword filtered photos from Flickr if a keyword is provided
- Synchronize keyword typed in the URL and in the text input
- Share current URL on Facebook, Twitter, Google plus or email
- Infinite scrolling
- Responsive


## Technical informations

This project has been generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.7.

## Continuous deployment

This project is configured for continuous deployment with [Travis CI](https://travis-ci.org).

Travis CI:
- Runs lint, unit tests and e2e tests
- Builds the project
- Creates a gh-pages branch with the `dist` content in it if previous steps are successfull
- The website will be accessible on github.io.

To configure Travis CI with the project:
- Create a Github token with public_repo right
- Add the token in Travis CI with the `GITHUB_TOKEN` environment variable name
- Update the `build-prod` URL defined in `package.json`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run start-dev` for a dev server with mock server.

Run `npm run start-prod` to test the production version.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

Run `npm run build-prod` to build a production version.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/). A server with mock data will be launched simultaneously.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
