# Architecture Decisions — Question Bank & Exam Engine

## 1. Versioning Strategy

Decision:
- Introduced QuestionVersion instead of updating questions directly

Why:
- Maintain full history of edits
- Allow audit + rollback
- Enable content evolution

Trade-off:
- Slightly more complex queries
- Managed using current_version_id pointer

---

## 2. Content Separation

Decision:
- Separated QuestionContent from QuestionVersion

Why:
- Supports future extensibility:
  - passages
  - media
  - multilingual content

---

## 3. Tenant Isolation

Decision:
- Every entity includes tenant_id

Why:
- Multi-tenant SaaS readiness
- Prevent cross-organization data leaks

---

## 4. Exam Attempt Model

Decision:
- Created ExamAttempt + ExamAttemptAnswer

Why:
- Persist full student interaction
- Enable analytics + adaptive engine later

---

## 5. Evaluation at Submission

Decision:
- Evaluate answers during submission (not during attempt)

Why:
- Keeps exam player lightweight
- Centralizes logic in backend

---

## 6. Denormalized Result Response

Decision:
- Return text (not IDs) in result API

Why:
- Improve frontend simplicity
- Improve student experience
- Reduce frontend joins

---

## 7. Minimal UI First

Decision:
- Built minimal UI before full design

Why:
- Validate backend correctness
- Ensure system works end-to-end
- Avoid premature optimization

---

## Key Principle Followed

"Build correct system first, then beautiful system"
