FROM node:12.14.1-alpine
COPY . /

# Set up server dependencies
WORKDIR /server
RUN npm i

# Set up client dependencies
WORKDIR /client
RUN npm i
RUN npm rebuild node-sass

WORKDIR /
RUN npm run build

# Remove dev dependencies
RUN npm prune --production
WORKDIR /server
RUN npm prune --production

WORKDIR /

# Heroku runs containers as non-root
# Add a non-root user and switch users
RUN addgroup -S appgroup
RUN adduser -S appuser -G appgroup
USER appuser

CMD ["npm", "start"]
