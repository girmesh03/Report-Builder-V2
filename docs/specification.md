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
| 4 | 4. Supporting Features Needed Because Of The Core Problem | GREEN | PRD, Requirements, User Stories, Report Management |
| 5 | 5. Report And Branch Domain | GREEN | Report Domain, Data Modeling, Business Rules, API Contract, Status Machine, Report Management |
| 6 | 6. Report Format, Samples, And Tone | GREEN | Report Format, AI Prompt Spec, Export Spec |
| 7 | 7. Language Rules | GREEN | AI Prompt Spec, Report Format, UI/UX Spec |
| 8 | 8. Transcription Accuracy Requirement | GREEN | Audio Recording STT, Transcription Review, Validation Audit |
| 9 | 9. Technical Stack And Package Rules | GREEN | Rules, Coding Conventions, Architecture, Requirements, Project Directory Structure |
| 10 | 10. Backend Architecture | GREEN | Backend Architecture, Logging, Architecture, API Contract, Project Directory Structure |
| 11 | 11. Authentication, Authorization, Cookies, And Tokens | GREEN | Auth Cookies, Security, API Contract, Data Modeling |
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
| AI Prompt Spec | 6, 7, 18, 19, 21 | GREEN (Phase 7 enrichment) |
| Analytics | 4 (out-of-scope requirement only; product feature deferred) | PENDING |
| API Contract | 5, 10, 11, 18, 20, 22, 24, 28 | GREEN (Phase 11 enrichment) |
| Architecture | 9, 10, 25 | GREEN (Phase 10 enrichment) |
| Audio Recording STT | 8, 20 | GREEN (Phase 8 seed) |
| Auth Cookies | 11 | GREEN (Phase 11 seed) |
| Backend Architecture | 10 | GREEN (Phase 10 seed) |
| Resource Management | 4, 35 | GREEN (Phase 4 seed — content lives in `## Report Management`) |
| Business Rules | 5, 24, 35 | GREEN (Phase 5 seed) |
| Checklists | 26, 30, 31 | PENDING |
| Coding Conventions | 9, 25, 26, 27 | GREEN (Phase 9 seed) |
| Data Modeling | 5, 11, 20, 23, 24, 35 | GREEN (Phase 11 enrichment) |
| Decision Log | 1, 2, 33 | GREEN |
| Design | consolidated across phases; finalized in 36 | PENDING |
| Environment Config | 17 | PENDING |
| Error Handling | 28 | PENDING |
| Export Spec | 6, 22 | GREEN (Phase 6 seed) |
| File Storage Uploads | 20 | PENDING |
| Frontend Architecture | 12, 13, 14 | PENDING |
| Git Workflow | 32 | PENDING |
| Glossary | 1, 2, 34 (final) | GREEN |
| Implementation Plan | 32 | PENDING |
| JSDoc Standards | 26, 27 | PENDING |
| Logging | 10, 28 | GREEN (Phase 10 seed) |
| Mock Data Seeding | 23 | PENDING |
| MUI Component Standards | 12, 14 | PENDING |
| Non-Functional Requirements | 31 | PENDING |
| Other AI Providers | 19 | PENDING |
| Phase Protocol | 32 | PENDING |
| PRD | 1, 2, 3, 4 | GREEN (Phase 4 enrichment) |
| Problem Statement | 1, 2 | GREEN |
| Profile Management | 4 | GREEN (Phase 4 seed) |
| Project Directory Structure | 9, 10, 12, 25, 30 | GREEN (Phase 10 enrichment) |
| Project Overview | 1 | GREEN |
| React Hook Form Standards | 15 | PENDING |
| Redux RTK Query | 13 | PENDING |
| Report Domain | 3, 5, 24 | GREEN (Phase 5 enrichment) |
| Report Format | 6, 7, 21 | GREEN (Phase 7 enrichment) |
| Report Management | 4, 5, 35 | GREEN (Phase 5 enrichment) |
| Requirements | 1, 2, 4, 9, 29, 31, 34 | GREEN (Phase 9 enrichment) |
| Risk Register | pending assignment (candidate: 33/36) | PENDING |
| Routing Layout | 12 | PENDING |
| Rules | 9, 13, 16, 17, 21, 26, 29, 30 | GREEN (Phase 9 seed) |
| Security | 11, 17, 18, 29 | GREEN (Phase 11 seed) |
| Source Traceability | 31 | PENDING |
| Status Machine | 5, 35 | GREEN (Phase 5 seed) |
| Tasks | 32 | PENDING |
| Theme Standards | 14 | PENDING |
| Transcription Review | 8, 20 | GREEN (Phase 8 seed) |
| UI/UX Spec | 7, 12, 14, 15, 16 | GREEN (Phase 7 seed) |
| User Interactions | 3, 16, 22, 35 | GREEN (Phase 3 seed) |
| User Stories | 2 (seed), 4 | GREEN (Phase 2 seed) |
| Validation Audit | 8, 15, 28, 31 | GREEN (Phase 8 seed) |
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

## Source Trace Map — Phase 4 (source §4)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §4 | Authentication, so reports belong to the correct user | PRD (6), Report Management (5), Requirements (REQ-041), User Stories (US-016) |
| §4 | Profile, so supervisor identity can appear in reports | PRD (6), Report Management (2), Requirements (REQ-042), User Stories (US-017), Glossary (Profile Management) |
| §4 | Branch management, so visited branches can be selected | PRD (6), Report Management (2), Requirements (REQ-043), User Stories (US-014) |
| §4 | Report management list and grid views, so previous reports can be found | PRD (6), Report Management (3), Requirements (REQ-044), User Stories (US-013), Glossary (list view, grid view) |
| §4 | Audio recording, so the supervisor can speak instead of writing | PRD (6), Report Management (2) (same as REQ-004/015) |
| §4 | Audio playback and re-recording, so the supervisor can confirm the recording before submission | PRD (5, 6), Report Management (2), Requirements (REQ-040), User Stories (US-012), Glossary (audio playback, re-recording) |
| §4 | Addis AI speech-to-text, so Amharic audio becomes text | PRD (6), Report Management (2), Requirements (REQ-048) |
| §4 | Transcription review by AI, so the user can correct raw AI transcription using AI before report generation | PRD (5, 6), Requirements (REQ-039), User Stories (US-011), Glossary (AI transcription review) |
| §4 | Addis AI text generation, so raw transcription becomes a structured report | PRD (6), Requirements (REQ-049) |
| §4 | Report CRUD, so the user can manage reports | PRD (6), Report Management (4), Requirements (REQ-045), User Stories (US-015) |
| §4 | Branch CRUD, so the user can manage branches | PRD (6), Report Management (4), Requirements (REQ-046), User Stories (US-014) |
| §4 | Export, so the report can be shared or archived | PRD (6), Report Management (2), Requirements (REQ-047), User Stories (US-007 extended) |

---

## Source Trace Map — Phase 5 (source §5)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §5.1 | Company has more than 14 branches; supervisor visits one or more branches per working day | Report Domain (6), PRD (4) |
| §5.1 | Report format must support one branch or multiple branches | Report Domain (6), Business Rules (BR-01), Requirements (REQ-050), User Stories (US-018) |
| §5.1 | Multi-branch reports must preserve branch-specific details | Report Domain (6), Business Rules (BR-02), Requirements (REQ-051), Glossary (branch-specific details) |
| §5.1 | Multi-branch reports must preserve time ranges per branch when the audio contains them | Report Domain (6), Business Rules (BR-03), Requirements (REQ-052), Glossary (per-branch time range) |
| §5.1 | All list endpoints use `mongoose-paginate-v2`: default page 1, default limit 10, max limit 100 | API Contract (1), Business Rules (BR-04), Requirements (REQ-053), Glossary (pagination convention) |
| §5.1 | Branch CRUD required so the user can manage branch records | Report Management (4), Report Domain (6), Requirements (REQ-046), User Stories (US-014) |
| §5.2 | Daily reports belong to the correct authenticated user | Report Domain (7), Business Rules (BR-06), Requirements (REQ-041) |
| §5.2 | Reports remain editable after generation; historical versions preserved | Report Domain (7), Business Rules (BR-07/08), Report Management (6), Requirements (REQ-024/027) |
| §5.2 | Report management requires list and grid views | Report Management (3), Requirements (REQ-044), User Stories (US-013) |
| §5.2 | Previous reports searchable, updateable, retrievable, reviewable | Report Domain (7), Report Management (3), Business Rules (BR-09), Requirements (REQ-055), User Stories (US-019) |
| §5.2 | Report CRUD required so the user can manage reports | Report Management (4), Requirements (REQ-045), User Stories (US-015) |
| §5.2 | Report content generated from reviewed transcription, not directly from raw audio | Report Domain (DR-6), Business Rules (BR-05), Work Flow (W-05), Requirements (REQ-054), Glossary (reviewed transcription) |
| §5.3 | Eight named report fields: ቀን, ብራንች, ስም, ስራ የገባሁበት ሰዓት, የተሰሩ ስራዎች, መፍትሄ የሚፈሉ ጉዳዮች, አጠቃላይ አስተያየት, ከስራ የወጣሁበት ሰዓት | Report Domain (8), Requirements (REQ-056) |
| §5.4 | Manage: daily supervision reports, transcriptions, AI conversations, generated reports, report version history, reporting analytics; fields defined in the data-modeling phase | Report Domain (9), Data Modeling, Requirements (REQ-057) |

---

## Source Trace Map — Phase 6 (source §6)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §6.1 | Required report structure: the eight Amharic sections (ቀን, ብራንች, ስም, ስራ የገባሁበት ሰዓት, የተሰሩ ስራዎች, መፍትሄ የሚፈሉ ጉዳዮች, አጠቃላይ አስተያየት, ከስራ የወጣሁበት ሰዓት) | Report Format (1), Requirements (REQ-058) |
| §6.1 | Format supports one or multiple branches; working-time section shows the time range for each branch when multiple branches are visited | Report Format (1), Requirements (REQ-060), Business Rules (BR-01) |
| §6.2–6.4 | Three report output samples: two-branch, three-branch, one-branch | Report Format (3) |
| §6.5 | Required tone: professional, direct, clear, work-report oriented, supervisor perspective, natural Amharic; not conversational/casual/chatbot-like; conversation is transformed into report language | Report Format (4), AI Prompt Spec (2), Requirements (REQ-064), Glossary (report tone) |
| §6.6 | Sixteen strict AI generation rules | Report Format (5), AI Prompt Spec (PR-01..16), Requirements (REQ-059/062/063/065) |
| §6.6 (rule 6) | Missing info: leave blank or mark not specified per chosen prompt rule — **chosen: leave blank** | AI Prompt Spec (PR-06), Requirements (REQ-062), OQ-009 |
| §6.7 | English/technical words written in common Amharic workplace transliteration (deep fryer → ዲፕ ፍራየር), not English spelling, not literal translation (ጥልቅ መጥበሻ); examples locker → ሎከር, kitchen → ኪችን, exhaust fan → ኤግዝስት ፋን, technician → ቴክኒሻን, store → ስቶር | Report Format (6), AI Prompt Spec (3), Requirements (REQ-061), Glossary (Amharic workplace transliteration) |
| §6.8 | The transcription is raw material only — not organized, polished, or formatted; cannot be used directly as the report | Report Format (7), Report Domain (DR-1), Requirements (REQ-037) |
| §6.9 | Correction/update behavior: update only the relevant part; example correction requests | Report Format (8), AI Prompt Spec (PR-16), Requirements (REQ-034) |
| §6.10–6.11 | Before/after example: conversational transcription → organized report | Report Format (9), AI Prompt Spec (4) |

---

## Source Trace Map — Phase 7 (source §7)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §7 | App shell, navigation, labels, buttons, validation messages, helper text, and everything else in the application interface must be English | UI/UX Spec (1), Requirements (REQ-066), User Stories (US-022), Glossary (interface language rule) |
| §7 | Audio, transcription, AI chat, and report content can be Amharic, English, or mixed | UI/UX Spec (2), AI Prompt Spec (PR-17), Report Format (10), Requirements (REQ-067) |
| §7 | Do not force translation unless the user explicitly chooses it | UI/UX Spec (2), AI Prompt Spec (PR-17), Report Format (10), Requirements (REQ-067), User Stories (US-023), Glossary (content language flexibility) |
| §7 | The conversation language in recorded audio is always Amharic | UI/UX Spec (2), AI Prompt Spec (PR-18), Requirements (REQ-068) |
| §7 | Addis AI selected because it is specialized in Ethiopian Amharic; expected more accurate transcription and report generation than general AI tools | UI/UX Spec (4), Requirements (REQ-069), PRD (6) |

---

## Source Trace Map — Phase 8 (source §8)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §8 | Transcription accuracy is the foundation of the entire product; every subsequent step (AI report generation, export, review) depends on it; garbage transcription produces garbage reports | Audio Recording STT (1), PRD (4), Requirements (REQ-070), User Stories (US-024), Glossary (transcription accuracy) |
| §8 | Every implementation decision related to chunking strategy, format conversion, MIME type, error handling, and provider use must prioritize transcription accuracy over convenience, performance, or code simplicity — which must also be perfect | Audio Recording STT (2), Requirements (REQ-071) |
| §8 | The chunking pipeline and correct MIME type per chunk are critical safeguards; re-transcription must be available to verify accuracy on every audio recording | Audio Recording STT (3), Transcription Review (2), Requirements (REQ-072), User Stories (US-025) |
| §8 | Accuracy regression is a blocking defect; any STT pipeline change that degrades quality must be reverted immediately; accuracy must be verified with real Amharic audio before merging | Audio Recording STT (4), Validation Audit (1), Requirements (REQ-073), Glossary (accuracy regression) |

---

## Source Trace Map — Phase 9 (source §9)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §9.1 | Backend: Node.js, Express, Mongoose, ES Modules only (`"type": "module"`), no CommonJS, no `require()` | Rules (1), Coding Conventions (1), Architecture (2), Requirements (REQ-074/075) |
| §9.1 | Initial backend packages installed in `backend/package.json`; required additional backend packages can be installed | Rules (1), Project Directory Structure (2), Requirements (REQ-079) |
| §9.1 | Frontend: React 19, Vite 8, MUI 9, React Redux, Redux Toolkit, React Router 8, React Hook Form | Rules (1), Architecture (3), Requirements (REQ-076) |
| §9.1 | JavaScript only; no TypeScript (.ts/.tsx/TS config); no Next.js/Remix/other frameworks; no Tailwind; MUI `sx` and `styled()` only | Rules (1), Coding Conventions (1–2), Requirements (REQ-074/076) |
| §9.1 | No automated test frameworks; no zod — manual resolvers with consistent error shape | Rules (1), Coding Conventions (3, 5), Requirements (REQ-077) |
| §9.1 | HTTP client strategy: native `fetch` for Addis AI on the backend; axios for all other service calls; RTK Query `fetchBaseQuery` with `baseQueryWithReauth` | Rules (1), Coding Conventions (4), Requirements (REQ-078) |
| §9.2 | `backend/package.json` and `client/package.json` are the source of truth for package versions; packages are installed; other required packages can be installed if needed | Rules (2), Architecture (4), Requirements (REQ-079) |
| §9.3 | Backend snapshot: `"type": "module"` (reconciled — the actual manifest already changed from commonjs), 16 dependencies, morgan/nodemon devDependencies | Project Directory Structure (2), Glossary (ES Modules) |
| §9.4 | Frontend snapshot: `"type": "module"`, 23 dependencies, 12 devDependencies | Project Directory Structure (3) |

---

