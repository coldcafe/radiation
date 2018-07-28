FROM node:8.11.2
RUN apt-get update -y
RUN apt-get install -y nginx
RUN mkdir /www
WORKDIR /www
COPY ./package.json /www/
RUN npm install
COPY ./ /www/
RUN npm run dist
COPY ./nginx.conf /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 5000
