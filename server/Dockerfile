FROM node:10.13-alpine
ENV NODE_ENV production
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "npm-shrinkwrap.json*", "./"]
RUN yarn install --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["yarn", "run", "start:prod"]