## Source Trace Map — Phase 10 (source §10)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §10.1 | All routes mounted under `/api/v1`; route modules registered in `routes/index.js`; no routes registered directly in `app.js`; new modules created in `routes/` and mounted in `routes/index.js` | Backend Architecture (1), Architecture (5), Requirements (REQ-080) |
| §10.2 | Error handling pipeline required; fixed global security middleware order `helmet -> cors -> compression -> cookie-parser -> mongo-sanitize -> rate-limit`; must not be reordered or removed; all middleware present | Backend Architecture (2), Architecture (5), Requirements (REQ-081) |
| §10.3 | One controller file per domain (auth, branch, report, audio, transcription, ai, user, analytics); `express-async-handler` as `asyncHandler` wraps all handlers; no custom wrapper; write controllers use `try/catch/finally` with mongoose sessions and transactions (`startSession`/`startTransaction`/commit-or-abort/`endSession` in `finally`); hooks/instance/static methods support session; `backend/mock/*` injection/wipe supports session; read-only get/list skip transactions; errors via `next(error)` to the global error handler | Backend Architecture (3), Architecture (5), Project Directory Structure (4), Requirements (REQ-082) |
| §10.4 | Pagination via `mongoose-paginate-v2` on all list endpoints; default page 1, default limit 10, max limit 100 | Backend Architecture (4), API Contract (3), Requirements (REQ-053) |
| §10.5 | Backend constants in `backend/utils/constants.js`; client constants in `client/src/utils/constants.js`; no magic values; constants objects `Object.freeze()`-frozen; config via frozen `env` object from `config/env.js`; no direct `process.env` access outside it; validation constants in the constants file | Backend Architecture (5), Architecture (5), Project Directory Structure (4), Requirements (REQ-083) |
| §10.6 | HTTP status codes imported by semantic name from `utils/httpStatus.js`; never hardcode numeric codes | Backend Architecture (6), API Contract (3) |
| §10.7 | Response shape: success `{ success: true, message, data }`; error `{ success: false, message, data }` | Backend Architecture (7), API Contract (3) |
| §10.8 | Graceful shutdown on SIGINT/SIGTERM: `server.close()`, clean up temporary audio chunk files not linked to any report, `mongoose.connection.close()`, `process.exit(1)`; must not be removed or replaced; HTTP server starts before database connection so the health endpoint is reachable without DB | Backend Architecture (8), Architecture (5), Requirements (REQ-084) |
| §10.9 | All logging via `utils/logger.js`; Winston backend only; Morgan development only; `console.log` absolute ban; log levels; child loggers Server/DB/Auth/AI-Addis/AI-Gemini/AI-Nvidia; daily-rotated `logs/` gitignored, 30-day auto-delete; safe-logging rules; AI provider logs (provider, model, status code, timing) without bodies in production | Logging, Project Directory Structure (4), Requirements (REQ-086) |
| §10.10 | Validators check `express-validator` results; 422 failure response `{ success: false, message, data }`; validators in `validators/*.js` one per domain; applied as route middleware before controller; auth email `normalizeEmail({ gmail_remove_dots: false })` | Backend Architecture (9), API Contract (3), Project Directory Structure (4), Requirements (REQ-085) |
| §10.11 | No schema field combines `unique: true` with separate indexes; use `schema.index(..)`; hooks/instance methods/static methods accept session options where relevant | Backend Architecture (10) |

---

## Source Trace Map — Phase 11 (source §11)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §11 | JWT-based authentication; access token duration `15m`; refresh token duration `7d`; both stored in httpOnly cookies; cookie options `httpOnly: true`, `secure` in production, `sameSite: lax` | Auth Cookies (1), Security (1), API Contract (4), Requirements (REQ-087) |
| §11 | No sessions MongoDB collection — zero DB lookups for auth on each request; refresh token rotated on each use to prevent replay | Auth Cookies (1), Security (2), Requirements (REQ-087) |
| §11 | `authenticate` middleware extracts JWT from `req.cookies.accessToken`, verifies the token, looks up the user, checks the user, attaches the user document to `req.user`; uses `req.user._id.toString()` throughout, not `req.user.id` | Auth Cookies (2), Requirements (REQ-088) |
| §11 | Password hashing uses `bcryptjs` in a `pre('save')` hook with 12 salt rounds; `comparePassword(candidatePassword)` uses `bcrypt.compare`; plaintext passwords never compared | Auth Cookies (3), Security (2), Requirements (REQ-089) |
| §11 | Registration form collects only `email` and `password`; no name field; backend auto-extracts `firstName`/`lastName` from the email local part (`beza@gmail.com` → beza/beza; `beza.ayalew@gmail.com` → beza/ayalew); `avatar` and `position` optional, updated later from the Profile page | Auth Cookies (4), Data Modeling (4), Requirements (REQ-090), User Stories (US-026) |
| §11 | Google OAuth registration uses Google-provided data (`firstName`/`lastName` from profile name, `email` from Google account, `avatar` from Google profile picture); no password required; existing users matched by email and signed in; new users auto-created | Auth Cookies (5), Data Modeling (4), Requirements (REQ-091), User Stories (US-027) |
| §11 | OAuth architecture provider-neutral; `oauth.service.js` checks `env.OAUTH_GOOGLE_*` credentials; Google stubbed until credentials configured; future providers extend the service; `GET /oauth/google` route exists with `googleOAuth` controller using `getGoogleOAuthUrl()` service | Auth Cookies (5), API Contract (4), Requirements (REQ-091) |
| §11 | Rate limiting three tiers: global 100 requests per 15 minutes on all endpoints; auth 20 requests per 15 minutes on register and login; AI 10 requests per 1 minute on generation and correction endpoints | Auth Cookies (6), Security (3), Requirements (REQ-092) |
| §11 | Frontend uses `credentials: 'include'` on all calls, including public pages | Auth Cookies (7), Requirements (REQ-093) |
| §11 + §12 (cross-aligned) | Google OAuth button on login/register pages uses a Google icon start adornment and a loading spinner on click; §12 shows the OAuth browser redirect at `http://localhost:4000/api/v1/auth/google`; route naming finalized in Phase 12 | Auth Cookies (5) |

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

> **Terms added in Phases 1–9. The full glossary is built in Phase 34 (§34 Glossary).**

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
| Checklist | A per-branch activity the supervisor follows ("Follow a checklist"); V2 ships no checklist tool — the activity is reportable only (OQ-006 resolved in Phase 4). | §2.2 |
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
| AI transcription review | Correcting the raw AI transcription using AI, performed by the user before report generation. | §4 |
| Audio playback | Playing back a recorded narration so the supervisor can confirm the recording before submission. | §4 |
| Re-recording | Recording a narration again after listening to playback, before submission. | §4 |
| List view | A report management view for finding previous reports. | §4 |
| Grid view | A report management view for finding previous reports, backed by the MUI X Data Grid dependency (component standards in Phase 14). | §4 |
| CRUD | Create, read, update, delete operations; report CRUD and branch CRUD are supporting features. | §4 |
| Pagination convention (list endpoints) | All list endpoints use `mongoose-paginate-v2` with default page 1, default limit 10, and max limit 100. | §5.1, §5.2 |
| Reviewed transcription | The transcription text the supervisor has reviewed (and, if needed, corrected with AI help) before report generation; report content is generated only from it, never directly from raw audio. | §5.2 |
| Branch-specific details | The per-branch information (activities, issues, times) that multi-branch reports must preserve. | §5.1 |
| Per-branch time range | The time range spent at a branch; preserved in multi-branch reports when the audio contains it. | §3.1, §5.1 |
| Required report format | The exact eight-field Amharic report structure (ቀን, ብራንች, ስም, ስራ የገባሁበት ሰዓት, የተሰሩ ስራዎች, መፍትሄ የሚፈሉ ጉዳዮች, አጠቃላይ አስተያየት, ከስራ የወጣሁበት ሰዓት) defined in §6.1 and `## Report Format`. | §5.3, §6.1 |
| Report tone | The required style of generated reports: professional, direct, clear, work-report oriented, from the supervisor's perspective, natural Amharic; not conversational, casual, or chatbot-like. | §6.5 |
| Amharic workplace transliteration | Writing English or technical words in their common Amharic workplace pronunciation (e.g., deep fryer → ዲፕ ፍራየር) instead of English spelling or literal translation. | §6.7 |
| Interface language rule | The application shell, navigation, labels, buttons, validation messages, and helper text must all be English, while content may be Amharic, English, or mixed. | §7 |
| Content language flexibility | Audio, transcription, AI chat, and report content may be Amharic, English, or mixed; translation is never forced unless the user explicitly chooses it. | §7 |
| Transcription accuracy | The quality of the STT output on which the whole product depends; the foundation of report generation, export, and review. | §8 |
| Accuracy regression | A degradation in STT transcription quality caused by a pipeline change; a blocking defect that must be reverted immediately. | §8 |
| ES Modules | The ECMAScript module system used by the backend (`"type": "module"`); CommonJS `require()` is forbidden. | §9.1 |
| MUI sx and styled() | The only allowed styling mechanisms; Tailwind CSS is forbidden. | §9.1 |
| RTK Query | The Redux Toolkit data-fetching layer; uses `fetchBaseQuery` with `baseQueryWithReauth` for API calls. | §9.1 |
| Winston | The backend-only logging library used through `backend/utils/logger.js`; Morgan is used in development mode only; `console.log` is banned in backend code. | §10.9 |
| Graceful shutdown | The mandated backend shutdown sequence on SIGINT/SIGTERM: close the HTTP server, clean up temporary audio chunk files not linked to any report, close the mongoose connection, then exit. | §10.8 |
| Mongoose session | A MongoDB session used for transactions; every backend write controller opens one (`startSession`/`startTransaction`), commits or aborts, and ends it in `finally`; read-only get/list endpoints skip sessions. | §10.3 |
| JWT | JSON Web Token; the authentication mechanism of the app. The access token lasts `15m` and the refresh token `7d`; both are carried in httpOnly cookies. | §11 |
| httpOnly cookie | A cookie not readable by JavaScript; both the access token and the refresh token are stored in httpOnly cookies with `secure` in production and `sameSite: lax`. | §11 |
| Refresh token rotation | The refresh token is rotated (replaced) on each use to prevent replay attacks. | §11 |

---

## PRD

> **Phase 4 state — supporting-features content finalized from §4.**

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
- **Report format supports one or multiple branches** (source: §5.1); multi-branch reports preserve branch-specific details and per-branch time ranges when the audio contains them.
- **Transcription accuracy** (source: §8): transcription accuracy is the foundation of the product — every subsequent step (generation, export, review) depends on it; accuracy is prioritized over convenience, performance, or code simplicity (which must also be perfect); chunking and per-chunk MIME type are critical safeguards; re-transcription verifies accuracy on every recording; accuracy regression is a blocking defect — revert immediately, verify with real Amharic audio before merging.
- **Language rules** (source: §7): the interface is English; audio, transcription, AI chat, and report content may be Amharic, English, or mixed; translation is never forced unless the user explicitly chooses it; the recorded conversation is always Amharic.
- **Required report tone** (source: §6.5): professional, direct, clear, work-report oriented, from the supervisor's perspective, natural Amharic — not conversational, not casual, not chatbot-like.

### 5. Core Workflow (high level)

Derived from §1.4, §2.1, §3, and §4 (detailed interaction workflow in `## Work Flow` and Phases 20–22):

1. The supervisor records **one or more Amharic audio narrations** describing the day's supervision activities; all narrations of a day merge into one daily report (decision AD-008).
2. The supervisor plays back the recording and **re-records if needed**, to confirm the recording before submission (§4).
3. The audio is transcribed (STT) to Amharic text (Addis AI speech-to-text, §4).
4. The supervisor reviews and edits the transcription when necessary, and may correct the raw AI transcription **using AI** before report generation (§4).
5. An AI model optimized for Amharic analyzes the transcription and automatically generates a professional, well-structured daily supervision report that follows the organization's reporting format (Addis AI text generation, §4; required format in `## Report Format` §6.1, tone §6.5, transliteration rule §6.7).
6. The supervisor reviews the generated report and may request corrections; corrections update only the relevant part without unnecessarily rewriting correct unrelated sections, and the review–correction cycle repeats until the supervisor is satisfied (§3.2; correction/update behavior in `## Report Format` §6.9).
7. Reports remain editable after generation and preserve historical versions; a single working day may span multiple branches.
8. The report is exported (PDF, TXT, CSV, spreadsheet — detailed in Phase 22) so it can be shared or archived (§4).

### 6. Supporting Features

Source: §4 (the twelve supporting features) plus §2.1 (centralized management). Detailed behavior lives in `## Report Management`; pipeline mechanics arrive in Phases 11, 12, 20–22.

The twelve supporting features (§4):

1. **Authentication** — so reports belong to the correct user (design in Phase 11).
2. **Profile** — so supervisor identity can appear in reports.
3. **Branch management** — so visited branches can be selected (Branch CRUD, §4).
4. **Report management list and grid views** — so previous reports can be found.
5. **Audio recording** — so the supervisor can speak instead of writing (pipeline in Phase 20).
6. **Audio playback and re-recording** — so the supervisor can confirm the recording before submission.
7. **Addis AI speech-to-text** — so Amharic audio becomes text (integration in Phase 18, pipeline in Phase 20); Addis AI is chosen for its Ethiopian Amharic specialization (§7).
8. **Transcription review by AI** — so the user can correct raw AI transcription using AI before report generation.
9. **Addis AI text generation** — so raw transcription becomes a structured report (format and tone in `## Report Format`, Phase 6).
10. **Report CRUD** — so the user can manage reports.
11. **Branch CRUD** — so the user can manage branches.
12. **Export** — so the report can be shared or archived (details in Phase 22).

Plus centralized management from §2.1 (unified web application): daily reports, transcriptions, AI conversations, generated reports, report version history, user profile information, and basic reporting analytics (AD-007; the metric set is defined in Phase 31 — OQ-004 resolved).

"Follow a checklist" (§2.2) remains a reportable activity only; V2 ships no checklist tool (OQ-006 resolved in Phase 4).

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
| OQ-004 | Basic reporting analytics are in V2 (AD-007); the advanced analytics dashboard stays deferred (§1.7). Confirm the basic-analytics scope when Phase 4 details supporting features. | Resolved in Phase 4: AD-007 stands; the basic-analytics metric set is defined in Phase 31 |
| OQ-005 | Multiple narrations per day merge into one daily report (AD-008). Re-confirm the exact merge/pipeline behavior when Phases 20/21 detail the audio pipeline. | AD-008 (Phase 2); re-checked in Phases 20/21 |
| OQ-006 | "Follow a checklist" (§2.2) is a reportable activity; whether V2 ships a checklist tool is unspecified. | Resolved in Phase 4: no checklist tool in V2; "follow a checklist" is a reportable activity only |
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

### Functional Requirements (Phase 4)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-039 | The supervisor must be able to correct the raw AI transcription using AI before report generation (transcription review by AI). | An AI-assisted transcription-correction step exists and runs before report generation; the corrected text feeds generation. | §4 |
| REQ-040 | The supervisor must be able to play back a recording and re-record it, to confirm the recording before submission. | Recorded audio is playable; re-recording is possible; confirmation happens before submission to STT. | §4 |
| REQ-041 | Authentication must ensure reports belong to the correct user. | Each report is owned by the authenticated supervisor who created it; access is user-scoped (auth design in Phase 11). | §4 |
| REQ-042 | The supervisor profile must be able to appear in reports. | Profile identity fields are available for use in report content (profile in Phase 4 seed, auth in Phase 11). | §4 |
| REQ-043 | Branch management must allow visited branches to be selected. | The supervisor selects the branch(es) visited from the managed branch list when working on a daily report. | §4 |
| REQ-044 | Report management must provide list and grid views so previous reports can be found. | Reports are reachable through a list view and a grid view (view mechanics in Phases 12/13/24). | §4 |
| REQ-045 | The user must be able to manage reports through full CRUD. | Create, read, update, and delete of reports are supported (archive/delete semantics in Phase 35). | §4 |
| REQ-046 | The user must be able to manage branches through full CRUD. | Create, read, update, and delete of branches are supported (branch domain rules in Phase 5). | §4 |
| REQ-047 | Export must let the report be shared or archived. | Exported artifacts (PDF, TXT, CSV, spreadsheet) are produced for sharing/archiving (same as REQ-029; §4 states the purpose). | §4 |
| REQ-048 | Addis AI speech-to-text must turn Amharic audio into text. | Amharic audio is transcribed via the Addis AI STT workflow (same as REQ-017/035; §4 states the purpose). | §4 |
| REQ-049 | Addis AI text generation must turn the raw transcription into a structured report. | The generated report is produced from the transcription by the Addis AI text-generation workflow (same as REQ-017). | §4 |

