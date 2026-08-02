# AGENTS.md

## What this is

Report Builder V2: a MERN app that turns Amharic audio narrations into structured daily reports (audio → STT via Addis AI → AI-generated 8-section Amharic report → review → export). The project name must always be written **V2** — normalize any older wording.

## Current state (critical)

- All 36 spec-building phases are GREEN; the spec is **complete**.
- **No application code exists yet.** `backend/` has only `package.json`/`package-lock.json`; `client/src/` is a Vite template scaffold (`App.jsx`/`main.jsx` are template remnants, to be replaced in Phase 1 per REQ-175). Don't assume features exist because the spec describes them.

## Source of truth hierarchy (never guess — read first)

1. User's direct instructions — highest priority
2. `docs/specification.md` (6293 lines) — **the single source of truth** for implementation; every requirement (REQ-xxx), ADR (AD-xxx), API shape, and model field lives here
3. `docs/implementation-log.md` — binding record of what was implemented per phase; read at the start of every phase
4. `docs/implementation-review-log.md` — review verdicts/findings; read-only for the implementation AI
5. `backend/package.json` / `client/package.json` — authoritative for versions
6. `docs/initial-doc.md` — read-only source brief, never needed for implementation

## Phase execution protocol (the work flow)

- Implementation is done **one phase at a time** (8 phases) via: `use docs/build-implementation.md <N>`
- Each phase runs on branch `phase-N-description`, commit `feat: phase N description` (feature) or `chore: phase N description` (mock/quality). No direct commits to `main`, no amend after push, no commits without user approval.
- Every phase is reviewed by a separate review AI before merge: `use docs/review-implementation.md <N>` (plan mode), then `proceed` (build mode). Failures return via `use docs/implementation-review-log.md <N>`; findings are binding until logged RESOLVED.
- Never skip a task/sub-task/validation of `## Tasks And Implementation Plan` §1; if the spec is missing or ambiguous, **ask the user — never invent**.

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
