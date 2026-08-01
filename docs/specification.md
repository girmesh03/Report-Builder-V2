# Report Builder V2 — Exhaustive Project Specification

> Single source of truth for the implementation of **Report Builder V2**. This document is built phase by phase from the initial source brief (referenced by section number, e.g. §1.4, for traceability only) plus codebase facts. It is the only document a future implementation AI must follow. This document is complete and self-contained; the source brief is not required for implementation.

## Document Purpose And Authority

This specification is generated through the 36-phase build process. It is the sole authoritative implementation contract for Report Builder V2. Every fact, rule, constraint, model field, API shape, UI behavior, and acceptance criterion that the implementation AI needs is recorded here, sourced, and cross-aligned.

### Source Of Truth Hierarchy

1. Direct user instructions during a session — highest priority.
2. Codebase facts — `backend/package.json` and `client/package.json` are the single source of truth for package versions; when source notes differ, the package.json files win.
3. The initial source brief — referenced by section number (`§N.M`) for traceability only; the file itself is a development-time input and is never required at implementation time.
4. `docs/specification.md` (this document) — the target; green content is preserved and cross-aligned, never silently overwritten.

### Version Normalization Rule (V2)

Any older project-version wording found in any document, note, or code must be normalized to **V2**. The project name is **Report Builder V2**.

### Document Conventions

- Every requirement carries a unique ID (e.g., `REQ-001`) and a source trace to a source-brief section (e.g., `§1.4`).
- Every decision carries an ADR ID (e.g., `AD-001`).
- Terms are defined in the Glossary section.
- Markers of the form `expanded in Phase N` indicate content that a later phase will enrich; the marker is not a license to invent.

---

## Phase Status And Coverage Map

Status legend: `GREEN` = completed and validated; `PENDING` = not yet built; `IN PROGRESS` = being built.

| # | Phase (source-brief section) | Status | Spec sections produced/updated |
|---|---|---|---|
| 1 | 1. Project Identity | GREEN | Project Overview, Problem Statement, Glossary, PRD, Requirements, Decision Log |
| 2 | 2. Problem Statement | GREEN | Problem Statement, PRD, Requirements, User Stories |
| 3 | 3. Manual Reporting Mental Model | GREEN | PRD, Work Flow, User Interactions, Report Domain |
| 4 | 4. Supporting Features Needed Because Of The Core Problem | PENDING | PRD, Requirements, User Stories, Report Management |
| 5 | 5. Report And Branch Domain | PENDING | Report Domain, Data Modeling, Business Rules, API Contract, Status Machine, Report Management |
| 6 | 6. Report Format, Samples, And Tone | PENDING | Report Format, AI Prompt Spec, Export Spec |
| 7 | 7. Language Rules | PENDING | AI Prompt Spec, Report Format, UI/UX Spec |
| 8 | 8. Transcription Accuracy Requirement | PENDING | Audio Recording STT, Transcription Review, Validation Audit |
| 9 | 9. Technical Stack And Package Rules | PENDING | Rules, Coding Conventions, Architecture, Requirements, Project Directory Structure |
| 10 | 10. Backend Architecture | PENDING | Backend Architecture, Architecture, API Contract, Project Directory Structure |
| 11 | 11. Authentication, Authorization, Cookies, And Tokens | PENDING | Auth Cookies, Security, API Contract, Data Modeling |
| 12 | 12. Frontend Architecture | PENDING | Frontend Architecture, Routing Layout, UI/UX Spec, MUI Component Standards, Project Directory Structure |
| 13 | 13. Redux, RTK Query, And API Client | PENDING | Redux RTK Query, Rules, Frontend Architecture |
| 14 | 14. MUI, MUI X, Theme, And Component Standards | PENDING | MUI Component Standards, Theme Standards, UI/UX Spec |
| 15 | 15. React Hook Form Standards | PENDING | React Hook Form Standards, Validation Audit, UI/UX Spec |
| 16 | 16. UI Rules | PENDING | UI/UX Spec, User Interactions, Rules |
| 17 | 17. Environment Variables | PENDING | Environment Config, Security, Rules |
| 18 | 18. Addis AI Integration | PENDING | Addis AI, AI Prompt Spec, API Contract, Security |
| 19 | 19. Other AI Providers | PENDING | Other AI Providers, Addis AI, AI Prompt Spec |
| 20 | 20. Audio Recording And STT Pipeline | PENDING | Audio Recording STT, Transcription Review, API Contract, Data Modeling |
| 21 | 21. AI Prompt Requirements | PENDING | AI Prompt Spec, Report Format, Rules |
| 22 | 22. Export | PENDING | Export Spec, API Contract, Work Flow |
| 23 | 23. Mock Data | PENDING | Mock Data Seeding, Data Modeling, Tasks |
| 24 | 24. Data Model | PENDING | Data Modeling, API Contract, Business Rules, Report Domain |
| 25 | 25. Project Directory Structure | PENDING | Project Directory Structure, Coding Conventions, Architecture |
| 26 | 26. Code Quality And Coding Conventions | PENDING | Coding Conventions, Rules, JSDoc Standards, Checklists |
| 27 | 27. JSDoc Conventions | PENDING | JSDoc Standards, Coding Conventions |
| 28 | 28. Error Handling Patterns | PENDING | Error Handling, API Contract, Validation Audit |
| 29 | 29. Security | PENDING | Security, Requirements, Environment Config, Rules |
| 30 | 30. New File Creation Rules | PENDING | Rules, Checklists, Project Directory Structure |
| 31 | 31. Validation And Audit | PENDING | Validation Audit, Checklists, Source Traceability, Non-Functional Requirements |
| 32 | 32. Git And Phase Protocol | PENDING | Git Workflow, Phase Protocol, Tasks, Implementation Plan |
| 33 | 33. Decision Log (ADRs) | PENDING | Decision Log |
| 34 | 34. Glossary | PENDING | Glossary, Requirements |
| 35 | 35. Archive, Delete, And Restore Lifecycle | PENDING | Report Management, Data Modeling, Business Rules, Work Flow |
| 36 | Final Consolidation (no source section) | PENDING | Full `docs/specification.md` — coverage verification, open-question resolution, final quality gate |

---

## Required Output Sections Checklist

Status of every section the target document must contain at minimum. Extra sections may be added if analysis shows a need.

| Spec section | Produced/updated in phase | Status |
|---|---|---|
| Addis AI | 18 | PENDING |
| AI Prompt Spec | 6, 7, 18, 19, 21 | PENDING |
| Analytics | 4 (out-of-scope requirement only; product feature deferred) | PENDING |
| API Contract | 5, 10, 11, 18, 20, 22, 24, 28 | PENDING |
| Architecture | 9, 10, 25 | PENDING |
| Audio Recording STT | 8, 20 | PENDING |
| Auth Cookies | 11 | PENDING |
| Backend Architecture | 10 | PENDING |
| Resource Management | 4, 35 | PENDING |
| Business Rules | 5, 24, 35 | PENDING |
| Checklists | 26, 30, 31 | PENDING |
| Coding Conventions | 9, 25, 26, 27 | PENDING |
| Data Modeling | 5, 11, 20, 23, 24, 35 | PENDING |
| Decision Log | 1, 2, 33 | GREEN |
| Design | consolidated across phases; finalized in 36 | PENDING |
| Environment Config | 17 | PENDING |
| Error Handling | 28 | PENDING |
| Export Spec | 6, 22 | PENDING |
| File Storage Uploads | 20 | PENDING |
| Frontend Architecture | 12, 13, 14 | PENDING |
| Git Workflow | 32 | PENDING |
| Glossary | 1, 2, 34 (final) | GREEN |
| Implementation Plan | 32 | PENDING |
| JSDoc Standards | 26, 27 | PENDING |
| Logging | 10, 28 | PENDING |
| Mock Data Seeding | 23 | PENDING |
| MUI Component Standards | 12, 14 | PENDING |
| Non-Functional Requirements | 31 | PENDING |
| Other AI Providers | 19 | PENDING |
| Phase Protocol | 32 | PENDING |
| PRD | 1, 2, 3, 4 | GREEN (Phase 3 enrichment) |
| Problem Statement | 1, 2 | GREEN |
| Profile Management | 4 | PENDING |
| Project Directory Structure | 9, 10, 12, 25, 30 | PENDING |
| Project Overview | 1 | GREEN |
| React Hook Form Standards | 15 | PENDING |
| Redux RTK Query | 13 | PENDING |
| Report Domain | 3, 5, 24 | GREEN (Phase 3 seed) |
| Report Format | 6, 7, 21 | PENDING |
| Report Management | 4, 5, 35 | PENDING |
| Requirements | 1, 2, 4, 9, 29, 31, 34 | GREEN (Phase 2 enrichment) |
| Risk Register | pending assignment (candidate: 33/36) | PENDING |
| Routing Layout | 12 | PENDING |
| Rules | 9, 13, 16, 17, 21, 26, 29, 30 | PENDING |
| Security | 11, 17, 18, 29 | PENDING |
| Source Traceability | 31 | PENDING |
| Status Machine | 5, 35 | PENDING |
| Tasks | 32 | PENDING |
| Theme Standards | 14 | PENDING |
| Transcription Review | 8, 20 | PENDING |
| UI/UX Spec | 7, 12, 14, 15, 16 | PENDING |
| User Interactions | 3, 16, 22, 35 | GREEN (Phase 3 seed) |
| User Stories | 2 (seed), 4 | GREEN (Phase 2 seed) |
| Validation Audit | 8, 15, 28, 31 | PENDING |
| Work Flow | 3, 22, 35 | GREEN (Phase 3 seed) |

