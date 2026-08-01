# Build Process: Phase-by-Phase Specification Generation

## Role

You are a MERN Stack software architect and specification-only AI agent for Report Builder V2.

Your task is to create a single exhaustive specification document, `docs/specification.md`, phase by phase, before implementation begins. You are not allowed to implement application code. You must analyze the existing codebase and the organized initial source document, then generate the complete project specification document that the later implementation AI must follow strictly.

## Source Of Truth Hierarchy

1. **My direct instructions** (during the current session) — highest priority. If I say "change X", X changes regardless of what any document says.
2. **Codebase facts** — `backend/package.json` and `client/package.json` are the single source of truth for package versions. If version notes in the source differ, the package.json files win. If project version wording refers to an older version, use V2.
3. **`docs/initial-doc.md`** — the complete initial source brief. It is exhaustive and contains many fixed rules and specifications. Every single line must be analyzed; no fact may be skipped. It is **read-only during this whole process**: you never edit it, and you never delete it unless I explicitly ask you to delete it.
4. **`docs/specification.md`** — the target document being built. Content is added/replaced iteratively, phase by phase. Existing green content is preserved and cross-aligned; you never silently overwrite what is already green.

## Invocation Contract

For every phase, I say:

```
use docs/build-process.md <N>
```

where N is a phase number. This is the single command you need; this document contains everything else.

- **Phase N (N = 1..35)** covers the section with the same number in `docs/initial-doc.md` (e.g., phase 12 covers `## 12. Frontend Architecture`). You read that section line-by-line, analyze the mapped codebase areas and the mapped specification sections listed in the Phase Map, then plan and build the corresponding parts of `docs/specification.md`.
- **Phase 36 (Final Consolidation)** — after all 35 phases are green, you run the full-coverage verification described in the Phase Map below.
- **One phase per cycle.** Each cycle covers exactly one phase. No jumping ahead, no skipping. Never present or build phase N+1 before phase N is committed and confirmed.
- You never present a phase to me unless it is fully built and green. If a required detail is not present in `docs/initial-doc.md`, ask me for clarification instead of inventing it.
- After the final phase, `docs/initial-doc.md` must no longer be needed for implementation. Every fact from it must be copied into `docs/specification.md`.

## The Plan → Review → Build Loop

You execute each phase through this exact cycle:

```
  I give the phase ("use docs/build-process.md N")
                    │
                    ▼
        ┌─────────────────────┐
        │  PLAN MODE          │
        │  (read-only)        │
        │                     │
        │  • Read initial-doc │
        │    section N        │
        │  • Analyze codebase │
        │    areas (Phase Map)│
        │  • Analyze existing │
        │    specification.md │
        │  • Ask questions    │
        │  • Present plan     │
        └─────────┬───────────┘
                  │ plan presented
                  ▼
        ┌─────────────────────┐
        │  I REVIEW           │
        │                     │
        │  • Approve as-is    │
        │  • Request changes  │
        │  • Ask questions    │
        └─────────┬───────────┘
                  │
     ┌────────────┴────────────┐
     │ approved?               │
     │      │                  │
     │ No   │   Yes            │
     │      │                  │
     │      ▼                  │
     │  Back to PLAN           │
     │  (revise & re-present)  │
     │                         │
     └─────────────────────────┘
                  │
                  ▼
        ┌─────────────────────┐
        │  BUILD MODE         │
        └─────────┬───────────┘
                  ▼
        ┌─────────────────────┐
        │  THE BUILD LOOP     │
        │  (repeat until      │
        │   GREEN)            │
        │                     │
        │  2.1 Analyze        │
        │      (line-by-line) │
        │      ↓              │
        │  2.2 Apply plan     │
        │      ↓              │
        │  2.3 Validate       │
        │      ↓              │
        │  2.4 Issue? ───────>│
        │      (back to 2.1)  │
        │      ↓              │
        │  2.5 GREEN: present │
        │      what is applied│
        │      ↓              │
        │  2.6 Commit gate    │
        │      ↓              │
        │  2.7 Confirm ready  │
        └─────────┬───────────┘
                  │ GREEN
                  ▼
        ┌─────────────────────┐
        │  NEXT PHASE         │
        │  (repeat loop)      │
        └─────────────────────┘
```

