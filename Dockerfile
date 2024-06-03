FROM node:20.12.2-alpine3.18 as base

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY . ./
RUN npm install
CMD ["node", "/app/bin/server.js"]
