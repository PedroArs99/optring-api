FROM node:current-alpine as build

WORKDIR /app/optring

COPY package*.json ./

RUN npm ci 

COPY . .

RUN npm run build
RUN npm prune --production

FROM node:current-alpine as runner

WORKDIR /app

# Copy API Artifacts
COPY --from=build /app/optring/package.json ./package.json
COPY --from=build /app/optring/package-lock.json ./package-lock.json
COPY --from=build /app/optring/dist ./dist
COPY --from=build /app/optring/node_modules ./node_modules

CMD [ "sh", "-c", "npm run start:prod"]