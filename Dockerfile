# 1. Base image
FROM node:18-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy dependencies file first to cache layers
COPY package*.json ./
COPY prisma ./prisma

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the app
COPY . .

# 6. Generate Prisma Client (sau khi copy code)
RUN npx prisma generate

# 7. Build TypeScript -> JavaScript
RUN npm run build

# 8. Start app
CMD ["node", "dist/index.js"]
