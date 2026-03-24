Knowledge Tree UI Workflow
Overview

The Knowledge Tree user interface allows administrators to create and manage the hierarchical learning structure used by the Gauge Mocks platform.

The UI is part of the Admin Dashboard and enables users to build the academic structure required for the Question Bank and Exam Engine.

The knowledge hierarchy consists of three levels:

Subject
   ↓
Topic
   ↓
Concept

Administrators use the interface to create this structure before adding questions to the system.

Accessing the Knowledge Tree

The Knowledge Tree interface is accessible through the Admin Dashboard.

Route:

/dashboard/knowledge

This page is available to users with the following roles:

tenant_admin
teacher

These roles can create and manage the learning structure for their organization.

Knowledge Tree Page Layout

The page contains three primary sections:

Create Subject
View Knowledge Hierarchy
Add Topics and Concepts

Example layout:

Knowledge Structure

[ Add Subject ]

Mathematics
   [ Add Topic ]

   Algebra
      [ Add Concept ]

      Linear Equations
      Quadratic Equations
Creating a Subject

Subjects represent the highest level of the knowledge hierarchy.

Steps

Navigate to the Knowledge Tree page.

Enter the subject name in the input field.

Click Add Subject.

Example:

Subject: Mathematics

After creation, the subject appears in the hierarchy.

Example:

Mathematics
Creating a Topic

Topics represent subdivisions of a subject.

Steps

Locate the subject.

Enter the topic name in the Add Topic field.

Click Add Topic.

Example:

Subject: Mathematics
Topic: Algebra

The topic appears under the subject.

Example:

Mathematics
   Algebra
Creating a Concept

Concepts represent the smallest learning units used by the platform.

Questions in the Question Bank will be linked to concepts.

Steps

Locate the topic.

Enter the concept name in the Add Concept field.

Click Add Concept.

Example:

Topic: Algebra
Concept: Linear Equations

Resulting hierarchy:

Mathematics
   Algebra
      Linear Equations
Knowledge Hierarchy Example

Example knowledge structure:

Mathematics
   Algebra
      Linear Equations
      Quadratic Equations

   Geometry
      Triangles
      Circles

This hierarchy will later be used to organize questions.

UI Component Structure

The UI is built using modular React components.

Component hierarchy:

KnowledgePage
   ↓
SubjectItem
   ↓
TopicItem
Component Responsibilities

KnowledgePage

Handles:

Loading subjects
Rendering the knowledge tree
Subject creation

SubjectItem

Handles:

Displaying subject name
Creating topics
Loading topics

TopicItem

Handles:

Displaying topic name
Creating concepts
Loading concepts
API Interaction

The UI communicates with the backend using API endpoints.

Examples:

GET  /knowledge/subjects
POST /knowledge/subjects

GET  /knowledge/topics/:subjectId
POST /knowledge/topics

GET  /knowledge/concepts/:topicId
POST /knowledge/concepts

API requests are made through the frontend API helper.

Example:

apiFetch('/knowledge/subjects')
Typical Admin Workflow

Typical steps followed by an administrator:

1. Create Subject
2. Create Topic
3. Create Concept

Example:

Subject: Mathematics
Topic: Algebra
Concept: Linear Equations

Result:

Mathematics
   Algebra
      Linear Equations
Role in the System

The Knowledge Tree created in the UI is used by several modules in the system:

Question Bank
Exam Builder
Student Analytics
Adaptive Exam Engine

Questions created in the Question Bank will reference:

concept_id

This enables the platform to measure student performance at the concept level.

Future Improvements

Planned improvements for the Knowledge Tree UI include:

Collapsible tree interface
Drag-and-drop hierarchy editing
Bulk knowledge import
Search and filtering
Concept tagging

These enhancements will improve usability as the knowledge base grows.

Summary

The Knowledge Tree UI provides administrators with a simple interface to create and manage the hierarchical learning structure used across the Gauge Mocks platform.

The workflow supports:

Subject creation
Topic creation
Concept creation
Hierarchical visualization

This structure forms the foundation for the Question Bank and Adaptive Learning modules.