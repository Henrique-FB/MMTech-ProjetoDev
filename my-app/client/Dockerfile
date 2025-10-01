FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build frontend
RUN npm run build

EXPOSE 5173
EXPOSE 4173

CMD ["npm", "run", "preview"]