# DDjango User Authentication & CRUD API

This project provides a user authentication and management system built with Django REST Framework and JWT (JSON Web Tokens). It supports secure user registration, login, and access to protected routes. Additionally, it implements full CRUD (Create, Read, Update, Delete) functionality for managing user data through authenticated API endpoints.

# Authentication routes

- `api/auth/register/` - Register new users
- `api/auth/login/` - Obtain JWT access & refresh tokens
- `api/auth/token/refresh/` - Refresh expired access tokens
- `api/auth/protected/` - Protected route (requires authentication)

# CRUD routes

- GET `api/users/` — for getting a list of users
- POST `api/users/` — for creating a new user
- GET `api/users/{id}/` — for getting a user by ID
- PUT `api/users/{id}/` — for updating a user by ID
- DELETE `api/users/{id}/` — for deleting a user by ID

---

# Setup Instructions

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/Pat-77/Alcayaga_Activities_BSIT3C/tree/main/user_authentication
   cd your-repo-name
