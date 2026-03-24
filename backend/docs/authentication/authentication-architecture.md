# Authentication & Authorization Architecture

This document explains the authentication system used in the Gauge Mocks platform.

The platform supports a **multi-tenant architecture** where multiple organizations can operate within the same system.

---

# High Level Architecture

Frontend → Next.js (React)

Backend → NestJS

Database → PostgreSQL

ORM → Prisma

Authentication → JWT

Password Hashing → Argon2

---

# Request Flow

Frontend
↓
HTTP API Request
↓
AuthController
↓
AuthService
↓
AuthRepository
↓
Prisma ORM
↓
PostgreSQL

---

# Authentication Flow

User Login

POST /auth/login

1. User submits email and password
2. Backend finds user in database
3. Password verified using Argon2
4. JWT token generated
5. Token returned to client

---

# Authorization Flow

Protected routes use:

JwtAuthGuard

Flow:

Request
↓
JWT extracted from Authorization header
↓
JwtStrategy validates token
↓
User attached to request
↓
Controller executes

---

# Multi-Tenant Structure

Each user belongs to a tenant.

Tenant
↓
Users
↓
Roles

Every request carries:

tenantId

inside the JWT payload.

This allows the system to enforce tenant isolation.

---

# Role System

Roles currently supported:

super_admin
tenant_admin
teacher
student

Roles are stored in the Role table and attached through UserRole.

---

# Security Measures

Passwords hashed using Argon2.

JWT expiration configured.

Sensitive data never returned in API responses.

Tenant isolation enforced through tenant_id.

---

# Current Capabilities

Super Admin
  Create tenant
  Create tenant admin

Tenant Admin
  Create users
  Assign roles

Users
  Authenticate
  Access role-based routes