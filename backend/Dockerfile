FROM node:20-alpine

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install --production

# Copy source
COPY src ./src

EXPOSE 5000

CMD ["node", "src/app.js"]