# API Documentation for n8n Integration

Base URL: `http://localhost:8080`

## Webhook Payload (CV Upload)

**Description**: When a candidate submits a CV, the backend automatically sends this payload to the n8n webhook.

**Webhook Payload**:
```json
{
  "id": 1234567890,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+84 123 456 789",
  "cv_path": "cv_1234567890.pdf",
  "job_id": 123
}
```

**Fields**:
- `id` - CV upload ID (timestamp-based)
- `name` - Candidate's full name
- `email` - Candidate's email
- `phone` - Candidate's phone number
- `cv_path` - Filename of the uploaded CV (stored in `/uploads/`)
- `job_id` - ID of the job position being applied for (can be null if not provided)

**n8n Usage**:
1. Receive webhook
2. Use `job_id` to fetch job details: `GET http://localhost:8080/api/jobs/{job_id}`
3. Download CV file: `http://localhost:8080/uploads/{cv_path}`
4. Analyze CV against job requirements
5. Update CV status and create quiz

---

## 1. Update CV Status (After CV Check)

**Endpoint**: `POST /api/cv/:id/status`

**Description**: n8n calls this after analyzing CV to update status

**Request Body**:
```json
{
  "cv_status": "approved" | "rejected" | "checking"
}
```

**Response**:
```json
{
  "success": true,
  "message": "CV status updated",
  "cv_status": "approved"
}
```

**Example curl**:
```bash
curl -X POST http://localhost:8080/api/cv/1234567890/status \
  -H "Content-Type: application/json" \
  -d '{"cv_status": "approved"}'
```

---

## 2. Create Quiz Session (Send Questions to Candidate)

**Endpoint**: `POST /api/quiz/create`

**Description**: n8n calls this to create quiz with questions after CV is approved

**Request Body**:
```json
{
  "cv_id": 1234567890,
  "time_per_question": 60,
  "questions": [
    "What is your experience with React?",
    "Explain the difference between SQL and NoSQL",
    "How do you handle state management in large applications?"
  ]
}
```

**Response**:
```json
{
  "success": true,
  "message": "Quiz created",
  "session_id": 1234567891,
  "total_questions": 3
}
```

**Example curl**:
```bash
curl -X POST http://localhost:8080/api/quiz/create \
  -H "Content-Type: application/json" \
  -d '{
    "cv_id": 1234567890,
    "time_per_question": 60,
    "questions": [
      "What is your experience with React?",
      "Explain the difference between SQL and NoSQL"
    ]
  }'
```

---

## 3. Get Job Details by ID

**Endpoint**: `GET /api/jobs/:id`

**Description**: Get details of a specific job position. This is used by n8n to retrieve job information when creating quiz questions based on both the CV and the job requirements.

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 123,
    "job_title": "Backend Developer",
    "company": "VTech",
    "location": "Hanoi",
    "salary": "$2000-$3000",
    "job_type": "Full-time",
    "description": "Job description...",
    "requirements": "Experience with Node.js, Go...",
    "benefits": "Health insurance, flexible hours...",
    "contact_email": "hr@vtech.com",
    "deadline": "2025-12-31",
    "experience": "2+ years",
    "working_hours": "9AM-6PM"
  }
}
```

**Example curl**:
```bash
curl http://localhost:8080/api/jobs/123
```

---

## 4. Get Quiz Results (After Candidate Completes Quiz)

**Endpoint**: `POST /api/quiz/session/:sessionId/complete`

**Description**: Frontend calls this when quiz is completed. n8n can listen to webhook or poll this data

**Response** (contains all answers):
```json
{
  "success": true,
  "message": "Quiz completed",
  "answers": [
    {
      "question": "What is your experience with React?",
      "answer": "I have 5 years of experience...",
      "time_taken": 45
    },
    {
      "question": "Explain the difference between SQL and NoSQL",
      "answer": "SQL is relational...",
      "time_taken": 52
    }
  ]
}
```

---

## Socket.IO Events (Real-time Updates)

n8n can optionally listen to these events via Socket.IO:

- `cv:new` - New CV uploaded
- `cv:status_update` - CV status changed
- `quiz:ready` - Quiz created and ready
- `quiz:completed` - Candidate completed quiz

---

## Flow Diagram

```
1. Candidate submits CV
   ↓
2. Frontend → Backend: /api/upload-cv (includes job_id)
   ↓
3. Backend → n8n: webhook with CV data (includes job_id)
   ↓
4. n8n retrieves job details: GET /api/jobs/{job_id}
   ↓
5. n8n analyzes CV against job requirements
   ↓
6. n8n → Backend: POST /api/cv/:id/status {"cv_status": "approved"}
   ↓
7. n8n generates quiz questions based on CV + job requirements
   ↓
8. n8n → Backend: POST /api/quiz/create {cv_id, questions}
   ↓
8. Frontend polls: GET /api/cv/:id/processing-status
   ↓
9. Frontend shows quiz button
   ↓
10. Candidate completes quiz
   ↓
11. Frontend → Backend: POST /api/quiz/session/:id/complete
   ↓
12. n8n receives quiz answers (via webhook)
   ↓
13. n8n evaluates and sends final result
```

---

## Frontend URLs

- CV Processing: `http://localhost:3000/cv-processing/{cvId}`
- Quiz Page: `http://localhost:3000/quiz/{sessionId}`

---

## Database Schema

### cv_uploads table
- `cv_status` - 'checking' | 'approved' | 'rejected' | 'quiz_ready' | 'quiz_completed'
- `job_id` - INTEGER (FK to jobs table) - ID of the job position being applied for

### quiz_sessions table  
- `id`, `cv_id`, `status`, `total_questions`, `time_per_question`, `created_at`

### quiz_questions table
- `id`, `session_id`, `question_text`, `question_order`, `answer`, `time_taken`
