FROM nginx:latest


# dist 目录复制到 Nginx 的默认静态文件目录
COPY ./dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
