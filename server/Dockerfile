FROM node:14-alpine

WORKDIR /app

RUN chown node:node /app

COPY --chown=node:node package*.json ./ 

USER node

RUN rm -rf package-lock.json
RUN rm -rf node_modules 
RUN npm install

COPY . .
COPY --chown=node:node . .

EXPOSE 9001

ENV MONGODB_USERNAME beohin
ENV MONGODB_PASSWORD dXuYwo9zIJlPKjHL

CMD ["npm", "run", "start"]