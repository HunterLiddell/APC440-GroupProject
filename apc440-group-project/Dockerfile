# ------------------------------------------------------------------
# STEP 1 : BUILD APP
#  Start container from #1
#  copy all the source
#  install all the needed npm packages (basically adding the dev ones)
#  run the sveltekit build (which outputs to a "build" subdirectory)
# ------------------------------------------------------------------
FROM node:18.17-alpine AS build

ENV NODE_ENV=production
ENV PORT=80
ENV PUBLIC_OFFICIAL_BUILD=1

# install dependencies
WORKDIR /src/app
COPY . .
RUN npm ci --include=dev --legacy-peer-deps

RUN npm run check

RUN npm run build

# ------------------------------------------------------------------------------------
# STEP 2 : COPY build output FROM STEP 1 AND Node modules from STEP 2 INTO FINAL IMAGE
# ------------------------------------------------------------------
FROM node:18.17-alpine AS BASE
WORKDIR /app

ENV NODE_ENV=production

# # # STEP 2a install production node packages
COPY package.json package-lock.json ./
COPY --from=build /src/app/node_modules ./node_modules

# # # copy build output from step 2
COPY --from=build /src/app/out .

# # Set PORT env variable so sveltekit serves off port 80
ENV PORT=80

# Let docker know we are exposing port 80
EXPOSE 80

#Run node on ./index.js
CMD ["node", "./index.js"]
