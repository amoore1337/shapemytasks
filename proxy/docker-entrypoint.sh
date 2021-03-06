#!/usr/bin/env sh
set -eu

envsubst '${REVERSE_PROXY_SCHEME} ${SERVER_PORT} ${CLIENT_PORT}' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
