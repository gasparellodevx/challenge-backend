# XGrow - Back-end Challenge

This app was made with the intent of leveling up newly hired developer- It consists of a simple CRUD of courses made by students (users).

## Requirements

### Functional

- Courses
  - FC-001 - The student (user) should be able to create a course✅
  - FC-002 - The student (user) should be able to update a course✅
  - FC-003 - The student (user) should be able to delete a course✅
  - FC-004 - The student (user) should be able to list its courses✅
- Students
  - FS-001 - The student (user) should be able to update its own data✅
  - FS-002 - A new student (user) should be able to register✅
- Authentication
  - FA-001 - The student (user) should be able to login✅
  - FA-002 - Should have 2FA (Two Factor Authentication) enabled✅
- Logs
  - FL-001 - The student (user) should be able to access its actions logs✅

### Non-functional

- Courses
  - NFC-001 - The course list should be paginated ✅
  - NFC-002 - The course list should be able to handle a 1000 simultaneous requests and respond in average in less than 1 second ✅
- Common
  - NFCM-001 - All other GET requests should also be cached ✅

## How to run

### K6 Tests

K6 tests were made to test the performance of the API. To run them, just follow the steps below:

#### 1. Define correct environment variables

```conf
DATABASE_URL="postgresql://postgres:postgres@db:5432/db?schema=public"
REDIS_URL="redis://redis:6379/0"
NODE_ENV="test" # This is important cause of 2FA
PORT=3000

BULL_REDIS_URL="redis://redis:6379/1"

JWT_SECRET=secret
JWT_EXPIRATION_TIME=1d

EMAIL_HOST=smtp
EMAIL_PORT=1025
EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM=no-reply@localhost

CACHE_TTL=20
```

#### 2. Start services and run the tests

```bash
pnpm run docker:test
```

It'll start the following services:

- API
- Database (Postgres)
- Redis
- SMTP Server (Mailhog)
- Prometheus
- Grafana
- K6

#### 3. Visualize in Grafana

To visualize the results in Grafana, just access `localhost:4000` and login with the following credentials:

```conf
username: admin
password: admin
```

You'll see the dashboard listed on the home page, just click on it to see the results:

![Grafana Initial Screen](./docs/images/grafana-initial-screen.png)

![Results](./docs/images/grafana-results.png)


### Docker

#### 1. Define correct environment variables

```conf
DATABASE_URL="postgresql://postgres:postgres@db:5432/db?schema=public"
REDIS_URL="redis://redis:6379/0"
NODE_ENV="development" # This is default
PORT=3000 # This is default

BULL_REDIS_URL="redis://redis:6379/1"

JWT_SECRET=secret
JWT_EXPIRATION_TIME=1d

EMAIL_HOST=smtp
EMAIL_PORT=1025
EMAIL_USER=
EMAIL_PASS=
EMAIL_FROM=no-reply@localhost

CACHE_TTL=20
```

#### 2. Start services

To run the app with docker, just run the following command:

```bash
pnpm run docker:start:dev
```

It'll start the following services:

- API
- Database
- Redis
- SMTP Server (Mailhog)

### Production

#### 1. Define correct environment variables

```conf
DATABASE_URL="postgresql://postgres:postgres@db:5432/db?schema=public"
REDIS_URL="redis://username:password@redis:6379/0" # Follow this pattern
NODE_ENV="production"
PORT=3000 # Could be any port

BULL_REDIS_URL="redis://username:password@redis:6379/1" # Follow the same pattern as REDIS_URL 

JWT_SECRET=secure-secret
JWT_EXPIRATION_TIME=1d

EMAIL_HOST=smtp.example.com
EMAIL_PORT=1025
EMAIL_USER=user
EMAIL_PASS=password
EMAIL_FROM=user@example.com

CACHE_TTL=20 # In seconds
```

#### 2. Build production image

```bash
sudo docker build -t xgrow-challenge-backend:latest --target production .
```

#### 3. Start API

```bash
sudo docker run -d --name xgrow-challenge-backend -p 3000:3000 xgrow-challenge-backend:latest
```

## API Documentation

Swagger available at `/docs`.

## Architecture

### Database

The database used was Postgres, and the ORM used was Prisma ORM.

The database schema is the following:

![Database Schema](./docs/images/database-schema.svg)

### Cache

The cache used was Redis, and the client library used was `ioredis`.

`ioredis` was chosen because it's cache-manager store implementation is compatible with the latest version of `cache-manager`.

### Authentication

The authentication was made using JWT and 2FA (Two Factor Authentication).

The JWT secret is defined in the environment variable `JWT_SECRET` and the expiration time is defined in the environment variable `JWT_EXPIRATION_TIME`.

The 2FA was made using `nodemailer` to send the code and a self-made algorithm to generate the code.

### Queue

The queue used was Bull, and the client library used was `bull`.

It was used to send emails asynchronously.

### Logs

The logs were made using `winston`.

The logs are saved in the `logs/app.log` file.

## Possible improvements

- Save logs asynchronously through a queue
- Use a password to increase security
- Add unit tests
- Add integration tests
- Add e2e tests
- The 2FA code is saved in the database, although it could be saved in the cache to increase performance and avoid unnecessary expiration handling.

## Possible Failures

- If a log fails to be saved, the request will fail, even if the action was successful
- The 2FA code could be cracked in a brute force attack (even though it is very unlikely)