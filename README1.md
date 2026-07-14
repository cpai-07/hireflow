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
| GET    | `/api/candidates?search=john`  | Search by name or role |
| GET    | `/api/candidates/:id`          | Get single candidate   |
| POST   | `/api/candidates`              | Add new candidate      |
| PUT    | `/api/candidates/:id`          | Update candidate       |
| DELETE | `/api/candidates/:id`          | Delete candidate       |
