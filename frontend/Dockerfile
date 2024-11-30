FROM node:18-alpine

WORKDIR /app

# Устанавливаем зависимости
COPY package*.json ./
RUN npm install

# Копируем файлы приложения
COPY . ./

# Собираем приложение
RUN npm run build

# Статический сервер для обслуживания build
RUN npm install -g serve

CMD ["serve", "-s", "build", "-l", "3000"]

