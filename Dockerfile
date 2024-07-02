FROM node:latest

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy environment variables file
COPY .env .env

# Copy all other files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
