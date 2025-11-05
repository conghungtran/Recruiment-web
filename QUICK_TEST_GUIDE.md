# Guide de Test Rapide - Intégration job_id

## Prérequis

1. Backend en cours d'exécution sur port 8080
2. Frontend en cours d'exécution sur port 3000
3. Un job existant dans la base de données

## Étape 1: Démarrer les serveurs

```bash
# Terminal 1 - Backend
cd ~/coding/web/job-recruitment-backend
npm run dev

# Terminal 2 - Frontend
cd ~/coding/web/VTechDigital
pnpm dev
```

## Étape 2: Vérifier la migration de la base de données

```bash
cd ~/coding/web/job-recruitment-backend
sqlite3 data.sqlite "PRAGMA table_info(cv_uploads);"
```

**Vérifier que la colonne `job_id` existe dans la sortie.**

## Étape 3: Créer un job de test (si nécessaire)

```bash
curl -X POST http://localhost:8080/api/submit-job \
  -H "Content-Type: application/json" \
  -d '{
    "job_title": "Backend Developer",
    "company": "VTech",
    "location": "Hanoi",
    "salary": "$2000-$3000",
    "job_type": "Full-time",
    "description": "We are looking for a talented backend developer",
    "requirements": "Node.js, Go, PostgreSQL, Docker, Kubernetes",
    "benefits": "Health insurance, flexible hours, remote work",
    "contact_email": "hr@vtech.com",
    "deadline": "2025-12-31",
    "experience": "2+ years",
    "working_hours": "9AM-6PM",
    "link_apply": "https://vtech.com/apply"
  }'
```

**Notez le `job_id` retourné dans la réponse.**

## Étape 4: Vérifier l'API GET /api/jobs/:id

```bash
# Remplacer {job_id} par l'ID du job créé
curl http://localhost:8080/api/jobs/{job_id}
```

**Attendu**: Un JSON avec les détails du job
```json
{
  "success": true,
  "data": {
    "id": 123,
    "job_title": "Backend Developer",
    "requirements": "Node.js, Go, PostgreSQL...",
    ...
  }
}
```

## Étape 5: Tester la soumission du CV via l'interface

1. Ouvrir le navigateur: `http://localhost:3000/career/{job_id}`
2. Remplir le formulaire:
   - Nom complet
   - Email
   - Téléphone
   - Upload un fichier PDF de test
   - Cover letter
3. Cliquer sur "Submit Application"
4. Devrait rediriger vers `/cv-processing/{cvId}`

## Étape 6: Vérifier dans la base de données

```bash
cd ~/coding/web/job-recruitment-backend
sqlite3 data.sqlite "SELECT id, fullName, email, job_id FROM cv_uploads ORDER BY id DESC LIMIT 1;"
```

**Attendu**: La dernière entrée devrait avoir un `job_id` correspondant au job

Exemple de sortie:
```
1730296538000|John Doe|john@example.com|123
```

## Étape 7: Simuler le webhook n8n (optionnel)

Si vous voulez vérifier ce qui est envoyé à n8n, vous pouvez utiliser un service de webhook test comme webhook.site:

1. Aller sur https://webhook.site
2. Copier votre URL unique
3. Mettre à jour le fichier `.env` du backend:
   ```bash
   cd ~/coding/web/job-recruitment-backend
   nano .env
   ```
4. Ajouter/modifier:
   ```
   CV_N8N_WEBHOOK_URL=https://webhook.site/votre-id-unique
   ```
5. Redémarrer le backend
6. Soumettre un nouveau CV
7. Vérifier sur webhook.site le payload reçu

**Payload attendu**:
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

## Étape 8: Test complet du flux avec n8n

### 8.1: Configurer n8n pour tester

Dans n8n, créer un workflow simple:

**Node 1: Webhook**
- Method: POST
- Path: /cv-upload

**Node 2: HTTP Request - Get Job**
- Method: GET
- URL: `http://localhost:8080/api/jobs/{{ $json.job_id }}`

