# Проект TODO API

## Описание проекта

Это API для управления задачами в формате TODO. Проект предоставляет функционал для создания, получения, обновления и удаления задач через RESTful API. Он включает в себя backend на Python с использованием FastAPI и Docker для контейнеризации. В проекте также используется база данных для хранения информации о задачах.

## Технологии

- **FastAPI** — для разработки REST API.
- **Docker** — для контейнеризации приложения.
- **PostgreSQL** — для хранения данных о задачах.
- **Docker Compose** — для упрощения настройки многоконтейнерных приложений.
- **Yandex Cloud** — для развертывания приложения на сервере.

## Инструкции по локальному запуску

### 1. Клонирование репозитория

Для начала клонируйте репозиторий на вашу локальную машину:

```bash
git clone https://github.com/yourusername/todo.git
cd todo
```

### 2. Установка зависимостей

Перед запуском убедитесь, что у вас установлен Docker и Docker Compose. Затем выполните:

```bash
docker-compose up --build
```

### 3. Доступ к приложению

После успешного запуска контейнеров, ваше приложение будет доступно по адресу:

Frontend: http://localhost:3000
Backend API: http://localhost:8000

## Инструкции по развертыванию на сервере

### 1. Подготовьте сервер с установленным Docker и Docker Compose.

Установите Docker:

```bash
sudo apt update
sudo apt install docker.io
sudo apt install docker-compose
```

### 2. Клонируйте репозиторий на сервер

```bash
git clone https://github.com/IsaShakh/todo.git
cd todo
```

### 3. Запустите приложение с помощью Docker Compose

```bash
sudo docker-compose up --build
```

### Если после запуска видите ошибку Not Found(опицонально)
```bash
cd frontend
npm run build
cd ..
sudo docker-compose down
sudo docker-compose up --build
```

### Проверка доступа
Проверьте доступность приложения:

Если у вас есть внешний IP-адрес для виртуальной машины, вы можете открыть ваше приложение в браузере по адресу: http://<external-ip>:3000 для фронтенда и http://<external-ip>:8000 для бэкенда.

## Примеры запросов к API

### 1. Получить список задач 
```bash
curl http://localhost:8000/tasks
```

### 2. Создать новую задачу
```bash
curl -X POST http://localhost:8000/tasks \
     -H "Content-Type: application/json" \
     -d '{"name": "Task 1", "description": "This is the first task."}'
```

### 3. Получить задачу по ID 
```bash
curl http://localhost:8000/tasks/1
```

### 4. Обновить задачу 
```bash
curl -X PUT http://localhost:8000/tasks/1 \
     -H "Content-Type: application/json" \
     -d '{"name": "Updated Task 1", "description": "Updated description for the task.", "status": "in-progress"}'
```

### 5. Удалить задачу  
```bash
curl -X DELETE http://localhost:8000/tasks/1
```

### 6. Получить задачи с фильтром по статусу
```bash
curl "http://localhost:8000/tasks?status=todo"
```