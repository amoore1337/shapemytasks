#!/usr/bin/env sh
set -eu

envsubst '${LOCAL_PORT} ${REMOTE_PORT}' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf

if "$USE_SSL" == "true"
then
  envsubst '${LOCAL_PORT} ${REMOTE_PORT}' < /etc/nginx/conf.d/nginx.conf.ssl.template > /etc/nginx/conf.d/default.conf
else
  envsubst '${LOCAL_PORT} ${REMOTE_PORT}' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf
fi

exec "$@"
