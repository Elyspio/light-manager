FROM node:12

# Create app directory
WORKDIR /app

# Copy sources
## front
COPY front/public ./front/public
COPY front/package.json ./front/package.json
COPY front/src ./front/src
COPY front/tsconfig.json ./front/tsconfig.json

## manager
COPY manager/package.json ./manager/package.json
COPY manager/src ./manager/src
COPY manager/tsconfig.json ./manager/tsconfig.json

# npm install
RUN cd front && npm install
RUN cd manager && npm install

# If you are building your code for production
# RUN npm ci --only=production

# Build apps
RUN cd front && npm run build
RUN cd manager && ./node_modules/.bin/tsc

# Clean install for production
RUN cd front && npm ci --only=production
RUN cd manager && npm ci --only=production

# Setting environment variables
ENV LOG_FOLDER /app/logs
ENV NODE_ENV production

