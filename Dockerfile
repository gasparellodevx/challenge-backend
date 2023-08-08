FROM node:18-alpine as base

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpx prisma generate && pnpm run build

FROM base as development

CMD pnpm run db:push; pnpm run start:dev

FROM grafana/k6 as k6

FROM development as test

COPY --from=k6 --chown=node:node /usr/bin/k6 /usr/bin/k6

CMD pnpm run test:load

FROM node:18-alpine as production

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

RUN npm install -g pnpm && pnpm install && pnpx prisma generate

COPY --from=base /app/dist ./dist

CMD pnpm run db:push; pnpm run start:prod