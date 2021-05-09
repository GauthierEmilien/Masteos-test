# You can't Typescript under pressure

Et voilà ! Here is my attempt to recode the famous "You can't javascript under pressure !

## Installation 🏗

First, make sure **Docker** is installed on your machine.

Then just clone this project, move to its location and run `docker-compose -f ./docker-compose.prod.yml up` (it could take a few minutes).

Now, navigate to [`http://localhost:8080`](http://localhost:8080) and have fun 🎉 !

## Backend 🏭

- Coded with **NodeJS** and **Typescript**.
- Added **Prettier** and **Eslint**.
- Can test it with `yarn test`.
- Used **MongoDB** for database.

## Frontend 🌄

- Coded with **React** and **Typescript**.
- Added **Prettier** and **Eslint**.
- Styled with **Material-ui**.

## What I've done 🎵

- [x] Docker configuration, to make the app setup and start easier
- [x] a leaderboard, stored in a database, showing you your scores against other players
- [x] set prettier up on commit to normalize the coding style
- [x] i18n support
- [x] animations and UX
- [x] support for TypeScript on the submitted solutions
- [x] add some unit/end-to-end tests

## For developers 💻

Here is what you have to do if you want to install and start coding on this projet :

- Move to `./backend` and run `yarn install`.
- Go back to the root location and move to `./frontend` then run again `yarn install`.
- Go back again to the root location and run `docker-compose up`.
- Project will rebuild itself when you modify files.
- Navigate to [`http://localhost:3000`](http://localhost:3000) to see the frontend result.
