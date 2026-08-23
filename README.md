<img width="1644" height="1136" alt="ARCHITECTURE" src="https://github.com/user-attachments/assets/4ea3deef-c1ef-40c8-a3fa-b3d723597580" />

# Nyaya Sathi — AI-Powered Legal Assistance Platform

> “Justice becomes accessible when understanding becomes simpler.”

## Overview

Nyaya Sathi is an AI-powered legal assistance and case guidance platform designed to simplify legal processes for ordinary citizens.

The platform bridges the gap between complex legal systems and public understanding by offering:

- AI-generated legal explanations
- FIR drafting assistance
- Smart document analysis
- Court reminder automation
- Case progress tracking
- Multilingual legal support

The system is built as a full-stack MERN application with AI integrations using HuggingFace and Gemini APIs.

---

## Core Problem Solved

Many citizens:

- Do not understand legal procedures
- Struggle with FIR filing
- Miss court deadlines
- Cannot interpret legal documents
- Face language barriers
- Lack affordable legal guidance

Nyaya Sathi simplifies these challenges using AI-powered automation and legal assistance tools.

---

## Key Features

### Secure Authentication System

- User Signup/Login
- JWT Authentication
- bcrypt password hashing
- Google OAuth Login
- Protected Routes
- Role-based Authentication

### User Roles

1. Citizen
2. Lawyer

Each role receives a separate dashboard after login.

---

## Citizen Dashboard

The Citizen Dashboard acts as the central legal workspace.

### Features

- View legal documents
- Track case progress
- Access AI legal explanations
- Manage reminders
- Upload court documents
- Generate FIR drafts
- View AI-generated legal insights

---

## Lawyer Dashboard

(Currently MVP Placeholder)

### Future Scope

- Case management
- Lawyer-client communication
- Legal consultation handling
- Appointment scheduling

---

## AI Legal Explanation Engine

### Uses

- HuggingFace

### Purpose

- Converts complex legal text into simple language
- Explains citizen rights
- Simplifies legal procedures
- Helps users understand legal notices/documents

---

## FIR Assistance Module

### FIR Draft Generator

Users describe incidents in normal language.

### Example

> “Someone hit me near the market.”

The AI system:

- Understands the incident
- Converts it into legal terminology
- Generates a professional FIR draft
- Structures the complaint properly

Powered by:

- HuggingFace

---

### FIR Complaint Email Generator

If police refuse to register an FIR:

Users can:

- Generate formal complaint emails
- Escalate complaints to higher authorities
- Auto-create professional legal email drafts

---

## Smart Case & Document Management

Users can upload:

- PDFs
- Court notices
- Images
- Legal documents

### Features

- Document organization
- Case storage
- Metadata tracking
- AI document processing

---

## AI Document Insights

Powered by:

- Gemini API

The uploaded documents are analyzed to generate:

- Legal summaries
- Important points
- Key deadlines
- Suggested next actions
- Simplified explanations

This feature helps users quickly understand complicated legal paperwork.

---

## Smart Reminder System

Nyaya Sathi supports two reminder methods.

### 1. Manual Reminder Creation

Users manually add:

- Court dates
- Hearing schedules
- Submission deadlines

### 2. AI-Based Reminder Extraction

Powered by:

- Gemini API

The system:

- Reads uploaded legal documents
- Detects hearing dates and deadlines
- Automatically creates reminder events
- Sends email notifications

---

## Case Progress Tracker

Users can manually update legal case stages.

### Example Stages

- FIR Filed
- Evidence Submitted
- Evidence Admitted
- Hearing Scheduled
- Case Closed

The system dynamically updates a visual progress tracker.

---

## Multilingual Legal Assistance

### Supports

- Regional language translation
- Simplified communication for non-English speakers

### Purpose

- Increase legal accessibility
- Reduce language barriers

---

## Notification System

### Uses

- Nodemailer

### Features

- Court date reminders
- Deadline alerts
- Important legal notifications

---

## System Architecture

### Frontend

- React.js

### Responsibilities

- UI rendering
- Dashboard management
- Protected routes
- User interactions
- File uploads

---

### Backend

- Node.js
- Express.js

### Responsibilities

- Authentication
- API management
- AI orchestration
- Document handling
- Reminder logic
- Case tracking

---

### Database

- MongoDB
- Dockerized local deployment

### Stores

- User data
- Case metadata
- Uploaded document references
- Reminder information
- Progress tracking

---

## AI Services

### HuggingFace

Used for:

- Legal explanation generation
- FIR draft generation
- Complaint drafting

### Benefits

- Local AI processing
- Faster inference
- Better privacy

---

### Gemini API

Used for:

- Document analysis
- AI insights
- Reminder extraction
- Deadline identification
- Smart legal summarization

---

## Authentication Flow

```text
User → Login/Signup → JWT Authentication
      → Role Verification
      → Citizen/Lawyer Dashboard
```

Google OAuth is also supported.

---

## Document Processing Flow

```text
User Uploads Document
        ↓
Backend Document Service
        ↓
Gemini AI Analysis
        ↓
Generate:
- Insights
- Deadlines
- Summaries
- Actions
        ↓
Store Metadata in MongoDB
```

---

## Reminder Extraction Flow

```text
Uploaded Court Document
        ↓
Gemini API
        ↓
Extract Hearing Dates
        ↓
Create Reminder Event
        ↓
Email Notification System
```

---

## Case Tracking Flow

```text
User Updates Case Stage
        ↓
Backend Progress Service
        ↓
MongoDB Updates
        ↓
Dashboard Progress Bar Updates
```

---

## Tech Stack

| Layer             | Technology           |
| ----------------- | -------------------- |
| Frontend          | React.js             |
| Backend           | Node.js + Express.js |
| Database          | MongoDB              |
| Containerization  | Docker               |
| Authentication    | JWT + Google OAuth   |
| AI Engine         | HuggingFace     |
| AI Insights       | Gemini API           |
| Notifications     | Nodemailer           |
| Password Security | bcrypt               |

---

## MVP Scope

This project is currently built as a hackathon MVP.

### Focus Areas

- Core legal assistance
- AI integration
- Smart automation
- Clean user flow
- Scalable architecture

---

## Future Enhancements

- Real lawyer consultation system
- Appointment booking
- AI legal chatbot
- OCR-based legal document reading
- Voice-based legal support
- Court database integrations
- Real-time case updates
- Mobile application

---

## Security Features

- JWT-based authentication
- Protected API routes
- bcrypt password hashing
- OAuth login security
- Role-based access control

---

## Why Nyaya Sathi Matters

Nyaya Sathi aims to democratize legal awareness and make legal help more accessible, understandable, and affordable for ordinary citizens through AI-powered automation and assistance.