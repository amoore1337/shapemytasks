FROM nginx:1.19-alpine

COPY ./nginx/nginx.conf.template /etc/nginx/conf.d/nginx.conf.template
COPY ./nginx/nginx.conf.certbot.template /etc/nginx/conf.d/nginx.conf.certbot.template
COPY ./nginx/includes/ /etc/nginx/includes/

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
