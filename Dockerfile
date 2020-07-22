FROM node:12

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)




# front
COPY front/public ./front/public
COPY front/package.json ./front/package.json
COPY front/src ./front/src
COPY front/tsconfig.json ./front/tsconfig.json

# manager
COPY manager/package.json ./manager/package.json
COPY manager/src ./manager/src
COPY manager/tsconfig.json ./manager/tsconfig.json

# npm install
RUN cd front && npm install --silent
RUN cd manager && npm install --silent

# If you are building your code for production
# RUN npm ci --only=production

# Build apps
RUN cd front && npm run build
RUN cd manager && ./node_modules/.bin/tsc

# Remove src
RUN rm -rdf **/src

ENV NODE_ENV production

CMD [ "node", "manager/lib/app.js" ]
