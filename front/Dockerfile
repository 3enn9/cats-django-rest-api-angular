# Dockerfile

# Используем Node.js версии 22
FROM node:22

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY ./package*.json ./

# Устанавливаем зависимости
RUN npm install

# Устанавливаем Angular CLI глобально
RUN npm install -g @angular/cli

# Копируем все файлы в контейнер
COPY . .

# Открываем порт 4200 для Angular
EXPOSE 4200

# Запускаем приложение
CMD ["ng", "serve", "--host", "0.0.0.0"]
