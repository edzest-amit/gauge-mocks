Knowledge Tree Module Summary
Overview

The Knowledge Tree module defines the hierarchical learning structure used by the Gauge Mocks platform. It allows administrators to organize academic content into structured learning units that can later be used for question tagging, exam generation, analytics, and adaptive learning.

This module serves as the foundation layer for the Question Bank and Exam Engine.

The knowledge hierarchy is structured as:

Subject
   ↓
Topic
   ↓
Concept

Each concept represents the smallest measurable learning unit in the system.

Purpose of the Module

The Knowledge Tree module enables administrators to:

Define academic subjects

Organize topics within subjects

Create concepts within topics

Structure content for question tagging

Enable concept-level analytics

The module ensures that all questions and exams can be associated with precise learning concepts.

Key Features Implemented

The following capabilities have been implemented in the current version of the Knowledge Tree module:

Create Subject
Create Topic
Create Concept
Hierarchical knowledge visualization
Multi-tenant knowledge isolation
JWT-protected API access
DTO-based input validation
Admin dashboard UI integration

These features allow administrators to build the foundational learning structure required for the platform.

Knowledge Hierarchy Example

Example hierarchy created using the module:

Mathematics
   Algebra
      Linear Equations
      Quadratic Equations

   Geometry
      Triangles
      Circles

This hierarchy will later be used to organize questions in the Question Bank.

System Integration

The Knowledge Tree module integrates with several other modules in the platform.

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
Adaptive Exam Engine

Questions created in the Question Bank will reference:

concept_id

This allows the system to analyze student performance at the concept level.

Backend Implementation

The module is implemented using a layered backend architecture.

Controller
   ↓
Service
   ↓
Repository
   ↓
Prisma ORM
   ↓
PostgreSQL

Entities used in this module:

Subject
Topic
Concept

Each entity includes:

tenant_id

This ensures tenant-level data isolation.

Frontend Implementation

The Knowledge Tree interface is available in the Admin Dashboard.

Route:

/dashboard/knowledge

The UI is implemented using modular React components:

KnowledgePage
   ↓
SubjectItem
   ↓
TopicItem

These components allow administrators to create and manage the knowledge hierarchy.

Security

The module includes the following security mechanisms:

JWT authentication for all endpoints
Tenant-level data isolation
DTO input validation
Repository-layer database access

These measures ensure that knowledge data remains secure and properly scoped.

Current Limitations (MVP Scope)

The MVP version of the Knowledge Tree module focuses on core functionality.

The following advanced features are not yet implemented:

Collapsible knowledge tree UI
Bulk knowledge import
Drag-and-drop hierarchy editing
Concept tagging
Knowledge search

These features are planned for future development.

Future Enhancements

The Knowledge Tree module is designed to support future platform capabilities.

Planned improvements include:

Collapsible tree interface
Bulk knowledge import tools
Concept tagging system
Concept difficulty modeling
AI-assisted concept grouping

These enhancements will strengthen the integration between the Knowledge Tree, Question Bank, and Adaptive Learning modules.

Summary

The Knowledge Tree module provides the structured learning framework required by the Gauge Mocks platform.

Core capabilities include:

Hierarchical learning structure
Concept-level content organization
Multi-tenant data isolation
Admin dashboard management interface
Secure API access

This module serves as the starting point for all content organization and learning analytics within the system.