**Node 3: Set Node**
- Afficher le CV ID et le Job Title

**Node 4: HTTP Request - Approve CV**
- Method: POST
- URL: `http://localhost:8080/api/cv/{{ $('Webhook').json.id }}/status`
- Body: `{ "cv_status": "approved" }`

### 8.2: Mettre à jour le backend avec l'URL du webhook n8n

```bash
cd ~/coding/web/job-recruitment-backend
nano .env
```

Ajouter:
```
CV_N8N_WEBHOOK_URL=http://localhost:5678/webhook/cv-upload
```

### 8.3: Tester le flux complet

1. Soumettre un CV via l'interface frontend
2. Vérifier dans n8n que le workflow est déclenché
3. Vérifier que job_id est présent dans le payload
4. Vérifier que le Node 2 récupère correctement les détails du job
5. Vérifier que le CV status est mis à jour à "approved"

## Checklist de Validation

- [ ] Backend démarre sans erreur
- [ ] Frontend démarre sans erreur
- [ ] Colonne `job_id` existe dans la table `cv_uploads`
- [ ] API `GET /api/jobs/:id` retourne les détails du job
- [ ] Le formulaire de candidature inclut le jobId
- [ ] Le CV est enregistré avec le bon job_id dans la DB
- [ ] Le webhook n8n reçoit le payload avec job_id
- [ ] n8n peut récupérer les détails du job via l'API
- [ ] Le flux complet fonctionne (Upload → Webhook → Get Job → Approve)

## Dépannage

### Erreur: "Column job_id doesn't exist"

**Solution**: Redémarrer le backend pour exécuter les migrations:
```bash
cd ~/coding/web/job-recruitment-backend
npm run dev
```

### jobId est undefined dans le formulaire

**Vérification**: 
```bash
# Vérifier que la page career utilise bien [id] dans le path
ls -la ~/coding/web/VTechDigital/app/career/
```

**Solution**: S'assurer que le jobId est bien passé au composant ApplicationForm.

### Le webhook n8n ne reçoit pas job_id

**Vérification**:
```bash
# Vérifier les logs du backend
cd ~/coding/web/job-recruitment-backend
# Regarder la sortie console pour voir le payload envoyé
```

**Solution**: S'assurer que le backend a bien été redémarré après les modifications.

### GET /api/jobs/:id retourne 404

**Vérification**:
```bash
cd ~/coding/web/job-recruitment-backend
sqlite3 data.sqlite "SELECT id, job_title FROM jobs LIMIT 5;"
```

**Solution**: Créer un job de test avec la commande curl de l'étape 3.

## Commandes Utiles

```bash
# Voir tous les CV avec leur job_id
sqlite3 ~/coding/web/job-recruitment-backend/data.sqlite "SELECT id, fullName, email, job_id FROM cv_uploads WHERE deleted = 0;"

# Voir tous les jobs
sqlite3 ~/coding/web/job-recruitment-backend/data.sqlite "SELECT id, job_title, company FROM jobs;"

# Supprimer les données de test
sqlite3 ~/coding/web/job-recruitment-backend/data.sqlite "DELETE FROM cv_uploads WHERE email LIKE '%test%';"

# Vérifier le schéma de cv_uploads
sqlite3 ~/coding/web/job-recruitment-backend/data.sqlite ".schema cv_uploads"
```

## Résultat Attendu

Si tout fonctionne correctement:
1. ✅ Un CV soumis via `/career/{job_id}` contient le job_id dans la DB
2. ✅ Le webhook n8n reçoit le job_id dans le payload
3. ✅ n8n peut récupérer les détails du job via `GET /api/jobs/{job_id}`
4. ✅ n8n peut créer des questions personnalisées basées sur le CV et le job

## Support

Pour plus d'informations:
- **Documentation complète**: `JOB_ID_INTEGRATION.md`
- **API Reference**: `API_DOCUMENTATION.md`
- **Implementation Summary**: `IMPLEMENTATION_SUMMARY.md`