### Functional Requirements (Phase 5)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-050 | The report format must support one branch or multiple branches. | A single daily report renders for one branch or several branches. | §5.1 |
| REQ-051 | Multi-branch reports must preserve branch-specific details. | Each branch's details (activities, issues, times) remain attributable to that branch in the report. | §5.1 |
| REQ-052 | Multi-branch reports must preserve time ranges per branch when the audio contains them. | When the narration includes per-branch time ranges, they appear per branch in the report. | §5.1 |
| REQ-053 | All list endpoints must use `mongoose-paginate-v2` with default page 1, default limit 10, and max limit 100. | Every list endpoint returns paginated data with the stated defaults and honors a max limit of 100. | §5.1, §5.2 |
| REQ-054 | Report content must be generated from the reviewed transcription, not directly from raw audio. | Generation consumes the reviewed transcription; no path generates a report directly from audio. | §5.2 |
| REQ-055 | Previous reports must be searchable, updateable, retrievable, and reviewable. | Reports can be searched, updated, retrieved, and reviewed (§5.2 states it explicitly). | §5.2 |
| REQ-056 | The generated report must include the eight named fields: ቀን, ብራንች, ስም, ስራ የገባሁበት ሰዓት, የተሰሩ ስራዎች, መፍትሄ የሚፈሉ ጉዳዮች, አጠቃላይ አስተያየት, ከስራ የወጣሁበት ሰዓት. | Each named field is present in the generated report structure (format detail in Phase 6). | §5.3 |
| REQ-057 | The system must manage daily supervision reports, transcriptions, AI conversations, generated reports, report version history, and reporting analytics. | Each record type is managed; detailed fields are defined in the data-modeling phase (Phase 24). | §5.4 |

### Functional Requirements (Phase 6)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-058 | The generated report must follow the exact section structure of the required report format, in this order: ቀን, ብራንች, ስም, ስራ የገባሁበት ሰዓት, የተሰሩ ስራዎች, መፍትሄ የሚፈሉ ጉዳዮች, አጠቃላይ አስተያየት, ከስራ የወጣሁበት ሰዓት. | Generated output uses the §6.1 template structure with all eight sections. | §6.1 |
| REQ-059 | The generated report must be written in Amharic. | Output is Amharic. | §6.6 (rule 1) |
| REQ-060 | When multiple branches are visited, the working-time section must show the time range for each branch. | Per-branch ranges appear in the report (e.g., ከ02:30 - 07:40 መድኃኒዓለም ብራንች). | §6.1 |
| REQ-061 | English or technical words in the audio must be written in common Amharic workplace transliteration (e.g., deep fryer → ዲፕ ፍራየር), never in English spelling and never as literal translations (e.g., not ጥልቅ መጥበሻ). | All English/technical words in output follow the transliteration style. | §6.7 |
| REQ-062 | The AI must not invent missing dates, branch names, times, actions, people, problems, or opinions; missing required information leaves the field blank (OQ-009). | Output contains only transcription-sourced facts; missing fields are blank, never fabricated. | §6.6 (rules 5–6), OQ-009 |
| REQ-063 | The AI must not output an explanation of how the report was generated, must not include unrelated conversation content, and must not include Person 2's questions unless the answer contains report information. | Output is the report only. | §6.6 (rules 13–15) |
| REQ-064 | The generated report must match the required tone: professional, direct, clear, work-report oriented, from the supervisor's perspective, natural in Amharic, not overly decorative, not conversational, not casual, not like a chatbot answer. | Output tone conforms to the §6.5 attributes (detail of REQ-032). | §6.5 |
| REQ-065 | The AI must separate completed activities from unresolved issues, put urgent problems under መፍትሄ የሚፈሉ ጉዳዮች, and put general or improvement opinions under አጠቃላይ አስተያየት. | Content is placed in the correct sections per §6.6 rules 7–9. | §6.6 (rules 7–9) |
| REQ-066 | The application interface must be English: app shell, navigation, labels, buttons, validation messages, helper text, and everything else in the interface. | All UI copy is English; no Amharic UI strings. | §7 |
| REQ-067 | Audio, transcription, AI chat, and report content may be Amharic, English, or mixed, and translation must not be forced unless the user explicitly chooses it. | Content in any of the three forms is accepted and kept; no automatic translation. | §7 |
| REQ-068 | The conversation language in recorded audio is always Amharic. | Recordings are Amharic conversations (STT language handling arrives in Phases 8 and 20). | §7 |
| REQ-069 | Addis AI must be used for transcription and report generation because it is specialized in Ethiopian Amharic and expected to produce more accurate results than general AI tools. | Addis AI is the provider for STT and text generation (rationale re-affirming REQ-017/035/048/049). | §7 |
| REQ-070 | Transcription accuracy is the foundation of the product: every subsequent step (AI report generation, export, review) depends on accurate transcription. | Pipeline decisions treat accuracy as foundational; inaccurate transcription never flows into report generation. | §8 |
| REQ-071 | Every implementation decision related to chunking strategy, format conversion, MIME type, error handling, and provider use must prioritize transcription accuracy over convenience, performance, or code simplicity — while convenience, performance, and code simplicity must also be perfect. | Decisions are justified by accuracy impact; convenience, performance, and simplicity remain excellent. | §8 |
| REQ-072 | The chunking pipeline and correct MIME type per chunk are critical safeguards, and re-transcription must be available to verify accuracy on every audio recording. | Chunking and MIME safeguards are non-negotiable; every recording can be re-transcribed to verify accuracy. | §8 |
| REQ-073 | Accuracy regression is a blocking defect: any change to the STT pipeline (chunking, format conversion, MIME type, language code, provider endpoint) that degrades transcription quality must be reverted immediately, and accuracy must be verified with real Amharic audio before merging. | STT pipeline changes are gated on real-Amharic-audio verification; regressions are reverted immediately. | §8 |
| REQ-074 | All application code must be JavaScript only: no TypeScript, no `.ts`, no `.tsx`, and no TypeScript config. | No TS files or TS config exist in the codebase. | §9.1 |
| REQ-075 | The backend must use ES Modules only (`"type": "module"`): no CommonJS and no `require()`. | Backend code uses `import`/`export`; `backend/package.json` has `"type": "module"`. | §9.1, §9.3 |
| REQ-076 | The frontend must use React 19, Vite 8, MUI 9, React Redux, Redux Toolkit, React Router 8, and React Hook Form; no Next.js, no Remix, no other frameworks, and no Tailwind CSS — styling uses MUI `sx` and `styled()` only. | Frontend stack matches the manifest; styling uses MUI `sx`/`styled()`. | §9.1 |
| REQ-077 | No automated test frameworks and no zod validation library: validation uses manual resolvers with a consistent error shape. | No test framework and no zod in the manifests or code. | §9.1 |
| REQ-078 | HTTP client strategy: Addis AI calls use native `fetch` on the backend; all other service calls use axios; RTK Query uses `fetchBaseQuery` with `baseQueryWithReauth`. | HTTP calls follow the strategy per call site. | §9.1 |
| REQ-079 | `backend/package.json` and `client/package.json` are the source of truth for package versions; the installed packages may be extended with additional required packages. | Manifests govern versions; new required packages may be added. | §9.2 |

### Functional Requirements (Phase 10)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-080 | All routes must be mounted under the `/api/v1` prefix; each route module is registered in `backend/routes/index.js`, which imports and mounts all route modules; no routes are registered directly in `app.js`; new route modules are created in `backend/routes/`, imported, and mounted in `backend/routes/index.js`. | The `/api/v1` mount point exists; `routes/index.js` imports and mounts every route module; `app.js` registers no routes directly. | §10.1 |
| REQ-081 | The global security middleware stack must run in the fixed order `helmet -> cors -> compression -> cookie-parser -> mongo-sanitize -> rate-limit`; the stack must not be reordered or removed, and all middleware must be present. | The six middleware are applied in the stated order; the order and presence are not altered. | §10.2 |
| REQ-082 | Every backend write controller must use `try/catch/finally` with a MongoDB session and transaction (`mongoose.startSession()`, `session.startTransaction()`, commit or abort, `session.endSession()` in `finally`); model hooks, instance methods, and static methods must support the session where relevant; `backend/mock/*` data injection and wipe must support the session; read-only get/list endpoints do not need transactions. | Write handlers open, commit-or-abort, and end sessions in `finally`; read-only endpoints start no transactions. | §10.3 |
| REQ-083 | Backend constants live in `backend/utils/constants.js` (client constants in `client/src/utils/constants.js`) as `Object.freeze()`-frozen objects; no magic values anywhere; all config comes from the frozen `env` object in `backend/config/env.js`; `process.env` is never accessed directly outside that file; validation constants are defined in the constants file, never hardcoded in validator files. | No magic values; constants files are frozen; all environment access routes through `config/env.js`. | §10.5 |
| REQ-084 | The backend must shut down gracefully on SIGINT and SIGTERM: `server.close()`, clean up temporary audio chunk files not linked to any report, `mongoose.connection.close()`, then `process.exit(1)`; graceful shutdown must not be removed or replaced; the HTTP server starts before the database connection so the health endpoint is reachable without the DB. | The full shutdown sequence executes on both signals; the health endpoint responds without a database connection. | §10.8 |
| REQ-085 | Validation must check `express-validator` results in separate files under `backend/validators/*.js` (one per domain), applied as route middleware before the controller handler; validation failure returns 422 with the standard error envelope; auth email validators use `normalizeEmail({ gmail_remove_dots: false })`. | Validator files exist per domain, are mounted on routes, and 422 responses match the envelope. | §10.10 |
| REQ-086 | All backend logging must go through `backend/utils/logger.js` (Winston; backend only, Morgan in development mode only); `console.log` is absolutely banned in backend code; log files are written to a gitignored `logs/` directory, rotated daily, and auto-deleted after 30 days; production logs must not include passwords, JWT token values, raw cookies, API keys or secrets, raw audio contents, full transcription texts, or full generated report texts — message IDs or truncated previews are used instead; AI provider logs record provider, model, status code, and timing without request or response bodies in production. | All logging routes through `utils/logger.js`; no `console.log` in backend code; log file retention and safe-logging rules hold. | §10.9 |

### Functional Requirements (Phase 11)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-087 | Authentication must be JWT-based: access token duration `15m`, refresh token duration `7d`, both stored in httpOnly cookies with cookie options `httpOnly: true`, `secure` in production, and `sameSite: lax`; the refresh token is rotated on each use to prevent replay; there is no sessions MongoDB collection — zero DB lookups for auth on each request. | Tokens have the stated durations, live in httpOnly cookies with the stated options, rotate on use, and no session store exists. | §11 |
| REQ-088 | The `authenticate` middleware must extract the JWT from `req.cookies.accessToken`, verify the token, look up the user, check the user, and attach the user document to `req.user`; it must use `req.user._id.toString()` throughout, never `req.user.id`. | All user references use the stringified `_id`; no `req.user.id` usage exists. | §11 |
| REQ-089 | Passwords must be hashed with `bcryptjs` in a `pre('save')` hook with 12 salt rounds; `comparePassword(candidatePassword)` uses `bcrypt.compare`; plaintext passwords must never be compared. | No plaintext comparison or storage; hashing and comparison follow the stated mechanism. | §11 |
| REQ-090 | The registration form collects only `email` and `password` (no name field); on account creation the backend auto-extracts `firstName` and `lastName` from the email local part (before `@`): first segment = firstName, last segment = lastName (e.g., `beza@gmail.com` → beza/beza; `beza.ayalew@gmail.com` → beza/ayalew); `avatar` and `position` are optional profile fields updated later from the Profile page, not during registration. | Registration has no name field; extracted names match the rule; avatar/position are absent from registration and editable on the Profile page. | §11 |
| REQ-091 | Google OAuth registration must use Google-provided data: `firstName`/`lastName` from the Google profile name, `email` from the Google account, `avatar` from the Google profile picture, and no password; existing users are matched by email and signed in; new users are auto-created with Google data; the OAuth architecture is provider-neutral — `oauth.service.js` checks `env.OAUTH_GOOGLE_*` credentials, Google is stubbed until credentials are configured, and future providers extend this service. | OAuth accounts are created or matched by email with Google data; `oauth.service.js` guards on the Google env credentials; Google flow is stubbed without credentials. | §11 |
| REQ-092 | Rate limiting must have three tiers: global — 100 requests per 15 minutes on all endpoints; auth — 20 requests per 15 minutes on register and login; AI — 10 requests per 1 minute on generation and correction endpoints. | The three tiers apply with the stated limits to the stated endpoints. | §11 |
| REQ-093 | The frontend must send `credentials: 'include'` on all calls, including public pages. | Every frontend API call includes credentials. | §11 |

### Non-Functional Requirements (Phase 1)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-101 | The application must be delivered as a web application accessible from a normal work environment. | Deployed web app reachable via browser. | §1.7 |
| REQ-102 | All UI/UX, performance, security, and quality non-functional requirements must be defined before implementation (Phases 9, 14, 26, 29, 31). | This spec contains them by the end of Phase 36. | §1.2 (implied by build process) |

### Requirement expansion markers

- Detailed functional requirements for the full problem context: **Phase 2 — DONE (REQ-015..035)**.
- Mental-model extraction and review-loop rules: **Phase 3 — DONE (REQ-036..038)**.
- Supporting features requirements (the twelve §4 features): **Phase 4 — DONE (REQ-039..049)**.
- Report and branch domain rules: **Phase 5 — DONE (REQ-050..057)**.
- Report format, samples, and tone rules: **Phase 6 — DONE (REQ-058..065)**.
- Language rules: **Phase 7 — DONE (REQ-066..069)**.
- Transcription accuracy requirements: **Phase 8 — DONE (REQ-070..073)**.
- Technical stack and package rules: **Phase 9 — DONE (REQ-074..079)**.
- Backend architecture rules: **Phase 10 — DONE (REQ-080..086)**.
- Authentication, authorization, cookies, and tokens rules: **Phase 11 — DONE (REQ-087..093)**.
- Stack/package rules requirements: **Phase 9**.
- Security requirements: **Phase 29**.
- Non-functional requirements finalization: **Phase 31**.
- Glossary-driven requirement re-check: **Phase 34**.

---

## User Stories

> **Phase 4 state — supporting-features stories from §4.** Story IDs: `US-<NNN>`. Format: As a [user], I want [action] so that [value]. Every story carries acceptance criteria and a source trace.

