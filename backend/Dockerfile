FROM node:lts AS build

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY ./src ./src
RUN yarn -s && yarn build

FROM node:lts-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package.json ./
COPY yarn.lock ./
RUN yarn -s --prod

## We just need the build to execute the command
COPY --from=build /usr/src/app/build ./build

CMD node ./build/index.js