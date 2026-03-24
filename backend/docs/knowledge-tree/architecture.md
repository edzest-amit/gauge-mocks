Knowledge Tree Architecture
Overview

The Knowledge Tree module defines the conceptual learning structure for the Gauge Mocks platform. It organizes academic content into a hierarchical structure that enables question tagging, concept-level analytics, adaptive exam generation, and personalized learning insights.

This module forms the foundation layer of the platform and is used by multiple downstream systems including the Question Bank, Exam Engine, Student Analytics, and Adaptive Learning modules.

The Knowledge Tree allows administrators to create and manage the academic structure of a course or exam preparation program.

Knowledge Hierarchy

The system models learning content using a three-level hierarchical structure:

Subject
   ↓
Topic
   ↓
Concept

Example:

Mathematics
   Algebra
      Linear Equations
      Quadratic Equations
   Geometry
      Triangles
      Circles
Level Definitions
Level	Description
Subject	A broad academic category or subject area
Topic	A sub-area within a subject
Concept	The smallest measurable learning unit

Questions in the system are attached to Concepts, not directly to Subjects or Topics.

Concept-Level Question Mapping

Questions are linked to the concept_id field.

Example:

Concept: Linear Equations
   Questions: Q1, Q2, Q3

Mapping questions to concepts allows the platform to perform:

Concept-level performance analysis

Weak concept detection

Personalized exam generation

Adaptive exam logic

Example:

Student Performance
Linear Equations → 40%
Quadratic Equations → 80%

The system can then automatically generate new exams focusing on weak concepts.

Multi-Tenant Architecture

Gauge Mocks is designed as a multi-tenant platform.

Each tenant maintains an independent knowledge structure.

Data isolation is implemented using the tenant_id field.

Tables containing tenant isolation:

Subject
Topic
Concept

Each record includes:

tenant_id

Example:

Tenant A
   Mathematics
      Algebra

Tenant B
   Physics
      Mechanics

This ensures that knowledge structures are completely isolated between tenants.

Backend Architecture

The Knowledge Tree module follows the backend architecture pattern used across the platform:

Controller
   ↓
Service
   ↓
Repository
   ↓
Prisma ORM
   ↓
PostgreSQL
Layer Responsibilities
Layer	Responsibility
Controller	Handles API endpoints
Service	Contains business logic
Repository	Handles database access
Prisma	ORM abstraction
PostgreSQL	Data persistence

This layered approach keeps the system modular, testable, and maintainable.

Database Entities
Subject

Represents the highest level of the knowledge hierarchy.

Fields:

id
tenant_id
name
description
created_at
Topic

Represents a subdivision of a subject.

Fields:

id
tenant_id
subject_id
name
description
created_at

Relationship:

Subject
   ↓
Topic
Concept

Represents the smallest measurable learning unit.

Fields:

id
tenant_id
topic_id
name
description
created_at

Relationship:

Topic
   ↓
Concept
Data Relationships
Subject
   ↓
Topic
   ↓
Concept

Relationship model:

Subject (1)
   ↓
Topic (many)
   ↓
Concept (many)
API Endpoints

The Knowledge Tree module exposes REST APIs for managing the hierarchy.

Subjects
POST   /knowledge/subjects
GET    /knowledge/subjects
Topics
POST   /knowledge/topics
GET    /knowledge/topics/:subjectId
Concepts
POST   /knowledge/concepts
GET    /knowledge/concepts/:topicId

All endpoints require JWT authentication.

Frontend Integration

The Knowledge Tree management interface is available in the Admin Dashboard.

Route:

/dashboard/knowledge

The UI is composed of the following components:

KnowledgePage
   ↓
SubjectItem
   ↓
TopicItem

These components allow administrators to:

Create Subjects

Create Topics

Create Concepts

View the hierarchical knowledge structure

Example UI structure:

Mathematics
   Algebra
      Linear Equations
      Quadratic Equations
Admin Workflow

Typical workflow for creating knowledge structures:

Create Subject
   ↓
Create Topic
   ↓
Create Concept

Example:

Subject: Mathematics
Topic: Algebra
Concept: Linear Equations
Role in the Overall System

The Knowledge Tree module is the starting point for all learning analytics and exam generation.

System flow:

Knowledge Tree
   ↓
Question Bank
   ↓
Exam Builder
   ↓
Student Attempts
   ↓
Performance Analytics
   ↓
Adaptive Exam Generation
Future Enhancements

The architecture supports several planned improvements:

Collapsible knowledge tree UI
Bulk knowledge import
Concept tagging
Concept difficulty modeling
AI-assisted concept clustering

These enhancements will integrate with the Question Bank and Adaptive Learning modules.

Summary

The Knowledge Tree module provides a scalable hierarchical learning structure that supports concept-level analytics and adaptive exam generation.

Key characteristics:

Hierarchical knowledge modeling
Multi-tenant data isolation
Concept-level question tagging
Modular backend architecture
Extensible design

This module serves as the foundation for the Question Bank and Adaptive Exam Engine within the Gauge Mocks platform.