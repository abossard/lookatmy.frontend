FROM node:alpine

WORKDIR /opt/lookatmy.frontend

COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY .env .

COPY src src
COPY static static
COPY tsconfig.json .
COPY webpack.config.js .

RUN yarn build

EXPOSE 8080

ENV PORT 8080
ENV HOST 0.0.0.0

CMD ["yarn", "start"]