FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173
# Vite'ın dışarıdan erişilebilir olması için --host ekliyoruz
CMD ["npm", "run", "dev", "--", "--host"]