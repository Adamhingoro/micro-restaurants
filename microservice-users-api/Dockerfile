FROM node:12-slim
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY /dist ./
RUN npm install --only=prod --no-optional && npm cache clean --force
EXPOSE 8080
CMD [ "node", "index.js"]
