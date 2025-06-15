# Java Course Platform – Simplified (No Auth)

**Stack**

* Backend: Spring Boot 3.2 + PostgreSQL
* Frontend: React 18 + Bootstrap 5 + Monaco Editor
* Code Execution: JDoodle REST API


## Quick‑start

### 1 – Database

* Ensure PostgreSQL is running on **localhost:5432**
* Create DB:

postgresql
CREATE DATABASE javacoursedb;


### 2 – Backend


cd backend
mvn spring-boot:run


Runs on **http://localhost:8080**

### 3 – Frontend

```bash
cd frontend
npm install
npm start


Opens **http://localhost:3000**


## How it works

| Role | What they can do |
|------|------------------|
| **Admin** | Click **“Login as Admin”**, then:<br>- Add lessons with rich HTML (links, images, GIFs)<br>- Add practice problems, starter code & multiple expected outputs |
| **Student** | Click **“Login as Student”**, then:<br>- Browse lessons, progress auto‑saved in DB (simplified in this draft)<br>- Write & run Java code in browser; JDoodle compiles & runs<br>- Output is matched against **any** expected output added by admin; success shows a green popup |

No security yet; I will add it later  add real auth later.

Enjoy tinkering!
