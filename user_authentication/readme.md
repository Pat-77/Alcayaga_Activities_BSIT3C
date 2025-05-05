# Django User Authentication API

This project implements a basic user authentication system using Django REST Framework and JWT (JSON Web Tokens). It allows users to register, log in, and access protected routes securely.

# Project Structure

- `api/auth/register/` - Register new users
- `api/auth/login/` - Obtain JWT access & refresh tokens
- `api/auth/token/refresh/` - Refresh expired access tokens
- `api/auth/protected/` - Protected route (requires authentication)

---

# Setup Instructions

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/Pat-77/Alcayaga_Activities_BSIT3C/tree/main/user_authentication