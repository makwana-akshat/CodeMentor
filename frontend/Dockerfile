FROM node:22-slim

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

EXPOSE 5173

# Run the Vite development server with hot reloading
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
