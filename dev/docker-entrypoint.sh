#!/usr/bin/env sh
set -eu

envsubst '${LOCAL_PORT} ${REMOTE_PORT} ${LOCAL_SCHEME}' < /etc/nginx/conf.d/nginx.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
