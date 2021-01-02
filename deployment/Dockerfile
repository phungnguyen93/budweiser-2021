# Base on offical Node.js Alpine image
FROM digitop/diginext:latest

ARG NEXT_PUBLIC_BASE_PATH
ENV NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH}

ARG NEXT_PUBLIC_API_BASE_PATH
ENV NEXT_PUBLIC_API_BASE_PATH=${NEXT_PUBLIC_API_BASE_PATH}

ARG NEXT_PUBLIC_CDN_BASE_PATH
ENV NEXT_PUBLIC_CDN_BASE_PATH=${NEXT_PUBLIC_CDN_BASE_PATH}

ARG NEXT_PUBLIC_ENV
ENV NEXT_PUBLIC_ENV=${NEXT_PUBLIC_ENV}

ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL

ARG IRON_SESSION_SECRET
ENV IRON_SESSION_SECRET=${IRON_SESSION_SECRET}

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
# RUN npm install --global pm2

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN yarn install --production=true

# Delete all files in "pages" directory
RUN rm -rf ./pages/
RUN rm -rf ./plugins/
RUN rm -rf ./components/
RUN rm -rf ./.next/
RUN rm -rf ./next.config.js
RUN rm -rf ./diginext.json
RUN rm -rf ./.env.local
RUN rm -rf ./.env
RUN rm -rf ./package.json
RUN rm -rf ./package-lock.json

# Copy all files
COPY ./ ./

# Build app
RUN yarn build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
# USER node

# Run npm start script when container starts
# CMD [ "npm", "start" ]
CMD [ "yarn", "start" ]