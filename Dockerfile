FROM node:14-alpine

# Create app directory
WORKDIR /app

# Front
RUN mkdir -p /app/front
COPY front/build /app/front/build

# Server
RUN mkdir -p /app/back
COPY back/build /app/back
COPY back/package.json /app/back/package.json
RUN cd back && npm i --only=production


# Setting environment variables
ENV LOG_FOLDER /app/logs
ENV NODE_ENV production

EXPOSE 4000

WORKDIR /app/back

CMD ["node", "app.js"]

