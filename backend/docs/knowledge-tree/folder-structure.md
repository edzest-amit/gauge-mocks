Knowledge Tree Folder Structure
Overview

The Knowledge Tree module is implemented using a modular architecture in the backend and a component-based structure in the frontend.

This structure ensures:

clear separation of responsibilities

maintainable code organization

easier scalability for future modules

The module manages the following entities:

Subject
Topic
Concept
Backend Folder Structure

The Knowledge Tree module is located inside the backend modules directory.

src/modules/knowledge

Complete structure:

src
 └── modules
      └── knowledge
           ├── knowledge.module.ts
           ├── knowledge.controller.ts
           ├── knowledge.service.ts
           │
           ├── repositories
           │    └── knowledge.repository.ts
           │
           └── dto
                ├── create-subject.dto.ts
                ├── create-topic.dto.ts
                └── create-concept.dto.ts
Backend File Responsibilities
knowledge.module.ts

Registers the Knowledge Tree module and its dependencies.

Responsibilities:

module configuration

controller registration

service injection

repository provider registration

knowledge.controller.ts

Defines the API endpoints used to manage the knowledge structure.

Example endpoints:

POST /knowledge/subjects
GET  /knowledge/subjects

POST /knowledge/topics
GET  /knowledge/topics/:subjectId

POST /knowledge/concepts
GET  /knowledge/concepts/:topicId

Responsibilities:

handling HTTP requests

input validation via DTOs

calling service layer methods

knowledge.service.ts

Contains business logic for the Knowledge Tree module.

Responsibilities:

validating operations

coordinating repository calls

enforcing tenant isolation

preparing data for responses

Example operations:

createSubject()
createTopic()
createConcept()
getSubjects()
getTopicsBySubject()
getConceptsByTopic()
knowledge.repository.ts

Handles database access using Prisma.

Responsibilities:

interacting with Prisma ORM

translating API fields into database fields

executing database queries

Example mapping:

subjectId → subject_id
topicId → topic_id

This layer ensures the separation between application logic and database structure.

DTO Directory

Location:

src/modules/knowledge/dto

Contains Data Transfer Objects used for validating API input.

Files:

create-subject.dto.ts
create-topic.dto.ts
create-concept.dto.ts

Responsibilities:

request validation

enforcing data structure

preventing invalid inputs

Example validation rule:

name must be a string
name must have minimum length of 2 characters
Frontend Folder Structure

The Knowledge Tree user interface is implemented within the Admin Dashboard.

Location:

app/dashboard/knowledge

Structure:

app
 └── dashboard
      └── knowledge
           └── page.tsx

UI components are located in:

components/knowledge

Structure:

components
 └── knowledge
      ├── SubjectItem.tsx
      └── TopicItem.tsx
Frontend Component Responsibilities
KnowledgePage

File:

app/dashboard/knowledge/page.tsx

Responsibilities:

load subjects

render knowledge tree UI

allow subject creation

coordinate subject components

Component structure:

KnowledgePage
   ↓
SubjectItem
   ↓
TopicItem
SubjectItem Component

File:

components/knowledge/SubjectItem.tsx

Responsibilities:

display subject name

create topics under a subject

load topics for the subject

render TopicItem components

Example UI:

Mathematics
   [Add Topic]
TopicItem Component

File:

components/knowledge/TopicItem.tsx

Responsibilities:

display topic name

create concepts under a topic

load concepts for the topic

Example UI:

Algebra
   [Add Concept]
API Integration

Frontend communicates with backend using the API helper.

Example usage:

apiFetch('/knowledge/subjects')
apiFetch('/knowledge/topics')
apiFetch('/knowledge/concepts')

This helper automatically handles:

JWT token
API base URL
headers
Component Hierarchy

The knowledge tree UI follows this structure:

KnowledgePage
   ↓
SubjectItem
   ↓
TopicItem

Example UI hierarchy:

Mathematics
   Algebra
      Linear Equations
      Quadratic Equations
Benefits of This Structure

The folder structure provides:

Clear separation of layers
Maintainable code organization
Scalable architecture
Easy module extension

This modular approach allows the Knowledge Tree module to integrate smoothly with future modules such as:

Question Bank
Exam Builder
Analytics
Adaptive Learning Engine