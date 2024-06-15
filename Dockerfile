FROM node:20.12.2-alpine3.18 as base
# Production stage
FROM base
ENV NODE_ENV=production
ENV ENV_PATH=/tests node server.js
ENV PORT=8080
WORKDIR /app
COPY . ./
EXPOSE 8080
RUN npm install
CMD ["node", "/app/bin/server.js"]
