# Authentication API

Base URL

http://localhost:3000

All protected endpoints require:

Authorization: Bearer <token>

---

# 1. Login

POST /auth/login

Description:
Authenticates a user and returns a JWT token.

Request Body

{
  "email": "user@example.com",
  "password": "password123"
}

Response

{
  "access_token": "JWT_TOKEN"
}

---

# 2. Register User

POST /auth/register

Description:
Creates a new user and assigns a role.

Request Body

{
  "email": "teacher@example.com",
  "password": "password123",
  "tenantId": "TENANT_UUID",
  "role": "teacher"
}

Response

{
  "id": "USER_ID",
  "email": "teacher@example.com"
}

---

# 3. Get Profile

GET /auth/me

Headers

Authorization: Bearer <token>

Response

{
  "id": "USER_ID",
  "email": "user@example.com",
  "tenant_id": "TENANT_ID",
  "user_roles": [
    {
      "role": {
        "name": "tenant_admin"
      }
    }
  ]
}

---

# 4. List Users (Tenant Admin)

GET /auth/users

Headers

Authorization: Bearer <token>

Description:
Returns all users belonging to the tenant.

Response

[
  {
    "id": "USER_ID",
    "email": "teacher@example.com"
  }
]