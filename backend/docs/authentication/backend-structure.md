# Backend Folder Structure

The backend is built using **NestJS modular architecture**.

Each domain is organized into modules.

---

# Root Structure

src

modules → Business modules (auth, tenants, users, future question bank)

database → Database access layer

common → Shared guards, decorators, utilities

main.ts → Application bootstrap

app.module.ts → Root application module

---

# Modules

Each module follows the same internal structure.

Example: Auth Module

src/modules/auth

auth.controller.ts → HTTP endpoints

auth.service.ts → Business logic

auth.module.ts → Module definition

repositories → Database access layer

strategies → Authentication strategies (JWT)

dto → Request validation objects

---

# Example Module Layout

auth

├ auth.controller.ts  
├ auth.service.ts  
├ auth.module.ts  
├ dto  
│ ├ login.dto.ts  
│ └ register.dto.ts  
├ repositories  
│ └ auth.repository.ts  
└ strategies  
  └ jwt.strategy.ts  

---

# Database Layer

src/database

prisma.service.ts → Prisma database client provider

Prisma schema located in:

prisma/schema.prisma

---

# Common Layer

src/common

guards → Authorization guards

decorators → Custom decorators (future)

utilities → Shared helpers (future)

---

# Request Flow

Frontend

↓

Controller

↓

Service

↓

Repository

↓

Prisma ORM

↓

PostgreSQL

---

# Multi-Tenant Design

Tenant isolation is handled using:

tenant_id

present in user records and used in database queries.

---

# Future Modules

Upcoming modules include:

question-bank  
exam-engine  
adaptive-engine  
analytics  
student-learning-profile