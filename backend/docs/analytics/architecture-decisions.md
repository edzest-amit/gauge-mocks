ADR-XXX — Concept Analytics Computation

Decision:
Concept analytics computed dynamically using query aggregation.

Reason:
Avoid premature optimization and ensure real-time accuracy.

Future:
May introduce precomputed tables for performance scaling.

# Analytics & Adaptive Engine — Decision Log

## 1. Concept-Level Tracking (vs Question-Level)

**Decision:** Track performance at concept level
**Reason:** Enables meaningful learning insights
**Tradeoff:** Requires strict tagging discipline

---

## 2. Question Versioning Alignment

**Decision:** Store `version_id` in ExamAttemptAnswer
**Reason:** Ensures historical accuracy of evaluation
**Tradeoff:** Added schema + migration complexity

---

## 3. Aggregation Strategy (V1)

**Decision:** Compute analytics from Question → Concept mapping
**Reason:** Faster implementation
**Tradeoff:** Not version-aware (acceptable for MVP)

---

## 4. Shift to Persistent Stats

**Decision:** Introduce `UserConceptStats`
**Reason:** Enable cross-session intelligence
**Tradeoff:** Additional DB writes per answer

---

## 5. Adaptive Engine Design

**Decision:** Rule-based (not ML)
**Reason:** Explainable, fast to build, controllable
**Tradeoff:** Limited sophistication initially

---

## 6. Mastery Definition

**Decision:**

* ≥3 attempts
* ≥70% accuracy

**Reason:** Avoid false positives, ensure consistency
**Tradeoff:** May require tuning later

---

## 7. No-Repetition Logic

**Decision:** Track `askedQuestionIds` in session
**Reason:** Prevent user frustration
**Tradeoff:** Requires state management

---

## 8. Backend-Driven Sorting

**Decision:** Sort analytics in backend
**Reason:** Consistency across clients
**Tradeoff:** Slightly more backend logic

---

## 9. Server vs Client Responsibility

**Decision:**

* Server → data
* Client → interaction

**Reason:** Align with Next.js architecture
**Tradeoff:** Additional component separation

---

## 10. MVP Scope Control

**Decision:** Avoid:

* ML models
* difficulty engine
* spaced repetition (initially)

**Reason:** Focus on core loop first
**Tradeoff:** Delayed sophistication


___

# Gauge Mocks — Decision Log

## 1. Multi-Tenant Architecture
Decision:
- Each tenant has isolated data (users, questions, analytics)

Reason:
- Required for institute-level deployment
- Prevents data leakage

---

## 2. Single Question Bank Source
Decision:
- Use one unified question bank (no separate diagnostic dataset)

Reason:
- Avoid duplication
- Enable reuse across:
  - Diagnostic tests
  - Practice
  - Adaptive engine

---

## 3. Concept-Based Design
Decision:
- All questions must be tagged to concepts

Reason:
- Enables:
  - Weak area detection
  - Adaptive learning
- Core differentiator vs traditional mock systems

---

## 4. No Hardcoded Exams
Decision:
- Exams are generated dynamically based on rules

Reason:
- Flexibility
- Allows:
  - Diagnostic tests
  - Custom tests
  - Future adaptive exams

---

## 5. Preview Before Excel Upload
Decision:
- Add preview layer before saving data

Reason:
- Prevent incorrect bulk uploads
- Improves admin trust

---

## 6. Use findFirst instead of upsert (MVP)
Decision:
- Use findFirst + create for subject/topic/concept

Reason:
- Avoid schema complexity
- Faster MVP implementation

---

## 7. Adaptive Engine (Concept Name-Based)
Decision:
- Match weak concepts using concept.name

Reason:
- Simpler integration with frontend
- Avoid passing IDs in MVP

Future Improvement:
- Switch to concept_id-based matching

---

## 8. One-Question Adaptive Flow
Decision:
- Adaptive practice shows one question at a time

Reason:
- Mimics real learning
- Enables feedback loop

---

## 9. No Timer in Practice Mode
Decision:
- Remove timer for adaptive practice

Reason:
- Focus on learning, not speed

---

## 10. UI Simplicity Over Design
Decision:
- Prioritize functionality over UI polish

Reason:
- Faster iteration
- Validate learning effectiveness first

---

## 11. Avoid Feature Expansion
Decision:
- No additional features before testing

Reason:
- Focus on:
  - Behavior
  - Accuracy
  - Learning impact