---

## Source Trace Map — Phase 1 (source §1)

All `§` references below identify sections of the original source brief. They are kept for traceability only; this specification is complete and self-contained without the source brief.

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §1.1 | Project name Report Builder V2; normalize older version wording to V2 | Project Overview, Decision Log (AD-001) |
| §1.2 | Intelligent web-based Report Builder; MERN-style (Node.js, Express, MongoDB/Mongoose, React); JavaScript-only | Project Overview, Requirements (REQ-001/002/003) |
| §1.3 | Primary user: Area Supervisor, restaurant company, 14+ branches, Addis Ababa, Ethiopia; 1+ branches per day; daily report for the boss | Project Overview, Glossary, PRD, Requirements (REQ-014) |
| §1.4 | Core objective: Amharic audio → boss-ready professional structured Amharic daily supervision report, less manual writing | Project Overview, PRD, Requirements (REQ-004/005/006) |
| §1.5 | Product principle question | Project Overview, PRD, Rules (Phase 9 seed reference) |
| §1.6 | Vision statement | Project Overview, PRD |
| §1.7 | Out of scope: TTS, realtime audio processing, advanced analytics dashboard, mobile native apps, RBAC, automated translation | Project Overview, PRD, Requirements (REQ-007..012), Decision Log (AD-003/004/005) |
| Codebase | README.md = `# Report Builder V2` | Project Overview |
| Codebase | No root package.json; separate `backend/` and `client/` packages | Project Overview, Decision Log (AD-006) |
| Codebase | `backend/package.json` and `client/package.json` dependency versions | Project Overview (authoritative tables) |

---

## Source Trace Map — Phase 2 (source §2)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §2.1 | Supervisor role and responsibilities (visit 1+ branches, monitor, evaluate compliance, guide teams, ensure corrective actions) | Problem Statement, PRD |
| §2.1 | Manual reporting burden: after-hours writing with Microsoft Word, recall from memory, labor-intensive, mentally demanding, prone to omissions/inconsistencies/formatting errors/inaccuracies | Problem Statement, PRD, Requirements (REQ-006) |
| §2.1 | Unstructured supervision activities remembered as continuous narration rather than structured report | Problem Statement, PRD |
| §2.1 | No centralized system for branches, daily reports, transcriptions, generated reports, AI conversations, historical records | Problem Statement, PRD, Requirements (REQ-019..023) |
| §2.1 | Existing tools Telegram/WhatsApp; no integrated audio→structured-report automation | Problem Statement, PRD |
| §2.1 | Limited STT/AI support for Ethiopian languages, particularly Amharic | Problem Statement, Requirements (REQ-035), Glossary |
| §2.1 | Consequences: reduced productivity, after-hours time, delayed submission, inconsistencies, admin workload | Problem Statement, PRD (Success Outcomes) |
| §2.1 | Need: record one or more narrations per day, accurate transcription, review/edit transcription, Amharic-optimized AI, structured report in the organization's format | Problem Statement, PRD, Requirements (REQ-015..018), User Stories (US-001..003) |
| §2.1 | Centralized management, editable reports, version history, multi-branch days, PDF/TXT/CSV/spreadsheet exports | PRD, Requirements (REQ-019..029), User Stories (US-005..009) |
| §2.2 | Eleven per-branch supervision activities | Problem Statement, PRD |
| §2.2 | Report must explain: date, branch, working time, completed activities, unresolved issues, general opinion, work exit time | Problem Statement, Requirements (REQ-030) |
| §2.3 | Seven main pain points (effort, mobility, conversational source, Amharic accuracy, tone, transliteration, user control) | Problem Statement, PRD, Requirements (REQ-031..035), User Stories (US-004) |
| §2.4 | Project is not mainly about secondary features | Problem Statement, PRD |

---

## Source Trace Map — Phase 3 (source §3)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §3.1 | Person 1 is the supervisor who wants a report prepared; explains the day to Person 2 in Amharic | Report Domain, PRD (11), Glossary (Person 1) |
| §3.1 | Person 1 may mention 14 items: date, branch(es) visited, entry time, exit time, time range per branch, activities, checklist-based work, urgent issues/problems, actions taken, people contacted, follow-up needed, general opinions, opinions about issues, suggestions | Report Domain (content elements table) |
| §3.1 | The explanation is natural, not in report format; may be conversational, repeated, incomplete at first, or clarified later | Work Flow (WF-3), Report Domain (DR-2) |
| §3.2 | Person 2 is a friend with no work relationship; listens carefully and may ask WH questions (date, branch, times, activities, problems, actions, who informed, what needs solution, opinion) | Report Domain, Work Flow (OQ-007: app processes as-is) |
| §3.2 | Person 2 writes a complete report; Person 1 reviews; if wrong/missing/unclear/unwanted, Person 1 asks for correction; updates until satisfied | Work Flow (W-07..W-10), User Interactions (UI-003..007), Requirements (REQ-038) |
| §3.3 | Mapping: Person 1 = user/supervisor, Person 2 = Addis AI-powered system | Report Domain, Glossary (Person 2) |
| §3.3 | Audio sent to Addis AI speech-to-text; transcription contains the needed information but is not organized as a final report | Work Flow (W-02, W-03), Requirements (REQ-037) |
| §3.3 | AI must process, extract, organize, and rewrite based on report rules, format, tone, and system prompt | Work Flow (W-05, W-06), Report Domain (AI responsibilities) |
| §3.3 | AI's 12 responsibilities (extract date/branches/times/activities/issues/problems/actions/opinions; organize; write in Amharic; match sample tone; correct on request) | Report Domain (section 3), Requirements (REQ-036) |
| §3.3 | AI must not treat the transcription as the final report; transcription is raw material, generated report is the organized final output | Work Flow (WF-1), Report Domain (DR-1), Requirements (REQ-037), Glossary (raw material, final output) |

---

## Project Overview

### 1. Product Identity

| Attribute | Value |
|---|---|
| Project name | Report Builder V2 (source: §1.1) |
| Project type | Intelligent web-based Report Builder system (source: §1.2) |
| Application style | MERN-style web application using Node.js, Express, MongoDB/Mongoose, and React (source: §1.2) |
| Language constraint | JavaScript-only project (source: §1.2) |
| Primary user | Area Supervisor in a restaurant company with more than 14 branches in Addis Ababa, Ethiopia (source: §1.3) |
| Repository root | `Report-Builder-V2/` with two independent packages: `backend/` and `client/` (codebase fact) |
| Specification status | Built phase by phase; Phase 1 (Project Identity) GREEN |

### 2. Core Objective

Enable an Area Supervisor to record Amharic audio describing daily supervision activities and generate a boss-ready, professional, structured Amharic daily supervision report with less manual writing. (source: §1.4)

### 3. Product Principle

Every major technical, design, and AI-prompt decision must be checked against this question:

> Does this help the supervisor generate a boss-ready Amharic daily report from recorded Amharic supervisor activity faster, more accurately, and with less manual writing?

If the answer is no, the feature is secondary and must not distract from the core workflow. (source: §1.5 — quoted in full)

### 4. Vision Statement

Eliminate the dependency on manually writing daily supervision reports using conventional document editing tools. Enable an Area Supervisor to speak their day in Amharic and receive a boss-ready, professionally structured daily supervision report with minimal manual effort. (source: §1.6 — quoted in full)

### 5. Out Of Scope (deferred or excluded)

The following are explicitly out of scope for V2 (source: §1.7, quoted):

| Feature | Status |
|---|---|
| Text-to-speech (TTS) | Deferred to later version |
| Realtime audio processing | Deferred to later version |
| Advanced analytics dashboard with detailed metrics | Deferred to later version |
| Mobile native apps (iOS/Android) | Excluded — web-only |
| Role-based access control (RBAC) | Excluded — single user type (Area Supervisor) |
| Automated translation | Excluded — reports remain in original language |