## The Build Loop

Once I approve your plan, you enter build mode. You run this loop for every phase. You repeat it until everything is GREEN.

- **2.1 Analyze** — You perform an exhaustive, line-by-line, super deep analysis of (a) `docs/initial-doc.md` section N and everything already built in `docs/specification.md`, and (b) the relevant codebase files mapped for the phase. You also analyze all previously completed phases so the new content aligns with them.
- **2.2 Apply** — You apply the approved plan and nothing else. You respect everything that must be respected, and you do not touch anything untouchable.
- **2.3 Validate** — You validate that the approved plan was applied properly: constraints respected, untouchable content untouched, zero mismatch from top to bottom, and only the approved plan used unless I explicitly requested otherwise.
- **2.4 Found issue** — If validation finds any issue, you go back to 2.1 and repeat the loop.
- **2.5 GREEN** — If and only if everything is GREEN, you present what was applied and prepare for the next phase.
- **2.6 Summary and commit** — You provide a summary and confirm you are ready to commit what is done on the local branch `project-planning-and-specifications`. If there are uncommitted changes, you never create a new branch — you always use `project-planning-and-specifications`. You commit only if I confirm; otherwise you ask.
- **2.7 Confirm ready** — You confirm you are ready for the next cycle.

## Non-Negotiable Instructions

1. Do not implement, modify, refactor, or generate application code. This process produces documentation only.
2. Create a single exhaustive specification document, `docs/specification.md`, under `docs/`.
3. Exhaustively analyze every single line of `docs/initial-doc.md` before writing final documentation, phase by phase.
4. Use `docs/initial-doc.md` as the complete initial source brief.
5. Use all facts from codebase analysis plus all facts from `docs/initial-doc.md`.
6. Do not skip any information from `docs/initial-doc.md`.
7. Fill the missing business rules, model fields, APIs, UI behavior, or implementation details.
8. If a required detail is not present in `docs/initial-doc.md`, ask the user for clarification.
9. If package versions differ from notes, use `backend/package.json` and `client/package.json` as the single source of truth.
10. If project version wording refers to an older version, use V2.
11. After the generated specification exists, `docs/initial-doc.md` must no longer be needed for implementation. Every fact from it must be copied into `docs/specification.md`. Never delete `docs/initial-doc.md` unless I explicitly ask you to.
12. The specification is not to withhold information; instead it is a single source of truth that will be used by the AI for implementation of the project without a single deviation. Therefore, the specification must be exhaustive, strict, answer every single question and cover every single detail so the AI can implement the project using the specification alone, without making a single mistake.

## Target Document: docs/specification.md

You build one single exhaustive specification document at `docs/specification.md`. At minimum it covers the following sections (add more if codebase analysis or `docs/initial-doc.md` shows a need):

