# Analytics & Adaptive Engine — Development Log

## Module Overview

This module transforms the platform from a mock test system into an intelligent learning system by:

* Tracking performance at concept level
* Identifying weak and strong areas
* Driving adaptive question delivery
* Enabling continuous learning loops

---

## Phase 1 — Foundation (Concept Analytics)

* Implemented concept tagging (mandatory before publish)
* Built concept-level aggregation using ExamAttemptAnswer
* Calculated:

  * total attempts per concept
  * correct answers
  * accuracy
* Introduced classification:

  * WEAK (<50%)
  * MEDIUM (50–80%)
  * STRONG (>80%)

---

## Phase 2 — Visualization

* Created analytics API: `/analytics/concepts`
* Built frontend dashboard (Next.js)
* Displayed:

  * concept name
  * accuracy
  * level
* Added sorting:

  * weak → medium → strong
* Added visual cues (color + priority)

---

## Phase 3 — Action Layer (Practice Engine)

* Introduced “Practice Weak Concepts”
* API: `/analytics/practice`
* Logic:

  * fetch questions mapped to weak concepts
* Built practice page
* Enabled:

  * attempt
  * scoring
  * feedback

---

## Phase 4 — Adaptive Engine (Session-Based)

* Introduced `/analytics/adaptive-question`
* Shifted from:

  * static set → dynamic question delivery
* Logic:

  * incorrect → reinforce weak
  * correct → move to medium
* Delivered one question at a time

---

## Phase 5 — Intelligence Layer (Session Memory)

* Added:

  * askedQuestionIds → prevent repetition
  * conceptStats → track performance in session
* Defined mastery:

  * ≥3 attempts AND ≥70% accuracy
* Stopped questions once mastered

---

## Phase 6 — Persistence Layer (Long-Term Intelligence)

* Introduced `UserConceptStats`
* Stored:

  * total_attempts
  * correct_attempts
* Updated stats on every answer
* Replaced analytics source:

  * from ExamAttemptAnswer → UserConceptStats

---

## Final Outcome

System now supports:

* Concept-level tracking
* Adaptive learning path
* Mastery detection
* Persistent learning memory
* Continuous improvement across sessions


___

# Gauge Mocks — Development Log

## Phase 1: Foundation Setup
- Set up backend using NestJS and Prisma
- Designed multi-tenant architecture
- Implemented authentication (JWT-based)
- Created user, tenant, and role structure

## Phase 2: Knowledge Structure
- Implemented Subject → Topic → Concept hierarchy
- Created APIs for:
  - Subjects
  - Topics
  - Concepts
- Ensured tenant-level isolation

## Phase 3: Question Bank System
- Designed question schema with:
  - Versioning (questionVersion)
  - Content (stem, explanation)
  - Options (MCQ)
- Implemented concept tagging (question ↔ concept mapping)
- Built admin UI for:
  - Creating questions
  - Listing questions
  - Editing questions

## Phase 4: Excel Upload System
- Implemented Excel parsing using XLSX
- Built validation layer:
  - Required fields check
  - Correct option validation
  - Difficulty validation
- Implemented:
  - Preview before upload
  - Error reporting
- Auto-created:
  - Subject
  - Topic
  - Concept hierarchy

## Phase 5: Exam Engine
- Built exam creation flow:
  - Concept-based filtering
  - Dynamic question selection
- Implemented exam player:
  - Question navigation
  - Option selection
- Implemented submission flow

## Phase 6: Result & Analytics
- Built result summary page:
  - Score
  - Accuracy
- Implemented concept-level performance tracking
- Categorized performance into:
  - Weak
  - Medium
  - Strong

## Phase 7: Dashboard
- Built student dashboard:
  - First-time user experience
  - Weak/Medium/Strong summary
- Added CTAs:
  - Take test
  - Practice weak areas

## Phase 8: Adaptive Practice Engine
- Implemented adaptive question API
- Built adaptive practice UI:
  - One question at a time
  - Immediate feedback
- Integrated weak concept input into adaptive engine

## Phase 9: End-to-End Flow Integration
- Connected:
  - Result → Practice Start → Adaptive Practice
- Passed weak concepts via query params
- Stabilized API responses and error handling

## Current Status
- Full MVP functional
- Ready for internal testing with real PMP questions
