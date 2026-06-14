# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copier les fichiers de dépendances
COPY /package*.json ./

# Installer les dépendances
RUN npm install --omit=dev

# Copier tout le backend
COPY backend/ ./

# Copier le frontend buildé
COPY dist ./dist

EXPOSE 3000

# Démarrer depuis backend/app.js (au lieu de server.js)
CMD ["node", "app.js"]