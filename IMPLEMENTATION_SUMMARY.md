# Quiz System Implementation Summary

## ✅ Completed Tasks

### 1. Backend Implementation
- **Database Schema** (`src/db/index.js`)
  - `quiz_sessions` table for quiz session management
  - `quiz_questions` table for storing questions and answers
  - `cv_status` column added to `cv_uploads` table

- **Quiz Routes** (`src/routes/quiz.js`)
  - ✅ `POST /api/cv/:id/status` - n8n updates CV status (checking/approved/rejected)
  - ✅ `POST /api/quiz/create` - n8n creates quiz with questions
  - ✅ `GET /api/cv/:id/processing-status` - Frontend polls for status updates
  - ✅ `GET /api/quiz/session/:sessionId` - Get quiz questions
  - ✅ `POST /api/quiz/session/:sessionId/start` - Start quiz timer
  - ✅ `POST /api/quiz/question/:questionId/answer` - Submit answer
  - ✅ `POST /api/quiz/session/:sessionId/complete` - Complete quiz

- **Quiz Database Functions** (`src/db/quiz.js`)
  - Session CRUD operations
  - Question management
  - Answer tracking with time_taken
  - CV status updates

### 2. Frontend Implementation

- **CV Processing Page** (`/app/cv-processing/[cvId]/page.tsx`)
  - ✅ Timeline visualization (Apply CV → Check CV → Quiz)
  - ✅ Real-time status polling (every 3 seconds)
  - ✅ Quiz ready notification
  - ✅ Rejection message display

- **Quiz Page** (`/app/quiz/[sessionId]/page.tsx`)
  - ✅ Quiz introduction screen with instructions
  - ✅ Timer per question (countdown display)
  - ✅ Auto-submit when timer reaches 0
  - ✅ Question navigation (Previous/Next)
  - ✅ Progress tracking
  - ✅ Answer textarea with character count
  - ✅ Completion screen with redirect

- **Application Form** (`/components/career/application-form.tsx`)
  - ✅ Redirect to `/cv-processing/{cvId}` after successful submission
  - ✅ Show loading state during redirect

### 3. Documentation
- ✅ `API_DOCUMENTATION.md` - Complete API reference for n8n integration
- ✅ `IMPLEMENTATION_SUMMARY.md` - This file

---

## 🔄 Complete Flow (Following Flow Diagram)

### Step-by-Step Process:

1. **Candidate submits CV**
   - User fills out application form at `/career/[id]`
   - Clicks "Submit Application"

2. **Frontend → Backend**: `/api/applications/submit`
   - Form data sent to Next.js API route
   - API route forwards to backend `/api/upload-cv`
   - Returns CV ID to frontend

3. **Backend → n8n**: Webhook with CV data
   - Backend automatically sends CV data to n8n webhook
   - Payload includes: `{ id, name, email, phone, cv_path }`

4. **n8n analyzes CV**
   - n8n workflow processes CV (AI analysis, parsing, etc.)
   - Determines if CV meets requirements

5. **n8n → Backend**: `POST /api/cv/:id/status`
   ```json
   { "cv_status": "approved" | "rejected" }
   ```

6. **n8n generates quiz questions** (if approved)
   - AI creates personalized questions based on CV
   - Prepares 3-5 questions

7. **n8n → Backend**: `POST /api/quiz/create`
   ```json
   {
     "cv_id": 1234567890,
     "time_per_question": 60,
     "questions": [
       "What is your experience with React?",
       "Explain the difference between SQL and NoSQL"
     ]
   }
   ```

8. **Frontend polls**: `GET /api/cv/:id/processing-status`
   - Polls every 3 seconds
   - Receives updated `cv_status` and `quiz_session` data

9. **Frontend shows quiz button**
   - "Start Quiz" button appears when `cv_status === 'quiz_ready'`
   - Displays quiz info (total questions, time limit)

10. **Candidate completes quiz**
    - Timer starts for each question
    - Auto-submits if time runs out
    - Answers saved to backend after each question

11. **Frontend → Backend**: `POST /api/quiz/session/:id/complete`
    - Final submission with all answers
    - Backend updates `cv_status` to `quiz_completed`

12. **n8n receives quiz answers** (via webhook or polling)
    - Can set up Socket.IO listener for `quiz:completed` event
    - Or poll backend for completed quizzes

13. **n8n evaluates and sends final result**
    - AI evaluates answers
    - Sends interview invitation or rejection email

---

## 🧪 Testing Guide

### Prerequisites
```bash
# Start backend server
cd ~/coding/web/job-recruitment-backend
npm run dev

# Start frontend server
cd ~/coding/web/VTechDigital
pnpm dev
```

### Test Scenario 1: Complete Happy Path

1. **Submit CV**
   ```
   - Go to http://localhost:3000/career/1
   - Fill out application form
   - Upload CV file
   - Click "Submit Application"
   - Should redirect to /cv-processing/{cvId}
   ```

2. **Processing Page**
   ```
   - Should see timeline: Apply CV (done) → Check CV (pending) → Quiz (waiting)
   - Status should poll every 3 seconds
   ```

3. **Simulate n8n Approval** (Manual API Call)
   ```bash
   # Replace {cvId} with actual ID from step 1
   curl -X POST http://localhost:8080/api/cv/{cvId}/status \
     -H "Content-Type: application/json" \
     -d '{"cv_status": "approved"}'
   ```

