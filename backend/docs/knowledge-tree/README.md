Knowledge Tree Module Documentation
Overview

The Knowledge Tree module defines the hierarchical learning structure used by the Gauge Mocks platform. It allows administrators to organize academic content into subjects, topics, and concepts that form the foundation for question tagging, exam generation, and student performance analytics.

The hierarchy implemented in the system is:

Subject
   ↓
Topic
   ↓
Concept

Each concept represents the smallest measurable learning unit, and questions in the Question Bank will be linked to concepts.

This module provides the structural layer required for the following platform capabilities:

Question Bank
Exam Builder
Student Analytics
Adaptive Exam Generation
Module Responsibilities

The Knowledge Tree module enables administrators to:

Create Subjects
Create Topics
Create Concepts
Manage the learning hierarchy
Provide concept mapping for questions

The module ensures that academic content is organized in a consistent structure that can be used across the entire platform.

Documentation Structure

This directory contains documentation related to the design, implementation, and usage of the Knowledge Tree module.

docs/knowledge-tree
│
├── architecture.md
├── decision-log.md
├── api.md
├── folder-structure.md
├── ui-workflow.md
├── test-cases.md
└── module-summary.md
Document Descriptions
architecture.md

Describes the architectural design of the Knowledge Tree module, including:

hierarchical knowledge modeling

database entities

backend architecture

frontend integration

decision-log.md

Records the key architectural and design decisions made while implementing the module.

Examples include:

Hierarchy design
Concept-level question mapping
Multi-tenant data isolation
Repository layer usage
api.md

Documents the API endpoints used to manage the Knowledge Tree.

Includes:

Subject APIs
Topic APIs
Concept APIs
Request examples
Response examples
folder-structure.md

Explains how the backend and frontend code for the Knowledge Tree module is organized within the project.

Includes descriptions of:

Controllers
Services
Repositories
DTOs
UI components
ui-workflow.md

Explains how administrators interact with the Knowledge Tree through the Admin Dashboard.

Includes:

Subject creation workflow
Topic creation workflow
Concept creation workflow
UI component hierarchy
test-cases.md

Defines manual test scenarios used to verify the module functionality.

Includes tests for:

Subject creation
Topic creation
Concept creation
API responses
Validation
Authentication protection
Tenant isolation
module-summary.md

Provides a high-level overview of the Knowledge Tree module, including its purpose, key features, and integration with other platform components.

Role in the Overall System

The Knowledge Tree module is the starting point for the entire content pipeline of the Gauge Mocks platform.

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

Without the Knowledge Tree, the platform cannot organize questions or analyze learning performance at the concept level.

Future Improvements

Planned improvements for this module include:

Collapsible knowledge tree interface
Bulk knowledge import
Drag-and-drop hierarchy editing
Concept tagging system
Search and filtering
AI-assisted concept clustering

These enhancements will further improve scalability and usability as the platform grows.

Summary

The Knowledge Tree module provides the core academic structure required by the Gauge Mocks platform.

It enables:

Structured content organization
Concept-level analytics
Question tagging
Adaptive exam capabilities

This module serves as the foundation for all future learning and assessment features within the system.