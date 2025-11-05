# Intégration job_id dans le Système de Recrutement

## Résumé des Changements

Ce document décrit l'intégration du `job_id` dans le flux de candidature, permettant à n8n de créer des questions de quiz personnalisées basées à la fois sur le CV du candidat et les exigences du poste.

## Modifications Apportées

### 1. Base de Données (Backend)

#### Fichier: `/home/hungtran/coding/web/job-recruitment-backend/src/db/index.js`
- **Ajout**: Nouvelle colonne `job_id INTEGER` dans la table `cv_uploads`
- **Migration**: Ajout automatique lors du démarrage du serveur

```sql
ALTER TABLE cv_uploads ADD COLUMN job_id INTEGER;
```

#### Fichier: `/home/hungtran/coding/web/job-recruitment-backend/src/db/cv.js`
- **Modification**: `cvInsert()` - Accepte maintenant `job_id` comme paramètre
- **Modification**: `cvList()` - Retourne `job_id` dans les résultats
- **Modification**: `cvUpdateStatus()` - Préserve `job_id` dans les retours

### 2. Backend API

#### Fichier: `/home/hungtran/coding/web/job-recruitment-backend/src/routes/cv.js`
- **Modification**: Endpoint `POST /api/upload-cv`
  - Accepte `jobId` dans `req.body`
  - Stocke `job_id` dans la base de données
  - Envoie `job_id` au webhook n8n

**Changement du payload webhook**:
```javascript
// Avant
const payload = { id, name, email, phone, cv_path };

// Après
const payload = { id, name, email, phone, cv_path, job_id };
```

### 3. Frontend

#### Fichier: `/home/hungtran/coding/web/VTechDigital/components/career/application-form.tsx`
- **Modification**: Ajout de `jobId` au FormData lors de la soumission du CV
- Le composant reçoit déjà `jobId` en tant que prop

```typescript
formDataToSend.append("jobId", jobId);
```

#### Fichier: `/home/hungtran/coding/web/VTechDigital/app/api/applications/submit/route.ts`
- **Aucune modification nécessaire**: Le FormData contenant `jobId` est automatiquement transféré au backend

### 4. API Existante

#### Endpoint: `GET /api/jobs/:id`
- **Status**: ✅ Déjà implémenté dans le backend
- **Fichier**: `/home/hungtran/coding/web/job-recruitment-backend/src/routes/jobs.js`
- **Usage**: n8n peut utiliser cette API pour récupérer les détails du poste

## Flux Complet

```
1. Utilisateur soumet le formulaire
   ├─ jobId (depuis la page /career/[id])
   ├─ CV file
   └─ Informations personnelles

2. Frontend → Next.js API → Backend
   POST /api/upload-cv
   FormData: { fullName, email, phone, cvFile, jobId }

3. Backend enregistre dans la DB
   cv_uploads: { id, fullName, email, phone, ..., job_id }

4. Backend → Webhook n8n
   POST {webhook_url}
   Payload: { id, name, email, phone, cv_path, job_id }

5. n8n reçoit le webhook
   ├─ Récupère les détails du job: GET /api/jobs/{job_id}
   ├─ Télécharge le CV: GET /uploads/{cv_path}
   └─ Analyse CV vs. exigences du poste

6. n8n → Backend: Approuve ou rejette
   POST /api/cv/:id/status { cv_status: "approved" }

7. n8n génère des questions basées sur:
   ├─ Compétences du candidat (CV)
   └─ Exigences du poste (job details)

8. n8n → Backend: Crée le quiz
   POST /api/quiz/create { cv_id, questions, time_per_question }
```

## Exemple de Workflow n8n

### Node 1: Webhook Trigger
```json
Reçoit: {
  "id": 1234567890,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+84 123 456 789",
  "cv_path": "cv_1234567890.pdf",
  "job_id": 123
}
```

### Node 2: HTTP Request - Get Job Details
```
Method: GET
URL: http://localhost:8080/api/jobs/{{ $json.job_id }}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": 123,
    "job_title": "Backend Developer",
    "requirements": "Node.js, Go, PostgreSQL, Docker...",
    "description": "We are looking for...",
    ...
  }
}
```

### Node 3: HTTP Request - Download CV
```
Method: GET
URL: http://localhost:8080/uploads/{{ $json.cv_path }}
```

