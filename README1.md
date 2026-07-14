# HireFlow — Staffing Agency Recruitment Management System

**Module:** Programming for Information Systems (B9IS123)
**Student:** Chinmay S Pai
**Student ID:** 20102062
**Institution:** Dublin Business School
**Programme:** MSc in Information Systems

---

## Table of Contents

- [Project Overview](#project-overview)
- [The Problem It Solves](#the-problem-it-solves)
- [The Solution](#the-solution)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Git Workflow](#git-workflow)
- [Key Design Decisions](#key-design-decisions)
- [Roadmap](#roadmap)

---

## Project Overview

HireFlow is a web based Information System application developed for small staffing agency HireFlow Recruitment Ltd.

Smaller staffing agencies usually handle candidates, job roles, and assignments in spreadsheets or on paper. HireFlow takes an individuality approach of fully centralising that, effectively reducing it to a single web application for recruiters to manage the entire end to end hiring lifecycle from intake through until placement.

## The Problem It Solves

- No one central system in place to track the candidate progress.
- Challenge in searching and filtering candidates based on role and stage.
- No auto notify candidates for a Placement Confirmed.
- Manually matching candidates for job roles is an effort complicated with errors.

## The Solution

A full stack web application including:

- A React frontend with a neat, responsive recruiter UI.
- Flask REST API as backend which is used to handle all the business logic.
- Reading data layers + Storage of JSON files.

---

## Tech Stack

| Layer           | Technology             | Reason                                      |
| --------------- | ---------------------- | ------------------------------------------- |
| Frontend        | React (JavaScript)     | Component based, fast, industry standard    |
| Build Tool      | Vite                   | Fast dev server and build tooling for React |
| Backend         | Flask (Python)         | Lightweight REST API, brief recommended     |
| Storage         | JSON files             | Brief approved, zero setup, human readable  |
| HTTP Client     | Axios                  | Cleaner API calls than raw fetch()          |
| Icons           | Lucide React (0.383.0) | Icon library for UI elements                |
| Version Control | GitHub                 | Brief requirement, feature branch workflow  |

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
        │   └── Toast.jsx       ← Notifications
        └── pages/
            ├── Dashboard.jsx   ← Stats overview and pipeline
            ├── Candidates.jsx  ← Candidate management
            ├── JobRoles.jsx    ← Job role management
            ├── Departments.jsx ← Department management
            └── Placements.jsx  ← Placement records
```

---

## Getting Started

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

| Method | Endpoint                       | Description            |
| ------ | ------------------------------ | ---------------------- |
| GET    | `/api/candidates`              | Get all candidates     |
| GET    | `/api/candidates?status=hired` | Filter by status       |
| GET    | `/api/candidates?search=chin`  | Search by name or role |
| GET    | `/api/candidates/:id`          | Get single candidate   |
| POST   | `/api/candidates`              | Add new candidate      |
| PUT    | `/api/candidates/:id`          | Update candidate       |
| DELETE | `/api/candidates/:id`          | Delete candidate       |

### Job Roles

| Method | Endpoint                        | Description       |
| ------ | ------------------------------- | ----------------- |
| GET    | `/api/jobroles`                 | Get all job roles |
| GET    | `/api/jobroles?search=engineer` | Search roles      |
| POST   | `/api/jobroles`                 | Add new job role  |
| PUT    | `/api/jobroles/:id`             | Update job role   |
| DELETE | `/api/jobroles/:id`             | Delete job role   |

### Departments

| Method | Endpoint               | Description         |
| ------ | ---------------------- | ------------------- |
| GET    | `/api/departments`     | Get all departments |
| POST   | `/api/departments`     | Add department      |
| PUT    | `/api/departments/:id` | Update department   |
| DELETE | `/api/departments/:id` | Delete department   |

### Placements

| Method | Endpoint              | Description          |
| ------ | --------------------- | -------------------- |
| GET    | `/api/placements`     | Get all placements   |
| POST   | `/api/placements`     | Record new placement |
| PUT    | `/api/placements/:id` | Update placement     |
| DELETE | `/api/placements/:id` | Delete placement     |

---

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

All work was developed on individual feature branches and merged into `dev` once complete. Only stable, tested code was merged into `main`.

---

## Key Design Decisions

**Why JSON over SQLite?**
However, the project brief clearly states that you are allowed to save your data in JSON files. They're easier to set up, human readable, simpler to debug and more suitable for a small dataset in proof of concept system than a complete relational database.

**Why React over plain JavaScript?**
React fulfills the JavaScript requirement of the brief and is a component based framework that helps in building maintainable and scalable UI. It is also mentioned in the brief as a suitable framework.

**Why Axios over `fetch()`?**
Axios makes HTTP requests a bit easier and also automatically parses JSON responses, so error handling with.catch is simplified, but the single base URL does not have to be rewritten for every API call.

**Why Flask?**
The short also suggests using Flask. This is a no frills microframework that comes with bare minimum routing and handler for the requests which is perfect fit for REST API POC.

---
