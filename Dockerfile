FROM node:8.11.2
RUN mkdir /www
WORKDIR /www
COPY ./package.json /www/
RUN npm install
COPY ./ /www/
CMD ["npm","start"]
EXPOSE 8082