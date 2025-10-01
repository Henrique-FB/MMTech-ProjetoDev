FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Install tsx globally so Node can run TS directly
RUN npm install -g tsx

# Copy the rest of the source
COPY . .

EXPOSE 5000

# Use tsx to run TypeScript directly
CMD ["tsx", "src/index.ts"]