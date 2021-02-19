#!/usr/bin/env sh
set -eu

envsubst '${REVERSE_PROXY_SCHEME}' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
