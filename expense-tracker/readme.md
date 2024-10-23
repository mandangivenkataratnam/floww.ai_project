# Personal Expense Tracker API

## Overview

This is a RESTful API for managing personal financial records. Users can record their income and expenses, retrieve past transactions, and get summaries by category or time period. The API is built using Node.js, Express, and MongoDB for data storage.

## Tools and Technologies

- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)

## Features

- Add, update, and delete transactions (income and expenses).
- Retrieve all transactions or specific transactions by ID.
- Get summaries of transactions by category or time period.
- User authentication using JWT.
- Optional pagination for large datasets.
- Error handling for invalid inputs and IDs.

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB installed or use a cloud MongoDB service (e.g., MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/expense-tracker-api.git
Navigate to the project directory:

bash
Copy code
cd expense-tracker-api
Install dependencies:

bash
Copy code
npm install
Create a .env file in the root of the project and configure the following environment variables:

makefile
Copy code
PORT=4300
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=12345
Start the server:

bash
Copy code
npm start
The server will be running at http://localhost:4300.

API Endpoints
Transactions
Add a New Transaction
POST /transactions

Adds a new transaction (income or expense).

Request Body:

json
Copy code
{
  "type": "income",
  "category": "salary",
  "amount": 5000,
  "date": "2024-10-20",
  "description": "Monthly salary"
}
Get All Transactions
GET /transactions
Retrieves all transactions.
Get a Transaction by ID
GET /transactions/
Retrieves a specific transaction by its ID.
Update a Transaction by ID
PUT /transactions/

Updates a transaction by ID.

Request Body:

json
Copy code
{
  "type": "expense",
  "category": "groceries",
  "amount": 200,
  "date": "2024-10-21",
  "description": "Grocery shopping"
}
Delete a Transaction by ID
DELETE /transactions/
Deletes a transaction by ID.
Get Summary of Transactions
GET /summary

Retrieves a summary of total income, total expenses, and balance.

Optional query parameters:

category: Filter by category.
startDate and endDate: Filter by date range.
Response Example:

json
Copy code
{
  "totalIncome": 5000,
  "totalExpenses": 200,
  "balance": 4800
}
User Authentication
Register User
POST /auth/register Registers a new user.

Request Body:

json
Copy code
{
  "email": "user@example.com",
  "password": "yourpassword"
}
Login User
POST /auth/login Logs in a user and returns a JWT token.

Request Body:

json
Copy code
{
  "email": "user@example.com",
  "password": "yourpassword"
}
Response Example:

json
Copy code
{
  "token": "your_jwt_token"
}
Using JWT for Protected Routes
To access protected routes like POST /transactions, include the JWT in the Authorization header:

makefile
Copy code
Authorization: Bearer your_jwt_token
Example Request with JWT
bash
Copy code
curl -X POST http://localhost:4300/transactions \
-H "Content-Type: application/json" \
-H "Authorization: Bearer your_jwt_token" \
-d '{"type": "income", "category": "salary", "amount": 5000, "date": "2024-10-20", "description": "Monthly salary"}'
Error Handling
The API provides meaningful error messages for invalid inputs, such as:

Invalid transaction ID
Missing or incorrect request body fields
Authentication errors (missing or invalid JWT)
Postman Screenshots
Add screenshots demonstrating each API call using Postman.

Optional Features
Pagination: Implemented for GET /transactions to handle large volumes of data.
Reports: An endpoint to generate monthly reports by category.
License
This project is licensed under the MIT License.

vbnet
Copy code

### Summary of Key Points
- The `.env` file holds important environment variables for the project, including the MongoDB URI and JWT secret.
- The API supports CRUD operations on transactions, with JWT authentication to protect certain routes.
- Optional features include pagination and report generation by category or date range.
