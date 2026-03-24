# Analytics & Adaptive Engine — Architecture Summary

## Data Flow

User → Attempt → Answer → Concept Mapping → Aggregation → Insight → Adaptive Delivery

---

## Core Components

### 1. Data Layer

* ExamAttemptAnswer
* QuestionConcept
* UserConceptStats

---

### 2. Analytics Layer

* Aggregates concept performance
* Computes accuracy + level

---

### 3. Adaptive Engine

* Input:

  * previousQuestionId
  * wasCorrect
  * askedQuestionIds
  * masteredConceptIds
* Output:

  * next best question

---

### 4. Persistence Layer

* Tracks long-term performance
* Enables continuity across sessions

---

### 5. Frontend Layers

* Analytics Dashboard
* Practice Module
* Adaptive Engine UI

---

## Learning Loop

Attempt → Analyze → Identify Weakness → Practice → Adapt → Master → Persist

---

## System Properties

* Deterministic (no black-box ML)
* Explainable
* Scalable
* Extendable (difficulty, spaced repetition)



# Known Limitations (MVP)

1. No difficulty weighting
2. No spaced repetition
3. No time-based decay
4. Concept tagging accuracy is critical dependency
5. Version-level concept tracking not implemented
6. No question diversity control beyond "no repeat"
7. No cross-concept dependency modeling

---

## Implication

System is intelligent but not yet optimized for:

* long-term retention
* exam simulation realism

# Next Evolution Roadmap

## Phase 2 Intelligence

* Difficulty tagging (easy/medium/hard)
* Progressive difficulty adaptation

## Phase 3 Learning Science

* Spaced repetition
* Forgetting curve integration

## Phase 4 Personalization

* User learning velocity
* Time-to-mastery tracking

## Phase 5 Productization

* Instructor dashboards
* Cohort analytics
* Recommendation engine


____

# Gauge Mocks — System Architecture

## 1. Overview

Gauge Mocks is a multi-tenant adaptive learning platform designed for professional certification exams (e.g., PMP).

Core capabilities:
- Question bank management
- Diagnostic testing
- Concept-level analytics
- Adaptive practice engine

---

## 2. High-Level Flow

```text
Admin Upload → Question Bank → Exam → Result → Weak Areas → Adaptive Practice