| ID | User story | Acceptance criteria | Source |
|---|---|---|---|
| US-001 | As an Area Supervisor, I want to record one or more Amharic audio narrations describing my day's supervision activities, so that I do not have to write the report manually. | At least one narration can be recorded per day; multiple narrations merge into one daily report (AD-008); audio pipeline rules in Phase 20. | §2.1 |
| US-002 | As an Area Supervisor, I want to review and edit the transcription of my recordings, so that the AI generates the report from accurate text. | Transcription is viewable and editable before generation; edits persist. | §2.1 |
| US-003 | As an Area Supervisor, I want the system to generate a professional, well-structured Amharic daily supervision report in the organization's format, so that I get a boss-ready report without manual writing. | Generation follows the organization's format (Phase 6) with Amharic as a core quality requirement. | §2.1, §2.3.4 |
| US-004 | As an Area Supervisor, I want to review the generated report and request corrections that update only the relevant part, so that correct sections are not unnecessarily rewritten. | A correction request changes only the targeted part; unrelated correct content is preserved. | §2.3.7 |
| US-005 | As an Area Supervisor, I want to centrally manage branches, daily reports, transcriptions, AI conversations, generated reports, and historical records, so that I can organize, search, update, retrieve, and review previous reports. | All listed resources are managed in the unified web application; previous reports are retrievable. | §2.1 |
| US-006 | As an Area Supervisor, I want to produce one daily report covering multiple branches visited in a single day, so that one report captures the whole day. | A single daily report can reference multiple branches. | §2.1, §1.3 |
| US-007 | As an Area Supervisor, I want to export my report to PDF, TXT, CSV, and spreadsheet formats, so that I can deliver it in the boss's preferred form or archive it. | All four formats are supported so the report can be shared or archived (§4; details in Phase 22). | §2.1, §4 |
| US-008 | As an Area Supervisor, I want my report to remain editable after generation and preserve historical versions, so that later edits never lose earlier versions. | Editing a report preserves version history; prior versions remain retrievable. | §2.1 |
| US-009 | As an Area Supervisor, I want to manage my user profile information, so that my reporting context stays correct. | Profile data is viewable and editable (details in Phase 4/11). | §2.1 |
| US-010 | As an Area Supervisor, I want basic reporting analytics, so that I can monitor reporting activity. | Basic analytics exist in V2 (AD-007); the advanced dashboard stays deferred. | §2.1, §1.7 |
| US-011 | As an Area Supervisor, I want to correct the raw AI transcription using AI before report generation, so that the report is generated from accurate text. | An AI-assisted transcription-correction step exists and runs before generation. | §4 |
| US-012 | As an Area Supervisor, I want to play back my recording and re-record if needed before submission, so that I can confirm the recording is correct. | Recorded audio is playable and re-recordable before submission to STT. | §4 |
| US-013 | As an Area Supervisor, I want report management in list and grid views, so that I can find previous reports. | Both views exist and make previous reports findable. | §4 |
| US-014 | As an Area Supervisor, I want to manage branches through CRUD, so that I can select visited branches and keep the branch list correct. | Branches can be created, read, updated, and deleted; the daily-report flow allows branch selection. | §4 |
| US-015 | As an Area Supervisor, I want to manage reports through CRUD, so that I can organize my reports. | Reports can be created, read, updated, and deleted (archive/delete semantics in Phase 35). | §4 |
| US-016 | As an Area Supervisor, I want my reports to belong to my authenticated account, so that reports stay correctly attributed. | Reports are user-scoped and owned by the authenticated supervisor (auth design in Phase 11). | §4 |
| US-017 | As an Area Supervisor, I want my profile identity to appear in reports, so that the report identifies me. | Profile identity fields are usable in report content. | §4 |
| US-018 | As an Area Supervisor, I want multi-branch daily reports that preserve branch-specific details and per-branch time ranges, so that each branch's part of the day is accurately represented. | Branch-specific details stay attributed per branch; per-branch time ranges appear when the audio contains them. | §5.1 |
| US-019 | As an Area Supervisor, I want previous reports to be searchable, updateable, retrievable, and reviewable, so that I can find and rework old reports. | Search, update, retrieval, and review of previous reports work (REQ-055). | §5.2 |
| US-020 | As an Area Supervisor, I want the generated report to follow the exact required format and tone, so that the report looks like the samples I expect. | Output conforms to the §6.1 structure and §6.5 tone (REQ-058/064). | §6.1, §6.5 |
| US-021 | As an Area Supervisor, I want English and technical words written in the usual Amharic workplace style, so that the report reads naturally. | Technical words appear transliterated (e.g., ዲፕ ፍራየር), not in English spelling or literal translation (REQ-061). | §6.7 |
| US-022 | As an Area Supervisor, I want the application interface in English, so that I can navigate and understand the controls. | All UI copy (shell, navigation, labels, buttons, validation messages, helper text) is English (REQ-066). | §7 |
| US-023 | As an Area Supervisor, I want my audio, transcription, AI chat, and report content to stay in the language I used, without forced translation. | Content is not translated automatically unless the user explicitly chooses translation (REQ-067). | §7 |
| US-024 | As an Area Supervisor, I want accurate transcription of my Amharic recording, because the report, export, and review all depend on it. | Transcription is accurate; a bad transcription never flows into generation (REQ-070). | §8 |
| US-025 | As an Area Supervisor, I want to re-transcribe any recording to verify accuracy before the report is generated. | Re-transcription is available for every audio recording (REQ-072). | §8 |
| US-026 | As an Area Supervisor, I want to register with only my email and password, so that my first and last name are derived automatically and I can start quickly. | The register form has no name field; the backend extracts firstName/lastName from the email local part (REQ-090). | §11 |
| US-027 | As an Area Supervisor, I want to sign in with Google, so that I can log in without a password. | The OAuth flow signs in existing users by email and auto-creates new accounts with Google data; stubbed until credentials are configured (REQ-091). | §11 |

---

## Report Management

> **Phase 4 seed — the supporting-feature resource management from §4. Detailed data model, search, and lifecycle mechanics arrive in later phases (5, 11, 12, 13, 24, 35).**

### 1. Purpose

The supporting features exist to support the core workflow (§4): the supervisor records audio instead of writing, confirms recordings before submission, receives AI transcription and AI correction, generates the structured report, and manages everything centrally so previous reports can be found.

### 2. Resource Inventory

| Resource | Supporting feature | Managed in |
|---|---|---|
| User profile | Profile — supervisor identity appears in reports (§4) | Profile Management (Phase 4 seed); auth Phase 11 |
| Branches | Branch management — visited branches selected; Branch CRUD (§4) | Report Management (this section); branch domain Phase 5 |
| Daily reports | Report management list and grid views; Report CRUD (§4) | Report Management (this section); data model Phase 24 |
| Audio narrations (recordings) | Audio recording; playback and re-recording (§4) | Report Management (this section); pipeline Phase 20 |
| Transcriptions | Addis AI speech-to-text; transcription review by AI (§4) | Report Management (this section); pipeline Phase 20 |
| AI conversations | Addis AI text generation (§4) | Report Management (this section); prompts Phase 21 |
| Generated reports + versions | Report CRUD (§4); version history (§2.1) | Report Management (this section); data model Phase 24 |
| Exports | Export — share or archive (§4) | Export Spec (Phase 22) |
| Reporting analytics | Basic analytics (AD-007; metric set defined in Phase 31) | Analytics (Phase 31) |

### 3. Report Management Views

- **List view** — find previous reports (§4); mechanics (columns, pagination, sorting, filtering) in Phases 12/13/24; backend pagination dependency `mongoose-paginate-v2` (codebase fact).
- **Grid view** — find previous reports (§4); backed by the MUI X Data Grid dependency `@mui/x-data-grid` (codebase fact); component standards in Phase 14.
- Search, retrieve, and review of previous reports (§2.1, §5.2) are served by these views.
- **Pagination convention (§5.1, §5.2, REQ-053, BR-04):** all list endpoints use `mongoose-paginate-v2` with default page 1, default limit 10, and max limit 100.
- **Searchability (§5.2, REQ-055):** previous reports must be searchable, updateable, retrievable, and reviewable.

### 4. CRUD Matrix

| Resource | Create | Read | Update | Delete | Notes |
|---|---|---|---|---|---|
| Reports | Yes (REQ-045) | Yes | Yes (editable after generation, §2.1) | Yes (archive/delete semantics in Phase 35) | REQ-027/045 |
| Branches | Yes (REQ-046) | Yes | Yes | Yes | Branch domain rules in Phase 5 |
| Profile | Yes (via auth registration, Phase 11) | Yes | Yes | — | REQ-025/042 |
| Transcriptions / AI conversations | Yes (pipeline) | Yes | Yes (transcription editing, REQ-016/039) | — | Phases 20/21/24 |

### 5. Ownership Rule

Authentication exists so reports belong to the correct user (§4, REQ-041). All report-related resources are scoped to the authenticated supervisor; auth/cookies/tokens design arrives in Phase 11.

### 6. Lifecycle Seeds

- Daily report lifecycle (detailed in Phase 35): created → recorded/transcribed → reviewed (transcription) → generated → reviewed/corrected → finalized → exported → archived/deleted/restored.
- Multi-branch days: one daily report covers one or more branches (§2.1, §5.1, REQ-014/028/050).
- **Generation source (§5.2, REQ-054, BR-05):** report content is generated only from the reviewed transcription, never directly from raw audio.
- **Version preservation (§5.2, REQ-024/027):** reports remain editable after generation and preserve historical versions.

### 7. OQ Resolutions (Phase 4)

- **OQ-004:** basic reporting analytics stays per AD-007; the metric set is defined in Phase 31.
- **OQ-006:** no checklist tool in V2; "follow a checklist" is a reportable activity only.

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
| W-02 | System | Sends the recorded audio to Addis AI speech-to-text (detailed pipeline in Phase 20; accuracy is the governing priority per §8) | Transcription (raw material) | §3.3, §8 |
| W-03 | System | The transcription is expected to contain the needed information but is not organized as a final report | Unorganized transcription text | §3.3 |
| W-04 | Supervisor | Reviews and edits the transcription when necessary (REQ-016) | Corrected transcription | §2.1, §3.3 |
| W-05 | System (AI) | Processes, extracts, organizes, and rewrites the information based on the required report rules, report format, tone, and system prompt; generation runs only from the reviewed transcription, never directly from raw audio (§5.2); required format per §6.1 | Organized report draft | §3.3, §5.2, §6.1 |
| W-06 | System (AI) | Writes the report in Amharic, matching the tone of the provided report samples (REQ-032; tone attributes §6.5) | Generated Amharic report | §3.3, §6.5 |
| W-07 | Supervisor | Reviews the generated report | Review decision (satisfied / needs correction) | §3.2 |
| W-08 | Supervisor | If something is wrong, missing, unclear, or not written in the desired way, requests a correction | Correction request | §3.2 |
| W-09 | System (AI) | Updates the report; corrections update only the relevant part without unnecessarily rewriting correct unrelated sections (REQ-034; correction behavior §6.9) | Updated report | §2.3.7, §3.2, §6.9 |
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
| UI-003 | System writes the report | Transcription available | AI extracts, organizes, and rewrites information per report rules/format/tone/system prompt; writes in Amharic matching sample tone (§6.1 structure, §6.5 tone, §6.7 transliteration) | Generated Amharic report presented to the supervisor | Generation failure; error state (Phases 21/28) | §3.2, §3.3, §6 |
| UI-004 | Supervisor reviews the report | Generated report shown | Supervisor reads the report; judges completeness, clarity, and desired style | Review decision made (accept or request correction) | Report regenerated on request (W-09) | §3.2 |
| UI-005 | Supervisor requests a correction | Report not satisfactory | Supervisor states what is wrong, missing, unclear, or not written in the desired way | Correction request captured and routed to the AI | Request not submitted; retry | §3.2, §2.3.7 |
| UI-006 | System updates the report | Correction request received | AI updates only the relevant part; correct unrelated sections are not unnecessarily rewritten (behavior §6.9) | Updated report shown for re-review | Update failure; previous version intact (versioning Phases 24/35) | §3.2, §2.3.7, §6.9 |
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
| DR-6 | Report content is generated only from the reviewed transcription, never directly from raw audio (REQ-054). | §5.2 |
| DR-7 | The report format supports one or multiple branches; branch-specific details and per-branch time ranges (when present in the audio) are preserved (REQ-050..052). | §5.1 |

### 6. Branch Context Rules (§5.1)

- The company has more than 14 branches in Addis Ababa, Ethiopia (§5.1).
- A supervisor may visit one or more branches in one working day (§5.1).
- The report format must support one branch or multiple branches (§5.1, REQ-050, BR-01).
- Multi-branch reports must preserve branch-specific details (§5.1, REQ-051, BR-02).
- Multi-branch reports must preserve time ranges per branch when the audio contains them (§5.1, REQ-052, BR-03).
- Branch CRUD is required so the user can manage branch records (§5.1, REQ-046; CRUD matrix in `## Report Management`).

### 7. Report Context Rules (§5.2)

- Daily reports belong to the correct authenticated user (§5.2, REQ-041, BR-06).
- Reports remain editable after generation (§5.2, REQ-027, BR-07).
- Reports preserve historical versions (§5.2, REQ-024, BR-08).
- Report management requires list and grid views (§5.2, REQ-044).
- Previous reports must be searchable, updateable, retrievable, and reviewable (§5.2, REQ-055, BR-09).
- Report CRUD is required (§5.2, REQ-045).
- Report content must be generated from the reviewed transcription, not directly from raw audio (§5.2, REQ-054, BR-05, DR-6).
- All list endpoints use `mongoose-paginate-v2` with default page 1, default limit 10, and max limit 100 (§5.2; also §5.1, REQ-053, BR-04).

### 8. Named Report Fields (§5.3)

The generated report must include the following eight named fields (Amharic as recorded in the source; format and tone detail in Phase 6):

| Field (Amharic) | Meaning |
|---|---|
| ቀን | Date |
| ብራንች | Branch |
| ስም | Name |
| ስራ የገባሁበት ሰዓት | Work entry time |
| የተሰሩ ስራዎች | Completed works (activities) |
| መፍትሄ የሚፈሉ ጉዳዮች | Issues needing solution (unresolved issues) |
| አጠቃላይ አስተያየት | General opinion |
| ከስራ የወጣሁበት ሰዓት | Work exit time |

Note: §2.2 lists seven required elements (date, branch, working time, completed activities, unresolved issues, general opinion, work exit time); §5.3 names eight fields — it adds ስም (name) and splits "working time" into explicit entry and exit times. **Resolved in Phase 6:** the canonical structure is the §6.1 template with the eight named fields in fixed order (`## Report Format` §2; REQ-058).

### 9. Record Types Inventory (§5.4)

The system must manage: daily supervision reports, transcriptions, AI conversations, generated reports, report version history, and reporting analytics (§5.4; REQ-057). Detailed fields for those records are not fully specified in the source and are defined in the data-modeling phase (Phase 24).

### 10. Domain Expansion Markers

- Phase 5 (§5 Report And Branch Domain): **DONE — branch/report context rules, named report fields, record types inventory (sections 6–9 above); data-model fields remain Phase 24 scope.**
- Phase 6 (§6 Report Format, Samples, And Tone): **DONE — required format, samples, tone, strict generation rules, transliteration rule, correction behavior (`## Report Format`).**
- Phase 24 (§24 Data Model): persisted data model for reports, transcriptions, narrations, versions.

---

## Data Modeling

> **Phase 5 seed — entity inventory derived from §5.4. Detailed fields are defined in Phase 24 (§5.4: "must be defined during the data-modeling phase"). Expanded in Phases 11, 20, 23, 35.**

### 1. Entity Inventory (seeds)

| Entity | Purpose | Source |
|---|---|---|
| User | The authenticated supervisor; owner of reports; profile identity appears in reports | §4, §5.2 |
| Branch | A restaurant location under the supervisor's area; managed via Branch CRUD | §5.1 |
| DailyReport | The daily supervision report; belongs to one user; covers one or more branches; editable after generation; preserves versions | §5.1, §5.2 |
| Narration (audio recording) | One recorded audio explanation; one or more per day | §3, §4 |
| Transcription | Text produced from narration audio; reviewed/corrected by the user with AI help before generation | §4, §5.2 |
| AIConversation | Recorded exchange with the AI associated with report generation | §2.1, §5.4 |
| GeneratedReport | The AI-produced report output; distinct from its version history | §2.1, §5.4 |
| ReportVersion | A preserved historical version of a report after edits | §2.1, §5.2 |
| Analytics | Basic reporting analytics (AD-007; metric set defined in Phase 31) | §2.1, AD-007 |

### 2. Relationship Seeds

- User 1—N DailyReport (reports belong to the correct authenticated user, §5.2).
- DailyReport 1—N Narration; 1—N Transcription (all narrations of a day merge into one daily report, AD-008).
- DailyReport 1—N Branch (multi-branch days, §5.1).
- DailyReport 1—1 GeneratedReport (current); 1—N ReportVersion (version history, §5.2).
- DailyReport 1—N AIConversation (§2.1).

### 3. Field-Level Definition Marker

Field-level schema (names, types, constraints, indexes, pagination keys) is Phase 24 scope per §5.4; the seeds here are entity-level only.

### 4. User Entity Seeds (Phase 11)

Fields mandated by §11 (entity-level; full field-level schema remains Phase 24):

| Field | Rule | Source |
|---|---|---|
| firstName | Derived automatically from the email local part at registration (first segment), or from the Google profile name for OAuth accounts; optional profile updates later | §11 |
| lastName | Derived automatically from the email local part (last segment), or from the Google profile name; optional profile updates later | §11 |
| fullName | Schema virtual: `\`${this.firstName} ${this.lastName}\`.trim()`; schema options include `toJSON: { virtuals: true }` and `toObject: { virtuals: true }` | §12.3.3 (cross-aligned) |
| email | Unique; the account identifier; OAuth users matched by email | §11, §10.11 |
| password | bcryptjs-hashed (`pre('save')` hook, 12 salt rounds); required for email registration; no password required for Google OAuth-created accounts; plaintext never compared | §11 |
| avatar | Optional profile field; set from Google profile picture for OAuth accounts; updated from the Profile page | §11 |
| position | Optional profile field; updated from the Profile page | §11 |

