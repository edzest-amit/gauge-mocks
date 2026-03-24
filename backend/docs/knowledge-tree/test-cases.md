Knowledge Tree Test Cases
Overview

This document defines the manual test cases used to verify the functionality of the Knowledge Tree module.

The module allows administrators to create and manage a hierarchical learning structure consisting of:

Subject
   ↓
Topic
   ↓
Concept

These test cases validate that the backend APIs and frontend UI work correctly together.

Test Environment

Backend:

NestJS
PostgreSQL
Prisma ORM

Frontend:

Next.js
React
Admin Dashboard

Access URL:

http://localhost:3001/dashboard/knowledge
Test Case 1 — Create Subject
Objective

Verify that a tenant admin can create a new subject.

Steps

Login as tenant admin.

Navigate to:

/dashboard/knowledge

Enter a subject name.

Click Add Subject.

Example input:

Mathematics
Expected Result

The subject appears in the knowledge hierarchy.

Example:

Mathematics
Database Verification

Check the subject table.

Expected record:

name = Mathematics
tenant_id = current tenant
Test Case 2 — Create Topic
Objective

Verify that a topic can be created under a subject.

Steps

Create or select an existing subject.

Enter a topic name under the subject.

Click Add Topic.

Example input:

Subject: Mathematics
Topic: Algebra
Expected Result

Topic appears under the subject.

Example:

Mathematics
   Algebra
Database Verification

Check the topic table.

Expected record:

name = Algebra
subject_id = Mathematics
tenant_id = current tenant
Test Case 3 — Create Concept
Objective

Verify that a concept can be created under a topic.

Steps

Create or select an existing topic.

Enter a concept name under the topic.

Click Add Concept.

Example input:

Topic: Algebra
Concept: Linear Equations
Expected Result

Concept appears under the topic.

Example:

Mathematics
   Algebra
      Linear Equations
Database Verification

Check the concept table.

Expected record:

name = Linear Equations
topic_id = Algebra
tenant_id = current tenant
Test Case 4 — Retrieve Subjects
Objective

Verify that subjects can be retrieved from the backend.

API
GET /knowledge/subjects
Expected Result

Returns all subjects belonging to the tenant.

Example response:

[
  {
    "id": "uuid",
    "name": "Mathematics"
  }
]
Test Case 5 — Retrieve Topics
Objective

Verify that topics can be retrieved by subject.

API
GET /knowledge/topics/:subjectId

Example:

GET /knowledge/topics/subject_uuid
Expected Result

Returns all topics associated with the subject.

Example response:

[
  {
    "id": "uuid",
    "name": "Algebra"
  }
]
Test Case 6 — Retrieve Concepts
Objective

Verify that concepts can be retrieved by topic.

API
GET /knowledge/concepts/:topicId

Example:

GET /knowledge/concepts/topic_uuid
Expected Result

Returns all concepts associated with the topic.

Example response:

[
  {
    "id": "uuid",
    "name": "Linear Equations"
  }
]
Test Case 7 — Input Validation
Objective

Verify that invalid input is rejected.

Example

Send a request with an empty name.

Example request:

{
  "name": ""
}
Expected Result

API returns:

400 Bad Request

Validation message indicates that the name field must have a minimum length.

Test Case 8 — Authentication Protection
Objective

Verify that Knowledge Tree APIs require authentication.

Steps

Send a request without the Authorization header.

Example:

GET /knowledge/subjects
Expected Result

API returns:

401 Unauthorized
Test Case 9 — Tenant Data Isolation
Objective

Verify that knowledge structures are isolated between tenants.

Steps

Login as Tenant A.

Create subjects and topics.

Login as Tenant B.

Retrieve subjects.

Expected Result

Tenant B should not see Tenant A data.

Test Case 10 — UI Hierarchy Rendering
Objective

Verify that the UI correctly renders the knowledge hierarchy.

Example Data
Mathematics
   Algebra
      Linear Equations
Expected Result

The UI should display the hierarchy correctly:

Mathematics
   Algebra
      Linear Equations

Each level should appear under its parent entity.

Summary

These test cases ensure the Knowledge Tree module correctly supports:

Subject creation
Topic creation
Concept creation
API retrieval
Input validation
Authentication protection
Tenant data isolation
UI hierarchy rendering

Successful execution of these tests confirms that the Knowledge Tree module is functioning as expected.