- [ ] Addis AI
- [ ] AI Prompt Spec
- [ ] Analytics
- [ ] API Contract
- [ ] Architecture
- [ ] Audio Recording STT
- [ ] Auth Cookies
- [ ] Backend Architecture
- [ ] Resource Management
- [ ] Business Rules
- [ ] Checklists
- [ ] Coding Conventions
- [ ] Data Modeling
- [ ] Decision Log
- [ ] Design
- [ ] Environment Config
- [ ] Error Handling
- [ ] Export Spec
- [ ] File Storage Uploads
- [ ] Frontend Architecture
- [ ] Git Workflow
- [ ] Glossary
- [ ] Implementation Plan
- [ ] JSDoc Standards
- [ ] Logging
- [ ] Mock Data Seeding
- [ ] MUI Component Standards
- [ ] Non-Functional Requirements
- [ ] Other AI Providers
- [ ] Phase Protocol
- [ ] PRD
- [ ] Problem Statement
- [ ] Profile Management
- [ ] Project Directory Structure
- [ ] Project Overview
- [ ] React Hook Form Standards
- [ ] Redux RTK Query
- [ ] Report Domain
- [ ] Report Format
- [ ] Report Management
- [ ] Requirements
- [ ] Risk Register
- [ ] Routing Layout
- [ ] Rules
- [ ] Security
- [ ] Source Traceability
- [ ] Status Machine
- [ ] Tasks
- [ ] Theme Standards
- [ ] Transcription Review
- [ ] UI/UX Spec
- [ ] User Interactions
- [ ] User Stories
- [ ] Validation Audit
- [ ] Work Flow

### Required Content For Key Specifications

#### `prd.md`

Include:

- Product vision.
- Target user.
- Problem statement.
- Real-world context.
- Core workflow.
- Supporting features.
- Product principle.
- Success outcomes.
- Scope and out-of-scope, using only stated information.
- Open questions for missing product details.

#### `requirements.md`

Include:

- Functional requirements.
- Non-functional requirements references.
- Authentication requirements.
- Branch requirements.
- Report requirements.
- Audio recording requirements.
- STT requirements.
- AI report generation requirements.
- Transcription requirements.
- Export requirements.
- User, profile requirements.
- Analytics requirements.
- UI requirements.
- Security requirements.
- Validation and error-handling requirements.
- Acceptance criteria for every requirement.
- Source trace for every requirement.

#### `design.md`

Include:

- Overall system design.
- Backend design.
- Frontend design.
- Data design.
- API design.
- Authentication design.
- Audio/STT design.
- AI report generation design.
- Export design.
- UI/UX design for every single page.
- Design constraints copied from `docs/initial-doc.md`.
- Explicit links to detailed design documents such as architecture, backend architecture, frontend architecture, data modeling, API contract, UI/UX spec, and workflow.
- Open design decisions for anything not specified.

#### `Data-modeling`

Include:

- Every model/domain explicitly required or implied by the source and codebase.
- For each model: purpose, fields, types, required/optional, defaults, enums/statuses, indexes, relationships, hooks, instance methods, static methods, virtuals, pagination, validation, security considerations, and session/transaction behavior.
- Do not invent fields. If a field is required by source text, include it. If a field is needed but not specified, mark `Not specified` and ask the user.
- Explicitly include rules for every single model.

#### `Api-contract`

Include:

- Backend route conventions under `/api/v1`.
- Route aggregation through `routes/index.js`.
- Request and response shapes.
- Success response shape.
- Error response shape.
- Auth cookie behavior.
- Refresh-token behavior.
- Branch endpoints.
- Report endpoints.
- Audio upload/STT endpoints.
- AI report generation endpoints.
- Transcription endpoints.
- User endpoints.
- OAuth Google route.
- Pagination query rules.
- Validation error rules.
- Addis AI provider endpoint details as backend service dependencies.
- Ask the user for unspecified endpoint paths.

#### `Work-flow` and `User-interactions`

Include every single user interaction from:

- Landing/Register/login/logout.
- Protected-route access.
- Public-route behavior.
- User, Profile setup/use in reports.
- Resource create/list/view/update/archive/delete/restore where supported by source.
- Audio recording.
- Audio playback.
- Re-recording.
- File-size validation after recording stops.
- Uploading audio.
- Transcription.
- Re-transcription.
- AI transcription review/correction.
- Report generation.
- User review of generated report.
- Correction/update prompts.
- Export to PDF/TXT/CSV/spreadsheet/Google Docs API.
- Multi-branch report flow.
- Error states.
- Loading states.
- Unauthenticated states.

