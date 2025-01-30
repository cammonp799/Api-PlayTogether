# Node.js 23
FROM node:23.5.0

# répertoire de travail
WORKDIR /app

# Copie les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances (depuis `/app`)
RUN npm install

# Copie tout le reste des fichiers (vers `/app`)
COPY . .

# Exposer le port sur lequel l'app fonctionne
EXPOSE 4000

# Démarrer l'application
CMD ["node", "app.cjs"]