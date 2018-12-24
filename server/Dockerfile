FROM node:10-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "npm-shrinkwrap.json*", "./"]

RUN yarn install --silent && mv node_modules ../

COPY . .

EXPOSE 3000

RUN chmod u+x ./scripts/start.sh

CMD ./scripts/start.sh