- No sessions MongoDB collection and no token collection: nothing beyond the User document is stored for auth (REQ-087).
- User 1—N DailyReport ownership relationship per §2 Relationship Seeds (BR-06, REQ-041).

---

## Business Rules

> **Phase 5 seed — rules derived from §5. Expanded in Phases 24 (data model) and 35 (lifecycle). Rule IDs: `BR-<NN>`.**

| ID | Rule | Source |
|---|---|---|
| BR-01 | The report format must support one branch or multiple branches. | §5.1 (REQ-050) |
| BR-02 | Multi-branch reports must preserve branch-specific details. | §5.1 (REQ-051) |
| BR-03 | Multi-branch reports must preserve time ranges per branch when the audio contains them. | §5.1 (REQ-052) |
| BR-04 | All list endpoints use `mongoose-paginate-v2` with default page 1, default limit 10, and max limit 100. | §5.1, §5.2 (REQ-053) |
| BR-05 | Report content is generated from the reviewed transcription, never directly from raw audio. | §5.2 (REQ-054) |
| BR-06 | Daily reports belong to the correct authenticated user. | §5.2 (REQ-041) |
| BR-07 | Reports remain editable after generation. | §5.2 (REQ-027) |
| BR-08 | Reports preserve historical versions. | §5.2 (REQ-024) |
| BR-09 | Previous reports must be searchable, updateable, retrievable, and reviewable. | §5.2 (REQ-055) |
| BR-10 | Branch CRUD and Report CRUD are required. | §5.1, §5.2 (REQ-045/046) |

---

## API Contract

> **Phase 5 seed — conventions and endpoint inventory from §5; response envelope, status codes, and validation shapes added in Phase 10 (§10); authentication endpoints added in Phase 11 (§11). Detailed request/response schemas and paths arrive in Phases 12, 18, 20, 22, 24, and 28.**

### 1. Conventions (seeds)

- RESTful JSON API over HTTP(S); JavaScript/Express backend (AD-002).
- **Pagination:** every list endpoint uses `mongoose-paginate-v2` with default page `1`, default limit `10`, and max limit `100` (§5.1, §5.2, REQ-053, BR-04).
- Single user type; endpoints are user-scoped (ownership, §5.2); auth/cookies/tokens design in Phase 11.
- Response envelope is defined in Phase 10 (§10.7): success `{ success: true, message, data }`, error `{ success: false, message, data }`; per-endpoint schemas are detailed in Phases 24/31.

### 2. Endpoint Inventory (seeds)

| Resource | Operations | Detail phase |
|---|---|---|
| Branches | list, get, create, update, delete (Branch CRUD, §5.1) | Paths/schemas: Phases 10/24 |
| Daily reports | list, get, create, update, delete (Report CRUD, §5.2) | Paths/schemas: Phases 10/24 |
| Narrations / audio | upload, playback, re-record support | Phase 20 |
| Transcriptions | review/update, AI correction | Phase 20 |
| AI conversations | list/get per report | Phases 18/21 |
| Exports | PDF/TXT/CSV/spreadsheet generation | Phase 22 |

### 3. Response Envelope, Status Codes, And Validation (Phase 10)

- **Response envelope (§10.7):** every successful backend response uses `{ success: true, message: "..", data: {..} }`; every error response uses `{ success: false, message: "..", data: {..} }`.
- **HTTP status codes (§10.6):** imported by semantic name from `backend/utils/httpStatus.js`; numeric status codes are never hardcoded.
- **Validation errors (§10.10):** `express-validator` middleware in `backend/validators/*.js` (one file per domain), applied on the route before the controller handler; failures return `422` with the standard error envelope `{ success: false, message, data }`.
- **Pagination (§10.4):** every list endpoint uses `mongoose-paginate-v2` with default page `1`, default limit `10`, and max limit `100` (REQ-053).

### 4. Authentication Endpoints (Phase 11)

| Endpoint | Purpose | Contract seeds |
|---|---|---|
| `POST /api/v1/auth/register` | Account creation; body `{ email, password }` only — no name field; backend extracts firstName/lastName from the email local part; 201 success returns the user with the `fullName` virtual | §11; paths/schemas detail in Phase 12 |
| `POST /api/v1/auth/login` | Sign in; body `{ email, password }`; 200 success; backend sets the `accessToken` (15m) and `refreshToken` (7d) as httpOnly cookies via `Set-Cookie` | §11; paths/schemas detail in Phase 12 |
| `GET /api/v1/auth/me` | Current authenticated user; used by the frontend route guards on mount | §12.4 (route guards); detail in Phase 12 |
| `GET /oauth/google` | Google OAuth start route; `googleOAuth` controller using `getGoogleOAuthUrl()` service; stubbed until `env.OAUTH_GOOGLE_*` credentials are configured | §11; §12 shows the browser redirect at `http://localhost:4000/api/v1/auth/google` — route naming finalized in Phase 12 |

- All auth endpoints are mounted under the `/api/v1` prefix per §10.1 (REQ-080).
- Outcome statuses: `401` invalid credentials, `422` validation failure, `429` rate limited — all with the §10.7 envelope (`{ success: false, message, data }`).
- Rate limits per tier: global 100/15min (all endpoints), auth 20/15min (register, login), AI 10/1min (generation, correction) (REQ-092).

---

## Status Machine

> **Phase 5 seed — report lifecycle statuses derived from the Work Flow (W-01..W-12) and §5.2. Exact state names and archive/delete/restore transitions are finalized in Phase 35.**

### 1. Report States (seeds)

| State | Meaning | Entered via |
|---|---|---|
| CREATED | Daily report opened; recording may begin | W-01 |
| TRANSCRIBING | Narration(s) submitted to STT | W-02, W-03 |
| TRANSCRIPTION_REVIEWED | Transcription reviewed/corrected by the supervisor | W-04 |
| GENERATED | AI report produced from reviewed transcription | W-05, W-06 |
| FINALIZED | Supervisor satisfied; report accepted | W-07..W-11 |
| EXPORTED | Report delivered in an export format | W-12 |
| ARCHIVED / DELETED | Lifecycle end states | Phase 35 |

### 2. Transition Rules (seeds)

- Generation happens only from TRANSCRIPTION_REVIEWED (reviewed transcription), never from raw audio (§5.2, BR-05, DR-6).
- Review–correction loops (W-07..W-10) keep the report in GENERATED until the supervisor finalizes it (REQ-038).
- FINALIZED reports remain editable after generation and preserve historical versions (§5.2, BR-07/08).
- Archive/delete/restore transitions and exact state names: Phase 35.

### 3. Scope

The status machine covers the daily report lifecycle only; branch and user records have no status lifecycle (the source does not define one).

---

## Report Format

> **Phase 6 build — the required Amharic report format, samples, and tone from §6. Language rules continue in Phase 7; prompt construction in Phase 21; export mechanics in Phase 22.**

### 1. Required Report Structure (§6.1)

The generated report must follow this Amharic structure:

```text
ቀን: [ቀን]
ብራንች: [ብራንች ስም]
ስም: [ሙሉ ስም]
ስራ የገባሁበት ሰዓት: [ሰዓት]

የተሰሩ ስራዎች:
 - [ስራ 1]
 - [ስራ 2]
 - [ስራ 3]

መፍትሄ የሚፈሉ ጉዳዮች:
 - [ችግር 1]
 - [ችግር 2]

አጠቃላይ አስተያየት:
 - [አስተያየት 1]
 - [አስተያየት 2]

ከስራ የወጣሁበት ሰዓት፡ [ሰዓት]
```

- Eight sections, in fixed order (REQ-058): ቀን, ብራንች, ስም, ስራ የገባሁበት ሰዓት, የተሰሩ ስራዎች, መፍትሄ የሚፈሉ ጉዳዮች, አጠቃላይ አስተያየት, ከስራ የወጣሁበት ሰዓት.
- **One or multiple branches:** the format must support one branch or multiple branches (§5.1, REQ-050). When multiple branches are visited, the working-time section shows the time range for each branch (§6.1, REQ-060).
- Example of the multi-branch working-time section:

```text
ስራ የገባሁበት ሰዓት:
ከ02:30 - 07:40 መድኃኒዓለም ብራንች
ከ07:55 - 12:20 ኤርፖርት ብራንች
```

> **Source punctuation note (not invented here):** the §6.1 template writes the exit-time label as `ከስራ የወጣሁበት ሰዓት፡` (Ethiopic `፡`) while the §6.2–6.4 samples write it as `ከስራ የወጣሁበት ሰዓት:`. Both forms are recorded above as in the source; the exact punctuation rule is fixed in Phase 21 (prompt requirements).

### 2. Field Reconciliation

- §2.2 requires seven elements (date, branch, working time, completed activities, unresolved issues, general opinion, work exit time — REQ-030).
- §5.3 names eight fields (REQ-056), adding ስም (name) and splitting "working time" into explicit entry and exit times.
- §3.1 lists fourteen mentionable items the narration may contain; these map into the eight sections (activities → የተሰሩ ስራዎች, urgent problems → መፍትሄ የሚፈሉ ጉዳዮች, opinions → አጠቃላይ አስተያየት, times → entry/exit and per-branch ranges, branches → ብራንች).
- **Canonical result:** the §6.1 template with the eight named fields in fixed order is the required format (REQ-058). Both earlier lists are satisfied by it; nothing beyond the eight sections may be added to the structure (REQ-063).

### 3. Report Output Samples (§6.2–6.4)

The AI must match the tone and writing style of these samples (REQ-032). All three samples are reproduced from the source:

**Sample 1 — two branches (source §6.2):**

```text
ቀን: 29-10-18
ብራንች: መድኃኒዓለም / ኤርፖርት
ስም: ቤዛ አያሌው
ስራ የገባሁበት ሰዓት: 2:30
ከ02:30 - 07:40 መድኃኒዓለም ብራንች
ከ07:55 - 12:20 ኤርፖርት ብራንች

የተሰሩ ስራዎች:
በመድኃኒዓለምና በኤርፖርት ቅርንጫፎች በቼክሊስቱ መሰረት የዕለት ተዕለት የአሰራር ሂደቶችን፣ የንፅህና ሁኔታዎችን እና የሰራተኞችን ዝግጁነት አረጋግጫለሁ።
በመድኃኒዓለም ብራንች ትናንት ሪፖርት የተደረጉት ሁሉም የጥገና ችግሮች አሁን ላይ ተስተካክለዋል።
በኤርፖርት ቅርንጫፍ የአዲሶቹ ሶፋዎች እግሮች መሰበራቸውን ለቶማስ አሳውቄው፤ እሱም ነገ ቴክኒሻን እንደሚልክ ገልጾልኛል።

መፍትሄ የሚፈሉ ጉዳዮች:
በኤርፖርት ቅርንጫፍ፡ የወንዶች ሎከር ጣሪያ አሁንም እያፈሰሰ ነው፤ ይህ ችግር ከዚህ ቀደም (13-10-18) ሪፖርት የተደረገ ሲሆን እልባት አላገኝም። በተጨማሪም በኪችን ውስጥ ያለው የጭስ ማስወጫ ኤግዝስት ፋን መጽዳት ይፈልጋል፣ የበርገር ሥጋው መጠኑ አነስተኛ ሲሆን ከዳቦ ጋር የተመጣጠነ አይደለም። ስለሆነም እነዚህ ችግሮች መፍትሄ እንዲያገኙ እጠይቃለሁ።

አጠቃላይ አስተያየት:
በሁለቱም ቅርንጫፎች የሥራ እንቅስቃሴው ጥሩ ነበር።

ከስራ የወጣሁበት ሰዓት: 12:20
```

**Sample 2 — three branches (source §6.3):**

```text
ቀን: 26-10-18
ብራንች: ኤርፖርት / መድኃኒዓለም / ቡልቡላ
ስም: ቤዛ አያሌው
ስራ የገባሁበት ሰዓት:
ከ01:50 - 04:10 ኤርፖርት ብራንች
ከ04:20 - 07:30 መድኃኔዓለም ብራንች
ከ08:05 - 12:30 ቡልቡላ ብራንች

የተሰሩ ስራዎች:
በኤርፖርትና በመድኃኒዓለም ብራንቾች በቼክሊስቱ መሠረት የዕለት ተዕለት የአሠራር ሂደቶችን፣ የንፅህና ሁኔታዎችን እና የሠራተኞችን ዝግጁነት አረጋግጫለሁ።
በቡልቡላ ብራንች በተዘጋጀው የካሸሮች ሥልጠና ላይ ተሳትፌያለሁ።

መፍትሄ የሚፈሉ ጉዳዮች:
ለሳምቡሳ ዝግጅት የሚያስፈልጉ ግብዓቶች ስቶር ባለመኖራቸው፣ ወደ ብራንቹ ሳምቡሳ አልተላከም። ስለዚህ በተቻለ ፍጥነት ግብዓቶቹ እንዲሟሉ እጠይቃለሁ።
በመድኃኒዓለም ብራንች የግሪሉ ግማሽ ክፍል አይሠራም። በመሆኑም ማቲያስ በተቻለ ፍጥነት እንዲጠግነው ጥሪ አድርጌ ነበር፤ ነገር ግን ሥራ እንደበዛበት አስታውቆኛል፣ ቢሆንም አሁንም እንዲስተካከል እጠይቃለሁ።

አጠቃላይ አስተያየት:
በአጠቃላይ በሦስቱም ቅርንጫፎች የሥራ እንቅስቃሴው ጥሩ ነበር።

ከስራ የወጣሁበት ሰዓት: 12:30
```

**Sample 3 — one branch (source §6.4):**

```text
ቀን: 22-10-18
ብራንች: መድኃኒዓለም
ስም: ቤዛ አያሌው
ስራ የገባሁበት ሰዓት: 01:55

የተሰሩ ስራዎች:
በቼክሊስቱ መሰረት በመድኃኒዓለም ቅርንጫፍ የሚከናወኑ መደበኛ የአሰራር ሂደቶች፣ የንፅህና አጠባበቅ ሁኔታ እና የሰራተኞች ዝግጁነት በተገቢው መልኩ መሆናቸውን አረጋግጫለሁ።
ኤፍሬም በህመም እረፍት ላይ ስለነበር የእሱን የሥራ ቦታ ሸፍኜያለሁ።

መፍትሄ የሚፈሉ ጉዳዮች:
በዋናው መግቢያ በር ላይ የሚቀመጠው ምንጣፍ (ካርፔት) እንዲገዛልን ቀደም ሲል ጠይቄ የነበረ ሲሆን አሁንም በተቻለ ፍጥነት እንዲሟላልን እጠይቃለሁ።

አጠቃላይ አስተያየት:
በአጠቃላይ የሥራ እንቅስቃሴው ጥሩ ነበር።

ከስራ የወጣሁበት ሰዓት: 09:30
```

Sample observations (source-factual, for the AI prompt and validation):

- Branch line lists all visited branches separated by `/` (e.g., `መድኃኒዓለም / ኤርፖርት`).
- When multiple branches are visited, `ስራ የገባሁበት ሰዓት:` is followed by one time-range line per branch (`ከ[from] - [to] [branch] ብራንች`), preserving branch-specific details and per-branch time ranges (REQ-051/052/060).
- Completed activities are written as full sentences, not bullet fragments; unresolved issues and opinions are likewise prose under their section headings.
- The report contains only the eight sections; no explanations or extra commentary (REQ-063).

### 4. Required Report Tone (§6.5)

The generated report must sound like the samples above. The tone must be:

- Professional.
- Direct.
- Clear.
- Work-report oriented.
- Written from the supervisor's perspective.
- Suitable to present to a boss.
- Natural in Amharic.
- Not overly decorative.
- Not conversational.
- Not casual.
- Not like a chatbot answer.

The AI must transform conversation into report language. Example: if the audio says something conversational like `እኔ ዛሬ መድኃኒዓለም ሄጄ ቼክሊስቱን አይቼ ነበር`, the report must not simply repeat the conversation. It must write in the report style:

```text
በቼክሊስቱ መሰረት በመድኃኒዓለም ቅርንጫፍ የሚከናወኑ መደበኛ የአሰራር ሂደቶችን አረጋግጫለሁ።
```