### 6. Primary User Profile

- **Role:** Area Supervisor (source: §1.3).
- **Employer:** a restaurant company with more than 14 branches in Addis Ababa, Ethiopia (source: §1.3).
- **Work pattern:** on a normal workday the supervisor may visit one or more branches (source: §1.3).
- **Reporting duty:** at the end of each day, the supervisor prepares a report for the boss (source: §1.3).
- **Single user type:** there is exactly one user type — Area Supervisor; no roles, no permission levels (source: §1.7).

### 7. Technical Stack — Authoritative (codebase facts)

Package versions below are taken from `backend/package.json` and `client/package.json` (captured 2026-08-01). These files are the single source of truth; any differing version note in other documents is overridden. All versions use caret (`^`) ranges as recorded.

#### 7.1 Backend (`backend/package.json`)

- Package name: `backend`; version `1.0.0`; `"type": "module"` (ESM); main entry `index.js`.
- Scripts: `test` is currently a stub (`Error: no test specified`); no test suite configured yet.

| Dependency | Version |
|---|---|
| express | ^5.2.1 |
| mongoose | ^9.7.4 |
| bcryptjs | ^3.0.3 |
| compression | ^1.8.1 |
| cookie-parser | ^1.4.7 |
| cors | ^2.8.6 |
| dayjs | ^1.11.21 |
| dotenv | ^17.4.2 |
| express-async-handler | ^1.2.0 |
| express-mongo-sanitize | ^2.2.0 |
| express-rate-limit | ^8.5.2 |
| express-validator | ^7.3.2 |
| helmet | ^8.3.0 |
| jsonwebtoken | ^9.0.3 |
| mongoose-paginate-v2 | ^1.9.5 |
| multer | ^2.2.0 |

| Dev dependency | Version |
|---|---|
| morgan | ^1.11.0 |
| nodemon | ^3.1.14 |

Note: these dependencies already signal V2 architecture decisions (cookies, helmet, rate limiting, mongo sanitization, pagination, multer uploads, JWT); each is detailed in its mapped phase (10, 11, 20, 24, 28, 29).

#### 7.2 Client (`client/package.json`)

- Package name: `client`; private; version `0.0.0`; `"type": "module"`.
- Scripts: `dev` (vite), `build` (vite build), `lint` (eslint .), `preview` (vite preview). No test script configured.

| Dependency | Version |
|---|---|
| react | ^19.2.7 |
| react-dom | ^19.2.7 |
| react-router | ^8.2.0 |
| @reduxjs/toolkit | ^2.12.0 |
| react-redux | ^9.3.0 |
| react-hook-form | ^7.81.0 |
| @mui/material | ^9.2.0 |
| @mui/icons-material | ^9.2.0 |
| @mui/lab | ^9.0.0-beta.6 |
| @mui/x-data-grid | ^9.9.0 |
| @mui/x-date-pickers | ^9.9.0 |
| @mui/x-charts | ^9.9.0 |
| @mui/x-chat | ^9.0.0-alpha.15 |
| @emotion/react | ^11.14.0 |
| @emotion/styled | ^11.14.1 |
| @fontsource/inter | ^5.2.8 |
| react-media-recorder | ^1.7.2 |
| react-player | ^3.4.0 |
| jspdf | ^4.2.1 |
| jspdf-autotable | ^5.0.8 |
| react-toastify | ^11.1.0 |
| react-error-boundary | ^6.1.2 |
| dayjs | ^1.11.21 |

| Dev dependency | Version |
|---|---|
| vite | ^8.1.1 |
| @vitejs/plugin-react | ^6.0.3 |
| @rolldown/plugin-babel | ^0.2.3 |
| babel-plugin-react-compiler | ^1.0.0 |
| eslint | ^10.6.0 |
| @eslint/js | ^10.0.1 |
| eslint-plugin-react-hooks | ^7.1.1 |
| eslint-plugin-react-refresh | ^0.5.3 |
| globals | ^17.7.0 |
| @babel/core | ^7.29.7 |
| @types/react | ^19.2.17 |
| @types/react-dom | ^19.2.3 |

### 8. Repository Layout (codebase facts)

