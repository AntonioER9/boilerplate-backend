# syntax=docker/dockerfile:1.4
ARG IMAGE=registry.gitlab.com/cencosud-ds/cencommerce/utils/docker-images/node
ARG VERSION=18.13.0-alpine3.17

FROM ${IMAGE}:${VERSION} As build
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY .npmrc package*.json tsconfig.* ./
COPY node_modules ./node_modules
COPY src ./src
RUN npm run build --quiet && npm cache clean --force --quiet

FROM ${IMAGE}:${VERSION} as production
RUN apk add --no-cache libcrypto3=3.0.9-r1 libssl3=3.0.9-r1
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG APP_PORT=5000
ENV APP_PORT=${APP_PORT}
USER node
WORKDIR /usr/src/app
COPY --from=build --chown=node:node /usr/src/app/.npmrc ./.npmrc
COPY --from=build --chown=node:node /usr/src/app/package.json ./package.json
COPY --from=build --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=build --chown=node:node /usr/src/app/dist ./dist
EXPOSE ${APP_PORT}
CMD [ "sh", "-c", "npm run start:prod"]