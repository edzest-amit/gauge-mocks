Knowledge Tree Decision Log
Purpose

This document records the architectural and design decisions made while building the Knowledge Tree module.
Maintaining a decision log helps future developers understand why certain design choices were made, not just how the system works.

Decision 1 — Hierarchical Knowledge Structure
Decision

Use a three-level hierarchy for organizing learning content:

Subject → Topic → Concept
Rationale

This structure provides a balance between:

Simplicity

Analytical precision

Flexibility across different exam types

It allows the platform to model learning content for exams such as:

PMP
GMAT
GRE
School curriculum
Competitive exams
Alternatives Considered

Two-level hierarchy

Subject → Concept

Rejected because it lacks intermediate structure and becomes difficult to manage for large subjects.

Four-level hierarchy

Subject → Unit → Topic → Concept

Rejected for MVP because it increases complexity without providing immediate benefits.

Decision 2 — Questions Linked to Concepts
Decision

Questions are mapped to:

concept_id

instead of linking directly to subjects or topics.

Rationale

Concepts represent the smallest measurable learning unit, which allows the platform to perform detailed analytics.

Benefits:

Concept-level analytics
Weak concept identification
Personalized exam generation
Adaptive exam logic

Example:

Concept: Linear Equations
Questions: Q1, Q2, Q3

Student performance on these questions determines concept mastery.

Decision 3 — Multi-Tenant Data Isolation
Decision

All Knowledge Tree entities include:

tenant_id
Rationale

Gauge Mocks is designed as a multi-tenant SaaS platform.

Each tenant (institution or training provider) must have its own knowledge structure.

Example:

Tenant A
   Mathematics
   Physics

Tenant B
   PMP
   Agile

This prevents data leakage between tenants.

Decision 4 — CamelCase API vs SnakeCase Database
Decision

Use:

camelCase → API layer
snake_case → Database layer

Example:

subjectId → API
subject_id → Database
Rationale

Frontend frameworks and TypeScript conventions prefer camelCase.

Databases typically use snake_case.

Mapping is handled inside the repository layer.

Decision 5 — Repository Pattern for Database Access
Decision

Introduce a dedicated repository layer between services and Prisma.

Architecture:

Controller
   ↓
Service
   ↓
Repository
   ↓
Prisma
Rationale

Benefits:

Clean separation of responsibilities
Centralized database logic
Easier refactoring
Better testability

Without this layer, database queries would spread across services.

Decision 6 — Progressive Loading in UI
Decision

Topics and concepts are loaded only when needed, instead of loading the entire tree.

Example:

Load Subjects
   ↓
Load Topics when subject expands
   ↓
Load Concepts when topic expands
Rationale

This improves performance when knowledge structures grow large.

Loading the entire tree at once could cause performance issues when the database contains hundreds or thousands of concepts.

Decision 7 — Component-Based UI Architecture
Decision

Implement the Knowledge Tree UI using modular React components:

KnowledgePage
   ↓
SubjectItem
   ↓
TopicItem
Rationale

Benefits:

Reusable components
Cleaner code structure
Better maintainability
Clear separation of responsibilities

Each component handles its own state and API interactions.

Decision 8 — DTO-Based Input Validation
Decision

All API inputs are validated using DTOs with class-validator.

Examples:

CreateSubjectDto
CreateTopicDto
CreateConceptDto

Example validation:

@IsString()
@MinLength(2)
name: string
Rationale

Benefits:

Prevents invalid data from entering the database
Provides consistent API behavior
Improves system reliability
Decision 9 — Admin Dashboard Integration
Decision

The Knowledge Tree management interface is integrated into the Admin Dashboard.

Route:

/dashboard/knowledge
Rationale

The admin dashboard will eventually manage:

Users
Knowledge
Question Bank
Exams
Analytics

Keeping the Knowledge Tree within the dashboard ensures consistent navigation.

Decision 10 — MVP Scope Limitation
Decision

The MVP Knowledge Tree includes only:

Create Subject
Create Topic
Create Concept
View hierarchical structure
Rationale

Advanced features were intentionally deferred to keep the MVP development focused.

Future enhancements include:

Collapsible tree UI
Bulk knowledge import
Concept tagging
Drag-and-drop hierarchy editing
Summary

Key architectural principles followed in the Knowledge Tree module:

Hierarchical knowledge modeling
Concept-level question mapping
Multi-tenant isolation
Clean layered backend architecture
Progressive UI loading
DTO-based input validation

These decisions ensure that the Knowledge Tree module remains scalable and serves as a strong foundation for the Question Bank and Adaptive Learning systems.