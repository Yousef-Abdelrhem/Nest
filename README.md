<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# NestJS Demo Project

A progressive [NestJS](https://nestjs.com/) application demonstrating a basic setup with authentication, user management, and todo management using MongoDB and Mongoose.

---

## Features

- **User Registration & Login** with JWT authentication
- **Todo CRUD** operations (Create, Read, Update, Delete)
- **MongoDB** integration via Mongoose
- **Validation** using class-validator
- **Custom Guards** for route protection
- **Error Handling** for duplicate emails and unauthorized access

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) running locally or in the cloud

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory and set:

```
MONGO_URL=mongodb://localhost:27017/todo_db
JWT_SECRET=your_jwt_secret
```

---

## Running the Application

### Development

```bash
npm run start:dev
```

### Production

```bash
npm run start:prod
```

---

## API Endpoints

### Auth

- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login and receive a JWT token

### Users

- `GET /users` — Get all users (passwords excluded)
- `GET /users/:id` — Get a user by ID

### Todos

- `POST /todos` — Create a new todo
- `GET /todos` — Get all todos
- `GET /todos/:id` — Get a todo by ID
- `PATCH /todos/:id` — Update a todo
- `DELETE /todos/:id` — Delete a todo

> **Note:** Some routes require a valid JWT token in the `Authorization` header:  
> `Authorization: Bearer <token>`

---

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## Project Structure

```
src/
  ├── auth/         # Authentication logic (JWT, guards, etc.)
  ├── users/        # User entity, DTOs, service, controller
  ├── todos/        # Todo entity, DTOs, service, controller
  ├── app.module.ts # Root module
  └── main.ts       # Entry point
```

---

## Useful Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Class Validator](https://github.com/typestack/class-validator)

---

## License

MIT

---