### 5. Strict Generation Rules (§6.6)

The AI must follow these rules when generating the report (each becomes a prompt-rule seed in `## AI Prompt Spec`, PR-01..16):

1. Generate the report in Amharic (REQ-059).
2. Use the exact section structure required by the report format (REQ-058).
3. Match the tone and writing style of the provided samples (REQ-032/064).
4. Use the reviewed transcription as the source of truth (REQ-054).
5. Do not invent missing dates, branch names, times, actions, people, problems, or opinions (REQ-062).
6. If required information is missing, leave it blank (**OQ-009: chosen rule — leave blank**, no invented wording).
7. Separate completed activities from unresolved issues (REQ-065).
8. Put urgent problems under `መፍትሄ የሚፈሉ ጉዳዮች` (REQ-065).
9. Put general branch opinion or improvement opinion under `አጠቃላይ አስተያየት` (REQ-065).
10. Preserve branch-specific details when multiple branches are mentioned (REQ-051).
11. Preserve time ranges per branch when the audio contains them (REQ-052).
12. Write from the supervisor's point of view (REQ-064).
13. Do not output an explanation of how the report was generated (REQ-063).
14. Do not include unrelated conversation content (REQ-063).
15. Do not include Person 2's questions unless the answer contains report information (REQ-063).
16. When the user asks for correction or update after review, update the report according to the user's instruction without changing unrelated correct content (REQ-034; §6.9).

### 6. English And Technical Words In The Audio (§6.7)

The audio conversation is Amharic, but it may include English or technical workplace words. The AI must not translate such words literally into unnatural Amharic, and must not leave them in English spelling if the expected report style uses Amharic phonetic writing.

Instead, the AI must write English or technical words in the common Amharic workplace pronunciation/transliteration style (REQ-061). Example: if the audio mentions `deep fryer`, the report must not write `deep fryer` and must not translate it literally as `ጥልቅ መጥበሻ`. It must write `ዲፕ ፍራየር`. This rule applies to all English or technical words.

More examples:

- `locker` → `ሎከር`
- `kitchen` → `ኪችን`
- `exhaust fan` → `ኤግዝስት ፋን`
- `technician` → `ቴክኒሻን`
- `store` → `ስቶር`

(The broader Amharic language rules arrive in Phase 7 — completed in §10 below.)

### 7. What The Transcription Represents (§6.8)

The transcription is not the final report. The transcription is only the raw Amharic text version of the recorded conversation or spoken explanation. It may include repetition, unordered information, questions and answers, informal wording, clarifications, corrections, side comments, and mixed technical terms. When someone reads the transcription, they should be able to understand the information. But the transcription itself cannot be used directly as the report because it is not organized, polished, or formatted. The AI must process the transcription and convert it into the required report structure. (Aligns with DR-1 and REQ-037.)

### 8. Correction And Update Behavior (§6.9)

After the AI generates the report, the supervisor must be able to review it. Example correction requests (Amharic, from the source):

- `ይህን ችግር ወደ መፍትሄ የሚፈሉ ጉዳዮች አስገባው`
- `የመውጫ ሰዓቱን 12:30 አድርገው`
- `ይህን አስተያየት አጠቃላይ አስተያየት ውስጥ አስገባው`
- `ይህን ክፍል አጥፋው`
- `ቃሉን እንደዚህ ቀይረው`

The AI must update only the relevant part of the generated report. It must not rewrite correct unrelated sections unnecessarily (REQ-034; W-09, UI-006).

### 9. Before/After Example (§6.10–6.11)

The following pair shows a conversational transcription before AI organization and the organized report after it. It is the reference example for the AI prompt (few-shot seed).

**Raw transcription (source §6.10):**

```text
ቀን 09 11 18 ብራንች ጎላጉል እና ብስራተ ገብርኤል ብራንች ጎላጉል እና ብስራተ ገብርኤል ስም ቤዛ አያሌው ስም ቤዛ አያሌው ስራ የገባሁበት ሰዓት ከ አንድ ሰአት ከአምስት እስከ ሁለት ሰአት ከሃያ ጎላጉል ብራንች ከሶስት ሰአት ከ ሶስት ሰአት ከሰላሳ እስከ ዘጠኝ ሰአት ከሃያ በስራተ ገብርኤል ከዘጠኝ ሰአት ከሃምሳ አምስት እስከ አስራ ሁለት ሰአት ጎላጉል ብራንች የተሰራ ስራ በቴክ ሊስቱ መሰረት በቼክ ሊስቱ መሰረት በሁለቱም ብራንቾች የሚከናወኑ ስራዎችን በአግባቡ መሆናቸውን አረጋግጫለሁ። ሌላ የተሰራ ስራ አንዳንድ ሰራተኞች ብራንቹ የት ነበር? በጎላጎል ብራንድ ያሉ አንዳንድ ሰራተኞች ላይ የአሰራር ስርዓት ክፍተት ስለነበረ እነዚህ የአሰራር ስርዓት ያለባቸውን ሰራተኞችን እና ሱፐርቫይዘሩን ጨምሮ ያየሁትን የስራ አሰራር ክፍተት በድጋሚ እንዳይፈጽሙት መመሪያ ሰጥቻቸዋለሁ። በጎላጉል ቅርንጫፍ ማክሰኞ ሪፖርት ተደርጎ የነበረው የእቃ ማጠቢያ ሲንክ ድሬኔጅ እንዲስተካከል ጠይቄ የነበረው ማትያስ መጥቶ አስተካክሎታል። በብስራተ ገብርኤል ከዚህ በፊት ተጠይቆ የነበረው ኢንሴክት ኪለር በማትያስ አማካኝነት እንዲሰቀል አድርጌያለሁ።ሌላ ኢሹ ወይም አፋጣኝ መፍትሄ የሚፈልግ ጉዳዮች  አፋጣኝ መፍትሄ የሚፈሉ ጉዳዮች በብስራተ ገብርኤል ያለው ዲፕ ፍራየር ኮንታክተር ችግር ነበረበት እሱ እንዲስተካከል ማትያስን አናግሬዋለሁ ስለዚህ ነገ መጥቶ ያስተካክለዋል ወይም እንደሚያስተካክለው አረጋግጦልኛል ሌላ በብስራተ ግብረ ኤል ያለ አፋጣኝ መፍትሄ የሚፈልግ ችግር በእግር ተረግጦ ኦፕሬት የሚደረግ እጅ መታጠቢያ አለ ይህ እጅ መታጠቢያ በቢውልዲንጉ ወይም ደግሞ በህንፃው ላይ ያሉ ሰራተኞች ወይም የሌላ ድርጅት ሰራተኞች አብረውን ስለሚጠቀሙ የከፍተኛ የሆነ የሳሙና እና የውሃ በክነት አለ የሆነ የሳሙና እና የውሃ ብክነት አለ። እጅ መታጠቢያውም ቶሎ ቶሎ እየተበላሸ ነው። ስለዚህ ይሄ ከህንፃው አሰራሮች ከህንፃው አሰራሮች ጋራ በመነጋገር አፋጣኝ መፍትሄ ይፈልጋል። እ ሌላ በጎላጉል ብራንች አፋጣኝ መፍትሄ የሚፈልግ ጉዳይ እ ሶኬት እና ማብሪያ ማጥፊያዎች የላሉ መስተካከል ያለባቸው ልክ ያልሆኑ አሉ። እነሱን እንደ እንዲያስተካክል ማቲያስን አናግሬው ነገ መጥቶ እንደሚያስተካክል አሳውቆኛል አጠቃላይ አስተያየት በሁለቱም ብራንቾች ያለው የስራ እንቅስቃሴ ጥሩ ነው
```

**Organized report (source §6.11):**

```text
ቀን: 09-11-18
ብራንች: ጎላጉል እና ብስራተ ገብርኤል ብራንች
ስም: ቤዛ አያሌው
ስራ የገባሁበት ሰዓት:
ከ1:05 እስከ 2:20 በጎላጉል ብራንች
ከ3:30 እስከ 9:20 በብስራተ ገብርኤል ብራንች
ከ9:55 እስከ 12:00 በጎላጉል ብራንች

የተሰሩ ስራዎች:
በጎላጉል እና በብስራተ ገብርኤል ብራንቾች በቼክሊስቱ መሰረት የሚከናወኑ የዕለት ተዕለት ተግባራትን፣ የአሰራር ሂደቶችን፣ የንጽህና አጠባበቅ ሁኔታዎችን እና የሰራተኞችን ዝግጁነት ተከታትዬ አረጋግጫለሁ።
በጎላጉል ብራንች በአንዳንድ ሰራተኞች ላይ የአሰራር ስርዓት ክፍተት ስለነበረ፤ እነዚህን ሰራተኞች እና ሱፐርቫይዘሩን ጨምሮ ያየሁትን የስራ አሰራር ክፍተት በድጋሚ እንዳይፈጽሙ መመሪያ ሰጥቻቸዋለሁ።
በጎላጉል ብራንች ማክሰኞ ሪፖርት ተደርጎ የነበረውን የእቃ ማጠቢያ ሲንክ ድሬኔጅ (ሲንፎን) በማትያስ አማካኝነት እንዲስተካከል አድርጌያለሁ።
በብስራተ ገብርኤል ብራንች ከዚህ ቀደም ተጠይቆ የነበረውን ኢንሴክት ኪለር በማትያስ አማካኝነት እንዲሰቀል አድርጌያለሁ።

መፍትሄ የሚፈሉ ጉዳዮች:
በብስራተ ገብርኤል ብራንች ያለው የዲፕ ፍራየር ኮንታክተር ተበላሽቶ ስለነበር ለማትያስ አሳውቄዋለሁ፤ ነገ መጥቶ እንደሚያስተካክለው አረጋግጦልኛል።
በብስራተ ገብርኤል በእግር ተረግጦ የሚሰራው የእጅ መታጠቢያ በህንፃው ላይ ባሉ የሌሎች ድርጅት ሰራተኞች ጭምር ጥቅም ላይ እየዋለ ይገኛል። በዚህም የተነሳ ከፍተኛ የሳሙና እና የውሃ ብክነት ከመኖሩም በላይ እጅ መታጠቢያው ቶሎ ቶሎ እየተበላሸ በመሆኑ፣ ከህንፃው አስተዳደር ጋር በመነጋገር አፋጣኝ መፍትሄ ሊሰጠው ይገባል።
በጎላጉል ብራንች የላሉ ሶኬቶች እና ማብሪያ ማጥፊያዎች ስላሉ ለማትያስ አሳውቄዋለሁ፤ ነገ መጥቶ እንደሚያስተካክል ነግሮኛል።

አጠቃላይ አስተያየት:
በአጠቃላይ በሁለቱም ብራንቾች ያለው የስራ እንቅስቃሴ ጥሩ ነው።

ከስራ የወጣሁበት ሰዓት: 12:00
```

### 10. Language Flexibility (§7)

Report content may be Amharic, English, or mixed, following the language of the transcription; translation is never forced unless the user explicitly chooses it (§7, REQ-067). The report defaults to Amharic generation (REQ-059, §6.6 rule 1) with English or technical words transliterated (§6.7, REQ-061); the exact precedence wording between the Amharic default and the §7 mixed-language allowance is finalized in Phase 21 (AI prompt construction). UI copy rules are separate and live in `## UI/UX Spec` §1 (REQ-066).

### 11. Expansion Markers

- Phase 7 (§7 Language Rules): **DONE — language flexibility recorded in §10; the §6.7 transliteration rule remains.**
- Phase 21 (§21 AI Prompt Requirements): prompt construction, the missing-info punctuation rule, and few-shot wiring built on these seeds.
- Phase 22 (§22 Export): export mechanics for this format.

---

## AI Prompt Spec

> **Phase 7 seed — prompt directives derived from §6 (generation rules, tone, transliteration, few-shot example) and §7 (language rules). Full prompt construction arrives in Phase 21; Addis AI integration in Phase 18; other-provider fallbacks in Phase 19. Seed IDs: `PR-<NN>`.**

### 1. Generation Rule Seeds (from §6.6)

| ID | Prompt rule seed | Source |
|---|---|---|
| PR-01 | Generate the report in Amharic. | §6.6 (rule 1) |
| PR-02 | Use the exact section structure required by the report format (`## Report Format` §1). | §6.6 (rule 2) |
| PR-03 | Match the tone and writing style of the provided samples (`## Report Format` §3–4). | §6.6 (rule 3) |
| PR-04 | Use the reviewed transcription as the source of truth; never generate from raw audio. | §6.6 (rule 4), §5.2 |
| PR-05 | Do not invent missing dates, branch names, times, actions, people, problems, or opinions. | §6.6 (rule 5) |
| PR-06 | If required information is missing, leave the field blank — no invented wording (OQ-009). | §6.6 (rule 6), OQ-009 |
| PR-07 | Separate completed activities from unresolved issues. | §6.6 (rule 7) |
| PR-08 | Put urgent problems under `መፍትሄ የሚፈሉ ጉዳዮች`. | §6.6 (rule 8) |
| PR-09 | Put general branch opinion or improvement opinion under `አጠቃላይ አስተያየት`. | §6.6 (rule 9) |
| PR-10 | Preserve branch-specific details when multiple branches are mentioned. | §6.6 (rule 10) |
| PR-11 | Preserve time ranges per branch when the audio contains them. | §6.6 (rule 11) |
| PR-12 | Write from the supervisor's point of view. | §6.6 (rule 12) |
| PR-13 | Do not output an explanation of how the report was generated. | §6.6 (rule 13) |
| PR-14 | Do not include unrelated conversation content. | §6.6 (rule 14) |
| PR-15 | Do not include Person 2's questions unless the answer contains report information. | §6.6 (rule 15) |
| PR-16 | On correction or update requests, update only the relevant part without changing unrelated correct content. | §6.6 (rule 16), §6.9 |

### 2. Tone Directive Seeds (from §6.5)

The prompt must instruct the model that the report tone is: professional, direct, clear, work-report oriented, from the supervisor's perspective, suitable for a boss, natural Amharic, not overly decorative, not conversational, not casual, and not like a chatbot answer. Conversation must be transformed into report language (example in `## Report Format` §4).

### 3. Transliteration Directive Seed (from §6.7)

The prompt must instruct the model to write English or technical words in common Amharic workplace transliteration (e.g., deep fryer → ዲፕ ፍራየር; locker → ሎከር; kitchen → ኪችን; exhaust fan → ኤግዝስት ፋን; technician → ቴክኒሻን; store → ስቶር), never in English spelling and never as literal translations.

### 4. Language Directive Seeds (from §7)

| ID | Prompt rule seed | Source |
|---|---|---|
| PR-17 | Report content may be Amharic, English, or mixed, following the language of the transcription; never force translation unless the user explicitly chooses it. | §7 |
| PR-18 | The conversation language in recorded audio is always Amharic. | §7 |

Note: PR-01 (generate in Amharic, §6.6 rule 1) stays the default per the required format and samples; §7 permits English or mixed content when the transcription itself is English or mixed. The exact prompt wording for the default-vs-mixed precedence is finalized in Phase 21 — recorded as a marker, not resolved here.

### 5. Few-Shot Seed

The prompt should include the §6.10 → §6.11 before/after pair (`## Report Format` §9) as the reference transformation example, plus the §6.2–6.4 samples as tone/format references.

### 6. Expansion Markers

- Phase 7 (§7 Language Rules): **DONE — language directive seeds added (PR-17/18); the Amharic-default vs mixed-content precedence note is recorded for Phase 21.**
- Phase 18 (§18 Addis AI Integration): how these seeds are delivered to the Addis AI endpoint.
- Phase 19 (§19 Other AI Providers): provider fallback behavior.
- Phase 21 (§21 AI Prompt Requirements): final prompt construction, system-prompt structure, the missing-info punctuation rule, and the PR-01/PR-17 precedence wording.

---

## Export Spec

> **Phase 6 seed — export context from §6; full export mechanics (formats, naming, API, UI, files) arrive in Phase 22 (§22 Export).**

### 1. Purpose (seed)

The export feature delivers the finalized report (W-12) so it can be shared or archived (§4, REQ-047). The exported artifact is the report in the required §6.1 format (`## Report Format`), supporting formats: PDF, TXT, CSV, and spreadsheet (REQ-047; detail in Phase 22).