Do not invent UI screens beyond what is required. If a necessary screen is not specified, fill the gap.

#### `Report Generation AI Prompt Spec`

Include:

- Final system prompt requirements.
- Report format.
- Report samples.
- Tone rules.
- Amharic language rules.
- English/technical word transliteration rules.
- Missing-information rules.
- Multi-branch rules.
- Correction/update behavior.
- Prohibition against invented dates, branches, times, actions, people, problems, opinions, and unrelated conversation content.
- Requirement that reviewed transcription is the source of truth.

#### `Audio Recording STT pipeline`

Include:

- MediaRecorder rules.
- Local component state rule.
- No Redux/localStorage persistence for raw audio.
- MIME priority.
- Client-side 50 MB, 15 MIN validation after recording stops/pause.
- Backend upload handling with multer.
- Temporary upload directory and gitignore requirement.
- Addis AI STT endpoint details.
- 60-second provider constraint.
- Full-file ffmpeg WAV conversion using `pcm_s16le`, `16kHz`, mono.
- In-memory PCM-level WAV split.
- Chunk MIME type must be `audio/wav`.
- Re-transcription requirement.
- Accuracy regression blocking rule.

#### `Addis AI Integration`

Include:

- Provider identity.
- Official source links from the source brief.
- Base URL and platform URLs.
- API key rules.
- Text model.
- STT model family.
- STT endpoint.
- Text generation endpoint.
- Request and response shapes.
- Error mapping.
- Retry/backoff guidance for safe cases.
- Backend-only proxy rule.
- Security and logging rules.
- Translation, TTS, multimodal, and realtime notes with first-workflow scope.

#### `Other AI Providers`

Include:

- Addis AI always handles STT.
- Nvidia and Gemini will be used in addition to Addis AI.
- All AI must be free, with no credit card or subscription.
- Never use non-free AI.
- Gemini model `gemini-3.1-flash-lite`.
- Nvidia model `z-ai/glm-5.2` at least for now.
- API keys stored only in `backend/.env`.

#### `UI/UX Spec`

Include:

- English UI shell language.
- Amharic/mixed report and audio content.
- Responsive layout rules.
- For every single page:
- Fixed chrome and scrollable content rules.
- Text overflow/ellipsis rules.
- Mobile icon rules.
- Public and protected layouts.
- Sidebar behavior.
- PublicAppBar logo behavior.
- Loading, error, empty, and validation states.
- MUI component standards references.

#### `rules.md`

Include every rule from the initial source document, organized by category:

- Stack/language rules.
- Backend rules.
- Frontend rules.
- Redux/API rules.
- MUI rules.
- React Hook Form rules.
- AI rules.
- Audio/STT rules.
- Report-generation rules.
- Security rules.
- Environment rules.
- Git rules.
- File-creation rules.
- Code-quality rules.
- JSDoc rules.
- Validation/audit rules.

#### `Tasks And Implementation Plan`

Create a complete implementation plan with phases, tasks, and sub-tasks.

For every phase:

- Include phase title.
- Include objective.
- Include scope.
- Include files likely to be created or modified.
- Include dependencies on earlier phases.
- Include acceptance criteria.
- Include validation commands.
- Include documentation compliance checklist.
- Include user-visible result.
- Include the full six-step git protocol:
  1. Pre-Git requirement.
  2. Comprehensive codebase analysis.
  3. Analysis of all previously implemented phases.
  4. Phase execution without deviation, implementation validation with `docs/*`, specification and checklists. Never present to the user unless the implementation is green.
  5. User review and feedback integration.
  6. Post-Git requirement.
- State clearly that Step 6 requires explicit user approval.

Do not start implementation. The output is documentation only.

## Specification Quality Requirements

Every section of the generated specification document must:

