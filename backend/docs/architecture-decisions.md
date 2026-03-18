# Architecture Decision Records (ADR)

This document records important architectural decisions made during the development of Gauge Mocks.

Each decision includes the reasoning behind the choice.

---

## ADR-001 — Multi-Tenant Architecture

Decision:
The system uses a **single database with tenant_id isolation**.

Reason:
Simpler infrastructure for MVP and easier scaling compared to separate databases.

Trade-offs:
Requires strict tenant filtering in queries.

---

## ADR-002 — NestJS Backend Framework

Decision:
NestJS is used for the backend.

Reason:
Provides structured architecture with modules, services, controllers, and dependency injection.

Benefits:
Scalable and maintainable for large applications.

---

## ADR-003 — Prisma ORM

Decision:
Prisma is used as the ORM for database access.

Reason:
Strong TypeScript support and schema-based database modeling.

Benefits:
Better developer experience and safer queries.

---

## ADR-004 — JWT Authentication

Decision:
Authentication uses JSON Web Tokens (JWT).

Reason:
Stateless authentication works well with distributed systems.

Benefits:
No server-side session storage required.

---

## ADR-005 — Argon2 Password Hashing

Decision:
Argon2 is used for password hashing.

Reason:
More secure and modern compared to bcrypt.

Benefits:
Resistant to GPU cracking attacks.

---

## ADR-006 — Repository Pattern

Decision:
Database access is separated into repositories.

Structure:

Controller
↓
Service
↓
Repository
↓
Prisma

Reason:
Keeps business logic independent of database implementation.

---

## ADR-007 — Role-Based Access Control (RBAC)

Decision:
Authorization uses role-based access control.

Roles implemented:

super_admin
tenant_admin
teacher
student

! Organization entity with type will be added later to add department, branch ,class, section etc. 

Reason:
Allows scalable permission management.

---

## ADR-008 — Shared Database Module

Decision:
PrismaService is provided through a shared DatabaseModule.

Reason:
Avoids duplication of database provider across modules.

Benefits:
Cleaner dependency injection.