# HireFlow:Staffing Agency Recruitment Management System

**Module:** Programming for Information Systems  
**Student:** Chinmay S Pai  
**Student ID:** 20102062  
**Institution:** Dublin Business School  
**Programme:** MSc in Information Systems

---

## Project Overview

HireFlow is a web based Information System that has been created for a small staffing agency called HireFlow Recruitment Ltd.

For small staffing firms, the candidates, job roles, and placements are typically coordinated on a spreadsheet or using paper based systems. HireFlow does this by replacing it with a single centralised Web application that empowers recruiters to handle the entire hiring process from application to successful placement.

### The Problem It Solves

- No central system to track candidate progress
- Search and filter by role and status is difficult.
- No automatic communication on hire date to candidate.
- There is a manual matching effort between candidates and job roles.

### The Solution

A complete web application with:

- This is a React front end to a clean, responsive recruiter interface.
- All business logic handled with a Flask REST API backend.
- Implementing JSON file storage as data layer.

---

## Tech Stack

| Layer           | Technology         | Reason                                     |
| --------------- | ------------------ | ------------------------------------------ |
| Frontend        | React (JavaScript) | Component-based, fast, industry standard   |
| Backend         | Flask (Python)     | Lightweight REST API, brief-recommended    |
| Storage         | JSON files         | Brief-approved, zero setup, human-readable |
| HTTP Client     | Axios              | Cleaner API calls than raw fetch()         |
| Version Control | GitHub             | Brief requirement, feature-branch workflow |
| Lucide React    | 0.383.0            | Icon library for UI elements               |

---

## Project Structure

```
hireflow/
├── backend/
│   ├── app.py                  ← Flask REST API — all routes
│   ├── requirements.txt        ← Python dependencies
│   └── data/
│       ├── candidates.json     ← Candidate records
│       ├── jobroles.json       ← Job role records
│       ├── departments.json    ← Department records
│       └── placements.json     ← Placement records
│
└── frontend/
    ├── index.html              ← HTML entry point
    ├── vite.config.js          ← Vite configuration
    ├── package.json            ← Node dependencies
    └── src/
        ├── main.jsx            ← React app entry point
        ├── App.jsx             ← Root component, page state
        ├── index.css           ← Global styles and CSS variables
        ├── api/
        │   └── api.js          ← Axios API service layer
        ├── components/
        │   ├── Sidebar.jsx     ← Navigation sidebar
        │   └── Toast.jsx       ← Auto-dismiss notifications
        └── pages/
            ├── Dashboard.jsx   ← Stats overview and pipeline
            ├── Candidates.jsx  ← Candidate management
            ├── JobRoles.jsx    ← Job role management
            ├── Departments.jsx ← Department management
            └── Placements.jsx  ← Placement records
```

---

## How to Run the Project

### Prerequisites

- Python 3.10+
- Node.js 18+
- npm

### Step 1 — Clone the Repository

```bash
git clone https://github.com/cpai-07/hireflow.git
cd hireflow
```

### Step 2 — Start the Backend (Flask)

```bash
cd backend
pip3 install -r requirements.txt
python3 app.py
```

Flask will start on **http://localhost:5000**

### Step 3 — Start the Frontend (React)

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

React will start on **http://localhost:5173**

Open your browser at **http://localhost:5173** to use HireFlow.

---

## API Endpoints

### Candidates

| Method | Endpoint                     | Description            |
| ------ | ---------------------------- | ---------------------- |
| GET    | /api/candidates              | Get all candidates     |
| GET    | /api/candidates?status=hired | Filter by status       |
| GET    | /api/candidates?search=john  | Search by name or role |
| GET    | /api/candidates/:id          | Get single candidate   |
| POST   | /api/candidates              | Add new candidate      |
| PUT    | /api/candidates/:id          | Update candidate       |
| DELETE | /api/candidates/:id          | Delete candidate       |

### Job Roles

| Method | Endpoint                      | Description       |
| ------ | ----------------------------- | ----------------- |
| GET    | /api/jobroles                 | Get all job roles |
| GET    | /api/jobroles?search=engineer | Search roles      |
| POST   | /api/jobroles                 | Add new job role  |
| PUT    | /api/jobroles/:id             | Update job role   |
| DELETE | /api/jobroles/:id             | Delete job role   |

### Departments

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| GET    | /api/departments     | Get all departments |
| POST   | /api/departments     | Add department      |
| PUT    | /api/departments/:id | Update department   |
| DELETE | /api/departments/:id | Delete department   |

### Placements

| Method | Endpoint            | Description          |
| ------ | ------------------- | -------------------- |
| GET    | /api/placements     | Get all placements   |
| POST   | /api/placements     | Record new placement |
| PUT    | /api/placements/:id | Update placement     |
| DELETE | /api/placements/:id | Delete placement     |

## Git Workflow

This project follows a feature-branch workflow:

```
main          ← stable, working code only
└── dev       ← integration branch
    ├── feature/frontend-setup
    ├── feature/components
    ├── feature/api-layer
    ├── feature/dashboard
    ├── feature/candidates
    ├── feature/jobroles
    ├── feature/departments
    ├── feature/placements
    ├── feature/backend-setup
    ├── feature/backend-routes
    ├── feature/data-setup
```

Everything was developed on separate feature branches then merged to the dev branch when ready. Only stable and tested code was added to `main`.

---

## Key Design Decisions

**Why JSON over SQLite?**  
The project brief explicitly states that JSON files can be used as a storage option. JSON files are simpler to set up, human readable, easier to debug, and for a small dataset a proof of concept is preferable to a relational database.

**Why React over plain JavaScript?**  
React is a JavaScript library, it meets the brief's requirement for JavaScript. It offers a component based structure which facilitates easier UI maintenance and scalability, and is explicitly stated as an appropriate library/framework in the shortlisted.

**Why Axios over fetch()?**  
With Axios, making HTTP requests is a breeze it automatically parses JSON responses, cleans up the error handling and lets you set one base URL and use it for every API call.

**Why Flask?**  
The flask python backend is explicitly recommended in the short. It is a micro framework that supports routing and handling of requests without unnecessary overhead, perfect for a REST API proof of concept.
