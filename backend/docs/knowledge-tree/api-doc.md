Knowledge Tree API Documentation
Overview

The Knowledge Tree API allows administrators to create and manage the hierarchical learning structure used by the Gauge Mocks platform.

The hierarchy consists of three levels:

Subject
   ↓
Topic
   ↓
Concept

These APIs are used by the Admin Dashboard to manage the learning structure for a tenant.

All endpoints require JWT authentication.

Base URL
http://localhost:3000

All endpoints are prefixed with:

/knowledge
Authentication

All requests must include the Authorization header.

Example:

Authorization: Bearer <JWT_TOKEN>

The token is issued during login.

Subjects API
Create Subject

Creates a new subject within the tenant's knowledge structure.

Endpoint
POST /knowledge/subjects
Request Body
{
  "name": "Mathematics",
  "description": "Core mathematics concepts"
}
Response
{
  "id": "uuid",
  "tenant_id": "uuid",
  "name": "Mathematics",
  "description": "Core mathematics concepts",
  "created_at": "timestamp"
}
Get Subjects

Returns all subjects belonging to the tenant.

Endpoint
GET /knowledge/subjects
Response
[
  {
    "id": "uuid",
    "name": "Mathematics"
  },
  {
    "id": "uuid",
    "name": "Physics"
  }
]
Topics API
Create Topic

Creates a topic under a specific subject.

Endpoint
POST /knowledge/topics
Request Body
{
  "subjectId": "subject_uuid",
  "name": "Algebra"
}
Response
{
  "id": "uuid",
  "subject_id": "subject_uuid",
  "name": "Algebra"
}
Get Topics by Subject

Returns all topics associated with a subject.

Endpoint
GET /knowledge/topics/:subjectId
Example
GET /knowledge/topics/subject_uuid
Response
[
  {
    "id": "uuid",
    "name": "Algebra"
  },
  {
    "id": "uuid",
    "name": "Geometry"
  }
]
Concepts API
Create Concept

Creates a concept under a topic.

Endpoint
POST /knowledge/concepts
Request Body
{
  "topicId": "topic_uuid",
  "name": "Linear Equations"
}
Response
{
  "id": "uuid",
  "topic_id": "topic_uuid",
  "name": "Linear Equations"
}
Get Concepts by Topic

Returns all concepts associated with a topic.

Endpoint
GET /knowledge/concepts/:topicId
Example
GET /knowledge/concepts/topic_uuid
Response
[
  {
    "id": "uuid",
    "name": "Linear Equations"
  },
  {
    "id": "uuid",
    "name": "Quadratic Equations"
  }
]
Validation Rules

Input validation is performed using DTOs and class-validator.

Examples:

name must be a string
name must have minimum length of 2 characters

Invalid requests return:

400 Bad Request
Security

All endpoints are protected using JWT authentication.

Example guard:

@UseGuards(JwtAuthGuard)

Additional security measures:

Tenant-based data isolation
DTO validation
Repository-level database access
Error Responses

Common error responses:

Unauthorized
401 Unauthorized

Occurs when the JWT token is missing or invalid.

Validation Error
400 Bad Request

Occurs when request payload does not match DTO validation rules.

Example Workflow

Typical workflow for creating a knowledge structure:

1. Create Subject
   POST /knowledge/subjects

2. Create Topic
   POST /knowledge/topics

3. Create Concept
   POST /knowledge/concepts

Example:

Subject: Mathematics
Topic: Algebra
Concept: Linear Equations

Resulting hierarchy:

Mathematics
   Algebra
      Linear Equations
Role in the System

The Knowledge Tree APIs support multiple platform modules:

Question Bank
Exam Builder
Student Analytics
Adaptive Learning Engine

Questions created in the Question Bank will reference:

concept_id

which allows the platform to perform concept-level performance analysis.