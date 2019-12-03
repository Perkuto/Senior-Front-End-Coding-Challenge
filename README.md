# Coding Challenge

## Author

Christophe Durieux <christophe.durieux@icloud.com>

## Work done

The coding challenge could be achieve very quickly using the well-known lib [ngx-infinite-scroll](https://www.npmjs.com/package/ngx-infinite-scroll).

As a demonstration of Angular knowledge, I planned to build a pure Angular infinite scroll from scratch.
I used:

- RXJS: the [ReactiveX](http://reactivex.io/) library

  - Observable is used for Router (Route activation), Scrolling events and Form events
  - Observable Photos array is directly used in template with async pipe (|async) and conditional value (?)

- Responsiveness, usually achieved by CSS, is native by design:

  - Layout is automatically adapting to window size,
  - Window resizing and scrolling is captured through observable,

- Reactive search form is implemented without form management

  - Form is using observable event based on field with debounce timer (200 ms)
  - On debounce time, application is routed to '/' + field value
  - keywork is caught by Observable on router event

- Flickr service is based on observable and corrected on the fly

  - Invalid photos informations are replaced on the fly by default image,
  - Valid photos informations are mapped to a more usable model,
  - Spinner on loading.

- Basic karma tests, mostly generated

  - demonstrate the need of tests and the way to implement it (ng test).

- Special configuration:

  - Environment configuration for dev and production release (same config, proof of concept),
  - tsconfig.json adjusted to use paths alias, reducing paths for big project and making easier refacting.

- Docker and docker compose

  - Build production bundles,
  - Add ngnix server with configuration on port 8080,
  - Port 8080 exposed (Could be reach on local docker with http://localhost:8080).

- Detailed comments in `search.component.ts`.

## Project Guidelines

- Create shareable walls of pictures based on keyword search query,
- Use [Flickr API](https://www.flickr.com/services/api).

## Technical Specifications

- Javascript Framework: Angular 8.2.14 with routing and SCSS,
- Responsive: By design,
- Basic design with @angular/material.

## What could be improved

- Advanced implementation could have been done using NGRX or NGXS to create a Store that manage caching
- Advanced tests (unit/e2e) with better coverage
- UI design
