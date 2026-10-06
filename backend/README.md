# Portfolio API

Node.js/Express API for the existing React portfolio. Project data is read-only; contact submissions are stored in MongoDB. No email is sent.

## Setup

Use Node.js 20.19+ and npm. From `kevs-portfolio/backend`, run `npm install`, copy `.env.example` to `.env`, and set:

```env
PORT=5000
MONGODB_URI=your_real_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
```

`MONGODB_URI` is a private MongoDB connection URI. Replace the example value with a real URI from your own MongoDB deployment. Never put it in a `VITE_` variable or commit `.env`. Change `CORS_ORIGIN` to the exact URL serving the frontend in production. If you use `http://127.0.0.1:5173` locally rather than `http://localhost:5173`, set that exact origin instead.

Start development with `npm run dev` (nodemon) or production with `npm start` (node). The API defaults to port 5000.
Run `npm test` for HTTP contract and model-validation checks. The success-path HTTP tests mock MongoDB operations; they do not replace a live database check.

In `kevs-portfolio/frontend`, set `VITE_API_URL=http://localhost:5000/api` in its own `.env` when needed and restart Vite. This contains only the public API URL, never MongoDB credentials. The API service already uses this URL as its local-development default.

## Endpoints

| Method | Path | Behavior |
| --- | --- | --- |
| GET | `/api/health` | Reports API and database states; HTTP 200 when connected, 503 when database is unavailable |
| GET | `/api/projects` | Returns stored projects in `{ "success": true, "data": [...] }` |
| GET | `/api/projects/:id` | Finds a project by MongoDB ID or slug |
| POST | `/api/contact` | Validates and stores `{ "name", "email", "message" }`; returns 201 |

There are deliberately no public project write endpoints and no automatic seed data. The existing project cards still use `frontend/src/data/portfolio.js`; `frontend/src/services/api.js` provides `getProjects()` for a future switch after real project records have been added. The contact form uses `POST /api/contact` now. A successful contact response means the message was stored, not emailed.

The server logs a clear MongoDB configuration/connection error if the database is unavailable. `/api/health` reports `api: "available"` and `database: "connected"` or `"disconnected"`; it returns 503 while disconnected. Database endpoints also return 503. Restart the backend after adding or changing `.env`.

## Quick checks

```powershell
Invoke-RestMethod http://localhost:5000/api/health
Invoke-RestMethod http://localhost:5000/api/projects
Invoke-RestMethod -Method Post -Uri http://localhost:5000/api/contact -ContentType application/json -Body '{"name":"Example Visitor","email":"visitor@example.com","message":"Hello, I would like to discuss a project."}'
```

With no MongoDB URI, the health check should return 503 with `api: "available"` and `database: "disconnected"`; valid database requests also return 503, and malformed contact requests return 400. With a working MongoDB connection, health returns 200, the project list is initially empty, and valid contact submissions return 201 and create a `ContactMessage` document.
