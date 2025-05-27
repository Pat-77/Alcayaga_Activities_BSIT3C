## API Endpoints

### Register a User
- **Method**: POST
- **URL**: `/api/register/`
- **Request Body**:
```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "your_password"
}

// RESPONSE:
{
  "id": 1,
  "username": "john",
  "email": "john@example.com"
}




## API Endpoints – CRUD (All Require JWT Auth Header)

### Tickets

| Method | Endpoint           | Description           |
|--------|--------------------|-----------------------|
| GET    | /api/tickets/      | List all tickets      |
| GET    | /api/tickets/1/    | Retrieve ticket ID 1  |
| POST   | /api/tickets/      | Create new ticket     |
| PUT    | /api/tickets/1/    | Update ticket ID 1    |
| DELETE | /api/tickets/1/    | Delete ticket ID 1    |

**Sample POST Request Body**:
```json
{
  "title": "Login Issue",
  "description": "I can't log into my account.",
  "status": "open",
  "user": 1,
  "category": 2
}



Categories

| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| GET    | /api/categories/   | List all categories  |
| POST   | /api/categories/   | Create new category  |
| PUT    | /api/categories/1/ | Update category ID 1 |
| DELETE | /api/categories/1/ | Delete category ID 1 |


Comments

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | /api/comments/   | List all comments     |
| POST   | /api/comments/   | Add comment to ticket |
| PUT    | /api/comments/1/ | Update comment ID 1   |
| DELETE | /api/comments/1/ | Delete comment ID 1   |