### 2. Expansion Markers

- Phase 22 (§22 Export): full export specification — format details per file type, file naming, content mapping, API endpoints (`## API Contract`), UI flow (W-12), and error handling.

---

## UI/UX Spec

> **Phase 7 seed — the language rules from §7. Layout, routing, theme, component, form, and general UI rules arrive in Phases 12, 14, 15, and 16.**

### 1. Interface Language (English)

The app shell, navigation, labels, buttons, validation messages, helper text, and everything else in the application interface must be English (§7, REQ-066). No Amharic UI copy.

### 2. Content Language (Amharic / English / Mixed)

- Audio, transcription, AI chat, and report content can be Amharic, English, or mixed (§7, REQ-067).
- The app must not force translation unless the user explicitly chooses it (§7, REQ-067).
- The conversation language in recorded audio is always Amharic (§7, REQ-068).

### 3. Language Boundary

The interface language rule (§1) applies to UI copy only; the content language rule (§2) applies to user and AI content. The app never translates user content automatically.

### 4. Addis AI Language Rationale

Addis AI is selected because it is specialized in Ethiopian Amharic and is expected to produce more accurate transcription and report generation than general AI tools that are not focused on Ethiopian language use cases (§7, REQ-069). Integration detail arrives in Phase 18.

### 5. Expansion Markers

- Phase 12 (§12 Frontend Architecture): routing and layout that carry these language rules.
- Phase 14 (§14 MUI, MUI X, Theme, And Component Standards): English-first component copy standards.
- Phase 15 (§15 React Hook Form Standards): validation message language (English).
- Phase 16 (§16 UI Rules): general UI rules.

---

## Audio Recording STT

> **Phase 8 seed — the transcription accuracy requirements from §8. The full recording and STT pipeline (MediaRecorder, chunking via wavSplitter, MIME validation, Addis AI endpoint, re-transcription flow) arrives in Phase 20 (§20 Audio Recording And STT Pipeline).**

### 1. Accuracy Is The Foundation

Transcription accuracy is the foundation of the entire product. Every subsequent step — AI report generation, export, and review — depends on accurate transcription. Garbage transcription produces garbage reports (§8, REQ-070). Amharic quality is a core requirement, not an optional language feature (REQ-031).

### 2. Priority Rule

Every implementation decision related to chunking strategy, format conversion, MIME type, error handling, and provider use must prioritize transcription accuracy over convenience, performance, or code simplicity. Convenience, performance, and code simplicity must also be perfect (§8, REQ-071).

### 3. Critical Safeguards

The chunking pipeline and the correct MIME type per chunk are critical safeguards (§8, REQ-072). Re-transcription must be available to verify accuracy on every audio recording (§8, REQ-072; flow in `## Transcription Review` §2, mechanics in Phase 20).

### 4. Accuracy Regression Rule

Accuracy regression is a blocking defect (§8, REQ-073). Any change to the STT pipeline — including chunking, format conversion, MIME type, language code, or provider endpoint — that degrades transcription quality must be reverted immediately. Accuracy must be verified with real Amharic audio before merging (§8, REQ-073; gate in `## Validation Audit` §1).

### 5. Expansion Markers

- Phase 18 (§18 Addis AI Integration): STT endpoint details.
- Phase 20 (§20 Audio Recording And STT Pipeline): MediaRecorder, MIME priority, wavSplitter chunking, language code, re-transcription endpoint, error handling and retries.
- Phase 28 (§28 Error Handling): STT error states.

---

## Transcription Review

> **Phase 8 seed — accuracy verification from §8 on top of the Phase 3 review loop (W-04). Detailed review/correction UI and re-transcription mechanics arrive in Phase 20.**

### 1. Review Loop (from §3)

The supervisor reviews the transcription and, if needed, corrects it with AI help before report generation (W-04; REQ-034/REQ-041; correction behavior in `## Report Format` §8). Report content is generated only from the reviewed transcription, never directly from raw audio (REQ-038).

### 2. Re-Transcription For Accuracy Verification (§8)

Re-transcription must be available to verify accuracy on every audio recording (§8, REQ-072): the supervisor can re-run STT on the stored audio and confirm the transcription matches the recording before generation. Re-transcription is the accuracy safeguard for the review step; mechanics arrive in Phase 20.

### 3. Expansion Markers

- Phase 20 (§20 Audio Recording And STT Pipeline): review/correction UI (UI-004), re-transcription mechanics, editing with AI help.

---

## Validation Audit

> **Phase 8 seed — the accuracy verification gates from §8. Broader validation and audit (checklists, source traceability, non-functional requirements) arrives in Phases 15, 26, 28, 30, 31.**

### 1. Accuracy Verification Gate

Accuracy regression is a blocking defect (§8, REQ-073). Any change to the STT pipeline — chunking, format conversion, MIME type, language code, provider endpoint — that degrades transcription quality must be reverted immediately. Accuracy must be verified with real Amharic audio before merging (§8, REQ-073). This gate applies to all future STT pipeline work (Phases 18, 20, 28).

### 2. Scope Note

This seed covers transcription accuracy only. Full validation and audit sections arrive in later phases: Phases 15 (React Hook Form Standards), 26 (JSDoc Standards), 28 (Error Handling), 31 (Validation And Audit — checklists, source traceability, non-functional requirements), 32 (Git Workflow).

### 3. Expansion Markers

- Phase 15 (§15 React Hook Form Standards): form validation.
- Phase 26 (§26 JSDoc Standards): code documentation audit.
- Phase 28 (§28 Error Handling): error handling audit.
- Phase 31 (§31 Validation And Audit): full validation audit, checklists, source traceability, non-functional requirements.
- Phase 32 (§32 Git Workflow): branch/commit rules that carry the accuracy gate.

---

## Architecture

> **Phase 9 seed — the stack-level architecture from §9, enriched in Phase 10 with the §10 backend architecture. Frontend architecture arrives in Phase 12; implementation architecture in Phase 25.**

### 1. Repository Layout

Two independent packages at the repository root `Report-Builder-V2/`: `backend/` and `client/` (codebase fact, AD-006). There is no shared package; each package has its own `package.json`.

### 2. Backend Stack

Node.js + Express + Mongoose, ES Modules only (`"type": "module"`), JavaScript only (§9.1, REQ-074/075). Deep backend architecture (routing, middleware, controllers, validation, error handling, logging) is defined in `## Backend Architecture` (Phase 10).

### 3. Frontend Stack

React 19, Vite 8, MUI 9, React Redux, Redux Toolkit, React Router 8, React Hook Form; JavaScript only; no Next.js, no Remix, no other frameworks; no Tailwind CSS (§9.1, REQ-076). Deep frontend architecture arrives in Phases 12–16.

### 4. Package Source Of Truth

`backend/package.json` and `client/package.json` are the source of truth for package versions (§9.2, REQ-079). The packages are already installed; other required packages can be installed if needed.

### 5. Backend Architecture (Phase 10)

Backend architecture mandated by §10 (full detail in `## Backend Architecture`):

- **Layering:** routes → validators → controllers → models. All routes are mounted under `/api/v1`; `backend/routes/index.js` imports and mounts all route modules; `app.js` registers no routes directly (§10.1).
- **Middleware:** fixed global security stack `helmet -> cors -> compression -> cookie-parser -> mongo-sanitize -> rate-limit`, not reorderable or removable (§10.2).
- **Controllers:** one file per domain (auth, branch, report, audio, transcription, ai, user, analytics); `express-async-handler` as `asyncHandler` wraps all handlers; write controllers use mongoose sessions and transactions (`try/catch/finally`, commit-or-abort, `endSession` in `finally`); read-only get/list endpoints skip transactions; errors forward via `next(error)` to the global error handler (§10.3).
- **Constants and config:** `backend/utils/constants.js` (frozen, no magic values); all environment access through the frozen `env` object in `backend/config/env.js` (§10.5).
- **Startup:** the HTTP server starts before the database connection so the health endpoint is reachable without the DB; graceful shutdown on SIGINT/SIGTERM is mandatory and must not be removed or replaced (§10.8).

### 6. Expansion Markers

- Phase 25 (§25 Backend Implementation): final implementation architecture.

---

## Coding Conventions

> **Phase 9 seed — the code-level conventions from §9. Deeper conventions arrive in Phases 25 (backend), 26 (JSDoc), and 27 (frontend).**

### 1. Language And Modules

- JavaScript only: no TypeScript, no `.ts`, no `.tsx`, no TS config (§9.1, REQ-074).
- Backend: ES Modules only (`"type": "module"`); no CommonJS, no `require()` — use `import`/`export` (§9.1, REQ-075).

### 2. Styling

No Tailwind CSS; style with MUI `sx` and `styled()` only (§9.1, REQ-076).

### 3. Validation

No zod; use manual resolvers with a consistent error shape (§9.1, REQ-077).

### 4. HTTP Clients

- Addis AI calls: native `fetch` on the backend.
- All other service calls: axios.
- RTK Query: `fetchBaseQuery` with `baseQueryWithReauth` (§9.1, REQ-078).

### 5. Testing

No automated test frameworks (§9.1, REQ-077).

### 6. Expansion Markers

- Phase 25 (§25 Backend Implementation): backend conventions.
- Phase 26 (§26 JSDoc Standards): JSDoc conventions.
- Phase 27 (§27 Frontend Implementation): frontend conventions.

---

## Project Directory Structure

> **Phase 9 seed — the repository-level structure from §9, enriched in Phase 10 with the §10 backend directory structure. Frontend structure arrives in Phase 12; final structure in Phase 25.**

### 1. Repository Root

`Report-Builder-V2/` contains two independent packages: `backend/` and `client/` (codebase fact).

### 2. Backend Package

`backend/package.json` — `"type": "module"` (ES Modules; reconciled: the §9.3 snapshot note about changing commonjs → module is already applied in the actual manifest).

| Field | Value |
|---|---|
| name | backend |
| version | 1.0.0 |
| main | index.js |
| scripts | `test` (stub: "no test specified" exit 1) |
| type | module |

Dependencies (16):

| Package | Version |
|---|---|
| bcryptjs | ^3.0.3 |
| compression | ^1.8.1 |
| cookie-parser | ^1.4.7 |
| cors | ^2.8.6 |
| dayjs | ^1.11.21 |
| dotenv | ^17.4.2 |
| express | ^5.2.1 |
| express-async-handler | ^1.2.0 |
| express-mongo-sanitize | ^2.2.0 |
| express-rate-limit | ^8.5.2 |
| express-validator | ^7.3.2 |
| helmet | ^8.3.0 |
| jsonwebtoken | ^9.0.3 |
| mongoose | ^9.7.4 |
| mongoose-paginate-v2 | ^1.9.5 |
| multer | ^2.2.0 |

devDependencies: morgan ^1.11.0, nodemon ^3.1.14.

Reconciliation note: axios is mandated by §9.1 (HTTP client strategy) but is absent from the manifest; per §9.2 additional required packages can be installed — axios is added during implementation (Phase 10+).

### 3. Frontend Package

`client/package.json` — `"type": "module"`.

| Field | Value |
|---|---|
| name | client |
| private | true |
| version | 0.0.0 |
| scripts | dev (`vite`), build (`vite build`), lint (`eslint .`), preview (`vite preview`) |
| type | module |

Dependencies (23):

| Package | Version |
|---|---|
| @emotion/react | ^11.14.0 |
| @emotion/styled | ^11.14.1 |
| @fontsource/inter | ^5.2.8 |
| @mui/icons-material | ^9.2.0 |
| @mui/lab | ^9.0.0-beta.6 |
| @mui/material | ^9.2.0 |
| @mui/x-charts | ^9.9.0 |
| @mui/x-chat | ^9.0.0-alpha.15 |
| @mui/x-data-grid | ^9.9.0 |
| @mui/x-date-pickers | ^9.9.0 |
| @reduxjs/toolkit | ^2.12.0 |
| dayjs | ^1.11.21 |
| jspdf | ^4.2.1 |
| jspdf-autotable | ^5.0.8 |
| react | ^19.2.7 |
| react-dom | ^19.2.7 |
| react-error-boundary | ^6.1.2 |
| react-hook-form | ^7.81.0 |
| react-media-recorder | ^1.7.2 |
| react-player | ^3.4.0 |
| react-redux | ^9.3.0 |
| react-router | ^8.2.0 |
| react-toastify | ^11.1.0 |

devDependencies (12): @babel/core ^7.29.7, @eslint/js ^10.0.1, @rolldown/plugin-babel ^0.2.3, @types/react ^19.2.17, @types/react-dom ^19.2.3, @vitejs/plugin-react ^6.0.3, babel-plugin-react-compiler ^1.0.0, eslint ^10.6.0, eslint-plugin-react-hooks ^7.1.1, eslint-plugin-react-refresh ^0.5.3, globals ^17.7.0, vite ^8.1.1.

Note: the frontend uses the React Compiler tooling (babel-plugin-react-compiler with @rolldown/plugin-babel). The `@types/react`/`@types/react-dom` packages are editor-tooling type declarations only; the project remains JavaScript-only (§9.1, REQ-074).

### 4. Backend Directory Structure (Phase 10)

Future-state backend tree mandated by §10 and the phase map (source files are created during implementation; codebase currently contains only `.env`, `package.json`, `package-lock.json`):

```
backend/
├── app.js                 # Express app assembly; /api/v1 mount point; no direct routes (§10.1–10.2)
├── server.js              # Server bootstrap; starts before DB; graceful shutdown (§10.8)
├── config/
│   └── env.js             # Frozen `env` object; sole access point for process.env (§10.5)
├── controllers/           # One file per domain: auth, branch, report, audio, transcription, ai, user, analytics (§10.3)
├── middleware/            # Global security stack: helmet -> cors -> compression -> cookie-parser -> mongo-sanitize -> rate-limit (§10.2)
├── models/                # Mongoose schemas; hooks/instance/static methods accept sessions (§10.3, §10.11)
├── mock/                  # Mock-data injection/wipe supporting sessions (§10.3; details in Phase 23)
├── routes/
│   └── index.js           # Imports and mounts all /api/v1 route modules (§10.1)
├── utils/
│   ├── constants.js       # Frozen constants; no magic values (§10.5)
│   ├── httpStatus.js      # Semantic HTTP status codes (§10.6)
│   └── logger.js          # Winston logger; backend-only logging (§10.9)
├── validators/            # express-validator files, one per domain (§10.10)
└── logs/                  # Winston daily-rotated logs; gitignored; 30-day auto-delete (§10.9)
```

Notes: `backend/.env` defines the environment keys (codebase fact; the full environment-variable contract is Phase 17). `backend/mock/*` is confirmed by §10.3; its seeding behavior is detailed in Phase 23.

### 5. Expansion Markers

- Phase 12 (§12 Frontend Architecture): frontend directory structure.
- Phase 25 (§25 Backend Implementation): final structure.
- Phase 30 (§30 Git Workflow): workflow structure.

---

## Rules

> **Phase 9 seed — the technical stack rules from §9. Rules deepen in Phases 13 (Redux), 16 (UI rules), 17 (environment config), 21 (AI prompts), 26 (JSDoc), 29 (security), 30 (git).**

### 1. Stack Rules (§9.1)

- Backend: Node.js, Express, Mongoose, ES Modules only (`"type": "module"`), no CommonJS, no `require()` (REQ-074/075).
- Initial backend packages are installed in `backend/package.json`; required additional backend packages can be installed (REQ-079).
- Frontend: React 19, Vite 8, MUI 9, React Redux, Redux Toolkit, React Router 8, React Hook Form (REQ-076).
- Initial frontend packages are installed in `client/package.json`; required additional frontend packages can be installed (REQ-079).
- JavaScript only: no TypeScript, no `.ts`, no `.tsx`, no TS config (REQ-074).
- No Next.js, no Remix, no other frameworks (REQ-076).
- No Tailwind CSS; use MUI `sx` and `styled()` only (REQ-076).
- No automated test frameworks (REQ-077).
- No zod validation library — use manual resolvers with a consistent error shape (REQ-077).
- HTTP client strategy: Addis AI calls use native `fetch` on the backend; all other service calls use axios; RTK Query uses `fetchBaseQuery` with `baseQueryWithReauth` (REQ-078).
  - Reconciliation note: axios is mandated here but absent from `backend/package.json`; §9.2 permits installing required packages — axios is added during implementation (Phase 10+).

