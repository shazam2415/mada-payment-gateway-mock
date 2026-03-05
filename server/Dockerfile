FROM node:22

WORKDIR /app

# Sadece paket listelerini kopyalayıp yükleme yapalım (Hız için)
COPY package*.json ./
RUN npm install

# Geri kalan tüm kodları kopyala
COPY . .

EXPOSE 5000
CMD ["node", "server.js"]