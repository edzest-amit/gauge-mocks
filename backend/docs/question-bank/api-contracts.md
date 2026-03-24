# API Contracts — Question Bank & Exam Engine

## 1. Start Exam

POST /exam/start

Response:
{
  "attemptId": "string",
  "questions": [
    {
      "id": "string",
      "current_version": {
        "content": {
          "stem_text": "string"
        },
        "options": [
          {
            "id": "string",
            "option_text": "string"
          }
        ]
      }
    }
  ]
}

---

## 2. Submit Exam

POST /exam/submit

Request:
{
  "attemptId": "string",
  "answers": {
    "questionId": "optionId"
  }
}

Response:
{
  "total": number,
  "score": number,
  "results": [
    {
      "questionId": "string",
      "questionText": "string",
      "selectedOptionText": "string",
      "correctOptionText": "string",
      "explanation": "string",
      "isCorrect": boolean
    }
  ]
}

---

## 3. Key Guarantees

- All queries are tenant-scoped
- Only published questions appear in exams
- Results include human-readable content
- Submission persists answers and updates attempt status
