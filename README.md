## Description

Doing quiz web application

## Installation

Go to the two folders [Frontend Folder](./frontend/) and [Backend Folder](./backend/quiz-api/), then run the command bellow:

```bash
$ npm install
```

If error, you can try this:

```bash
$ npm install --legacy-peer-deps
```

## Database

You have to host the Database then config .env file in [Backend Folder](./backend/quiz-api/) or If you have Docker, you can go to [Docker Folder](./docker/) and run the command:

```bash
$ docker compose -f mysql.yml -p nestjs-sql up -d
```

## Running the app

```bash
# Frontend
$ npm run start

# Backend
$ npm run dev

```
