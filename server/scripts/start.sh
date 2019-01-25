#!/bin/sh

yarn run prestart:prod
yarn run build
yarn run migrations

if [ "$NODE_ENV" = "production" ]
then
  yarn run start:prod
else
  yarn run start:debug
fi
