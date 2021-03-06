#!/usr/bin/env sh
set -eu

if "$USE_CERTBOT" == "true"
then
  envsubst '${REVERSE_PROXY_SCHEME} ${SERVER_PORT} ${CLIENT_PORT}' < /etc/nginx/conf.d/nginx.conf.certbot.template > /etc/nginx/conf.d/default.conf
else
  envsubst '${REVERSE_PROXY_SCHEME} ${SERVER_PORT} ${CLIENT_PORT}' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf
fi


exec "$@"