### Node 4: AI Node - Analyze CV
```
Prompt:
"Analyze this CV against the following job requirements:
Job: {{ $('Get Job Details').json.data.job_title }}
Requirements: {{ $('Get Job Details').json.data.requirements }}

CV Content: [parsed CV text]

Determine if the candidate meets the requirements."
```

### Node 5: IF Node - Decision
```
Condition: {{ $json.meets_requirements }} === true
```

### Node 6a: HTTP Request - Approve CV
```
Method: POST
URL: http://localhost:8080/api/cv/{{ $('Webhook').json.id }}/status
Body: { "cv_status": "approved" }
```

### Node 7: AI Node - Generate Questions
```
Prompt:
"Generate 3 technical questions based on:
1. Candidate's CV: [CV summary]
2. Job requirements: {{ $('Get Job Details').json.data.requirements }}

The questions should:
- Test specific skills mentioned in the CV
- Relate to the job requirements
- Be answerable in 60 seconds each"
```

### Node 8: HTTP Request - Create Quiz
```
Method: POST
URL: http://localhost:8080/api/quiz/create
Body: {
  "cv_id": {{ $('Webhook').json.id }},
  "time_per_question": 60,
  "questions": {{ $json.questions }}
}
```

## Test du Système

### 1. Démarrer les serveurs

```bash
# Backend
cd ~/coding/web/job-recruitment-backend
npm run dev

# Frontend
cd ~/coding/web/VTechDigital
pnpm dev
```

### 2. Tester l'upload avec job_id

```bash
# Créer un job d'abord
curl -X POST http://localhost:8080/api/submit-job \
  -H "Content-Type: application/json" \
  -d '{
    "job_title": "Backend Developer",
    "company": "VTech",
    "location": "Hanoi",
    "salary": "$2000-$3000",
    "requirements": "Node.js, Go, PostgreSQL",
    "contact_email": "hr@vtech.com",
    "link_apply": "https://vtech.com/apply"
  }'

# Récupérer le job_id depuis la réponse
```

### 3. Soumettre une candidature

1. Aller sur `http://localhost:3000/career/{job_id}`
2. Remplir le formulaire
3. Upload un CV
4. Soumettre

### 4. Vérifier le webhook n8n

Le payload devrait contenir:
```json
{
  "id": 1730296538000,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+84 123 456 789",
  "cv_path": "cv_1730296538000.pdf",
  "job_id": 123
}
```

### 5. Vérifier dans la DB

```bash
cd ~/coding/web/job-recruitment-backend
sqlite3 data.sqlite "SELECT id, fullName, email, job_id FROM cv_uploads WHERE deleted = 0 ORDER BY id DESC LIMIT 5;"
```

## Points à Noter

1. **job_id peut être null**: Si un candidat soumet un CV sans sélectionner de poste spécifique, `job_id` sera `null`
2. **Compatibilité arrière**: Les CV existants sans `job_id` continueront de fonctionner
3. **API jobs existe déjà**: Pas besoin de créer une nouvelle API, `GET /api/jobs/:id` est déjà disponible
4. **Migration automatique**: La colonne `job_id` sera ajoutée automatiquement au démarrage du backend

## APIs Disponibles

### Backend (http://localhost:8080)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload-cv` | POST | Upload CV avec job_id |
| `/api/jobs/:id` | GET | Récupérer détails d'un job |
| `/api/cv/:id/status` | POST | Mettre à jour statut du CV |
| `/api/quiz/create` | POST | Créer un quiz |
| `/uploads/:filename` | GET | Télécharger le CV |

### Frontend (http://localhost:3000)

| Page | Description |
|------|-------------|
| `/career/:id` | Page de candidature avec jobId |
| `/cv-processing/:cvId` | Page de suivi du traitement |
| `/quiz/:sessionId` | Page de quiz |

## Prochaines Étapes

1. ✅ Intégration du job_id dans le système
2. ✅ Documentation complète
3. ⏳ Configuration du workflow n8n
4. ⏳ Tests end-to-end
5. ⏳ Déploiement en production

## Support

Pour toute question:
- Documentation API: `API_DOCUMENTATION.md`
- Résumé d'implémentation: `IMPLEMENTATION_SUMMARY.md`
- Ce document: `JOB_ID_INTEGRATION.md`