- Be complete enough for a future AI implementation agent to follow without returning to `docs/initial-doc.md`.
- Preserve all relevant facts from `docs/initial-doc.md`.
- Avoid invented details; instead ask the user if it is necessary.
- Use clear headings.
- Use tables where they improve traceability.
- Include acceptance criteria where relevant.
- Include validation/audit expectations where relevant.
- Use V2 terminology.
- Follow the no-implementation restriction.

## Phase Map

Each phase N (1–35) reads `docs/initial-doc.md` section N and produces/updates the specification sections listed. The codebase areas column tells you what to analyze on top of the source section. Phases also cross-align with everything already green in `docs/specification.md`.

| Phase | initial-doc.md section | specification.md sections to produce/update | Codebase areas to analyze |
|---|---|---|---|
| 1 | 1. Project Identity | Project Overview, Problem Statement, Glossary, PRD, Requirements, Decision Log | `README`, root `package.json`, repo structure |
| 2 | 2. Problem Statement | Problem Statement, PRD, Requirements, User Stories | — (source only) |
| 3 | 3. Manual Reporting Mental Model | PRD, Work Flow, User Interactions, Report Domain | — (source only) |
| 4 | 4. Supporting Features Needed Because Of The Core Problem | PRD, Requirements, User Stories, Report Management | — (source only) |
| 5 | 5. Report And Branch Domain | Report Domain, Data Modeling, Business Rules, API Contract, Status Machine, Report Management | `backend/models`, `backend/routes` |
| 6 | 6. Report Format, Samples, And Tone | Report Format, AI Prompt Spec, Export Spec | — (source only) |
| 7 | 7. Language Rules | AI Prompt Spec, Report Format, UI/UX Spec | — (source only) |
| 8 | 8. Transcription Accuracy Requirement | Audio Recording STT, Transcription Review, Validation Audit | — (source only) |
| 9 | 9. Technical Stack And Package Rules | Rules, Coding Conventions, Architecture, Requirements, Project Directory Structure | `backend/package.json`, `client/package.json` |
| 10 | 10. Backend Architecture | Backend Architecture, Architecture, API Contract, Project Directory Structure | `backend/` structure, `backend/server.js`, `backend/app.js` |
| 11 | 11. Authentication, Authorization, Cookies, And Tokens | Auth Cookies, Security, API Contract, Data Modeling | `backend/controllers/auth`, `backend/middleware`, User model |
| 12 | 12. Frontend Architecture | Frontend Architecture, Routing Layout, UI/UX Spec, MUI Component Standards, Project Directory Structure | `client/src` structure, `client/src/App.jsx`, routes |
| 13 | 13. Redux, RTK Query, And API Client | Redux RTK Query, Rules, Frontend Architecture | `client/src/redux`, `client/src/api` or slices |
| 14 | 14. MUI, MUI X, Theme, And Component Standards | MUI Component Standards, Theme Standards, UI/UX Spec | `client/src/theme`, `client/package.json` MUI deps |
| 15 | 15. React Hook Form Standards | React Hook Form Standards, Validation Audit, UI/UX Spec | `client/package.json`, existing forms |
| 16 | 16. UI Rules | UI/UX Spec, User Interactions, Rules | `client/src/components`, layouts |
| 17 | 17. Environment Variables | Environment Config, Security, Rules | `.env.example`, `backend/config` |
| 18 | 18. Addis AI Integration | Addis AI, AI Prompt Spec, API Contract, Security | `backend/services`, `backend/controllers` AI usage |
| 19 | 19. Other AI Providers | Other AI Providers, Addis AI, AI Prompt Spec | `backend/services`, `backend/.env` keys |
| 20 | 20. Audio Recording And STT Pipeline | Audio Recording STT, Transcription Review, API Contract, Data Modeling | `client/src/components` recorder, `backend/routes` upload/STT |
| 21 | 21. AI Prompt Requirements | AI Prompt Spec, Report Format, Rules | `backend/services` prompt construction |
| 22 | 22. Export | Export Spec, API Contract, Work Flow | `backend/controllers` export, `client` export UI |
| 23 | 23. Mock Data | Mock Data Seeding, Data Modeling, Tasks | `backend/seed`, scripts |
| 24 | 24. Data Model | Data Modeling, API Contract, Business Rules, Report Domain | `backend/models` all models |
| 25 | 25. Project Directory Structure | Project Directory Structure, Coding Conventions, Architecture | full repo tree |
| 26 | 26. Code Quality And Coding Conventions | Coding Conventions, Rules, JSDoc Standards, Checklists | `.eslintrc`, `backend/` and `client/` sample code |
| 27 | 27. JSDoc Conventions | JSDoc Standards, Coding Conventions | sample documented files |
| 28 | 28. Error Handling Patterns | Error Handling, API Contract, Validation Audit | `backend/middleware`, error classes |
| 29 | 29. Security | Security, Requirements, Environment Config, Rules | `backend/middleware`, auth, `.env` |
| 30 | 30. New File Creation Rules | Rules, Checklists, Project Directory Structure | — (source only) |
| 31 | 31. Validation And Audit | Validation Audit, Checklists, Source Traceability, Non-Functional Requirements | `docs/initial-doc.md` cross-check |
| 32 | 32. Git And Phase Protocol | Git Workflow, Phase Protocol, Tasks And Implementation Plan | git history, branch state |
| 33 | 33. Decision Log (ADRs) | Decision Log | prior ADRs if any |
| 34 | 34. Glossary | Glossary, Requirements | — (source only) |
| 35 | 35. Archive, Delete, And Restore Lifecycle | Report Management, Data Modeling, Business Rules, Work Flow | `backend/models`, resource routes |
| 36 | Final Consolidation (no source section) | Full `docs/specification.md` | everything |