4. **Create Quiz** (Manual API Call)
   ```bash
   curl -X POST http://localhost:8080/api/quiz/create \
     -H "Content-Type: application/json" \
     -d '{
       "cv_id": {cvId},
       "time_per_question": 60,
       "questions": [
         "What is your experience with React?",
         "Explain the difference between SQL and NoSQL",
         "How do you handle state management?"
       ]
     }'
   ```

5. **Quiz Page**
   ```
   - Processing page should now show "Start Quiz" button
   - Click button → Redirects to /quiz/{sessionId}
   - Should see quiz instructions
   - Click "Start Quiz"
   - Answer questions (timer should count down)
   - Test auto-submit by waiting for timer to reach 0
   - Complete all questions
   - Should see completion screen
   - Should redirect back to /cv-processing/{cvId}
   ```

### Test Scenario 2: Rejection Flow

```bash
# After CV upload
curl -X POST http://localhost:8080/api/cv/{cvId}/status \
  -H "Content-Type: application/json" \
  -d '{"cv_status": "rejected"}'

# Processing page should show rejection message
```

### Test Scenario 3: Timer Auto-Submit

1. Start quiz
2. Type partial answer
3. Wait for timer to reach 0
4. Should auto-submit and move to next question
5. Should see "Time's up!" warning

---

## 📝 n8n Workflow Integration

### Required Nodes:

1. **Webhook Trigger** - Receive CV upload notification
2. **HTTP Request** - Download CV file
3. **AI Analyzer** - Parse and evaluate CV
4. **Decision Node** - Approve or Reject
5. **HTTP Request** - Update CV status
   - URL: `http://localhost:8080/api/cv/{{cvId}}/status`
   - Method: POST
   - Body: `{"cv_status": "approved"}`

6. **AI Question Generator** - Create quiz questions
7. **HTTP Request** - Create quiz
   - URL: `http://localhost:8080/api/quiz/create`
   - Method: POST
   - Body: `{"cv_id": {{cvId}}, "time_per_question": 60, "questions": [...]}`

8. **Socket.IO / Webhook** - Listen for quiz completion
9. **AI Evaluator** - Evaluate quiz answers
10. **Email Node** - Send result to candidate

---

## 🐛 Known Issues & Future Improvements

### Current Limitations:
- Timer doesn't persist on page refresh (by design)
- No resume/pause functionality for quiz
- No partial save for answers (answers submitted per question)
- CV file not included in quiz evaluation (only text answers)

### Suggested Enhancements:
- Add quiz timeout for entire session (not just per question)
- Multiple choice questions support
- Image/file upload in answers
- Quiz scoring system in backend
- Email notifications at each step
- Admin dashboard to view quiz results
- Retry mechanism for failed API calls

---

## 🔗 Related Files

- Backend: `~/coding/web/job-recruitment-backend/`
  - `server.js` - Main server entry
  - `src/routes/quiz.js` - Quiz API routes
  - `src/routes/cv.js` - CV upload routes
  - `src/db/quiz.js` - Quiz database functions
  - `src/db/index.js` - Database schema

- Frontend: `~/coding/web/VTechDigital/`
  - `app/cv-processing/[cvId]/page.tsx` - Processing timeline
  - `app/quiz/[sessionId]/page.tsx` - Quiz interface
  - `components/career/application-form.tsx` - Application form
  - `app/api/applications/submit/route.ts` - API proxy

---

## 📊 Database Schema

### cv_uploads
```sql
id INTEGER PRIMARY KEY
fullName TEXT
email TEXT
phone TEXT
originalName TEXT
storedName TEXT
path TEXT
size INTEGER
mimetype TEXT
status INTEGER (legacy: 0=rejected, 1=approved)
cv_status TEXT ('checking', 'approved', 'rejected', 'quiz_ready', 'quiz_completed')
statusUpdatedAt TEXT
uploadedAt TEXT
deleted INTEGER DEFAULT 0
interview_status TEXT
interview_time TEXT
```

### quiz_sessions
```sql
id INTEGER PRIMARY KEY
cv_id INTEGER (FK → cv_uploads.id)
status TEXT ('pending', 'in_progress', 'completed')
total_questions INTEGER
time_per_question INTEGER (seconds)
started_at TEXT
completed_at TEXT
score REAL
created_at TEXT
```

### quiz_questions
```sql
id INTEGER PRIMARY KEY AUTOINCREMENT
session_id INTEGER (FK → quiz_sessions.id)
question_text TEXT
question_order INTEGER
answer TEXT (nullable)
submitted_at TEXT
time_taken INTEGER (seconds)
```

---

## ✅ Verification Checklist

Before going live:
- [ ] Backend server running on port 8080
- [ ] Frontend server running on port 3000
- [ ] Database file exists and is writable
- [ ] n8n workflow configured with correct endpoints
- [ ] Environment variables set (`NEXT_PUBLIC_BACKEND_URL`)
- [ ] CV upload directory has write permissions
- [ ] CORS configured for production domains
- [ ] Email service configured in n8n
- [ ] Error logging enabled
- [ ] Rate limiting configured for API endpoints
