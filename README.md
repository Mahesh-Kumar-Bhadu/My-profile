# Mahesh Kumar - Personal Portfolio (Full-Stack)

Frontend: HTML, CSS, JavaScript (no framework) | Backend: Node.js + Express | Database: MongoDB

## Folder structure (layered / MVC)
```
config/       env + database connection
models/       Mongoose schemas (Profile, Project, Skill, EditWork, Contact)
controllers/  request handling (portfolio data, contact form)
routes/       REST API routes
middleware/   validation, rate limits, error handling
services/     email sending (Nodemailer)
seed/         your content (data.js) + script to load it into MongoDB
public/       the website (index.html, css, js, images)
```

## Run it on your computer
1. Install Node.js 18+ and MongoDB (or make a free MongoDB Atlas database).
2. `npm install`
3. Copy `.env.example` to `.env` and fill it in.
4. Edit `seed/data.js` with your real details (look for CHANGE ME).
5. Put your photo at `public/images/profile.jpg`.
6. `npm run seed` (loads your content into MongoDB)
7. `npm run dev` then open http://localhost:3000

Change content later: edit `seed/data.js`, run `npm run seed` again.

## REST API
| Method | Endpoint | What it does |
|---|---|---|
| GET | /api/health | Health check |
| GET | /api/profile | Profile, about, education, links |
| GET | /api/projects | Projects (`?featured=true` for featured only) |
| GET | /api/skills | Skills |
| GET | /api/edits | Video editing work |
| POST | /api/contact | Validate, save to MongoDB, email you |

## Email setup (Gmail)
Turn on 2-step verification, create an App Password (Google Account > Security), then set `SMTP_USER`, `SMTP_PASS` (the app password) and `MAIL_TO` in `.env`. If email is not set up, messages are still saved in the `contacts` collection.

## Security included
Helmet headers + CSP, CORS allow-list, rate limiting (stricter on contact), body size limit, server-side validation and escaping (express-validator), hidden honeypot field against bots, secrets only in environment variables.

## Deploy (Render, free)
1. Create a free MongoDB Atlas cluster and copy the connection string (allow access from anywhere, 0.0.0.0/0).
2. Push this folder to a GitHub repo (`.env` is git-ignored).
3. On render.com: New > Blueprint, pick the repo (`render.yaml` is included).
4. Set the env vars: `MONGODB_URI`, `CORS_ORIGIN` (your Render URL), `SMTP_USER`, `SMTP_PASS`, `MAIL_TO`.
5. Once live, run the seed once: set `MONGODB_URI` locally to the Atlas string and run `npm run seed`.

Docker also works: `docker build -t portfolio . && docker run -p 3000:3000 --env-file .env portfolio`
