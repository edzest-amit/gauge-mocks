# Security Checklist

This checklist documents security practices implemented in the authentication system.

---

## Password Security

Passwords are hashed using **Argon2** before storing in the database.

The database never stores plain-text passwords.

Verification is performed using:

argon2.verify()

---

## JWT Authentication

Authentication uses JSON Web Tokens.

Token includes:

userId  
tenantId  
email  

Tokens expire after **1 hour**.

JWT secret is stored in environment variables.

---

## Environment Variables

Sensitive configuration values are stored in `.env`.

Examples:

DATABASE_URL  
JWT_SECRET  

The `.env` file is excluded from version control.

---

## Protected Routes

Protected endpoints use **JwtAuthGuard**.

Authentication flow:

Request  
↓  
JWT extracted from Authorization header  
↓  
JwtStrategy verifies token  
↓  
User attached to request

---

## Role-Based Authorization

Authorization uses **Role Guards**.

Roles supported:

super_admin  
tenant_admin  
teacher  
student  

Role permissions are checked before executing protected endpoints.

---

## Multi-Tenant Isolation

Each user belongs to a tenant.

Tenant isolation is enforced using:

tenant_id

in database queries.

---

## Sensitive Data Protection

The following fields are never returned in API responses:

password_hash

---

## Future Security Improvements

Planned improvements include:

refresh tokens  
rate limiting  
account lockout after repeated login failures  
audit logs for authentication events