### Phase 36: Final Consolidation

When all phases 1–35 are GREEN and committed, run the consolidation phase:

1. Sweep `docs/initial-doc.md` line-by-line and verify every fact, rule, and constraint appears in `docs/specification.md`. Report any gap.
2. Tick every checkbox in the Required Output Sections list; add any missing section.
3. Resolve every open question with me; nothing stays "unspecified" without a documented decision.
4. Validate every acceptance criterion and validation/audit expectation is present.
5. Validate zero-deviation strictness: the spec answers every question an implementation AI would ask.
6. Run the final quality gate, present the summary, and confirm readiness for the final commit (branch `project-planning-and-specifications`, commit only on my confirmation).
7. Confirm to me that `docs/initial-doc.md` is no longer needed for implementation.

## Key Rules

- **Plan mode is read-only.** You do not modify any files during planning. You ask questions and present plans, but nothing is written.
- **Build mode writes.** Only after I say "proceed", "output it", or similar does writing happen.
- **One phase per cycle.** Each loop covers exactly one phase. No jumping ahead, no skipping.
- **Corrections are iterative.** I place comments in the doc or tell you what to change. You fix, I verify, then we move to the next phase.
- **The Build Loop (2.1–2.7) is mandatory for every phase.**
- **The commit gate (2.6) runs after every GREEN cycle**, before you prepare the next phase. Always on branch `project-planning-and-specifications`; never create a new branch; commit only after my confirmation.
- **`docs/initial-doc.md` is untouchable during the whole process.** It is the source, not the target. If I ever request a change to `docs/initial-doc.md`, after that build cycle you run `python scripts/verify-initial-doc.py` — it must exit 0 (SELF-ALIGNED).
- **No deletion without my decision.** No document is deleted unless I explicitly ask. Any working docs that may exist at any point are never deleted on your own initiative — deletion is always my decision.
- **Tables are allowed** in `docs/specification.md` content where they improve traceability.
- **No implementation.** This process is documentation only, from the first phase to the last.
- **Ask, don't invent.** Any required detail missing from `docs/initial-doc.md` or the codebase is a question to me, never a guess.
- **V2 terminology everywhere.**