### 2. Package Source Of Truth (§9.2)

- If package versions differ between notes and package manifests, `backend/package.json` and `client/package.json` are the source of truth (REQ-079).
- The packages are already installed.
- Other required packages can be installed if needed (REQ-079).

### 3. Expansion Markers

- Phase 13 (§13 Redux RTK Query): RTK Query rules (fetchBaseQuery + baseQueryWithReauth).
- Phase 16 (§16 UI Rules): styling rules (MUI sx/styled only).
- Phase 17 (§17 Environment Config): environment rules.
- Phase 21 (§21 AI Prompt Requirements): AI prompt rules.
- Phase 26 (§26 JSDoc Standards): documentation rules.
- Phase 29 (§29 Security): security rules.
- Phase 30 (§30 Git Workflow): git rules.

---

## Backend Architecture

> **Phase 10 seed — the backend architecture from §10 (Backend Architecture). Deeper backend implementation details arrive in Phase 24 (Data Model), Phase 25 (implementation), and Phase 28 (error handling).**

### 1. Routing (§10.1)

- All routes are mounted under the `/api/v1` prefix.
- Each route module is registered in `backend/routes/index.js`, which imports and mounts all route modules.
- No routes are registered directly in `app.js`.
- New route modules must be created in `backend/routes/`, imported, and mounted in `backend/routes/index.js` (REQ-080).

### 2. Middleware (§10.2)

- The error handling pipeline is required.
- The fixed global security middleware stack order is: `helmet -> cors -> compression -> cookie-parser -> mongo-sanitize -> rate-limit`.
- The security middleware stack must not be reordered or removed.
- All middleware must be present (REQ-081).

### 3. Controllers (§10.3)

- One controller file per domain: auth, branch, report, audio, transcription, ai, user, analytics.
- `express-async-handler` from npm, imported as `asyncHandler`, wraps all controller handlers; no custom async wrapper.
- All write controllers use `try/catch/finally` with MongoDB sessions and transactions:
  1. `mongoose.startSession()`
  2. `session.startTransaction()`
  3. write
  4. commit or abort
  5. `session.endSession()` in `finally`
- All model hooks, instance methods, and static methods must support session where relevant.
- `backend/mock/*` data injection and wipe must support session.
- Read-only endpoints such as get and list do not need transactions.
- Controllers forward errors via `next(error)`, handled automatically by `express-async-handler` to the global error handler (REQ-082).

### 4. Pagination (§10.4)

- Pagination uses `mongoose-paginate-v2` on all list endpoints.
- Default page: `1`.
- Default limit: `10`.
- Max limit: `100` (REQ-053).

### 5. Constants And Config (§10.5)

- Backend constants path: `backend/utils/constants.js`.
- Client constants path: `client/src/utils/constants.js`.
- No magic values anywhere.
- All constants objects are `Object.freeze()`-frozen objects.
- New constants are added to the relevant constants file, never hardcoded anywhere.
- All config comes via the frozen `env` object from `backend/config/env.js`.
- `process.env` is never accessed directly outside of `config/env.js`.
- All validation constants must be defined in the constants file, never hardcoded in validator files (REQ-083).

### 6. HTTP Status Codes (§10.6)

- HTTP status codes are imported from `backend/utils/httpStatus.js` by semantic name.
- Numeric status codes are never hardcoded.

### 7. Response Shape (§10.7)

- All successful backend responses use `{ success: true, message: "..", data: {..} }`.
- Error responses use `{ success: false, message: "..", data: {..} }`.

### 8. Server Startup And Shutdown (§10.8)

- Graceful shutdown on `SIGINT` and `SIGTERM`:
  1. `server.close()`
  2. Clean up temporary audio chunk files (if not linked to any report)
  3. `mongoose.connection.close()`
  4. `process.exit(1)`
- Graceful shutdown must not be removed or replaced.
- The HTTP server starts before the database connection so the health endpoint is reachable without the DB (REQ-084).

### 9. Validation (§10.10)

- Validators check `express-validator` results.
- Validation failure returns `422` with `{ success: false, message: "..", data: {..} }`.
- Validators live in separate files under `backend/validators/*.js`, one per domain.
- Validators are applied as route middleware before the controller handler.
- Auth email validators use `normalizeEmail({ gmail_remove_dots: false })` (REQ-085).

### 10. Mongoose Schema Rules (§10.11)

- No schema field combines `unique: true` with separate indexes; use `schema.index(..)`.
- Schema hooks, instance methods, and static methods must accept session options where relevant.

### 11. Expansion Markers

- Phase 24 (§24 Data Model): full schema definitions.
- Phase 25 (§25 Backend Implementation): implementation-level backend architecture.
- Phase 28 (§28 Error Handling): global error handler detail.

---

## Logging

> **Phase 10 seed — the logging rules from §10.9. Error-handling logging detail arrives in Phase 28 (§28 Error Handling Patterns).**

- All logging goes through `backend/utils/logger.js`.
- Winston is used on the backend only; Morgan is used in development mode only.
- No `console.log` in backend code — absolute ban; Winston replaces it in all environments (REQ-086).
- Log levels: error, warn, info, http, verbose, debug, silly. Development uses the debug level; production uses the info level.
- Module labels via Winston child loggers: Server, DB, Auth, AI-Addis, AI-Gemini, AI-Nvidia.
- Log files are written to the `logs/` directory (gitignored), rotated daily via the Winston daily-rotate-file transport, and auto-deleted after 30 days.
- Safe logging in production: logs must not include passwords, JWT token values, raw cookies, API keys or secrets, raw audio file contents, full transcription texts, or full generated report texts — use message IDs or truncated previews instead.
- AI provider logs: log provider, model, status code, and timing; do not log request or response bodies in production.

### Expansion Markers

- Phase 28 (§28 Error Handling Patterns): error-handling logging detail.

---

## Auth Cookies

> **Phase 11 seed — authentication, authorization, cookies, and tokens from §11. Frontend login/register page behavior arrives in Phase 12; the RTK Query client in Phase 13; environment secrets in Phase 17; deep security in Phase 29.**

### 1. Authentication Model (§11)

- JWT-based authentication.
- Access token duration: `15m`.
- Refresh token duration: `7d`.
- Access token and refresh token are stored in httpOnly cookies.
- Cookie options for both tokens:
  - `httpOnly: true`
  - `secure` in production
  - `sameSite: lax`
- No sessions MongoDB collection — zero DB lookups for auth on each request (no session store; `authenticate` still loads the user document).
- The refresh token is rotated on each use to prevent replay (REQ-087).

### 2. authenticate Middleware (§11)

- Extracts the JWT from `req.cookies.accessToken`.
- Verifies the token.
- Looks up the user and checks the user.
- Attaches the user document to `req.user`.
- Uses `req.user._id.toString()` throughout, never `req.user.id` (REQ-088).

### 3. Password Handling (§11)

- Password hashing uses `bcryptjs` in a `pre('save')` hook with 12 salt rounds.
- `comparePassword(candidatePassword)` uses `bcrypt.compare`.
- Plaintext passwords must never be compared (REQ-089).

### 4. Registration (§11)

- The registration form collects only `email` and `password`; no name field.
- On account creation the backend auto-extracts `firstName` and `lastName` from the email local part (before `@`):
  - `beza@gmail.com` → `firstName=beza`, `lastName=beza`.
  - Dotted local parts split: `beza.ayalew@gmail.com` → `firstName=beza`, `lastName=ayalew`.
  - First segment = firstName; last segment = lastName.
- `avatar` and `position` are optional profile fields; the user updates them later from the Profile page, not during registration (REQ-090).

### 5. Google OAuth (§11)

- OAuth architecture is provider-neutral.
- `oauth.service.js` checks `env.OAUTH_GOOGLE_*` credentials.
- Google is stubbed until credentials are configured; future providers extend this service.
- `GET /oauth/google` route exists with the `googleOAuth` controller using the `getGoogleOAuthUrl()` service.
- OAuth-created accounts use Google-provided data:
  - `firstName` and `lastName` extracted from the Google profile name.
  - `email` taken from the Google account email.
  - `avatar` taken from the Google profile picture.
  - No password required.
- Existing users are matched by email and signed in; new users are auto-created with Google data (REQ-091).
- Google OAuth button on login/register pages uses a Google icon start adornment and shows a loading spinner on click (§11; §12 shows the browser redirect at `http://localhost:4000/api/v1/auth/google` — route naming finalized in Phase 12).

### 6. Rate Limiting (§11)

Three tiers:

| Tier | Limit | Endpoints |
|---|---|---|
| Global | 100 requests per 15 minutes | All endpoints |
| Auth | 20 requests per 15 minutes | Register and login |
| AI | 10 requests per 1 minute | Generation and correction endpoints |

(REQ-092)

### 7. Frontend Credentials (§11)

- The frontend uses `credentials: 'include'` on all calls, including public pages (REQ-093; RTK Query `baseQueryWithReauth` detail in Phase 13).

### 8. Expansion Markers

- Phase 12 (§12 Frontend Architecture): login/register page behavior, OAuth redirect handling, route guards.
- Phase 13 (§13 Redux, RTK Query, And API Client): `baseQueryWithReauth`, cookie-aware client.
- Phase 17 (§17 Environment Variables): `JWT_*` and `OAUTH_GOOGLE_*` env contract.
- Phase 29 (§29 Security): deep security rules.

---

## Security

> **Phase 11 seed — the authentication-adjacent security rules from §11. Environment secrets arrive in Phase 17; AI provider security in Phase 18; the full security section in Phase 29.**

### 1. Cookie Security (§11)

- Access and refresh tokens travel only in httpOnly cookies: `httpOnly: true`, `secure` in production, `sameSite: lax` (detail in `## Auth Cookies` §1).

### 2. Authentication Security (§11)

- Refresh token rotated on each use to prevent replay.
- No sessions MongoDB collection — no session store to attack or maintain.
- Passwords are never plaintext: bcryptjs hashing with 12 salt rounds; plaintext passwords are never compared (detail in `## Auth Cookies` §3).

### 3. Rate Limiting (§11)

- Three tiers: global 100/15min (all endpoints), auth 20/15min (register and login), AI 10/1min (generation and correction) (REQ-092).

### 4. Expansion Markers

- Phase 17 (§17 Environment Variables): secret handling (`JWT_*`, `OAUTH_GOOGLE_*`, AI API keys).
- Phase 18 (§18 Addis AI Integration): AI provider security.
- Phase 29 (§29 Security): full security section.

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
- Reporting-analytics detail scope (OQ-004, AD-007) — resolved in Phase 4: AD-007 stands; the metric set is defined in Phase 31.
- Narration merge pipeline behavior (OQ-005, AD-008) — re-confirmed in Phases 20/21.
- Checklist tool existence (OQ-006) — resolved in Phase 4: no checklist tool in V2; "follow a checklist" is a reportable activity only.
- Clarifying-question behavior (OQ-007) — resolved in Phase 3: the app processes narrations as-is; no clarifying-Q&A step; re-confirmed in Phases 20/21.

---

## End Of Phase 11 Content

Phases 1–11 are GREEN (2026-08-01). Phase 11 built authentication, authorization, cookies, and tokens from §11: new `## Auth Cookies` seed (JWT auth with 15m access / 7d refresh httpOnly cookies, refresh rotation against replay, no sessions MongoDB collection, `authenticate` middleware contract, bcryptjs 12-round `pre('save')` hashing and `comparePassword`, email-local-part name extraction at registration, provider-neutral Google OAuth via `oauth.service.js` stubbed until credentials, three rate-limit tiers, `credentials: 'include'`), new `## Security` seed (cookie security, replay prevention, no-plaintext passwords, rate limiting), enriched `## API Contract` (authentication endpoint inventory: register, login, me, Google OAuth start route; outcome statuses under the §10.7 envelope), enriched `## Data Modeling` (User entity seeds: name fields, `fullName` virtual, unique email, hashed password without plaintext comparison, optional avatar/position, no session/token collection), added REQ-087..093, added US-026/027, extended `## Glossary` (JWT, httpOnly cookie, Refresh token rotation), updated the Checklist (Auth Cookies and Security — GREEN seeds; API Contract and Data Modeling — GREEN enrichment), and added the Phase 11 Source Trace Map. Phase 12 will build the frontend architecture.

Phases 1–10 are GREEN (2026-08-01). Phase 10 built the backend architecture from §10: new `## Backend Architecture` seed (routing under `/api/v1` via `routes/index.js`, fixed global security middleware order `helmet -> cors -> compression -> cookie-parser -> mongo-sanitize -> rate-limit`, one controller file per domain with `express-async-handler` and mongoose session transactions, `mongoose-paginate-v2` pagination, frozen constants and `config/env.js` env access, semantic HTTP status codes, response envelope, graceful shutdown, `express-validator` middleware, mongoose schema rules), new `## Logging` seed (Winston backend-only, Morgan development-only, absolute `console.log` ban, log levels, child loggers, gitignored daily-rotated `logs/` with 30-day auto-delete, safe-logging rules, AI provider log fields), enriched `## Architecture` (backend layering), `## API Contract` (response envelope superseding the Phase 5 unspecified-envelope note, semantic status codes, 422 validation shape, pagination), and `## Project Directory Structure` (backend directory tree; current codebase has only `.env` and the package manifests — source files are created during implementation), added REQ-080..086, extended `## Glossary` (Winston, Graceful shutdown, Mongoose session), updated the Checklist (Backend Architecture and Logging — GREEN seeds; Architecture, API Contract, Project Directory Structure — GREEN enrichment), and added the Phase 10 Source Trace Map. Phase 11 will build authentication, authorization, cookies, and tokens.

Phases 1–9 are GREEN (2026-08-01). Phase 9 built the technical stack and package rules from §9 plus the authoritative `backend/package.json` and `client/package.json`: new `## Rules` (stack rules, package source of truth, HTTP client strategy, axios gap reconciliation), new `## Coding Conventions` (JS-only, ES Modules, MUI sx/styled only, manual validation resolvers, HTTP clients, no test frameworks), new `## Architecture` (two-package repository layout, backend/frontend stacks, source of truth), new `## Project Directory Structure` (full version tables for both packages; `"type": "module"` reconciled from the §9.3 commonjs note; React Compiler tooling and @types editor-tooling notes), added REQ-074..079, extended `## Glossary` (ES Modules, MUI sx and styled(), RTK Query), updated the Checklist (Rules, Coding Conventions, Architecture, Project Directory Structure — GREEN seeds; Requirements — GREEN enrichment), and added the Phase 9 Source Trace Map. Phase 10 will build the backend architecture.

Phases 1–8 are GREEN (2026-08-01). Phase 8 built the transcription accuracy requirement from §8: new `## Audio Recording STT` seed (accuracy foundation, priority rule, chunking/MIME safeguards, accuracy regression rule), new `## Transcription Review` seed (Phase 3 review loop + re-transcription for accuracy verification on every recording), new `## Validation Audit` seed (accuracy verification gate with real-Amharic-audio-before-merge rule), enriched `## PRD` (transcription accuracy bullet) and Work Flow (W-02 source += §8), added REQ-070..073, added US-024/025, extended `## Glossary` (transcription accuracy, accuracy regression), updated the Checklist (Audio Recording STT, Transcription Review, Validation Audit — GREEN seeds), and added the Phase 8 Source Trace Map. Phase 9 will build the technical stack and package rules from the package.json files.

Phases 1–7 are GREEN (2026-08-01). Phase 7 built the language rules from §7: new `## UI/UX Spec` seed (interface language English, content language Amharic/English/mixed, no forced translation, Amharic conversation audio, Addis AI language rationale), enriched `## AI Prompt Spec` (PR-17/18 language seeds, Amharic-default vs mixed-content precedence noted for Phase 21), enriched `## Report Format` (§10 language flexibility), enriched `## PRD` (language-rules bullet, Addis AI rationale in supporting feature 7), added REQ-066..069, added US-022/023, extended `## Glossary` (interface language rule, content language flexibility), updated the Checklist (UI/UX Spec seed, AI Prompt Spec enrichment, Report Format enrichment — all GREEN), and added the Phase 7 Source Trace Map. Phase 8 will build the transcription accuracy requirement.