| Path | Purpose (as of Phase 1) |
|---|---|
| `README.md` | Single heading: `# Report Builder V2` |
| `backend/` | Backend package scaffold: `package.json`, `package-lock.json`, `.env` (contents not inspected in Phase 1; env keys are Phase 17 scope). No source files exist yet. |
| `client/` | Vite scaffold: `package.json`, `package-lock.json`, `.env`, `eslint.config.js`, `vite.config.js`, `index.html`, `public/` (favicon.svg, icons.svg), `src/` with `main.jsx`, `App.jsx`, `assets/`, and a `theme/` directory (AppTheme.jsx, themePrimitives.js, customizations/*). Details are Phase 12/14 scope. |
| Documentation | `specification.md` (this document, built here). |
| `scripts/` | `verify-initial-doc.py` — development-time integrity checker for the initial source brief; not part of the delivered application. |
| `.opencode/` | opencode tooling (not application code). |
| `.gitignore` | Ignores `.env`, logs (`*.log`), `node_modules`, `dist`, `dist-ssr`, `*.local`, editor files. |
| Git | Branch: `project-planning-and-specifications`; working tree clean at Phase 1 start. |

### 9. V2 Terminology Rule

- The project is always referred to as **Report Builder V2**.
- Any wording in source documents, code, or notes that refers to an older project version must be normalized to V2 (source: §1.1).

### 10. Phase 1 Open Questions (inherited by later phases)

None in this section that block implementation. Open questions specific to PRD success metrics are recorded under `## PRD → Open Questions`. All deferral decisions are recorded in `## Decision Log`.

---

## Problem Statement

> Built exhaustively from source §2. Terminology is defined in `## Glossary`.

### 1. Supervisor Role And Responsibilities

Area Supervisors in restaurant companies with multiple branches are responsible for visiting one or more branches each day to: monitor operations, evaluate compliance with company standards, identify operational issues, provide guidance to branch teams, and ensure that corrective actions are implemented. At the end of every working day they must prepare a comprehensive supervision report that accurately documents all activities performed, observations made, issues identified, recommendations provided, and follow-up actions required. (source: §2.1)

### 2. The Manual Reporting Burden

Preparing these daily reports is a time-consuming and inefficient process. Because the Area Supervisor spends most of the working day traveling between branches and conducting supervision activities, there is little or no opportunity to prepare reports on-site. As a result, reports are typically prepared manually after returning home using document editing tools such as Microsoft Word. The supervisor must recall the entire day's activities from memory, organize scattered information, manually format the report according to the required reporting structure, and ensure all important details are included. This repetitive manual process is labor-intensive, mentally demanding, and prone to omissions, inconsistencies, formatting errors, and inaccuracies. (source: §2.1)

The existing process also depends heavily on manual writing via Telegram and WhatsApp rather than intelligent automation. Although supervisors can verbally describe everything they accomplished during the day, there is no integrated system capable of converting an unstructured audio recording into a structured, professional supervision report; valuable time is spent rewriting information that was already communicated verbally. (source: §2.1)

### 3. Unstructured Supervision Activities

Supervision activities are naturally unstructured. Throughout the day the supervisor may inspect multiple branches, communicate with managers and employees, identify operational and maintenance issues, verify inventory and cleanliness, observe customer service quality, follow up on previous actions, and provide recommendations for operational improvements. These activities are often remembered as a continuous narration or conversation rather than as a structured report. Manually transforming this unorganized information into a professional report requires considerable effort and significantly increases the possibility of overlooking important observations and follow-up actions. (source: §2.1)

### 4. No Centralized Management

There is no centralized system for managing supervision activities. Information related to branches, daily supervision reports, transcriptions, generated reports, AI conversations, and historical records is often maintained separately or manually, making it difficult to efficiently organize, search, update, retrieve, and review previous reports. Managing supervision records for multiple branches over an extended period becomes increasingly difficult, reducing operational efficiency and limiting the ability to monitor historical performance, identify recurring issues, and support informed decision-making. (source: §2.1)

### 5. Amharic Speech-To-Text And AI Limitation

Existing speech-to-text and artificial intelligence solutions generally provide limited support for Ethiopian languages, particularly Amharic, making it difficult to accurately transcribe spoken supervision activities and generate professional reports. This limitation prevents supervisors from fully utilizing AI-assisted reporting workflows while maintaining the linguistic accuracy required for business reporting. (source: §2.1)

### 6. Consequences Of The Current Process

The current reporting process reduces productivity, consumes valuable personal time outside working hours, delays report submission, introduces inconsistencies in report quality, and increases administrative workload. Supervisors repeatedly perform routine documentation tasks that could otherwise be automated, allowing them to dedicate more time to operational supervision, problem solving, and continuous improvement across all branches. (source: §2.1)

### 7. The Need — What The System Must Do

There is a need for an intelligent web-based Report Builder system that eliminates the dependency on manually writing daily supervision reports using conventional document editing tools. The system must:

- Enable an Area Supervisor to record **one or more audio narrations** describing all supervision activities performed during a specific day, whether the narration is structured or conversational (all narrations of a day belong to one daily report — decision AD-008).
- **Accurately transcribe** the recorded audio.
- Allow the supervisor to **review and edit the transcription when necessary**.
- Utilize an **AI model optimized for Amharic language processing** to analyze the transcription.
- **Automatically generate a professional, well-structured daily supervision report** that follows the organization's reporting format.

In addition, the system must provide centralized management of branches, daily reports, transcriptions, AI conversations, generated reports, report version history, user profile information, and reporting analytics through a unified web application. Reports must remain editable after generation, preserve historical versions, support supervision activities performed across multiple branches within a single working day, and be exportable in multiple formats: PDF, TXT, CSV, and spreadsheet documents. (source: §2.1)

### 8. Real-World Context

#### 8.1 Activities Performed At Each Branch

The supervisor may perform the following activities at each branch (source: §2.2):

1. Check daily operational activities.
2. Check cleanliness.
3. Check employee readiness.
4. Follow a checklist.
5. Observe urgent branch problems.
6. Communicate with staff or responsible people.
7. Follow up on previously reported issues.
8. Take action or give instructions.
9. Form an opinion about branch performance.
10. Identify things that need immediate attention.
11. Identify things that can make the branch better.

#### 8.2 What The End-Of-Day Report Must Explain

At the end of each day, the report must explain (source: §2.2):

1. Date.
2. Branch.
3. Working time.
4. Completed activities.
5. Unresolved issues.
6. General opinion.
7. Work exit time.

### 9. Main Pain Points To Solve

| # | Pain point | Statement | Source |
|---|---|---|---|
| 1 | Manual report writing takes too much effort | The supervisor should not need to write the whole report manually after a long workday; the current process depends on Telegram, WhatsApp, Microsoft Word, or Google Docs. | §2.3.1 |
| 2 | The supervisor is mobile during the day | Because the supervisor moves between branches, recording audio is more realistic than typing. | §2.3.2 |
| 3 | The source information is conversational | The spoken explanation may not follow the final report order; the AI must organize it. | §2.3.3 |
| 4 | Amharic accuracy matters | The conversation is always Amharic; the system must treat Amharic quality as a core requirement, not as an optional language feature. | §2.3.4 |
| 5 | Report tone must match existing reports | The output must sound like the provided report samples. | §2.3.5 |
| 6 | Technical words must sound natural | English workplace terms must be represented in natural Amharic workplace transliteration, not literal translation. | §2.3.6 |
| 7 | The user must stay in control | The user must be able to review generated reports and request corrections; corrections must update only the relevant part of the generated report without rewriting correct unrelated sections unnecessarily. | §2.3.7 |

### 10. What The Project Is Not Mainly About

Secondary features should not distract from the core workflow of generating a boss-ready Amharic daily report from recorded Amharic supervisor activity. (source: §2.4; see also product principle §1.5)

---

## Glossary

> **Terms added in Phases 1–3. The full glossary is built in Phase 34 (§34 Glossary).**

| Term | Definition | Source |
|---|---|---|
| Area Supervisor | The single user type of Report Builder V2; a supervisor in a restaurant company with more than 14 branches who visits one or more branches per day and prepares a daily supervision report for the boss. | §1.3, §1.7 |
| Boss | The person to whom the Area Supervisor delivers the daily supervision report. | §1.3 |
| Branch | A restaurant location under the supervisor's area; more than 14 branches exist in Addis Ababa, Ethiopia. | §1.3 |
| Daily Supervision Report | The boss-ready, professional, structured daily report produced from the supervisor's day activities; must explain date, branch, working time, completed activities, unresolved issues, general opinion, and work exit time. | §1.4, §2.2 |
| Amharic | The language in which the supervisor records audio and in which the report is generated; reports remain in the original language (no automated translation); Amharic quality is a core requirement, not optional. | §1.4, §1.7, §2.3.4 |
| Text-to-Speech (TTS) | Generating speech from text; explicitly deferred to a later version. | §1.7 |
| Realtime audio processing | Processing audio as it is being recorded; explicitly deferred to a later version. | §1.7 |
| Web-only | The product is a web application; no iOS/Android native apps. | §1.7 |
| Role-based access control (RBAC) | Access control by roles; explicitly excluded — single user type (Area Supervisor). | §1.7 |
| MERN-style | Application style using Node.js, Express, MongoDB/Mongoose, and React. | §1.2 |
| JavaScript-only | The project is implemented entirely in JavaScript (no TypeScript). | §1.2 |
| Report Builder V2 | The project name; all older project-version wording is normalized to V2. | §1.1 |
| Addis Ababa | The city, Ethiopia, where the 14+ branches are located. | §1.3 |
| Manual writing | Writing reports by hand using conventional document editing tools; the dependency V2 eliminates. | §1.6 |
| STT | Speech-to-text (speech recognition). Detailed pipeline rules arrive in Phase 20 (§20 Audio Recording And STT Pipeline). | §1.4 (implied), §2.1 |
| Microsoft Word | A conventional document editing tool currently used for manual report preparation. | §2.1, §2.3.1 |
| Telegram | A messaging tool currently used in the manual reporting process. | §2.1, §2.3.1 |
| WhatsApp | A messaging tool currently used in the manual reporting process. | §2.1, §2.3.1 |
| Google Docs | A conventional document editing tool used in the current process. | §2.3.1 |
| Checklist | A per-branch activity the supervisor follows ("Follow a checklist"); whether V2 ships a checklist tool is an open question (OQ-006). | §2.2 |
| Narration | A spoken (audio) description of supervision activities; one or more narrations are recorded per day and merge into one daily report (AD-008). | §2.1 |
| Transcription | The text produced from the recorded audio; it is reviewed and edited by the supervisor before report generation. | §2.1 |
| AI conversation | A recorded exchange with the AI (prompt/history) associated with report generation; centrally managed. | §2.1 |
| Generated report | The AI-produced daily supervision report; distinct from its version history. | §2.1 |
| Report version history | The preserved historical versions of a generated report after edits. | §2.1 |
| Reporting analytics | Basic analytics in V2 (AD-007); the advanced analytics dashboard with detailed metrics is deferred. | §2.1, §1.7 |
| Transliteration | Representing English workplace terms in natural Amharic workplace transliteration, not literal translation. | §2.3.6 |
| Working time | A required element of the end-of-day report. | §2.2 |
| Work exit time | A required element of the end-of-day report. | §2.2 |
| Completed activities | A required element of the end-of-day report. | §2.2 |
| Unresolved issues | A required element of the end-of-day report. | §2.2 |
| General opinion | The supervisor's opinion about branch performance; a required element of the end-of-day report. | §2.2 |
| Person 1 | The supervisor who explains the day's activities to Person 2 in Amharic; mapped to the user/supervisor in the app. | §3.1, §3.3 |
| Person 2 | The listener who understands, writes the complete report, and corrects it until satisfied; mapped to the Addis AI-powered system in the app. | §3.2, §3.3 |
| Raw material | The transcription produced from recorded audio; expected to contain the needed information but not organized as a final report; never treated as the final report. | §3.3 |
| Final output | The organized, format-conformant report the AI writes from the transcription raw material. | §3.3 |
| Correction loop | The repeated review→correction cycle between supervisor and system that continues until the supervisor is satisfied. | §3.2 |

---

## PRD

> **Phase 3 state — enriched in Phase 4 (Supporting Features).**

### 1. Product Vision

Eliminate the dependency on manually writing daily supervision reports using conventional document editing tools. Enable an Area Supervisor to speak their day in Amharic and receive a boss-ready, professionally structured daily supervision report with minimal manual effort. (source: §1.6)

### 2. Target User

- **Who:** Area Supervisor of a restaurant company with more than 14 branches in Addis Ababa, Ethiopia (source: §1.3).
- **When:** at the end of each working day, after visiting one or more branches (source: §1.3).
- **Single user type:** no roles or permissions (source: §1.7).

### 3. Problem Statement

The complete problem statement is in `## Problem Statement`. In summary: the supervisor's day is spent mobile across branches; supervision information is unstructured narration; reports are today written manually after hours with Word/Telegram/WhatsApp/Google Docs; there is no central record system; and STT/AI support for Amharic is limited (sources: §2.1, §2.3). V2 removes the manual-writing dependency: the supervisor records one or more Amharic narrations, the system transcribes them accurately, the supervisor reviews/edits the transcription, and an Amharic-optimized AI produces a structured professional report in the organization's format (source: §2.1).

### 4. Real-World Context

- Restaurant company with **more than 14 branches** in Addis Ababa, Ethiopia (source: §1.3).
- The supervisor may visit **one or more branches per day** (source: §1.3).
- Reports are prepared **at the end of each day for the boss** (source: §1.3).
- **Per-branch supervision activities** (source: §2.2): check daily operational activities; check cleanliness; check employee readiness; follow a checklist; observe urgent branch problems; communicate with staff or responsible people; follow up on previously reported issues; take action or give instructions; form an opinion about branch performance; identify things that need immediate attention; identify things that can make the branch better.
- **End-of-day report must explain** (source: §2.2): date, branch, working time, completed activities, unresolved issues, general opinion, work exit time.

### 5. Core Workflow (high level)

Derived from §1.4 and §2.1 (detailed interaction workflow is built in Phase 3 and Phases 20–22):

1. The supervisor records **one or more Amharic audio narrations** describing the day's supervision activities; all narrations of a day merge into one daily report (decision AD-008).
2. The audio is transcribed (STT) to Amharic text.
3. The supervisor reviews and edits the transcription when necessary.
4. An AI model optimized for Amharic analyzes the transcription and automatically generates a professional, well-structured daily supervision report that follows the organization's reporting format.
5. The supervisor reviews the generated report and may request corrections; corrections update only the relevant part without unnecessarily rewriting correct unrelated sections, and the review–correction cycle repeats until the supervisor is satisfied (§3.2).
6. Reports remain editable after generation and preserve historical versions; a single working day may span multiple branches.
7. The report is exported (PDF, TXT, CSV, spreadsheet — detailed in Phase 22).

### 6. Supporting Features

Derived from §2.1 (the detailed supporting-feature specification is Phase 4 scope):

- Centralized management of branches, daily reports, transcriptions, AI conversations, generated reports, report version history, user profile information, and reporting analytics through a unified web application.
- Reports remain editable after generation.
- Historical versions are preserved.
- A single working day may cover supervision activities across multiple branches.
- Export to multiple formats: PDF, TXT, CSV, and spreadsheet documents.
- Reporting analytics: basic analytics in V2; the advanced analytics dashboard with detailed metrics stays deferred (decision AD-007).

### 7. Product Principle

Every major technical, design, and AI-prompt decision is checked against: *"Does this help the supervisor generate a boss-ready Amharic daily report from recorded Amharic supervisor activity faster, more accurately, and with less manual writing?"* If no, the feature is secondary and must not distract from the core workflow. (source: §1.5 — quoted in full)

### 8. Success Outcomes

Stated outcomes only (sources: §1.6, §1.4, §2.1):

| Outcome | Source |
|---|---|
| No dependency on manually writing daily supervision reports with conventional document editing tools | §1.6 |
| The supervisor speaks their day in Amharic and receives a boss-ready, professionally structured daily supervision report | §1.6 |
| Minimal manual effort in producing the report | §1.6 |
| Less manual writing overall | §1.4 |
| Significantly improved reporting efficiency | §2.1 |
| Enhanced report consistency and accuracy | §2.1 |
| Simplified branch and report management | §2.1 |
| Reduced administrative workload | §2.1 |
| Repetitive manual report writing eliminated | §2.1 |
| Supervisor performs daily reporting responsibilities more effectively and efficiently | §2.1 |
| No lost productivity and no after-hours report writing; timely submission; consistent quality | §2.1 |

Measurable KPIs are **not specified** in the source. Recorded as an open question (OQ-001); they will not be invented.

### 9. Scope And Out Of Scope

**In scope:** web-based intelligent Report Builder (MERN-style, JavaScript-only) enabling the supervisor to record one or more Amharic audio narrations per day, receive accurate transcription, review and edit the transcription, and receive an AI-generated professional, well-structured daily supervision report in the organization's reporting format; plus centralized management of branches, daily reports, transcriptions, AI conversations, generated reports, version history, user profile, and basic reporting analytics (AD-007); reports editable after generation with preserved versions, multi-branch days, and PDF/TXT/CSV/spreadsheet exports (sources: §1.2, §1.4, §2.1). Supporting features are detailed in Phase 4.

**Out of scope (verbatim, source: §1.7):**

- Text-to-speech — deferred to later version.
- Realtime audio processing — deferred to later version.
- Advanced analytics dashboard with detailed metrics — deferred to later version.
- Mobile native apps (iOS/Android) — web-only.
- Role-based access control — single user type (Area Supervisor).
- Automated translation — reports remain in original language.

### 10. Open Questions (missing product details — to be resolved with the user, not invented)

| # | Open question | Resolved in |
|---|---|---|
| OQ-001 | What measurable success KPIs should the product be evaluated against (e.g., time per report, accuracy rate)? Source states outcomes only qualitatively. | To be answered by user; recorded here until then |
| OQ-002 | Exact number of branches ("more than 14") — keep the stated "more than 14" or use a fixed count? | To be answered by user |
| OQ-003 | Should the boss also get access to reports, or is delivery strictly through the supervisor's workflow? Source only says the supervisor "prepares a report for the boss". | To be answered by user |
| OQ-004 | Basic reporting analytics are in V2 (AD-007); the advanced analytics dashboard stays deferred (§1.7). Confirm the basic-analytics scope when Phase 4 details supporting features. | AD-007 (Phase 2); re-checked in Phase 4 |
| OQ-005 | Multiple narrations per day merge into one daily report (AD-008). Re-confirm the exact merge/pipeline behavior when Phases 20/21 detail the audio pipeline. | AD-008 (Phase 2); re-checked in Phases 20/21 |
| OQ-006 | "Follow a checklist" (§2.2) is a reportable activity; whether V2 ships a checklist tool is unspecified. | Re-asked in Phase 4/5 |
| OQ-007 | Person 2 (mental model) may ask WH clarifying questions; §3.3 maps only write/review/correct behavior to the app. Should the app ask clarifying questions or process narrations as-is? | Resolved in Phase 3: process narrations as-is (no clarifying-Q&A step); re-confirmed in Phases 20/21 |

### 11. Manual Reporting Mental Model (Person 1 / Person 2)

The product's core workflow implements the manual reporting mental model of §3 (detailed in `## Work Flow`, `## User Interactions`, and `## Report Domain`):

- **Person 1** is the supervisor who wants a report to be prepared. Person 1 explains the day to Person 2 in Amharic, naturally and not in report format; the explanation may be conversational, repeated, incomplete at first, or clarified later (§3.1).
- **Person 2** is a friend of Person 1 with no work relationship to the company. Person 2 listens carefully, writes a complete report, and updates it on request until Person 1 is satisfied (§3.2).
- **In the app**, Person 1 is the user/supervisor and Person 2 is the Addis AI-powered system (§3.3).
- The supervisor provides a recorded Amharic audio explanation; the app sends the audio to Addis AI speech-to-text; the transcription is expected to contain the needed information but is **not** organized as a final report (§3.3).
- The AI must process, extract, organize, and rewrite the information based on the required report rules, format, tone, and system prompt; the generated report is the organized final output (§3.3).
- The app processes narrations as-is; there is no clarifying-question step in the first workflow (decision OQ-007; re-confirmed in Phases 20/21).
- The review–correction cycle (UI-004..007) repeats until the supervisor is satisfied, mirroring the Person 1 / Person 2 loop (§3.2).

---

## Requirements

> **Every requirement carries an acceptance criterion and a source trace. Requirements are expanded in Phases 4, 9, 29, 31, and 34 as the mapped sections are read.**

Requirement ID scheme: `REQ-<NNN>`. Acceptance criteria are written to be testable by the implementation AI.

### Functional Requirements (Phase 1)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-001 | The product must be a web-based application (no native mobile apps). | The deliverable is accessible through a web browser; no iOS/Android app code exists. | §1.7 |
| REQ-002 | The project must be implemented in JavaScript only. | No TypeScript or other language source files exist in `backend/` or `client/`. | §1.2 |
| REQ-003 | The application must use the MERN-style stack: Node.js, Express, MongoDB/Mongoose, and React. | `backend/` uses Express + Mongoose; `client/` uses React. | §1.2 |
| REQ-004 | The supervisor must be able to record Amharic audio describing daily supervision activities. | Audio recording of Amharic speech is captured in the web client. Detailed pipeline rules (MediaRecorder, MIME, limits) arrive in Phase 20. | §1.4 |
| REQ-005 | The system must generate a boss-ready, professional, structured Amharic daily supervision report from the recorded activities. | A structured Amharic report is produced by the system's AI workflow. Report format rules arrive in Phases 6–7, AI details in Phases 18–21. | §1.4 |
| REQ-006 | The workflow must reduce manual writing compared with conventional document editing tools. | The supervisor does not hand-write the report body; generation flows from recording/transcription. | §1.4 |
| REQ-007 | The system must support exactly one user type: Area Supervisor. No role-based access control. | No role/permission model exists in the system. | §1.7 |
| REQ-008 | Reports must remain in the original language (Amharic); no automated translation. | No translation feature exists; generated reports stay in the recorded language. | §1.7 |
| REQ-009 | The product must not include text-to-speech. | No TTS feature or dependency is used. | §1.7 |
| REQ-010 | The product must not include realtime audio processing. | Audio is processed as complete files/pipeline steps, never streamed in realtime for processing. | §1.7 |
| REQ-011 | The product must not include an advanced analytics dashboard with detailed metrics. | No detailed-metrics analytics dashboard exists. | §1.7 |
| REQ-012 | The product must be web-only; no iOS/Android native apps. | Same as REQ-001 (kept separate for traceability). | §1.7 |
| REQ-013 | Every document, code, and message must use V2 terminology for the project. | All references use "Report Builder V2"; no older version wording remains. | §1.1 |
| REQ-014 | The system must support a supervision day that spans one or more branches. | The data model and UI allow a single daily report to reference multiple branches within one working day. Detailed domain rules arrive in Phase 5. | §1.3, §2.1 |

### Functional Requirements (Phase 2)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-015 | The supervisor must be able to record **one or more audio narrations** describing the day's supervision activities. | Multiple narrations per day are supported; all narrations of a day belong to one daily report (AD-008). Audio pipeline rules arrive in Phase 20. | §2.1 |
| REQ-016 | The supervisor must be able to review and edit the transcription before report generation. | Transcription is viewable and editable in the UI; edits persist and feed the AI generation. | §2.1 |
| REQ-017 | The system must use an AI model optimized for Amharic language processing to analyze the transcription. | Report generation runs through the Amharic-optimized AI workflow (provider details in Phases 18–19, prompts in 21). | §2.1 |
| REQ-018 | The generated report must follow the organization's reporting format. | Generated output conforms to the report format (Phase 6) and explains the §2.2 elements. | §2.1 |
| REQ-019 | The system must provide centralized management of branches. | Branches are created/listable/editable in the unified web application; domain rules in Phase 5. | §2.1 |
| REQ-020 | The system must provide centralized management of daily reports. | Daily reports are organized, searchable, updatable, retrievable, and reviewable. | §2.1 |
| REQ-021 | The system must provide centralized management of transcriptions. | Transcriptions are stored and retrievable per report. | §2.1 |
| REQ-022 | The system must provide centralized management of AI conversations. | AI conversation history is stored and retrievable per report. | §2.1 |
| REQ-023 | The system must provide centralized management of generated reports. | Generated reports are stored, retrievable, and distinguishable from their versions. | §2.1 |
| REQ-024 | The system must preserve report version history. | Editing a report preserves historical versions; prior versions remain retrievable. | §2.1 |
| REQ-025 | The system must manage user profile information. | Profile data is stored, viewable, and editable (profile details in Phase 4). | §2.1 |
| REQ-026 | The system must provide basic reporting analytics through the unified web application. | Basic reporting-activity analytics exist (AD-007); no advanced metrics dashboard (REQ-011 stands). | §2.1, §1.7 |
| REQ-027 | Reports must remain editable after generation. | A generated report can be edited by the supervisor after generation. | §2.1 |
| REQ-028 | The system must support supervision activities performed across multiple branches within a single working day. | One daily report references multiple branches (same as REQ-014; kept for traceability). | §2.1 |
| REQ-029 | The system must support export to PDF, TXT, CSV, and spreadsheet documents. | All four export formats are implemented (export details in Phase 22). | §2.1 |
| REQ-030 | The daily report must explain: date, branch, working time, completed activities, unresolved issues, general opinion, and work exit time. | Each of the seven §2.2 elements is present in the generated report structure (format details in Phase 6). | §2.2 |
| REQ-031 | Amharic quality must be treated as a core requirement, not as an optional language feature. | Amharic handling is core throughout the pipeline (STT, transcription, AI generation). | §2.3.4 |
| REQ-032 | The generated report tone must match the provided report samples. | Output tone conforms to sample-based tone rules (Phase 6). | §2.3.5 |
| REQ-033 | English workplace terms must be represented in natural Amharic workplace transliteration, not literal translation. | Technical terms appear in natural Amharic transliteration per language rules (Phase 7). | §2.3.6 |
| REQ-034 | The user must be able to review generated reports and request corrections; corrections update only the relevant part without unnecessarily rewriting correct unrelated sections. | A correction request modifies only the targeted part of the report; correct unrelated content is preserved (prompt rules in Phase 21). | §2.3.7 |
| REQ-035 | Amharic transcription must be accurate. | The transcription pipeline targets accuracy for Amharic speech (accuracy requirement in Phase 8, pipeline in Phase 20). | §2.1, §2.3.4 |

### Functional Requirements (Phase 3)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-036 | The AI must extract and organize from the transcription: date information, branch names, working time and branch time ranges, performed activities, unresolved issues, urgent problems, actions already taken, and general opinions, and place them into the required report format. | Each listed item is extractable from the transcription and appears organized in the generated report structure. | §3.3 |
| REQ-037 | The system must never treat the transcription as the final report; the transcription is raw material only, and the generated report is the organized final output. | No workflow path presents the raw transcription as the final report; generation always reorganizes the material per the report rules. | §3.3 |
| REQ-038 | The review–correction cycle must repeat until the supervisor is satisfied (Person 1 / Person 2 behavior); the report is finalized only when the supervisor accepts it. | The user can request successive corrections after each review; the cycle terminates only on explicit user acceptance/finalization. | §3.2 |

### Non-Functional Requirements (Phase 1)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-101 | The application must be delivered as a web application accessible from a normal work environment. | Deployed web app reachable via browser. | §1.7 |
| REQ-102 | All UI/UX, performance, security, and quality non-functional requirements must be defined before implementation (Phases 9, 14, 26, 29, 31). | This spec contains them by the end of Phase 36. | §1.2 (implied by build process) |

### Requirement expansion markers

- Detailed functional requirements for the full problem context: **Phase 2 — DONE (REQ-015..035)**.
- Mental-model extraction and review-loop rules: **Phase 3 — DONE (REQ-036..038)**.
- Supporting features requirements (centralized management, history, exports, multi-branch): **Phase 4**.
- Stack/package rules requirements: **Phase 9**.
- Security requirements: **Phase 29**.
- Non-functional requirements finalization: **Phase 31**.
- Glossary-driven requirement re-check: **Phase 34**.

---

## User Stories

> **Phase 2 seed — enriched in Phase 4 (Supporting Features).** Story IDs: `US-<NNN>`. Format: As a [user], I want [action] so that [value]. Every story carries acceptance criteria and a source trace.

| ID | User story | Acceptance criteria | Source |
|---|---|---|---|
| US-001 | As an Area Supervisor, I want to record one or more Amharic audio narrations describing my day's supervision activities, so that I do not have to write the report manually. | At least one narration can be recorded per day; multiple narrations merge into one daily report (AD-008); audio pipeline rules in Phase 20. | §2.1 |
| US-002 | As an Area Supervisor, I want to review and edit the transcription of my recordings, so that the AI generates the report from accurate text. | Transcription is viewable and editable before generation; edits persist. | §2.1 |
| US-003 | As an Area Supervisor, I want the system to generate a professional, well-structured Amharic daily supervision report in the organization's format, so that I get a boss-ready report without manual writing. | Generation follows the organization's format (Phase 6) with Amharic as a core quality requirement. | §2.1, §2.3.4 |
| US-004 | As an Area Supervisor, I want to review the generated report and request corrections that update only the relevant part, so that correct sections are not unnecessarily rewritten. | A correction request changes only the targeted part; unrelated correct content is preserved. | §2.3.7 |
| US-005 | As an Area Supervisor, I want to centrally manage branches, daily reports, transcriptions, AI conversations, generated reports, and historical records, so that I can organize, search, update, retrieve, and review previous reports. | All listed resources are managed in the unified web application; previous reports are retrievable. | §2.1 |
| US-006 | As an Area Supervisor, I want to produce one daily report covering multiple branches visited in a single day, so that one report captures the whole day. | A single daily report can reference multiple branches. | §2.1, §1.3 |
| US-007 | As an Area Supervisor, I want to export my report to PDF, TXT, CSV, and spreadsheet formats, so that I can deliver it in the boss's preferred form. | All four formats are supported (details in Phase 22). | §2.1 |
| US-008 | As an Area Supervisor, I want my report to remain editable after generation and preserve historical versions, so that later edits never lose earlier versions. | Editing a report preserves version history; prior versions remain retrievable. | §2.1 |
| US-009 | As an Area Supervisor, I want to manage my user profile information, so that my reporting context stays correct. | Profile data is viewable and editable (details in Phase 4/11). | §2.1 |
| US-010 | As an Area Supervisor, I want basic reporting analytics, so that I can monitor reporting activity. | Basic analytics exist in V2 (AD-007); the advanced dashboard stays deferred. | §2.1, §1.7 |

---

## Work Flow

> **Phase 3 build — the core narration→report flow and the review–correction loop from §3. Detailed sub-flows arrive in later phases: authentication (11), supporting-resource management (4), audio recording/STT pipeline (20), AI prompts (21), export (22), and archive/delete/restore lifecycle (35).**

### 1. Actors

| Actor | Role |
|---|---|
| Supervisor (Person 1) | The user; explains the day, reviews the report, requests corrections, finalizes. |
| Addis AI system (Person 2) | The system; transcribes audio, extracts/organizes information, writes the report in Amharic, and updates it on request until the supervisor is satisfied. |

### 2. Core Workflow — Narration To Satisfied Report

| Step | Actor | Action | Output | Source |
|---|---|---|---|---|
| W-01 | Supervisor | Records Amharic audio narration(s) describing the day (one or more narrations per day; all narrations of a day belong to one daily report, AD-008) | Amharic audio recording(s) | §2.1, §3.1, AD-008 |
| W-02 | System | Sends the recorded audio to Addis AI speech-to-text (detailed pipeline in Phase 20) | Transcription (raw material) | §3.3 |
| W-03 | System | The transcription is expected to contain the needed information but is not organized as a final report | Unorganized transcription text | §3.3 |
| W-04 | Supervisor | Reviews and edits the transcription when necessary (REQ-016) | Corrected transcription | §2.1, §3.3 |
| W-05 | System (AI) | Processes, extracts, organizes, and rewrites the information based on the required report rules, report format, tone, and system prompt | Organized report draft | §3.3 |
| W-06 | System (AI) | Writes the report in Amharic, matching the tone of the provided report samples (REQ-032) | Generated Amharic report | §3.3 |
| W-07 | Supervisor | Reviews the generated report | Review decision (satisfied / needs correction) | §3.2 |
| W-08 | Supervisor | If something is wrong, missing, unclear, or not written in the desired way, requests a correction | Correction request | §3.2 |
| W-09 | System (AI) | Updates the report; corrections update only the relevant part without unnecessarily rewriting correct unrelated sections (REQ-034) | Updated report | §2.3.7, §3.2 |
| W-10 | Supervisor + System | Repeats W-07..W-09 until the supervisor is satisfied (correction loop) | Satisfied report | §3.2 |
| W-11 | Supervisor | Accepts/finalizes the report | Final report version | §3.2 (versioning: Phases 24/35) |
| W-12 | System | Delivers/exports the report (PDF, TXT, CSV, spreadsheet) | Exported report | §2.1 (details Phase 22) |

### 3. Work Flow Rules (seeds)

| ID | Rule | Source |
|---|---|---|
| WF-1 | The AI must not treat the transcription as the final report; the transcription is raw material only and the generated report is the organized final output (REQ-037). | §3.3 |
| WF-2 | The app processes narrations as-is: no clarifying-question step in the first workflow (decision OQ-007; re-confirmed in Phases 20/21). | §3.2 (WH questions), OQ-007 |
| WF-3 | The explanation may be conversational, repeated, incomplete at first, or clarified later; the AI organizes it into the report order. | §3.1, §2.3.3 |
| WF-4 | The review–correction loop (W-07..W-10) terminates only when the supervisor explicitly accepts the report (REQ-038). | §3.2 |

### 4. Sub-Flow Coverage Map (later phases)

| Sub-flow | Detailed in | Related steps |
|---|---|---|
| Authentication, login/logout, protected routes | Phase 11 | (precedes W-01) |
| Audio recording, re-recording, validation, upload | Phase 20 | W-01, W-02 |
| Transcription review/correction UI, re-transcription | Phase 20 | W-04 |
| AI prompt requirements and conversation handling | Phase 21 | W-05, W-06, W-09 |
| Export to PDF/TXT/CSV/spreadsheet | Phase 22 | W-12 |
| Supporting-resource flows (branches, history, analytics) | Phase 4 | (parallel flows) |
| Archive, delete, restore lifecycle | Phase 35 | W-11 onward |
| Error states and loading states | Phases 16, 28 | all steps |

---

## User Interactions

> **Phase 3 seed — the mental-model interactions from §3. Later-phase interactions (recording controls, transcription editor, export dialogs, auth, resource CRUD, lifecycle actions) are added in their mapped phases (11, 16, 20, 22, 35). Interaction IDs: `UI-<NNN>`.**

| ID | Interaction | Trigger | Main flow | Success outcome | Failure outcome | Source |
|---|---|---|---|---|---|---|
| UI-001 | Supervisor explains the day | Supervisor starts a new daily report | Supervisor records Amharic audio narration; may mention date, branch(es) visited, entry time, exit time, time range per branch, activities performed, checklist-based work completed, urgent issues/problems, actions taken, people contacted, follow-up needed, general opinions, opinions about issues, suggestions | Audio recording(s) captured for the day | Recording not captured; supervisor retries or re-records (controls detailed in Phase 20) | §3.1, §3.3 |
| UI-002 | System listens and processes | Audio sent to STT | System transcribes via Addis AI; transcription contains the needed information but is not organized as a final report; system does not ask clarifying questions (OQ-007) | Transcription produced (raw material) | STT failure; error state and retry (Phase 20) | §3.2, §3.3 |
| UI-003 | System writes the report | Transcription available | AI extracts, organizes, and rewrites information per report rules/format/tone/system prompt; writes in Amharic matching sample tone | Generated Amharic report presented to the supervisor | Generation failure; error state (Phases 21/28) | §3.2, §3.3 |
| UI-004 | Supervisor reviews the report | Generated report shown | Supervisor reads the report; judges completeness, clarity, and desired style | Review decision made (accept or request correction) | Report regenerated on request (W-09) | §3.2 |
| UI-005 | Supervisor requests a correction | Report not satisfactory | Supervisor states what is wrong, missing, unclear, or not written in the desired way | Correction request captured and routed to the AI | Request not submitted; retry | §3.2, §2.3.7 |
| UI-006 | System updates the report | Correction request received | AI updates only the relevant part; correct unrelated sections are not unnecessarily rewritten | Updated report shown for re-review | Update failure; previous version intact (versioning Phases 24/35) | §3.2, §2.3.7 |
| UI-007 | Supervisor finalizes | Report satisfies the supervisor | Supervisor accepts the report; the correction loop ends | Final report version stored | — | §3.2 |

**Later-phase interaction markers:** recording start/stop/re-record and file-size validation (Phase 20), transcription review/edit UI (Phase 20), export flow (Phase 22), login/logout and protected routes (Phase 11), branch/report/transcription/AI-conversation/profile CRUD (Phase 4), archive/delete/restore (Phase 35), loading/error/empty/unauthenticated states (Phases 16, 28).

---

## Report Domain

> **Phase 3 seed — the domain derived from the manual reporting mental model (§3). Domain details are expanded in Phase 5 (Report And Branch Domain) and the data model in Phase 24.**

### 1. Actors (Person 1 / Person 2 mapping)

| Actor | In the mental model | In the app |
|---|---|---|
| Person 1 | The supervisor who wants a report prepared and explains the day to Person 2 in Amharic | The user (Area Supervisor) |
| Person 2 | A friend of Person 1 with no work relationship to the company; listens, understands, writes the complete report, and updates it until Person 1 is satisfied | The Addis AI-powered system |

### 2. Report Content Elements (what the narration may mention)

The supervisor may mention any of the following (each is a candidate report element; the required format is finalized in Phase 6):

| # | Element | Source |
|---|---|---|
| 1 | The report date | §3.1 |
| 2 | The branch or branches visited | §3.1 |
| 3 | The time he entered work | §3.1 |
| 4 | The time he left work | §3.1 |
| 5 | The time range spent at each branch | §3.1 |
| 6 | The activities performed | §3.1 |
| 7 | The checklist-based work completed | §3.1 |
| 8 | The urgent issues or problems that require attention | §3.1 |
| 9 | The actions taken | §3.1 |
| 10 | The people contacted | §3.1 |
| 11 | The follow-up needed | §3.1 |
| 12 | General opinions about the branch | §3.1 |
| 13 | Opinions about raised issues or problems | §3.1 |
| 14 | Suggestions that could make things better | §3.1 |

These map onto the required end-of-day report elements (date, branch, working time, completed activities, unresolved issues, general opinion, work exit time — §2.2, REQ-030) and the eleven per-branch activities (§2.2). Reconciliation of mentionable items ↔ required format is Phase 6 scope.

### 3. AI Extraction And Generation Responsibilities

The AI is responsible for (all items §3.3):

1. Extracting date information.
2. Extracting branch names.
3. Extracting working time and branch time ranges.
4. Extracting performed activities.
5. Extracting unresolved issues.
6. Extracting urgent problems.
7. Extracting actions already taken.
8. Extracting general opinions.
9. Organizing the extracted information into the required report format.
10. Writing the report in Amharic.
11. Matching the tone of the provided report samples.
12. Correcting or updating the generated report when the user asks after review.

### 4. Domain Rules (seeds)

| ID | Rule | Source |
|---|---|---|
| DR-1 | The transcription is raw material, never the final report; the generated report is the organized final output (REQ-037). | §3.3 |
| DR-2 | The source explanation is natural and conversational; the AI organizes it into the report order (WF-3). | §3.1, §2.3.3 |
| DR-3 | All narrations of a day merge into one daily report (AD-008); the transcription source text is the merged material. | §2.1, AD-008 |
| DR-4 | The review–correction loop (UI-004..007) mirrors the Person 1 / Person 2 relationship: correction requests come only from the supervisor and continue until satisfied. | §3.2 |
| DR-5 | No clarifying-question step in the first workflow; the system processes narrations as-is (OQ-007). | §3.2, OQ-007 |

### 5. Domain Expansion Markers

- Phase 5 (§5 Report And Branch Domain): full report/branch domain — entities, relationships, statuses.
- Phase 6 (§6 Report Format, Samples, And Tone): required-format reconciliation of the 14 mentionable elements with the 7 required report elements.
- Phase 24 (§24 Data Model): persisted data model for reports, transcriptions, narrations, versions.

---

## Decision Log

> **Built in Phases 1–2 — the ADR format and further decisions are finalized in Phase 33 (§33 Decision Log (ADRs)).** Entries are appended as phases complete. No decision recorded here may contradict a later GREEN decision without a superseding ADR.

### ADR Format

| Field | Description |
|---|---|
| ID | `AD-<NNN>` |
| Date | Decision date |
| Status | Proposed / Accepted / Superseded |
| Context | Problem and constraints that led to the decision |
| Decision | The choice made |
| Rationale | Why this choice |
| Consequences | What changes because of this decision |
| Source | Source-brief section(s) (e.g., §1.4) and/or codebase fact |

### ADRs

#### AD-001 — Normalize all project-version wording to V2

- **Date:** 2026-08-01. **Status:** Accepted.
- **Context:** §1.1 names the project Report Builder V2; older documents may still carry older project-version wording.
- **Decision:** Every reference to the project uses V2 terminology, everywhere.
- **Rationale:** The source explicitly requires normalization.
- **Consequences:** Spec, code, docs, and commit messages must never reintroduce older version wording.
- **Source:** §1.1.

#### AD-002 — MERN-style, JavaScript-only stack

- **Date:** 2026-08-01. **Status:** Accepted.
- **Context:** §1.2 defines the project type; `backend/package.json` and `client/package.json` confirm the stack and packages.
- **Decision:** Node.js + Express + MongoDB/Mongoose on the backend, React on the frontend, JavaScript only.
- **Rationale:** Source mandates the stack and the language; package.json files are authoritative for versions.
- **Consequences:** No TypeScript; backend ESM modules (`"type": "module"`); version choices per package.json tables above.
- **Source:** §1.2; codebase facts.

#### AD-003 — Web-only product

- **Date:** 2026-08-01. **Status:** Accepted.
- **Context:** §1.7 excludes mobile native apps.
- **Decision:** The product is delivered as a web application only.
- **Rationale:** Explicit source decision.
- **Consequences:** No iOS/Android codebases; responsive web UI must still work well for the supervisor.
- **Source:** §1.7.

#### AD-004 — Single user type; no RBAC

- **Date:** 2026-08-01. **Status:** Accepted.
- **Context:** §1.7 excludes role-based access control.
- **Decision:** Exactly one user type (Area Supervisor); no roles or permission levels.
- **Rationale:** Explicit source decision.
- **Consequences:** Auth design is single-role; no permission matrices. Authentication details arrive in Phase 11.
- **Source:** §1.7.

#### AD-005 — Deferred features for V2

- **Date:** 2026-08-01. **Status:** Accepted.
- **Context:** §1.7 lists features deferred to later versions.
- **Decision:** TTS, realtime audio processing, advanced analytics dashboard, and automated translation are out of scope for V2.
- **Rationale:** Explicit source decision; keeps focus on the core workflow (product principle, §1.5).
- **Consequences:** No TTS/translation features; analytics is limited to what §2/§4 define (details in Phase 4); audio pipeline processes complete recordings only.
- **Source:** §1.7.

#### AD-006 — Two independent packages, no root package.json

- **Date:** 2026-08-01. **Status:** Accepted.
- **Context:** The repository contains `backend/` and `client/` as separate packages; no root package.json exists.
- **Decision:** Keep the two-package layout; document it in Project Directory Structure (finalized Phase 25).
- **Rationale:** Codebase fact; no contrary requirement in the source.
- **Consequences:** Backend and client have independent dependency trees and scripts.
- **Source:** Codebase facts (§25 will formalize the full tree).

#### AD-007 — Basic reporting analytics in V2; advanced dashboard deferred

- **Date:** 2026-08-01. **Status:** Accepted.
- **Context:** §2.1 requires "reporting analytics" as part of centralized management; §1.7 defers the "advanced analytics dashboard with detailed metrics".
- **Decision:** V2 includes basic reporting analytics (reporting-activity summaries within the unified web application). The advanced analytics dashboard with detailed metrics remains deferred.
- **Rationale:** Both source statements are honored: the advanced dashboard is excluded; the explicitly required basic reporting analytics is included (product principle §1.5 keeps it secondary to the core workflow).
- **Consequences:** REQ-011 (no advanced dashboard) stands; REQ-026 covers basic analytics; US-010 reflects it. Detailed analytics scope is re-confirmed in Phase 4.
- **Source:** §2.1, §1.7.

#### AD-008 — One daily report per day; multiple narrations merge

- **Date:** 2026-08-01. **Status:** Accepted (pipeline behavior re-confirmed in Phases 20/21).
- **Context:** §2.1: the supervisor records "one or more audio narrations" describing "all supervision activities performed during a specific day"; the report is a daily report.
- **Decision:** All narrations of a day belong to one daily report; their transcriptions merge into a single source text for report generation.
- **Rationale:** The source defines a single daily report per day ("specific day", "at the end of each day"); user confirmed the merged-narration reading.
- **Consequences:** The report/transcription model supports one-to-many narration→report; exact merge behavior is re-confirmed with the audio pipeline (Phases 20/21).
- **Source:** §2.1.

### Decision Log open items

- Measurable success KPIs (OQ-001) — decision pending user input.
- Branch count semantics (OQ-002) — pending user input.
- Boss access model (OQ-003) — pending user input.
- Reporting-analytics detail scope (OQ-004, AD-007) — re-checked in Phase 4.
- Narration merge pipeline behavior (OQ-005, AD-008) — re-confirmed in Phases 20/21.
- Checklist tool existence (OQ-006) — pending user input; re-asked in Phase 4/5.
- Clarifying-question behavior (OQ-007) — resolved in Phase 3: the app processes narrations as-is; no clarifying-Q&A step; re-confirmed in Phases 20/21.

---

## End Of Phase 3 Content

Phases 1–3 are GREEN (2026-08-01). Phase 3 built the manual-reporting mental model from §3: new `## Work Flow` (core narration→report cycle W-01..W-12, work-flow rules WF-1..4, sub-flow coverage map), new `## User Interactions` (UI-001..007 with triggers, flows, and outcomes), new `## Report Domain` (Person 1 / Person 2 mapping, 14 report content elements, 12 AI responsibilities, domain rules DR-1..5, expansion markers), enriched `## PRD` (section 5 "until satisfied" loop, new section 11 Mental Model, OQ-007 resolved: process narrations as-is, re-confirmed in Phases 20/21), added REQ-036..038, extended `## Glossary` (Person 1, Person 2, raw material, final output, correction loop), and added the Phase 3 Source Trace Map. Phase 4 will build the supporting features needed because of the core problem (PRD, Requirements, User Stories, Report Management).
