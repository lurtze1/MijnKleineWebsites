# Bouwstap: dependencies installeren (met bouwgereedschap, voor het geval de SQLite-module gecompileerd moet worden).
FROM node:24-bookworm AS bouw
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Draaistap: kaal, als gewone gebruiker.
FROM node:24-bookworm-slim
ENV NODE_ENV=production DATA_DIR=/data PORT=3000
WORKDIR /app
COPY --from=bouw /app/node_modules ./node_modules
COPY package.json app.js server.js cli.js ./
# Het SQLite-equivalent van een aparte database-gebruiker: het proces draait als "app" (geen root), en
# alleen die gebruiker kan bij de map met de database.
RUN groupadd --gid 10001 app && useradd --uid 10001 --gid app --no-create-home --shell /usr/sbin/nologin app \
 && mkdir /data && chown app:app /data && chmod 700 /data
USER app
VOLUME /data
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"
CMD ["node", "server.js"]
