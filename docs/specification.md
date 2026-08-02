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
| 12 | 12. Frontend Architecture | GREEN | Frontend Architecture, Routing Layout, UI/UX Spec, MUI Component Standards, Project Directory Structure |
| 13 | 13. Redux, RTK Query, And API Client | GREEN | Redux RTK Query, Rules, Frontend Architecture |
| 14 | 14. MUI, MUI X, Theme, And Component Standards | GREEN | MUI Component Standards, Theme Standards, UI/UX Spec |
| 15 | 15. React Hook Form Standards | GREEN | React Hook Form Standards, Validation Audit, UI/UX Spec |
| 16 | 16. UI Rules | GREEN | UI/UX Spec, User Interactions, Rules |
| 17 | 17. Environment Variables | GREEN | Environment Config, Security, Rules |
| 18 | 18. Addis AI Integration | GREEN | Addis AI, AI Prompt Spec, API Contract, Security |
| 19 | 19. Other AI Providers | GREEN | Other AI Providers, Addis AI, AI Prompt Spec, Environment Config |
| 20 | 20. Audio Recording And STT Pipeline | GREEN | Audio Recording STT, Transcription Review, API Contract, Data Modeling |
| 21 | 21. AI Prompt Requirements | GREEN | AI Prompt Spec, Report Format, Rules |
| 22 | 22. Export | GREEN | Export Spec, API Contract, Work Flow |
| 23 | 23. Mock Data | GREEN | Mock Data Seeding, Data Modeling, Tasks |
| 24 | 24. Data Model | GREEN | Data Modeling, API Contract, Business Rules, Report Domain |
| 25 | 25. Project Directory Structure | GREEN | Project Directory Structure, Coding Conventions, Architecture |
| 26 | 26. Code Quality And Coding Conventions | GREEN | Coding Conventions, Rules, JSDoc Standards, Checklists |
| 27 | 27. JSDoc Conventions | GREEN | JSDoc Standards, Coding Conventions |
| 28 | 28. Error Handling Patterns | GREEN | Error Handling, API Contract, Validation Audit |
| 29 | 29. Security | GREEN | Security, Requirements, Environment Config, Rules |
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
| Addis AI | 18 | GREEN (Phase 18 seed) |
| AI Prompt Spec | 6, 7, 18, 19, 21, 24 | GREEN (Phase 7, 18, 19, 21, 24 enrichment) |
| Analytics | 4 (out-of-scope requirement only; product feature deferred) | PENDING |
| API Contract | 5, 10, 11, 13, 18, 20, 22, 24, 25, 28 | GREEN (Phase 13, 18, 20, 22, 24, 25, 28 enrichment) |
| Architecture | 9, 10, 25 | GREEN (Phase 10, 25 enrichment) |
| Audio Recording STT | 8, 20, 24 | GREEN (Phase 8 seed, Phase 20, 24 enrichment) |
| Auth Cookies | 11 | GREEN (Phase 11 seed) |
| Backend Architecture | 10, 24, 25, 28 | GREEN (Phase 10 seed, Phase 24, 25, 28 enrichment) |
| Resource Management | 4, 35 | GREEN (Phase 4 seed — content lives in `## Report Management`) |
| Business Rules | 5, 24, 35 | GREEN (Phase 5 seed, Phase 24 enrichment) |
| Checklists | 26, 30, 31 | GREEN (Phase 26 seed) |
| Coding Conventions | 9, 25, 26, 27 | GREEN (Phase 9 seed, Phase 25, 26, 27 enrichment) |
| Data Modeling | 5, 11, 20, 23, 24, 35 | GREEN (Phase 11, 20, 23, 24 enrichment) |
| Decision Log | 1, 2, 24, 33 | GREEN |
| Design | consolidated across phases; finalized in 36 | PENDING |
| Environment Config | 17, 19, 25, 29 | GREEN (Phase 17 seed, Phase 19, 25, 29 enrichment) |
| Error Handling | 28 | GREEN (Phase 28 seed) |
| Export Spec | 6, 22, 25 | GREEN (Phase 6 seed, Phase 22, 25 enrichment) |
| File Storage Uploads | 20 | PENDING |
| Frontend Architecture | 12, 13, 14 | GREEN (Phase 13 enrichment) |
| Git Workflow | 32 | PENDING |
| Glossary | 1, 2, 24, 34 (final) | GREEN |
| Implementation Plan | 32 | PENDING |
| JSDoc Standards | 26, 27 | GREEN (Phase 26 seed, Phase 27 enrichment) |
| Logging | 10, 28 | GREEN (Phase 10 seed, Phase 28 enrichment) |
| Mock Data Seeding | 23, 24 | GREEN (Phase 23 seed, Phase 24 enrichment) |
| MUI Component Standards | 12, 14, 24 | GREEN (Phase 14, 24 enrichment) |
| Non-Functional Requirements | 31 | PENDING |
| Other AI Providers | 19, 24 | GREEN (Phase 19 seed, Phase 24 enrichment) |
| Phase Protocol | 32 | PENDING |
| PRD | 1, 2, 3, 4 | GREEN (Phase 4 enrichment) |
| Problem Statement | 1, 2 | GREEN |
| Profile Management | 4 | GREEN (Phase 4 seed) |
| Project Directory Structure | 9, 10, 12, 13, 25, 30 | GREEN (Phase 14, 25 enrichment) |
| Project Overview | 1 | GREEN |
| React Hook Form Standards | 15 | GREEN (Phase 15 seed) |
| Redux RTK Query | 13, 28 | GREEN (Phase 13 seed, Phase 28 enrichment) |
| Report Domain | 3, 5, 24 | GREEN (Phase 5, 24 enrichment) |
| Report Format | 6, 7, 21 | GREEN (Phase 7, 21 enrichment) |
| Report Management | 4, 5, 24, 35 | GREEN (Phase 5, 24 enrichment) |
| Requirements | 1, 2, 4, 9, 24, 25, 29, 31, 34 | GREEN (Phase 9, 24, 25, 29 enrichment) |
| Risk Register | pending assignment (candidate: 33/36) | PENDING |
| Routing Layout | 12 | GREEN |
| Rules | 9, 13, 16, 17, 21, 26, 29, 30 | GREEN (Phase 13, 16, 17, 21, 26, 29 enrichment) |
| Security | 11, 17, 18, 25, 29 | GREEN (Phase 11 seed, Phase 17, 18, 25, 29 enrichment) |
| Source Traceability | 31 | PENDING |
| Status Machine | 5, 24, 35 | GREEN (Phase 5 seed, Phase 24 enrichment) |
| Tasks | 23 (seed — content lives in ## Mock Data Seeding), 32 | PENDING |
| Theme Standards | 14 | GREEN (Phase 14 seed) |
| Transcription Review | 8, 20, 24 | GREEN (Phase 8 seed, Phase 20, 24 enrichment) |
| UI/UX Spec | 7, 12, 14, 15, 16 | GREEN (Phase 15, 16 enrichment) |
| User Interactions | 3, 16, 22, 35 | GREEN (Phase 3 seed, Phase 16 enrichment) |
| User Stories | 2 (seed), 4 | GREEN (Phase 2 seed) |
| Validation Audit | 8, 15, 24, 28, 31 | GREEN (Phase 8 seed, Phase 15, 24, 28 enrichment) |
| Work Flow | 3, 22, 25, 35 | GREEN (Phase 3 seed, Phase 22, 25 enrichment) |

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
| §11 | JWT-based authentication; access token duration `15m`; refresh token duration `7d`; both stored in httpOnly cookies; cookie options `httpOnly: true`, `secure` in production, `sameSite: lax` | Auth Cookies (1), Security (2), API Contract (4), Requirements (REQ-087) |
| §11 | No sessions MongoDB collection — zero DB lookups for auth on each request; refresh token rotated on each use to prevent replay | Auth Cookies (1), Security (2), Requirements (REQ-087) |
| §11 | `authenticate` middleware extracts JWT from `req.cookies.accessToken`, verifies the token, looks up the user, checks the user, attaches the user document to `req.user`; uses `req.user._id.toString()` throughout, not `req.user.id` | Auth Cookies (2), Requirements (REQ-088) |
| §11 | Password hashing uses `bcryptjs` in a `pre('save')` hook with 12 salt rounds; `comparePassword(candidatePassword)` uses `bcrypt.compare`; plaintext passwords never compared | Auth Cookies (3), Security (11), Requirements (REQ-089) |
| §11 | Registration form collects only `email` and `password`; no name field; backend auto-extracts `firstName`/`lastName` from the email local part (`beza@gmail.com` → beza/beza; `beza.ayalew@gmail.com` → beza/ayalew); `avatar` and `position` optional, updated later from the Profile page | Auth Cookies (4), Data Modeling (4), Requirements (REQ-090), User Stories (US-026) |
| §11 | Google OAuth registration uses Google-provided data (`firstName`/`lastName` from profile name, `email` from Google account, `avatar` from Google profile picture); no password required; existing users matched by email and signed in; new users auto-created | Auth Cookies (5), Data Modeling (4), Requirements (REQ-091), User Stories (US-027) |
| §11 | OAuth architecture provider-neutral; `oauth.service.js` checks `env.OAUTH_GOOGLE_*` credentials; Google stubbed until credentials configured; future providers extend the service; `GET /oauth/google` route exists with `googleOAuth` controller using `getGoogleOAuthUrl()` service | Auth Cookies (5), API Contract (4), Requirements (REQ-091) |
| §11 | Rate limiting three tiers: global 100 requests per 15 minutes on all endpoints; auth 20 requests per 15 minutes on register and login; AI 10 requests per 1 minute on generation and correction endpoints | Auth Cookies (6), Security (4), Requirements (REQ-092) |
| §11 | Frontend uses `credentials: 'include'` on all calls, including public pages | Auth Cookies (7), Requirements (REQ-093) |
| §11 + §12 (cross-aligned) | Google OAuth button on login/register pages uses a Google icon start adornment and a loading spinner on click; §12 shows the OAuth browser redirect at `http://localhost:4000/api/v1/auth/google`; route naming finalized in Phase 12 | Auth Cookies (5) |

## Source Trace Map — Phase 12 (source §12)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §12.1 | React Router data mode: `createBrowserRouter` + `RouterProvider` in `client/src/main.jsx`; flat route array in `main.jsx` (never `App.jsx`); no separate `AppRoutes.jsx` unless unmanageably large; route objects use `Component`, never `element`; every page lazy-loaded per module via `React.lazy`; `main.jsx` wraps the router in `LocalizationProvider` + `AdapterDayjs` | Frontend Architecture (1), Routing Layout (1), Requirements (REQ-094) |
| §12.1 | `App.jsx` is the root layout, not the routes file: AppTheme, CssBaseline, AppErrorBoundary, AppToastContainer, `<Outlet />` | Frontend Architecture (2), Requirements (REQ-094) |
| §12.4 | `ProtectedRoute` shows a spinner while auth state is `initializing`, calls `GET /api/v1/auth/me` on mount, clears auth state and redirects on failure, and redirects unauthenticated users with `<Navigate to="/login" state={{ from: location }}>`; `PublicRoute` is the inverse guard and redirects authenticated users to `/dashboard` | Routing Layout (3), Requirements (REQ-095), User Stories (US-028) |
| §12.2 | Shell layout contract: outer container `height: 100vh; overflow: hidden`; chrome (app bar/sidebar) fixed; content area `overflow-y: auto`; body/html never scroll; PublicLayout = fixed public MuiAppbar + scrollable content; AppShell = AppSidebar + content column (protected MuiAppbar → Page Header → `<Outlet />`) | UI/UX Spec (5), Requirements (REQ-096) |
| §12.2, §12.3 | AppSidebar uses MUI Drawer switching `temporary`/`permanent`: xs/sm-land temporary overlay 240px (open via header menu icon, close on backdrop/nav select/Escape); md+ permanent 240px; md+ toggled permanent mini 64px icons-only with MuiTooltip; nav theming rules; logout dispatches RTK `logout()`, clears cookies, navigates `/login` | MUI Component Standards (2, 3), UI/UX Spec (5), Requirements (REQ-097), User Stories (US-029) |
| §12.3 | MuiAppbar variants: public (logo, theme toggle, Login, Sign Up) vs protected (top-right of content area, 64px, Search + theme toggle + avatar dropdown Profile/Logout; no title; no hamburger; avatar 32px <600px / 36px ≥600px); appbar logo → `/dashboard` if authenticated else `/` | MUI Component Standards (1), Requirements (REQ-097) |
| §12.3 | GlobalSearchDialog: full-screen below 600px / 768px landscape (no border radius, 100vh); centered 80vh/600px (600–1200px) and 70vh/720px (>1200px); closed by back arrow, Escape, or outside click; RHF `register('search')`, fires on Enter or click, no debounce; results grouped by entity (Reports, Branches) in MuiAccordion; empty state "No results found" | MUI Component Standards (5), Requirements (REQ-099) |
| §12.6 | Page Header pattern (MuiPageHeader, §1.12): title + subtitle left, actions right, one line; Reports page header "Reports" / "Manage daily supervision reports" with filter badge (1–3), List/Grid toggle, Create button; Dashboard renders with no Page Header | MUI Component Standards (4), UI/UX Spec (9, 10), Requirements (REQ-098) |
| §12.5, §12.6 | Route tree: `/` App + `ErrorBoundary: AppErrorPage` → PublicRoute > PublicLayout (index Landing, login, register) → ProtectedRoute > AppShell (dashboard, reports, reports/:id/details, branches, branches/:id/details, profile, `*` NotFound) → `assistant` is the only protected route outside AppShell (full-screen); report editing happens in the Assistant chat (no `reports/:id/edit` route); deep link `/assistant?conversation=<id>` | Routing Layout (2), Requirements (REQ-094) |
| §12.6 | Auth strategy: full page load → `GET /api/v1/auth/me` populates Redux + localStorage; 401 clears everything + redirects `/login`; SPA navigation reads Redux only — zero API calls | Frontend Architecture (5), Requirements (REQ-095) |
| §12.6 | Page-level data-flow pattern: react-hook-form `useForm({ mode: 'onBlur' })`, `register` only; RTK Query mutation hooks (`credentials: 'include'`); 422 → `setError` per field; 401 → toast; success → `reset()` + navigate (login: `state.from?.pathname || '/dashboard'`) | Frontend Architecture (6), UI/UX Spec (7, 8) |
| §12.6 (3.5.1, 3.5.2) | CreateReportDialog: MuiDialog `maxWidth="sm"` fullWidth, `disableEscapeKeyDown`, no-op `onClose`, closes only via Cancel or successful submit; Assistant page: ChatBox (`@mui/x-chat`), conversation rail, New Chat → report picker, `chatAdapter.js`, tool-approval UI, `aiConversationSlice` + `assistantApi.js` | MUI Component Standards (5), UI/UX Spec (11) |
| §12.7 | Hooks under `client/src/hooks/`: `useAuth` (auth state convenience hook), `useAudioRecorder` (MediaRecorder state/actions hook) | Frontend Architecture (7), Requirements (REQ-100) |
| §12.6 + §11 (cross-aligned) | Google OAuth redirect target finalized as `GET /oauth/google` (Auth Cookies §5); the §12.6 browser URL `http://localhost:4000/api/v1/auth/google` is superseded; flow stubbed until Google credentials are configured | Routing Layout (4) |

## Source Trace Map — Phase 13 (source §13)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §13.1 | Use `@reduxjs/toolkit` and `@reduxjs/toolkit/query/react`; store path `client/src/redux/app/store.js`; API slice path `client/src/redux/features/api.js`; feature slice pattern `client/src/redux/features/<name>Slice.js`; feature slices: authSlice, branchSlice, reportSlice, audioSlice, transcriptionSlice, userSlice, aiConversationSlice, analyticsSlice; use `fetchBaseQuery`, `baseQueryWithReauth`, `createApi`, `injectEndpoints`; the Redux store wraps `App.jsx` in `main.jsx` | Redux RTK Query (1), Requirements (REQ-103) |
| §13.1 + §12.1 (cross-aligned) | `main.jsx` wrapper order: Redux `<Provider store>` is the outermost wrapper; `LocalizationProvider` + `AdapterDayjs` wrap the router inside it | Redux RTK Query (1), Frontend Architecture (1), Requirements (REQ-103) |
| §13.2 | All HTTP calls go through `baseQueryWithReauth` in `client/src/redux/features/api.js`; it calls `fetchBaseQuery`, which uses `VITE_API_BASE_URL` from `API_CONFIG` in `utils/constants.js` and `credentials: 'include'` | Redux RTK Query (2), Rules (3), Requirements (REQ-104) |
| §13.2 | On 401 (`result.error && result.error.status === 401`) `baseQueryWithReauth` attempts `/api/v1/auth/refresh` via `baseQuery({ url }, api, extraOptions)`; on refresh success it retries the original request (`result = await baseQuery(args, api, extraOptions)`); on refresh failure it clears everything, dispatches logout, and the user must be outside of protected routes | Redux RTK Query (2), API Contract (4), Requirements (REQ-105) |
| §13.2 | Auth endpoints are excluded from 401 handling on public pages; proper backend response transformation is required | Redux RTK Query (2), Rules (3), Requirements (REQ-106) |
| §13.2 + §11 (cross-aligned) | The refresh endpoint is `POST /api/v1/auth/refresh`; it rotates the refresh token and re-issues the access + refresh cookies (rotation per REQ-087) | Redux RTK Query (2), API Contract (4), Auth Cookies (1) |

---

## Source Trace Map — Phase 14 (source §14)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §14.1 | Tree-shaken MUI imports required (e.g. `import TextField from '@mui/material/TextField'`); never import from the `@mui/material` barrel; MUI Grid uses the `size` prop, not `item` (`<Grid size={{ xs: 12, md: 6 }}>`) | MUI Component Standards (7), Requirements (REQ-107) |
| §14.1 | Deprecated MUI props are banned: `margin="normal"` becomes `sx={{ mb: 2 }}`; `InputProps` becomes `slotProps.input`; `Box component="form"` becomes native `<form>`; `Box component="img"` becomes native `<img>`; `Link component="button"` becomes `Link slots={{ root: 'button' }}` | MUI Component Standards (7), Requirements (REQ-107) |
| §14.1 | Styling: MUI `sx` and `styled()` only; never Tailwind; never inline `style`; `sx` uses theme-aware tokens (`color: 'text.secondary'`, `bgcolor: 'background.paper'`, `color: 'error.main'`); never import from `themePrimitives.js` directly; grey colors via `theme.palette.grey[N]`; never `gray[50]`, `gray[800]`, or `brand[400]` directly; all `sx` color values mode-aware (`text.primary`, `background.default`, `grey.500`) | MUI Component Standards (7), Theme Standards (2), Requirements (REQ-107) |
| §14.2 | Reusable MUI components live in `client/src/components/reusable/*`, are prefixed `Mui`; input reusable components use `forwardRef` (presentation wrappers do not); `displayName` set on wrapped components; default `size="small"` where applicable (TextField, Select, Button); pure wrappers with all standard MUI props passed through and no custom API surface; `slotProps.input` for adornments, never `InputProps`; every input element has a proper start adornment | MUI Component Standards (8), Requirements (REQ-108) |
| §14.3 | Specific reusable-component requirements: MuiTextField handles password internally (eye toggle via `useState` + `useCallback`, `onMouseDown` prevents focus loss, no layout shift, merges caller's `slotProps.input.endAdornment`); MuiButton uses MUI native `loading` with `loadingIndicator={<CircularProgress size={20} />}` and `loadingPosition="center"`; MuiDialog defaults `disableEnforceFocus`/`disableRestoreFocus` to `true` and is always used instead of raw `@mui/material/Dialog`; MuiConfirmDialog preset props (`open`, `onClose`, `onConfirm`, `title`, `message`, `confirmText`, `cancelText`, `confirmColor`); MuiDataGrid toolbar + export selection + columns in `client/src/components/columns/*` + action column (view, update, archive, restore, delete) + archived-item flow via MuiConfirmDialog + server-side pagination + skeleton loading rows; MuiDatePicker explicit Desktop/Mobile switching via `theme.breakpoints.up('md')`, never auto; MuiSelect `MenuProps` maxHeight 300; MuiPagination `color="primary"` `shape="rounded"`, list view only; GlobalSearchDialog RHF `useForm` with `register`, uncontrolled input, ArrowBackIcon start adornment; LoadingSpinner centered CircularProgress with optional message; DataGrid action column icon colors via `sx` theme-path strings (`'primary.main'`, `'warning.main'`, `'error.main'`), never the `color` prop; always use reusable components instead of raw `@mui/material/<component>` | MUI Component Standards (9), Requirements (REQ-109) |
| §14.4 | Theme rules: all theme configuration lives in `client/src/theme/`; no inline theme overrides in page components; component overrides via new files in `customizations/`; `AppTheme.jsx` composes the full MUI theme with `createTheme`, `cssVariables`, color schemes, and all customizations; theme customization files and `AppTheme.jsx` use `@module`, not `@file`; the eight customization files: inputs, dataDisplay, feedback, navigation, surfaces, dataGrid, datePickers, charts | Theme Standards (1), Requirements (REQ-111) |
| §14.4 + codebase (`client/src/theme/`) | `AppTheme.jsx` exists with `cssVariables: { colorSchemeSelector: 'data-mui-color-scheme', cssVarPrefix: 'template' }`, `colorSchemes`/`typography`/`shadows`/`shape` from `themePrimitives.js`, `components` built from the eight customization groups, and `ThemeProvider` with `disableTransitionOnChange`; `themePrimitives.js` also exports `layoutConfig`; `customizations/index.js` re-exports the eight customization groups | Theme Standards (1) |
| §14.5 | All MUI X components — charts, date picker, data grid, and any other MUI X component — are community version only; MUI X Chat references: `https://mui.com/x/react-chat/` and `https://mui.com/x/react-chat/backend/adapters/` | MUI Component Standards (10), Requirements (REQ-111) |
| §14 (1.1–1.13) | Component catalog: MuiAppbar (file `client/src/components/reusable/MuiAppbar.jsx`, props `position`/`elevation`/`color`/`sx` defaults, left logo → `/dashboard` if authenticated else `/`, right section conditional on auth, PublicLayout vs AppShell behaviors, avatar 32px below 600px / 36px at or above 600px, auth detection via Redux `authSlice` `useSelector`, exclusions — search dialog, user dropdown, hamburger); MuiButton; MuiDialog (title bottom divider, scrollable content, actions divider, responsive fullscreen down('sm') OR down('md')+landscape); MuiTextField; MuiSelect; MuiDatePicker (Ethiopian calendar — `client/src/utils/ethiopianDate.js` with `ethiopianToGregorian`/`gregorianToEthiopian`, custom lightweight conversion no npm package, DD-MM-YY display e.g. `25-02-18`, English day names, English month names mapped to Ethiopian months September…August + Pagume, RHF via Controller, `LocalizationProvider` + `AdapterDayjs` in `main.jsx`); MuiPagination (count = server `totalPages` from `mongoose-paginate-v2`, constants `PAGINATION_DEFAULT_PAGE=1`/`PAGINATION_DEFAULT_LIMIT=10`/`PAGINATION_MAX_LIMIT=100`); MuiDataGrid (columns in `client/src/components/columns/*.js` action column last, View/Edit/Archive/Delete icon colors via `sx`, archive→MuiConfirmDialog→restore or delete flow, `checkboxSelection` + `disableRowSelectionOnClick` + export button, `GridToolbar`, `paginationMode="server"`, `pageSizeOptions={[10, 25, 50, 100]}`, skeleton via `slotProps.loadingOverlay`, custom `noRowsOverlay`, default `sx={{ height: 400 }}`); MuiConfirmDialog; LoadingSpinner (size default 40, minHeight default `"100vh"`); GlobalSearchDialog (`useForm({ mode: 'onSubmit' })`, uncontrolled `register('search')`, ArrowBackIcon start adornment clears/resets/closes); MuiPageHeader (title + subtitle hidden on vw < 600 portrait, children right slot, `mb: 2`, bottom divider); MuiStatusBadge (statuses `draft`/`audio_attached`/`transcribed`/`reviewed`/`completed` → default/warning/info/primary/success; used in Report Details header (3.6)) | MUI Component Standards (1, 4, 5, 9), UI/UX Spec (10, 11), Requirements (REQ-109, REQ-110) |
| §14 (1.13) + §5 (cross-aligned) | MuiStatusBadge status names (`draft` | `audio_attached` | `transcribed` | `reviewed` | `completed`) are the Phase 24 report status enum (`## Status Machine` §3 mapping; `## Data Modeling` §4.1); Phase 35 (§35 Archive, Delete, And Restore Lifecycle) owns the archive/delete/restore lifecycle rules | MUI Component Standards (9), Status Machine (3), Data Modeling (4.1) |

---

## Source Trace Map — Phase 15 (source §15)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §15 (rules 1–2) | All forms use `react-hook-form` with `register` by default; `const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' })` | React Hook Form Standards (1), Requirements (REQ-112) |
| §15 (rule 3) | No `watch`; `getValues` is used inside validate functions for cross-field validation | React Hook Form Standards (2), Requirements (REQ-112) |
| §15 (rule 4) | `register` by default; `Controller` only when `register` cannot work — MUI X DatePicker or TimePicker (custom onChange values instead of native events); every `Controller` use documents why with a code comment | React Hook Form Standards (3), MUI Component Standards (9.4), Requirements (REQ-113) |
| §15 (rule 5) | Cross-field validation (confirm password): `validate: (value) => value === getValues('password') || 'Passwords must match'` | React Hook Form Standards (2), UI/UX Spec (8), Requirements (REQ-114) |
| §15 (rules 6–7) | `formState.errors` drives validation error display; wrapped MUI components receive `error` and `helperText` props | React Hook Form Standards (4), UI/UX Spec (1), Requirements (REQ-114) |
| §15 (rule 8) | Never debounce input; never `useDebounce`; direct register integration only | React Hook Form Standards (5), Requirements (REQ-114) |
| §15 (rule 9) | Backend validation via `setError`: `setError('fieldName', { message: error.data?.data?.errors?.[0]?.message })` | React Hook Form Standards (6), Requirements (REQ-115) |
| §15 (rules 10–11) | Submission: `handleSubmit(onSubmit)` with try/catch; `reset()` after success; loading via `isSubmitting` — disables the submit button and shows the spinner | React Hook Form Standards (7), Requirements (REQ-115) |
| §15 (rule 12) | Schema validation via manual resolver with consistent error shape; no zod | React Hook Form Standards (8), Requirements (REQ-116) |
| §15 (rule 13) | All reusable Mui input components must use `forwardRef` | React Hook Form Standards (3), MUI Component Standards (8), Requirements (REQ-113) |
| §15 (1.2) + §4 (cross-aligned) | GlobalSearchDialog uses `useForm({ mode: 'onSubmit' })` — the explicit search-dialog exception to the default `onBlur` mode (search fires on Enter or click, no debounce) | React Hook Form Standards (1), MUI Component Standards (5), Requirements (REQ-099) |
| §15 + codebase (`client/package.json`) | `react-hook-form` `^7.81.0` installed (package manifest is the source of truth, REQ-079); no forms exist in `client/src` yet — the `## React Hook Form Standards` section defines the contract every future form follows | React Hook Form Standards (1) |

---

## Source Trace Map — Phase 16 (source §16)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §16 (rules 1–3) | The app shell, navigation, labels, buttons, validation messages, and helper text are English; audio, transcription, AI chat, and report content can be Amharic, English, or mixed; translation is never forced unless the user explicitly chooses it | UI/UX Spec (1–3, 12), AI Prompt Spec (PR-17/18), Requirements (REQ-066/067) — echo of GREEN Phase 7 |
| §16 (rules 4–5) | Form submit buttons use `size="small"` and must not shrink on flex — `flexShrink: 0` | UI/UX Spec (7, 12), Rules (4), React Hook Form Standards (7), Requirements (REQ-117) |
| §16 (rules 6–7) | Icons are always used at `vw < 600` and at `vw < 768 && landscape` — small-screen and landscape action buttons carry icons | UI/UX Spec (12), Rules (4), User Interactions (UI-008), Requirements (REQ-118), User Stories (US-033) |
| §16 (rules 8–9) | Text must never overflow or overlap at mobile or desktop widths; all text uses ellipsis after a certain character count — no horizontal scroll anywhere | UI/UX Spec (6, 12), Rules (4), MUI Component Standards (7), Frontend Architecture (12.6), Requirements (REQ-119) |
| §16 + codebase (`client/src`) | `client/src` contains only `App.jsx`, `assets/`, `main.jsx`, and `theme/` — no `components/`, `layouts/`, or `pages/` yet; the Phase 16 UI rules define the contract every future component and layout follows | UI/UX Spec (12), Rules (4) |

---

## Source Trace Map — Phase 17 (source §17)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §17.1 | `.env` files are gitignored and not committed; they exist locally with placeholder or correct values; no `.env.example` files; new env vars added in three steps (local `.env` → config object → validation/default in `config/env.js`); `process.env` never accessed outside `config/env.js`; client vars `VITE_`-prefixed via `import.meta.env.*` | Environment Config (1), Rules (5), Security (1), Requirements (REQ-120) |
| §17.2 | Backend env contract: 22 required vars with defaults (NODE_ENV development, PORT 4000, CLIENT_ORIGIN http://localhost:3000, MONGODB_URI report-builder-v2, JWT secrets min 32 chars with 15m/7d TTLs, seven ADDIS_AI_* vars with `sk_` placeholder key, LOG_LEVEL debug/info, NVIDIA/GEMINI keys and base URLs, FFMPEG/FFPROBE system paths) and 3 optional vars (OAUTH_GOOGLE_*; the GOOGLE_SERVICE_ACCOUNT_* pair was part of the original 5 and is retired in Phase 25 — REQ-177) | Environment Config (2), Security (1), Rules (5), Requirements (REQ-121) |
| §17.3 | Client env contract: VITE_API_BASE_URL (default http://localhost:4000/api/v1) and VITE_APP_NAME (default Report Builder V2), both required, read via `import.meta.env` | Environment Config (3), Rules (5), Requirements (REQ-122) |
| §17.4 | AI key rules: Addis AI `sk_` keys never in client code, browser-sent Vite env vars, localStorage, Redux state, or client logs; Nvidia and Gemini keys in `backend/.env` only | Environment Config (4), Security (1), Rules (5), Requirements (REQ-123) |
| §17.5 | Backend constants as one frozen object in `utils/constants.js`: Audio (900, 52428800, four MIME types), Pagination (1, 10, 100), STT (60), Auth (12), AI Generation (0.2, 2048, 0.9, 40), AI Correction (2048, 0.15) | Environment Config (5), Backend Architecture (5), Requirements (REQ-124) |
| §17 + codebase (`backend/.env`, `client/.env`, `.gitignore`, `backend/package.json`) | `backend/.env` exists with all required keys except LOG_LEVEL (absent — add during implementation) plus OAUTH_GOOGLE_*; `client/.env` exists with both `VITE_` keys; root `.gitignore` line 1 is `.env`; no `.env.example`; `dotenv` `^17.4.2` in `backend/package.json`; `config/env.js` and `utils/constants.js` do not exist yet — created during implementation (Phase 25) | Environment Config (1–5), Rules (5) |

## Source Trace Map — Phase 18 (source §18)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §18.1–18.2 | Primary sources: addisai.ch plus the 12 docs.addisassistant.com pages (get-started, capabilities, integration, platform/errors); provider identity — African-language AI infrastructure for voice, chat, retrieval, translation, and localization, including voice AI, cross-lingual RAG, STT, TTS, translation, and enterprise deployments | Addis AI (1) |
| §18.3 | Base URLs: API `https://api.addisassistant.com`, playground `https://platform.addisassistant.com`, realtime relay `wss://relay.addisassistant.com/ws?apiKey=<API_KEY>` | Addis AI (2), API Contract (5) |
| §18.4 | Authentication: dashboard-generated keys, `sk_` prefix, `x-api-key` header, key never in frontend code, backend-only proxy (no direct client-to-Addis AI calls), AI endpoints protected by authentication, rate limits on auth and AI endpoints | Addis AI (3), Security (1), Requirements (REQ-125, REQ-126) |
| §18.5 | Core model families: text `Addis-፩-አሌፍ`, voice `አሌፍ-Audio-AM`/`አሌፍ-Audio-OM`, realtime `አሌፍ-1.2-realtime-audio` | Addis AI (4), Requirements (REQ-127) |
| §18.6 | Language support: English, Amharic, Afan Oromo, Tigrinya; am + English-aware prompting first-class; language constants extensible for om/ti | Addis AI (5), Requirements (REQ-131) |
| §18.7 | Text generation: POST /api/v1/chat_generate with model/prompt/target_language/conversation_history/generation_config (0.2, 2048, 0.9, 40); response shape (response_text, finish_reason, usage_metadata, modelVersion); project use — after transcription review, strict prompt + JSON-like output, low temperature, keys backend-only, native fetch | Addis AI (6), AI Prompt Spec (7), API Contract (5), Requirements (REQ-127) |
| §18.8 | STT: POST /api/v2/stt multipart `audio` + `request_data` `{ language_code }`; formats WAV/MP3/M4A/WebM; constraints 60s, 10MB, 16kHz+, mono, quiet environment, single speaker; project use — no frontend duration limit, backend chunks, single-pass ffmpeg WAV `pcm_s16le` 16kHz mono before PCM-level split, no per-segment re-encoding (Opus priming artifacts), retry 3x backoff (1s, 2s, 4s), provider error marks chunk failed and continues | Addis AI (7), API Contract (5), Requirements (REQ-128, REQ-129) |
| §18.9 | TTS: POST /api/v1/audio JSON text/language/voice_id/stream; Base64 WAV under `audio`; not required for the first workflow — service support kept | Addis AI (8), API Contract (5), Requirements (REQ-130) |
| §18.10 | Multimodal: POST /api/v1/chat_generate multipart `image`/`audio` + `request_data`; not part of the first workflow | Addis AI (9), API Contract (5), Requirements (REQ-130) |
| §18.11 | Translation: POST /api/v1/translate, response nests under `data.translation`; optional — no default translation (report may be intentionally Amharic/English/mixed), possible later UI control | Addis AI (10), API Contract (5), Requirements (REQ-130) |
| §18.12 | Realtime: wss relay; `setupComplete`; base64 PCM16 JSON envelopes; `serverContent.modelTurn.parts[0].inlineData.data`; never expose keys in browser WS URLs; not required for V2; backend-controlled strategy if later | Addis AI (11), API Contract (5), Security (1), Requirements (REQ-130) |
| §18.13 | Errors: `{ status, error { code, message, param } }`; 400/401/403/404/429/500/503; project handling — safe user messages, log request IDs/status codes not raw content, timeout, retry 3x backoff, provider error marks chunk failed and continues | Addis AI (12), API Contract (5), Requirements (REQ-129) |
| §18.14 | Implementation implications: backend proxy only, native fetch, multer, Node FormData/Blob, small documented multipart helper if needed, no Addis AI SDK (SDKs coming soon) | Addis AI (13), Requirements (REQ-125) |
| §18 + codebase (`backend/.env`) | Seven `ADDIS_AI_*` vars exist with real values — base URL, `sk_` key, text model `Addis-፩-አሌፍ`, target language `am`, STT language code `am`, STT model `default`, timeout 360000; the spec documents a placeholder `sk_` only (REQ-123) | Addis AI (2–5), Environment Config (2), Requirements (REQ-121) |

## Source Trace Map — Phase 19 (source §19)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §19 | Nvidia and Gemini are used in addition to Addis AI; STT always uses Addis AI; all providers must be free (no credit card or subscription — never non-free AI); Nvidia and Gemini keys in `backend/.env`; Gemini model `gemini-3.1-flash-lite`; Nvidia model `z-ai/glm-5.2` at least for now; other free models may be added; HTTP client for Gemini and Nvidia is axios; all three providers available, selected by the user at generation time via dropdown or buttons, default Addis; provider stored per AI conversation message; different providers for corrections vs initial generation; fallback chain Addis → Gemini → Nvidia | Other AI Providers (1–3), AI Prompt Spec (8), Requirements (REQ-132..135, REQ-138) |
| §19.1 | Gemini: model `gemini-3.1-flash-lite`; endpoint `:generateContent?key=${GEMINI_API_KEY}`; request `{ contents, systemInstruction, generationConfig (0.2, 2048, 0.9, 40) }`; no streaming; network failure retry 3x exponential backoff; provider error returns 502 | Other AI Providers (4), AI Prompt Spec (8), Requirements (REQ-136) |
| §19.2 | Nvidia: model `z-ai/glm-5.2`; Nvidia API message format with `Authorization: Bearer` token; same retry pattern as Gemini | Other AI Providers (5), AI Prompt Spec (8), Requirements (REQ-137) |
| §19 + codebase (`backend/.env`, `backend/package.json`) | `backend/.env` holds real Nvidia (`nvapi-` prefixed) and Gemini (`AIzaSy` prefixed) keys plus `NVIDIA_API_BASE_URL`/`GEMINI_API_BASE_URL` `change me` placeholders; the spec records the keys as placeholders only (REQ-123); axios is absent from `backend/package.json` — added during implementation (REQ-138) | Other AI Providers (1, 4, 5), Environment Config (2), Requirements (REQ-138) |

## Source Trace Map — Phase 20 (source §20)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §20.1 | Browser MediaRecorder records each clip into a local-state array via a custom hook; the full array submits as the multipart field `clips`; blobs never persisted to Redux/redux-persist/localStorage; limits max 15 min/clip (`AUDIO_MAX_DURATION_SEC` = 900) and max 50 MB/clip (`AUDIO_MAX_SIZE_BYTES` = 52428800) enforced client-side after recording stops; a clip over 50 MB blocks submit with a warning and asks for a re-record; MIME priority `audio/webm;codecs=opus` → `audio/webm` → `audio/mp4` → browser default | Audio Recording STT (5), Requirements (REQ-139..141) |
| §20.2 | Validation: at least one clip required; 50 MB max per clip (configurable); MIME whitelist; duration metadata informational; server-side ffprobe duration validation and multer type/size validation | Audio Recording STT (6), API Contract (6), Data Modeling (5), Requirements (REQ-142) |
| §20.3 | Multer upload storage in `backend/uploads/audio/`, gitignored and never committed | Audio Recording STT (7), API Contract (6), Data Modeling (5), Requirements (REQ-143) |
| §20.4 | Approved chunking pipeline: ffmpeg full-file WAV `pcm_s16le` 16 kHz mono in a single pass → in-memory PCM-level split via `wavSplitter.js` into ~60 s chunks (`ADDIS_AI_STT_MAX_DURATION_SEC` = 60) → chunk MIME `audio/wav` (never `audio/webm`); alternatives forbidden unless proven equivalent | Audio Recording STT (8), API Contract (6), Requirements (REQ-144) |
| §20.5 | Re-transcription: backend accepts both `audio_attached` and `transcribed` statuses; frontend "Re-transcribe" button on a completed transcription re-runs STT on the stored audio (status names reconciled in Phase 24, AD-011) | Transcription Review (2), Audio Recording STT (9), API Contract (6), Data Modeling (4.1), Requirements (REQ-145) |
| §20 + codebase (`client/package.json`, `backend/package.json`) | `react-media-recorder` ^1.7.2 and `react-player` ^3.4.0 are already installed in `client/package.json`; multer ^2.2.0 is already installed in `backend/package.json`; the `backend/uploads/audio/` directory is created during implementation | Audio Recording STT (5, 7), API Contract (6) |

## Source Trace Map — Phase 21 (source §21)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §21.1 | Generation system prompt exact text ("You are an expert report writer for a restaurant company's supervision department. Generate structured daily supervision reports in Amharic based on field note transcriptions.") with temperature 0.2 / maxOutputTokens 2048 — matches the frozen AI Generation constants group | AI Prompt Spec (9), Rules (6), Requirements (REQ-146) |
| §21.2 | Correction system prompt exact text ("You are an expert report editor. The user has provided corrections to a previously generated report. Incorporate the corrections while maintaining the original structure and style.") with temperature 0.15 / maxOutputTokens 2048 — matches the frozen AI Correction constants group | AI Prompt Spec (9), Rules (6), Requirements (REQ-147) |
| §21.3 | Voice correction flow: correction audio → STT → correction text → used in the same correction prompt | AI Prompt Spec (10), Rules (6), Requirements (REQ-148) |
| §21.4 | Transcription correction: the AI fixes transcription errors (fills gaps, fixes misrecognized words); the corrected text is stored as `Transcription.latest` with a `history[]` entry (reviewer = provider) — the earlier `aiCorrectedText` name is superseded (AD-011) | AI Prompt Spec (11), Data Modeling (4.3), Rules (6), Requirements (REQ-149) |
| §21.5 | The 14 Amharic generation rules the AI prompt must enforce (Amharic default, exact section structure, sample tone, reviewed transcription as source of truth, no invention, blank for missing info, separate activities from unresolved issues, branch-specific details, time ranges per branch, supervisor POV, no generation explanation, no unrelated content, correction scope, Amharic workplace transliteration) — mapped onto the PR-01..16 seeds | AI Prompt Spec (12), Rules (6), Requirements (REQ-150..153) |

## Source Trace Map — Phase 22 (source §22)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §22 | PDF export: client-side, `jspdf` + `jspdf-autotable`, A4, Noto Sans Ethiopic font for Amharic, section headers, page numbers | Export Spec (2), Requirements (REQ-154) |
| §22 | TXT export: client-side, Blob UTF-8, plain structure preserving the report format | Export Spec (2), Requirements (REQ-155) |
| §22 | CSV export: client-side, Blob UTF-8 with BOM for Excel compatibility, structured columns | Export Spec (2), Requirements (REQ-156) |
| §22 | XLSX export: client-side, multi-sheet workbook — content, version history (with metadata), and metadata (provider, dates, status) sheets; workbook library chosen at implementation | Export Spec (2), Requirements (REQ-157) |
| §22 | Google Docs export: backend-only; the document is created in the user's own Google Drive with the user's own Google OAuth token (`drive.file` scope) and the URL is returned; frontend opens it in a new tab; user edits freely in their Drive (service-account mechanism replaced in Phase 25 by user decision) | Export Spec (4), API Contract (7), Work Flow (5), Requirements (REQ-158, REQ-177) |
| §22 | The four client-side formats (PDF, TXT, CSV, XLSX) are generated in the browser — no backend export endpoints for them; the Google Docs export is the only backend export | Export Spec (3), API Contract (7), Requirements (REQ-159) |
| §22 + codebase (`client/package.json`) | `jspdf` ^4.2.1 and `jspdf-autotable` ^5.0.8 are already installed in `client/package.json`; no workbook library is installed (chosen at implementation); `GOOGLE_SERVICE_ACCOUNT_EMAIL`/`GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` were verified as optional env vars absent from `backend/.env` (retired in Phase 25 — REQ-177; the export now uses the user's own OAuth token) | Export Spec (2, 4), API Contract (7) |

## Source Trace Map — Phase 23 (source §23)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §23 | The `backend/mock/*` data injection must support MongoDB sessions | Mock Data Seeding (2), Data Modeling (6), Requirements (REQ-160) |
| §23 | The `backend/mock/*` wipe must support MongoDB sessions | Mock Data Seeding (2, 3), Requirements (REQ-161) |
| §23 | No additional mock data requirements are specified in the source notes | Mock Data Seeding (1) |
| §10.3 | `backend/mock/*` data injection and wipe must support session; the write-controller session pattern is startSession → startTransaction → commit or abort → endSession in `finally` | Backend Architecture (3), Mock Data Seeding (2), Requirements (REQ-082) |
| §25.1 | `backend/mock/*` is an explicit backend path | Project Directory Structure (4), Mock Data Seeding (6) |
| §33 (ADR-037) | Mock Data Seeding Strategy — metadata-only audio clips: mock narration records carry clip metadata but no real audio files | Mock Data Seeding (5), Data Modeling (6), Decision Log (AD-009), Requirements (REQ-162) |
| Codebase (`backend/`, `backend/package.json`) | No `mock/` or `seed/` directory and no seed npm script exist yet — the mock modules are created during implementation; mongoose ^9.7.4 is installed (MongoDB sessions supported) | Mock Data Seeding (6), Project Directory Structure (4) |

## Source Trace Map — Phase 24 (source §24)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §24.2 | Modeling rules: hooks/instance/static methods support session options; `schema.index(..)`; no `unique: true` + separate-index combos; mongoose-paginate-v2 on all list endpoints | Data Modeling (3), Business Rules (BR-11/12), Backend Architecture (10), Requirements (REQ-165/166) |
| §24.4 | Report schema: `user` (required ref), `date` (DD-MM-YYYY string, `createdAt` for sorting), `branches[]` with per-branch `clockIn`/`clockOut` (12-hour strings), top-level `clockIn`/`clockOut`, `audio[]`, `transcription` (default null), status enum `draft | audio_attached | transcribed | reviewed | completed` (default `draft`), `isArchived`/`archivedAt`, `generated`, `generatedHistory[]` (`{ provider, text, generatedAt }`); indexes `{ user, createdAt }`, `{ status }`, TTL 30-day partial `archivedAt`; toJSON/toObject delete `id`/`__v` | Data Modeling (4.1, 6), API Contract (8), Status Machine (3), Report Domain (9), Requirements (REQ-168/169/171) |
| §24.5 | Audio schema: `user`/`report` refs (both required), `originalName`, `mimeType`, `filePath` (`uploads/audio/{uuid}.webm`), `fileSize` (≤ 50 MB), `duration` (≤ 900 s via ffprobe); no status field | Data Modeling (4.2), API Contract (8), Requirements (REQ-139..143) |
| §24.6 | Transcription schema: `user`/`report` refs, `raw`, `latest` (starts empty), `history[]` (`{ instruction, reviewed, reviewer: User ObjectId | "addis" | "gemini" | "nvidia", editedAt }`); no status field; three review modes (direct edit / instruction→AI / voice→STT→AI) | Data Modeling (4.3), AI Prompt Spec (11), Rules (6), Requirements (REQ-149) |
| §24.7 | User schema: `firstName`/`lastName` (default ""), `email` (required, lowercase, trim, unique index), `password` (required, `select: false`, bcryptjs 12-round pre-save hook when modified), `avatar`/`position` (default ""), `refreshToken`, `authProvider` (`local | google`); `fullName` virtual; `comparePassword` via `bcrypt.compare`; name extraction from email local part; toJSON deletes `password` | Data Modeling (4.4), Auth Cookies (4), Requirements (REQ-167/170) |
| §24.8 | Branch schema: `name` (required), `location`, `isArchived`/`archivedAt`, `user` ref; unique `{ user, name }` index; TTL 30-day partial `archivedAt` | Data Modeling (4.5), API Contract (8) |
| §24.9 | ChatConversation schema: `user`/`report` refs (required), `title` (default "New Chat"), `messages[]` (`{ id, role, status, parts (4 tool shapes), provider ("addis" | "gemini" | "nvidia"), createdAt }` — provider is the user-approved Phase 24 extension for REQ-133); index `{ user, updatedAt: -1 }`; deleting a report does not delete its conversations | Data Modeling (4.6), API Contract (8), Other AI Providers (2), Requirements (REQ-172) |
| §24.10 | Relationship model: Report is the hub — Audio/Transcription point back to Report; bidirectional user ownership on Report, Branch, Audio, Transcription, ChatConversation | Data Modeling (2) |

## Source Trace Map — Phase 25 (source §25)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §25.1 | Explicit backend paths: `app.js`, `server.js`, `config/env.js`, `config/db.js`, `routes/index.js`, per-domain `routes/*.js` modules, per-domain `validators/*.js`, `utils/constants.js`, `utils/httpStatus.js`, `utils/logger.js`, `services/oauth.service.js`, `middleware/notFound.middleware.js` (unmatched routes → `CustomError(404)` → `next()`), `mock/*`, `uploads/audio/` (runtime-created, gitignored `{uuid}.webm` clips) | Project Directory Structure (1, 4), Backend Architecture (10), Mock Data Seeding (6), Requirements (REQ-174) |
| §25.2 | Explicit frontend paths: `client/src/main.jsx`, `App.jsx`, lazy-loaded `pages/*`, `components/layout/*`, `components/<domain>/*`, `utils/constants.js`, `redux/app/store.js`, `redux/features/api.js` and `<name>Slice.js` files, `components/reusable/*`, `components/columns/*`, `theme/*` (incl. `redux/features/assistantApi.js`) | Project Directory Structure (5), Requirements (REQ-175) |
| §25.3 | Complete tree generated from the current `backend/*` + `client/*` codebases plus the §25.1/§25.2 explicit paths and this document | Project Directory Structure (1, 4, 5, 6), Requirements (REQ-173) |
| §10.3 + §25.1 | Per-domain file pattern: one controller file per domain — `<domain>.controller.js` / `<domain>.routes.js` / `<domain>.validator.js` / `<domain>.model.js`; external integrations in `services/*.service.js`; cross-cutting concerns in `middleware/*.middleware.js` | Coding Conventions (6), Project Directory Structure (4, 6), Requirements (REQ-176) |
| §25.4 | Directory conventions: no source files are created outside the documented tree; every file created during implementation lands in the §4/§5 subtrees | Project Directory Structure (6), Requirements (REQ-173) |
| Phase 25 user decision (AD-012) | Google Docs export uses the user's own Google OAuth token (login flow extended with the `drive.file` scope) to create the document in the user's own Google Drive — replacing the earlier Google Service Account mechanism, which cannot place files in a user's Drive | Export Spec (4), API Contract (7), Work Flow (5), Environment Config (2), Security (4), Glossary, Requirements (REQ-158, REQ-177), Decision Log (AD-012) |
| Phase 25 user decision (AD-013) | AI provider integrations live in separate services files — `addis.service.js`, `gemini.service.js`, `nvidia.service.js` — plus `googleDocs.service.js`; controllers stay thin | Architecture (5), Coding Conventions (6), Project Directory Structure (4), Decision Log (AD-013) |
| Phase 25 user decision | Google Docs export endpoint path finalized: `POST /api/v1/reports/:reportId/export`; handler `exportReport` in `report.controller.js`; document creation in `services/googleDocs.service.js` | API Contract (7), Project Directory Structure (4) |
| Phase 25 | Mock entry points finalized: `backend/mock/seed.js` and `backend/mock/wipe.js`, npm scripts `mock:seed`/`mock:wipe` with the `NODE_ENV` production guard — resolves the Phase 23 deferral | Mock Data Seeding (6), Project Directory Structure (4) |
| Codebase (`backend/`, `client/`) | `backend/` holds only `.env`, `package.json`, `package-lock.json`; `client/src` holds only `main.jsx`, `App.jsx`, `theme/`, `assets/` — the rest of the tree is created during implementation | Project Directory Structure (1, 4, 5, 6) |

## Source Trace Map — Phase 26 (source §26)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §26 | Formatting rules: ES Modules only (`"type": "module"` + `import`/`export`); no `console.log` in backend (Winston replaces it in all environments; `console.log` allowed frontend); no zod — manual resolvers with a consistent error shape; semicolons required, single quotes, trailing commas, 2-space indentation, 100-character width, LF line endings, UTF-8 encoding | Coding Conventions (7), Rules (7), Requirements (REQ-178) |
| §26 | Naming conventions: camelCase variables and functions, PascalCase classes and components, kebab-case file names, UPPER_SNAKE_CASE constants and environment variables | Coding Conventions (8), Rules (7), Requirements (REQ-179) |
| §26 | Import conventions: built-in → npm → local, alphabetical within groups; named imports for utilities and functions; default import for React components; never `*` imports | Coding Conventions (9), Rules (7), Requirements (REQ-180) |
| §26 | No unused imports, no unused exports, no dead code; unused parameters carry the `_` prefix (`_req`, `_res`, `_next`) | Coding Conventions (10), Rules (7), Requirements (REQ-181) |
| §26 | Frontend conventions: functional components with hooks, props destructured in the function signature, `handle`-prefixed event handlers | Coding Conventions (12), Rules (7), Requirements (REQ-182) |
| §26 | Backend convention: user IDs via `req.user._id.toString()` | Coding Conventions (11), Rules (7), Requirements (REQ-183) |
| §26 | Build and lint gates: `npx vite build` with 0 errors; lint passes — the source lists `npx eslint src/` (client-side), implemented as `npm run lint` (`eslint .` with the flat config) | Coding Conventions (13), Rules (7), Checklists (2), Requirements (REQ-184) |
| §26 | JSDoc: a JSDoc block comment at the top of every file or module; `@module` on all public modules; `@param`, `@returns`, `@throws` on functions; `@type` on constants; JSDoc on exports; no unused exports — every exported function or constant is imported elsewhere | JSDoc Standards (1), Coding Conventions (10), Requirements (REQ-185/186) |
| Codebase (`client/eslint.config.js`, `client/package.json`) | ESLint 10 flat config (`@eslint/js` recommended + react-hooks flat recommended + react-refresh vite, browser globals, JSX, ignores `dist`); `lint` script is `eslint .`; no ESLint config or lint script exists in `backend/` — lint is scoped to the frontend (codebase fact) | Coding Conventions (13), Rules (7), Checklists (2) |
| Codebase (`client/src/theme/*`, `client/src/main.jsx`, `client/src/App.jsx`) | Theme files already carry `@module <path>` JSDoc blocks (Phase 14-aligned); `main.jsx` and `App.jsx` are Vite template remnants (no JSDoc, double quotes) — replaced during implementation per REQ-175 | JSDoc Standards (2), Requirements (REQ-175, REQ-185) |

## Source Trace Map — Phase 27 (source §27)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §27 | Every file opens with a `@module` JSDoc block: `@module <path>/<name>` — the path is relative to the package source root (`client/src/` for the frontend, `backend/` for the backend), e.g. `@module components/reusable/FormTextField`, `@module models/dailyReport`, `@module customizations/surfaces` | JSDoc Standards (3), Requirements (REQ-187) |
| §27 | Theme customizations and the app theme provider use `@module`, never `@file` — `AppTheme.jsx` opens with `@module theme/AppTheme` (live codebase fact) | JSDoc Standards (3), Requirements (REQ-187) |
| §27 | Function tags: `@param {type} name - description`, `@returns {type}`, `@throws {ErrorType} reason` — every tag used where applicable; components and controllers use arrow functions | JSDoc Standards (4), Requirements (REQ-188) |
| §27 | Constants carry `@type` with the full type definition, e.g. `@type {Object<string, string>}` for the HTTP status map, `@type {number}` for durations | JSDoc Standards (5), Requirements (REQ-189) |
| §27 | Express types written via `import('express')` — `import('express').Request`, `import('express').Response`, `import('express').NextFunction`; Mongoose async middleware documents `@returns {Promise<void>}` | JSDoc Standards (6), Requirements (REQ-190) |
| §27 | Component JSDoc documents `@param {Object} props` and each named prop — `name`, `label`, `error`, `helperText`, `control` for RHF-bound inputs — plus the `ref` for forwardRef-wrapped inputs | JSDoc Standards (7), Requirements (REQ-191) |
| §27 | Model JSDoc: `@typedef {Object} ModelName` plus one `@property {Type} fieldName - description` line per schema field | JSDoc Standards (8), Requirements (REQ-192) |
| §27 | Middleware JSDoc documents the req/res/next triple; intentionally unused parameters carry the `_` prefix (`_req`, `_res`, `_next`) per REQ-181 | JSDoc Standards (9), Requirements (REQ-193) |
| §27 | No TypeScript — JSDoc is the type layer: `@typedef` shapes, `@param {Object}` destructured props, `@returns {Promise<Type>}` for async functions | JSDoc Standards (10), Requirements (REQ-194) |
| §27 | Six canonical sample files: theme customization, constants, model, controller, middleware, component | JSDoc Standards (11) |
| Codebase (`client/src/theme/AppTheme.jsx`) | Live function triple: `@param {{ children: React.ReactNode }} props - Theme provider props.`, `@returns {JSX.Element} Theme provider wrapper.`, `@throws {never} This component does not throw.` | JSDoc Standards (2, 4, 11) |
| Codebase (`client/src/theme/customizations/surfaces.js`, `client/src/theme/themePrimitives.js`) | `surfaces.js` opens `@module customizations/surfaces`; `themePrimitives.js` exports brand/gray/green/orange/red/blue/error/success constants without `@type` — the REQ-186 gap; constants gain `@type` during implementation (no file replacement planned) | JSDoc Standards (2, 5), Requirements (REQ-186) |

---

## Source Trace Map — Phase 28 (source §28)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §28.1 | `CustomError` class carries `statusCode`, `message`, and `isOperational`; the global error handler distinguishes operational `CustomError` from unexpected errors; development returns the full stack trace, production returns a generic message and logs programmer errors | Error Handling (1), Logging, Requirements (REQ-195, REQ-196) |
| §28.1 | `notFound.middleware.js` creates `CustomError(404)` with a descriptive message and forwards via `next()` — never responds directly | Error Handling (1), Project Directory Structure (4), Requirements (REQ-197) |
| §28.1 | Validation failures return `422` with the error envelope; `data.errors` carries per-field messages; all async controllers wrapped with `express-async-handler` | Error Handling (1), API Contract (3), Requirements (REQ-198, REQ-199) |
| §28.2 | Error/status table: validation 422, auth missing/invalid token 401, auth refresh expired 401, not found 404, file size exceeded 413, invalid MIME type 415, Mongoose CastError 400, Mongoose ValidationError 422, duplicate key (11000) 409, JsonWebTokenError 401, TokenExpiredError 401, AI service error 502 | Error Handling (2), Requirements (REQ-200) |
| §28.3 | `baseQueryWithReauth`: 401 → `POST /api/v1/auth/refresh` → retry the original request on success → on refresh failure clear auth state and redirect to login | Redux RTK Query (2), Error Handling (3) |
| §28.3 | `onQueryStarted` `if (error)` pattern; per-field `error.data.data.errors`; `AppToastContainer` toasts; message extraction chain `error.data?.message || error.data?.data?.errors?.[0]?.message || 'Something went wrong'` | Error Handling (3), Redux RTK Query (5), Requirements (REQ-201) |
| §28.3 | `AppErrorBoundary`: class component catching React render errors with a fallback UI | Error Handling (3), Frontend Architecture (2), Requirements (REQ-202) |
| Codebase (`client/package.json`) | `react-toastify` `^11.1.0` (AppToastContainer toasts) and `react-error-boundary` `^6.1.2` (AppErrorBoundary) are installed; no error components, `utils/error.js`, or `middleware/error.middleware.js` exist yet — created during implementation | Error Handling (3), Redux RTK Query (5) |

---

## Source Trace Map — Phase 29 (source §29)

| Source ref | Fact | Recorded in spec section |
|---|---|---|
| §29.1 | `.env` files gitignored, never committed; no `.env.example` files; API keys only in `backend/.env`; all service calls proxied through the backend; no keys in frontend code, Vite env vars, localStorage, Redux state, or client logs | Security (1), Environment Config (1, 4), Rules (8), Requirements (REQ-120, REQ-121, REQ-123, REQ-125) |
| §29.2 | Two-token system with httpOnly cookies: access 15min TTL path `/`, refresh 7d TTL path `/api/v1`; `secure` in production, `sameSite: lax`; tokens never exposed to JavaScript; refresh token rotated per use; no sessions MongoDB collection | Security (2), Auth Cookies (1), Requirements (REQ-087) |
| §29.3 | CORS origin from `CLIENT_ORIGIN` (default `http://localhost:3000`), `credentials: true` | Security (3), Environment Config (2), Requirements (REQ-203) |
| §29.4 | Rate limiting three tiers: global 100/15min all endpoints, auth 20/15min register+login, AI 10/1min generation/correction; overflow returns 429 with the error envelope | Security (4), Error Handling (2), Requirements (REQ-092, REQ-204) |
| §29.5 | Fixed middleware stack order `helmet -> cors -> compression -> cookie-parser -> mongo-sanitize -> rate-limit` with per-step rationale; never reordered or removed | Security (5), Backend Architecture (2), Requirements (REQ-081) |
| §29.6 | `express-mongo-sanitize` strips `$` and `.` from `req.body`, `req.query`, `req.params` globally | Security (6), Requirements (REQ-081) |
| §29.7 | All inputs validated with `express-validator`; validation errors return 422 `{ success: false, message: 'Validation failed', data: { errors: [...] } }` | Security (7), Error Handling (1), API Contract (3), Requirements (REQ-198) |
| §29.8 | Audio upload validation server-side: MIME type check, file size check, ffprobe duration validation | Security (8), Audio Recording STT (6), Requirements (REQ-142) |
| §29.9 | Safe logging: production logs never include passwords, JWT values, raw cookies, API keys, raw audio contents, full transcriptions, or full report texts — message IDs or truncated previews instead | Security (9), Logging, Requirements (REQ-086) |
| §29.10 | Multi-document writes use Mongoose sessions with transactions: `startSession → startTransaction → writes → commitTransaction → catch → abortTransaction → finally → endSession` | Security (10), Backend Architecture (3), Requirements (REQ-082) |
| §29.11 | Password handling: `bcryptjs`, 12 salt rounds; plaintext never compared — `User.comparePassword()`; password excluded from JSON serialization | Security (11), Auth Cookies (3), Data Modeling (4.4), Requirements (REQ-089, REQ-167/170) |
| §29.12 | Graceful shutdown on SIGINT/SIGTERM: `server.close()` → cleanup temp audio files → `mongoose.connection.close()` → `process.exit(1)`; force exit after 30 seconds if hangs | Security (12), Backend Architecture (8), Requirements (REQ-084, REQ-205) |
| Codebase (`backend/package.json`) | Security-relevant deps installed: `bcryptjs` `^3.0.3`, `compression` `^1.8.1`, `cookie-parser` `^1.4.7`, `cors` `^2.8.6`, `dotenv` `^17.4.2`, `express-async-handler` `^1.2.0`, `express-mongo-sanitize` `^2.2.0`, `express-rate-limit` `^8.5.2`, `express-validator` `^7.3.2`, `helmet` `^8.3.0`, `multer` `^2.2.0` | Security (3, 5, 6, 7, 8, 11) |

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
| Narration | A spoken (audio) description of supervision activities; one or more narrations are recorded per day and merge into one daily report (AD-008). Persisted as the `Audio` model — one document per recorded clip (`## Data Modeling` §4.2). | §2.1 |
| Transcription | The text produced from the recorded audio; it is reviewed and edited by the supervisor before report generation. Persisted as the `Transcription` model (`raw`, `latest`, `history[]`; §4.3). | §2.1 |
| AI conversation | A recorded exchange with the AI (prompt/history) associated with report generation; centrally managed. Persisted as the `ChatConversation` model — one conversation per report with message parts and the provider per message (§4.6). | §2.1 |
| Generated report | The AI-produced daily supervision report. Persisted as `Report.generated` — the latest AI output lives on the Report itself (AD-010; §4.1). | §2.1 |
| Report version history | The preserved historical versions of a generated report after edits. Persisted as `Report.generatedHistory[]` — the unified ReportVersion; there is no separate GeneratedReport/ReportVersion collection (AD-010; §4.1). | §2.1 |
| Reporting analytics | Basic analytics in V2 (AD-007); derived on demand from Report documents — no analytics collection (AD-011); the advanced analytics dashboard with detailed metrics is deferred. | §2.1, §1.7 |
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
| Route guard | A React component that gates route access: `ProtectedRoute` shows a spinner while initializing, calls `GET /api/v1/auth/me` on mount, and redirects unauthenticated users to `/login` preserving `state.from`; `PublicRoute` is the inverse guard, redirecting authenticated users to `/dashboard`. | §12.4 |
| React.lazy | React's code-splitting function used to lazy-load every page module (`React.lazy(() => import('./pages/X.jsx'))`); no page is statically imported into the route tree. | §12.1, §12.6 |
| AppShell | The protected application shell (`client/src/components/layout/AppShell.jsx`): AppSidebar + content area (protected MuiAppbar → Page Header → `<Outlet />`); provided by routing — page components never render it; hosts Dashboard, Reports, ReportDetails, Branches, BranchDetails, Profile, and the NotFound catch-all; `/assistant` is the only protected route that lives outside AppShell. | §12.2 |
| baseQueryWithReauth | The RTK Query `baseQuery` wrapper that handles token refresh on 401 responses; all frontend HTTP calls pass through it. On 401 it calls `POST /api/v1/auth/refresh` and retries the original request on success; on refresh failure it clears auth state, dispatches logout, and leaves the user outside protected routes. | §13.2 |
| injectEndpoints | The RTK Query API-slice extension pattern: each feature slice injects its own endpoint set into the central API slice (`client/src/redux/features/api.js`) instead of one monolithic definition. | §13.1 |
| Feature slice | A Redux Toolkit slice under `client/src/redux/features/` that owns one domain's state and injects its RTK Query endpoints; the feature slices are authSlice, branchSlice, reportSlice, audioSlice, transcriptionSlice, userSlice, aiConversationSlice, and analyticsSlice. | §13.1 |
| Ethiopian calendar | The 13-month calendar used in Ethiopia (month names September…August plus the short month Pagume), roughly 7–8 years behind the Gregorian calendar; the date picker displays Ethiopian dates in DD-MM-YY numeric form with English day and month names. | §14 (1.6) |
| Pagume | The 13th month of the Ethiopian calendar, five days long (six in a leap year). | §14 (1.6) |
| MUI X community edition | The free tier of the MUI X component line (charts, date pickers, data grid, and any other MUI X component); Pro and Premium features are not used. | §14.5 |
| react-hook-form (RHF) | The form library every form uses, with `register` by default and `useForm({ mode: 'onBlur' })`; installed as `react-hook-form` `^7.81.0` (`client/package.json`). | §15 |
| Controller (React Hook Form) | The RHF wrapper used only when `register` cannot work — MUI X DatePicker and TimePicker, which deliver custom onChange values instead of native events; every `Controller` use documents why with a code comment. | §15 |
| formState | The RHF object exposing `errors` (validation messages keyed by field name) and `isSubmitting` (true while the async submit handler runs); it drives MUI `error`/`helperText` display and submit-button loading. | §15 |
| Icon-first rule | Action buttons always show icons at `vw < 600` and at `vw < 768 && landscape`, so every button remains identifiable on small screens and landscape phones. | §16 |
| Ellipsis rule | Text never overflows or overlaps at any width; long text truncates with an ellipsis after a certain character count; the app never scrolls horizontally. | §16 |
| config/env.js (env gate) | The single backend module that reads `process.env` into a frozen, validated `env` object; `process.env` is never accessed outside it. | §17 |
| import.meta.env | The Vite mechanism the client uses to read `VITE_`-prefixed environment variables. | §17 |
| Addis-፩-አሌፍ | The Addis AI text model used for report generation and correction; configured via `ADDIS_AI_TEXT_MODEL` and sent as `model` in `chat_generate` requests. | §18.5 |
| x-api-key | The HTTP header Addis AI REST authentication uses; it carries the `sk_`-prefixed secret key and is sent by backend services only. | §18.4 |
| gemini-3.1-flash-lite | The Gemini text-generation model used as a fallback provider; configured via `GEMINI_API_KEY` and called through the `generateContent` endpoint. | §19.1 |
| z-ai/glm-5.2 | The Nvidia text-generation model used as a fallback provider; configured via `NVIDIA_API_KEY` and called through the Nvidia message format with a bearer token. | §19.2 |
| aiCorrectedText | Superseded field name (Phase 24, AD-011): AI transcription corrections are stored as `Transcription.latest` plus a new `history[]` entry whose `reviewer` is the provider string (`## Data Modeling` §4.3). | §21.4 |
| Noto Sans Ethiopic | The Amharic-capable Unicode font used to render Amharic text in the PDF export (section headers and body). | §22 |
| Google Drive export | The Google Docs export mechanism (Phase 25 user decision): the backend creates the document with the user's own Google OAuth token — the login flow extended with the `drive.file` scope — so the document lands in the user's own Google Drive, fully owned and editable by the user. | §22 |
| Mock data | Development/demo-only records injected into MongoDB via `backend/mock/*`; injection and wipe run inside MongoDB sessions, mock narrations are metadata-only (no audio files), and the commands refuse to run when `NODE_ENV` is `production` (AD-009). | §23, §33 (ADR-037) |
| JSDoc | JavaScript documentation comments: a JSDoc block comment at the top of every file or module, plus `@module` on public modules, `@param`/`@returns`/`@throws` on functions, `@type` on constants, and JSDoc on exports (REQ-185/186). | §26 |
| `@typedef` | JSDoc tag that defines a reusable type shape — used to document Mongoose models (`@typedef {Object} ModelName` with one `@property` line per field) and other compound types in place of TypeScript (REQ-192, REQ-194). | §27 |
| CustomError | The backend error class in `backend/utils/error.js` carrying `statusCode`, `message`, and `isOperational`; operational `CustomError`s respond with their status and the §10.7 envelope, while unexpected errors are logged and get a generic production message (REQ-195, REQ-196). | §28.1 |
| AppErrorBoundary | The class-component error boundary (react-error-boundary `^6.1.2`) that catches React render errors and shows a fallback UI; it wraps the router content in `App.jsx` alongside `AppToastContainer` (REQ-202). | §28.3 |
| AppToastContainer | The react-toastify toast container (`^11.1.0`) composed in `App.jsx`; success/error toasts fire from the RTK Query `onQueryStarted` error pattern (REQ-201). | §28.3 |
| CORS | Cross-Origin Resource Sharing: the backend allows only the `CLIENT_ORIGIN` origin (default `http://localhost:3000`) with `credentials: true` so the httpOnly auth cookies are sent; a wildcard origin is never used (REQ-203). | §29.3 |
| helmet | The backend middleware that sets secure HTTP response headers; it is the first step of the fixed security middleware stack (REQ-081). | §29.5 |
| express-mongo-sanitize | The backend middleware that strips `$` and `.` from `req.body`, `req.query`, and `req.params` globally, preventing NoSQL injection; the fifth step of the fixed security middleware stack (REQ-081). | §29.6 |
| 429 Too Many Requests | The HTTP status returned when a rate-limit tier is exceeded, with the §10.7 error envelope (REQ-204). | §29.4 |
| Dead code | Code that is never executed or never used: unused imports, unused exports, unused constants/variables/methods; unused parameters carry the `_` prefix (`_req`, `_res`, `_next`) (REQ-181). | §26 |

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

### Functional Requirements (Phase 12)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-094 | The frontend must use React Router data mode: `createBrowserRouter` + `RouterProvider` in `client/src/main.jsx`; the flat route array lives in `main.jsx` (never in `App.jsx`); route objects use `Component`, never `element`; every page module is lazy-loaded per module via `React.lazy`; `main.jsx` wraps the router in `LocalizationProvider` + `AdapterDayjs`; `App.jsx` is the root layout composing AppTheme, CssBaseline, AppErrorBoundary, AppToastContainer, and `<Outlet />`. | Routes are created with `createBrowserRouter` and rendered via `RouterProvider`; `main.jsx` holds the route array; no `element:` usage; every page uses `React.lazy`; the root layout composes the five listed elements. | §12.1, §12.5 |
| REQ-095 | Route guards must gate access: `ProtectedRoute` shows a spinner while auth state is `initializing`, calls `GET /api/v1/auth/me` on mount, clears auth state and redirects on failure, and redirects unauthenticated users with `<Navigate to="/login" state={{ from: location }}>`; `PublicRoute` is the inverse guard and redirects authenticated users to `/dashboard`. | Both guards exist with the stated behaviors; login navigates back to `state.from.pathname` after sign-in. | §12.4 |
| REQ-096 | The shell must follow the fixed scroll/layout contract: outer container `height: 100vh; overflow: hidden`; chrome (app bar/sidebar) fixed; content area `overflow-y: auto`; the `body`/`html` elements never scroll. | The stated layout and scroll rules hold on every page. | §12.2 |
| REQ-097 | The AppSidebar must use MUI Drawer with variant switching: xs (<600px) and sm landscape (600–899px) temporary overlay drawer 240px (opens via the header menu icon, closes on backdrop/nav select/Escape); md+ (≥900px) permanent docked drawer 240px by default; md+ toggled permanent mini drawer 64px (icons only, MuiTooltip on hover); nav items follow the specified theming (default transparent/text.secondary; hover `action.hover` radius 8; selected `primary.main + 0.08` with `borderLeft: 3px solid primary.main` and weight 600; icons primary when selected, `action.active` by default; logout hover `error.main + 0.08`); logout dispatches RTK `logout()`, clears cookies, and navigates to `/login`. | The three responsive modes exist with the stated widths; nav theming and logout behavior match. | §12.2, §12.3 |
| REQ-098 | Pages use the Page Header pattern (MuiPageHeader, §1.12): title + subtitle on the left, action buttons on the right, all on one line; the Dashboard page renders with no Page Header. | Every non-dashboard page has a one-line Page Header; Dashboard has none. | §12.6 |
| REQ-099 | The GlobalSearchDialog must follow the responsive sizing rules (full-screen below 600px and below 768px landscape; centered 80vh/600px for 600–1200px; 70vh/720px above 1200px), take its input from react-hook-form `register('search')`, fire on Enter or click with no debounce, group results by entity type (Reports, Branches) in MuiAccordion sections, and show "No results found" when empty. | Sizing, input, trigger, grouping, and empty-state behaviors match. | §12.3 |
| REQ-100 | The frontend must ship the `useAuth` hook (auth state convenience) and the `useAudioRecorder` hook (MediaRecorder state/actions) under `client/src/hooks/`. | Both hooks exist and expose the stated behaviors. | §12.7 |

### Functional Requirements (Phase 13)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-103 | The frontend must use Redux Toolkit: the store lives at `client/src/redux/app/store.js`; the API slice lives at `client/src/redux/features/api.js` and is created with `createApi` + `fetchBaseQuery` + `baseQueryWithReauth`; feature slices follow `client/src/redux/features/<name>Slice.js` — authSlice, branchSlice, reportSlice, audioSlice, transcriptionSlice, userSlice, aiConversationSlice, analyticsSlice — each injecting its endpoints into the API slice via `injectEndpoints`; the Redux `<Provider store>` wraps the app in `main.jsx` as the outermost wrapper (above `LocalizationProvider` + the router). | Store, API slice, and the eight feature slices exist at the stated paths; every slice uses `injectEndpoints`; the Provider is the outermost wrapper in `main.jsx`. | §13.1 |
| REQ-104 | All frontend HTTP calls must go through `baseQueryWithReauth` in `client/src/redux/features/api.js`, which calls `fetchBaseQuery` configured with `baseUrl` = `VITE_API_BASE_URL` (from `API_CONFIG` in `client/src/utils/constants.js`) and `credentials: 'include'`. | No raw `fetch`/axios calls exist in the client; every call goes through the API slice with the stated base URL and credentials. | §13.2, §10.5, REQ-093 |
| REQ-105 | On a 401 response (`result.error && result.error.status === 401`) `baseQueryWithReauth` must attempt `POST /api/v1/auth/refresh` via `baseQuery({ url }, api, extraOptions)`; on refresh success it must retry the original request (`result = await baseQuery(args, api, extraOptions)`); on refresh failure it must clear everything, dispatch logout, and ensure the user is outside of protected routes. | The refresh→retry→logout sequence works end-to-end exactly as stated; a failed refresh leaves the user on a public page. | §13.2 |
| REQ-106 | Auth endpoints must be excluded from the 401-refresh handling on public pages, and backend responses must be properly transformed — the §10.7 response envelope is unwrapped (`transformResponse`) into the shapes the UI consumes, and errors surface via the envelope (`error.data.message`). | No refresh loop occurs on public auth pages; response and error shapes are transformed consistently. | §13.2 |

### Functional Requirements (Phase 14)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-107 | All MUI imports must be tree-shaken (e.g. `import TextField from '@mui/material/TextField'`); the `@mui/material` barrel is never imported; MUI Grid uses the `size` prop, not `item`; the deprecated MUI props are banned — `margin="normal"` becomes `sx={{ mb: 2 }}`, `InputProps` becomes `slotProps.input`, `Box component="form"` becomes native `<form>`, `Box component="img"` becomes native `<img>`, `Link component="button"` becomes `Link slots={{ root: 'button' }}`; styling uses MUI `sx` and `styled()` only — never Tailwind and never inline `style`; `sx` values use theme-aware tokens (`text.secondary`, `background.paper`, `error.main`); `themePrimitives.js` is never imported directly; grey colors come from `theme.palette.grey[N]`; `gray[50]`, `gray[800]`, and `brand[400]` are never used directly; all `sx` color values are mode-aware (`text.primary`, `background.default`, `grey.500`). | No barrel imports, deprecated props, Tailwind, inline styles, or direct themePrimitives/gray/brand token usage exist anywhere in the client; Grids use `size`; forms and images use native elements; sx values resolve through the theme in both color modes. | §14.1 |
| REQ-108 | Reusable MUI components must live in `client/src/components/reusable/*`, be prefixed `Mui`, and follow the reusable-component contract: input components use `forwardRef` (presentation wrappers do not), wrapped components set `displayName`, defaults are `size="small"` where applicable (TextField, Select, Button), wrappers are pure with all standard MUI props passed through and no custom API surface, adornments use `slotProps.input` (never `InputProps`), and every input element has a proper start adornment. | The reusable components exist at the stated path with the stated contract; the client always uses them instead of raw `@mui/material/<component>`. | §14.2 |
| REQ-109 | The reusable components must implement the §14.3 specific requirements: MuiTextField handles password type internally (eye toggle via `useState` + `useCallback`, `onMouseDown` prevents focus loss, no layout shift, caller's `slotProps.input.endAdornment` merged after the eye); MuiButton uses MUI native `loading` with `loadingIndicator={<CircularProgress size={20} />}` and `loadingPosition="center"`; MuiDialog passes or supports `disableEnforceFocus` and `disableRestoreFocus` defaulting to `true` and is always used instead of raw `@mui/material/Dialog`; MuiConfirmDialog exposes `open`/`onClose`/`onConfirm`/`title`/`message`/`confirmText` (default "Confirm")/`cancelText` (default "Cancel")/`confirmColor` (default `"primary"`, overridable to `"error"` for delete); MuiDataGrid has a toolbar, selection export, per-domain columns in `client/src/components/columns/*` with the action column last (view, update, archive, restore, delete with tooltips and `sx` theme-path icon colors — never the `color` prop — plus the archive→MuiConfirmDialog→restore-or-delete flow), server-side pagination, and skeleton loading rows; MuiSelect defaults `MenuProps` maxHeight 300; MuiPagination defaults `color="primary"` and `shape="rounded"` and is used for list-view pagination only; GlobalSearchDialog uses RHF `useForm` with an uncontrolled `register('search')` input and an `ArrowBackIcon` start adornment that clears the field, resets results, and closes the dialog; LoadingSpinner is a centered CircularProgress with an optional message. | Each stated component behaves as specified; no component is bypassed with raw MUI equivalents. | §14.3 |
| REQ-110 | The date picker must switch explicitly between `DesktopDatePicker` on md+ (popper) and `MobileDatePicker` below md (dialog) using `theme.breakpoints.up('md')` — never relying on auto-switching — and must support Ethiopian dates: a custom conversion utility `client/src/utils/ethiopianDate.js` (`ethiopianToGregorian(ethDate)` → JS Date, `gregorianToEthiopian(jsDate)` → `{ day, month, year }`, no external npm package), display format DD-MM-YY (e.g. `25-02-18`), English day names, and English month names mapped to the Ethiopian months (September…August + Pagume); RHF integration uses `Controller`. | The date picker switches modes at the md breakpoint; Ethiopian dates convert and display as specified, including Pagume; no date-picker auto-switching. | §14 (1.6) |
| REQ-111 | All theme configuration must live in `client/src/theme/`; theme overrides are never inlined in page components and component overrides are added via new files in `customizations/`; `AppTheme.jsx` composes the full MUI theme with `createTheme`, `cssVariables`, color schemes, and all customizations; theme customization files and `AppTheme.jsx` use `@module`, not `@file`; the eight customization files are inputs, dataDisplay, feedback, navigation, surfaces, dataGrid, datePickers, charts. All MUI X components — charts, date picker, data grid, and any other MUI X component — must be community version only; no Pro or Premium features. | Theme structure matches the stated layout with the eight customization groups; no inline page-level overrides; no MUI X Pro/Premium imports or licenses in the manifest or code. | §14.4, §14.5 |

### Functional Requirements (Phase 15)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-112 | All forms must use `react-hook-form` with `register` by default and `useForm({ mode: 'onBlur' })`, destructuring `{ register, handleSubmit, formState: { errors } }`. `watch` is never used; cross-field validation uses `getValues` inside validate functions. | Every form destructures `register`/`handleSubmit`/`formState.errors` from `useForm({ mode: 'onBlur' })`; no `watch` anywhere; cross-field rules read other fields via `getValues`. | §15 |
| REQ-113 | `register` is the default integration on every input; `Controller` is used only when `register` cannot work — the MUI X DatePicker and TimePicker, which deliver custom onChange values instead of native events — and every `Controller` use documents why with a code comment. All reusable Mui input components must use `forwardRef`. | Only DatePicker/TimePicker integrations use `Controller`; each carries an explanatory comment; reusable Mui inputs are `forwardRef`. | §15 |
| REQ-114 | Validation display and input rules: `formState.errors` is the single source for validation error display; wrapped MUI components receive `error` and `helperText` props; cross-field validation uses `validate: (value) => value === getValues('password') || 'Passwords must match'` (confirm password); input is never debounced and `useDebounce` is never used — direct register integration only. | Errors render under their fields via MUI `error`/`helperText` from `formState.errors`; confirm-password validates against `getValues('password')`; no debounce/useDebounce usage anywhere. | §15 |
| REQ-115 | Submission rules: `handleSubmit(onSubmit)` with try/catch; `reset()` runs only after success; backend validation errors surface via `setError('fieldName', { message: error.data?.data?.errors?.[0]?.message })`; `isSubmitting` disables the submit button and shows the spinner. | Failed submissions never reset the form; backend 422s land under the offending field via `setError`; the submit button shows `isSubmitting` loading. | §15 |
| REQ-116 | Schema validation must use a manual resolver with a consistent error shape; zod is never used. | No zod dependency or usage; validation is manual with a uniform error shape. | §15 |

### Functional Requirements (Phase 16)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-117 | All form submit buttons must use `size="small"` and must not shrink on flex — `flexShrink: 0` — so the button keeps its size in every layout. | Every submit button is `size="small"` with `flexShrink: 0`; no submit button shrinks inside flex containers. | §16 |
| REQ-118 | Icons are always used on action buttons at `vw < 600` and at `vw < 768 && landscape`; small-screen and landscape buttons never lose their icons. | Action buttons on those viewport conditions render with icons; icon-free action buttons do not appear there. | §16 |
| REQ-119 | Text must never overflow or overlap at mobile or desktop widths; all text uses ellipsis after a certain character count — no horizontal scroll anywhere. | No text overflow or overlap at any width; long text ellipsizes; the app never scrolls horizontally. | §16 |

### Functional Requirements (Phase 17)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-120 | Environment file rules: `.env` files are gitignored and never committed; no `.env.example` files are created; new env vars follow the three-step process (local `.env` → config object in `config/env.js` → validation/default logic in `config/env.js`); `process.env` is never accessed outside `config/env.js`; client env vars are prefixed with `VITE_` and read via `import.meta.env.*`. | `.env` is gitignored; no `.env.example` exists; new vars are added through all three steps; no `process.env` access outside `config/env.js`; client reads only `VITE_*` vars via `import.meta.env`. | §17.1 |
| REQ-121 | The backend reads every environment variable required by the §17.2 contract — NODE_ENV, PORT, CLIENT_ORIGIN, MONGODB_URI, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET (each min 32 chars), JWT_ACCESS_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN, the seven ADDIS_AI_* vars, LOG_LEVEL, NVIDIA_API_KEY, GEMINI_API_KEY, NVIDIA_API_BASE_URL, GEMINI_API_BASE_URL, FFMPEG_PATH, FFPROBE_PATH — and validates them in `config/env.js` at startup; the optional OAUTH_GOOGLE_* vars load when present. | Missing required vars fail startup validation with a clear error; defaults (development, 4000, http://localhost:3000, 15m, 7d, am, 360000, ffmpeg, ffprobe) apply when the source allows; optional vars are read only when defined. | §17.2 |
| REQ-122 | The client reads `VITE_API_BASE_URL` (default http://localhost:4000/api/v1) and `VITE_APP_NAME` (default Report Builder V2) via `import.meta.env.*`. | `client/.env` carries both keys; the Redux RTK Query client uses `VITE_API_BASE_URL` through `API_CONFIG`; no client env var lacks the `VITE_` prefix. | §17.3 |
| REQ-123 | AI key rules: Addis AI `sk_` keys never appear in client code, Vite env vars sent to the browser, localStorage, Redux state, or client logs; Nvidia and Gemini API keys are placed in `backend/.env` only. | No `sk_` value exists anywhere in `client/src`, browser-visible Vite env, localStorage, Redux state, or client logs; Nvidia/Gemini keys exist only in `backend/.env`. | §17.4 |
| REQ-124 | Backend constants are grouped and frozen in a single `Object.freeze()` object exported from `backend/utils/constants.js` — Audio (900, 52428800, the four MIME types), Pagination (1, 10, 100), STT (60), Auth (12), AI Generation (0.2, 2048, 0.9, 40), AI Correction (2048, 0.15) — and nothing is hardcoded in request handlers. | `utils/constants.js` exports one frozen object with the §17.5 groups and values; request handlers reference it instead of literals. | §17.5 |

### Functional Requirements (Phase 18)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-125 | All Addis AI calls are made only from backend services via native `fetch` (backend-only proxy); no direct client-to-Addis AI calls exist; no Addis AI SDK is installed. | Client code never calls any Addis AI URL; backend services own every Addis AI call; no Addis AI SDK dependency in either package.json. | §18.4, §18.14 |
| REQ-126 | Every Addis AI REST call sends the secret key in the `x-api-key` header; secret keys start with `sk_`. | All Addis AI service calls include `x-api-key`; no key appears in URLs, query strings, or request bodies. | §18.4 |
| REQ-127 | Report generation and correction call `POST /api/v1/chat_generate` with the `Addis-፩-አሌፍ` model, the strict report prompt, `target_language` from `ADDIS_AI_DEFAULT_TARGET_LANGUAGE`, `conversation_history` for correction turns, and `generation_config` from the frozen constants (generation: temperature 0.2, maxOutputTokens 2048, topP 0.9, topK 40; correction: maxOutputTokens 2048, temperature 0.15). | The service builds the request from `config/env.js` values and the frozen constants; no literal model names or generation values are hardcoded in handlers. | §18.5, §18.7, §17.5 (REQ-124) |
| REQ-128 | Speech-to-text calls `POST /api/v2/stt` with multipart `audio` and `request_data` `{ "language_code": "am" }` (`ADDIS_AI_STT_LANGUAGE_CODE`), with at most 60 seconds and 10 MB per request; longer recordings are converted to WAV by ffmpeg in a single pass (`pcm_s16le`, 16 kHz, mono) and then split into chunks. | The STT service enforces the 60s/10MB limits; full-file conversion happens before any PCM-level split; per-segment re-encoding never happens. | §18.8, REQ-124 |
| REQ-129 | Addis AI errors map to safe user messages; provider request IDs and status codes are logged (never raw report content); network failures retry 3 times with exponential backoff (1s, 2s, 4s); provider 4xx/5xx errors mark the chunk as failed and continue processing remaining chunks. | Timeout and retry logic exists in the AI client; provider errors never surface raw messages to the user; logs contain request IDs/status codes only. | §18.13, §18.8 |
| REQ-130 | TTS, translation, multimodal, and realtime are not part of the first report-builder workflow; the app never translates reports by default (content may be intentionally Amharic, English, or mixed). | No TTS/translation/multimodal/realtime calls exist in the first workflow; no automatic translation runs on generated reports. | §18.9, §18.10, §18.11, §18.12, PR-17 |
| REQ-131 | Amharic and English-aware prompting are first-class (`ADDIS_AI_DEFAULT_TARGET_LANGUAGE` = `am`); language constants remain extensible for Oromo `om` and Tigrinya where appropriate. | Language values come from `config/env.js`/constants, not literals; om/ti entries can be added without code rewiring. | §18.6 |

### Functional Requirements (Phase 19)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-132 | All three providers are available (Addis AI, Gemini, Nvidia); STT always uses Addis AI; the user selects the text-generation provider at generation time via dropdown or buttons, default Addis. | Provider selection UI exists with Addis as default; STT calls only ever target Addis AI. | §19 |
| REQ-133 | The provider is stored per AI conversation message; different providers can be used for corrections versus initial generation. | Every AI conversation message records its provider; a correction run may use a different provider than the initial generation. | §19 |
| REQ-134 | The provider fallback chain is Addis → Gemini → Nvidia; when the selected provider fails, the next provider in the chain is used. | Fallback logic exists in the AI client; failures cascade through the chain in order. | §19 |
| REQ-135 | All AI providers used must be free — no credit card or subscription required; non-free AI is never used. | No provider requires payment; no non-free AI service is called. | §19 |
| REQ-136 | Gemini integration uses model `gemini-3.1-flash-lite`; `POST …:generateContent?key=${GEMINI_API_KEY}` with request `{ contents, systemInstruction, generationConfig }` (temperature 0.2, maxOutputTokens 2048, topP 0.9, topK 40); no streaming; network failures retry 3 times with exponential backoff; provider errors return 502. | The Gemini service builds the documented request; retries and the 502 mapping behave per contract. | §19.1 |
| REQ-137 | Nvidia integration uses model `z-ai/glm-5.2` with the Nvidia API message format and `Authorization: Bearer` token; network failures retry 3 times with exponential backoff; provider errors return 502. | The Nvidia service builds the documented message format; retries and the 502 mapping behave per contract. | §19.2 |
| REQ-138 | Gemini and Nvidia calls use axios (echo of REQ-078); axios is absent from `backend/package.json` and is added during implementation. | All Gemini/Nvidia calls go through axios; axios appears in `backend/package.json` during implementation. | §19, §9.1 (REQ-078) |

### Functional Requirements (Phase 20)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-139 | Recording limits: max 15 minutes per clip (`AUDIO_MAX_DURATION_SEC` = 900) and max 50 MB per clip (`AUDIO_MAX_SIZE_BYTES` = 52428800), enforced client-side after recording stops; a clip over 50 MB blocks the submit with a warning and asks for a re-record. | Clips over 50 MB cannot be submitted; the supervisor is told to re-record; limits match the constants. | §20.1 |
| REQ-140 | Each clip is recorded with the browser MediaRecorder API into a local-state array via a custom hook; the full array is submitted as the multipart field `clips`; audio blobs are never persisted to Redux, redux-persist, or localStorage. | Multiple clips submit together; blobs exist in component state only. | §20.1 |
| REQ-141 | MIME priority: `audio/webm;codecs=opus` → `audio/webm` → `audio/mp4` → browser default. | The recorder selects the first supported type in priority order. | §20.1 |
| REQ-142 | Validation: at least one clip required; max 50 MB per clip (configurable); MIME type in the whitelist; duration metadata informational; server-side ffprobe duration validation and multer type/size validation. | The upload is rejected without clips or with oversized/unwhitelisted files; ffprobe and multer validate server-side. | §20.2 |
| REQ-143 | Uploads go through multer into `backend/uploads/audio/`, which is gitignored and never committed. | Uploaded audio lands in `backend/uploads/audio/`; the directory is not in version control. | §20.3 |
| REQ-144 | The only approved chunking pipeline is: convert the full audio to WAV via ffmpeg in a single pass (`pcm_s16le`, 16 kHz, mono) → split in-memory at the PCM level via `wavSplitter.js` into ~60 s chunks (`ADDIS_AI_STT_MAX_DURATION_SEC` = 60) → send each chunk to Addis AI STT with MIME `audio/wav` (never `audio/webm`); alternatives are forbidden unless proven equivalent. | Chunks are always `audio/wav` from PCM-level splits of a single-pass ffmpeg WAV; no other pipeline is used. | §20.4, §18.8 (REQ-128) |
| REQ-145 | Re-transcription: the backend accepts both `audio_attached` and `transcribed` statuses for re-transcription (status name reconciled in Phase 24, AD-011); the frontend shows a "Re-transcribe" button on a completed transcription that re-runs STT on the stored audio. | Re-transcription works from both statuses; the button exists on completed transcriptions. | §20.5 |

### Functional Requirements (Phase 21)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-146 | The generation system prompt is exactly: "You are an expert report writer for a restaurant company's supervision department. Generate structured daily supervision reports in Amharic based on field note transcriptions." Parameters: temperature 0.2, maxOutputTokens 2048 (frozen AI Generation constants group). | The generation request carries the exact system message and the frozen generation parameters. | §21.1 |
| REQ-147 | The correction system prompt is exactly: "You are an expert report editor. The user has provided corrections to a previously generated report. Incorporate the corrections while maintaining the original structure and style." Parameters: temperature 0.15, maxOutputTokens 2048 (frozen AI Correction constants group). | The correction request carries the exact system message and the frozen correction parameters. | §21.2 |
| REQ-148 | Voice correction flows: correction audio → STT → correction text → the same correction prompt (REQ-147); correction STT uses the approved chunking pipeline. | A voice correction is transcribed and enters the correction prompt exactly like a typed correction. | §21.3 |
| REQ-149 | Transcription correction uses the AI to fix transcription errors (fill gaps, fix misrecognized words); the corrected text is stored on the Transcription model — written to `latest` with a new `history[]` entry whose `reviewer` is the provider string (`## Data Modeling` §4.3; the earlier `aiCorrectedText` field name is superseded, AD-011). | `Transcription.latest` carries the corrected text and `history[]` gains an entry after AI transcription correction. | §21.4 |
| REQ-150 | The prompt enforces §21.5 rules 1–6: generate in Amharic (mixed only when the transcription is English/mixed); exact section structure (ቀን, ብራንች, ስም, ስራ የገባሁበት ሰዓት, የተሰሩ ስራዎች, መፍትሄ የሚፈሉ ጉዳዮች, አጠቃላይ አስተያየት, ከስራ የወጣሁበት ሰዓት); sample tone/style; reviewed transcription as source of truth; no invented information; blank/not-specified for missing information. | The prompt text contains all six rules. | §21.5 (rules 1–6) |
| REQ-151 | The prompt enforces §21.5 rules 7–10: separate completed activities from unresolved issues; preserve branch-specific details for multi-branch reports; preserve time ranges per branch; write from the supervisor's point of view. | The prompt text contains all four rules. | §21.5 (rules 7–10) |
| REQ-152 | The prompt enforces §21.5 rules 11–12: do not output an explanation of how the report was generated; do not include unrelated conversation content. | The prompt text contains both rules. | §21.5 (rules 11–12) |
| REQ-153 | The prompt enforces §21.5 rules 13–14: corrections update only the relevant part without rewriting correct unrelated sections; English/technical words use Amharic workplace transliteration (e.g., `deep fryer` → `ዲፕ ፍራየር`). | The prompt text contains both rules, including the transliteration example. | §21.5 (rules 13–14) |

### Functional Requirements (Phase 22)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-154 | PDF export: the finalized report downloads as a PDF generated in the browser with `jspdf` and `jspdf-autotable` (already installed in `client/package.json`); A4 page size; Amharic text rendered with the Noto Sans Ethiopic font; report section headings rendered as section headers; page numbers on every page. | A PDF file downloads containing the full report in the §6.1 format, readable in Amharic, with section headers and page numbers. | §22 |
| REQ-155 | TXT export: the finalized report downloads as a plain-text file (Blob, UTF-8) preserving the §6.1 report format structure; no styling. | A UTF-8 `.txt` file downloads with the report content in order. | §22 |
| REQ-156 | CSV export: the finalized report downloads as a CSV file (Blob, UTF-8 with byte-order mark) with structured columns mapping the report content, so it opens as a usable spreadsheet (Excel-compatible). | A `.csv` file downloads and opens correctly in Excel with the report content in structured columns. | §22 |
| REQ-157 | XLSX export: the finalized report downloads as a multi-sheet workbook — a content sheet (the report), a version history sheet (every report version with date, version note, status), and a metadata sheet (AI provider, generation date, report status); the workbook library is chosen at implementation. | A `.xlsx` workbook downloads with all three sheets populated. | §22 |
| REQ-158 | Google Docs export: the backend uses the user's own Google OAuth token (the Google login flow extended with the `drive.file` scope) to create the document from the report content directly in the user's own Google Drive, and returns the document URL; the frontend opens the URL in a new tab; the user owns the document and may edit, share, download, or move it freely in Google Drive, outside the app; the user's OAuth token is stored and refreshed server-side only and never exposed to the client. | Selecting the Google Docs export returns the URL of a document that appears in the user's own Google Drive and opens in a new tab; no credentials appear in the browser. | §22 (amended in Phase 25 by user decision) |
| REQ-159 | Client-side-only rule: PDF, TXT, CSV, and XLSX exports are generated entirely in the browser — there are no backend export endpoints for these four formats; the Google Docs export (REQ-158) is the only backend export. | No `/api/v1` export routes exist for the four client-side formats; the exported content is the report as it exists at export time, with no AI re-processing. | §22 |

- Export rules: **Phase 22 — DONE (REQ-154..159)**.

### Functional Requirements (Phase 23)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-160 | The `backend/mock/*` data injection runs inside a MongoDB session: `mongoose.startSession()`, `session.startTransaction()`, write, commit or abort, `session.endSession()` in `finally`; every write passes `{ session }` and model hooks/methods support the session (REQ-082). | Injecting mock data succeeds as one all-or-nothing transaction; a failure aborts and leaves the database untouched. | §23, §10.3 |
| REQ-161 | The `backend/mock/*` wipe runs inside a MongoDB session with the same transaction pattern as REQ-160 and deletes the mock records of every seeded collection in one transaction. | Wiping mock data succeeds as one all-or-nothing transaction; all seeded collections are cleared. | §23, §10.3 |
| REQ-162 | Mock narrations are metadata-only records: clip metadata without real audio files; seeding never writes to `backend/uploads/audio/` and never calls the STT/AI providers. | No audio file is created by seeding; mock transcriptions exist as pre-created records. | §23, §33 (ADR-037) |
| REQ-163 | Mock-data injection is idempotent: it wipes existing mock records before inserting the seed set. | Re-running the inject command always ends with exactly one seed set. | §23 |
| REQ-164 | The mock-data inject and wipe commands refuse to run when `NODE_ENV` is `production`. | Running the commands with `NODE_ENV=production` exits without modifying the database. | §23 (user decision) |

### Functional Requirements (Phase 24)

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-165 | All model hooks, instance methods, and static methods support session options where relevant, so they behave correctly inside the write-controller transaction pattern (REQ-082). | Each model's hooks/methods accept and pass a session; writes inside transactions use `{ session }`. | §24.2 |
| REQ-166 | No schema field combines `unique: true` with separate indexes; uniqueness and all other indexes are declared through `schema.index(..)`. | The schemas declare `schema.index` for every index; no field-level `unique: true` appears next to separate index declarations. | §24.2 |
| REQ-167 | User passwords are hashed with bcryptjs (12 salt rounds) in a `pre('save')` hook that runs only when the password is modified; `comparePassword(candidatePassword)` compares via `bcrypt.compare`. | Registering/login flow uses `comparePassword`; saved documents never contain plaintext passwords. | §24.7, §11 |
| REQ-168 | The Report status follows the enum `draft → audio_attached → transcribed → reviewed → completed` (default `draft`) with the §24.4 lifecycle; the upload status name is `audio_attached` (the Phase 20 `audio_recorded` name is superseded). | Report documents only ever carry the five enum values; the upload sets `audio_attached`. | §24.4 |
| REQ-169 | Report and Branch documents carry 30-day TTL indexes on `archivedAt` (partial filter `archivedAt: { $ne: null }`) for the Phase 35 archive/delete/restore lifecycle. | Expired archived documents are automatically removed by the TTL monitor; active documents are never touched. | §24.4, §24.8 |
| REQ-170 | User `firstName`/`lastName` are extracted from the email local part (or the Google profile name): `beza.ayalew@example.com` → firstName `"beza"`, lastName `"ayalew"`; a local part without a separator yields a single firstName and an empty lastName. | Registration stores the extracted names; profiles can be updated later. | §24.7, §11 |
| REQ-171 | Each successful report generation appends a `generatedHistory[]` entry `{ provider, text, generatedAt }` and overwrites `Report.generated`; regeneration appends rather than replaces history. | After N generations the history array holds N entries; `generated` holds the latest text. | §24.4 (AD-010) |
| REQ-172 | ChatConversation messages carry `{ id, role, status, parts, provider, createdAt }` — `provider` is the enum `addis | gemini | nvidia` and `parts` supports the four tool shapes. | Conversation documents store messages with a provider value and parts; the provider distinguishes corrections from initial generation (REQ-133). | §24.9 (user decision, AD-011) |
| REQ-173 | The complete future-state repository tree — repository root, backend, and client — is recorded in `## Project Directory Structure` §1, §4, and §5 per §25.3; every file created during implementation lands in the documented subtree, and new paths are added to the tree when phases introduce them. | The documented tree matches the implemented repository at the end of implementation; the tree contains no path absent from the codebase or the source brief. | §25.3 |
| REQ-174 | The explicit §25.1 backend paths exist and are used: `app.js`, `server.js`, `config/env.js`, `config/db.js`, `routes/index.js`, per-domain `routes/*.js` modules, per-domain `validators/*.js`, `utils/constants.js`, `utils/httpStatus.js`, `utils/logger.js`, `services/oauth.service.js`, `middleware/notFound.middleware.js`, `mock/*`, and `uploads/audio/`. | All listed paths exist in the implemented backend and serve their documented role. | §25.1 |
| REQ-175 | The explicit §25.2 frontend paths exist and are used: `client/src/main.jsx`, `App.jsx`, lazy-loaded `pages/*`, `components/layout/*`, `components/<domain>/*`, `utils/constants.js`, `redux/app/store.js`, `redux/features/api.js` and `<name>Slice.js` files, `components/reusable/*`, `components/columns/*`, and `theme/*`. | All listed paths exist in the implemented client and serve their documented role. | §25.2 |
| REQ-176 | Backend per-domain files follow the `<domain>.controller.js` / `<domain>.routes.js` / `<domain>.validator.js` / `<domain>.model.js` naming pattern with one controller file per domain (auth, branch, report, audio, transcription, ai, user, analytics); external integrations live in `services/*.service.js`; cross-cutting concerns live in `middleware/*.middleware.js`. | The implemented backend matches the `## Project Directory Structure` §4 tree file for file. | §10.3, §25.1 |
| REQ-177 | The Google Docs export creates the document with the user's own Google OAuth token — the Google login flow extended with the `drive.file` scope — so the document lands in the user's own Google Drive, fully owned and editable by the user; no Google Service Account is used. | The exported document appears in the user's Google Drive and is owned, editable, shareable, and downloadable by them; no service-account credentials exist in the environment contract. | §22 (Phase 25 user decision) |
| REQ-178 | All code follows the §26 formatting rules: semicolons required; single quotes; trailing commas; 2-space indentation; 100-character width; LF line endings; UTF-8 encoding. | A code review of the implemented codebase finds no formatting violations. | §26 |
| REQ-179 | Naming conventions: camelCase variables and functions; PascalCase classes and components; kebab-case file names; UPPER_SNAKE_CASE constants and environment variables. | A code review finds file names, identifiers, constants, and environment variables following the convention. | §26 |
| REQ-180 | Import conventions: order built-in modules → npm packages → local modules, alphabetical within each group; named imports for utilities and functions; default import for React components; never `*` imports. | A code review of imports finds the ordering and import-style rules satisfied. | §26 |
| REQ-181 | No dead code: no unused imports (every import referenced in the file body), no unused exports (every exported function or constant imported elsewhere), no unused constants/variables/methods; unused parameters carry the `_` prefix (`_req`, `_res`, `_next`). | A code review finds no unused imports/exports/dead code; intentionally unused parameters are `_`-prefixed. | §26 |
| REQ-182 | Frontend components are functional components with hooks; props are destructured in the function signature; event handlers are prefixed with `handle`. | A code review of client components finds the component patterns followed. | §26 |
| REQ-183 | Backend user IDs are obtained with the `req.user._id.toString()` pattern. | A code review finds user IDs consistently extracted via `req.user._id.toString()`. | §26 |
| REQ-184 | The frontend passes `npx vite build` with 0 errors and passes lint (`eslint .` with the existing `client/eslint.config.js`). §26 mandates no backend lint. | Running the build and lint commands in `client/` succeeds without errors. | §26 |
| REQ-185 | Every single file or module carries a JSDoc block comment at the top of the file. | A file sweep finds no source file without a JSDoc block comment. | §26 |
| REQ-186 | JSDoc tags: `@module` on all public modules; `@param`, `@returns`, and `@throws` on functions; `@type` on constants; JSDoc on exports. | A documentation audit finds public modules and functions documented per the tag contract (deepened in Phase 27). | §26 |
| REQ-187 | Every file opens with a `@module <path>/<name>` block; the path is relative to the package source root (`client/src/` for the frontend, `backend/` for the backend). Theme customizations and the app theme provider use `@module`, never `@file`. | A file sweep finds every source file opening with a `@module` block carrying a path relative to its package source root. | §27 |
| REQ-188 | Function JSDoc carries `@param {type} name - description`, `@returns {type}`, and `@throws {ErrorType} reason` — every tag used where applicable; components and controllers are arrow functions. | A code review finds function JSDoc with the tag form and applicable tags present. | §27 |
| REQ-189 | Constants carry a `@type` tag with the full type definition (e.g. `@type {Object<string, string>}`, `@type {number}`, `@type {string[]}`). | A code review finds every exported constant documented with `@type`. | §27 |
| REQ-190 | Express types are written via `import('express')` — `import('express').Request`, `import('express').Response`, `import('express').NextFunction`; Mongoose async middleware documents `@returns {Promise<void>}`. | A code review of handlers and middleware finds the `import('express')` type forms and the Mongoose `Promise<void>` return form. | §27 |
| REQ-191 | Component JSDoc documents `@param {Object} props` and every named prop used — for RHF-bound inputs at minimum `name`, `label`, `error`, `helperText`, `control` — plus `ref` for forwardRef-wrapped inputs. | A code review of client components finds the props object and named props documented. | §27 |
| REQ-192 | Model files document `@typedef {Object} ModelName` plus one `@property {Type} fieldName - description` line per schema field. | A code review of the models finds the typedef and a property line per field. | §27 |
| REQ-193 | Middleware JSDoc documents the req/res/next triple; intentionally unused parameters carry the `_` prefix (`_req`, `_res`, `_next`). | A code review of middleware finds the triple documented and unused parameters `_`-prefixed. | §27 |
| REQ-194 | No TypeScript anywhere: JSDoc is the type layer — `@typedef` shapes, `@param {Object}` destructured props, `@returns {Promise<Type>}` on async functions. | A code review finds no `.ts`/`.tsx` files and JSDoc used as the typing mechanism. | §27 |
| REQ-195 | `CustomError` lives in `backend/utils/error.js` with `statusCode`, `message`, and `isOperational` (`true` for expected, handled errors; `false` for programmer errors); it is created as `new CustomError(statusCode, message)` and used by `notFound.middleware.js` and `error.middleware.js`. | `utils/error.js` exports the class; the two middlewares import it and construct `CustomError` instances. | §28.1 |
| REQ-196 | The global error handler in `backend/middleware/error.middleware.js` distinguishes operational `CustomError` instances from unexpected errors: operational errors respond with their `statusCode` and the §10.7 error envelope; unexpected errors are logged (REQ-086) — development returns the full stack trace, production returns a generic message with internal details never exposed. | Operational errors carry their mapped status; production error responses never leak internals; unexpected errors appear in the logs. | §28.1 |
| REQ-197 | `notFound.middleware.js` handles unmatched routes by creating `new CustomError(404, "..")` with a descriptive message and calling `next(error)` — it never responds directly, so every unmatched request reaches the global handler with a 404. | Unmatched `/api/v1` requests return 404 with the envelope via the global handler. | §28.1, §25.1 |
| REQ-198 | Validation failures return `422` with the §10.7 error envelope; `data.errors` carries the per-field validation messages that the frontend surfaces under each field via `error.data.data.errors`. | Validator failure responses carry per-field messages under `data.errors`. | §28.1, §10.10 |
| REQ-199 | All async controllers are wrapped with `express-async-handler` (imported as `asyncHandler`); no custom async wrapper; rejected promises forward to the global error handler automatically. | No unwrapped async controller handlers exist; rejected promises reach the global handler. | §28.1, §10.3 |
| REQ-200 | The global error handler maps Mongoose and JWT errors to their statuses — CastError → 400, ValidationError → 422, duplicate key (11000) → 409, JsonWebTokenError → 401, TokenExpiredError → 401; AI provider failures map to 502 for generation/correction endpoints (unified across Addis AI, Gemini, and Nvidia); STT chunk failures keep the mark-failed-and-continue behavior (REQ-129). | The listed error classes produce the mapped statuses; provider failures respond 502; STT chunk handling unchanged. | §28.2 |
| REQ-201 | Frontend error pattern: every RTK Query mutation lifecycle uses the `onQueryStarted` `if (error)` guard; server validation errors display per field via `error.data.data.errors`; success/error toasts fire through `AppToastContainer`; message extraction uses `error.data?.message || error.data?.data?.errors?.[0]?.message || 'Something went wrong'`. | All mutations follow the pattern; the extraction chain is present; toasts render. | §28.3 |
| REQ-202 | `AppErrorBoundary` is a class component (react-error-boundary, `^6.1.2` in `client/package.json`) that catches React render errors and shows a fallback UI; it wraps the router content in `App.jsx` alongside `AppToastContainer`. | `App.jsx` composes `AppErrorBoundary`; render errors show the fallback UI. | §28.3, §12.1 |
| REQ-203 | The backend must enable CORS with the origin from the `CLIENT_ORIGIN` environment variable (default `http://localhost:3000`) and `credentials: true` so the httpOnly auth cookies are sent; a wildcard origin must never be used. | CORS allows only the configured origin with credentials; no `*` origin exists. | §29.3 |
| REQ-204 | When a rate-limit tier is exceeded the request must return `429` with the §10.7 error envelope; the three tier limits (global 100/15min, auth 20/15min, AI 10/1min) hold. | Overflow requests return `429` `{ success: false, message, data }`; the tier limits are enforced. | §29.4 |
| REQ-205 | Graceful shutdown on SIGINT/SIGTERM must force-exit after 30 seconds if the shutdown sequence hangs, completing the REQ-084 sequence. | A hung shutdown is force-terminated within 30 seconds. | §29.12 |

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
- Frontend architecture rules: **Phase 12 — DONE (REQ-094..100)**.
- Redux/RTK Query and API client rules: **Phase 13 — DONE (REQ-103..106)**.
- MUI, MUI X, theme, and component standards rules: **Phase 14 — DONE (REQ-107..111)**.
- React Hook Form standards rules: **Phase 15 — DONE (REQ-112..116)**.
- UI rules: **Phase 16 — DONE (REQ-117..119)**.
- Environment config rules: **Phase 17 — DONE (REQ-120..124)**.
- Addis AI integration rules: **Phase 18 — DONE (REQ-125..131)**.
- Other AI providers rules: **Phase 19 — DONE (REQ-132..138)**.
- Audio recording and STT pipeline rules: **Phase 20 — DONE (REQ-139..145)**.
- AI prompt rules: **Phase 21 — DONE (REQ-146..153)**.
- Export rules: **Phase 22 — DONE (REQ-154..159)**.
- Mock data rules: **Phase 23 — DONE (REQ-160..164)**.
- Data model rules: **Phase 24 — DONE (REQ-165..172)**.
- Project directory structure rules: **Phase 25 — DONE (REQ-173..177)**.
- Code quality rules: **Phase 26 — DONE (REQ-178..186)**.
- JSDoc rules: **Phase 27 — DONE (REQ-187..194)**.
- Error handling rules: **Phase 28 — DONE (REQ-195..202)**.
- Security rules: **Phase 29 — DONE (REQ-203..205)**.
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
| US-028 | As an Area Supervisor, I want protected pages to send me to the login page and return me to my intended destination after signing in, so that I never lose my place. | Unauthenticated access to a protected page redirects to `/login` with the origin preserved (`state.from`); login navigates back to it (REQ-095). | §12.4 |
| US-029 | As an Area Supervisor, I want the sidebar to adapt to my screen size — overlay drawer on small screens, docked full or mini drawer on desktop — so that navigation works on any device. | The three responsive drawer modes exist and switch with the breakpoints (REQ-097). | §12.2, §12.3 |
| US-030 | As an Area Supervisor, I want my session to renew itself while I am actively using the app, so that I am never interrupted by token expiry. | A transient 401 refreshes the session and retries the request transparently; a failed refresh clears the session and lands me on `/login`; no data is lost on transient 401s. | §13.2 |
| US-031 | As an Area Supervisor, I want the date picker to show Ethiopian calendar dates with English day and month names, so that the dates I pick match how I think about the day. | The date picker switches explicitly between desktop (md+, popper) and mobile (<md, dialog) modes; Ethiopian dates display as DD-MM-YY with English day names and English month names mapped to the Ethiopian months (September…August + Pagume); the custom conversion utility (`client/src/utils/ethiopianDate.js`) is in place (REQ-110). | §14 (1.6) |
| US-032 | As an Area Supervisor, I want validation errors to appear under each form field in English as soon as I leave it, with the submit button disabled and showing a spinner while the form submits, so that I never lose my report data to a failed submission. | `useForm({ mode: 'onBlur' })`; errors render under their fields via MUI `error`/`helperText` from `formState.errors`; cross-field rules (e.g. confirm password) validate via `getValues`; `isSubmitting` disables the submit button and shows the spinner; `reset()` runs only after a successful submission; backend 422s surface under the offending field via `setError`; no zod (REQ-112..116). | §15 |
| US-033 | As an Area Supervisor, I want action buttons on my phone and small screens to keep their icons, so that I can always tell what each button does while I am away from a desktop. | Action buttons always render icons at `vw < 600` and at `vw < 768 && landscape`; submit buttons are `size="small"` with `flexShrink: 0`; no text overflows or overlaps at any width (REQ-117..119). | §16 |

---

## Report Management

> **Phase 4 seed — the supporting-feature resource management from §4. Detailed data model, search, and lifecycle mechanics arrive in later phases (5, 11, 12, 13, 24, 35). Data model delivered in Phase 24 (§24 Data Model).**

### 1. Purpose

The supporting features exist to support the core workflow (§4): the supervisor records audio instead of writing, confirms recordings before submission, receives AI transcription and AI correction, generates the structured report, and manages everything centrally so previous reports can be found.

### 2. Resource Inventory

| Resource | Supporting feature | Managed in |
|---|---|---|
| User profile | Profile — supervisor identity appears in reports (§4) | Profile Management (Phase 4 seed); auth Phase 11 |
| Branches | Branch management — visited branches selected; Branch CRUD (§4) | Report Management (this section); branch domain Phase 5 |
| Daily reports | Report management list and grid views; Report CRUD (§4) | Report Management (this section); data model Phase 24 (§24 Data Model §4.1) |
| Audio narrations (recordings) | Audio recording; playback and re-recording (§4) | Report Management (this section); pipeline Phase 20 |
| Transcriptions | Addis AI speech-to-text; transcription review by AI (§4) | Report Management (this section); pipeline Phase 20 |
| AI conversations | Addis AI text generation (§4) | Report Management (this section); prompts Phase 21; ChatConversation model Phase 24 (§24 Data Model §4.6) |
| Generated reports + versions | Report CRUD (§4); version history (§2.1) | Report Management (this section); data model Phase 24 (`Report.generated` + `generatedHistory[]`, AD-010) |
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

> **Phase 3 build — the core narration→report flow and the review–correction loop from §3. Detailed sub-flows arrive in later phases: authentication (11), supporting-resource management (4), audio recording/STT pipeline (20), AI prompts (21), export (22 — `## Export Spec` §2–4), and archive/delete/restore lifecycle (35).**

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
| W-11 | Supervisor | Accepts/finalizes the report | Final report version | §3.2 (versioning: Phase 24 — `Report.generatedHistory[]`, AD-010; lifecycle Phase 35) |
| W-12 | System | Delivers/exports the report (PDF, TXT, CSV, spreadsheet, or Google Docs) | Exported report | §2.1, `## Export Spec` §2–4 (details Phase 22) |

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
| Error states and loading states | Phase 28 (`## Error Handling` §3) | all steps |

### 5. Export Sub-Flow (W-12, Phase 22)

The supervisor exports the finalized report (after W-11) from the report UI:

| Step | Actor | Action | Output | Source |
|---|---|---|---|---|
| E-01 | Supervisor | Chooses an export format from the export control on the finalized report: PDF, TXT, CSV, XLSX (client-side), or Google Docs (backend) | Format selection | `## Export Spec` §2–4, `## API Contract` §7 |
| E-02 | System | Generates the file in the browser for the four client-side formats (no backend call) and downloads it immediately | Downloaded PDF/TXT/CSV/XLSX file | `## Export Spec` §2–3, REQ-154..157, REQ-159 |
| E-03 | System | For Google Docs: calls the backend export endpoint, which creates the Google document with the report content in the user's own Google Drive (via the user's Google OAuth token) and returns the document URL | Document URL | `## Export Spec` §4, `## API Contract` §7, REQ-158 |
| E-04 | System | Opens the returned Google Docs URL in a new tab | Google Docs document (view/edit) | REQ-158 |
| E-05 | Supervisor | Views and, if desired, edits the document freely in their own Google Drive; edits happen outside the app and are not synced back | Edited document (in the user's Google Drive) | `## Export Spec` §4, REQ-158 |

- Export is available only on a finalized report (W-11 precedes W-12); the exported content is the report as it exists at export time — no AI re-processing (REQ-159).
- Failure outcomes: a client-side generation failure shows an error state (Phase 28 — `## Error Handling` §3); a Google Docs failure surfaces the backend error through the §10.7 envelope (REQ-158).

---

## User Interactions

> **Phase 3 seed — the mental-model interactions from §3. Later-phase interactions (recording controls, transcription editor, export dialogs, auth, resource CRUD, lifecycle actions) are added in their mapped phases (11, 16 — DONE, 20, 22, 35). Interaction IDs: `UI-<NNN>`.**

| ID | Interaction | Trigger | Main flow | Success outcome | Failure outcome | Source |
|---|---|---|---|---|---|---|
| UI-001 | Supervisor explains the day | Supervisor starts a new daily report | Supervisor records Amharic audio narration; may mention date, branch(es) visited, entry time, exit time, time range per branch, activities performed, checklist-based work completed, urgent issues/problems, actions taken, people contacted, follow-up needed, general opinions, opinions about issues, suggestions | Audio recording(s) captured for the day | Recording not captured; supervisor retries or re-records (controls detailed in Phase 20) | §3.1, §3.3 |
| UI-002 | System listens and processes | Audio sent to STT | System transcribes via Addis AI; transcription contains the needed information but is not organized as a final report; system does not ask clarifying questions (OQ-007) | Transcription produced (raw material) | STT failure; error state and retry (Phase 20) | §3.2, §3.3 |
| UI-003 | System writes the report | Transcription available | AI extracts, organizes, and rewrites information per report rules/format/tone/system prompt; writes in Amharic matching sample tone (§6.1 structure, §6.5 tone, §6.7 transliteration) | Generated Amharic report presented to the supervisor | Generation failure; error state (Phases 21/28) | §3.2, §3.3, §6 |
| UI-004 | Supervisor reviews the report | Generated report shown | Supervisor reads the report; judges completeness, clarity, and desired style | Review decision made (accept or request correction) | Report regenerated on request (W-09) | §3.2 |
| UI-005 | Supervisor requests a correction | Report not satisfactory | Supervisor states what is wrong, missing, unclear, or not written in the desired way | Correction request captured and routed to the AI | Request not submitted; retry | §3.2, §2.3.7 |
| UI-006 | System updates the report | Correction request received | AI updates only the relevant part; correct unrelated sections are not unnecessarily rewritten (behavior §6.9) | Updated report shown for re-review | Update failure; previous version intact (versioning Phases 24/35) | §3.2, §2.3.7, §6.9 |
| UI-007 | Supervisor finalizes | Report satisfies the supervisor | Supervisor accepts the report; the correction loop ends | Final report version stored | — | §3.2 |
| UI-008 | Supervisor uses the app on a small screen | Viewport below 600px, or below 768px in landscape | Action buttons keep their icons (`vw < 600` / `vw < 768 && landscape`); long text ellipsizes instead of overflowing | Every action stays identifiable and no text overflows or overlaps | Icons or ellipsis missing; the app never scrolls horizontally (Phase 28 error states — `## Error Handling` §3) | §16 |

**Later-phase interaction markers:** recording start/stop/re-record and file-size validation (Phase 20), transcription review/edit UI (Phase 20), export flow (Phase 22), login/logout and protected routes (Phase 11), branch/report/transcription/AI-conversation/profile CRUD (Phase 4), archive/delete/restore (Phase 35), loading/error/empty/unauthenticated states (Phase 28 — `## Error Handling` §3). Phase 16 is DONE — the UI rules interaction (UI-008: icon-first on small screens, ellipsis) is recorded above.

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
| DR-8 | Top-level `clockIn`/`clockOut` hold the work-day entry/exit times; per-branch times live in `branches[]`. The top-level `clockIn` may differ from the first branch's `clockIn`, and the top-level `clockOut` is the final end of day even when the last branch was left earlier (mapped from the report samples; `## Data Modeling` §4.1 clock-semantics table). | §6.1, §24.4 |

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

The system must manage: daily supervision reports, transcriptions, AI conversations, generated reports, report version history, and reporting analytics (§5.4; REQ-057). Field-level definitions are delivered in `## Data Modeling` §4 (Phase 24):

| Managed record | Persisted as |
|---|---|
| Daily supervision reports | `Report` model (`## Data Modeling` §4.1) |
| Transcriptions | `Transcription` model (§4.3) |
| AI conversations | `ChatConversation` model (§4.6) |
| Generated reports | `Report.generated` — the latest AI output lives on Report (§4.1; AD-010) |
| Report version history | `Report.generatedHistory[]` — the unified ReportVersion (§4.1; AD-010; no separate GeneratedReport/ReportVersion collections — user decision) |
| Reporting analytics | Derived — aggregation over Report documents, computed on demand; no collection (AD-011); metric set defined in Phase 31 (AD-007) |
| Narrations (audio) | `Audio` model, one document per clip (§4.2) |

### 10. Domain Expansion Markers

- Phase 5 (§5 Report And Branch Domain): **DONE — branch/report context rules, named report fields, record types inventory (sections 6–9 above); data-model fields delivered in Phase 24.**
- Phase 6 (§6 Report Format, Samples, And Tone): **DONE — required format, samples, tone, strict generation rules, transliteration rule, correction behavior (`## Report Format`).**
- Phase 24 (§24 Data Model): **DONE — persisted data model for reports, transcriptions, narrations (Audio), and versions (`## Data Modeling` §4; AD-010/011).**

---

## Data Modeling

> **Phase 5 seed — entity inventory derived from §5.4. Full field-level schema delivered in Phase 24 (§24 Data Model; §5.4: "must be defined during the data-modeling phase"). Enriched in Phases 11, 20, 23, 35.**

### 1. Entity Inventory

The persisted model set (Phase 24, §24): **User, Branch, Report, Audio, Transcription, ChatConversation**. The product terms "daily report" and "narration" map to the `Report` and `Audio` models respectively. The unified `ReportVersion` (AD-010) is the inline `generated` + `generatedHistory[]` on Report — there are **no** separate `GeneratedReport` or `ReportVersion` collections (user decision, Phase 24). Reporting analytics are derived from Report documents (aggregation) — no dedicated analytics collection (user decision, AD-011); the metric set is defined in Phase 31 (AD-007).

| Entity (model) | Purpose | Source |
|---|---|---|
| User | The authenticated supervisor; owner of reports and branches; profile identity appears in reports | §4, §5.2, §24.7 |
| Branch | A restaurant location under the supervisor's area; managed via Branch CRUD | §5.1, §24.8 |
| Report | The daily supervision report; belongs to one user; covers one or more branches; editable after generation; preserves versions inline | §5.1, §5.2, §24.4 |
| Audio | A recorded audio explanation (narration); one document per uploaded clip; one or more per report | §3, §4, §24.5 |
| Transcription | Text produced from narration audio; reviewed/corrected by the user with AI help before generation | §4, §5.2, §24.6 |
| ChatConversation | The assistant chat bound to one report (AI conversation); messages carry the text-generation provider and tool parts | §2.1, §5.4, §24.9 |
| Analytics (derived) | Basic reporting analytics computed on demand from Report; metric set defined in Phase 31 | §2.1, AD-007 |

### 2. Relationship Model (§24.10)

Report is the hub: Audio and Transcription point back to Report, and Report holds both refs for easy access. No redundant duplication.

```
Report (1) ──→ Audio (many, via Report.audio[])
Report (1) ──→ Transcription (1, via Report.transcription)
Audio (1) ──→ Report (1, via Audio.report)
Transcription (1) ──→ Report (1, via Transcription.report)
Report (1) ──→ User (1)
Branch (1) ──→ User (1)
Audio (1) ──→ User (1)
Transcription (1) ──→ User (1)
ChatConversation (1) ──→ User (1)
ChatConversation (1) ──→ Report (1) — deleting a report does NOT delete its conversations
```

Plus: User 1—N Report ownership (BR-06, REQ-041); User 1—N Branch (§5.1); Report 1—N Branch per day (multi-branch days, §5.1, §24.4 `branches[]`).

### 3. Modeling Rules (§24.2)

| ID | Rule | Source |
|---|---|---|
| DM-01 | All model hooks, instance methods, and static methods support session options where relevant — they behave correctly inside the write-controller transaction pattern (REQ-082, REQ-165). | §24.2 |
| DM-02 | No schema field combines `unique: true` with separate indexes; uniqueness and all other indexes are declared through `schema.index(..)` (REQ-166). | §24.2 |
| DM-03 | Every model uses `timestamps: true`; `toJSON` and `toObject` transforms delete `id` and `__v`; the User transform additionally deletes `password`. | §24.4–24.9 |
| DM-04 | All list endpoints use `mongoose-paginate-v2` (default page 1, limit 10, max 100; REQ-053, BR-04); list models carry the pagination plugin. | §24.2, §5.2 |
| DM-05 | `User.password` is hashed by a bcryptjs `pre('save')` hook with 12 salt rounds that runs only when `password` is modified; `comparePassword(candidatePassword)` uses `bcrypt.compare` (REQ-167). | §24.7, §11 |
| DM-06 | The Report status enum is `draft | audio_attached | transcribed | reviewed | completed` (default `draft`); transitions follow the §6 lifecycle (REQ-168). | §24.4 |
| DM-07 | Archived-at TTL indexes (30 days, partial filter `archivedAt: { $ne: null }`) exist on Report and Branch; the archive/delete/restore lifecycle rules themselves are Phase 35 scope. | §24.4, §24.8 |

### 4. Field-Level Schema (Phase 24)

#### 4.1 Report (§24.4)

| Field | Type / constraints | Notes |
|---|---|---|
| `user` | ObjectId, ref User, required | Owner (BR-06) |
| `date` | String, required | DD-MM-YYYY display value (e.g. `"30-07-2026"`), not a Date object; `createdAt` handles sorting and date math |
| `branches[]` | Array of `{ branchId: ObjectId ref Branch, clockIn: String, clockOut: String }` | Per-branch visit times; 12-hour format strings |
| `clockIn` | String | Top-level work-day entry time (ስራ የገባሁበት ሰዓት); the first branch's clockIn often equals it |
| `clockOut` | String | Top-level work-day exit time (ከስራ የወጣሁበት ሰዓት); the last branch's clockOut often equals it |
| `audio` | Array of ObjectId ref Audio, default `[]` | Starts empty; populated after audio upload |
| `transcription` | ObjectId ref Transcription, default `null` | Populated after transcription completes |
| `status` | String enum `draft | audio_attached | transcribed | reviewed | completed`, default `draft` | Lifecycle in §6 |
| `isArchived` | Boolean, default `false` | Archive flag; lifecycle rules Phase 35 |
| `archivedAt` | Date, default `null` | Set on archive; 30-day TTL index below |
| `generated` | String, default `""` | Latest AI-generated report text (report format §6.1); empty until the first successful generation; set together with `status → completed`; lives on Report, not Transcription — generation consumes `Transcription.latest` |
| `generatedHistory[]` | Array of `{ provider: String enum addis | gemini | nvidia required, text: String required, generatedAt: Date default now }` | The unified ReportVersion (AD-010); appended on every successful generation; re-generation overwrites `generated` and appends an entry; no UI in this cycle (the details History card is the transcription history) |

**Indexes:** `schema.index({ user: 1, createdAt: -1 })` (report list ordering); `schema.index({ status: 1 })`; `schema.index({ archivedAt: 1 }, { expireAfterSeconds: 2592000, partialFilterExpression: { archivedAt: { $ne: null } } })` (30-day TTL).

**Time-format rule:** all times are 12-hour format strings (e.g. `"02:30 PM"`), formatted client-side via `dayjs.format("hh:mm A")` before submit and stored as-is with no backend conversion.

**Clock semantics — top-level vs per-branch (mapped from the report samples):**

| Field | Maps to | Meaning |
|---|---|---|
| `clockIn` (top-level) | ስራ የገባሁበት ሰዓት | The time the supervisor started the work day; the first branch's clockIn often equals this |
| `clockOut` (top-level) | ከስራ የወጣሁበት ሰዓት | The time the supervisor ended the work day; the last branch's clockOut often equals this |
| `branches[].clockIn` | ከ[time] - [time] [branch] | The time the supervisor arrived at that branch |
| `branches[].clockOut` | ከ[time] - [time] [branch] | The time the supervisor left that branch |

- Single-branch days: branch-level and top-level times may be equal or differ — no restriction.
- Top-level `clockIn` may differ from the first branch's `clockIn` (e.g. travel time between branches is tracked separately).
- Top-level `clockOut` is the final end of day, even if the last branch was left earlier.

#### 4.2 Audio (§24.5)

One Audio document per uploaded clip (the upload accepts the full recorded clips array — multipart field `clips` — and creates one Audio document per clip).

| Field | Type / constraints | Notes |
|---|---|---|
| `user` | ObjectId ref User, required | Who uploaded it |
| `report` | ObjectId ref Report, required | Bidirectional ref with Report.audio |
| `originalName` | String, required | As sent from the browser (e.g. `"clip_1.webm"`) |
| `mimeType` | String, required | Media type from the browser (e.g. `"audio/webm;codecs=opus"`) |
| `filePath` | String, required | Server path where multer saved the file (e.g. `uploads/audio/{crypto.randomUUID()}.webm`) |
| `fileSize` | Number, required | Raw byte size; validated against `AUDIO_MAX_SIZE_BYTES` = 52428800 |
| `duration` | Number, required | Seconds; validated via ffprobe against `AUDIO_MAX_DURATION_SEC` = 900 |

- No `status` field on Audio — individual audio state is not tracked; Report.status covers the aggregate state.
- The "narration" product concept maps to this model (AD-011); re-recording replaces the clips (UI-001).

#### 4.3 Transcription (§24.6)

| Field | Type / constraints | Notes |
|---|---|---|
| `user` | ObjectId ref User, required | |
| `report` | ObjectId ref Report, required | |
| `raw` | String, default `""` | Original STT output, concatenated from all audio clips and their chunks |
| `latest` | String, default `""` | The current reviewed/corrected text; starts empty; populated when the user or AI completes a review |
| `history[]` | Array of `{ instruction: String, reviewed: String, reviewer: Mixed, editedAt: Date default now }` | Ordered array tracking each review/correction iteration |

- `history[].instruction`: what the user asked the AI to correct — present only when the reviewer is AI; empty string for direct user edits.
- `history[].reviewed`: the text produced by that review iteration.
- `history[].reviewer`: User ObjectId (manual edit) OR one of `"addis" | "gemini" | "nvidia"` (AI correction) — `Schema.Types.Mixed`.
- No `status` field on Transcription — Report.status reflects the current state.
- The earlier `aiCorrectedText` field name is superseded: AI corrections land in `latest` plus a `history[]` entry (AD-011).

**Review modes (how history entries are created):**

| Mode | `instruction` | `reviewed` | `reviewer` |
|---|---|---|---|
| 1. User direct edit | `""` | User-typed text | User ObjectId |
| 2. User types instruction → AI corrects | User's instruction | AI-returned text | Provider string |
| 3. Voice → Addis STT → fills instruction → AI corrects | STT-transcribed instruction | AI-returned text | Provider string |

#### 4.4 User (§24.7, §11)

| Field | Type / constraints | Notes |
|---|---|---|
| `firstName` | String, default `""` | Extracted from the email local part (before `@`) or from the Google profile name; optional profile updates later |
| `lastName` | String, default `""` | Extracted from the email local part or Google profile name; empty when the local part has no separator |
| `email` | String, required, lowercase, trim; unique via `schema.index({ email: 1 }, { unique: true })` | The account identifier; OAuth users matched by email |
| `password` | String, required, `select: false` | bcryptjs-hashed via the `pre('save')` hook (12 rounds, skipped when unmodified); required for email registration; no password required for Google OAuth-created accounts; plaintext never compared; deleted from all JSON output |
| `avatar` | String, default `""` | Optional; set from Google profile picture for OAuth accounts; updated from the Profile page |
| `position` | String, default `""` | Optional; updated from the Profile page |
| `refreshToken` | String | Refresh-token rotation storage (REQ-087) |
| `authProvider` | String enum `local | google`, default `local` | Registration origin |

- Virtual: `fullName` = `\`${this.firstName} ${this.lastName}\`.trim()`; schema options include `toJSON: { virtuals: true }` and `toObject: { virtuals: true }` (§12.3.3 cross-aligned).
- Hook: `pre('save')` — `if (!this.isModified("password")) return next(); this.password = await bcrypt.hash(this.password, 12); next();` (bcryptjs).
- Method: `comparePassword(candidatePassword)` → `bcrypt.compare(candidatePassword, this.password)`.
- Email extraction (registration via email+password or Google): `beza.ayalew@example.com` → firstName `"beza"`, lastName `"ayalew"`; `bezaayalew@example.com` → firstName `"bezaayalew"`, lastName `""` (REQ-170).
- No sessions MongoDB collection and no token collection: nothing beyond the User document is stored for auth (REQ-087).

#### 4.5 Branch (§24.8)

| Field | Type / constraints | Notes |
|---|---|---|
| `name` | String, required | |
| `location` | String | |
| `isArchived` | Boolean, default `false` | Archive flag; lifecycle rules Phase 35 |
| `archivedAt` | Date, default `null` | 30-day TTL index below |
| `user` | ObjectId ref User | Owner |

**Indexes:** `schema.index({ user: 1, name: 1 }, { unique: true })`; `schema.index({ archivedAt: 1 }, { expireAfterSeconds: 2592000, partialFilterExpression: { archivedAt: { $ne: null } } })` (30-day TTL).

#### 4.6 ChatConversation (§24.9)

| Field | Type / constraints | Notes |
|---|---|---|
| `user` | ObjectId ref User, required | |
| `report` | ObjectId ref Report, required | Deleting a report does NOT delete its conversations (the conversation keeps the `report` id for deep links) |
| `title` | String, default `"New Chat"` | |
| `messages[]` | Array of message objects | See below |

**Message shape:** `{ id: String (uuid), role: String ("user" | "assistant"), status: String ("streaming" | "complete" | "failed"), parts: [Mixed], provider: String enum addis | gemini | nvidia, createdAt: Date }`.

- `parts` shapes (Mixed): `{ type: "text", text }` | `{ type: "tool-input-available", toolCallId, toolName, input }` | `{ type: "tool-approval-request", toolCallId, toolName, input }` | `{ type: "tool-output-available", toolCallId, output }`.
- `provider` is the user-approved Phase 24 extension satisfying REQ-133 — the text-generation provider is stored per AI conversation message (AD-011); different providers can be used for corrections versus initial generation (REQ-133).
- Created via the assistant conversations endpoint (`## API Contract` §8; `POST /assistant/conversations` flow).
- **Index:** `schema.index({ user: 1, updatedAt: -1 })`.

### 5. Phase Enrichment Seeds (11, 20, 23 — superseded by §4)

- **Phase 11 (User Entity Seeds):** the field-level User definition now lives in §4.4, including `refreshToken`, `authProvider`, the unique email index, the `fullName` virtual, bcryptjs pre-save hashing (12 rounds), `comparePassword`, and email-local-part name extraction (REQ-087..093).
- **Phase 20 (Narration And Transcription Seeds):** narration/audio and transcription field-level definitions now live in §4.2/§4.3. Status names reconciled in Phase 24: the upload status is `audio_attached` (not `audio_recorded`) per the §24.4 enum (AD-011, REQ-168); re-transcription accepts `audio_attached` and `transcribed` statuses (REQ-145). Per-clip constraints (15 min / 50 MB, MIME whitelist), storage under `backend/uploads/audio/`, and re-record/re-transcribe behavior are unchanged (REQ-139..145).
- **Phase 23 (Mock Data Seeds):** the seeded entity set is User, Branch, Report, Audio (metadata-only, ADR-037), Transcription, ChatConversation — the §1 inventory (`## Mock Data Seeding` §4); exact seed records and field values are defined there (Phase 24).

### 6. Report Status Lifecycle (§24.4)

| Status | Meaning |
|---|---|
| `draft` | Report metadata created; no audio uploaded yet |
| `audio_attached` | Audio files uploaded and linked to Report; ready for transcription |
| `transcribed` | All audio clips transcribed; raw text available |
| `reviewed` | Transcription reviewed (by user or AI); ready for report generation |
| `completed` | AI generated the final report |

Lifecycle: `draft → audio_attached → transcribed → reviewed → completed` (REQ-168). The work-flow state mapping lives in `## Status Machine` §3.

### 7. Expansion Markers

- Phase 11 (§11 Authentication): **DONE — field-level User definition in §4.4.**
- Phase 20 (§20 Audio Recording And STT Pipeline): **DONE — field-level Audio/Transcription definitions in §4.2/§4.3 and the status reconciliation in §5.**
- Phase 23 (§23 Mock Data): **DONE — seeded entity set reconciled in §5; exact seed records in `## Mock Data Seeding` §4.**
- Phase 35 (Archive, Delete, And Restore Lifecycle): archive/delete/restore lifecycle rules and the final status-machine state names.

---

## Business Rules

> **Phase 5 seed — rules derived from §5. Phase 24 delivered the data-model rules from §24.2/§24.4/§24.7 (BR-11..14). Phase 35 adds the lifecycle rules. Rule IDs: `BR-<NN>`.**

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
| BR-11 | All model hooks, instance methods, and static methods support session options where relevant. | §24.2 (REQ-165) |
| BR-12 | No schema field combines `unique: true` with separate indexes; uniqueness and other indexes are declared through `schema.index(..)`. | §24.2 (REQ-166) |
| BR-13 | User passwords are hashed with bcryptjs (12 salt rounds) in a `pre('save')` hook; `comparePassword` compares via `bcrypt.compare`. | §24.7 (REQ-167) |
| BR-14 | The Report status follows the enum `draft → audio_attached → transcribed → reviewed → completed`. | §24.4 (REQ-168) |

---

## API Contract

> **Phase 5 seed — conventions and endpoint inventory from §5; response envelope, status codes, and validation shapes added in Phase 10 (§10); authentication endpoints added in Phase 11 (§11); model-driven request/response schemas added in Phase 24 (§24 Data Model); error handling added in Phase 28 (`## Error Handling`). Detailed request/response schemas and paths continue in Phases 12, 18, 20, and 22.**

### 1. Conventions (seeds)

- RESTful JSON API over HTTP(S); JavaScript/Express backend (AD-002).
- **Pagination:** every list endpoint uses `mongoose-paginate-v2` with default page `1`, default limit `10`, and max limit `100` (§5.1, §5.2, REQ-053, BR-04).
- Single user type; endpoints are user-scoped (ownership, §5.2); auth/cookies/tokens design in Phase 11.
- Response envelope is defined in Phase 10 (§10.7): success `{ success: true, message, data }`, error `{ success: false, message, data }`; per-endpoint schemas are detailed in Phases 24/31.

### 2. Endpoint Inventory (seeds)

| Resource | Operations | Detail phase |
|---|---|---|
| Branches | list, get, create, update, delete (Branch CRUD, §5.1) | Paths: Phase 10; schemas: Phase 24 (§8) |
| Daily reports | list, get, create, update, delete (Report CRUD, §5.2) | Paths: Phase 10; schemas: Phase 24 (§8) |
| Narrations / audio | upload, playback, re-record support | Phase 20 |
| Transcriptions | review/update, AI correction | Phase 20 |
| AI conversations | list/get per report; message schemas Phase 24 (§8) | Phases 18/21 |
| Exports | PDF/TXT/CSV/spreadsheet generation | Phase 22 |

### 3. Response Envelope, Status Codes, And Validation (Phase 10)

- **Response envelope (§10.7):** every successful backend response uses `{ success: true, message: "..", data: {..} }`; every error response uses `{ success: false, message: "..", data: {..} }`.
- **HTTP status codes (§10.6):** imported by semantic name from `backend/utils/httpStatus.js`; numeric status codes are never hardcoded.
- **Validation errors (§10.10):** `express-validator` middleware in `backend/validators/*.js` (one file per domain), applied on the route before the controller handler; failures return `422` with the standard error envelope `{ success: false, message, data }` — `data.errors` carries per-field messages the frontend surfaces via `error.data.data.errors` (REQ-198, `## Error Handling` §1).
- **Error status mapping (§28.2):** the full error-to-status table — validation 422, auth 401, not found 404, file size 413, MIME 415, Mongoose CastError 400 / ValidationError 422 / duplicate key 409, JsonWebTokenError 401, TokenExpiredError 401 — lives in `## Error Handling` §2 (REQ-200).
- **AI service errors (Phase 28):** provider failures return `502` with the §10.7 envelope for generation/correction endpoints — the unified rule across Addis AI, Gemini, and Nvidia (REQ-136, REQ-137, REQ-200); STT chunk failures keep the per-chunk mark-failed-and-continue behavior (`## Addis AI` §12, REQ-129).
- **Pagination (§10.4):** every list endpoint uses `mongoose-paginate-v2` with default page `1`, default limit `10`, and max limit `100` (REQ-053).

### 4. Authentication Endpoints (Phase 11)

| Endpoint | Purpose | Contract seeds |
|---|---|---|
| `POST /api/v1/auth/register` | Account creation; body `{ email, password }` only — no name field; backend extracts firstName/lastName from the email local part; 201 success returns the user with the `fullName` virtual | §11; paths/schemas detail in Phase 12 |
| `POST /api/v1/auth/login` | Sign in; body `{ email, password }`; 200 success; backend sets the `accessToken` (15m) and `refreshToken` (7d) as httpOnly cookies via `Set-Cookie` | §11; paths/schemas detail in Phase 12 |
| `GET /api/v1/auth/me` | Current authenticated user; used by the frontend route guards on mount | §12.4 (route guards); detail in Phase 12 |
| `GET /oauth/google` | Google OAuth start route; `googleOAuth` controller using `getGoogleOAuthUrl()` service; stubbed until `env.OAUTH_GOOGLE_*` credentials are configured | §11; §12 shows the browser redirect at `http://localhost:4000/api/v1/auth/google` — route naming finalized in Phase 12 |
| `POST /api/v1/auth/refresh` | Refresh-token rotation endpoint; called by the frontend `baseQueryWithReauth` on 401; rotates the refresh token and re-issues the access (15m) + refresh (7d) httpOnly cookies | §13.2; rotation per REQ-087 |

- All auth endpoints are mounted under the `/api/v1` prefix per §10.1 (REQ-080).
- The frontend calls these endpoints only through `baseQueryWithReauth` in `client/src/redux/features/api.js` — no direct `fetch`/axios calls on the client (REQ-104).
- Outcome statuses: `401` invalid credentials, `422` validation failure, `429` rate limited — all with the §10.7 envelope (`{ success: false, message, data }`).
- Rate limits per tier: global 100/15min (all endpoints), auth 20/15min (register, login), AI 10/1min (generation, correction) (REQ-092).

### 5. Addis AI Provider Endpoints (backend service dependencies, §18)

- The app never routes Addis AI calls through `/api/v1`: providers are contacted directly from backend services via native `fetch` (REQ-125, `## Addis AI` §3, §13). The table documents the provider contracts the backend depends on; the request/response envelopes are the provider's own, not the §10.7 envelope.

| Provider endpoint | Purpose | Contract seeds |
|---|---|---|
| `POST https://api.addisassistant.com/api/v1/chat_generate` | Report generation and correction after transcription review (W-04..W-10); strict prompt + structured JSON-like output | §18.7, `## AI Prompt Spec` §7, `## Addis AI` §6 (REQ-127) |
| `POST https://api.addisassistant.com/api/v2/stt` | Speech-to-text via multipart `audio` + `request_data` `{ language_code: am }`; max 60s / 10 MB per request; backend chunks longer recordings | §18.8, `## Addis AI` §7, `## Audio Recording STT` (REQ-128) |
| `POST https://api.addisassistant.com/api/v1/audio` | Text-to-speech; not part of the first workflow — service support only | §18.9, `## Addis AI` §8 (REQ-130) |
| `POST https://api.addisassistant.com/api/v1/translate` | Optional translation; never applied by default (PR-17) | §18.11, `## Addis AI` §10 (REQ-130) |
| `POST https://api.addisassistant.com/api/v1/chat_generate` (multipart) | Multimodal with `image`/`audio` files; not part of the first workflow | §18.10, `## Addis AI` §9 (REQ-130) |
| `wss://relay.addisassistant.com/ws?apiKey=<API_KEY>` | Realtime relay; never with a real key in the browser; not part of the first workflow | §18.12, `## Addis AI` §11 (REQ-130) |

- All calls send the `x-api-key` header (REQ-126); errors map through `## Addis AI` §12 (REQ-129); the AI rate-limit tier 10/1min applies (REQ-092).

### 6. Audio Upload And Re-Transcription Endpoints (Phase 20)

- **Upload endpoint** — accepts the full recorded clips array as the multipart field `clips` (§20.1; REQ-140): multer storage in `backend/uploads/audio/` (gitignored), 50 MB max per clip (`AUDIO_MAX_SIZE_BYTES`), server-side ffprobe duration validation and type/size validation (§20.2/§20.3; REQ-142, REQ-143); success sets the report status `audio_attached` (§24.4 enum, AD-011, REQ-168).
- **Re-transcription endpoint** — re-runs STT on the stored audio for accuracy verification (§20.5; REQ-145): the backend must accept both `audio_attached` and `transcribed` statuses (status name reconciled in Phase 24, AD-011); the STT call itself always targets the Addis AI `v2/stt` endpoint with chunking per `## Audio Recording STT` §8 (REQ-128, REQ-144).

### 7. Export (Phase 22)

- **Client-side formats need no backend endpoints** — PDF, TXT, CSV, and XLSX exports are generated entirely in the browser (`## Export Spec` §2, §3; REQ-159). The frontend generates the file from the report data it already holds (via the RTK Query API client, REQ-104) and triggers the download directly; there is no `/api/v1/export` route for these formats.
- **Google Docs export — the only backend export** — `POST /api/v1/reports/:reportId/export` (path finalized in Phase 25): the backend calls the Google Docs API with the **user's own Google OAuth token** (the Google login flow extended with the `drive.file` scope) and creates the document from the report content directly in the **user's own Google Drive** — fully owned and editable by the user, no sharing-permission step (REQ-158, REQ-177; `## Export Spec` §4). The handler is `exportReport` in `report.controller.js`; document creation lives in `services/googleDocs.service.js` (`## Project Directory Structure` §4). Responses use the §10.7 envelope. The frontend opens the returned URL in a new tab (`## Work Flow` §5, REQ-158).
- The user's Google OAuth token is stored and refreshed server-side only and must never be exposed to the client (REQ-158, REQ-177).

### 8. Model-Driven Contracts (Phase 24, §24 Data Model)

Request and response bodies map field-for-field to the `## Data Modeling` §4 schemas; list endpoints return the §10.4 paginated shape; all responses use the §10.7 envelope; User output excludes `password` (toJSON transform, §24.7).

**Report documents:**

| Field | Request (`POST /reports`) | Response (document) | Notes |
|---|---|---|---|
| `user` | — (from auth) | ObjectId | Never client-settable |
| `date` | String `DD-MM-YYYY` | String | Required; client formats via `dayjs` |
| `branches[]` | `[{ branchId, clockIn, clockOut }]` | Same | Required; branchId must reference an owned Branch |
| `clockIn` | String (12-hour) | String | Optional at creation; may default from first branch |
| `clockOut` | String (12-hour) | String | Optional at creation; may default from last branch |
| `audio` | — (separate upload) | Array of Audio | Empty at creation |
| `transcription` | — | ObjectId or `null` | Set by the pipeline |
| `status` | — (computed) | enum `draft | audio_attached | transcribed | reviewed | completed` | Lifecycle in `## Data Modeling` §6 |
| `isArchived` / `archivedAt` | — | Boolean / Date | Lifecycle rules Phase 35 |
| `generated` / `generatedHistory[]` | — | String / Array | Set by generation; see `## AI Prompt Spec` §11 |

**Branch documents:** `{ name (required), location, isArchived, archivedAt, user }` — create/update bodies carry only `name` and `location`; `user` is taken from auth; uniqueness is enforced on `{ user, name }` (DM-02, REQ-166).

**Audio upload response (Phase 20 §6):** returns the created Audio documents (one per clip): `{ user, report, originalName, mimeType, filePath, fileSize, duration }` — plus `AUDIO_MAX_SIZE_BYTES` = 52428800 and `AUDIO_MAX_DURATION_SEC` = 900 constants enforced server-side (REQ-139..143).

**Transcription correction payload (Phase 20 §6):** the review/correction body carries the review mode inputs — direct user edit: `{ reviewed }`; AI instruction: `{ instruction }` — and the controller writes the matching `history[]` entry per `## Data Modeling` §4.3 (reviewer = User ObjectId for direct edits, provider string for AI corrections; AD-011).

**ChatConversation messages (Phase 24):** each message is `{ id, role ("user" | "assistant"), status ("streaming" | "complete" | "failed"), parts ([Mixed] — 4 tool shapes), provider ("addis" | "gemini" | "nvidia"), createdAt }` — `provider` records the text-generation provider that produced the message (REQ-133, AD-011).

**Pagination/sort keys (per model, DM-04):** Report list sorts by `{ user: 1, createdAt: -1 }`; Branch list by `{ user: 1, name: 1 }`; ChatConversation list by `{ user: 1, updatedAt: -1 }` (§24.4, §24.8, §24.9).

---

## Status Machine

> **Phase 5 seed — report lifecycle statuses derived from the Work Flow (W-01..W-12) and §5.2. State names reconciled with the Phase 24 model enum (§24.4); the archive/delete/restore transitions and their naming remain Phase 35.**

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
- Archive/delete/restore transitions and their exact naming: Phase 35.

### 3. Work-Flow To Model-Enum Mapping (Phase 24)

The work-flow states (seeds, §1) map to the `Report.status` enum (`## Data Modeling` §4.1, §6; AD-011):

| Work-flow state | Report.status enum | Notes |
|---|---|---|
| CREATED | `draft` | Report metadata created; audio not yet uploaded |
| — (audio uploaded) | `audio_attached` | Replaces the Phase 20 `audio_recorded` name (AD-011, REQ-168) |
| TRANSCRIBING | — (transient) | No enum value; the transcription step is async and brief |
| TRANSCRIPTION_REVIEWED | `reviewed` | Reviewed/corrected text lives in `Transcription.latest` + `history[]` |
| GENERATED | `completed` | `Report.generated` set; `generatedHistory[]` appended (AD-010) |
| FINALIZED | — (work-flow only) | No model field; satisfies "reports remain editable after generation" (BR-07/08) |
| EXPORTED | — (work-flow only) | Export formats are client-side (Phase 22) |
| ARCHIVED / DELETED | — (Phase 35) | `isArchived`/`archivedAt` exist on the model; lifecycle rules Phase 35 |

The `transcribed` enum value maps to the in-flight STT completion: once all clips are transcribed (`Transcription.raw` populated), the status moves from `audio_attached` to `transcribed`, and after review to `reviewed` (REQ-168).

### 4. Scope

The status machine covers the daily report lifecycle only; branch and user records have no status lifecycle (the source does not define one).

---

## Report Format

> **Phase 6 build — the required Amharic report format, samples, and tone from §6. Language rules continue in Phase 7; prompt construction delivered in Phase 21 (`## AI Prompt Spec` §9–12); export mechanics in Phase 22.**

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

> **Source punctuation note (not invented here):** the §6.1 template writes the exit-time label as `ከስራ የወጣሁበት ሰዓት፡` (Ethiopic `፡`) while the §6.2–6.4 samples write it as `ከስራ የወጣሁበት ሰዓት:`. Both forms are recorded above as in the source. **Resolved in Phase 21:** §21 provides no label-punctuation rule, so the Phase 6 resolution stands (REQ-058): the §6.1 template form (Ethiopic `፡`) is canonical for the report template (§2); the `:` in the §6.2–6.4 samples is a recorded source variant, not the template form. Prompts enforce the §6.1 template form (§21.5 rule 2; `## AI Prompt Spec` §12).

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

Report content may be Amharic, English, or mixed, following the language of the transcription; translation is never forced unless the user explicitly chooses it (§7, REQ-067). The report defaults to Amharic generation (REQ-059, §6.6 rule 1) with English or technical words transliterated (§6.7, REQ-061); the precedence wording is resolved in `## AI Prompt Spec` §12 (rule 1). UI copy rules are separate and live in `## UI/UX Spec` §1 (REQ-066).

### 11. Expansion Markers

- Phase 7 (§7 Language Rules): **DONE — language flexibility recorded in §10; the §6.7 transliteration rule remains.**
- Phase 21 (§21 AI Prompt Requirements): **DONE — prompt construction, the missing-info punctuation rule, and few-shot wiring are in `## AI Prompt Spec` §9–12.**
- Phase 22 (§22 Export): export mechanics for this format.

---

## AI Prompt Spec

> **Phase 7 seed — prompt directives derived from §6 (generation rules, tone, transliteration, few-shot example) and §7 (language rules), with full prompt construction from §21 (system prompts, parameters, voice/transcription correction flows, the 14 Amharic generation rules) delivered in Phase 21 (sections 9–12). Seed IDs: `PR-<NN>`.**

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

Note: PR-01 (generate in Amharic, §6.6 rule 1) stays the default per the required format and samples; §7 permits English or mixed content when the transcription itself is English or mixed. The precedence wording is resolved in §12 (rule 1): the prompt generates in Amharic (§21.5 rule 1), with mixed content allowed only when the transcription is English or mixed (PR-17).

### 5. Few-Shot Seed

The prompt should include the §6.10 → §6.11 before/after pair (`## Report Format` §9) as the reference transformation example, plus the §6.2–6.4 samples as tone/format references.

### 6. Expansion Markers

- Phase 7 (§7 Language Rules): **DONE — language directive seeds added (PR-17/18); the Amharic-default vs mixed-content precedence note is recorded for Phase 21.**
- Phase 18 (§18 Addis AI Integration): **DONE — seed delivery is recorded in §7 below.**
- Phase 19 (§19 Other AI Providers): **DONE — provider fallback behavior is in `## Other AI Providers` §3 and `## AI Prompt Spec` §8.**
- Phase 21 (§21 AI Prompt Requirements): **DONE — system prompts, parameters, voice/transcription correction flows, and the 14 Amharic generation rules are in sections 9–12 (REQ-146..153).**

### 7. Delivery To The Addis AI Endpoint (§18)

- All PR-01..18 directive seeds are delivered to Addis AI through `POST /api/v1/chat_generate` via backend-only native `fetch` (`## Addis AI` §3, §6, §13; REQ-125).
- The `prompt` field carries the assembled directive text built from the §1–5 seeds and the §21 rules; the final prompt wording and system-prompt structure are in §9–12.
- `target_language` = `ADDIS_AI_DEFAULT_TARGET_LANGUAGE` (`am`) — echo of `## Environment Config` §2 and PR-01 (REQ-131).
- `generation_config` comes from the frozen constants (`## Environment Config` §5, REQ-124): report generation uses the AI Generation group (temperature 0.2, maxOutputTokens 2048, topP 0.9, topK 40); report correction requests use the AI Correction group (maxOutputTokens 2048, temperature 0.15) (REQ-127).
- The prompt requests structured JSON-like output per `## Report Format` §7 and `## Addis AI` §6.
- `conversation_history` carries prior report turns plus the user's correction/update requests so PR-16 (update only the relevant part) is honored; the review/correction loop is W-04..W-10 (REQ-034, REQ-041).
- A failed generation returns the provider error through the `## Addis AI` §12 error mapping with timeout and retry/backoff rules (REQ-129).

### 8. Provider Fallback And Delivery (§19)

- The same assembled PR-01..18 directive seeds deliver to Gemini and Nvidia when the user selects them or when the fallback chain runs (REQ-134).
- Gemini (`## Other AI Providers` §4): `systemInstruction` carries the system prompt (§9); `contents` carries the conversation history; `generationConfig` comes from the frozen constants (REQ-124, REQ-136).
- Nvidia (`## Other AI Providers` §5): the directive seeds go through the Nvidia message format with the bearer token (REQ-137).
- Fallback chain: Addis → Gemini → Nvidia (REQ-134); STT always stays with Addis AI (REQ-132).

### 9. System Prompts And Parameters (§21.1–21.2)

**Generation system prompt** (§21.1; REQ-146) — exact text:

> You are an expert report writer for a restaurant company's supervision department. Generate structured daily supervision reports in Amharic based on field note transcriptions.

Parameters: temperature `0.2`, maxOutputTokens `2048` — the frozen AI Generation constants group (`## Environment Config` §5; REQ-124, REQ-127).

**Correction system prompt** (§21.2; REQ-147) — exact text:

> You are an expert report editor. The user has provided corrections to a previously generated report. Incorporate the corrections while maintaining the original structure and style.

Parameters: temperature `0.15`, maxOutputTokens `2048` — the frozen AI Correction constants group (REQ-124, REQ-127).

Delivery wiring (§7, §8): for Addis AI the assembled directive text (§1–5 seeds plus §12 rules) is the prompt sent through `POST /api/v1/chat_generate`; for Gemini the system prompt goes in `systemInstruction` with `contents` carrying conversation history; for Nvidia the system prompt uses the Nvidia system role in the message format (REQ-146, REQ-147).

### 10. Voice Correction Flow (§21.3)

- Correction audio → STT → correction text → fed into the same correction prompt (§9; REQ-148).
- STT for correction audio uses the Addis AI `v2/stt` endpoint with the approved chunking pipeline (`## Audio Recording STT` §8; REQ-128, REQ-144); the transcribed correction text then enters the correction prompt exactly like a typed correction.
- Voice corrections are part of the review–correction loop (W-05..W-10; UI-004 in `## User Interactions`).

### 11. Transcription Correction (§21.4)

- The system fixes transcription errors — fills gaps, fixes misrecognized words (REQ-149).
- The correction result is stored on the Transcription model: the AI-returned text is written to `latest` and a new `history[]` entry is appended with `reviewer` = the provider string (`## Data Modeling` §4.3 review modes; AD-011). The earlier `aiCorrectedText` field name is superseded.
- Distinct from report correction (§9): transcription correction fixes the source material before generation; report correction fixes the generated report.

### 12. Amharic Generation Rules Enforced In The Prompt (§21.5)

The prompt must enforce all 14 §21.5 rules (REQ-150..153). The mapping to the existing seeds (§1, §3, §4) and the two exact §21 system prompts (§9):

| §21.5 rule | Rule | Seed mapping |
|---|---|---|
| 1 | Generate the report in Amharic (default; mixed allowed only when the transcription is English or mixed, per PR-17) | PR-01, PR-17 |
| 2 | Use the exact section structure: ቀን, ብራንች, ስም, ስራ የገባሁበት ሰዓት, የተሰሩ ስራዎች, መፍትሄ የሚፈሉ ጉዳዮች, አጠቃላይ አስተያየት, ከስራ የወጣሁበት ሰዓት | PR-02 (`## Report Format` §1–2) |
| 3 | Match the tone and writing style of the provided samples: professional, direct, clear, work-report oriented, supervisor perspective | PR-03 (§2 tone seed; samples in `## Report Format` §3–4) |
| 4 | Use the reviewed transcription as the source of truth | PR-04 |
| 5 | Do not invent missing information | PR-05 |
| 6 | If required information is missing, leave blank or mark as not specified | PR-06 (chosen: leave blank, OQ-009) |
| 7 | Separate completed activities from unresolved issues | PR-07 |
| 8 | Preserve branch-specific details for multi-branch reports | PR-10 |
| 9 | Preserve time ranges per branch | PR-11 |
| 10 | Write from the supervisor's point of view | PR-12 |
| 11 | Do not output an explanation of how the report was generated | PR-13 |
| 12 | Do not include unrelated conversation content | PR-14 |
| 13 | For corrections: update only the relevant part, do not rewrite correct unrelated sections | PR-16 (§9 correction prompt) |
| 14 | English or technical words use Amharic workplace transliteration (example: `deep fryer` → `ዲፕ ፍራየር`) | §3 transliteration seed |

- Few-shot wiring (§5): the §6.10 → §6.11 before/after pair (`## Report Format` §9) and the §6.2–6.4 samples ride in the prompt as reference examples (tone/format + transformation reference).
- §6.6 rules 8, 9, 15 (PR-08, PR-09, PR-15) are not listed in §21.5 but remain enforced — §21.5 is the §21-enumerated subset; the complete seed set stays active.

---

## Addis AI

> **Phase 18 seed — Addis AI integration from §18. Provider fallbacks arrive in Phase 19, STT pipeline mechanics in Phase 20, final prompt construction in Phase 21, and unified error handling in Phase 28 (`## Error Handling` §2).**

### 1. Provider Identity And Primary Sources (§18.1–18.2)

- Addis AI provides African-language AI infrastructure for voice, chat, retrieval, translation, and localization; the platform supports voice AI, cross-lingual RAG, chat, speech-to-text, text-to-speech, translation, and enterprise deployments (§18.2).
- Primary sources (§18.1): `https://www.addisai.ch/`; the Addis AI documentation at `https://docs.addisassistant.com` — page paths: get-started/introduction, get-started/quickstart, capabilities/text-generation, capabilities/text-to-speech, capabilities/speech-to-text, capabilities/multimodal, capabilities/realtime, capabilities/translation, integration/web, integration/server, integration/voice-interface, platform/errors.

### 2. Base URLs And Platform (§18.3)

- Developer/API base URL: `https://api.addisassistant.com` — all REST endpoints below are relative to it; recorded as `ADDIS_AI_BASE_URL` in `## Environment Config` §2 (REQ-121).
- Playground/dashboard: `https://platform.addisassistant.com`.
- Realtime relay: `wss://relay.addisassistant.com/ws?apiKey=<API_KEY>` — never used with a real key in the browser (§18.12, REQ-123).

### 3. Authentication And Key Rules (§18.4)

- API keys are generated in the Addis AI dashboard; secret keys start with `sk_` (REQ-123, `## Environment Config` §4).
- REST authentication uses the `x-api-key` header on every Addis AI call (REQ-126).
- The key is never exposed in frontend code (REQ-123).
- The app calls Addis AI only from the backend: backend-only proxy, no direct client-to-Addis AI calls (REQ-125, REQ-078).
- AI endpoints are protected by authentication; rate limits apply on auth and AI endpoints (echo of `## Security` §4, REQ-092; AI tier 10/1min).

### 4. Core Model Families (§18.5)

| Family | Models | Project use |
|---|---|---|
| Text | `Addis-፩-አሌፍ` (`ADDIS_AI_TEXT_MODEL`) | Report generation and correction (`## AI Prompt Spec` §7) |
| Voice | `አሌፍ-Audio-AM`, `አሌፍ-Audio-OM` | STT — model selected by the provider per `language_code` |
| Realtime audio | `አሌፍ-1.2-realtime-audio` | Not part of the V2 workflow (§18.12) |

### 5. Language Support (§18.6)

- Current support: English, Amharic, Afan Oromo, and Tigrinya; text-generation docs emphasize Amharic and Afan Oromo; STT supports Amharic and Afan Oromo; translation is bidirectional between Amharic `am`, Afan Oromo `om`, and English `en`.
- The app implements Amharic `am` and English-aware prompting as first-class (`ADDIS_AI_DEFAULT_TARGET_LANGUAGE` = `am`, `ADDIS_AI_STT_LANGUAGE_CODE` = `am`; PR-17).
- Language constants stay extensible for Oromo `om` and Tigrinya where appropriate (REQ-131).

### 6. Text Generation (§18.7)

Endpoint: `POST https://api.addisassistant.com/api/v1/chat_generate` (REQ-127).

Request body (JSON):

```json
{
  "model": "Addis-፩-አሌፍ",
  "prompt": "string",
  "target_language": "am",
  "conversation_history": [
    { "role": "user", "content": "string" },
    { "role": "assistant", "content": "string" }
  ],
  "generation_config": {
    "temperature": 0.2,
    "maxOutputTokens": 2048,
    "topP": 0.9,
    "topK": 40
  }
}
```

Response:

```json
{
  "response_text": "The generated text response...",
  "finish_reason": "stop",
  "usage_metadata": {
    "prompt_token_count": 12,
    "candidates_token_count": 45,
    "total_token_count": 57
  },
  "modelVersion": "Addis-፩-አሌፍ"
}
```

Project use:

- Called after the user reviews the transcription (`## Transcription Review` §1; W-04).
- Strict report-generation prompt requesting structured JSON-like output (`## Report Format` §7; `## AI Prompt Spec` §7).
- Low temperature `0.2` for factual report generation — from the frozen constants AI Generation group (REQ-124, REQ-127).
- AI keys only in `backend/.env` (REQ-123).
- Backend HTTP client uses native `fetch` for Addis AI calls (§18.14, REQ-125).

### 7. Speech To Text (§18.8)

Endpoint: `POST https://api.addisassistant.com/api/v2/stt` (REQ-128).

Request is `multipart/form-data`:

- `audio`: uploaded audio file.
- `request_data`: stringified JSON, e.g. `{ "language_code": "am" }` (`ADDIS_AI_STT_LANGUAGE_CODE`).

Response:

```json
{
  "status": "success",
  "data": {
    "transcription": "ሰላም እንኳን ደህና መጣችሁ",
    "usage_metadata": {
      "totalBilledDuration": "15s",
      "requestId": "69b60667-0000-2a1e-b6d3-d4f547fe6724"
    }
  },
  "confidence": 0.982
}
```

Supported audio formats: WAV (`audio/wav`, `audio/x-wav`, `audio/wave`), MP3 (`audio/mpeg`, `audio/mp3`), M4A (`audio/mp4`, `audio/x-m4a`), WebM (`audio/webm`) — matching the Audio MIME constants (`## Environment Config` §5, REQ-124).

Documented constraints:

- Max duration: 60 seconds per request; chunk by chunk (REQ-128).
- Max file size per request: 10 MB (REQ-128).
- Recommended sample rate: 16 kHz or higher; mono preferred.
- Quiet environment and 10–30 cm microphone distance recommended.
- Optimized for single-speaker audio; overlapping voices and heavy code-switching may reduce accuracy.

Project use:

- The frontend imposes no duration limit; the backend chunks long WAV recordings before STT (REQ-128; pipeline mechanics in Phase 20).
- Accuracy-critical pipeline: convert full audio to WAV via ffmpeg in a single pass using `pcm_s16le`, 16 kHz, mono, before PCM-level split; per-segment re-encoding causes Opus decoder priming artifacts that degrade transcription quality (echoed in `## Audio Recording STT`; detail in Phase 20).
- Error handling: network failure retries 3 times with exponential backoff (1s, 2s, 4s); provider error (4xx, 5xx) marks the chunk as failed and continues processing remaining chunks (REQ-129).

### 8. Text To Speech (§18.9)

Endpoint: `POST https://api.addisassistant.com/api/v1/audio`; JSON body `{ "text": "string", "language": "am", "voice_id": "male_1", "stream": false }`; the response includes Base64 WAV audio, commonly under `audio`.

Project use: TTS is not required for the first report-builder workflow; service support stays possible for later voice playback or AI chat (REQ-130).

### 9. Multimodal (§18.10)

Endpoint: `POST https://api.addisassistant.com/api/v1/chat_generate` as `multipart/form-data` when attaching files — fields include `image` or `audio` plus `request_data` (stringified JSON with `prompt`, `target_language`, and generation config). Not part of the first report-builder workflow (REQ-130).

### 10. Translation (§18.11)

Endpoint: `POST https://api.addisassistant.com/api/v1/translate`; body `{ "text": "string", "source_language": "am", "target_language": "en" }`; the translation nests under `data.translation`.

Project use: optional. The app never translates by default because the report may be intentionally Amharic, English, or mixed (PR-17); a later UI control may let the user request final reports in a chosen target language (REQ-130).

### 11. Realtime (§18.12)

Endpoint: `wss://relay.addisassistant.com/ws?apiKey=<API_KEY>`.

Protocol: the client waits for `{ "setupComplete": true }`; the client sends base64 PCM16 audio chunks in JSON envelopes `{ "data": "BASE64_ENCODED_PCM16_CHUNK", "mimeType": "audio/pcm;rate=16000" }`; the server returns base64 PCM16 audio under `serverContent.modelTurn.parts[0].inlineData.data`.

Project use: secret keys are never exposed in browser WebSocket URLs (REQ-123); realtime is not required for the V2 report creation workflow; if implemented later, use a backend-controlled strategy and verify whether Addis AI supports short-lived client tokens (REQ-130).

### 12. Error Mapping (§18.13)

Error object: `{ "status": "error", "error": { "code": "invalid_api_key", "message": "...", "param": "optional" } }`.

| Status | Meaning | Project handling |
|---|---|---|
| 400 | Invalid request or missing field | Validation failure — re-check the request, safe user message |
| 401 | Missing or invalid API key | Config error — key lives in `backend/.env` (REQ-123) |
| 403 | Key lacks permission | Config error |
| 404 | Endpoint or model missing | Config error — verify the model name |
| 429 | Rate limit or quota | Backoff; AI tier 10/1min echo (`## Security` §4, REQ-092) |
| 500 | Addis AI server error | Provider error — mark chunk failed and continue (REQ-129) |
| 503 | Service overloaded | Retry with backoff (REQ-129) |

Project handling (REQ-129):

- Map Addis AI errors to safe user messages; never surface raw provider messages.
- Log provider request IDs and status codes, not raw sensitive report content (echo of `## Logging` AI provider log fields).
- Implement timeout; on network failure retry 3 times with exponential backoff (1s, 2s, 4s); on provider error (4xx, 5xx) mark the chunk as failed and continue.
- Unified 502 rule (Phase 28): generation/correction responses map an ultimately failed provider call to `502` at the backend boundary; STT chunk failures keep the mark-failed-and-continue behavior above (REQ-200, `## Error Handling` §2).

### 13. Package And Implementation Implications (§18.14)

- Backend proxy only — Addis AI calls live in backend services, never on the client (REQ-125).
- Native `fetch` in Node for Addis AI calls (REQ-125).
- `multer` receives browser audio uploads.
- Node `FormData`/`Blob` for multipart forwarding where available; if the project Node version does not support reliable multipart forwarding, add a small documented multipart helper package.
- No Addis AI SDK installed — docs state JavaScript/TypeScript SDKs are coming soon (REQ-125).

### 14. Expansion Markers

- Phase 19 (§19 Other AI Providers): **DONE — Nvidia and Gemini contracts and the fallback chain are in `## Other AI Providers`; STT always stays with Addis AI.**
- Phase 20 (§20 Audio Recording And STT Pipeline): chunking mechanics, MIME priority, `wavSplitter`, and retry wiring against the §7 endpoint.
- Phase 21 (§21 AI Prompt Requirements): final prompt construction and system-prompt structure delivered through §6.
- Phase 28 (§28 Error Handling): **DONE (Phase 28)** — unified error handling across providers in `## Error Handling` §2 (REQ-200).

---

## Other AI Providers

> **Phase 19 seed — Nvidia and Gemini integration from §19. Final prompt construction arrives in Phase 21, the conversation data model in Phase 24, and unified error handling in Phase 28 (`## Error Handling` §2).**

### 1. Provider Set And Free-AI Rule (§19)

- Three providers are available: Addis AI (`## Addis AI`), Gemini, and Nvidia.
- STT always uses Addis AI; Gemini and Nvidia are text-generation providers only (REQ-132).
- All AI providers used must be free — no credit card or subscription required; non-free AI is never used (REQ-135).
- Nvidia and Gemini API keys live in `backend/.env` only (echo of `## Environment Config` §4, REQ-123).
- Models: Gemini `gemini-3.1-flash-lite`; Nvidia `z-ai/glm-5.2` at least for now; other free models may be added (REQ-136, REQ-137).
- HTTP client for Gemini and Nvidia: axios (echo of `## Rules` §1 and REQ-078; axios is absent from `backend/package.json` and is added during implementation — REQ-138).

### 2. Provider Selection And Storage (§19)

- The user selects the text-generation provider at generation time via dropdown or buttons; the default is Addis (REQ-132). The `## UI/UX Spec` ReportDetails seed already records generate-with-provider-selection (default `addis`; report editing happens in the Assistant chat — there is no ReportCorrection page).
- The provider is stored per AI conversation message; different providers can be used for corrections versus initial generation (REQ-133; AI-conversation endpoint detail in `## API Contract` §2, Phases 18/21; data model in Phase 24).

### 3. Provider Fallback Chain (§19)

- Fallback chain: Addis → Gemini → Nvidia (REQ-134). When the selected provider fails, the next provider in the chain is used.
- STT never falls back — it always uses Addis AI (REQ-132).
- Fallback and prompt delivery details are in `## AI Prompt Spec` §8.

### 4. Gemini Integration (§19.1)

- Model: `gemini-3.1-flash-lite`; key `GEMINI_API_KEY` and base URL in `backend/.env` (`## Environment Config` §2).
- Endpoint: `POST https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_API_KEY}` — the key is passed as the documented query parameter, but only from backend services, never from the client (REQ-123).
- Request body: `{ contents: [{ role, parts: [{ text }] }], systemInstruction: { parts: [{ text }] }, generationConfig: { temperature: 0.2, maxOutputTokens: 2048, topP: 0.9, topK: 40 } }` — the generation config mirrors the frozen constants AI Generation group (REQ-124, REQ-136).
- No streaming (REQ-136).
- Error handling: network failure retries 3 times with exponential backoff; provider error returns 502 (REQ-136, following the `## Addis AI` §12 pattern).
- HTTP client: axios (REQ-138).

### 5. Nvidia Integration (§19.2)

- Model: `z-ai/glm-5.2`; key `NVIDIA_API_KEY` and base URL in `backend/.env` (`## Environment Config` §2).
- Uses the Nvidia API message format with `Authorization: Bearer` token (REQ-137); the key is sent only from backend services (REQ-123).
- Same retry pattern as Gemini: network failure retries 3 times with exponential backoff; provider error returns 502 (REQ-137).
- HTTP client: axios (REQ-138).

### 6. Expansion Markers

- Phase 21 (§21 AI Prompt Requirements): final prompt construction delivered through Gemini `contents`/`systemInstruction` and the Nvidia message format.
- Phase 24 (§24 Data Model): **DONE — the provider field is stored per AI conversation message (`## Data Modeling` §4.6 `messages[].provider`; `## API Contract` §8; REQ-133, AD-011).**
- Phase 28 (§28 Error Handling): **DONE (Phase 28)** — unified error handling across all three providers in `## Error Handling` §2 (REQ-200).

---

## Export Spec

> **Phase 6 seed — export context from §6; full export mechanics (formats, naming, API, UI, files) arrived in Phase 22 (§22 Export; REQ-154..159).**

### 1. Purpose (seed)

The export feature delivers the finalized report (W-12) so it can be shared or archived (§4, REQ-047). The exported artifact is the report in the required §6.1 format (`## Report Format`), supporting formats: PDF, TXT, CSV, and spreadsheet (REQ-047; format details in §2).

### 2. Format Details (§22)

The four client-side formats export the report content as it exists in the app at export time — no AI re-processing, no report regeneration (REQ-159). Google Docs is the only backend export (§4).

| Format | Generated | Details |
|---|---|---|
| PDF | Client-side (browser) | Uses `jspdf` and `jspdf-autotable` (both already installed in `client/package.json`); A4 page size; Amharic text rendered with the **Noto Sans Ethiopic** font (Amharic-capable Unicode font); report section headings rendered as section headers; page numbers on every page (REQ-154). |
| TXT | Client-side (browser) | Downloaded as a Blob with UTF-8 encoding; plain-text structure preserving the report format (§6.1); no styling, no page layout (REQ-155). |
| CSV | Client-side (browser) | Downloaded as a Blob with UTF-8 encoding and a byte-order mark (BOM) for Excel compatibility; structured columns mapping the report content so it opens as a usable spreadsheet (REQ-156). |
| XLSX | Client-side (browser) | Multi-sheet workbook: a **content** sheet (the report), a **version history** sheet (every report version with its metadata — date, version note, status), and a **metadata** sheet (report metadata: AI provider, generation date, report status). The workbook library is chosen at implementation (not specified in source §22; no workbook library is currently installed) (REQ-157). |

### 3. Client-Side Only Rule (§22)

PDF, TXT, CSV, and XLSX exports are generated entirely in the browser — there are no backend export endpoints for these four formats (REQ-159). The Google Docs export (§4) is the only backend export in the system (endpoint contract in `## API Contract` §7).

### 4. Google Docs Backend Export (§22, Phase 25 user decision)

- Exporting to Google Docs is backend-only: the backend uses the **user's own Google OAuth token** — the Google login flow extended with the `drive.file` scope — to call the Google Docs API and create the document from the generated report content directly in the **user's own Google Drive** (REQ-158, REQ-177).
- The user owns the resulting document: it appears in their Drive and can be edited, shared, downloaded, or moved freely — no sharing-permission step is needed.
- The backend returns the document URL; the frontend opens it in a new tab; edits happen in the user's Drive, outside the app, and are not synced back (REQ-158).
- The user's Google OAuth token is stored and refreshed server-side only and must never be exposed to the client (REQ-158, REQ-177).
- **Reconciliation note (Phase 25 user decision):** the earlier service-account mechanism (`GOOGLE_SERVICE_ACCOUNT_EMAIL`/`GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` with "Anyone with link can view") was replaced — a service account cannot place files in a user's Drive. `## Environment Config` §2, `## Security`, `## Glossary`, `## API Contract` §7, and `## Work Flow` §5 reflect the change.

### 5. Expansion Markers

- Phase 22 delivered the full export specification — format details per file type (§2), the client-side-only rule (§3), the Google Docs backend export (§4), the API contract (`## API Contract` §7), and the UI flow (`## Work Flow` §5).

---

## UI/UX Spec

> **Phase 7 seed — the language rules from §7, enriched in Phase 12 with the §12 shell and page specs. Theme and component rules arrived in Phase 14; form rules arrived in Phase 15; general UI rules built in Phase 16.**

### 1. Interface Language (English)

The app shell, navigation, labels, buttons, validation messages, helper text, and everything else in the application interface must be English (§7, REQ-066). No Amharic UI copy. Validation errors surface under their field via MUI `error` and `helperText` populated from `formState.errors` (§15, REQ-114).

### 2. Content Language (Amharic / English / Mixed)

- Audio, transcription, AI chat, and report content can be Amharic, English, or mixed (§7, REQ-067).
- The app must not force translation unless the user explicitly chooses it (§7, REQ-067).
- The conversation language in recorded audio is always Amharic (§7, REQ-068).

### 3. Language Boundary

The interface language rule (§1) applies to UI copy only; the content language rule (§2) applies to user and AI content. The app never translates user content automatically.

### 4. Addis AI Language Rationale

Addis AI is selected because it is specialized in Ethiopian Amharic and is expected to produce more accurate transcription and report generation than general AI tools that are not focused on Ethiopian language use cases (§7, REQ-069). Integration details are in `## Addis AI` (Phase 18).

### 5. Shell And Scroll Layout (§12.2)

- The outer app container is `height: 100vh; overflow: hidden`; the chrome (app bar, sidebar) is fixed; the content area scrolls with `overflow-y: auto`; the `body`/`html` elements never scroll.
- `PublicLayout` (`client/src/components/layout/PublicLayout.jsx`): fixed public MuiAppbar (logo, theme toggle, Login button, Sign Up button) + scrollable content area.
- `AppShell` (`client/src/components/layout/AppShell.jsx`): `AppSidebar` (left) + content area (right, column flex): protected MuiAppbar (64px) → Page Header → `<Outlet />`.

### 6. Landing (§12.6)

- Route: index route inside PublicLayout.
- Structure: hero section only (Features section TBD), centered wrapper `max-width: 1200px`.
- Hero: app logo/icon; headline "Build Better Reports" (`h3` on md+, `h4` on xs); subheadline "Record, transcribe, and generate professional reports with AI"; two CTAs — "Get Started" (contained → `/register`) and "Sign In" (outlined → `/login`).
- Static page: no data fetching, no Redux; CTAs use `useNavigate()`; PublicRoute redirects authenticated users away; all text ellipsizes on overflow; no horizontal scroll.

### 7. Login (§12.6)

- Outer: centered flexbox — `minHeight: calc(100vh - 64px)`, `display: flex`, `alignItems: center`, `justifyContent: center`, `py: 4`.
- Card: `Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 420 }}`.
- Logo/icon centered (`fontSize: 48px`, `primary.main`, `mb: 1`); title `h5` weight 600 centered "Sign In"; subtitle `body2` `text.secondary` centered `mb: 3` "Welcome back! Sign in to continue".
- Google OAuth button: `outlined` fullWidth, GoogleIcon start adornment, loading spinner on click (stubbed until credentials configured).
- Divider `my: 2.5` with centered "or".
- Email field: TextField `type="email"`, EmailIcon start adornment, `required: 'Email is required'`.
- Password field: TextField `type="password"`, LockIcon start adornment, built-in eye toggle, `required: 'Password is required'`.
- Submit: `contained` fullWidth `size="small"` `mt: 2` `flexShrink: 0`, `loading={isSubmitting}` `loadingPosition="center"`, label "Sign In".
- Nav link: "Don't have an account?" + text button → `/register`.
- Data flow: RHF `useForm({ mode: 'onBlur' })`; `useLoginMutation()`; 422 → `setError('email'|'password')`; 401 → toast "Invalid email or password"; success → `reset()` + navigate to `location.state?.from?.pathname || '/dashboard'`.

### 8. Register (§12.6)

- Same card layout as Login; title "Sign Up"; subtitle "Create your account to get started".
- Email + password fields identical to Login; password adds `minLength: { value: 6, message: 'At least 6 characters' }`.
- Extra `confirmPassword` field: `type="password"`, LockIcon adornment, eye toggle, `validate: (v) => v === getValues('password') || 'Passwords must match'`.
- Submit "Sign Up"; nav link "Already have an account?" + text button → `/login`.
- Data flow: `useRegisterMutation()`; 422 (e.g. duplicate email) → field-level `setError`; success → toast "Account created successfully" + navigate `/dashboard`.

### 9. Dashboard (§12.6)

- `p: 3`, rows stacked vertically with `gap: 3`; **no Page Header**.
- Row 1 — stat cards: 4 cards, `Grid container spacing={3}`, `size={{ xs: 12, sm: 6, md: 3 }}`; each `Paper elevation={2} sx={{ p: 3 }}` — icon + value + label. Content TBD.
- Row 2 — charts: `Grid container spacing={3}`, `size={{ xs: 12, md: 6 }}`; BarChart (left) + PieChart (right), `@mui/x-charts`. Content TBD.
- Row 3 — Recent Activities: title `h6` + MuiDataGrid — server-side pagination, no action column. Columns/source endpoint TBD.
- Auth strategy: full page load → `GET /api/v1/auth/me` populates Redux + localStorage; 401 → clear everything + redirect `/login`; SPA navigation reads Redux only — zero API calls.

### 10. Reports Page (§12.6)

- Page Header: left title "Reports" + subtitle "Manage daily supervision reports"; right: FilterIconButton (MuiBadge `badgeContent={activeFilterCount}`, hidden when 0), ToggleButtonGroup (ViewListIcon / ViewGridView), CreateButton (AddIcon).
- Filter Dialog: MuiDialog `maxWidth="sm"`, title "Filter Reports"; row 1 — MuiDatePicker (left) + MuiSelectField single branch (right) in `Grid container spacing={2}`; both carry ClearIcon end adornments (`slotProps.input.endAdornment`) — clearing resets the field, decrements `activeFilterCount`, updates the badge immediately; row 2 — MuiSwitch label "Archived"; Cancel resets all filters and badge → 0; Apply sets filter state, closes, badge → count of active filters (1–3).
- List toggle → cards: `Grid container spacing={2}`; each report a MuiCard; icon-button actions with MuiTooltip — View (VisibilityIcon, primary → `/reports/:id/details`), Edit (EditIcon, primary → opens the report in the Assistant chat (§11), Archive/Restore/Delete conditional: not archived → ArchiveIcon (warning) + MuiConfirmDialog → `PATCH /api/v1/reports/:id/archive`; archived → RestoreIcon (success) + confirm → `PATCH /api/v1/reports/:id/restore`, DeleteIcon (error) + confirm → `DELETE /api/v1/reports/:id`; below the cards MuiPagination (`page`/`count` from server `totalPages`, `onChange` refetches).
- Grid toggle → MuiDataGrid: server-side pagination, toolbar, export selection, action column (same behaviors).
- The Filter Dialog and all dialogs on this page use MuiDialog, which applies responsive fullscreen below 600px (and below 768px landscape) (`## MUI Component Standards` §5); the Page Header subtitle hides on viewport widths below 600px in portrait (§14 1.12; `## MUI Component Standards` §4).

### 11. Report Details, Branches, Profile, NotFound, And Assistant Pages (§12.6)

- **ReportDetails** (`client/src/pages/ReportDetails.jsx`, route `reports/:id/details`): renders inside AppShell — AppShell is provided by routing, page components never render it; details flow, generate flow, and edge cases per API Contract §3.6; Generate button shown only when status `reviewed`; no UI path for re-generation; the Report Details header shows the report status via MuiStatusBadge (§14 1.13; `## MUI Component Standards` §9.8).
- **Branches** (`client/src/pages/Branches.jsx`, route `branches`): renders inside AppShell; branch list/grid with create and edit dialogs (under `client/src/components/branch/`); detailed spec in a later phase.
- **BranchDetails** (`client/src/pages/BranchDetails.jsx`, route `branches/:id/details`): renders inside AppShell; detailed spec in a later phase.
- **Profile** (`client/src/pages/Profile.jsx`, route `profile`): renders inside AppShell; detailed spec in a later phase.
- **NotFound** (`client/src/pages/NotFound.jsx`, route `*` — catch-all inside AppShell children): renders inside AppShell; logged-out users hitting an unknown URL are redirected to `/login` instead.
- **Assistant** (`client/src/pages/Assistant.jsx`, route `assistant` — the only protected route outside AppShell; full-screen): ChatBox with `adapter={assistantAdapter}` and `features={{ conversationList: true }}`, `sx={{ height: '100vh' }}`; conversation rail (title, last message preview, relative timestamp); "New Chat" → report picker dialog → create conversation (welcome message injects raw transcription + report metadata); conversation title `"Report {date}"`; deep link `/assistant?conversation=<id>`; tool-approval UI built into ChatBox (Approve/Reject with reason; "expired" on 60s timeout); adapter file `client/src/components/assistant/chatAdapter.js` (plain JS object: `sendMessage`, `listConversations`, `listMessages`, `addToolApprovalResponse`); Redux `aiConversationSlice` + RTK Query endpoints in `assistantApi.js` (`## Redux RTK Query` §3); package `@mui/x-chat` v9.0.0-alpha.15 (already in the manifest). Report editing happens here — the Reports list "Edit" action and the ReportDetails "Edit Report" action open the Assistant chat for that report (new conversation via the report picker, `POST /api/v1/assistant/conversations` with `reportId`); there is no report edit page.

### 12. UI Rules (§16)

#### 12.1 Language And Content (§16 1–3)

- The interface — app shell, navigation, labels, buttons, validation messages, helper text, and everything else — is always English (§16, REQ-066; echoes §1).
- Audio, transcription, AI chat, and report content can be Amharic, English, or mixed (§16, REQ-067; echoes §2).
- Translation is never forced unless the user explicitly chooses it (§16, REQ-067; echoes §2–3).
- These are §7 language rules restated so the UI rule set is self-contained; they do not add new rules.

#### 12.2 Form Submit Buttons (§16 4–5)

- Every form submit button uses `size="small"` (REQ-117) — covered by the reusable MuiButton default (`## MUI Component Standards` §9.1) and already specified for Login (§7).
- Submit buttons must not shrink on flex — `flexShrink: 0` on the button `sx` (REQ-117; Login submit already sets it, §7). This applies to every planned form (Login/Register §7–8, report editor, filter dialogs).

#### 12.3 Icons On Small Screens (§16 6–7)

- Action buttons always include icons at `vw < 600` and at `vw < 768 && landscape` (REQ-118).
- Desktop buttons may keep or drop icons per design; small-screen and landscape buttons never render icon-free.
- Implemented with a `useMediaQuery` based on the MUI breakpoints (`theme.breakpoints.down('sm')`; `down('md')` + `orientation: 'landscape'`), per component (`## MUI Component Standards`).

#### 12.4 Text Overflow And Ellipsis (§16 8–9)

- Text never overflows or overlaps at mobile or desktop widths (REQ-119).
- All text ellipsizes after a certain character count: `textOverflow: 'ellipsis'`, `overflow: 'hidden'`, `whiteSpace: 'nowrap'` on the text element.
- No horizontal scroll anywhere (echoes §6 Landing and `## Frontend Architecture` §12.6 Landing; cross-ref `## MUI Component Standards` §7).

### 13. Expansion Markers

- Phase 12 (§12 Frontend Architecture): **DONE (Phase 12)** — shell and page specs above.
- Phase 14 (§14 MUI, MUI X, Theme, And Component Standards): **DONE (Phase 14)** — English-first component copy standards recorded across the reusable-component catalog; MuiStatusBadge in report details header; MuiPageHeader subtitle rule; MuiDialog responsive fullscreen (§14).
- Phase 15 (§15 React Hook Form Standards): **DONE (Phase 15)** — validation message language English via `formState.errors` + MUI `error`/`helperText` (see §1 and `## React Hook Form Standards` §4).
- Phase 16 (§16 UI Rules): **DONE (Phase 16)** — general UI rules in §12 above (REQ-117..119).

---

## Audio Recording STT

> **Phase 8 seed — the transcription accuracy requirements from §8, enriched with the full recording and STT pipeline from §20 (MediaRecorder, chunking via wavSplitter, MIME validation, Addis AI endpoint, re-transcription flow) in Phase 20 (sections 5–9).**

### 1. Accuracy Is The Foundation

Transcription accuracy is the foundation of the entire product. Every subsequent step — AI report generation, export, and review — depends on accurate transcription. Garbage transcription produces garbage reports (§8, REQ-070). Amharic quality is a core requirement, not an optional language feature (REQ-031).

### 2. Priority Rule

Every implementation decision related to chunking strategy, format conversion, MIME type, error handling, and provider use must prioritize transcription accuracy over convenience, performance, or code simplicity. Convenience, performance, and code simplicity must also be perfect (§8, REQ-071).

### 3. Critical Safeguards

The chunking pipeline and the correct MIME type per chunk are critical safeguards (§8, REQ-072). Re-transcription must be available to verify accuracy on every audio recording (§8, REQ-072; flow in `## Transcription Review` §2, mechanics in section 9).

### 4. Accuracy Regression Rule

Accuracy regression is a blocking defect (§8, REQ-073). Any change to the STT pipeline — including chunking, format conversion, MIME type, language code, or provider endpoint — that degrades transcription quality must be reverted immediately. Accuracy must be verified with real Amharic audio before merging (§8, REQ-073; gate in `## Validation Audit` §1).

### 5. Audio Recording Rules (§20.1)

- Each clip is recorded with the browser MediaRecorder API into a local-state array via a custom hook (`useState`/`useRef`); the full array is submitted together as the multipart field `clips`.
- Limits: max 15 minutes per clip (`AUDIO_MAX_DURATION_SEC` = 900, `## Environment Config` §5) and max 50 MB per clip (`AUDIO_MAX_SIZE_BYTES` = 52428800), enforced client-side after recording stops; a clip over 50 MB blocks the submit with a warning and asks the supervisor to re-record.
- Audio blobs are never persisted to Redux, redux-persist, or localStorage; they live in component state only.
- MIME priority: `audio/webm;codecs=opus` → `audio/webm` → `audio/mp4` → browser default.
- `react-media-recorder` and `react-player` are already installed in `client/package.json`.

### 6. Audio Validation (§20.2)

- At least one clip is required before submit.
- Max 50 MB per clip (configurable via `AUDIO_MAX_SIZE_BYTES`); the MIME type must be in the whitelist (the four types in section 5); duration metadata is informational only.
- Server-side: ffprobe duration validation and multer type/size validation.

### 7. Upload Storage (§20.3)

- Uploads go through multer into `backend/uploads/audio/`, which is gitignored and never committed.

### 8. Approved Chunking Pipeline (§20.4)

The only approved chunking pipeline (cross-aligned with `## Addis AI` §7; REQ-128):

1. Convert the full audio file to WAV via ffmpeg in a single pass: `pcm_s16le`, 16 kHz, mono — never re-encode per segment (Opus decoder priming artifacts degrade accuracy).
2. Split in-memory at the PCM level via `wavSplitter.js` into ~60 s chunks (configurable `ADDIS_AI_STT_MAX_DURATION_SEC` = 60, `## Environment Config` §5).
3. Each chunk is sent to the Addis AI STT endpoint with MIME `audio/wav` — never `audio/webm`.
4. Alternatives are forbidden unless proven equivalent (§8 priority rule; REQ-071, REQ-072).

### 9. Re-Transcription (§20.5)

- The backend must accept both `audio_attached` and `transcribed` statuses for re-transcription (status name reconciled in Phase 24, AD-011; REQ-145, REQ-168).
- The frontend shows a "Re-transcribe" button on a completed transcription that re-runs STT on the stored audio (flow in `## Transcription Review` §2).

### 10. Expansion Markers

- Phase 18 (§18 Addis AI Integration): **DONE — STT endpoint, constraints, and retry rules are in `## Addis AI` §7.**
- Phase 20 (§20 Audio Recording And STT Pipeline): **DONE — MediaRecorder, MIME priority, wavSplitter chunking, language code, re-transcription endpoint, error handling and retries (sections 5–9; REQ-139..145).**
- Phase 24 (§24 Data Model): **DONE — the upload status name is `audio_attached` (`## Data Modeling` §4.1; AD-011, REQ-168).**
- Phase 28 (§28 Error Handling): **DONE (Phase 28)** — STT error states follow the frontend error pattern (`## Error Handling` §3, REQ-201) and the error/status mapping (`## Error Handling` §2, REQ-200); per-chunk retry behavior stays per §5–9 and REQ-129.

---

## Transcription Review

> **Phase 8 seed — accuracy verification from §8 on top of the Phase 3 review loop (W-04), enriched with the review/correction UI and re-transcription mechanics from §20 in Phase 20.**

### 1. Review Loop (from §3)

The supervisor reviews the transcription and, if needed, corrects it with AI help before report generation (W-04; REQ-034/REQ-041; correction behavior in `## Report Format` §8). Report content is generated only from the reviewed transcription, never directly from raw audio (REQ-038).

### 2. Re-Transcription For Accuracy Verification (§8)

Re-transcription must be available to verify accuracy on every audio recording (§8, REQ-072): the supervisor can re-run STT on the stored audio and confirm the transcription matches the recording before generation. Re-transcription is the accuracy safeguard for the review step. Mechanics (`## Audio Recording STT` §9): the backend accepts both `audio_attached` and `transcribed` statuses for re-transcription (status name reconciled in Phase 24, AD-011), and the frontend shows a "Re-transcribe" button on a completed transcription that re-runs STT on the stored audio (REQ-145).

### 3. Expansion Markers

- Phase 20 (§20 Audio Recording And STT Pipeline): **DONE — review/correction UI (UI-004), re-transcription mechanics, editing with AI help (sections 2; REQ-145).**

---

## Error Handling

> **Phase 28 seed — the error handling patterns from §28 (Error Handling Patterns).**

### 1. Server-Side Error Handling (§28.1)

- `CustomError` lives in `backend/utils/error.js` (imported by `notFound.middleware.js` and `error.middleware.js` per the `## JSDoc Standards` §11 samples; REQ-195): the class carries `statusCode`, `message`, and `isOperational` — `isOperational` is `true` when the error is an expected, handled condition and `false` for programmer errors.
- The global error handler is `backend/middleware/error.middleware.js`, the terminal middleware in `app.js` mounted after the routes and the notFound middleware. It distinguishes operational `CustomError` instances from unexpected errors (REQ-196).
- Operational `CustomError` responses use the `statusCode` and the §10.7 error envelope `{ success: false, message: "..", data: {..} }` (`## Backend Architecture` §7).
- Unexpected errors are logged as programmer errors through `## Logging` (REQ-086); the response returns a generic message in production — internal details never reach the client. In development (`NODE_ENV === 'development'`) the response includes the full stack trace (REQ-196).

```js
// backend/middleware/error.middleware.js — global error handler (REQ-196)
/**
 * @module middleware/error
 */
import { CustomError } from '../utils/error';
import logger from '../utils/logger';

/**
 * Global error handler: operational CustomError → statusCode + envelope;
 * unexpected errors are logged and get a generic production message.
 * @param {import('express').ErrorRequestHandler} err - The forwarded error.
 * @param {import('express').Request} _req - Request (unused).
 * @param {import('express').Response} res - Response.
 * @param {import('express').NextFunction} _next - Next (unused).
 * @returns {import('express').Response} The JSON error response.
 */
const errorHandler = (err, _req, res, _next) => {
  if (err instanceof CustomError && err.isOperational) {
    return res.status(err.statusCode).json({ success: false, message: err.message, data: {} });
  }
  logger.error('Unexpected error', { stack: err.stack, statusCode: err.statusCode });
  if (process.env.NODE_ENV === 'development') {
    return res.status(500).json({ success: false, message: err.message, data: { stack: err.stack } });
  }
  return res.status(500).json({ success: false, message: 'Something went wrong', data: {} });
};

export default errorHandler;
```

```js
// backend/utils/error.js — CustomError class (REQ-195)
/**
 * @module utils/error
 */

/**
 * Operational error carrying an HTTP status and an isOperational flag.
 * @extends Error
 */
export class CustomError extends Error {
  /**
   * @param {number} statusCode - HTTP status for the response.
   * @param {string} message - Client-safe error message.
   * @param {boolean} [isOperational] - True for expected, handled errors.
   */
  constructor(statusCode, message, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}
```

- `notFound.middleware.js` handles unmatched routes: it creates `new CustomError(404, "..")` with a descriptive message and calls `next(error)` — it never responds directly, so every unmatched `/api/v1` request reaches the global handler with a 404 (REQ-197; `## Project Directory Structure` §4).

```js
// backend/middleware/notFound.middleware.js (REQ-197)
/**
 * @module middleware/notFound
 */
import { CustomError } from '../utils/error';

/**
 * Unmatched routes → CustomError(404) → next(); never responds directly.
 * @param {import('express').Request} _req - Request (unused).
 * @param {import('express').Response} _res - Response (unused).
 * @param {import('express').NextFunction} next - Next; receives the error.
 */
const notFound = (_req, _res, next) => {
  next(new CustomError(404, 'Resource not found'));
};

export default notFound;
```

- Validation failures: the validators check `express-validator` results and return `422` with the error envelope; `data.errors` carries the per-field validation messages that the frontend surfaces under each field via `error.data.data.errors` (§28.3; REQ-198; `## API Contract` §3, `## Backend Architecture` §9).
- All async controllers are wrapped with `express-async-handler` (imported as `asyncHandler`) — no custom async wrapper; rejected promises forward automatically to the global error handler through `next(error)` (REQ-199; `## Backend Architecture` §3).

### 2. Error Types And HTTP Status Codes (§28.2)

| Error | Status | Notes |
|---|---|---|
| Validation | 422 | `express-validator` failures; `data.errors` per-field messages |
| Auth (missing/invalid token) | 401 | No access token, invalid signature, or expired token |
| Auth (refresh expired) | 401 | Refresh token expired or invalid — frontend refresh flow in §3 |
| Not Found | 404 | Resource not found with a descriptive message |
| File size exceeded | 413 | Audio upload too large (`## Audio Recording STT` §6) |
| Invalid MIME type | 415 | Audio format not allowed (multer type validation) |
| Mongoose CastError | 400 | Invalid ObjectId |
| Mongoose ValidationError | 422 | Field-format error messages |
| Mongoose duplicate key (11000) | 409 | Unique constraint violation |
| JsonWebTokenError | 401 | Invalid token |
| TokenExpiredError | 401 | Expired access token — triggers the refresh flow |
| AI service error | 502 | Provider returned error |
| Rate limit exceeded | 429 | Three tiers (`## Security` §4, REQ-204) |

- The global error handler maps the Mongoose and JWT error classes to the table statuses: `CastError` → 400, `ValidationError` → 422, duplicate-key code 11000 → 409, `JsonWebTokenError` → 401, `TokenExpiredError` → 401 (REQ-200).
- AI provider failures map to `502` at the backend boundary — the unified rule across Addis AI, Gemini, and Nvidia for generation and correction endpoints (REQ-200; `## Addis AI` §12, `## Other AI Providers` §3, REQ-136, REQ-137). STT chunk failures keep their per-chunk behavior — mark the chunk failed and continue (REQ-129) — the 502 applies to generation/correction responses.
- All error statuses use the §10.7 error envelope; numeric codes are never hardcoded — they come by semantic name from `backend/utils/httpStatus.js` (§10.6).

### 3. Frontend Error Handling (§28.3)

- `baseQueryWithReauth` handles 401 responses: `POST /api/v1/auth/refresh` → on success, retry the original request (the backend re-issues both httpOnly cookies automatically) → on refresh failure, clear auth state and redirect to login. Full flow in `## Redux RTK Query` §2 (REQ-105, REQ-106).
- Every RTK Query lifecycle (`onQueryStarted` for mutations, query callbacks where relevant) catches the baseQuery result with the `if (error)` guard (REQ-201): server-formatted validation errors display per field via `error.data.data.errors`, and success/error toasts fire through `AppToastContainer` (react-toastify `^11.1.0`, `client/package.json`).

```js
// onQueryStarted error pattern — report generation mutation (REQ-201)
import { toast } from 'react-toastify';

onQueryStarted: async (_arg, { queryFulfilled }) => {
  try {
    const { data } = await queryFulfilled;
    toast.success(data.message);
  } catch (error) {
    const message = error.data?.message || error.data?.data?.errors?.[0]?.message || 'Something went wrong';
    toast.error(message);
  }
}
```

- Error message extraction chain: `error.data?.message || error.data?.data?.errors?.[0]?.message || 'Something went wrong'` (REQ-201).
- `AppErrorBoundary` is a class component (react-error-boundary `^6.1.2`, `client/package.json`) that catches React render errors and shows a fallback UI; it wraps the router content in `App.jsx` alongside `AppToastContainer` (REQ-202; `## Frontend Architecture` §2). Render errors only — async and event-handler errors are handled by the RTK Query pattern above.

```jsx
// client/src/components/layout/AppErrorBoundary.jsx (REQ-202)
/**
 * @module components/layout/AppErrorBoundary
 */
import { Component } from 'react';

/**
 * Class-component error boundary catching React render errors
 * and rendering a fallback UI (react-error-boundary contract).
 * @extends Component
 */
class AppErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please reload the page.</h1>;
    }
    return this.props.children;
  }
}

export default AppErrorBoundary;
```

### 4. Expansion Markers

- Phase 13 (§13 Redux): **DONE (Phase 13)** — the `baseQueryWithReauth` refresh flow in `## Redux RTK Query` §2 (REQ-104..106).
- Phase 28 (§28 Error Handling Patterns): **DONE (Phase 28)** — server-side error handling in §1, the error status mapping in §2, frontend error handling in §3 (REQ-195..202).
- Phase 29 (§29 Security): **DONE (Phase 29)** — rate-limit errors (`429`, three tiers) and the security-related error rules live in `## Security` (§§4/7) and the 429 row in §2 above (REQ-203..205).

---

## Validation Audit

> **Phase 8 seed — the accuracy verification gates from §8. Broader validation and audit (error handling, checklists, source traceability, non-functional requirements) arrives in Phases 26, 28, 30, 31.**

### 1. Accuracy Verification Gate

Accuracy regression is a blocking defect (§8, REQ-073). Any change to the STT pipeline — chunking, format conversion, MIME type, language code, provider endpoint — that degrades transcription quality must be reverted immediately. Accuracy must be verified with real Amharic audio before merging (§8, REQ-073). This gate applies to all future STT pipeline work (Phases 18, 20, 28).

### 2. Form Validation Rules

Every form is reviewed against `## React Hook Form Standards` (REQ-112..116):

- `useForm({ mode: 'onBlur' })` with `register`/`handleSubmit`/`formState.errors` destructured; GlobalSearchDialog is the only `mode: 'onSubmit'` exception (REQ-099).
- `register`-first integration; `Controller` only for MUI X DatePicker/TimePicker with an explanatory code comment; no `watch`; `getValues` inside validate functions for cross-field rules.
- Errors render under their fields via MUI `error`/`helperText` from `formState.errors`; messages English.
- No debounce, no `useDebounce`; direct register integration only.
- Backend 422s surface under the offending field via `setError`; `reset()` only after success; `isSubmitting` disables the submit button and shows the spinner.
- Manual resolver with consistent error shape; no zod.

A form that does not follow the `register`-first RHF contract is a review failure.

### 3. Error Handling Audit (Phase 28)

Every error path is audited against `## Error Handling` §§1–3 (REQ-195..202):

- STT failure states: an STT failure surfaces an error state with retry (UI-002, `## Audio Recording STT` §10); the error state follows the frontend error pattern (`## Error Handling` §3) and the STT error/status mapping (`## Error Handling` §2).
- AI generation failures: a client-side generation failure shows an error state (UI-002/UI-003 failure cases, `## Work Flow` §3); a backend failure surfaces through the §10.7 envelope — provider failures return 502 for generation/correction endpoints (`## Error Handling` §2, REQ-200).
- No raw error internals reach production responses (generic message only, REQ-196); no raw provider messages surface to users (REQ-129).
- The `onQueryStarted` `if (error)` pattern, per-field `error.data.data.errors` display, and `AppToastContainer` toasts are present on every mutation (`## Redux RTK Query` §5, REQ-201).

### 4. Scope Note

This seed covers transcription accuracy and form validation. Full validation and audit sections arrive in later phases: Phases 31 (Validation And Audit — checklists, source traceability, non-functional requirements), 32 (Git Workflow); the Phase 26 code documentation audit landed in `## JSDoc Standards` and `## Checklists`, and the Phase 28 error handling audit landed in `## Error Handling` §3.

### 5. Expansion Markers

- Phase 15 (§15 React Hook Form Standards): **DONE (Phase 15)** — form validation rules in §2 above.
- Phase 26 (§26 Code Quality And Coding Conventions): **DONE (Phase 26)** — code documentation audit rules in `## JSDoc Standards` and `## Checklists`.
- Phase 28 (§28 Error Handling): **DONE (Phase 28)** — error handling audit in §3 above (`## Error Handling` §§1–3, REQ-195..202).
- Phase 31 (§31 Validation And Audit): full validation audit, checklists, source traceability, non-functional requirements.
- Phase 32 (§32 Git Workflow): branch/commit rules that carry the accuracy gate.

---

## Checklists

> **Phase 26 seed — the code-quality and build-gate checklists from §26 (Code Quality And Coding Conventions). Expanded in Phases 30 (New File Creation Rules) and 31 (Validation And Audit).**

### 1. Code Quality Checklist (Phase 26)

Every source file must satisfy all of the following (REQ-178..186; `## Coding Conventions` §§7–13, `## JSDoc Standards` §1):

- [ ] Backend files use ES Modules only — `import`/`export`, never `require()`/`module.exports` (REQ-075).
- [ ] No `console.log` in backend code (REQ-086); `console.log` is allowed in frontend code.
- [ ] No zod — manual resolvers with a consistent error shape (REQ-077).
- [ ] Formatting: semicolons required, single quotes, trailing commas, 2-space indentation, 100-character width, LF line endings, UTF-8 encoding (REQ-178).
- [ ] Naming: camelCase variables/functions, PascalCase classes/components, kebab-case file names, UPPER_SNAKE_CASE constants and environment variables (REQ-179).
- [ ] Import order: built-in → npm → local, alphabetical within groups (REQ-180).
- [ ] Named imports for utilities and functions; default import for React components; no `*` imports (REQ-180).
- [ ] No unused imports — every import is referenced in the file body (REQ-181).
- [ ] No unused exports — every exported function or constant is imported elsewhere (REQ-181).
- [ ] No dead code — no unused constants, variables, or methods (REQ-181).
- [ ] Unused parameters carry the `_` prefix (`_req`, `_res`, `_next`) (REQ-181).
- [ ] Every file or module carries a JSDoc block comment at the top (REQ-185).
- [ ] Public modules carry `@module`; functions carry `@param`/`@returns`/`@throws`; constants carry `@type`; exports carry JSDoc (REQ-186).
- [ ] Frontend components are functional with hooks; props destructured in the function signature; event handlers prefixed with `handle` (REQ-182).
- [ ] Backend user IDs use `req.user._id.toString()` (REQ-183).

### 2. Frontend Build And Lint Gate (Phase 26)

- [ ] `npx vite build` completes with 0 errors (REQ-184).
- [ ] `npm run lint` (`eslint .`) passes with `client/eslint.config.js` (REQ-184).
- No backend lint gate: §26 mandates lint for the frontend only (codebase fact).

### 3. Expansion Markers

- Phase 26 (§26 Code Quality And Coding Conventions): **DONE (Phase 26)** — checklists in §§1–2.
- Phase 30 (§30 New File Creation Rules): new-file-creation checklist.
- Phase 31 (§31 Validation And Audit): full validation and audit checklists.

---

## Architecture

> **Phase 9 seed — the stack-level architecture from §9, enriched in Phase 10 with the §10 backend architecture. Frontend architecture arrived in Phase 12; implementation architecture finalized in Phase 25.**

### 1. Repository Layout

Two independent packages at the repository root `Report-Builder-V2/`: `backend/` and `client/` (codebase fact, AD-006). There is no shared package; each package has its own `package.json`.

### 2. Backend Stack

Node.js + Express + Mongoose, ES Modules only (`"type": "module"`), JavaScript only (§9.1, REQ-074/075). Deep backend architecture (routing, middleware, controllers, validation, error handling, logging) is defined in `## Backend Architecture` (Phase 10).

### 3. Frontend Stack

React 19, Vite 8, MUI 9, React Redux, Redux Toolkit, React Router 8, React Hook Form; JavaScript only; no Next.js, no Remix, no other frameworks; no Tailwind CSS (§9.1, REQ-076). Deep frontend architecture arrives in Phases 12–16.

### 4. Package Source Of Truth

`backend/package.json` and `client/package.json` are the source of truth for package versions (§9.2, REQ-079). The packages are already installed; other required packages can be installed if needed.

### 5. Backend Architecture (Phase 10, final Phase 25)

Backend architecture mandated by §10 (full detail in `## Backend Architecture`):

- **Layering:** routes → validators → controllers → models. All routes are mounted under `/api/v1`; `backend/routes/index.js` imports and mounts all route modules; `app.js` registers no routes directly (§10.1).
- **Middleware:** fixed global security stack `helmet -> cors -> compression -> cookie-parser -> mongo-sanitize -> rate-limit`, not reorderable or removable (§10.2); custom cross-cutting middleware (`authenticate`, `notFound`, `error`) lives in `backend/middleware/*.middleware.js`.
- **Controllers:** one file per domain (auth, branch, report, audio, transcription, ai, user, analytics); `express-async-handler` as `asyncHandler` wraps all handlers; write controllers use mongoose sessions and transactions (`try/catch/finally`, commit-or-abort, `endSession` in `finally`); read-only get/list endpoints skip transactions; errors forward via `next(error)` to the global error handler (§10.3).
- **Services layer:** external integrations live in `backend/services/*.service.js` — `oauth.service.js` (Google OAuth, including the `drive.file` scope), `addis.service.js`, `gemini.service.js`, `nvidia.service.js`, and `googleDocs.service.js` (Google Drive export); controllers stay thin (§25.1, Phase 25 user decision).
- **Constants and config:** `backend/utils/constants.js` (frozen, no magic values); all environment access through the frozen `env` object in `backend/config/env.js` (§10.5); DB connection in `backend/config/db.js` (§25.1).
- **Startup:** the HTTP server starts before the database connection so the health endpoint is reachable without the DB; graceful shutdown on SIGINT/SIGTERM is mandatory and must not be removed or replaced (§10.8).

### 6. Expansion Markers

- Phase 25 (§25 Project Directory Structure): **DONE (Phase 25)** — final implementation architecture: backend layers and services in §5, complete file tree in `## Project Directory Structure` §4.

---

## Coding Conventions

> **Phase 9 seed — the code-level conventions from §9. Backend file-organization conventions arrived in Phase 25; the §26 code-level conventions (formatting, naming, imports, dead code, backend/frontend conventions, build and lint gates) arrived in Phase 26; the §27 JSDoc conventions arrived in `## JSDoc Standards` §§3–11 (REQ-187..194).**

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

### 6. Backend File Organization (Phase 25)

Structure-scoped conventions from §25 and §10 (code-level conventions live in §§7–13):

- Backend file names are kebab-case, following the §25.1 explicit names (`env.js`, `oauth.service.js`, `notFound.middleware.js`); per-domain files follow the `<domain>.controller.js`, `<domain>.routes.js`, `<domain>.validator.js`, and `<domain>.model.js` patterns (REQ-176).
- One controller file per domain: auth, branch, report, audio, transcription, ai, user, analytics (§10.3, REQ-176).
- External integrations live in `backend/services/*.service.js` (e.g. `oauth.service.js`, `addis.service.js`, `gemini.service.js`, `nvidia.service.js`, `googleDocs.service.js`); cross-cutting HTTP concerns live in `backend/middleware/*.middleware.js` (`authenticate`, `notFound`, `error`) (REQ-176).
- Every file created during implementation must land in the `## Project Directory Structure` §4/§5 subtrees; new paths must be recorded there (REQ-173).
- New route modules are created in `backend/routes/`, imported, and mounted in `backend/routes/index.js` (REQ-080).

### 7. Formatting (Phase 26)

- Semicolons are required.
- Single quotes (`'`), never double quotes.
- Trailing commas on multi-line arrays, objects, and function parameter lists.
- 2-space indentation.
- 100-character line width.
- LF line endings; UTF-8 encoding (REQ-178).

### 8. Naming (Phase 26)

- camelCase for variables and functions.
- PascalCase for classes and components.
- kebab-case for file names.
- UPPER_SNAKE_CASE for constants and environment variables (REQ-179).

### 9. Imports (Phase 26)

- Import order: built-in modules → npm packages → local modules, alphabetical within each group.
- Named imports for utilities and functions; default import for React components; never `*` imports (REQ-180).

### 10. Dead Code And Unused Parameters (Phase 26)

- No unused imports — every `import X from Y` must be referenced in the file body.
- No unused exports — every exported function or constant must be imported elsewhere.
- No dead code — unused constants, variables, and methods are removed.
- Unused parameters use the `_` prefix — `_req`, `_res`, `_next` — to signal intentional non-use (REQ-181).

### 11. Backend Conventions (Phase 26)

- Backend code uses ES Modules only (`import`/`export`, never `require()`/`module.exports`); `backend/package.json` carries `"type": "module"` (§1, REQ-075).
- No `console.log` in backend code — the absolute ban from `## Logging` (REQ-086); Winston replaces it in all environments. `console.log` is allowed in frontend code.
- User IDs are obtained with the `req.user._id.toString()` pattern (REQ-183).

### 12. Frontend Conventions (Phase 26)

- Components are functional components with hooks.
- Props are destructured in the function signature.
- Event handlers are prefixed with `handle` (e.g. `handleSubmit`, `handleClick`), except when a `register`-first RHF field directly binds the input (REQ-182).

### 13. Build And Lint Gates (Phase 26)

- The frontend must pass `npx vite build` with 0 errors.
- The frontend must also pass lint — `npm run lint` runs `eslint .` with the existing `client/eslint.config.js` flat config (ESLint 10: `@eslint/js` recommended + `eslint-plugin-react-hooks` flat recommended + `eslint-plugin-react-refresh` vite preset, browser globals, JSX, `dist` ignored).
- There is no backend lint requirement: §26 mandates lint for the frontend only; `backend/` has no ESLint config and no lint script (codebase fact) (REQ-184).

### 14. Expansion Markers

- Phase 25 (§25 Project Directory Structure): **DONE (Phase 25)** — backend file organization in §6.
- Phase 26 (§26 Code Quality And Coding Conventions): **DONE (Phase 26)** — code-level conventions in §§7–13; the JSDoc rules live in `## JSDoc Standards` (REQ-178..186).
- Phase 27 (§27 JSDoc Conventions): **DONE (Phase 27)** — the JSDoc tag conventions and sample documented files live in `## JSDoc Standards` §§3–11 (REQ-187..194).

---

## JSDoc Standards

> **Phase 26 seed + Phase 27 enrichment — the mandatory-documentation rules from §26 (Code Quality And Coding Conventions), deepened with the full §27 JSDoc conventions (REQ-187..194) and the six canonical sample files in §11.**

### 1. Mandatory Documentation (Phase 26)

- Every single file or module carries a JSDoc block comment at the top of the file (REQ-185).
- JSDoc on all public modules with `@module` (REQ-186).
- JSDoc on functions with `@param`, `@returns`, and `@throws` (REQ-186).
- JSDoc on constants with `@type` (REQ-186).
- JSDoc on exports (REQ-186).

The tag-level detail — the `@module path/name` form, `import('express').Request` types, Mongoose `@returns {Promise<void>}`, component `@param {Object} props`, model `@typedef`/`@property`, middleware req/res/next triple, and the no-TypeScript typing rules — is Phase 27 scope, now built in §§3–11 (REQ-187..194).

### 2. Codebase Facts (Phase 26)

- `client/src/theme/*` (`AppTheme.jsx`, `themePrimitives.js`, `customizations/*`) already carry `@module <path>` JSDoc blocks — matching the §27 rule that theme customizations use `@module`, not `@file` (Phase 14-aligned).
- `client/src/main.jsx` and `App.jsx` are Vite template remnants with no JSDoc; they are replaced during implementation per `## Project Directory Structure` §5 (REQ-175), so no current file is exempted from the mandatory-documentation rule.
- `client/src/theme/AppTheme.jsx` documents the full §27 function triple on its export: `@param {{ children: React.ReactNode }} props - Theme provider props.`, `@returns {JSX.Element} Theme provider wrapper.`, `@throws {never} This component does not throw.` — the live model for the function tag form in §4.
- `client/src/theme/customizations/surfaces.js` opens with `@module customizations/surfaces` — the live model for the `@module` path form in §3 (relative to `client/src/`).
- `client/src/theme/themePrimitives.js` exports the brand/gray/green/orange/red/blue/error/success constants without `@type` — the REQ-186 gap documented in Phase 26; the file is not slated for replacement, so the constants gain `@type` tags during implementation.

### 3. Module-Level Documentation (Phase 27)

Every file opens with a `@module` JSDoc block. The `@module` path is relative to the package source root — `client/src/` for the frontend, `backend/` for the backend — and uses forward slashes (REQ-187):

- `@module components/reusable/FormTextField`
- `@module models/dailyReport`
- `@module customizations/surfaces` (a theme customization inside `client/src/theme/customizations/`)

Theme customizations and the app theme provider use `@module`, never `@file` — `client/src/theme/AppTheme.jsx` opens with `@module theme/AppTheme` (live codebase fact; REQ-187).

### 4. Function-Level Tags (Phase 27)

Functions carry the §26 tag triple, each tag used where applicable (REQ-188):

- `@param {type} name - description` — one tag per parameter, lowercase first letter after the dash.
- `@returns {type}` — present on every function that returns a value.
- `@throws {ErrorType} reason` — one tag per documented throw (e.g. `@throws {CustomError} 404 - Report not found`).

Components and controllers are **arrow functions** — `const Component = (props) => {...}`, `const handler = asyncHandler(async (req, res, next) => {...})` (REQ-188, REQ-182).

### 5. Constants (Phase 27)

Constants carry a `@type` tag with the full type definition (REQ-189):

- `@type {number}` — durations, sizes, limits.
- `@type {Object<string, string>}` — maps such as the HTTP status map.
- `@type {string[]}` — enumerations such as report statuses.

### 6. Express And Mongoose Types (Phase 27)

Express request/response types are written via the `import('express')` type syntax — no global `Request`/`Response`/`NextFunction` names (REQ-190):

- `@param {import('express').Request} req`
- `@param {import('express').Response} res`
- `@param {import('express').NextFunction} next`

Mongoose middleware and pre/post hooks are async and document `@returns {Promise<void>}` (REQ-190).

### 7. Component JSDoc (Phase 27)

Components document `@param {Object} props` and every named prop used (REQ-191). For RHF-bound inputs the documented props are at minimum:

- `props.name` — the field name; must match a registered RHF field.
- `props.label` — the visible field label.
- `props.error` — the field error message, or `undefined` when valid.
- `props.helperText` — helper text, or `undefined`.
- `props.control` — the RHF control passed down for field registration.

Reusable Mui input components are wrapped with `forwardRef` (REQ-108/113, `## MUI Component Standards` §8) so RHF `register('fieldName')` binds the input directly; the `ref` parameter is documented with `@param {import('react').Ref} ref` (REQ-191). Presentation wrappers (e.g. `MuiButton` wrappers) do not use `forwardRef`.

### 8. Model JSDoc (Phase 27)

Model files open with the file `@module`, then define the document shape with `@typedef {Object} ModelName` plus one `@property {Type} fieldName - description` line per schema field (REQ-192) — the JSDoc replacement for TypeScript interfaces (REQ-194). The typedef appears above the schema so it documents the exported model; field types use plain JSDoc types (`string`, `ObjectId`, `Date`, `number`, `ObjectId[]`).

### 9. Middleware JSDoc (Phase 27)

Middleware documents the req/res/next triple (REQ-193):

- `@param {import('express').Request} req`
- `@param {import('express').Response} res`
- `@param {import('express').NextFunction} next`

Intentionally unused parameters carry the `_` prefix (`_req`, `_res`, `_next`) per REQ-181, and the triple still documents them by name (REQ-193).

### 10. No-TypeScript Typing Rules (Phase 27)

The project is JavaScript-only (§9.1, REQ-074) — JSDoc is the type layer (REQ-194):

- Compound shapes are declared with `@typedef`.
- Props and options objects are typed as `@param {Object} props` with named props.
- Async functions document `@returns {Promise<Type>}`.
- No `.ts`, no `.tsx`, no TS config files anywhere.

### 11. Sample Documented Files (Phase 27)

The six samples below are the canonical JSDoc forms for each file kind in `## Project Directory Structure` §§4–5. New files must match these forms, and existing files must be brought into compliance during implementation (REQ-187..194).

**Theme customization** (`client/src/theme/customizations/*.js` — the live `surfaces.js` form):

```js
/**
 * @module customizations/surfaces
 */

import { alpha } from '@mui/material/styles';

import { gray } from '../themePrimitives';

export const surfacesCustomizations = {
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: '1px solid',
        borderColor: (theme.vars || theme).palette.divider,
        backgroundColor: (theme.vars || theme).palette.background.default,
        // ...
      }),
    },
  },
};
```

**Constants** (`backend/utils/constants.js` form):

```js
/**
 * @module utils/constants
 */

/** @type {number} Maximum audio clip duration in seconds (80 KiB/minute upper bound). */
export const AUDIO_MAX_DURATION_SEC = 900;

/** @type {number} Maximum single audio file size in bytes. */
export const AUDIO_MAX_SIZE_BYTES = 52428800;

/** @type {string[]} The report lifecycle statuses in workflow order. */
export const REPORT_STATUSES = ['draft', 'generating', 'review', 'finalized'];
```

**Mongoose model** (`backend/models/dailyReport.js` form):

```js
/**
 * @module models/dailyReport
 */

import mongoose from 'mongoose';

/**
 * Daily supervision report document.
 *
 * @typedef {Object} DailyReport
 * @property {ObjectId} user - The supervisor who owns the report.
 * @property {Date} date - The report date.
 * @property {ObjectId[]} branches - Branches visited that day.
 * @property {string} status - Current lifecycle status (REPORT_STATUSES).
 * @property {string} transcription - The reviewed transcription text.
 */

const dailyReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  branches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Branch' }],
  status: { type: String, enum: ['draft', 'generating', 'review', 'finalized'], default: 'draft' },
  transcription: { type: String, default: '' },
});

export default mongoose.model('DailyReport', dailyReportSchema);
```

**Express controller** (`backend/controllers/user.controller.js` form — arrow function, `req.user._id.toString()` per REQ-183, response shape `{ success, message, data }`):

```js
/**
 * @module controllers/user.controller
 */

import asyncHandler from 'express-async-handler';

/**
 * Returns the authenticated user's profile.
 *
 * @param {import('express').Request} req - The request; `req.user` is set by the authenticate middleware.
 * @param {import('express').Response} res - The response.
 * @param {import('express').NextFunction} next - The next middleware.
 * @returns {Promise<void>} Responds with the profile or delegates to the error handler.
 * @throws {CustomError} 404 - User not found.
 */
const getProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user._id.toString();
  // ...
  res.json({ success: true, message: 'User profile fetched successfully', data: { user } });
});

export default { getProfile };
```

**Express middleware** (`backend/middleware/notFound.middleware.js` form — unused params `_`-prefixed per REQ-181):

```js
/**
 * @module middleware/notFound
 */

import { CustomError } from '../utils/error';

/**
 * 404 handler for unmatched routes.
 *
 * @param {import('express').Request} _req - The request.
 * @param {import('express').Response} _res - The response.
 * @param {import('express').NextFunction} next - The next middleware.
 * @returns {Promise<void>} Delegates the 404 error to the error handler.
 * @throws {CustomError} 404 - Route not found.
 */
const notFound = asyncHandler(async (_req, _res, next) => {
  next(new CustomError(404, 'Route not found'));
});

export default notFound;
```

**React component** (`client/src/components/reusable/FormTextField.jsx` form — arrow function wrapped with `forwardRef` so RHF `register` binds the input directly, `displayName` set per REQ-108):

```jsx
/**
 * Reusable text-field form control (RHF-registered).
 *
 * @module components/reusable/FormTextField
 */

import { TextField } from '@mui/material';
import { forwardRef } from 'react';

/**
 * Text-field wrapper bound to react-hook-form.
 *
 * @param {Object} props - Component props.
 * @param {string} props.name - Field name; must match a registered RHF field.
 * @param {string} props.label - Visible field label.
 * @param {string | undefined} props.error - Field error message, or undefined when valid.
 * @param {string | undefined} props.helperText - Helper text, or undefined.
 * @param {Object} props.control - RHF control passed down for field registration.
 * @param {import('react').Ref} ref - Forwarded ref bound to the input element for RHF `register`.
 * @returns {JSX.Element} The rendered text field.
 */
const FormTextField = forwardRef(({ name, label, error, helperText, control }, ref) => {
  // ...
});

FormTextField.displayName = 'FormTextField';
```

### 12. Expansion Markers

- Phase 26 (§26 Code Quality And Coding Conventions): **DONE (Phase 26)** — mandatory documentation rules in §1 (REQ-185/186).
- Phase 27 (§27 JSDoc Conventions): **DONE (Phase 27)** — the full §27 tag conventions in §§3–10 and the six canonical sample files in §11 (REQ-187..194).

---

## Project Directory Structure

> **Phase 9 seed — the repository-level structure from §9, enriched in Phase 10 with the §10 backend directory structure and in Phase 12 with the §12 frontend directory structure. Final structure in Phase 25 (§25 Project Directory Structure).**

### 1. Repository Root

`Report-Builder-V2/` contains two independent packages — `backend/` and `client/` — plus the repository-level files below (codebase facts; AD-006). There is no root `package.json`.

```
Report-Builder-V2/
├── .gitignore            # First line: `.env` (`## Environment Config` §1, REQ-120)
├── README.md             # `# Report Builder V2`
├── backend/              # Backend package — structure in §4
├── client/               # Frontend package — structure in §5
├── docs/                 # Project documentation (not part of the delivered application)
└── scripts/              # Repository tooling, e.g. scripts/verify-initial-doc.py
```

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

### 4. Backend Directory Structure (final, Phase 25)

Complete future-state backend tree, generated in Phase 25 per §25.3 from the current `backend/*` codebase and the §25.1 explicit paths. The codebase currently contains only `.env`, `package.json`, and `package-lock.json` (no source files); every file below is created during implementation:

```
backend/
├── .env                        # Local only, gitignored; env contract `## Environment Config` §2 (REQ-121)
├── package.json                # `"type": "module"`; dependency table in §2
├── package-lock.json
├── app.js                      # Express app assembly; fixed global security stack; `/api/v1` mount point; no direct routes (§10.1–10.2)
├── server.js                   # Server bootstrap: dotenv → DB connect → listen; starts before DB; graceful shutdown (§10.8, REQ-084)
├── config/
│   ├── env.js                  # Frozen validated `env` object; sole `process.env` access point (§10.5, REQ-083)
│   └── db.js                   # Mongoose connection/options; consumed by server.js (§25.1)
├── controllers/                # One file per domain; `asyncHandler` wraps all handlers (§10.3)
│   ├── auth.controller.js      # register, login, logout, refresh, Google OAuth (§11)
│   ├── branch.controller.js    # Branch CRUD
│   ├── report.controller.js    # Report CRUD, generate, export — incl. `exportReport` (Google Drive export, §22, Phase 25)
│   ├── audio.controller.js     # Clips upload, re-transcription (§20; multer → uploads/audio/)
│   ├── transcription.controller.js  # Transcription list/update/AI correction (§20–21)
│   ├── ai.controller.js        # Generation/correction orchestration; calls services/addis|gemini|nvidia (§18–19)
│   ├── user.controller.js      # Profile endpoints
│   └── analytics.controller.js # Dashboard analytics
├── middleware/
│   ├── authenticate.middleware.js  # JWT verification on protected routes (§11)
│   ├── notFound.middleware.js      # Unmatched routes → CustomError(404) → next() (§25.1, §28.1)
│   └── error.middleware.js         # Global error handler; operational vs unexpected (§28.1, REQ-196)
├── models/                    # Mongoose schemas (`## Data Modeling` §4)
│   ├── user.model.js          # User
│   ├── branch.model.js        # Branch
│   ├── report.model.js        # Report
│   ├── transcription.model.js # Transcription
│   └── audio.model.js         # Audio
├── mock/                      # Development-only data injection/wipe (`## Mock Data Seeding` §6)
│   ├── seed.js                # Inject module (session contract; wipe-before-inject)
│   └── wipe.js                # Transactional wipe module
├── routes/                    # All routes mounted under /api/v1 via index.js (§10.1)
│   ├── index.js               # Imports and mounts all route modules
│   ├── auth.routes.js
│   ├── branch.routes.js
│   ├── report.routes.js
│   ├── audio.routes.js
│   ├── transcription.routes.js
│   ├── ai.routes.js
│   ├── user.routes.js
│   └── analytics.routes.js
├── services/                  # External integration logic; controllers stay thin (Phase 25 user decision)
│   ├── oauth.service.js       # Google OAuth: getGoogleOAuthUrl(), token exchange; `drive.file` scope for export (§25.1, §11)
│   ├── addis.service.js       # Addis AI REST integration (§18)
│   ├── gemini.service.js      # Gemini fallback provider (§19)
│   ├── nvidia.service.js      # Nvidia fallback provider (§19)
│   └── googleDocs.service.js  # Google Docs export: creates the document in the user's own Drive with the user's OAuth token (§22, Phase 25, REQ-158)
├── uploads/
│   └── audio/                 # Multer destination for clips; runtime-created; gitignored (§20.1, §25.1)
├── utils/
│   ├── constants.js           # Frozen constants; no magic values (§10.5; `## Environment Config` §5)
│   ├── error.js               # CustomError class: statusCode, message, isOperational (§28.1, REQ-195)
│   ├── httpStatus.js          # Semantic HTTP status codes (§10.6)
│   ├── logger.js              # Winston logger; backend-only logging (§10.9)
│   └── wavSplitter.js         # In-memory PCM-level chunk splitter for STT (§20)
├── validators/                # express-validator files, one per domain, applied as route middleware (§10.10)
│   ├── auth.validator.js
│   ├── branch.validator.js
│   ├── report.validator.js
│   ├── audio.validator.js
│   ├── transcription.validator.js
│   ├── ai.validator.js
│   ├── user.validator.js
│   └── analytics.validator.js
└── logs/                      # Winston daily-rotated logs; gitignored; 30-day auto-delete (§10.9)
```

Notes:

- `backend/uploads/audio/` is created at runtime by multer and holds `{uuid}.webm` clips (`## Data Modeling` §4.2); it is gitignored and never committed.
- Mock entry points finalized in Phase 25: `mock/seed.js` and `mock/wipe.js`, wired as the npm scripts `mock:seed` and `mock:wipe` with the `NODE_ENV` production guard (REQ-164; §23 deferral resolved — `## Mock Data Seeding` §6).
- Export path resolved in Phase 25 (user decision): `POST /api/v1/reports/:reportId/export` — handler `exportReport` in `report.controller.js`, document creation in `services/googleDocs.service.js` (Google Drive export, REQ-158).

### 5. Frontend Directory Structure (final, Phase 25)

Complete future-state frontend tree, generated in Phase 25 per §25.3 from the current `client/*` codebase and the §25.2 explicit paths. Current codebase state: `client/src` contains only `main.jsx`, `App.jsx`, `theme/`, and `assets/` (Vite scaffolding); the rest of the tree is created during implementation:

```
client/
├── index.html
├── package.json
├── eslint.config.js
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.jsx                       # createBrowserRouter + RouterProvider; LocalizationProvider + AdapterDayjs wrap (§12.1)
    ├── App.jsx                        # Root layout: AppTheme, CssBaseline, AppErrorBoundary, AppToastContainer, <Outlet /> (§12.1)
    ├── pages/                         # One lazy-loaded file per page (§12.6, §25.2): Landing.jsx, Login.jsx, Register.jsx,
    │                                  #   Dashboard.jsx, Reports.jsx, ReportDetails.jsx, Branches.jsx, BranchDetails.jsx,
    │                                  #   Profile.jsx, NotFound.jsx, Assistant.jsx (AppShell sibling, full-screen)
    ├── components/
    │   ├── <domain>/                  # One domain folder per page (§12.6): landing, login, register, dashboard, report,
    │   │                              #   branch, profile, assistant, notFound — e.g. components/login/LoginForm.jsx;
    │   │                              #   branch editing is a dialog under branch/, report editing happens in the Assistant chat
    │   ├── layout/
    │   │   ├── PublicLayout.jsx       # Public shell: fixed public MuiAppbar + scrollable content (§12.2)
    │   │   ├── AppShell.jsx           # Protected shell: AppSidebar + content area (MuiAppbar → Page Header → Outlet) (§12.2)
    │   │   └── AppSidebar.jsx         # Navigation drawer; temporary/permanent/mini modes (§12.2–12.3)
    │   ├── report/
    │   │   └── CreateReportDialog.jsx # New-report dialog (§12.6 3.5.1)
    │   ├── assistant/
    │   │   └── chatAdapter.js         # Plain-JS ChatBox adapter: sendMessage/listConversations/listMessages/addToolApprovalResponse (§12.6 3.5.2)
    │   ├── reusable/                  # Reusable Mui* components: MuiAppbar, MuiButton, MuiDialog, MuiTextField, MuiSelect, MuiDatePicker, MuiPagination, MuiDataGrid, MuiConfirmDialog, MuiPageHeader, MuiStatusBadge, LoadingSpinner, GlobalSearchDialog (§14.2–14.3)
    │   └── columns/                   # Per-domain MuiDataGrid column sets; action column last (§14 1.8) — e.g. reportColumns.jsx, branchColumns.jsx
    ├── hooks/
    │   ├── useAuth.js                 # Auth state convenience hook (§12.7)
    │   └── useAudioRecorder.js        # MediaRecorder state/actions hook (§12.7)
    ├── redux/                            # Redux/RTK Query structure (§13)
    │   ├── app/
    │   │   └── store.js                  # configureStore; exported store (§13.1)
    │   └── features/
    │       ├── api.js                    # createApi + fetchBaseQuery + baseQueryWithReauth; baseUrl = API_CONFIG.VITE_API_BASE_URL, credentials: 'include' (§13.1–13.2)
    │       ├── assistantApi.js           # RTK Query chat endpoints (sendMessage/listConversations/listMessages/addToolApprovalResponse) used by chatAdapter.js (§12.6 3.5.2, §21, §25.2)
    │       ├── authSlice.js              # useLoginMutation, useRegisterMutation, ... (§12.6, §13.1)
    │       ├── branchSlice.js            # branch CRUD endpoints (§13.1)
    │       ├── reportSlice.js            # report list/create/details/update/archive/restore/delete/generate (§13.1)
    │       ├── audioSlice.js             # audio upload, re-transcription (§13.1; pipeline in Phase 20)
    │       ├── transcriptionSlice.js     # transcription list/update/AI correction (§13.1)
    │       ├── userSlice.js              # profile endpoints (§13.1)
    │       ├── aiConversationSlice.js    # assistant chat state: conversations list, activeConversationId, streaming parts (§21)
    │       └── analyticsSlice.js         # dashboard analytics endpoints (§13.1)
    ├── utils/
    │   ├── constants.js                  # API_CONFIG with VITE_API_BASE_URL; frozen constants (§10.5, §13.2)
    │   └── ethiopianDate.js              # ethiopianToGregorian/gregorianToEthiopian conversion; DD-MM-YY display (§14 1.6)
    ├── theme/                         # AppTheme.jsx, themePrimitives.js, customizations/* — exists in codebase; standards in `## Theme Standards` (§14)
    └── assets/                        # hero.png, notFound_404.svg, react.svg, vite.svg (codebase fact)
```

### 6. Final Structure Rules (Phase 25)

- §25.3 is fulfilled here: the complete final tree above was generated from the current `backend/*` and `client/*` codebases plus the §25.1/§25.2 explicit paths and this document (REQ-173).
- Backend file names are kebab-case, following the §25.1 explicit names (`env.js`, `oauth.service.js`, `notFound.middleware.js`): per-domain files follow `<domain>.controller.js`, `<domain>.routes.js`, `<domain>.validator.js`, and `<domain>.model.js` (REQ-176).
- Every file created during implementation must land in the subtree documented above; when later phases introduce new paths, those paths are added to this tree (REQ-173).

| ID | Requirement | Acceptance criteria | Source |
|---|---|---|---|
| REQ-173 | The complete future-state repository tree — repository root, backend, and client — is recorded in `## Project Directory Structure` §1, §4, and §5 per §25.3; every file created during implementation lands in the documented subtree, and new paths are added to the tree when phases introduce them. | The documented tree matches the implemented repository at the end of implementation; the tree contains no path absent from the codebase or the source brief. | §25.3 |
| REQ-174 | The explicit §25.1 backend paths exist and are used: `app.js`, `server.js`, `config/env.js`, `config/db.js`, `routes/index.js`, per-domain `routes/*.js` modules, per-domain `validators/*.js`, `utils/constants.js`, `utils/httpStatus.js`, `utils/logger.js`, `services/oauth.service.js`, `middleware/notFound.middleware.js`, `mock/*`, and `uploads/audio/`. | All listed paths exist in the implemented backend and serve their documented role. | §25.1 |
| REQ-175 | The explicit §25.2 frontend paths exist and are used: `client/src/main.jsx`, `App.jsx`, lazy-loaded `pages/*`, `components/layout/*`, `components/<domain>/*`, `utils/constants.js`, `redux/app/store.js`, `redux/features/api.js` and `<name>Slice.js` files, `components/reusable/*`, `components/columns/*`, and `theme/*`. | All listed paths exist in the implemented client and serve their documented role. | §25.2 |
| REQ-176 | Backend per-domain files follow the `<domain>.controller.js` / `<domain>.routes.js` / `<domain>.validator.js` / `<domain>.model.js` naming pattern with one controller file per domain (auth, branch, report, audio, transcription, ai, user, analytics); external integrations live in `services/*.service.js`; cross-cutting concerns live in `middleware/*.middleware.js`. | The implemented backend matches the §4 tree file for file. | §10.3, §25.1 |
| REQ-177 | The Google Docs export creates the document with the user's own Google OAuth token — the Google login flow extended with the `drive.file` scope — so the document lands in the user's own Google Drive, fully owned and editable by the user; no Google Service Account is used. | The exported document appears in the user's Google Drive and is owned, editable, shareable, and downloadable by them; no service-account credentials exist in the environment contract. | §22 (Phase 25 user decision) |

### 7. Expansion Markers

- Phase 12 (§12 Frontend Architecture): **DONE (Phase 12)** — frontend directory tree above.
- Phase 13 (§13 Redux, RTK Query, And API Client): **DONE (Phase 13)** — `redux/` subtree and `utils/constants.js` added above.
- Phase 14 (§14 MUI, MUI X, Theme, And Component Standards): **DONE (Phase 14)** — `components/reusable/`, `components/columns/`, and `utils/ethiopianDate.js` added above.
- Phase 25 (§25 Project Directory Structure): **DONE (Phase 25)** — final structure: backend tree §4, frontend tree §5, rules and requirements §6.
- Phase 30 (§30 Git Workflow): workflow structure.

---

## Rules

> **Phase 9 seed — the technical stack rules from §9. Rules deepened in Phases 13 (Redux), 16 (UI rules), 17 (environment config), 21 (AI prompts), and 26 (code quality); further rules arrive in Phases 29 (security) and 30 (git).**

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

### 3. Redux And RTK Query Rules (§13)

- All frontend HTTP calls go through `baseQueryWithReauth` in `client/src/redux/features/api.js`; raw `fetch`/axios calls are forbidden in the client (REQ-104).
- `baseQueryWithReauth` wraps `fetchBaseQuery`, which uses `baseUrl` = `VITE_API_BASE_URL` from `API_CONFIG` in `client/src/utils/constants.js` (§10.5, REQ-083) and `credentials: 'include'` (REQ-093).
- The API slice uses `createApi` + `injectEndpoints`: each feature slice injects its own endpoint set into the central API slice (REQ-103).
- Auth endpoints are excluded from the 401-refresh handling on public pages (REQ-106).
- Backend responses must be properly transformed into the shapes the UI consumes (REQ-106).

### 4. UI Rules (§16)

- All form submit buttons use `size="small"` (REQ-117).
- Form submit buttons never shrink on flex — `flexShrink: 0` (REQ-117).
- Action buttons always show icons at `vw < 600` and at `vw < 768 && landscape` (REQ-118).
- Text never overflows or overlaps at any width; all text ellipsizes after a certain character count; no horizontal scroll anywhere (REQ-119).

### 5. Environment Config Rules (§17)

- `.env` files are gitignored and never committed; no `.env.example` files are created; `.env` files exist locally with placeholder or correct values (REQ-120).
- New env vars follow the three-step process: add to the local `.env`, add the field to the config object in `config/env.js`, add validation/default logic in `config/env.js` (REQ-120).
- `process.env` is never accessed directly outside of `config/env.js`; client env vars are prefixed with `VITE_` and accessed via `import.meta.env.*` (REQ-083, REQ-120).
- The backend env contract in `## Environment Config` §2 (all required and optional vars, defaults, and minimums) must be met; the client env contract in §3 must be met (REQ-121, REQ-122).
- Addis AI `sk_` keys never appear in client code, Vite env vars sent to the browser, localStorage, Redux state, or client logs; Nvidia and Gemini keys live in `backend/.env` only (REQ-123).
- Backend constants live in the frozen `utils/constants.js` object — never hardcoded in request handlers (REQ-083, REQ-124).

### 6. AI Prompt Rules (Phase 21)

- The generation system prompt is the exact §21.1 text and the correction system prompt is the exact §21.2 text (REQ-146, REQ-147; `## AI Prompt Spec` §9).
- Generation parameters are temperature 0.2 / maxOutputTokens 2048 (frozen AI Generation group); correction parameters are temperature 0.15 / maxOutputTokens 2048 (frozen AI Correction group) — never hardcoded (REQ-124, REQ-127).
- Voice corrections flow correction audio → STT → correction text → the same correction prompt (REQ-148; `## AI Prompt Spec` §10); correction STT uses the approved chunking pipeline (`## Audio Recording STT` §8).
- Transcription correction fixes transcription errors (fills gaps, fixes misrecognized words); the corrected text is stored as `Transcription.latest` with a new `history[]` entry (`reviewer` = provider string) per `## Data Modeling` §4.3 (REQ-149; `## AI Prompt Spec` §11; the earlier `aiCorrectedText` field name is superseded — AD-011).
- The prompt enforces the 14 §21.5 Amharic generation rules (REQ-150..153; `## AI Prompt Spec` §12): rules 1–6 (Amharic default, exact section structure, sample tone, reviewed transcription as source of truth, no invention, blank for missing info), rules 7–10 (separate activities from unresolved issues, branch-specific details, time ranges per branch, supervisor point of view), rules 11–12 (no generation explanation, no unrelated content), rules 13–14 (corrections update only the relevant part; Amharic workplace transliteration).

### 7. Code Quality Rules (Phase 26)

- All code follows the §26 formatting rules: semicolons required, single quotes, trailing commas, 2-space indentation, 100-character width, LF line endings, UTF-8 encoding (REQ-178).
- Naming: camelCase variables and functions, PascalCase classes and components, kebab-case file names, UPPER_SNAKE_CASE constants and environment variables (REQ-179).
- Import order: built-in modules → npm packages → local modules, alphabetical within groups; named imports for utilities and functions, default import for React components, never `*` imports (REQ-180).
- No unused imports, no unused exports, no dead code; unused parameters carry the `_` prefix (`_req`, `_res`, `_next`) (REQ-181).
- Frontend components are functional components with hooks, props destructured in the function signature, event handlers prefixed with `handle` (REQ-182).
- Backend user IDs use the `req.user._id.toString()` pattern (REQ-183).
- No `console.log` in backend code — Winston replaces it in all environments (`## Logging`, REQ-086); `console.log` is allowed in frontend code.
- The frontend must pass `npx vite build` with 0 errors and must pass lint (`eslint .` with `client/eslint.config.js`); §26 mandates no backend lint — `backend/` has no ESLint config or lint script (REQ-184).
- JSDoc rules live in `## JSDoc Standards` (REQ-185/186).

### 8. Security Rules (§29)

- CORS is configured with the `CLIENT_ORIGIN` origin (default `http://localhost:3000`) and `credentials: true`; a wildcard origin is never used (REQ-203; `## Security` §3).
- The global security middleware stack runs in the fixed order `helmet -> cors -> compression -> cookie-parser -> mongo-sanitize -> rate-limit` and is never reordered or removed (REQ-081; `## Security` §5).
- Rate-limit overflow returns `429` with the §10.7 error envelope (REQ-204; `## Security` §4, `## Error Handling` §2).
- All inputs are validated with `express-validator`; validation failures return the `422` shape `{ success: false, message: 'Validation failed', data: { errors: [...] } }` (REQ-198; `## Security` §7).
- Production logs never include passwords, JWT token values, raw cookies, API keys or secrets, raw audio contents, full transcription texts, or full generated report texts (REQ-086; `## Security` §9).
- Graceful shutdown on SIGINT/SIGTERM force-exits after 30 seconds if the sequence hangs (REQ-205; `## Security` §12).

### 9. Expansion Markers

- Phase 13 (§13 Redux RTK Query): **DONE (Phase 13)** — Redux and RTK Query rules in §3 above.
- Phase 16 (§16 UI Rules): **DONE (Phase 16)** — UI rules in §4 above.
- Phase 17 (§17 Environment Config): **DONE (Phase 17)** — environment rules in §5 above.
- Phase 21 (§21 AI Prompt Requirements): **DONE (Phase 21)** — AI prompt rules in §6 above (REQ-146..153).
- Phase 26 (§26 Code Quality And Coding Conventions): **DONE (Phase 26)** — code quality rules in §7 above (REQ-178..186).
- Phase 29 (§29 Security): **DONE (Phase 29)** — security rules in §8 above (REQ-203..205).
- Phase 30 (§30 Git Workflow): git rules.

---

## Backend Architecture

> **Phase 10 seed — the backend architecture from §10 (Backend Architecture). Deeper backend implementation details arrived in Phase 24 (Data Model) and Phase 28 (error handling — `## Error Handling` §§1–2); the implementation-level architecture and the final file tree were finalized in Phase 25 (`## Project Directory Structure` §4).**

### 1. Routing (§10.1)

- All routes are mounted under the `/api/v1` prefix.
- Each route module is registered in `backend/routes/index.js`, which imports and mounts all route modules.
- No routes are registered directly in `app.js`.
- New route modules must be created in `backend/routes/`, imported, and mounted in `backend/routes/index.js` (REQ-080).

### 2. Middleware (§10.2)

- The error handling pipeline is required.
- The error pipeline (Phase 28): `error.middleware.js` is the terminal middleware distinguishing operational `CustomError` from unexpected errors; `notFound.middleware.js` creates `CustomError(404)` and forwards via `next()`; the full contract and the error status mapping live in `## Error Handling` §§1–2 (REQ-195..197, REQ-200).
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

- Phase 24 (§24 Data Model): **DONE — full schema definitions delivered in `## Data Modeling` §4 (Report, Audio, Transcription, User, Branch, ChatConversation).**
- Phase 25 (§25 Project Directory Structure): **DONE (Phase 25) — implementation-level backend architecture: complete file tree in `## Project Directory Structure` §4 (app, server, config, controllers, middleware, models, mock, routes, services, uploads, utils, validators, logs).**
- Phase 28 (§28 Error Handling): **DONE (Phase 28)** — global error handler detail in `## Error Handling` §§1–2 (REQ-195..200).

---

## Logging

> **Phase 10 seed — the logging rules from §10.9. The error-handling logging detail arrived in Phase 28 (§28 Error Handling Patterns, `## Error Handling` §§1–2).**

- All logging goes through `backend/utils/logger.js`.
- Winston is used on the backend only; Morgan is used in development mode only.
- No `console.log` in backend code — absolute ban; Winston replaces it in all environments (REQ-086).
- Log levels: error, warn, info, http, verbose, debug, silly. Development uses the debug level; production uses the info level.
- Module labels via Winston child loggers: Server, DB, Auth, AI-Addis, AI-Gemini, AI-Nvidia.
- Log files are written to the `logs/` directory (gitignored), rotated daily via the Winston daily-rotate-file transport, and auto-deleted after 30 days.
- Safe logging in production: logs must not include passwords, JWT token values, raw cookies, API keys or secrets, raw audio file contents, full transcription texts, or full generated report texts — use message IDs or truncated previews instead.
- AI provider logs: log provider, model, status code, and timing; do not log request or response bodies in production.
- Error-handling logging (Phase 28, `## Error Handling` §1): unexpected errors are logged by the global error handler with the stack trace and status code; in production the client gets a generic message and internals stay in the logs only (REQ-196). AI provider failures log provider, model, status code, and timing — never raw provider messages or response bodies; the client-facing 502 mapping lives in `## Error Handling` §2 (REQ-200). Safe-logging rules above apply to error logs too (REQ-086).

### Expansion Markers

- Phase 28 (§28 Error Handling Patterns): **DONE (Phase 28)** — error-handling logging detail in the bullets above (`## Error Handling` §§1–2, REQ-196, REQ-200).

---

## Mock Data Seeding

> **Phase 23 seed — the mock-data injection and wipe rules from §23. Field-level seed records arrive in Phase 24 (§24 Data Model); the implementation tasks are consolidated into the Tasks And Implementation Plan section in Phase 32.**

### 1. Purpose And Scope

- `backend/mock/*` provides development/demo-only mock data for the backend (REQ-160..164). It is internal tooling — not a product feature: no API endpoint, no UI, and no user-visible behavior depends on it.
- The source notes (§23) specify only the session-support contract; every rule below fills a missing implementation detail.
- Mock data is development/demo-only: the inject and wipe commands refuse to run when `NODE_ENV` is `production` (REQ-164; AD-009). No mock record is ever created or removed in a production database.
- Seeding never writes to `backend/uploads/audio/` and never invokes the AI providers (REQ-162; AD-009).

### 2. Session Contract

- The injection and the wipe each run inside a MongoDB session, mirroring the write-controller pattern of `## Backend Architecture` §3 (REQ-082):
  1. `mongoose.startSession()`
  2. `session.startTransaction()`
  3. write (inject) or delete (wipe)
  4. commit or abort on failure
  5. `session.endSession()` in `finally`
- Every model write and delete inside the inject/wipe passes `{ session }`; model hooks, instance methods, and static methods must support the session (REQ-082, `## Backend Architecture` §10).
- Each run is all-or-nothing: a failure aborts the transaction and leaves the database untouched.

### 3. Wipe Behavior

- The wipe deletes the mock records of every seeded collection (the `## Data Modeling` §1 inventory) inside one transaction.
- Injection is idempotent: it wipes existing mock records first, then inserts the seed set (REQ-163).

### 4. Seeded Entity Set

The seed set follows the `## Data Modeling` §1 inventory (Phase 24). Entity-level seed set; the exact records and field values are defined here (Phase 24, §24 Data Model):

| Entity | Seeded as | Source |
|---|---|---|
| User | A demo supervisor account; created through the model so the bcrypt `pre('save')` hook hashes the password | §11, §23, `## Data Modeling` §4.4 |
| Branch | Multiple branches under the demo supervisor's area | §5.1, §23, §4.5 |
| Report | Reports covering the `## Data Modeling` §6 statuses (`draft`, `audio_attached`, `transcribed`, `reviewed`, `completed`) | §5, §23, §4.1 |
| Audio | Metadata-only records (§5) | §23, ADR-037, §4.2 |
| Transcription | Reviewed/corrected transcriptions linked to the mock audio and reports (`raw` + `latest` + `history[]`) | §20, §23, §4.3 |
| ChatConversation | Conversation records associated with mock report generation (messages with `provider` + parts) | §2.1, §23, §4.6 |

### 5. Metadata-Only Audio Rule

- Mock Audio records exist as metadata-only records (ADR-037): they carry clip metadata (MIME, duration, original name) but no real audio files.
- Seeding does not populate `backend/uploads/audio/` and makes no STT call for mock audio; mock transcriptions are pre-created records (REQ-162).

### 6. Entry Points

- The inject and wipe logic lives under `backend/mock/*` (§25.1; `## Project Directory Structure` §4) as `backend/mock/seed.js` and `backend/mock/wipe.js`, wired as the npm scripts `mock:seed` and `mock:wipe` (names finalized in Phase 25), following the §10.3 directory conventions.
- No `mock/` or `seed/` directory and no seed npm script exist in `backend/` today — the modules are created during implementation (codebase fact).
- The npm scripts wrap the functions of §2–§3 and enforce the production guard of §1 (REQ-164).

### 7. Implementation Tasks (Phase 23 seed)

Task seeds for the Tasks And Implementation Plan section (Phase 32):

- T-MOCK-01 — Create the `backend/mock/*` inject module (session contract, wipe-before-inject).
- T-MOCK-02 — Create the `backend/mock/*` wipe module (transactional wipe across the seeded collections).
- T-MOCK-03 — Wire the seed set per `## Data Modeling` §6 (model-created User, metadata-only narrations).
- T-MOCK-04 — Add the npm scripts and the `NODE_ENV` production guard (REQ-164).

### 8. Expansion Markers

- Phase 24 (§24 Data Model): **DONE — the seeded entity set and its field-level definitions are delivered in §4 above (`## Data Modeling` §4).**
- Phase 32 (Tasks And Implementation Plan): the §7 tasks are consolidated into the section.
- Phase 35 (Archive, Delete, And Restore Lifecycle): the archive/delete/restore lifecycle rules may adjust the seeded report statuses.

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

- The frontend uses `credentials: 'include'` on all calls, including public pages (REQ-093; the cookie-aware client `baseQueryWithReauth` is specified in `## Redux RTK Query` §2).

### 8. Expansion Markers

- Phase 12 (§12 Frontend Architecture): **DONE (Phase 12)** — login/register page behavior, OAuth redirect handling, route guards.
- Phase 13 (§13 Redux, RTK Query, And API Client): **DONE (Phase 13)** — `baseQueryWithReauth`, cookie-aware client (`## Redux RTK Query` §2).
- Phase 17 (§17 Environment Variables): **DONE (Phase 17)** — `JWT_*` and `OAUTH_GOOGLE_*` env contract in `## Environment Config` §2.
- Phase 29 (§29 Security): **DONE (Phase 29)** — the deep security rules are consolidated in `## Security` (§§2/4/11, REQ-203..205).

---

## Security

> **Phase 11 seed — the authentication-adjacent security rules from §11. Environment secrets built in Phase 17; AI provider security in Phase 18; the user-OAuth token rule in Phase 25; the full security section from §29 (Security) built in Phase 29 — subsections mirror §29.1–29.12.**

### 1. Environment And Secrets (§29.1)

- `.env` files are gitignored and never committed; no `.env.example` files are created; `.env` files exist locally with placeholder or correct values (REQ-120; `## Environment Config` §1).
- All API keys live only in `backend/.env` (REQ-121, REQ-123; `## Environment Config` §§2/4).
- Every service call is proxied through the backend — no frontend-to-provider calls, no keys in frontend code (REQ-125; `## Addis AI` §3).
- No API keys in frontend code, Vite env vars sent to the browser, localStorage, Redux state, or client logs (REQ-123; `## Environment Config` §4).
- `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` live in `backend/.env` only and are each at least 32 characters (env contract in `## Environment Config` §2, REQ-121).
- `OAUTH_GOOGLE_CLIENT_ID`, `OAUTH_GOOGLE_CLIENT_SECRET`, and `OAUTH_GOOGLE_CALLBACK_URL` are optional and live in `backend/.env`; Google login stays stubbed until credentials are configured (echo of `## Auth Cookies` §5, REQ-121).
- The user's Google OAuth token — used for the Google Docs export with the `drive.file` scope — is stored and refreshed server-side only and must never be exposed to the client (REQ-158, REQ-177; `## Export Spec` §4).
- `process.env` is never accessed outside `config/env.js`, which validates all required vars at startup (REQ-083, REQ-120).
- Every Addis AI call authenticates with the `x-api-key` header; secret keys start with `sk_` (REQ-126, REQ-123; `## Addis AI` §3).
- Keys are never logged; provider request IDs and status codes are logged, never raw sensitive report content (REQ-129, `## Addis AI` §12).
- Realtime WebSocket URLs never carry real keys in the browser; a later realtime strategy must be backend-controlled (REQ-130, `## Addis AI` §11).

### 2. JWT Cookie Security (§29.2)

- Two-token system with httpOnly cookies: access token 15 min TTL, path `/`, signed with `JWT_ACCESS_SECRET`; refresh token 7 days TTL, path `/api/v1`, signed with `JWT_REFRESH_SECRET` (REQ-087, REQ-121; `## Auth Cookies` §1).
- Cookie options: `httpOnly: true`, `secure` in production, `sameSite: lax` (REQ-087).
- Tokens never exposed to JavaScript — httpOnly prevents XSS token theft (REQ-087).
- Refresh token rotated on each use to prevent replay (REQ-087).
- No sessions MongoDB collection — zero DB lookups for auth on each request (REQ-087).

### 3. CORS (§29.3)

- The backend enables CORS with the origin from the `CLIENT_ORIGIN` environment variable (default: `http://localhost:3000`) and `credentials: true` so the httpOnly cookies are sent; a wildcard origin is never used (REQ-203; env contract in `## Environment Config` §2).

### 4. Rate Limiting (§29.4)

| Limiter | Window | Max Requests | Applied To |
|---|---|---|---|
| Global | 15 minutes | 100 | All endpoints |
| Auth | 15 minutes | 20 | `/auth/register`, `/auth/login` |
| AI | 1 minute | 10 | Generation/correction endpoints |

- Three tiers: global 100/15min (all endpoints), auth 20/15min (register and login), AI 10/1min (generation and correction) (REQ-092).
- When a tier limit is exceeded the request returns `429` with the §10.7 error envelope (REQ-204; row in `## Error Handling` §2).

### 5. Middleware Stack (Fixed Order) (§29.5)

`helmet → cors → compression → cookie-parser → mongo-sanitize → rate-limit`

This order is intentional and must not be changed (REQ-081; `## Backend Architecture` §2):

1. `helmet` — security headers first.
2. `cors` — cross-origin before cookie parsing.
3. `compression` — compress responses with gzip.
4. `cookie-parser` — parse cookies before route handlers.
5. `mongo-sanitize` — strip `$` and `.` from request data before it reaches controllers.
6. `rate-limit` — global rate limiting before API routes.

### 6. NoSQL Injection Prevention (§29.6)

- `express-mongo-sanitize` strips `$` and `.` from `req.body`, `req.query`, and `req.params` globally — the mongo-sanitize step in the fixed stack (REQ-081).

### 7. Input Validation (§29.7)

- All inputs are validated with `express-validator` (per-domain validators in `backend/validators/*.js`, `## Project Directory Structure` §4).
- Validation failures return `422` with the response shape `{ success: false, message: 'Validation failed', data: { errors: [...] } }` — `data.errors` carries the per-field messages the frontend surfaces under each field (REQ-198; `## Error Handling` §1, `## API Contract` §3).

### 8. Audio Upload Validation (§29.8)

- Server-side validation: multer MIME type and file size checks plus ffprobe duration validation (REQ-142; `## Audio Recording STT` §6, `## API Contract` §6).

### 9. Safe Logging (§29.9)

- In production, logs never include: passwords, JWT token values, raw cookies, API keys or secrets, raw audio file contents, full transcription texts, or full generated report texts — message IDs or truncated previews are used instead (REQ-086; `## Logging`).

### 10. MongoDB Transactions (§29.10)

- All multi-document write operations use Mongoose sessions with transactions: `startSession → startTransaction → writes → commitTransaction → catch → abortTransaction → finally → endSession` (REQ-082; `## Backend Architecture` §3, REQ-160/161/165).

### 11. Password Handling (§29.11)

- Algorithm: `bcryptjs`; salt rounds: 12; plaintext passwords are never compared — always `User.comparePassword()` (REQ-089; `## Auth Cookies` §3).
- Password field excluded from JSON serialization: `select: false` on the schema plus the `toJSON` transform (REQ-167/170; `## Data Modeling` §4.4).

### 12. Graceful Shutdown (§29.12)

- On `SIGINT`/`SIGTERM`: `server.close()` → cleanup temporary audio files → `mongoose.connection.close()` → `process.exit(1)` (REQ-084; `## Backend Architecture` §8).
- Force exit after 30 seconds if the shutdown hangs (REQ-205).

### 13. Expansion Markers

- Phase 17 (§17 Environment Variables): **DONE (Phase 17)** — secret handling in §1 above.
- Phase 18 (§18 Addis AI Integration): **DONE — AI provider security in §1 above.**
- Phase 25 (§25 Project Directory Structure): **DONE (Phase 25)** — the user-OAuth token server-side-only rule in §1 (REQ-158, REQ-177).
- Phase 29 (§29 Security): **DONE (Phase 29)** — the full security section above: §§1–12 mirror §29.1–29.12 (REQ-203..205).

---

## Redux RTK Query

> **Phase 13 seed — Redux, RTK Query, and the API client from §13. Error-handling patterns on queries/mutations (the `onQueryStarted` `if (error)` pattern, per-field `error.data.data.errors`, toast notifications) built in Phase 28 (§5); endpoint set details arrive with their feature phases (15, 20, 21, 22).**

### 1. Redux Structure (§13.1)

- Libraries: `@reduxjs/toolkit` and `@reduxjs/toolkit/query/react` (installed; versions per `client/package.json` — source of truth, REQ-079).
- Store: `client/src/redux/app/store.js` — created with `configureStore`; the Redux store wraps `App.jsx` in `main.jsx`.
- API slice: `client/src/redux/features/api.js` — created with `createApi` + `fetchBaseQuery` + `baseQueryWithReauth`.
- Feature slice pattern: `client/src/redux/features/<name>Slice.js` — one file per domain; each feature slice injects its endpoints into the API slice via `injectEndpoints` (REQ-103).
- Feature slices (eight, REQ-103): `authSlice`, `branchSlice`, `reportSlice`, `audioSlice`, `transcriptionSlice`, `userSlice`, `aiConversationSlice`, `analyticsSlice`.
- `main.jsx` wrapper order (cross-aligned with `## Frontend Architecture` §1): `<Provider store={store}>` is the outermost wrapper; inside it, `LocalizationProvider` + `AdapterDayjs` wrap the router (REQ-103).

### 2. API Client — baseQueryWithReauth (§13.2)

- All frontend HTTP calls go through `baseQueryWithReauth` in `client/src/redux/features/api.js` — no direct `fetch`/axios calls on the client (REQ-104).
- `baseQueryWithReauth` calls `fetchBaseQuery`, configured with:
  - `baseUrl`: `VITE_API_BASE_URL` from `API_CONFIG` in `client/src/utils/constants.js` (§10.5, REQ-083).
  - `credentials: 'include'` (REQ-093).
- On 401 (`result.error && result.error.status === 401`), `baseQueryWithReauth` attempts `POST /api/v1/auth/refresh` via `baseQuery({ url }, api, extraOptions)` (REQ-105).
- On refresh success: retry the original request — `result = await baseQuery(args, api, extraOptions)`; the backend re-issues the access + refresh httpOnly cookies, so the retry runs authenticated (REQ-105).
- On refresh failure: clear everything (Redux auth state, localStorage), dispatch logout, and the user must be outside of protected routes — guards redirect to `/login` (REQ-105).
- Auth endpoints (register, login, me, refresh) are excluded from the 401-refresh handling on public pages — no refresh loop (REQ-106).
- Backend response transformation is required: success responses unwrap the §10.7 envelope (`{ success, message, data }`) via `transformResponse` into the shapes the UI consumes; errors surface through the envelope (`error.data.message`), with the §28 onQueryStarted error pattern (REQ-106).

### 3. Endpoint Set Inventory (seeds)

| Feature slice | Endpoint set (seeds) | Detail arrives in |
|---|---|---|
| authSlice | register, login, me, refresh (via `injectEndpoints`; `useLoginMutation`, `useRegisterMutation` used by Login/Register) | §12.6, §13.1 |
| branchSlice | Branch CRUD endpoints | Branch pages (Phase 12 §12.6; Phase 16) |
| reportSlice | Report list/create/details/update/archive/restore/delete/generate | §12.6; Phases 20/21/22 |
| audioSlice | Audio upload and re-transcription | Phase 20 |
| transcriptionSlice | Transcription list/update and AI correction | Phases 20/21 |
| userSlice | Profile endpoints | Phase 4; Profile page |
| aiConversationSlice | Assistant chat endpoints (`assistantApi.js` consumed by `chatAdapter.js`) | §12.6 (3.5.2); Phases 18/21 |
| analyticsSlice | Dashboard analytics endpoints | Phase 4; Phase 31 |

### 5. Frontend Error Handling (Phase 28, §28.3)

- Every mutation lifecycle uses the `onQueryStarted` `if (error)` guard (REQ-201): on success the message from the unwrapped envelope drives a success toast; on error, server-formatted validation errors display per field via `error.data.data.errors` and an error toast fires through `AppToastContainer` (react-toastify `^11.1.0`, `client/package.json`). Forms map 422 `data.errors` to field-level `setError` (`## React Hook Form Standards` §6–7).
- Error message extraction chain: `error.data?.message || error.data?.data?.errors?.[0]?.message || 'Something went wrong'` (REQ-201).
- `AppErrorBoundary` (react-error-boundary `^6.1.2`) is a class component that catches React render errors with a fallback UI; it wraps the router content in `App.jsx` (REQ-202; `## Frontend Architecture` §2).
- Render errors are handled by `AppErrorBoundary`; request/response errors by the `onQueryStarted` pattern. Full rules and samples in `## Error Handling` §3.

### 6. Expansion Markers

- Phase 15 (§15 React Hook Form Standards): **DONE (Phase 15)** — forms submit via RTK Query mutation hooks; `handleSubmit(onSubmit)` try/catch reads the mutation error; 422 → field-level `setError`; `isSubmitting` drives MuiButton `loading` (`## React Hook Form Standards` §6–7).
- Phase 20 (§20 Audio Recording And STT Pipeline): audio/transcription endpoint sets.
- Phase 21 (§21 AI Prompt Requirements): AI correction/generation endpoint sets.
- Phase 22 (§22 Export): export endpoint set.
- Phase 28 (§28 Error Handling Patterns): **DONE (Phase 28)** — `onQueryStarted` error pattern, per-field `error.data.data.errors`, toast notifications, and `AppErrorBoundary` in §5 above (`## Error Handling` §3, REQ-201, REQ-202).

---

## Frontend Architecture

> **Phase 12 seed — the frontend architecture from §12. Enriched by Phase 13 (Redux, RTK Query, and API client, §13) and Phase 14 (MUI, MUI X, theme, and component standards, §14).**

### 1. Routing Architecture (data mode)

- The frontend uses React Router **data mode**: `createBrowserRouter([...])` + `<RouterProvider router={router} />` — both live in `client/src/main.jsx` (§12.1).
- Routes are defined as a flat array in `main.jsx`; there is no separate `AppRoutes.jsx` component (only split out if the array grows unmanageably large) (§12.1).
- Route objects use `Component` — never `element` (§12.1).
- Every page is lazy-loaded per module: `React.lazy(() => import('./pages/X.jsx'))` (§12.1, §12.6).
- `main.jsx` wraps the router in `LocalizationProvider` + `AdapterDayjs` (MUI X date pickers) (§12.1); the Redux `<Provider store={store}>` is the outermost wrapper, above both (REQ-103; `## Redux RTK Query` §1).
- Route tree and guards: `## Routing Layout`.

### 2. App Root Layout (`client/src/App.jsx`)

`App.jsx` is the root layout — it never defines routes (§12.1). It composes, in order:

1. `AppTheme` (MUI theme provider — Phase 14)
2. `CssBaseline`
3. `AppErrorBoundary` (react-error-boundary)
4. `AppToastContainer` (react-toastify)
5. `<Outlet />`

### 3. Page Inventory

Pages are lazy-loaded, use tree-shaken imports, and set `displayName` (§12.6). All route paths are in `## Routing Layout`.

| Page | File | Confirmed route (§12) | Layout context |
|---|---|---|---|
| Landing | `pages/Landing.jsx` | index (PublicLayout) | PublicLayout |
| Login | `pages/Login.jsx` | `login` (PublicLayout) | PublicLayout |
| Register | `pages/Register.jsx` | `register` (PublicLayout) | PublicLayout |
| Dashboard | `pages/Dashboard.jsx` | `dashboard` (AppShell) | AppShell, no Page Header |
| Reports | `pages/Reports.jsx` | `reports` (AppShell) | AppShell + Page Header |
| ReportDetails | `pages/ReportDetails.jsx` | `reports/:id/details` (AppShell) | AppShell |
| Branches | `pages/Branches.jsx` | `branches` (AppShell) | AppShell + Page Header |
| BranchDetails | `pages/BranchDetails.jsx` | `branches/:id/details` (AppShell) | AppShell |
| Profile | `pages/Profile.jsx` | `profile` (AppShell) | AppShell + Page Header |
| Assistant | `pages/Assistant.jsx` | `assistant` (ProtectedRoute, AppShell sibling) | Full-screen ChatBox |
| NotFound | `pages/NotFound.jsx` | `*` (AppShell children) | AppShell |

Branch editing is a dialog under `client/src/components/branch/`; report editing happens in the Assistant chat (Reports list "Edit" and ReportDetails "Edit Report" open the Assistant for the report) — there are no report edit/correction pages and no legacy page names (BranchList, BranchForm, ReportList, ReportGrid, ReportCreate, ReportReview, ReportCorrection are gone; their functionality is re-expressed as domain components under `client/src/components/<domain>/`).

### 4. Layouts

- `PublicLayout` (`client/src/components/layout/PublicLayout.jsx`): public pages — Landing (index), Login, Register — fixed public MuiAppbar + scrollable content (`## UI/UX Spec` §5).
- `AppShell` (`client/src/components/layout/AppShell.jsx`): protected pages — Dashboard, Reports, ReportDetails, Branches, BranchDetails, Profile, and the NotFound catch-all — AppSidebar + content area (protected MuiAppbar → Page Header → `<Outlet />`).
- `AppSidebar` (`client/src/components/layout/AppSidebar.jsx`): navigation drawer (`## MUI Component Standards` §2).
- The Assistant page is the only protected page outside AppShell (full-screen ChatBox) (§12.6 3.5.2).

### 5. Auth Strategy

- Full page load: `GET /api/v1/auth/me` → populate Redux + localStorage; 401 → clear everything + redirect `/login` (§12.6 Dashboard).
- SPA navigation: ProtectedRoute reads Redux — zero API calls (§12.6 Dashboard).
- Transient 401s during SPA usage: `baseQueryWithReauth` refreshes (`POST /api/v1/auth/refresh`) and retries the original request; on refresh failure it clears everything + dispatches logout and the guards redirect to `/login` (§13.2; REQ-105; `## Redux RTK Query` §2).
- Guard components: `## Routing Layout` §3.

### 6. Data Flow Pattern (page-level)

- Forms: react-hook-form `useForm({ mode: 'onBlur' })`, `register` only (§12.6 Login/Register; Phase 15).
- Mutations and queries: RTK Query hooks from each feature slice's `injectEndpoints` (e.g. `useLoginMutation`, `useRegisterMutation` from `authSlice`) with `credentials: 'include'` (§12.6; `## Redux RTK Query` §1, §3).
- Error handling: 422 → `setError(field, ...)` per field; 401 → toast; success → `reset()` + navigate (Login: `location.state?.from?.pathname || '/dashboard'`; Register: `/dashboard`) (§12.6).
- Dashboard data: stat cards, `@mui/x-charts` BarChart/PieChart, Recent Activities MuiDataGrid (server-side pagination, no action column) — content/columns/endpoint TBD (§12.6).

### 7. Hooks (`client/src/hooks/`)

- `useAuth`: auth state convenience hook (§12.7).
- `useAudioRecorder`: MediaRecorder state/actions hook (§12.7; pipeline detail in Phase 20).

### 8. Expansion Markers

- Phase 13 (§13 Redux, RTK Query, And API Client): **DONE (Phase 13)** — store structure, slices, RTK Query API client (`## Redux RTK Query`).
- Phase 14 (§14 MUI, MUI X, Theme, And Component Standards): **DONE (Phase 14)** — theme (`## Theme Standards`) and reusable components (`## MUI Component Standards`).

---

## Routing Layout

> **Phase 12 — routing and route guards from §12.**

### 1. Route Definition Location

- React Router data mode in `client/src/main.jsx`; flat route array; `Component` not `element`; lazy per module (`## Frontend Architecture` §1) (§12.1).

### 2. Route Tree

Route tree per §12.5, extended with the confirmed §12.6 routes:

```
createBrowserRouter([
  { path: '/', Component: App, ErrorBoundary: AppErrorPage,
    children: [
      { Component: PublicRoute, children: [
        { Component: PublicLayout, children: [
          { index: true, Component: Landing },
          { path: 'login', Component: Login },
          { path: 'register', Component: Register },
        ]}
      ]},
      { Component: ProtectedRoute, children: [
        { Component: AppShell, children: [
          { path: 'dashboard', Component: Dashboard },
          { path: 'reports', Component: Reports },
          { path: 'reports/:id/details', Component: ReportDetails },
          { path: 'branches', Component: Branches },
          { path: 'branches/:id/details', Component: BranchDetails },
          { path: 'profile', Component: Profile },
          { path: '*', Component: NotFound },
        ]},
        { path: 'assistant', Component: Assistant },  // AppShell sibling — full-screen
      ]},
    ]
  }
])
```

- `assistant` is the only protected route that lives outside AppShell (full-screen chat) (§12.6 3.5.2).
- Reports card actions navigate: View → `/reports/:id/details`; Edit → opens the report in the Assistant chat (no `reports/:id/edit` route) (§12.6 Reports).
- Assistant deep link: `/assistant?conversation=<id>` — ChatBox selects that conversation and shows its history (§12.6 3.5.2).
- New protected routes are added as ProtectedRoute children; new public routes as PublicLayout children (§12.1).
- Landing is the index route inside PublicLayout's children (§12.6 Landing).
- NotFound is the catch-all inside AppShell's children (AppShell layout); logged-out users hitting an unknown URL are redirected to `/login` instead.

### 3. Route Guards

`ProtectedRoute` (§12.4):

- Shows a spinner while auth state is `initializing`.
- Calls `GET /api/v1/auth/me` on mount; on failure clears auth state and redirects.
- Redirects unauthenticated users with `<Navigate to="/login" state={{ from: location }}>`; Login navigates back to `state.from.pathname` after sign-in (§12.6 Login).

`PublicRoute` (§12.4):

- Inverse guard; redirects authenticated users to `/dashboard`.

### 4. Google OAuth Redirect (finalized)

- The frontend Google OAuth button redirects the browser to the backend OAuth start route, finalized as `GET /oauth/google` (`## Auth Cookies` §5) — the §12.6 browser URL `http://localhost:4000/api/v1/auth/google` is superseded; the flow is stubbed until Google credentials are configured (§11, §12.6; trace map row).

---

## MUI Component Standards

> **Phase 12 seed — component-level standards visible from §12. Enriched in Phase 14 with the §14 import/styling rules, the reusable-component contract and catalog, and MUI X usage; theme-level standards live in `## Theme Standards`.**

### 1. MuiAppbar

Two variants (§12.3):

- **Public:** fixed top bar across full width — logo, theme toggle, Login button, Sign Up button (PublicLayout) (§12.2 2.1).
- **Protected:** sits at the top-right of the content area (beside the sidebar, not across it) — right-aligned Search icon (opens GlobalSearchDialog), Theme toggle (LightMode/DarkMode), user avatar (dropdown: Profile + Logout). No title text; no hamburger (the hamburger lives in the sidebar header). Height 64px. Avatar sizes: 32px below 600px, 36px above 600px (§12.3).

Appbar logo navigates to `/dashboard` if authenticated, otherwise `/` (§12.3).

Reusable component detail (§14 1.1):

- **File:** `client/src/components/reusable/MuiAppbar.jsx`. Single reusable app bar configurable for both PublicLayout (full-width, top-level) and AppShell (inside the content area, beside the sidebar).
- **Props:** `position` — MUI AppBar position, default `"fixed"`; `elevation` — shadow depth, default `1`; `color` — MUI AppBar color prop, default `"inherit"`; `sx` — additional sx overrides. All standard MUI AppBar props pass through (pure wrapper, no custom API surface).
- **Left section:** logo icon + app name; click navigates to `/dashboard` if authenticated, `/` if not (§12.3).
- **Right section:** rendered conditionally based on auth state.
- **Auth detection:** reads auth state from Redux `authSlice` via `useSelector`.
- **Public layout behavior:** full width (`width: 100%`), `position="fixed"`; unauthenticated — theme toggle, Login button, Sign Up button; authenticated — theme toggle, Logout button (icon + tooltip).
- **Protected layout (AppShell) behavior:** sits inside the content area (not across the sidebar), `position="static"`, height `64px`, no title text; right section — Search icon (opens GlobalSearchDialog), theme toggle, user avatar (dropdown: Profile + Logout); avatar `32px` below 600px, `36px` at or above 600px (§12.3).
- **Excluded from MuiAppbar:** search dialog content (handled via GlobalSearchDialog), the user dropdown menu (rendered inline where used), the hamburger menu (handled by the AppSidebar header).
- **Setup:** tree-shaken import `import AppBar from '@mui/material/AppBar'`; `displayName` set to `"MuiAppbar"`.

### 2. AppSidebar (Drawer)

- Uses MUI `Drawer`; variant switches between `"temporary"` and `"permanent"` (§12.2 2.3).
- Header: menu icon + logo + app name "Report Builder"; the menu icon toggles full/mini mode on the permanent drawer (§12.3).
- Nav items (top, `flexGrow: 1`): Dashboard, Reports, Branches, Profile — each a MuiListItemButton with icon + label; the Assistant nav item (SmartToyIcon) is highlighted when on `/assistant` (§12.3, §12.6 3.5.2).
- Bottom: MuiDivider + Logout (MuiListItemButton). Logout dispatches `logout()` from RTK, clears cookies, navigates to `/login` (§12.3).
- Props: `open` (boolean), `onClose` (function), `sidebarMode` (`"full"` | `"mini"`), `onToggle` (function) (§12.2 2.3).
- Responsive modes (§12.3):
  - `xs` (<600px) and `sm` landscape (600–899px): temporary overlay drawer, 240px — opens via the header menu icon, closes on backdrop / nav select / Escape.
  - `md+` (≥900px) default: permanent docked drawer, 240px — full icon + text.
  - `md+` toggled: permanent mini drawer, 64px — icons only, MuiTooltip on hover; the header shows the menu icon only.

### 3. Nav Item Theming

- Default: `backgroundColor: transparent`, `color: text.secondary`.
- Hover: `backgroundColor: action.hover`, `borderRadius: 8px`.
- Selected: `backgroundColor: primary.main + 0.08`, `color: primary.main`, `fontWeight: 600`, `borderLeft: 3px solid primary.main`.
- Icon selected: `color: primary.main`; icon default: `color: action.active`.
- Logout hover: `backgroundColor: error.main + 0.08`, `color: error.main`.

### 4. Page Header (MuiPageHeader, §1.12)

- Left: title + subtitle; right: action buttons. Renders on one line (no wrapping) (§12.6).
- Pages: Reports has the Page Header "Reports" / "Manage daily supervision reports" with Filter + toggle + Create actions; Dashboard is the exception — no Page Header (§12.6).

Reusable component detail (§14 1.12):

- **File:** `client/src/components/reusable/MuiPageHeader.jsx`. Consistent page header for protected pages.
- **Props:** `title` (string, required), `subtitle` (string, optional — hidden on viewport widths below 600px in portrait), `children` (ReactNode, optional — action elements on the right).
- **Structure:** flex container, `justifyContent="space-between"`, `alignItems="center"`, `mb: 2`, bottom border `1px solid` divider.
- **Setup:** tree-shaken imports; `displayName` set to `"MuiPageHeader"`.

### 5. Dialogs

- **CreateReportDialog** (`client/src/components/report/CreateReportDialog.jsx`): MuiDialog `maxWidth="sm"` fullWidth; `disableEscapeKeyDown={true}`; `onClose` is a no-op (prevents close on backdrop click or Escape); closes only via the Cancel button or a successful submit; title "Create New Report" (§12.6 3.5.1).
- **Filter Dialog (Reports):** MuiDialog `maxWidth="sm"`; title "Filter Reports"; MuiDatePicker + MuiSelectField (single branch) with ClearIcon end adornments (clearing resets the field, decrements `activeFilterCount`, updates the badge immediately); Archived MuiSwitch; Cancel resets filters and badge → 0; Apply sets filter state and badge → 1–3; badge hidden when 0 (§12.6 Reports).
- **MuiConfirmDialog:** used for destructive/state-changing actions (Archive/Restore/Delete) (§12.6 Reports).
- **GlobalSearchDialog:** full-screen below 600px and below 768px landscape (no border radius, 100vh); centered on larger screens — 600–1200px: 80vh/600px, >1200px: 70vh/720px; closed by back arrow, Escape, or outside click; search input uses RHF `register('search')`, fires on Enter or click (no debounce); results grouped by entity type (Reports, Branches) in MuiAccordion sections; empty state "No results found" (§12.3).

Reusable component detail (§14 1.3, 1.9, 1.11):

- **MuiDialog** (`client/src/components/reusable/MuiDialog.jsx`) — structural wrapper that is always used instead of raw `@mui/material/Dialog`. Internal structure: `<Dialog>` (defaults + passthrough) → `<DialogTitle>` with bottom `borderBottom` divider (rendered only if `title` is provided) → `<DialogContent>` with `overflowY: auto` (the only scrollable section) → `<Divider />` (rendered only if `actions` is provided) → `<DialogActions>` (rendered only if `actions` is provided). `disableEnforceFocus` and `disableRestoreFocus` default to `true` (and are always supported). Responsive fullscreen via internal `useMediaQuery` checking `theme.breakpoints.down('sm')` OR `theme.breakpoints.down('md')` with landscape — when matched, `fullScreen={true}` (no border radius, 100vh); overridable by the caller passing an explicit `fullScreen` prop. Callers provide MuiButton components inside the `actions` slot (e.g. `<MuiButton variant="outlined">Cancel</MuiButton>`); GlobalSearchDialog (1.11) is the exception and does not use the actions slot. Tree-shaken imports (`Dialog`, `DialogTitle`, `DialogContent`, `DialogActions`, `Divider`); `displayName` set to `"MuiDialog"`.
- **MuiConfirmDialog** (`client/src/components/reusable/MuiConfirmDialog.jsx`) — preset confirmation dialog built on MuiDialog. Props: `open` (visibility), `onClose` (dismiss handler), `onConfirm` (confirm action handler), `title` (e.g. "Archive Report"), `message` (e.g. "Are you sure you want to archive this report?"), `confirmText` (MuiButton label, default `"Confirm"`), `cancelText` (default `"Cancel"`), `confirmColor` (MuiButton color, default `"primary"`, overridable to `"error"` for delete). Structure: MuiDialog with title, message in content, and Cancel + Confirm MuiButtons in actions. Used by the MuiDataGrid archive/restore/delete flow and other confirm/dismiss scenarios. `displayName` set to `"MuiConfirmDialog"`.
- **GlobalSearchDialog** (`client/src/components/reusable/GlobalSearchDialog.jsx`) — standalone; does not use MuiDialog's actions slot. `useForm({ mode: 'onSubmit' })` with `register('search')`; the search input is uncontrolled with no re-render on keystroke; start adornment `ArrowBackIcon` clears the field, resets results, and closes the dialog; fires on Enter or search icon click (no debounce) (§12.3). `displayName` set to `"GlobalSearchDialog"`.

### 6. Text And Overflow

- All text uses ellipsis on overflow; no horizontal scroll anywhere (§12.6 Landing).
- Hero headline: `h3` on md+, `h4` on xs (§12.6 Landing).

### 7. MUI Import And Styling Rules (§14.1)

- Tree-shaken MUI imports are required, e.g. `import TextField from '@mui/material/TextField'`.
- Never import from the `@mui/material` barrel.
- MUI Grid uses the `size` prop, not `item` — e.g. `<Grid size={{ xs: 12, md: 6 }}>`.
- Deprecated MUI props are banned; use the replacements:
  - `margin="normal"` → `sx={{ mb: 2 }}`
  - `InputProps` → `slotProps.input`
  - `Box component="form"` → native `<form>`
  - `Box component="img"` → native `<img>`
  - `Link component="button"` → `Link slots={{ root: 'button' }}`
- Use MUI `sx` and `styled()` for styling. Never use Tailwind. Never use inline `style`.
- `sx` uses theme-aware tokens: `color: 'text.secondary'`, `bgcolor: 'background.paper'`, `color: 'error.main'`.
- Never import from `themePrimitives.js` directly.
- For grey colors, use `theme.palette.grey[N]`.
- Never use `gray[50]`, `gray[800]`, or `brand[400]` directly.
- All `sx` color values must be mode-aware: `text.primary`, `background.default`, `grey.500`.

### 8. Reusable Component Contract (§14.2)

- Reusable MUI components live in `client/src/components/reusable/*`.
- Reusable MUI components are prefixed with `Mui` (plus `LoadingSpinner` and `GlobalSearchDialog`).
- Input reusable components use `forwardRef`; presentation wrappers do not need `forwardRef`.
- Set `displayName` on wrapped components.
- Default to `size="small"` where applicable, including TextField, Select, and Button.
- Pass through all standard MUI props — wrappers are pure wrappers with no custom API surface.
- Use `slotProps.input` for input adornments, never `InputProps`.
- Every input element must have a proper start adornment.
- Always use reusable components instead of raw `@mui/material/<component>` (§14.3).

### 9. Component Catalog (§14 1.1–1.13)

Each reusable component wraps the MUI equivalent with safe defaults, uses tree-shaken imports, and sets `displayName`. Details for MuiAppbar, MuiPageHeader, MuiDialog, MuiConfirmDialog, and GlobalSearchDialog are in §1, §4, and §5 above.

#### 9.1 MuiButton (§14 1.2)

- **File:** `client/src/components/reusable/MuiButton.jsx`. Pure wrapper around MUI Button — presentation wrapper, no `forwardRef` needed.
- **Defaults:** `size="small"`, `loadingIndicator={<CircularProgress size={20} />}`, `loadingPosition="center"`; uses MUI native `loading` prop (not a custom loading state).
- **Prop passthrough:** all standard MUI Button props (`variant`, `color`, `disabled`, `onClick`, `type`, `startIcon`, `endIcon`, `sx`, `fullWidth`, etc.). Variants: `contained` (default), `outlined`, `text`.
- **Form usage:** submit buttons use `type="submit"` + `size="small"` + `sx={{ flexShrink: 0 }}`; disabled via `isSubmitting` from RHF `formState`.
- **Icon rules:** icon-only buttons use raw `@mui/material/IconButton`, not MuiButton; buttons with icons use standard `startIcon`/`endIcon` props.

#### 9.2 MuiTextField (§14 1.4)

- **File:** `client/src/components/reusable/MuiTextField.jsx`. Single reusable text input wrapping MUI TextField; handles all text types including password (no separate MuiPasswordField); `forwardRef` for RHF `register` compatibility.
- **Defaults:** `size="small"`; `type` defaults to `"text"`; props `name`, `label`, `error` (bool), `helperText` (string); caller connects `error={!!errors.fieldName} helperText={errors.fieldName?.message}`.
- **Start adornment (mandatory):** every instance passes one via `slotProps.input.startAdornment` — never deprecated `InputProps`.
- **End adornment:** caller passes via `slotProps.input.endAdornment`.
- **Password type handling:** internal `useState` toggles between `"password"` and `"text"`; `Visibility`/`VisibilityOff` eye icon as end adornment; `onMouseDown` on the eye icon prevents focus loss; no layout shift on toggle; the caller's `slotProps.input.endAdornment` is merged after the eye icon.
- **Validation:** no zod — manual validation with a consistent error shape.

#### 9.3 MuiSelect (§14 1.5)

- **File:** `client/src/components/reusable/MuiSelect.jsx`. Reusable select input wrapping MUI Select; `forwardRef` for RHF `register` compatibility.
- **Defaults:** `size="small"`; `MenuProps={{ slotProps: { paper: { sx: { maxHeight: 300 } } } }}` for a consistent dropdown height; props `name`, `label`, `error`, `helperText`, `value`, `onChange`.
- **Start adornment (mandatory):** every instance passes one via `slotProps.input.startAdornment`.
- **Children (options):** the caller provides `<MenuItem>` children rendered directly inside `<Select>`.
- **Error display and validation:** as MuiTextField — `error`/`helperText` passed directly; no zod.

#### 9.4 MuiDatePicker (§14 1.6)

- **File:** `client/src/components/reusable/MuiDatePicker.jsx`. Responsive date picker for Ethiopian dates with English day/month names. Always community version.
- **Responsive switching (explicit, never auto):** md+ (≥900px) → `DesktopDatePicker` (popper mode); below md (<900px) → `MobileDatePicker` (dialog mode); selected via `theme.breakpoints.up('md')` with `useMediaQuery`; both imported tree-shaken from `@mui/x-date-pickers`.
- **Ethiopian calendar integration:** utility file `client/src/utils/ethiopianDate.js` with `ethiopianToGregorian(ethDate)` → JS Date and `gregorianToEthiopian(jsDate)` → `{ day, month, year }`; custom lightweight conversion, no external npm package; Ethiopian year offset ~7–8 years behind Gregorian; 13-month structure.
- **Display format:** input/display value DD-MM-YY numeric (e.g. `25-02-18`); day names English (Monday, Tuesday, ...); month names English mapped to the Ethiopian months (September…August + Pagume); achieved via a custom `format` prop and view format.
- **RHF integration (Controller required):** uses `Controller` because DatePicker uses a custom onChange (documented with a code comment); props `name`, `control`, `label`, `error`, `helperText`.
- **Community edition:** `@mui/x-date-pickers` community only — no Pro features; `LocalizationProvider` + `AdapterDayjs` already wrap the app in `main.jsx` (`## Frontend Architecture` §1).
- **Prop passthrough:** `minDate`, `maxDate`, `disabled`, `slotProps`, `sx`, etc.

#### 9.5 MuiPagination (§14 1.7)

- **File:** `client/src/components/reusable/MuiPagination.jsx`. Pure wrapper around MUI Pagination with safe defaults; used for list-view pagination only (not inside DataGrid).
- **Defaults:** `color="primary"`, `shape="rounded"`.
- **Props:** `count` — total pages (from the server response; `mongoose-paginate-v2` returns `totalPages` directly — no client-side calculation); `page` — current page; `onChange` — page change handler; all standard MUI Pagination props pass through.
- **Constants:** `PAGINATION_DEFAULT_PAGE=1`, `PAGINATION_DEFAULT_LIMIT=10`, `PAGINATION_MAX_LIMIT=100` (`client/src/utils/constants.js`).

#### 9.6 MuiDataGrid (§14 1.8)

- **File:** `client/src/components/reusable/MuiDataGrid.jsx`; package `@mui/x-data-grid` — community version only.
- **Columns:** defined per domain in `client/src/components/columns/*.js`; each file exports a `columns` array; the action column is the last column in every domain column set.
- **Action column:** View — `Visibility` icon, `sx={{ color: 'primary.main' }}`, tooltip "View", onClick navigates to `/${resource}/${id}` via `useNavigate`; Edit — `Edit` icon, `sx={{ color: 'warning.main' }}`, tooltip "Edit"; Archive/Delete — conditionally rendered: active items show `Archive` (`sx={{ color: 'text.secondary' }}`, tooltip "Archive"), archived items show `Delete` (`sx={{ color: 'error.main' }}`, tooltip "Delete"); IconButton uses `sx` for color, never the `color` prop; each action is an IconButton in a Tooltip inside a `Stack direction="row"`.
- **Archive/restore/delete flow:** Archive click → MuiConfirmDialog → confirm → dispatch archive → update UI; archived rows show restore + delete icons instead of archive; Restore click → MuiConfirmDialog → confirm → dispatch restore → update UI; Delete click → MuiConfirmDialog → confirm → dispatch permanent delete → update UI.
- **Export selection:** `checkboxSelection` enabled; `disableRowSelectionOnClick={true}`; export button in the toolbar for selected rows.
- **Toolbar:** `GridToolbar` from `@mui/x-data-grid` (columns toggle, filter, density, CSV export).
- **Server-side pagination:** `paginationMode="server"`; `rowCount` from the server's `totalDocs`; `onPaginationModelChange` handler; `pageSizeOptions={[10, 25, 50, 100]}`; defaults page=1, pageSize=10.
- **State coverage:** loading via the `loading` prop with skeleton `slotProps={{ loadingOverlay: { variant: 'skeleton' } }}`; empty via custom `slotProps={{ noRowsOverlay }}`.
- **Default:** `sx={{ height: 400 }}` (overridable).

#### 9.7 LoadingSpinner (§14 1.10)

- **File:** `client/src/components/reusable/LoadingSpinner.jsx`. Centered full-page or full-section loading indicator.
- **Structure:** outer `Box` with `display: flex`, `alignItems: center`, `justifyContent: center`, full available dimensions; `CircularProgress` centered; optional `message` rendered as muted `Typography` below the spinner.
- **Props:** `message` (optional), `size` (CircularProgress size, default `40`), `minHeight` (wrapper min-height, default `"100vh"` for full-page; overridable e.g. `"400px"` for section-level); all standard Box/CircularProgress props pass through.
- **Usage:** ProtectedRoute during `initializing`, page lazy-loading, section-level data fetch.

#### 9.8 MuiStatusBadge (§14 1.13)

- **File:** `client/src/components/reusable/MuiStatusBadge.jsx`. Color-coded, non-interactive status chip for `report.status` — read-only presentation; no click handling, no hover pointer; never renders inside a button.
- **Structure:** MUI `Chip`, `size="small"`, `label={status}`, cursor stays default.
- **Props:** `status` (string, required — one of `draft` | `audio_attached` | `transcribed` | `reviewed` | `completed`).
- **Color mapping:** `draft` → default; `audio_attached` → warning; `transcribed` → info; `reviewed` → primary; `completed` → success.
- **Usage:** Report Details header (§12.6 3.6).
- **Reconciliation note:** these five status names are the Phase 24 report status enum (`## Status Machine` §3 mapping; `## Data Modeling` §4.1; AD-011, REQ-168); Phase 35 (§35 Archive, Delete, And Restore Lifecycle) owns the archive/delete/restore lifecycle rules and their naming.

### 10. MUI X Usage (§14.5)

- All MUI X components — charts, date picker, data grid, and any other MUI X component — are community version only; no Pro or Premium features.
- MUI X Chat references: `https://mui.com/x/react-chat/` and `https://mui.com/x/react-chat/backend/adapters/`.
- Manifest (codebase fact): `@mui/x-charts` `^9.9.0`, `@mui/x-data-grid` `^9.9.0`, `@mui/x-date-pickers` `^9.9.0`, `@mui/x-chat` `^9.0.0-alpha.15`.

### 11. Expansion Markers

- Phase 14 (§14 MUI, MUI X, Theme, And Component Standards): **DONE (Phase 14)** — import/styling rules (§7), reusable-component contract (§8), component catalog (§9), and MUI X usage (§10) above; theme-level standards in `## Theme Standards`.
- Phase 15 (§15 React Hook Form Standards): **DONE (Phase 15)** — `register` on the forwardRef inputs (MuiTextField/MuiSelect), `Controller` only for MuiDatePicker/TimePicker with an explanatory comment (§15; `## React Hook Form Standards` §3).
- Phase 16 (§16 UI Rules): **DONE (Phase 16)** — general UI rules (submit-button size/flexShrink, icons on small screens, ellipsis; `## UI/UX Spec` §12, `## Rules` §4).

---

## Theme Standards

> **Phase 14 seed — the theme rules from §14, verified against the existing `client/src/theme/` codebase.**

### 1. Theme Configuration (§14.4)

- All theme configuration lives in `client/src/theme/`.
- Theme overrides are never inlined in page components.
- Component overrides are added via new files in `customizations/` — never by editing `AppTheme.jsx` directly.
- `AppTheme.jsx` composes the full MUI theme with `createTheme`, `cssVariables`, color schemes, and all customizations.
- Theme customization files use `@module`, not `@file`; `AppTheme.jsx` also uses `@module`.
- The eight customization files: inputs, dataDisplay, feedback, navigation, surfaces, dataGrid, datePickers, charts.

### 2. Theme Tokens (codebase facts, §14.1 cross-aligned)

- `themePrimitives.js` exports the raw palettes and tokens — `brand`, `gray`, `green`, `orange`, `red`, `colorSchemes`, `typography`, `shape`, `shadows`, `layoutConfig` (codebase fact). It is never imported directly by components (§14.1).
- Grey colors use `theme.palette.grey[N]`; never `gray[50]`, `gray[800]`, or `brand[400]` directly (§14.1).
- All `sx` color values are mode-aware — `text.primary`, `background.default`, `grey.500`, `text.secondary`, `background.paper`, `error.main` (§14.1).
- `AppTheme.jsx` (codebase fact): `createTheme` with `cssVariables: { colorSchemeSelector: 'data-mui-color-scheme', cssVarPrefix: 'template' }`; `colorSchemes`, `typography`, `shadows`, `shape` from `themePrimitives.js`; the eight customization groups spread into `components`; `ThemeProvider` with `disableTransitionOnChange` wraps the app in `main.jsx` (`## Frontend Architecture` §1).
- `customizations/index.js` re-exports the eight customization groups (codebase fact).

### 3. Expansion Markers

- Phase 16 (§16 UI Rules): **DONE (Phase 16)** — styling rules (MUI sx/styled only).
- Phase 36 (Final Consolidation): final theme review.

---

## React Hook Form Standards

> **Phase 15 seed — the React Hook Form standards from §15. `react-hook-form` `^7.81.0` is installed (`client/package.json`, source of truth — REQ-079); no forms exist in `client/src` yet, so these rules define the contract every future form follows. Error-handling patterns on form submissions built in Phase 28 (`## Error Handling` §3); general UI rules built in Phase 16.**

### 1. Form Setup (§15 1–2)

- Every form uses `react-hook-form` with `register` by default.
- Every form initializes with `const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' })` — validation runs on blur.
- GlobalSearchDialog is the explicit exception: `useForm({ mode: 'onSubmit' })` with an uncontrolled `register('search')` input, firing on Enter or search icon click with no debounce (`## MUI Component Standards` §5, REQ-099). The default `onBlur` mode applies to all data-entry forms.
- Login and Register already follow this setup (`## UI/UX Spec` §7–8).

### 2. Values And Cross-Field Validation (§15 3, 5)

- `watch` is never used. Cross-field validation reads other fields with `getValues` inside validate functions.
- Cross-field example (confirm password, Register `## UI/UX Spec` §8): `validate: (value) => value === getValues('password') || 'Passwords must match'`.

### 3. register Vs Controller (§15 4, 13)

- `register` is the default integration and works on every MUI input because the reusable Mui inputs are `forwardRef` (`## MUI Component Standards` §8, REQ-108).
- `Controller` is used only when `register` cannot work: the MUI X DatePicker and TimePicker deliver custom onChange values instead of native events. The only planned `Controller` use is MuiDatePicker (REQ-110).
- Every `Controller` use documents why with a code comment.
- Reusable Mui input components always use `forwardRef` (REQ-113).

### 4. Validation Error Display (§15 6–7)

- `formState.errors` is the single source for validation error display.
- Wrapped MUI components receive `error={!!errors.<name>}` and `helperText={errors.<name>?.message}`.
- Validation messages are English (§7; `## UI/UX Spec` §1).

### 5. No Debounce (§15 8)

- Input is never debounced; `useDebounce` is never used. Direct register integration only.
- Search fires on Enter or click (GlobalSearchDialog, REQ-099) — no debounce.

### 6. Backend Validation (§15 9)

- Backend validation errors surface under their field via `setError`:
  `setError('fieldName', { message: error.data?.data?.errors?.[0]?.message })`.
- 422 → field-level `setError`; other statuses → toast (e.g. Login 401 → toast "Invalid email or password", `## UI/UX Spec` §7).

### 7. Submission And Loading (§15 10–11)

- Submission: `handleSubmit(onSubmit)` with try/catch; `reset()` runs only after success — a failed submission never loses the user's input.
- Forms submit through RTK Query mutation hooks (e.g. `useLoginMutation`, `useRegisterMutation`); the onSubmit try/catch reads the mutation error; 422 → `setError` field-level (`## Redux RTK Query` §3).
- Loading: `isSubmitting` from `formState` disables the submit button and shows the spinner — MuiButton native `loading` with `loadingPosition="center"` (`## MUI Component Standards` §9.1); submit buttons are `size="small"` with `flexShrink: 0` (`## UI/UX Spec` §7).

### 8. Schema Validation (§15 12)

- Schema validation uses a manual resolver with a consistent error shape; zod is never used.

### 9. Expansion Markers

- Phase 16 (§16 UI Rules): **DONE (Phase 16)** — general UI rules; submit buttons are `size="small"` with `flexShrink: 0` (see §7).
- Phase 28 (§28 Error Handling Patterns): **DONE (Phase 28)** — form error patterns and `onQueryStarted` error handling in `## Redux RTK Query` §5 (`## Error Handling` §3, REQ-201).

---

## Environment Config

> **Phase 17 seed — the environment-variable and backend-constants rules from §17 (Environment Variables), verified against the local `.env` files. The `backend/config/env.js` env gate (REQ-083) and the `backend/utils/constants.js` frozen constants contract (§10.5) are specified here; neither file exists yet (codebase fact) and both are created during implementation (Phase 25).**

### 1. Environment File Rules (§17.1)

- `.env` files are gitignored and never committed — the root `.gitignore` first line is `.env` (codebase fact) (REQ-120).
- `.env` files exist locally with placeholder or correct values; this spec records key names, defaults, and rules only — actual secret values are never written here (REQ-120).
- No `.env.example` files — none exist and none are created (REQ-120).
- New env vars are added in three steps: (1) add to the local `.env`, (2) add the field to the config object in `config/env.js`, (3) add validation/default logic in `config/env.js` (REQ-120).
- `process.env` is never accessed directly outside of `config/env.js` — all config reads go through the validated `env` object (REQ-083, REQ-120).
- Client env vars must be prefixed with `VITE_` and are accessed via `import.meta.env.*` (REQ-120, REQ-122).
- `dotenv` `^17.4.2` is installed in `backend/package.json` (REQ-079); the client loads env vars through Vite — no dotenv in `client/package.json` (codebase fact).

### 2. Backend Environment Variables (§17.2)

| Variable | Required | Default | Description |
|---|---|---|---|
| NODE_ENV | Yes | development | Environment mode |
| PORT | Yes | 4000 | Server port |
| CLIENT_ORIGIN | Yes | http://localhost:3000 | CORS allowed origin |
| MONGODB_URI | Yes | — | MongoDB connection string (database: report-builder-v2) |
| JWT_ACCESS_SECRET | Yes | — | Access token signing secret (min 32 chars) |
| JWT_REFRESH_SECRET | Yes | — | Refresh token signing secret (min 32 chars) |
| JWT_ACCESS_EXPIRES_IN | Yes | 15m | Access token TTL (echo of `## Auth Cookies` §2) |
| JWT_REFRESH_EXPIRES_IN | Yes | 7d | Refresh token TTL (echo of `## Auth Cookies` §2) |
| ADDIS_AI_BASE_URL | Yes | https://api.addisassistant.com | Addis AI API base URL |
| ADDIS_AI_API_KEY | Yes | sk_... (placeholder) | Addis AI secret key — backend only (§4 below) |
| ADDIS_AI_TEXT_MODEL | Yes | Addis-፩-አሌፍ | Text generation model |
| ADDIS_AI_STT_MODEL | Yes | default | Speech-to-text model |
| ADDIS_AI_DEFAULT_TARGET_LANGUAGE | Yes | am | Default target language code |
| ADDIS_AI_STT_LANGUAGE_CODE | Yes | am | STT language code |
| ADDIS_AI_TIMEOUT_MS | Yes | 360000 | Addis AI request timeout (ms) |
| LOG_LEVEL | Yes | debug (dev) / info (prod) | Winston log level (echo of `## Logging` §3) |
| NVIDIA_API_KEY | Yes | — | Nvidia API key — backend only (§4 below) |
| GEMINI_API_KEY | Yes | — | Gemini API key — backend only (§4 below) |
| NVIDIA_API_BASE_URL | Yes | — | Nvidia NIM API base URL |
| GEMINI_API_BASE_URL | Yes | — | Gemini API base URL |
| FFMPEG_PATH | Yes | ffmpeg (system) | Custom ffmpeg binary path |
| FFPROBE_PATH | Yes | ffprobe (system) | Custom ffprobe binary path |
| OAUTH_GOOGLE_CLIENT_ID | No | — | Google OAuth client ID |
| OAUTH_GOOGLE_CLIENT_SECRET | No | — | Google OAuth client secret |
| OAUTH_GOOGLE_CALLBACK_URL | No | — | Google OAuth callback URL |

- The Google Docs export reuses the optional `OAUTH_GOOGLE_*` keys — the document is created with the user's own Google OAuth token (the login flow extended with the `drive.file` scope), so no service-account credentials are needed (Phase 25 user decision, REQ-177).
- Codebase fact: `backend/.env` exists with placeholder or correct values for every required key except `LOG_LEVEL`, which is absent and must be added during implementation; the optional `OAUTH_GOOGLE_*` keys are present (REQ-121).

### 3. Client Environment Variables (§17.3)

| Variable | Required | Default | Description |
|---|---|---|---|
| VITE_API_BASE_URL | Yes | http://localhost:4000/api/v1 | Backend API base URL — consumed via `API_CONFIG` (see `## Redux RTK Query` §2, REQ-104) |
| VITE_APP_NAME | Yes | Report Builder V2 | Application display name |

- Client env vars are read via `import.meta.env.*` only (REQ-122).
- Codebase fact: `client/.env` exists with both keys (REQ-122).

### 4. AI Key Rules (§17.4)

- Addis AI API keys starting with `sk_` must never appear in client code (REQ-123).
- Addis AI API keys must never appear in Vite env vars sent to the browser (REQ-123).
- Addis AI API keys must never appear in localStorage (REQ-123).
- Addis AI API keys must never appear in Redux state (REQ-123).
- Addis AI API keys must never appear in client logs (REQ-123).
- Nvidia and Gemini API keys are placed in `backend/.env` only (REQ-123).
- AI API keys are never written into this spec or any committed file — only key names and rules are recorded (REQ-123).

### 5. Backend Constants (§17.5)

- All backend constants live in a single `Object.freeze()`-frozen object exported from `backend/utils/constants.js`; nothing is hardcoded in request handlers (REQ-083, REQ-124).
- `backend/config/env.js` reads `process.env` into a frozen, validated `env` object; `utils/constants.js` is imported by controllers and services (echo of `## Backend Architecture` §5).

| Group | Constant | Value | Description |
|---|---|---|---|
| Audio | AUDIO_MAX_DURATION_SEC | 900 | Max audio upload duration in seconds (echo of `## Audio Recording STT` §3) |
| Audio | AUDIO_MAX_SIZE_BYTES | 52428800 | Max audio upload size — 50 MB (echo of `## Audio Recording STT` §3) |
| Audio | AUDIO_ALLOWED_MIME_TYPES | [audio/mpeg, audio/wav, audio/mp4, audio/webm] | Allowed audio MIME types (echo of `## Audio Recording STT` §3) |
| Pagination | PAGINATION_DEFAULT_PAGE | 1 | Default page (echo of `## Backend Architecture` §4, REQ-053) |
| Pagination | PAGINATION_DEFAULT_LIMIT | 10 | Default page size (echo of `## Backend Architecture` §4, REQ-053) |
| Pagination | PAGINATION_MAX_LIMIT | 100 | Maximum page size (echo of `## Backend Architecture` §4, REQ-053) |
| STT | ADDIS_AI_STT_MAX_DURATION_SEC | 60 | STT chunk duration cap (echo of `## Audio Recording STT` §3) |
| Auth | BCRYPT_SALT_ROUNDS | 12 | Password hashing salt rounds (echo of `## Auth Cookies` §3) |
| AI Generation | AI_TEMPERATURE | 0.2 | Report generation temperature |
| AI Generation | AI_MAX_OUTPUT_TOKENS | 2048 | Report generation max output tokens |
| AI Generation | AI_TOP_P | 0.9 | Nucleus sampling threshold |
| AI Generation | AI_TOP_K | 40 | Top-k sampling |
| AI Correction | AI_CORRECTION_MAX_OUTPUT_TOKENS | 2048 | Report correction max output tokens |
| AI Correction | AI_CORRECTION_TEMPERATURE | 0.15 | Report correction temperature |

- Codebase fact: `backend/config/env.js` and `backend/utils/constants.js` do not exist yet — `backend/` currently holds only `.env` and `package.json`; both files are created during implementation (Phase 25) (REQ-083, REQ-124).

### 6. Expansion Markers

- Phase 18 (§18 Addis AI Integration): **DONE — `ADDIS_AI_*` consumption is documented in `## Addis AI` §2 (base URL), §3 (key), §4 (models), §5 (language codes), §6–7 (endpoints), and §13 (implementation).**
- Phase 19 (§19 Other AI Providers): **DONE — Nvidia and Gemini keys and base URLs are consumed per `## Other AI Providers` §4–5; `backend/.env` holds real keys and `change me` base-URL placeholders.**
- Phase 29 (§29 Security): **DONE (Phase 29)** — the deep environment-secret handling rules are consolidated in `## Security` §1 (REQ-203..205).

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

#### AD-009 — Mock data seeding strategy

- **Date:** 2026-08-02. **Status:** Accepted.
- **Context:** §23 requires the `backend/mock/*` data injection and wipe to support MongoDB sessions and specifies nothing else; the source ADR-037 names the strategy "metadata-only audio clips".
- **Decision:** Mock data lives under `backend/mock/*`. Injection and wipe each run inside a MongoDB session with the write-controller transaction pattern (REQ-082, REQ-160..161). Mock narrations are metadata-only records — clip metadata without audio files, no STT calls, mock transcriptions pre-created (REQ-162). Mock data is development/demo-only: the commands refuse to run when `NODE_ENV` is `production` (REQ-164). No API endpoints or UI expose mock data.
- **Rationale:** The session rule is explicit in the source; the metadata-only clip strategy comes from the source ADR title; the production guard keeps demo tooling away from real data.
- **Consequences:** Seeded narrations have no playable audio and seeding never touches `backend/uploads/audio/` or the AI providers; exact seed records arrive in Phase 24.
- **Source:** §23, §33 (ADR-037).

#### AD-010 — Unified ReportVersion (inline generated + generatedHistory)

- **Date:** 2026-08-02. **Status:** Accepted (user decision, Phase 24).
- **Context:** §5.4 requires the system to manage "generated reports" and "report version history"; the Phase 5 seeds treated them as separate entities (GeneratedReport, ReportVersion); §24.4 defines a single `Report` model with `generated` and `generatedHistory[]` fields.
- **Decision:** The unified ReportVersion lives inline on the `Report` model: `generated` holds the latest AI output and `generatedHistory[]` preserves every generation (`{ provider, text, generatedAt }`, appended on regeneration). There are no separate `GeneratedReport` or `ReportVersion` collections.
- **Rationale:** Matches the §24.4 schema exactly (single model, no version-entity split); avoids redundant documents and joins; the user approved this reading in Phase 24.
- **Consequences:** Report generation writes `generated` and appends to `generatedHistory`; the Record Types Inventory, Mock Data Seeding entity set, and Glossary now reference the inline fields.
- **Source:** §24.4, §5.4 (REQ-057, REQ-171).

#### AD-011 — Phase 24 reconciliations (status names, aiCorrectedText, provider, derived analytics)

- **Date:** 2026-08-02. **Status:** Accepted (user decision, Phase 24).
- **Context:** §24 defines the authoritative data model, and four earlier-phase facts need reconciliation: the Phase 20 upload status `audio_recorded` vs the §24.4 enum `audio_attached`; the `aiCorrectedText` field vs the §24.6 `latest` + `history[]` review modes; the missing provider field on chat messages (REQ-133); and the Phase 5 "Analytics" entity vs the §24 model set.
- **Decision:** (1) The upload status is `audio_attached` everywhere (Status Machine mapping, API Contract, Audio STT §9, Transcription Review §2, REQ-145); archive/delete/restore naming remains Phase 35. (2) `aiCorrectedText` is superseded — AI transcription corrections write `Transcription.latest` with a `history[]` entry whose `reviewer` is the provider string (REQ-149). (3) `ChatConversation.messages[]` gains `provider` (`addis | gemini | nvidia`) — user-approved extension satisfying REQ-133. (4) Reporting analytics are derived on demand via aggregation over Report documents — no analytics collection; the metric set stays Phase 31 (AD-007).
- **Rationale:** §24 is the authoritative schema; keeping one status vocabulary, one correction storage, and one message shape avoids divergent models; derived analytics keep the model set minimal per §24.
- **Consequences:** All spec sections now use `audio_attached`; transcription corrections store `latest` + `history`; assistant messages record the provider; no Analytics collection is created in Phase 25.
- **Source:** §24.4, §24.6, §24.9, §20.5, §21.4, §19 (REQ-133, REQ-145, REQ-149, REQ-168, REQ-172).

#### AD-012 — Google Docs export lands in the user's own Drive (user OAuth token)

- **Date:** 2026-08-02. **Status:** Accepted (user decision, Phase 25).
- **Context:** §22 specified the Google Docs export via a Google Service Account with "Anyone with link can view" sharing. The user wants the report "available on my google drive so that I can do whatever I want to do with it" — a service account cannot place files in a user's Drive.
- **Decision:** The Google Docs export creates the document with the **user's own Google OAuth token** — the Google login flow extended with the `drive.file` scope — so the document lands in the user's own Google Drive, fully owned and editable by the user; no sharing-permission step; no Google Service Account is used (`GOOGLE_SERVICE_ACCOUNT_EMAIL`/`GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` are removed from the environment contract, REQ-177).
- **Rationale:** Only a user-OAuth flow can create documents the user owns in their own Drive; the `drive.file` scope grants access only to files the app creates or opens, keeping the app's Drive footprint minimal.
- **Consequences:** `## Export Spec` §4, `## API Contract` §7, `## Work Flow` §5, `## Environment Config` §2, `## Security`, and `## Glossary` now reflect the user-OAuth mechanism; the export path is finalized as `POST /api/v1/reports/:reportId/export` with `exportReport` in `report.controller.js` and document creation in `services/googleDocs.service.js`; the user's token is stored and refreshed server-side only (REQ-158, REQ-177).
- **Source:** §22 (Phase 25 user decision).

#### AD-013 — AI provider integrations in separate services files

- **Date:** 2026-08-02. **Status:** Accepted (user decision, Phase 25).
- **Context:** §10.3 requires one controller file per domain; §18.14 and §19 require backend-only provider calls via native `fetch` (Addis) and axios (Gemini/Nvidia). Phase 25 asked where provider logic lives.
- **Decision:** Each external integration lives in its own file under `backend/services/` — `addis.service.js`, `gemini.service.js`, `nvidia.service.js`, `googleDocs.service.js`, plus `oauth.service.js` — with controllers kept thin; cross-cutting HTTP concerns live in `backend/middleware/*.middleware.js` (REQ-176).
- **Rationale:** Keeps controllers small, isolates provider-specific request/response shapes and retries in one place per provider, and matches the explicit §25.1 `services/oauth.service.js` path.
- **Consequences:** The `## Project Directory Structure` §4 tree carries the five `services/*.service.js` files; `## Architecture` §5 and `## Coding Conventions` §6 document the services layer.
- **Source:** §25.1, §10.3, §18.14, §19 (Phase 25 user decision).

### Decision Log open items

- Measurable success KPIs (OQ-001) — decision pending user input.
- Branch count semantics (OQ-002) — pending user input.
- Boss access model (OQ-003) — pending user input.
- Reporting-analytics detail scope (OQ-004, AD-007) — resolved in Phase 4: AD-007 stands; the metric set is defined in Phase 31.
- Narration merge pipeline behavior (OQ-005, AD-008) — re-confirmed in Phases 20/21.
- Checklist tool existence (OQ-006) — resolved in Phase 4: no checklist tool in V2; "follow a checklist" is a reportable activity only.
- Clarifying-question behavior (OQ-007) — resolved in Phase 3: the app processes narrations as-is; no clarifying-Q&A step; re-confirmed in Phases 20/21.

---

## End Of Phase 1 Content

Phases 1–1 are GREEN (2026-08-01). Phase 1 built the project identity from §1: new `## Project Overview` (Report Builder V2 identity, V2 terminology normalization, the MERN-style JavaScript-only web product, primary user — Area Supervisor of a 14+ branch restaurant company in Addis Ababa — core objective, vision statement, out-of-scope list), new `## Problem Statement` (seed), new `## Glossary` (seed), new `## PRD` (seed — core objective, success outcomes, product principles, out-of-scope), new `## Requirements` (REQ-001..014 — the web-only, core-objective, and out-of-scope requirement sets), new `## Decision Log` (ADR format and AD-001..008), and the codebase facts (README `# Report Builder V2`; no root package.json — separate `backend/` and `client/` packages with authoritative version tables), and added the Phase 1 Source Trace Map. Phase 2 built the problem statement, PRD, requirements, and user stories.

## End Of Phase 2 Content

Phases 1–2 are GREEN (2026-08-01). Phase 2 built the problem statement from §2: enriched `## Problem Statement` (supervisor role and responsibilities, the manual reporting burden with Microsoft Word, the eleven per-branch supervision activities, the seven main pain points, consequences, the narration → accurate Amharic transcription → structured report need), enriched `## PRD` (success outcomes, centralized management, exports), added REQ-015..035, new `## User Stories` (US-001..010), and added the Phase 2 Source Trace Map. Phase 3 built the work flow, user interactions, and report domain.

## End Of Phase 3 Content

Phases 1–3 are GREEN (2026-08-01). Phase 3 built the interaction model from §3: new `## Report Domain` (Person 1/Person 2 mapping — user/supervisor and Addis AI — the fourteen mentionable content elements, the twelve AI responsibilities, DR-1/2/6), new `## Work Flow` (W-02..W-10, WF-1/3 — narration, transcription as raw material, review, AI processing and report generation, the correction loop), new `## User Interactions` (UI-001..007), enriched `## PRD` (supporting features), added REQ-036..038, extended `## Glossary` (Person 1, Person 2, raw material, final output), and added the Phase 3 Source Trace Map. Phase 4 built the supporting features and report management.

## End Of Phase 4 Content

Phases 1–4 are GREEN (2026-08-01). Phase 4 built the supporting features from §4: enriched `## PRD` (the twelve supporting features), new `## Report Management` (profile, branches, reports, audio, export surfaces), added REQ-039..049, added US-011..017, extended `## Glossary` (Profile Management, list view, grid view, audio playback, re-recording, AI transcription review), and added the Phase 4 Source Trace Map. Phase 5 built the report and branch domain.

## End Of Phase 5 Content

Phases 1–5 are GREEN (2026-08-01). Phase 5 built the report and branch domain from §5: enriched `## Report Domain` (one/multi-branch support, report ownership, reviewability), new `## Data Modeling` (seed), new `## Business Rules` (BR-01..09), new `## API Contract` (seed — the `mongoose-paginate-v2` pagination convention: page 1, limit 10, max 100), new `## Status Machine` (seed), enriched `## Report Management`, added REQ-050..057, added US-018..021, extended `## Glossary` (branch-specific details, per-branch time range, pagination convention, reviewed transcription), and added the Phase 5 Source Trace Map. Phase 6 built the report format and the AI prompt and export seeds.

## End Of Phase 6 Content

Phases 1–6 are GREEN (2026-08-01). Phase 6 built the report format from §6: new `## Report Format` (the eight Amharic sections, the three one/two/three-branch sample reports, the required professional tone, the sixteen strict generation rules, Amharic workplace transliteration, the raw-material rule, correction behavior, the before/after example), new `## AI Prompt Spec` (seed — PR-01..16), new `## Export Spec` (seed), added REQ-058..065, extended `## Glossary` (report tone, Amharic workplace transliteration), and added the Phase 6 Source Trace Map. Phase 7 built the language rules.

## End Of Phase 7 Content

Phases 1–7 are GREEN (2026-08-01). Phase 7 built the language rules from §7: new `## UI/UX Spec` seed (interface language English, content language Amharic/English/mixed, no forced translation, Amharic conversation audio, Addis AI language rationale), enriched `## AI Prompt Spec` (PR-17/18 language seeds, Amharic-default vs mixed-content precedence noted for Phase 21), enriched `## Report Format` (§10 language flexibility), enriched `## PRD` (language-rules bullet, Addis AI rationale in supporting feature 7), added REQ-066..069, added US-022/023, extended `## Glossary` (interface language rule, content language flexibility), updated the Checklist (UI/UX Spec seed, AI Prompt Spec enrichment, Report Format enrichment — all GREEN), and added the Phase 7 Source Trace Map. Phase 8 built the transcription accuracy requirement.

## End Of Phase 8 Content

Phases 1–8 are GREEN (2026-08-01). Phase 8 built the transcription accuracy requirement from §8: new `## Audio Recording STT` seed (accuracy foundation, priority rule, chunking/MIME safeguards, accuracy regression rule), new `## Transcription Review` seed (Phase 3 review loop + re-transcription for accuracy verification on every recording), new `## Validation Audit` seed (accuracy verification gate with real-Amharic-audio-before-merge rule), enriched `## PRD` (transcription accuracy bullet) and Work Flow (W-02 source += §8), added REQ-070..073, added US-024/025, extended `## Glossary` (transcription accuracy, accuracy regression), updated the Checklist (Audio Recording STT, Transcription Review, Validation Audit — GREEN seeds), and added the Phase 8 Source Trace Map. Phase 9 built the technical stack and package rules from the package.json files.

## End Of Phase 9 Content

Phases 1–9 are GREEN (2026-08-01). Phase 9 built the technical stack and package rules from §9 plus the authoritative `backend/package.json` and `client/package.json`: new `## Rules` (stack rules, package source of truth, HTTP client strategy, axios gap reconciliation), new `## Coding Conventions` (JS-only, ES Modules, MUI sx/styled only, manual validation resolvers, HTTP clients, no test frameworks), new `## Architecture` (two-package repository layout, backend/frontend stacks, source of truth), new `## Project Directory Structure` (full version tables for both packages; `"type": "module"` reconciled from the §9.3 commonjs note; React Compiler tooling and @types editor-tooling notes), added REQ-074..079, extended `## Glossary` (ES Modules, MUI sx and styled(), RTK Query), updated the Checklist (Rules, Coding Conventions, Architecture, Project Directory Structure — GREEN seeds; Requirements — GREEN enrichment), and added the Phase 9 Source Trace Map. Phase 10 built the backend architecture.

## End Of Phase 10 Content

Phases 1–10 are GREEN (2026-08-01). Phase 10 built the backend architecture from §10: new `## Backend Architecture` seed (routing under `/api/v1` via `routes/index.js`, fixed global security middleware order `helmet -> cors -> compression -> cookie-parser -> mongo-sanitize -> rate-limit`, one controller file per domain with `express-async-handler` and mongoose session transactions, `mongoose-paginate-v2` pagination, frozen constants and `config/env.js` env access, semantic HTTP status codes, response envelope, graceful shutdown, `express-validator` middleware, mongoose schema rules), new `## Logging` seed (Winston backend-only, Morgan development-only, absolute `console.log` ban, log levels, child loggers, gitignored daily-rotated `logs/` with 30-day auto-delete, safe-logging rules, AI provider log fields), enriched `## Architecture` (backend layering), `## API Contract` (response envelope superseding the Phase 5 unspecified-envelope note, semantic status codes, 422 validation shape, pagination), and `## Project Directory Structure` (backend directory tree; current codebase has only `.env` and the package manifests — source files are created during implementation), added REQ-080..086, extended `## Glossary` (Winston, Graceful shutdown, Mongoose session), updated the Checklist (Backend Architecture and Logging — GREEN seeds; Architecture, API Contract, Project Directory Structure — GREEN enrichment), and added the Phase 10 Source Trace Map. Phase 11 built authentication, authorization, cookies, and tokens.

## End Of Phase 11 Content

Phases 1–11 are GREEN (2026-08-01). Phase 11 built authentication, authorization, cookies, and tokens from §11: new `## Auth Cookies` seed (JWT auth with 15m access / 7d refresh httpOnly cookies, refresh rotation against replay, no sessions MongoDB collection, `authenticate` middleware contract, bcryptjs 12-round `pre('save')` hashing and `comparePassword`, email-local-part name extraction at registration, provider-neutral Google OAuth via `oauth.service.js` stubbed until credentials, three rate-limit tiers, `credentials: 'include'`), new `## Security` seed (cookie security, replay prevention, no-plaintext passwords, rate limiting), enriched `## API Contract` (authentication endpoint inventory: register, login, me, Google OAuth start route; outcome statuses under the §10.7 envelope), enriched `## Data Modeling` (User entity seeds: name fields, `fullName` virtual, unique email, hashed password without plaintext comparison, optional avatar/position, no session/token collection), added REQ-087..093, added US-026/027, extended `## Glossary` (JWT, httpOnly cookie, Refresh token rotation), updated the Checklist (Auth Cookies and Security — GREEN seeds; API Contract and Data Modeling — GREEN enrichment), and added the Phase 11 Source Trace Map. Phase 12 built the frontend architecture.

## End Of Phase 12 Content

Phases 1–12 are GREEN (2026-08-01). Phase 12 built the frontend architecture from §12: new `## Frontend Architecture` seed (React Router data mode — `createBrowserRouter` + `RouterProvider` in `main.jsx`, `Component` not `element`, `React.lazy` per module, App root layout composition, page inventory, auth strategy via `/auth/me` on load populating Redux + localStorage, RHF + RTK Query data-flow pattern, `useAuth`/`useAudioRecorder` hooks), new `## Routing Layout` (route tree with App/PublicLayout/AppShell/assistant/NotFound, `ProtectedRoute`/`PublicRoute` guards, assistant outside AppShell, Google OAuth redirect finalized as `GET /oauth/google`), new `## MUI Component Standards` seed (MuiAppbar public/protected variants, AppSidebar drawer modes and theming, Page Header pattern, dialog standards, text/overflow rules), enriched `## UI/UX Spec` (shell and scroll layout, Landing, Login/Register, Dashboard, Reports page, report detail/correction/assistant pages) and `## Project Directory Structure` (frontend directory tree), added REQ-094..100, added US-028/029, extended `## Glossary` (Route guard, React.lazy, AppShell), updated the Checklist (Frontend Architecture, Routing Layout, MUI Component Standards — GREEN seeds; UI/UX Spec, Project Directory Structure — GREEN enrichment), and added the Phase 12 Source Trace Map. Phase 13 built the Redux, RTK Query, and API client.

## End Of Phase 13 Content

Phases 1–13 are GREEN (2026-08-01). Phase 13 built the Redux, RTK Query, and API client architecture from §13: new `## Redux RTK Query` seed (store at `client/src/redux/app/store.js`, API slice `client/src/redux/features/api.js` via `createApi` + `fetchBaseQuery` + `baseQueryWithReauth`, eight feature slices — authSlice, branchSlice, reportSlice, audioSlice, transcriptionSlice, userSlice, aiConversationSlice, analyticsSlice — each injecting endpoints via `injectEndpoints`; the Redux `<Provider store>` is the outermost wrapper in `main.jsx`, above `LocalizationProvider` + the router; `baseQueryWithReauth` uses `VITE_API_BASE_URL` from `API_CONFIG` in `client/src/utils/constants.js` and `credentials: 'include'`; on 401 it calls `POST /api/v1/auth/refresh` and retries; on refresh failure it clears everything, dispatches logout, and leaves the user outside protected routes; auth endpoints are excluded from refresh on public pages; backend response transformation required), enriched `## Rules` (Redux And RTK Query Rules), enriched `## Frontend Architecture` (store wrapper order, refresh-aware auth strategy, data-flow pattern), enriched `## API Contract` (`POST /api/v1/auth/refresh` row), enriched `## Auth Cookies` (markers), enriched `## Project Directory Structure` (redux subtree, `utils/constants.js`), added REQ-103..106, added US-030, extended `## Glossary` (baseQueryWithReauth, injectEndpoints, Feature slice), updated the Checklist (Redux RTK Query — GREEN seed; API Contract, Frontend Architecture, Project Directory Structure, Rules — GREEN enrichment), and added the Phase 13 Source Trace Map. Phase 14 built MUI, MUI X, theme, and component standards.

## End Of Phase 14 Content

Phases 1–14 are GREEN (2026-08-01). Phase 14 built the MUI, MUI X, theme, and component standards from §14: enriched `## MUI Component Standards` (detailed MuiAppbar/Page Header/Dialogs specs; new MUI Import And Styling Rules — tree-shaken imports, never the `@mui/material` barrel, Grid `size` prop, the deprecated-props replacement table, sx/styled only, no Tailwind or inline styles, theme-aware tokens, no direct `themePrimitives.js`/`gray[50]`/`gray[800]`/`brand[400]` usage, mode-aware colors; Reusable Component Contract — `client/src/components/reusable/*`, `Mui` prefix, forwardRef inputs, `displayName`, `size="small"` defaults, pure passthrough wrappers, `slotProps.input` adornments, mandatory start adornments; Component Catalog — MuiButton native loading, MuiTextField internal password eye, MuiSelect maxHeight-300 MenuProps, MuiDatePicker explicit Desktop/Mobile switching plus the Ethiopian calendar (`utils/ethiopianDate.js`, DD-MM-YY, English day/month names incl. Pagume, RHF via Controller), MuiPagination, MuiDataGrid (columns in `components/columns/*`, action column, archive/restore/delete via MuiConfirmDialog, toolbar + export selection, server pagination, skeleton loading), MuiConfirmDialog, LoadingSpinner, MuiStatusBadge (status-name reconciliation owned by Phase 35); MUI X Usage — community edition only with the x-chat reference URLs), new `## Theme Standards` seed (theme rules from §14.4 verified against the codebase — `client/src/theme/` only, no inline overrides, overrides via `customizations/` files with `@module`, `AppTheme.jsx` composes `createTheme` + `cssVariables` + color schemes + the eight customization groups with `ThemeProvider disableTransitionOnChange`; theme tokens — never import `themePrimitives.js`, greys via `theme.palette.grey[N]`, mode-aware sx colors), enriched `## UI/UX Spec` (MuiStatusBadge in report detail/correction headers, MuiPageHeader subtitle rule, MuiDialog responsive fullscreen), cross-aligned `## Frontend Architecture` markers and `## Project Directory Structure` (`components/reusable/`, `components/columns/`, `utils/ethiopianDate.js`), added REQ-107..111, added US-031, extended `## Glossary` (Ethiopian calendar, Pagume, MUI X community edition), updated the Checklist (MUI Component Standards, UI/UX Spec, Project Directory Structure — GREEN enrichment; Theme Standards — GREEN seed), and added the Phase 14 Source Trace Map. Phase 15 built the React Hook Form standards.

## End Of Phase 15 Content

Phases 1–15 are GREEN (2026-08-01). Phase 15 built the React Hook Form standards from §15: new `## React Hook Form Standards` seed (every form uses `react-hook-form` `^7.81.0` — `client/package.json` — with `register` by default and `useForm({ mode: 'onBlur' })`; no `watch` — `getValues` inside validate functions for cross-field validation, with the confirm-password example; `register` first, `Controller` only for the MUI X DatePicker/TimePicker with a code comment documenting why; reusable Mui inputs stay `forwardRef`; `formState.errors` drives display via MUI `error`/`helperText` with English messages; never debounce input or use `useDebounce` — direct register integration only; backend validation via `setError('fieldName', { message: error.data?.data?.errors?.[0]?.message })`; `handleSubmit(onSubmit)` with try/catch and `reset()` only after success, `isSubmitting` disables the submit button and shows the spinner; schema validation via a manual resolver with a consistent error shape — no zod), enriched `## Validation Audit` (new form validation rules gate), enriched `## UI/UX Spec` (formState/error/helperText validation display cross-ref), cross-aligned `## Redux RTK Query` (forms submit via mutation hooks; 422 → field-level setError; isSubmitting drives MuiButton loading) and `## MUI Component Standards` (`register` on forwardRef inputs, `Controller` only for MuiDatePicker), added REQ-112..116, added US-032, extended `## Glossary` (react-hook-form, Controller, formState), updated the Checklist (React Hook Form Standards — GREEN seed; Validation Audit, UI/UX Spec — GREEN enrichment), and added the Phase 15 Source Trace Map. Phase 16 built the UI rules.

## End Of Phase 16 Content

Phases 1–16 are GREEN (2026-08-01). Phase 16 built the UI rules from §16: enriched `## UI/UX Spec` (new UI Rules section — language-and-content echo of §7, form submit buttons `size="small"` with `flexShrink: 0`, icons always used at `vw < 600` and `vw < 768 && landscape`, text-overflow/ellipsis rule with no horizontal scroll), enriched `## Rules` (new UI Rules section mapped to REQ-117..119), enriched `## User Interactions` (UI-008 — small-screen icon-first and ellipsis interaction; Phase 16 marker DONE), cross-aligned the forward markers in `## MUI Component Standards` and `## Theme Standards`, added REQ-117..119, added US-033, extended `## Glossary` (Icon-first rule, Ellipsis rule), updated the Checklist (Rules, UI/UX Spec, User Interactions — GREEN enrichment), and added the Phase 16 Source Trace Map with the `client/src` codebase fact (only `App.jsx`, `assets/`, `main.jsx`, `theme/` exist — no `components/` or `layouts/` yet). Phase 17 built the environment variables.

## End Of Phase 17 Content

Phases 1–17 are GREEN (2026-08-01). Phase 17 built the environment variables from §17: new `## Environment Config` seed (environment file rules — `.env` gitignored per the root `.gitignore`, `.env` files exist locally, no `.env.example` files, the three-step new-var process, `process.env` never accessed outside `config/env.js`, `VITE_`-prefixed client vars via `import.meta.env.*`; the 22-required + 5-optional backend env table verified against `backend/.env` — all required keys present except `LOG_LEVEL`, `OAUTH_GOOGLE_*` present, `GOOGLE_SERVICE_ACCOUNT_*` absent — with defaults (development, 4000, http://localhost:3000, 15m/7d, am, 360000, ffmpeg/ffprobe); the client env contract verified against `client/.env`; the six AI key never-rules for `sk_`/Nvidia/Gemini keys; the frozen `utils/constants.js` constants contract — Audio, Pagination, STT, Auth, AI Generation, AI Correction), enriched `## Rules` (Environment Config Rules — REQ-120..124), enriched `## Security` (Environment Secret Handling — JWT/OAuth/service-account secrets and AI key rules), flipped the Phase 17 forward markers in `## Rules`, `## Security`, and `## Auth Cookies` to DONE, added REQ-120..124, extended `## Glossary` (config/env.js (env gate), import.meta.env), updated the Checklist (Environment Config — GREEN seed; Security and Rules — GREEN enrichment), and added the Phase 17 Source Trace Map with the `.env` codebase facts. Phase 18 built the Addis AI integration.

## End Of Phase 18 Content

Phases 1–18 are GREEN (2026-08-01). Phase 18 built the Addis AI integration from §18: new `## Addis AI` seed (provider identity and primary sources, base URLs and platform, authentication and key rules, core model families, language support, text generation and speech-to-text contracts with request/response shapes, TTS/multimodal/translation/realtime non-first-workflow notes, error mapping with the status table and project handling, package and implementation implications), enriched `## AI Prompt Spec` (new §7 Delivery To The Addis AI Endpoint — PR-01..18 seeds delivered via `chat_generate` with the frozen-constants generation config), enriched `## API Contract` (new §5 Addis AI Provider Endpoints — backend service dependencies), enriched `## Security` (new §5 AI Provider Security), flipped the Phase 18 forward markers in `## AI Prompt Spec`, `## Security`, `## Environment Config`, and `## Audio Recording STT` to DONE, updated the `## UI/UX Spec` Addis AI rationale cross-ref, added REQ-125..131, extended `## Glossary` (Addis-፩-አሌፍ, x-api-key), updated the Checklist (Addis AI — GREEN seed; AI Prompt Spec, API Contract, Security — GREEN enrichment), and added the Phase 18 Source Trace Map with the `backend/.env` codebase facts. Phase 19 built the other AI providers.

## End Of Phase 19 Content

Phases 1–19 are GREEN (2026-08-01). Phase 19 built the other AI providers from §19: new `## Other AI Providers` seed (provider set and free-AI rule — three providers, STT always uses Addis AI, free-only with no credit card or subscription, models `gemini-3.1-flash-lite` and `z-ai/glm-5.2`, axios for Gemini/Nvidia; provider selection and storage — user picks at generation time via dropdown or buttons, default Addis, provider stored per AI conversation message, corrections may use a different provider; provider fallback chain Addis → Gemini → Nvidia; Gemini integration — `generateContent` contract with `contents`/`systemInstruction`/`generationConfig` and the `key` query parameter; Nvidia integration — Nvidia message format with `Authorization: Bearer`; both with 3x exponential-backoff retries and 502 provider errors), enriched `## AI Prompt Spec` (new §8 Provider Fallback And Delivery — PR-01..18 seeds deliver via Gemini `systemInstruction`/`contents` and the Nvidia message format), flipped the Phase 19 forward markers in `## AI Prompt Spec`, `## Addis AI`, and `## Environment Config` to DONE, added REQ-132..138, extended `## Glossary` (gemini-3.1-flash-lite, z-ai/glm-5.2), updated the Checklist (Other AI Providers — GREEN seed; AI Prompt Spec and Environment Config — GREEN enrichment), and added the Phase 19 Source Trace Map with the `backend/.env` and `backend/package.json` codebase facts. Phase 20 built the audio recording and STT pipeline.

## End Of Phase 20 Content

Phases 1–20 are GREEN (2026-08-01). Phase 20 built the audio recording and STT pipeline from §20: enriched `## Audio Recording STT` (new §5 Audio Recording Rules — MediaRecorder clips into a local-state array via a custom hook, full array submits as the multipart field `clips`, blobs never persisted to Redux/redux-persist/localStorage, 15 min/50 MB limits via `AUDIO_MAX_DURATION_SEC`/`AUDIO_MAX_SIZE_BYTES` enforced client-side after recording stops, over-50-MB blocks submit with a warning and a re-record request, MIME priority `audio/webm;codecs=opus` → `audio/webm` → `audio/mp4` → browser default, react-media-recorder and react-player already installed; new §6 Audio Validation — at least one clip, 50 MB max, MIME whitelist, informational duration, server-side ffprobe + multer type/size validation; new §7 Upload Storage — multer into `backend/uploads/audio/` gitignored; new §8 Approved Chunking Pipeline — single-pass ffmpeg WAV `pcm_s16le` 16 kHz mono → in-memory PCM split via `wavSplitter.js` into ~60 s chunks (`ADDIS_AI_STT_MAX_DURATION_SEC` = 60) → chunk MIME `audio/wav` never `audio/webm`, alternatives forbidden unless proven equivalent; new §9 Re-Transcription — backend accepts `audio_recorded` and `transcribed` statuses, Re-transcribe button on completed transcriptions), enriched `## Transcription Review` (re-transcription mechanics — statuses accepted, Re-transcribe button, cross-ref to `## Audio Recording STT` §9), enriched `## API Contract` (new §6 Audio Upload And Re-Transcription Endpoints), enriched `## Data Modeling` (new §5 Narration And Transcription Seeds — clips array, per-clip constraints, storage path, `audio_recorded`/`transcribed`/`reviewed` statuses, re-record/re-transcribe behavior), flipped the Phase 20 forward markers in `## Audio Recording STT` and `## Transcription Review` to DONE, added REQ-139..145, updated the Checklist (Audio Recording STT and Transcription Review — GREEN enrichment; API Contract and Data Modeling — GREEN Phase 20 enrichment), and added the Phase 20 Source Trace Map with the `client/package.json` and `backend/package.json` codebase facts. Phase 21 will build the AI prompt requirements.

## End Of Phase 21 Content

Phases 1–21 are GREEN (2026-08-01). Phase 21 built the AI prompt requirements from §21: enriched `## AI Prompt Spec` (new §9 System Prompts And Parameters — the exact §21.1 generation system message with temperature 0.2 / maxOutputTokens 2048 from the frozen AI Generation constants and the exact §21.2 correction system message with temperature 0.15 / maxOutputTokens 2048 from the frozen AI Correction constants, wired across the three providers via the §7 prompt field, Gemini `systemInstruction`, and the Nvidia system role; new §10 Voice Correction Flow — correction audio → STT → correction text → the same correction prompt, STT via the approved chunking pipeline; new §11 Transcription Correction — AI fixes transcription errors and returns `aiCorrectedText` in the Transcription model; new §12 Amharic Generation Rules Enforced In The Prompt — the 14 §21.5 rules mapped onto the PR-01..16 seeds with the exact eight Amharic section names, the few-shot wiring, and the Amharic-default vs mixed precedence resolution), enriched `## Report Format` (resolved the source punctuation note — §21 provides no label-punctuation rule, so the §6.1 template form with Ethiopic `፡` remains canonical per the Phase 6 resolution; resolved the language-precedence wording to `## AI Prompt Spec` §12), enriched `## Rules` (new §6 AI Prompt Rules — the prompt-text, parameter, voice-correction, transcription-correction, and 14-rule enforcement requirements mapped to REQ-146..153), flipped the Phase 21 forward markers in `## AI Prompt Spec`, `## Report Format`, and `## Rules` to DONE, added REQ-146..153, extended `## Glossary` (aiCorrectedText), updated the Checklist (AI Prompt Spec, Report Format, and Rules — GREEN Phase 21 enrichment), and added the Phase 21 Source Trace Map. Phase 22 will build the export mechanics.

## End Of Phase 22 Content

Phases 1–22 are GREEN (2026-08-01). Phase 22 built the export mechanics from §22: enriched `## Export Spec` (new §2 Format Details — PDF via `jspdf` + `jspdf-autotable` (already installed in `client/package.json`), A4, Noto Sans Ethiopic font for Amharic, section headers, page numbers; TXT via UTF-8 Blob preserving the report format; CSV via UTF-8 Blob with BOM for Excel compatibility with structured columns; XLSX as a multi-sheet workbook — content, version history (all versions with metadata), and metadata (provider, dates, status) sheets, workbook library chosen at implementation; new §3 Client-Side Only Rule — PDF/TXT/CSV/XLSX generated in the browser with no backend export endpoints; new §4 Google Docs Backend Export — backend-only via the Google Docs API with a Google Service Account (`GOOGLE_SERVICE_ACCOUNT_EMAIL`/`GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`, `## Environment Config` §2, REQ-121, absent from `backend/.env` and added when the export is enabled), document created from the report content, sharing set to "Anyone with link can view", URL returned, frontend opens it in a new tab, edits happen freely in Google Docs outside the app, credentials server-side only; §2 Expansion Markers renumbered to §5 and flipped to DONE), enriched `## API Contract` (new §7 Export — the four client-side formats need no backend endpoints; Google Docs is the only backend export, path defined at implementation per the Phase 10 precedent), enriched `## Work Flow` (W-12 row now details `## Export Spec` §2–4; new §5 Export Sub-Flow — E-01..E-05: format choice from the finalized report, browser download for the four client-side formats, backend Google Docs export returning the shareable URL, URL opened in a new tab, free editing in Google Docs; export available only on a finalized report; failure outcomes via the §10.7 envelope), flipped the Phase 22 forward marker in `## Export Spec` to DONE, added REQ-154..159, extended `## Glossary` (Noto Sans Ethiopic, Google Service Account), updated the Checklist (Export Spec — GREEN Phase 22 enrichment; Work Flow — GREEN Phase 22 enrichment; API Contract — GREEN Phase 22 enrichment), and added the Phase 22 Source Trace Map with the `client/package.json` codebase facts (jspdf ^4.2.1 and jspdf-autotable ^5.0.8 installed, no workbook library) and the `backend/.env` fact (GOOGLE_SERVICE_ACCOUNT_* absent, added when the Google Docs export is enabled). Phase 23 will build the mock data rules.

## End Of Phase 23 Content

Phases 1–23 are GREEN (2026-08-02). Phase 23 built the mock data rules from §23: new `## Mock Data Seeding` seed (development/demo-only scope with the `NODE_ENV` production guard — user decision; session contract mirroring the write-controller transaction pattern of REQ-082 — `startSession`/`startTransaction`/commit-or-abort/`endSession` in `finally` with `{ session }` on every write, all-or-nothing runs; transactional wipe across the seeded collections; idempotent wipe-before-inject; seeded entity set — User (created through the model so the bcrypt `pre('save')` hook applies), Branch, DailyReport (statuses of `## Status Machine`, reconciliation owned by Phase 35), Narration, Transcription, AIConversation, GeneratedReport, ReportVersion; metadata-only audio rule from ADR-037 — clip metadata without audio files, `backend/uploads/audio/` untouched, no STT calls, mock transcriptions pre-created; entry points under `backend/mock/*` with module and npm script names defined at implementation — no `mock/`/`seed/` directory or seed script exists in `backend/` today (codebase fact); implementation task seeds T-MOCK-01..04 for the Phase 32 Tasks And Implementation Plan section; expansion markers for Phases 24, 32, 35), enriched `## Data Modeling` (new §6 Mock Data Seeds — entity-level seeding rules, metadata-only narrations, session-based inject/wipe, Phase 24 deferral), added REQ-160..164 (inject session, wipe session, metadata-only mock audio, idempotent injection, production guard), added AD-009 (Mock Data Seeding Strategy), extended `## Glossary` (Mock data), flipped the Phase 23 forward markers in `## Project Directory Structure` (the `mock/` tree comment and the backend-directory note) to reference `## Mock Data Seeding`, added the missing Phase 22 export marker to the requirement expansion markers, updated the Checklist (Mock Data Seeding — GREEN seed; Data Modeling — GREEN Phase 23 enrichment; Tasks — Phase 23 seed, content lives in `## Mock Data Seeding`, consolidated in Phase 32), and added the Phase 23 Source Trace Map with the `backend/` and `backend/package.json` codebase facts (no `mock/`/`seed/` directory, no seed script, mongoose ^9.7.4). Phase 24 will build the data model.

## End Of Phase 24 Content

Phases 1–24 are GREEN (2026-08-02). Phase 24 built the data model from §24: rewrote `## Data Modeling` (new §1 inventory — six persisted models (User, Branch, Report, Audio, Transcription, ChatConversation) plus derived analytics with no collection; new §2 relationship diagram and rules — Report is the hub, Audio/Transcription point back to Report, bidirectional user ownership, report deletion keeps conversations; new §3 modeling rules — session-capable hooks/instance/static methods, `schema.index(..)`-only indexes, no `unique: true` plus separate-index combos, mongoose-paginate-v2 on all list endpoints; new §4 field-level schemas — Report with `branches[]` per-branch clockIn/clockOut, top-level clockIn/clockOut (DR-8 clock semantics), `audio[]`, `transcription`, status enum `draft | audio_attached | transcribed | reviewed | completed` (lifecycle, AD-011), `isArchived`/`archivedAt` TTL 30-day partial index, `generated` plus `generatedHistory[]` (unified report-version model, AD-010); Audio one doc per clip (`uploads/audio/{uuid}.webm`, fileSize ≤ 50 MB, duration ≤ 900 s via ffprobe, no status field); Transcription (`raw`, `latest`, `history[]` with reviewer User ObjectId or provider string, three review modes, no status field — AD-011); User (bcryptjs 12-round pre-save skip-if-unmodified, `comparePassword`, unique email via `schema.index`, `fullName` virtual, toJSON deletes password); Branch (unique `{user, name}` index, TTL archive); ChatConversation (messages `{ id, role, status, parts (4 tool shapes), provider "addis" | "gemini" | "nvidia" }`, index `{user, updatedAt: -1}`); new §5 Phase enrichment superseding note; new §6 Report Status Lifecycle; new §7 expansion markers — Phases 11/20/23 DONE, 35 pending), enriched `## Business Rules` (BR-11..14), enriched `## API Contract` (new §8 Model-Driven Contracts — Report/Branch request-response tables, Audio constants, transcription correction payload, ChatConversation message shape, pagination/sort keys), enriched `## Status Machine` (new §3 work-flow → enum mapping), enriched `## Report Domain` (DR-8 clock-semantics rule; §9 record types map to models), enriched `## Mock Data Seeding` (§4 entity set → final models, §5 metadata-only rule), enriched `## Other AI Providers` (§6 conversation message provider), `## Audio Recording STT` (§9, §10 markers), `## AI Prompt Spec` (§11 corrected transcription storage), `## Transcription Review` (§2 status semantics), reworded `## Rules` (§6 AI Prompt Rules), updated the MuiStatusBadge reconciliation note in `## MUI Component Standards` (§9.8 — the five badge statuses are the Phase 24 enum; Phase 35 owns only the archive/delete/restore lifecycle), extended `## Glossary` (Narration, AI conversation, Generated report, Report version history, Analytics; `aiCorrectedText` superseded note), reworded REQ-145/REQ-149, added REQ-165..172, added AD-010 (Unified Report Version) and AD-011 (Phase 24 Reconciliations), updated the Checklist (Data Modeling, API Contract, Business Rules, Report Domain, Status Machine, Glossary, Requirements, Mock Data Seeding, Other AI Providers, Audio Recording STT, Transcription Review, Validation Audit, Backend Architecture, MUI Component Standards — GREEN Phase 24 enrichment), and added the Phase 24 Source Trace Map. Phase 35 will build the archive/delete/restore lifecycle.

## End Of Phase 25 Content

Phases 1–25 are GREEN (2026-08-02). Phase 25 built the project directory structure from §25: rewrote `## Project Directory Structure` (new §1 Repository Root — `Report-Builder-V2/` with `.gitignore` (first line `.env`), `README.md`, `backend/`, `client/`, `docs/`, `scripts/verify-initial-doc.py`; new §4 Backend Directory Structure — the complete future-state backend tree from §25.3: `app.js`, `server.js`, `config/env.js` + `config/db.js`, per-domain `controllers/*.js` (8 files incl. `report.controller.js` with the `exportReport` Google Drive export), `middleware/{authenticate,notFound,error}.middleware.js` (notFound → `CustomError(404)` → `next()`), the five models, `mock/{seed,wipe}.js`, `routes/index.js` + 8 per-domain route modules, `services/{oauth,addis,gemini,nvidia,googleDocs}.service.js`, `uploads/audio/` (runtime-created, gitignored `{uuid}.webm` clips), `utils/{constants,httpStatus,logger,wavSplitter}.js`, 8 per-domain `validators/*.js`, `logs/`; new §5 Frontend Directory Structure — the complete future-state client tree: `main.jsx`, `App.jsx`, lazy-loaded `pages/*`, `components/layout/*`, `components/<domain>/*`, `redux/app/store.js` + `redux/features/{api,assistantApi,<name>Slice}.js`, `components/{reusable,columns}/*`, `utils/{constants,ethiopianDate}.js`, `theme/*`; new §6 Final Structure Rules — §25.3 completeness (REQ-173), kebab-case per-domain naming (REQ-176), new paths recorded in the tree; new §7 Expansion Markers — Phases 12/13/14 DONE, 25 DONE (final structure), 30 pending; the duplicate-heading numbering of the old tree (two `### 4.`, skipped `### 5.`) is fixed; the `## Mock Data Seeding` §6 Entry Points deferral is resolved — `mock/seed.js`/`mock/wipe.js` with the `mock:seed`/`mock:wipe` npm scripts and the `NODE_ENV` production guard (REQ-164); the export path is finalized — `POST /api/v1/reports/:reportId/export`, `exportReport` in `report.controller.js`, `services/googleDocs.service.js`), enriched `## Architecture` (header blockquote + §5 Backend Architecture — the services layer (`oauth.service.js` with the `drive.file` scope, `addis`/`gemini`/`nvidia`/`googleDocs` services, thin controllers), middleware, config; §6 markers — Phase 25 DONE), enriched `## Coding Conventions` (new §6 Backend File Organization — per-domain `<domain>.controller.js`/`<domain>.routes.js`/`<domain>.validator.js`/`<domain>.model.js` naming, services layer, middleware roles; §7 markers — Phase 25 DONE), enriched `## Backend Architecture` (header blockquote; expansion markers — Phase 25 DONE with the full file tree), amended the Google Docs export by user decision (AD-012): `## Export Spec` §4 rewritten — the backend creates the document with the user's own Google OAuth token (login flow extended with the `drive.file` scope) directly in the user's own Google Drive, user owns/edits/shares/downloads the document, no sharing-permission step, token stored/refreshed server-side only, service-account mechanism retired; `## API Contract` §7 — export path `POST /api/v1/reports/:reportId/export`, handler and service named; `## Work Flow` §5 — E-03..E-05 now describe the user's own Drive; `## Environment Config` §2 — `GOOGLE_SERVICE_ACCOUNT_EMAIL`/`GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` rows removed, note added that the export reuses the optional `OAUTH_GOOGLE_*` keys; `## Security` — service-account bullet replaced with the user-token server-side rule; `## Glossary` — "Google Service Account" entry replaced with "Google Drive export"; REQ-121 optional-var phrase trimmed; REQ-158 rewritten (user-OAuth mechanism); REQ-159 unchanged; the service-files decision (AD-013) recorded; added REQ-173..177 (complete tree, §25.1 backend paths, §25.2 frontend paths, per-domain/services/middleware naming, user-OAuth export with no service account), added AD-012 and AD-013 to the `## Decision Log`, updated the Checklist (Project Directory Structure, Architecture, Coding Conventions, Backend Architecture, Export Spec, API Contract, Work Flow, Environment Config, Security, Requirements — GREEN Phase 25 enrichment), reconciled the Phase 17/22 Source Trace Map rows with the Phase 25 retirement notes, aligned the initial source brief with the Google Docs decision (§17.2 env table rows removed + note; §22 export rewritten), and added the Phase 25 Source Trace Map. Phase 26 will build the code quality and coding conventions.

## End Of Phase 26 Content

Phases 1–26 are GREEN (2026-08-02). Phase 26 built the code quality and coding conventions from §26: enriched `## Coding Conventions` (header blockquote updated; new §7 Formatting — ES Modules only with `"type": "module"` and `import`/`export` (cross-ref REQ-075), no `console.log` in backend code (Winston replaces it in all environments, cross-ref `## Logging` REQ-086; `console.log` allowed frontend), no zod — manual resolvers with a consistent error shape (cross-ref REQ-077), semicolons required, single quotes, trailing commas, 2-space indentation, 100-character width, LF line endings, UTF-8 encoding; new §8 Naming — camelCase variables/functions, PascalCase classes/components, kebab-case file names, UPPER_SNAKE_CASE constants and environment variables; new §9 Imports — built-in → npm → local alphabetical, named imports for utilities and functions, default import for React components, never `*` imports; new §10 Dead Code And Unused Parameters — no unused imports/exports/dead code, `_`-prefixed unused parameters (`_req`, `_res`, `_next`); new §11 Backend Conventions — `req.user._id.toString()` for user IDs (REQ-183); new §12 Frontend Conventions — functional components with hooks, props destructured in the function signature, `handle`-prefixed event handlers (REQ-182); new §13 Build And Lint Gates — `npx vite build` 0 errors, lint passes, lint scoped to the frontend with the no-backend-lint codebase fact; new §14 Expansion Markers — Phases 25/26 DONE, Phase 27 pending with JSDoc samples), added new `## JSDoc Standards` (header blockquote; §1 Mandatory Documentation — JSDoc block comment at the top of every file/module (REQ-185), `@module` on public modules, `@param`/`@returns`/`@throws` on functions, `@type` on constants, JSDoc on exports (REQ-186), tag-level detail deferred to Phase 27; §2 Codebase Facts — theme files already carry `@module <path>` JSDoc (Phase 14-aligned), `main.jsx`/`App.jsx` are template remnants replaced per REQ-175; §3 Expansion Markers — Phase 26 DONE, Phase 27 pending), enriched `## Rules` (new §7 Code Quality Rules — REQ-178..186 with cross-refs to `## Coding Conventions`, `## JSDoc Standards`, `## Logging`, and the no-backend-lint codebase fact; §8 markers — Phase 26 DONE), added new `## Checklists` (header blockquote; §1 Code Quality Checklist — checkbox list covering every §26 rule incl. the no-unused-exports rule "every exported function or constant is imported elsewhere"; §2 Frontend Build And Lint Gate — vite build 0 errors, `npm run lint` passes, no backend lint; §3 Expansion Markers — Phases 26 DONE, 30/31 pending), flipped the `## Validation Audit` markers (Phase 26 DONE; scope note now references `## JSDoc Standards` and `## Checklists`), added REQ-178..186 (formatting, naming, imports, dead code/unused parameters, frontend conventions, `req.user._id.toString()`, build+lint gates with no backend lint, every-file JSDoc, JSDoc tag contract), extended `## Glossary` (JSDoc, Dead code), updated the Checklist (Coding Conventions, JSDoc Standards, Rules, Checklists — GREEN Phase 26 seed/enrichment; Validation Audit — GREEN Phase 26 enrichment), added the missing Phase 25 requirement-expansion marker, and added the Phase 26 Source Trace Map with the codebase facts (`client/eslint.config.js` ESLint 10 flat config with `@eslint/js` recommended + react-hooks flat recommended + react-refresh vite, browser globals, JSX, ignores `dist`; `client/package.json` `lint: "eslint ."`; no ESLint config or lint script in `backend/` — lint scoped to the frontend; theme `@module` JSDoc evidence; `main.jsx`/`App.jsx` template-remnant facts). Phase 27 will build the JSDoc samples and full JSDoc conventions.

## End Of Phase 27 Content

Phases 1–27 are GREEN (2026-08-02). Phase 27 built the JSDoc conventions from §27: enriched `## JSDoc Standards` (header blockquote updated — Phase 26 seed + Phase 27 enrichment; §1 Mandatory Documentation kept with the tag-level detail paragraph now pointing at the built §§3–11; §2 Codebase Facts extended — `AppTheme.jsx` carries the live function triple (`@param {{ children: React.ReactNode }} props - Theme provider props.`, `@returns {JSX.Element} Theme provider wrapper.`, `@throws {never} This component does not throw.`), `customizations/surfaces.js` opens `@module customizations/surfaces`, `themePrimitives.js` exports the brand/gray/green/orange/red/blue/error/success constants without `@type` — the REQ-186 gap, constants gain `@type` during implementation with no file replacement; new §3 Module-Level Documentation — `@module <path>/<name>` relative to the package source root (`client/src/`, `backend/`), theme customizations and `AppTheme.jsx` use `@module` never `@file` (REQ-187); new §4 Function-Level Tags — `@param {type} name - description` / `@returns {type}` / `@throws {ErrorType} reason`, arrow functions for components and controllers (REQ-188); new §5 Constants — `@type` with full type definitions (REQ-189); new §6 Express And Mongoose Types — `import('express').Request/Response/NextFunction`, Mongoose async middleware `@returns {Promise<void>}` (REQ-190); new §7 Component JSDoc — `@param {Object} props` with `name`/`label`/`error`/`helperText`/`control` documented, forwardRef-wrapped inputs with `@param {import('react').Ref} ref`, presentation wrappers do not use forwardRef (REQ-191); new §8 Model JSDoc — `@typedef {Object} ModelName` + one `@property {Type} fieldName - description` per field (REQ-192); new §9 Middleware JSDoc — req/res/next triple with `_`-prefixed unused params (REQ-193); new §10 No-TypeScript Typing Rules — JSDoc as the type layer (REQ-194); new §11 Sample Documented Files — six canonical forms: theme customization in the live `customizations/surfaces.js` form, constants with the real `AUDIO_MAX_DURATION_SEC` = 900 / `AUDIO_MAX_SIZE_BYTES` = 52428800 / `REPORT_STATUSES` values, Mongoose model in the `models/dailyReport.js` form with `user`/`date`/`branches`/`status`/`transcription` `@property` lines, Express controller in the `controllers/user.controller.js` form — arrow function `getProfile` using `req.user._id.toString()` per REQ-183 and returning `{ success: true, message: 'User profile fetched successfully', data: { user } }`, Express middleware in the `notFound.middleware.js` form with `_res`/`_req`, React component in the `components/reusable/FormTextField.jsx` form — arrow function wrapped with `forwardRef` (so RHF `register` binds the input directly) with `displayName` set and the §7 props documented; old §3 Expansion Markers renumbered to §12 with both markers DONE), enriched `## Coding Conventions` (header blockquote updated — §27 conventions arrived in `## JSDoc Standards` §§3–11; §14 marker flipped to Phase 27 DONE), added REQ-187..194 (module `@module` path/name with no `@file` for themes, function tag form with arrow functions, constant `@type`, Express `import('express')` types + Mongoose `Promise<void>`, component props, model `@typedef`/`@property`, middleware req/res/next triple with `_` prefix, no-TypeScript JSDoc typing), added the Phase 27 requirement-expansion marker, extended `## Glossary` (`@typedef`), updated the Checklist (Coding Conventions and JSDoc Standards — GREEN Phase 27 enrichment), and added the Phase 27 Source Trace Map (9 §27 rows + 2 codebase rows: the AppTheme.jsx live triple and the surfaces.js `@module` / themePrimitives.js missing-`@type` facts). Phase 28 will build the error handling patterns.
## End Of Phase 28 Content

Phases 1–28 are GREEN (2026-08-02). Phase 28 built the error handling patterns from §28: new `## Error Handling` seed (header blockquote; §1 Server-Side Error Handling — `CustomError` in `backend/utils/error.js` carrying `statusCode`/`message`/`isOperational` (REQ-195), the global `error.middleware.js` distinguishing operational `CustomError` from unexpected errors — development returns the full stack trace, production returns a generic message and logs programmer errors via `## Logging` (REQ-196), `notFound.middleware.js` creating `CustomError(404)` and forwarding via `next()` (REQ-197), validation failures `422` with `data.errors` per-field messages (REQ-198), all async controllers wrapped with `express-async-handler` (REQ-199), with the error-handler, CustomError, and notFound code samples; §2 Error Types And HTTP Status Codes — the full §28.2 table (validation 422, auth 401 ×2, not found 404, file size 413, MIME 415, CastError 400, ValidationError 422, duplicate key 11000 → 409, JsonWebTokenError 401, TokenExpiredError 401, AI service 502) with Mongoose/JWT mapping in the global handler and the unified 502 rule for all three providers — STT chunk failures keep the mark-failed-and-continue behavior (REQ-129, REQ-200); §3 Frontend Error Handling — the `baseQueryWithReauth` refresh flow cross-ref, the `onQueryStarted` `if (error)` pattern with per-field `error.data.data.errors`, `AppToastContainer` toasts (react-toastify), the message extraction chain, `AppErrorBoundary` class component (react-error-boundary) catching React render errors with fallback UI (REQ-201, REQ-202), with the onQueryStarted and AppErrorBoundary code samples; §4 Expansion Markers — Phase 13 DONE, Phase 28 DONE, Phase 29 pending), enriched `## API Contract` (header blockquote updated; §3 — `data.errors` per-field note, error status mapping cross-ref, AI service 502 rule), enriched `## Validation Audit` (new §3 Error Handling Audit — STT failure states, AI generation failure error states, no-internals rule, mutation error-pattern audit; scope note and markers updated; §3→§4/§5 renumbering), enriched `## Logging` (error-handling logging detail — unexpected errors logged with stack and status, production generic message, AI provider error log fields, safe-logging applies to error logs; marker flipped DONE), enriched `## Redux RTK Query` (header blockquote updated; new §5 Frontend Error Handling — onQueryStarted pattern, 422-to-setError, toasts, AppErrorBoundary, render-vs-request error split; §4→§6 marker renumbering; marker flipped DONE), enriched `## Backend Architecture` (header blockquote; §2 error pipeline note; §11 marker flipped DONE), `## Project Directory Structure` §4 tree (`utils/error.js` node added; error.middleware.js comment updated), `## Addis AI` (§12 unified-502 note; marker flipped), `## Other AI Providers` (marker flipped), `## Audio Recording STT` (§10 marker flipped), `## React Hook Form Standards` (header blockquote; marker flipped), UI/UX Spec / Work Flow / User Interactions phase-attribution updates, added REQ-195..202, added the Phase 28 requirement-expansion marker, extended `## Glossary` (CustomError, AppErrorBoundary, AppToastContainer), updated the Checklist (Error Handling — GREEN seed; API Contract, Validation Audit, Logging, Redux RTK Query, Backend Architecture — GREEN Phase 28 enrichment), and added the Phase 28 Source Trace Map (7 §28 rows + 1 codebase row: `react-toastify` `^11.1.0` and `react-error-boundary` `^6.1.2` in `client/package.json`, no error components or backend error files exist yet). Phase 29 will build the security rules.

## End Of Phase 29 Content

Phases 1–29 are GREEN (2026-08-02). Phase 29 built the security rules from §29: rebuilt `## Security` as the full security section — §1 Environment And Secrets (§29.1 — `.env` gitignored and never committed, no `.env.example`, all API keys only in `backend/.env`, backend-only proxy, no keys in frontend code/Vite env/localStorage/Redux/client logs (REQ-120, REQ-121, REQ-123, REQ-125); the JWT/OAuth secret rules; the user-OAuth token server-side-only rule (REQ-158, REQ-177); the `x-api-key` authentication, no-key-logging, and backend-controlled realtime rules from the old §5 (REQ-126, REQ-129, REQ-130)), §2 JWT Cookie Security (§29.2 — 15m access path `/` / 7d refresh path `/api/v1` TTLs with the two secrets, `httpOnly`/`secure` production/`sameSite: lax`, httpOnly-XSS rationale, rotation against replay, no sessions collection — REQ-087), §3 CORS (§29.3 — `CLIENT_ORIGIN` origin, default `http://localhost:3000`, `credentials: true`, no wildcard — REQ-203), §4 Rate Limiting (§29.4 — the three-tier table and the 429 overflow rule with the §10.7 envelope — REQ-092, REQ-204), §5 Middleware Stack Fixed Order (§29.5 — `helmet -> cors -> compression -> cookie-parser -> mongo-sanitize -> rate-limit` with the per-step rationale, never reordered or removed — REQ-081), §6 NoSQL Injection Prevention (§29.6 — `express-mongo-sanitize` strips `$` and `.` from body/query/params globally), §7 Input Validation (§29.7 — `express-validator` everywhere; the exact 422 shape `{ success: false, message: 'Validation failed', data: { errors: [...] } }` — REQ-198), §8 Audio Upload Validation (§29.8 — multer MIME/size plus ffprobe duration — REQ-142), §9 Safe Logging (§29.9 — the production never-list with message IDs/truncated previews — REQ-086), §10 MongoDB Transactions (§29.10 — the `startSession → startTransaction → writes → commitTransaction → catch → abortTransaction → finally → endSession` pattern — REQ-082), §11 Password Handling (§29.11 — bcryptjs 12 rounds, `comparePassword`, `select: false` plus the `toJSON` exclusion — REQ-089, REQ-167/170), §12 Graceful Shutdown (§29.12 — the SIGINT/SIGTERM sequence plus the new 30-second force-exit — REQ-084, REQ-205), §13 Expansion Markers (Phases 17, 18, 25, 29 DONE); the old §1–5 green content was folded into the new §1–12 numbering and every `## Security §N` reference was updated (9 source-trace-map rows and 2 `## Addis AI` echoes, plus the `## Security` §6→§13 and `## Rules` §8→§9 marker renumbering); enriched `## Error Handling` (new `| Rate limit exceeded | 429 |` row in the §2 status table with the three-tier ref and REQ-204; §4 Phase 29 marker DONE), enriched `## Rules` (new §8 Security Rules — CORS, fixed stack, 429, 422 validation shape, safe logging, 30s force-exit; §9 markers — Phase 29 DONE), flipped the Phase 29 markers in `## Auth Cookies` (§8) and `## Environment Config` (§6) to DONE, added REQ-203..205 (CORS, 429 overflow envelope, 30-second force-exit), added the Phase 29 requirement-expansion marker, extended `## Glossary` (CORS, helmet, express-mongo-sanitize, 429 Too Many Requests), updated the Checklist (Security — GREEN Phase 29 enrichment; Requirements, Environment Config, Rules — GREEN Phase 29 enrichment), and added the Phase 29 Source Trace Map (12 §29 rows + 1 codebase row: the security dependencies in `backend/package.json` — `bcryptjs` `^3.0.3`, `compression` `^1.8.1`, `cookie-parser` `^1.4.7`, `cors` `^2.8.6`, `dotenv` `^17.4.2`, `express-async-handler` `^1.2.0`, `express-mongo-sanitize` `^2.2.0`, `express-rate-limit` `^8.5.2`, `express-validator` `^7.3.2`, `helmet` `^8.3.0`, `multer` `^2.2.0`). Phase 30 will build the new file creation rules.
