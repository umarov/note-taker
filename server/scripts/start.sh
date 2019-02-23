#!/bin/sh

yarn run db:setup

if [ "$NODE_ENV" = "production" ]
then
  yarn run start:prod
else
  yarn run start:debug
fi
