# AGENTS.md

## What this is

Report Builder V2: a MERN app that turns Amharic audio narrations into structured daily reports (audio → STT via Addis AI → AI-generated 8-section Amharic report → review → export). The project name must always be written **V2** — normalize any older wording.

## Current state (critical)

- All 36 spec-building phases are GREEN; the spec is **complete**.
- **No application code exists yet.** `backend/` has only `package.json`/`package-lock.json`; `client/src/` is a Vite template scaffold (`App.jsx`/`main.jsx` are template remnants, to be replaced in Phase 1 per REQ-175). Don't assume features exist because the spec describes them.

## Source of truth hierarchy (never guess — read first)

1. User's direct instructions — highest priority
2. `docs/specification.md` (6293 lines) — **the single source of truth** for implementation; every requirement (REQ-xxx), ADR (AD-xxx), API shape, and model field lives here
3. `docs/implementation-log.md` — binding record of what was implemented per phase; **written by the implementation AI (Post-Git step), read by both AIs**; read at the start of every phase
4. `docs/implementation-review-log.md` — review verdicts/findings; **written and maintained ONLY by the review AI, read-only for the implementation AI**
5. `backend/package.json` / `client/package.json` — authoritative for versions
6. `docs/initial-doc.md` — read-only source brief, never needed for implementation

## The two AI roles (who builds, who verifies)

Development is a strict two-agent loop: an **implementation AI** builds each phase; an independent **review AI** verifies it before merge. A session's role comes from the command issued (see below).

### Implementation AI
- **Role / responsibility:** MERN engineer acting per `docs/build-implementation.md` — implements phases 1–8 exactly per `docs/specification.md`, executing every task, sub-task, and validation.
- **READ access:** the entire codebase and everything under `docs/` — including `docs/implementation-review-log.md` (findings are read-only for it and must be read in the fix loop).
- **WRITE access:** application code, `docs/specification.md` alignments, and `docs/implementation-log.md`. **Never writes to `docs/implementation-review-log.md`.**
- Never commits/pushes without the user's explicit approval (Post-Git step requires it).

### Review AI
- **Role / responsibility:** independent verification agent acting per `docs/review-implementation.md` — it does **not** build, fix, refactor, or commit; it exhaustively reviews every codebase change (git + working tree) against the phase tasks and `docs/specification.md` and reports exactly what is wrong/required.
- **READ access:** the entire codebase and everything under `docs/`.
- **WRITE access:** **only `docs/implementation-review-log.md`** — phase verdicts and findings, maintained in place (`OPEN` → `RESOLVED`). Never writes code, other `docs/` files, or scripts.

### How a session picks its role
The AI infers its role from the last issued command: `use docs/build-implementation.md <N>` → implementation AI; `use docs/review-implementation.md <N>` → review AI; `use docs/implementation-review-log.md <N>` → implementation AI in fix-loop mode. If no workflow command was issued, act read-only (research/planning only: no code changes, no review-log writes).

## The workflow commands

### `use docs/build-implementation.md <N>` → implementation AI runs phase N
1. **Pre-Git:** verify branch `phase-N-description`, clean working tree, remote, and history.
2. **Deep codebase analysis:** every `docs/specification.md` section relevant to phase N plus the actual code.
3. **Prior-phase analysis:** phase N−1's record in `docs/implementation-log.md`.
4. **Implementation:** execute phase N with absolute adherence — never skip a task/sub-task/validation of `## Tasks And Implementation Plan` §1 — and run all per-phase, per-task, per-sub-task, and global validations plus every verification gate below.
5. **Present** the phase to the user.
6. **Post-Git (only with the user's explicit approval):** record the phase in `docs/implementation-log.md`, align `docs/specification.md`, verify, commit on `phase-N-*` (`feat:` feature / `chore:` mock/quality), push, present.
→ Next is the review gate: `use docs/review-implementation.md <N>`.

### `use docs/review-implementation.md <N>` → review AI reviews phase N (plan mode)
1. Identify **every** codebase change (git + working tree) of phase N.
2. Verify every task/sub-task + inline validation of `## Tasks And Implementation Plan` §1 against the code.
3. Verify the `docs/specification.md` columns, naming, and conventions; run the gates (`node --check` on every backend file; `npx vite build` with 0 errors then delete `dist/`; `python scripts/verify-initial-doc.py` exit 0; `npm run lint`; per-file audits).
4. Verify logical/cross-phase consistency, edge cases, security, no scaffolding/leftovers, no secrets.
5. Report the verdict verbally, without writing; ask the user on any spec gap or conflict — never invent.
Then, on build mode + `proceed`: write the phase verdict into `docs/implementation-review-log.md` — **GREEN** (per spec and sound; merge after the user's approval) or **FAIL** with binding findings grouped as *specification deviations / invalid business logic implemented / edge cases to be handled / conflicts to be resolved / other required actions* — each `OPEN` and stating exactly what the implementation AI must do.

### `use docs/implementation-review-log.md <N>` → implementation AI applies the fix loop
1. Read phase N's entry in `docs/implementation-review-log.md` (**read-only**; findings are binding until logged `RESOLVED` in place by the review AI).
2. Return to Step 2 (deep code + spec analysis) and apply **every** `OPEN` finding.
3. Record the corrections in `docs/implementation-log.md`, re-align `docs/specification.md`, re-verify.
4. Re-present; the review AI re-reviews (`use docs/review-implementation.md <N>`) until it logs **GREEN**; then the user approves the merge (branch merged and closed, next phase).

## Verification gates (all must pass per phase)

- `node --check` on every backend file
- `npx vite build` with 0 errors, then delete `dist/`
- `python scripts/verify-initial-doc.py` — must exit 0
- `npm run lint` (client only; there is **no backend lint**)
- Per-file audits: no unused imports/vars/params (`_`-prefix unused ones), JSDoc on every file, no magic values, `httpStatus` imports, no deprecated MUI props

## Commands

- Client: `npm run dev` (port **3000**), `npm run build`, `npm run lint`, `npm run preview` — run in `client/`
- Backend: `npm run dev` (nodemon), default port **4000** — run in `backend/`
- `client/.env` exists (gitignored): `VITE_API_BASE_URL`, `VITE_APP_NAME`; backend needs `backend/.env` with the 22 required vars of `## Environment Config` §2 (absent keys fail startup in `config/env.js`)

## Conventions that differ from defaults (spec-mandated)

- **Backend**: `config/env.js` is the *sole* `process.env` access point; frozen `utils/constants.js` holds all constants (no magic values); `utils/httpStatus.js` for HTTP codes; fixed middleware order `helmet -> cors -> compression -> cookie-parser -> mongo-sanitize -> rate-limit`; error envelope `{ success: false, message, data }`; 422 validation shape `{ success: false, message: 'Validation failed', data: { errors: [...] } }`; user IDs via `req.user._id.toString()`; per-domain files `<domain>.{controller,routes,validator,model}.js`; ES modules; **no `console.log`** in backend (Winston); no zod (manual resolvers); no TypeScript — JSDoc is the type layer
- **Frontend**: React 19 + MUI v9 + Redux Toolkit/RTK Query; **React Compiler enabled** in `vite.config.js`; kebab-case file names; `handle`-prefixed event handlers; pages lazy-loaded; forms via react-hook-form; env only via `import.meta.env.*` (no keys in frontend code)
- **Secrets**: `.env` is the first line of root `.gitignore`; never commit `.env`, `backend/logs/`, `backend/uploads/audio/`; API keys live only in `backend/.env`
