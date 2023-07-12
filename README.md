# Todos Project

This project is a simple Todos application built using Express, Sequelize, and Docker. It provides API endpoints to manage a list of todos.

## Prerequisites

Before running the project, make sure you have the following installed on your system:

- Node.js
- Docker
- npm (Node Package Manager)

## Getting Started

To set up the project, follow the steps below:

1. Clone the repository:

   ```
   git clone https://github.com/nguyenvuh2r/todos.git
   ```

2. Create a `.env` file in the project root directory and add the following environment variables with their respective values:

   ```
   NODE_ENV=development
   DB_HOST=mariadb
   DB_PORT=3308
   DB_USERNAME=root
   DB_PASSWORD=example
   DB_NAME=myapp
   ```

3. Install the project dependencies by running the following command:

   ```
   npm install
   ```

4. Start the project using Docker Compose:

   ```
   docker-compose up
   ```

   This command will start the necessary containers, including the Express server and a MariaDB database.

5. To test the project, open a new terminal window and execute the following command to access the Express container's bash shell:

   ```
   docker-compose exec express bash
   ```
6. Once inside the container, run the following command to execute the migration:

   ```
   npm test
   ```

   This will run the project's test suite and display the test results.
7. To run the following command to execute the tests :

   ```
   npx sequelize-cli db:migrate
   ```

   This will run the project's test suite and display the test results.
   Notice run this inside the container

## API Documentation

The project exposes the following API endpoints for Todo:
- `GET /api/todos` - Retrieve all todos.
- `GET /api/todos/:id` - Retrieve a specific todo by its ID.
- `POST /api/todos` - Create a new todo.
- `PUT /api/todos/:id` - Update a todo by its ID.
- `DELETE /api/todos/:id` - Delete a todo by its ID.

The project exposes the following API endpoints for User:
- `GET /api/users` - Retrieve all users.
- `GET /api/users/:id` - Retrieve a specific user by its ID.
- `POST /api/users` - Create a new user.
- `PUT /api/users/:id` - Update a user by its ID.
- `DELETE /api/users/:id` - Delete a user by its ID.

For detailed information about the API endpoints and request/response formats, refer to the API documentation provided by the project.
