FROM node:alpine
RUN yarn global add pm2

VOLUME ["/app"]

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY .env .

COPY src src
COPY static static
COPY process.yml .
COPY tsconfig.json .
COPY webpack.config.js .

RUN yarn build

EXPOSE 3001

ENV PORT 3001
ENV HOST 0.0.0.0

CMD ["pm2-docker", "--auto-exit", "process.yml"]