# Implementation Review Log — Phase Verdicts, Findings, And Required Fixes

> This log is the **review record** of the implementation phases of Report Builder V2. It is written and maintained **exclusively by the review AI** (invoked with `use docs/review-implementation.md <N>`). The **implementation AI has read-only access** — it reads this log in the fix loop (`use docs/implementation-review-log.md <N>`), applies the findings, and never writes here. **Every finding is binding until confirmed fixed**; when a fix is confirmed, the review AI updates the finding **in place** (`OPEN` → `RESOLVED`) and re-states the confirmed outcome; no finding is left stale. A phase is merged only after its verdict is GREEN and the user approves.

## How To Read This Log (conventions — both AIs must follow)

- One finding = one block with fixed labels. No prose paragraphs, no run-on sentences.
- Labels: `Severity` (`BLOCKING`/`HIGH`/`MEDIUM`/`LOW`/`INFO`) · `Status` (`OPEN`/`RESOLVED`) · `What` (the defect) · `Where` (file:line evidence) · `Spec` (the violated requirement) · `Must` (the binding instruction for the implementation AI) · `Accept when` (the re-review check) · `Resolution` (appended by the review AI only after re-verification).
- `Must` is binding. `Accept when` defines when the review AI may mark the finding `RESOLVED`.
- `file:line` references are evidence, never speculation.
- Findings keep stable IDs (`F-<phase>-<number>`). Historical findings from before IDs were introduced are titled descriptively.
- A phase is mergeable when its verdict is **GREEN** and it has **zero** `OPEN` findings.
- Phase entries carry a provenance row (reviewed date/round and scope) so re-verification can target the right commit.

## Status Legend

| Status | Meaning |
|---|---|
| `PENDING` | Phase implemented but not yet reviewed. |
| `GREEN` | Review passed — the phase is per the specification and logically sound; nothing outstanding; the phase can be merged after user approval. |
| `FAIL` | Review found issues — the findings below are binding for the implementation AI; the phase re-enters the fix loop until a re-review logs GREEN. |

Per-finding status (updated in place by the review AI):

| Finding status | Meaning |
|---|---|
| `OPEN` | Raised by the review AI; not yet fixed and confirmed. |
| `RESOLVED` | The implementation AI fixed it and the review AI re-verified it; the finding statement is updated in place to the confirmed outcome. |

## How To Use This Log

- **Review AI** — after the user says `use docs/review-implementation.md <N>` (plan mode) and then `proceed` (build mode): review the phase exhaustively, then record the phase entry below — verdict, gates, and findings. The findings state **exactly what the implementation AI must do**. Update the status table.
- **Review AI update rule** — when the implementation AI returns a fixed phase and the fix is confirmed by re-verification, update the findings in place: `RESOLVED` with the confirmed outcome, and flip the phase verdict to `GREEN` when nothing remains open. Never delete a finding; never leave an outdated statement.
- **Implementation AI** — when the user says `use docs/implementation-review-log.md <N>`: read the phase entry (read-only), return to Step 2 (Deep Codebase Analysis) of `## Phase Protocol`, apply **every** `OPEN` finding, record the corrections in `docs/implementation-log.md` (Step 6 action 1), and re-present the phase for re-review. Never write to this log.

## Status

| Phase | Verdict |
|---|---|
| 1 | GREEN |
| 2 | GREEN |
| 3 | GREEN |
| 4 | GREEN |
| 5 | FAIL |
| 6 | PENDING |
| 7 | PENDING |
| 8 | PENDING |

## Log

## Phase 1 — Foundation

| Field | Value |
|---|---|
| Verdict | GREEN |
| Round | Re-review of the fix rounds (rounds 2–3) |

**Summary** — every round-1 finding is confirmed fixed and `RESOLVED` below; nothing remains open; the phase is per the specification and logically sound. Merge after user approval (commit under user control).

**Gates**

| Gate | Result |
|---|---|
| Client `npx vite build` | PASS (0 errors; MUI chunk-size warning only; `client/dist/` deleted) |
| Client `npm run lint` | PASS (exit 0) |

**Specification deviations**

---

#### DM-03 applied to all five models
- Severity: HIGH · Status: RESOLVED
- What: the five models lacked the DM-03 timestamps/toJSON/toObject conventions.
- Where: `backend/models/user.model.js`, `branch.model.js`, `report.model.js`, `audio.model.js`, `transcription.model.js`
- Resolution: all five now set `timestamps: true` and carry the DM-03 transforms deleting `id` and `__v`; User additionally deletes `password` and keeps `virtuals: true` (the `fullName` virtual survives); `report.model.js` `schema.index({ user: 1, createdAt: -1 })` is now valid because timestamps populate `createdAt`. Fix confirmed.

---

#### Validators renamed to the `<domain>.validator.js` pattern
- Severity: HIGH · Status: RESOLVED
- What: validators did not follow the per-domain naming convention.
- Where: `backend/validators/` (`auth`, `branch`, `report`, `audio`, `transcription`, `ai`, `user`, `analytics`.validator.js); `validators/validation.js`
- Resolution: all eight validators renamed (REQ-176/§4 tree naming), route imports updated with zero stale references, and `validation.js` recorded in the `## Project Directory Structure` §4 tree (REQ-173). Fix confirmed.

---

#### REQ-196 error logging fixed
- Severity: MEDIUM · Status: RESOLVED
- What: logger did not emit the status code or stack trace.
- Where: `backend/utils/logger.js`; `backend/middleware/error.middleware.js`
- Resolution: printf now emits `status=<statusCode>` and appends the stack trace; the middleware passes `{ stack, statusCode }`. Runtime evidence in `backend/logs/` daily file: `ERROR status=500 Unexpected error` + full stack. Dev/prod split intact (dev: message + stack in response; prod: generic message, internals in logs only). Fix confirmed.

---

#### DM-04 applied to Transcription
- Severity: LOW · Status: RESOLVED
- What: Transcription could not paginate.
- Where: `backend/models/transcription.model.js`
- Resolution: loads `mongoose-paginate-v2` and registers `transcriptionSchema.plugin(mongoosePaginate)` so T-3-04b list endpoints paginate. Fix confirmed.

**Invalid business logic implemented**

- None.

**Edge cases to be handled**

---

#### Client production build verified by the fix loop
- Severity: MEDIUM · Status: RESOLVED
- What: production build was not verified in round 1.
- Resolution: fix round recorded a 0-error `npx vite build` (MUI chunk-size warning only) with `client/dist/` deleted — `client/dist` is absent from the working tree — and client lint (exit 0) still holds. Fix confirmed.

**Conflicts to be resolved**

---

#### ChatConversation model count (six vs five)
- Severity: MEDIUM · Status: RESOLVED
- What: `## Data Modeling` §1 inventories six persisted models including ChatConversation, while the §4 tree and T-1-08 list five; Phase 1 implemented five (User, Branch, Report, Audio, Transcription).
- Resolution (user decision): Phase 1 stays at five models. Binding for the implementation AI: create `backend/models/chatConversation.model.js` **in Phase 5** (per T-5-02b and AD-010) and update the §4 tree then (REQ-173) — done in Phase 5. Decision confirmed; the Phase 5 action was pending by design and is now delivered.

---

#### Invented password `min: 6` rule removed
- Severity: MEDIUM · Status: RESOLVED
- What: `validateRegister` carried an invented `isLength({ min: 6 })` rule.
- Where: `backend/validators/auth.validator.js`
- Resolution: the rule is gone; password carries only the `notEmpty()` presence check matching `validateLogin` (REQ-083); no invented constraint, no hardcoded validation constant. Final register rules are defined in Phase 2 per T-2-01b. Fix confirmed.

---

#### Spec typo: T-1-04d cited REQ-085 for the console.log ban; the ban is REQ-086 and backend-only
- Severity: LOW · Status: RESOLVED
- Resolution: Step 6 alignment corrected T-1-04d to cite REQ-086 in `docs/specification.md`; the backend remains `console.log`-free (grep-verified). Frontend `console.log` is permitted if needed (user decision). Fix confirmed.

---

#### Step 6 record performed; commit deferred
- Severity: LOW · Status: RESOLVED
- Resolution: the Phase 1 entry of `docs/implementation-log.md` is filled (Implemented, Changes/updates/corrections, Validation results) per Step 6 action 1; commit/push remains under user control. Nothing further required.

**Other required actions**

---

#### `makeQueryWritable` documented
- Severity: LOW · Status: RESOLVED
- What: the Express 5 `req.query` getter-only-accessor shim existed but was undocumented.
- Where: `docs/specification.md` `## Backend Architecture` §5, `## Security` §5
- Resolution: documented with the rationale (express-mongo-sanitize 2.2.0 assigns to `req.query` and would throw); position between cookie-parser and mongo-sanitize preserves the mandated six-step order (REQ-081). Fix confirmed.

---

#### Required-field message convention (clarification)
- Severity: LOW · Status: RESOLVED
- What: question — must model schemas use `required: [true, 'message']`?
- Resolution (evidence-based): no — the canonical model form (`## JSDoc Standards` §11) and every `## Data Modeling` §4 table declare plain `required: true`; custom validation messages are the contract of the express-validator (`withMessage`) and RHF layers. Implemented models already match. Binding (deferred to Phase 2 Step 6, delivered): add modeling rule **DM-08** to `## Data Modeling` §3 — "Required model fields use plain `required: true`; custom validation messages are defined in the express-validator (`withMessage`) and RHF layers — never in model schemas."

---

#### Observations (no action)
- The full `authenticate` middleware exceeds T-1-05a's "stub" wording — justified by S-1-05a (protected route must return 401 before the token contract exists).
- The `/validate` probe endpoints and `/protected` route are temporary scaffolding — replaced by the real contracts in Phase 2.
- `client/src/components/layout/AppErrorBoundary.jsx` is hand-rolled while `react-error-boundary` (installed, unused) is referenced by `## Error Handling` §3 — meets REQ-202's essence; a switch may be considered in a hardening phase. Not blocking.

---

## Phase 2 — Authentication And User Management

| Field | Value |
|---|---|
| Verdict | GREEN |
| Round | Re-review of the fix round (round 4) |

**Summary** — all four round-3 items are `RESOLVED` (**F-2-08**/**F-2-09** restored the spec §8 verbatim copy in `RegisterForm.jsx`; **C-2-01**/**C-2-02** wrote the user decisions into the spec: REQ-095 + §12.4 + §6, and REQ-099 + §12.3 + §14 + §7). Round-1/round-2 findings remain `RESOLVED`. Nothing remains open.

**Gates**

| Gate | Result |
|---|---|
| `node --check` (every backend file) | PASS (39 files) |
| Client `npm run lint` | PASS (exit 0) |
| `python scripts/verify-initial-doc.py` | PASS (exit 0, SELF-ALIGNED) |
| `@mui/material` barrel imports in `client/src` | ZERO |
| Old register copy / old confirmPassword message remnants | ZERO |
| `client/dist` | ABSENT |

**Specification deviations**

---

#### Route objects use `element:` instead of `Component:` on pathless wrappers (REQ-094)
- Severity: HIGH · Status: RESOLVED
- Where: `client/src/main.jsx`
- Resolution: the four pathless routes now use `Component: PublicRoute/PublicLayout/ProtectedRoute/AppShell` (lines 45, 48, 58, 61); zero `element:` usages remain in the route tree; rendering identical under React Router 8.2.0. Fix confirmed.

---

#### `ErrorBoundary: AppErrorPage` never wired into the router (spec §12.5)
- Severity: HIGH · Status: RESOLVED
- Where: `client/src/main.jsx:42`
- Resolution: the root route object now adds `ErrorBoundary: AppErrorPage`, making `AppErrorPage.jsx` live as the router error fallback instead of dead code. Fix confirmed.

---

#### `*` NotFound is a sibling of AppShell instead of inside its children (spec §12.5, §12.6)
- Severity: MEDIUM · Status: RESOLVED
- Where: `client/src/main.jsx:69,72`
- Resolution: `{ path: '*', Component: NotFound }` is now inside AppShell's children (404 renders with shell chrome); `assistant` (line 72) remains the only protected route outside AppShell. Fix confirmed.

---

#### `@mui/material` barrel imports of `useMediaQuery` (REQ-107)
- Severity: MEDIUM · Status: RESOLVED
- Where: `MuiDialog.jsx`, `MuiAppbar.jsx`, `GlobalSearchDialog.jsx`, `AppSidebar.jsx`, `AppShell.jsx`
- Resolution: all five import the deep path default (`import useMediaQuery from '@mui/material/useMediaQuery'`); `useTheme` back on `@mui/material/styles`; grep confirms zero `from '@mui/material'` barrel imports remain; the implementation-log note claiming the barrel was forced is corrected. Fix confirmed.

---

#### GlobalSearchDialog uses raw `@mui/material/Dialog` instead of MuiDialog (REQ-109)
- Severity: MEDIUM · Status: RESOLVED
- Where: `client/src/components/reusable/GlobalSearchDialog.jsx:19,69-78`
- Resolution: composes `MuiDialog` with no raw Dialog import; `fullScreen`, `onClose`, `PaperProps` pass through; the explicit 600px/720px widths, 80vh/70vh heights, and fullscreen rules of §12.3 preserved. Fix confirmed.

---

#### Landing page not implemented — the Phase 1 shell was live UI (spec §12.6 §6; user decision 2026-08-03)
- Severity: HIGH · Status: RESOLVED
- Where: `client/src/pages/Landing.jsx`
- Resolution: renders the §6 hero — centered wrapper `max-width: 1200px` (`mx: 'auto'`, `textAlign: 'center'`), `Description` logo/icon, headline "Build Better Reports" (`typography: { xs: 'h4', md: 'h3' }`), subheadline "Record, transcribe, and generate professional reports with AI" (verbatim), CTAs "Get Started" (contained → `/register`) and "Sign In" (outlined → `/login`) via `MuiButton` + `useNavigate()`; static page (no data fetching, no Redux); both text elements `noWrap`; no horizontal scroll; `displayName` set. Fix confirmed.

---

#### `textAlign` passed as a DOM prop on Typography triggers a React warning (REQ-107; user decision 2026-08-03)
- Severity: MEDIUM · Status: RESOLVED
- Where: `client/src/components/login/LoginForm.jsx`, `client/src/components/register/RegisterForm.jsx`
- Resolution: nav-link Typography now renders as `sx={{ mt: 2, textAlign: 'center' }}`; the only remaining `textAlign=` usages are the legitimate MUI v9 Divider labeled-divider API (`LoginForm.jsx:91`, `RegisterForm.jsx:95`). Fix confirmed.

---

#### Register form header copy deviates from verbatim spec §8 (spec §8 line 3166)
- Severity: MEDIUM · Status: RESOLVED
- Where: `client/src/components/register/RegisterForm.jsx:78-82`
- Resolution: renders the spec-pinned title "Sign Up" (line 79) and subtitle "Create your account to get started" (line 82) exactly; the header-vs-submit-button inconsistency is gone; zero remnants of the old copy. Fix confirmed.

---

#### confirmPassword validation message deviates from verbatim spec §8 (spec §8 lines 3168-3169, REQ-114, §15 rule 5)
- Severity: MEDIUM · Status: RESOLVED
- Where: `client/src/components/register/RegisterForm.jsx:150-151`
- Resolution: uses `value === values.password || "Passwords must match"` — the exact pinned message; the RHF two-argument validate form is retained (functional equivalence confirmed). Fix confirmed.

**Invalid business logic implemented**

- None.

**Edge cases to be handled**

- None.

**Conflicts to be resolved**

---

#### DM-08 modeling rule required by the Phase 1 review was not added in Phase 2 Step 6
- Severity: MEDIUM · Status: RESOLVED
- Where: `docs/specification.md` `## Data Modeling` §3 (line 1973)
- Resolution: the DM-08 row now exists — "Required model fields use plain `required: true`; custom validation messages are defined in the express-validator (`withMessage`) and RHF layers — never in model schemas." Exactly as required; correction recorded in the Phase 2 implementation-log entry. Fix confirmed.

---

#### PublicRoute Landing exception vs REQ-095 / §12.4 / §6 (user decision 2026-08-03)
- Severity: MEDIUM · Status: RESOLVED
- What: authenticated users may view `/` (Landing) but not `/login`, `/register`, or any other public page; the spec texts were stale.
- Where: `client/src/components/routes/PublicRoute.jsx`
- Resolution: `if (isAuthenticated && location.pathname !== '/')` → redirect; the spec now states the Landing exception in all four required places — the §12.4 table row, REQ-095 (requirement + acceptance criteria), the §6 Landing bullet, and the §12.4 `PublicRoute` detail — and the pathname-based guard matches the aligned text. Fix confirmed.

---

#### GlobalSearchDialog and auth-page logo sizes vs REQ-099 §12.3 and spec §7 (user decisions 2026-08-03)
- Severity: MEDIUM · Status: RESOLVED
- What: settled values — GlobalSearchDialog 600px wide / 80vh tall in both tiers, large-viewport cutoff at `up('md')`; login/register/landing logos at 24px (`fontSize="large"`), no fixed-pixel sizes.
- Where: `client/src/components/reusable/GlobalSearchDialog.jsx`; `Landing.jsx`/`LoginForm.jsx`/`RegisterForm.jsx`
- Resolution: `GlobalSearchDialog.jsx` matches (600/600/80vh, `up('md')`); logos use `fontSize="large"` + `color="primary"`; spec §12.3 table row, REQ-099, and §14 GlobalSearchDialog detail all read the settled values; spec §7 logo rule now reads `fontSize="large"` + `color="primary"` — MUI props only, no fixed-pixel icon sizes. Fix confirmed.

**Other required actions**

---

#### Answered verification question (no action) — all controller `throw`s reach the global error handler
- Verified: every controller handler is wrapped in `express-async-handler` (REQ-199, §10.3, §28.1), so every `throw new CustomError(...)` (400/401/409/503) reaches the global `error.middleware.js`. All seven `auth.controller.js` handlers + both `user.controller.js` handlers are `asyncHandler`-wrapped. The only internal catch (`googleOAuthCallback`'s OAuth exchange) is deliberate flow control. `next(error)`-in-catch exists only in unwrapped middlewares (`authenticate.middleware.js:27,32,37`, `notFound.middleware.js:16`). No unused `next` parameter remains (`error.middleware.js:31` uses the `_next` prefix convention).

---

#### Verified clean in round 3 (record for the record)
- `authSlice.js` endpoint renamed `me` → `getMe` (RTK Query derives `useGetMeQuery`; URL stays `GET /api/v1/auth/me`); `LoadingSpinner.jsx` moved all system props into `sx` (MUI 9.2.0); `GlobalSearchDialog.jsx` uses `slotProps.paper` instead of the removed `PaperProps` + Close clear button via `useWatch`; `MuiAppbar.jsx` public left section is a single clickable logo unit (name hidden on xs) with the protected variant logo-less per user decision; `AppSidebar.jsx` nav `flex: '0 0 auto'`, mini-mode `ListItemIcon minWidth: 16`, logo clickable → `/`; `PublicLayout.jsx` `marginTop: { xs: 7, sm: 8 }`; `MuiDialog.jsx` adds the user-requested `contentSx` prop. JSX-wide grep: every remaining styled prop is a legitimate MUI prop — zero leaked system props.

---

#### Verified clean — gates and live evidence
- All 39 backend files pass `node --check`; client lint exit 0; `python scripts/verify-initial-doc.py` exit 0 (SELF-ALIGNED); no `console.*` in the backend; `process.env` confined to `config/env.js`; `.env` first line of `.gitignore`; `backend/logs/` and `backend/uploads/audio/` ignored; backend boot + live e2e evidence in `backend/logs/backend-2026-08-03.log`. Auth contract verified exact: REQ-090 name extraction, REQ-089 bcrypt compare, REQ-087 rotation/replay rejection, cookie pair 15m path `/` + 7d path `/api/v1`, httpOnly/lax/secure-in-prod; rate tiers (global 100/15min in `app.js`, auth 20/15min on register/login); middleware order; OAuth stub (503, scopes incl. `drive.file` per REQ-158/AD-012, match-or-create by email); `baseQueryWithReauth` refresh→retry→logout with `AUTH_NO_REFRESH_PATHS`; guards per REQ-095; shell per REQ-096; sidebar per REQ-097; GlobalSearchDialog per REQ-099; Login/Register copy and data flows per spec §7–§8.

---

#### Observations (no action)
- `MuiDialog.jsx` gains the custom `contentSx` prop (REQ-108 §14.2: wrappers carry "no custom API surface") — user-requested; Dialog has no content slot, so a custom prop is the only way to control content padding. Accepted.
- REQ-097 says the temporary drawer "opens via the header menu icon"; the implementation opens it via AppShell's floating menu icon with the AppSidebar header icon closing it on mobile — functionally equivalent (the header icon is unreachable while the drawer is closed). Accepted.
- Login/Register outer container implements `minHeight: '100%'` inside a `100vh` flex root where spec §7 states `minHeight: calc(100vh - 64px)` — same visual result within PublicLayout. Accepted.

---

## Phase 3 — Domain Models And Core Reporting

| Field | Value |
|---|---|
| Verdict | GREEN |
| Round | Fresh full-cycle re-review of the final state |

**Summary** — verdict **GREEN** reconfirmed; the `RESOLVED` statements below (F-3-01..F-3-04, C-3-01, live smoke) stand as written; **F-3-05** stands as the binding Phase 8 alignment note. The two user-reported corrections were re-verified first-hand: (1) **`req.validated` nested-per-location shape** — `backend/validators/validation.js:33-37` builds `{ body, params, query }` per spec §10.10, and all eleven controller access sites read `req.validated.body` (auth 139/161, user 29, branch 59/79, report 109/140, transcription 24/98, audio 25) — the 500-on-every-create defect class is eliminated; (2) **`_id` identity convention** — `MuiDataGrid.jsx:45` keys rows via `getRowId` defaulting to `(row) => row._id`; grep finds zero `id` reads from API docs; columns, `BranchSelectorDialog`, `ReportFilterDialog`, `BranchFormDialog`, `GlobalSearchDialog`, and `ReportDetails` all use `_id` (DM-03 strips the `id` virtual). Spec additions this phase (client identity convention in `## Redux RTK Query` §2 + §9.6 `getRowId`; MuiEmptyState §9.10; MuiDialog `contentSx` retirement + 400px cap in §14/§5; v9 toolbar reconciliation + `csvOptions.getRowsToExport` in §9.6; `<Suspense>` spinner in §1.2; selection-list `{ skip: !open }` lazy fetch in §2) each match the implemented code. Ethiopian date math re-derived numerically (F-3-04, C-3-01).

**Gates**

| Gate | Result |
|---|---|
| `node --check` (backend, incl. the F-3-01 model) | PASS |
| Live backend smoke (F-3-01 binding) | PASS — throwaway user, probe data deleted, port released |
| Ethiopian-date numerical probes (F-3-04, C-3-01) | PASS — round-trips verified with the installed utilities |

**Specification deviations**

---

#### F-3-01 (BLOCKING): `Audio.paginate` does not exist — `GET /api/v1/audio` throws on every call
- Severity: BLOCKING · Status: RESOLVED
- Where: `backend/models/audio.model.js` (lines 6, 51)
- Resolution: imports `mongoose-paginate-v2` and registers `audioSchema.plugin(mongoosePaginate)` immediately before `mongoose.model('Audio', …)`, mirroring `report.model.js`; JSDoc `@typedef`/`@property` header intact. Binding live smoke executed and recorded in the Phase 3 implementation-log entry: `GET /api/v1/audio` → 200 with `data.docs`/`data.totalDocs`. `node --check` passes. Fix confirmed.

---

#### F-3-02 (HIGH): ReportFilterDialog drafts never reflect the active filters
- Severity: HIGH · Status: RESOLVED
- What: reopening the dialog showed mount-time defaults and Apply silently wiped active filters.
- Where: `client/src/components/report/ReportFilterDialog.jsx` (lines 61-67)
- Resolution: re-syncs `draftDate`/`draftBranchId`/`draftArchived` from the `filters` prop on every false→true `open` transition via a render-time `prevOpen` snapshot (the same pattern as `BranchSelectorDialog.jsx:49-53`); Apply can no longer drop filters invisibly; Cancel still resets to defaults. The first review prescribed an `open`-keyed `useEffect`, but the project's React Compiler lint (eslint-plugin-react-hooks 7.1.1) flags direct setState-in-effect — the render-time snapshot passes the lint gate; `BranchFormDialog.jsx:44-48` survives because RHF's `reset` is not flagged. Pinned §10 details preserved. Fix confirmed.

---

#### F-3-03 (MEDIUM): MuiDatePicker's dayjs construction rolls over for Ethiopian month 2 (Tikimt) days 29-30
- Severity: MEDIUM · Status: RESOLVED
- What: the input showed the wrong DD-MM-YY on ~2 days per year.
- Where: `client/src/components/reusable/MuiDatePicker.jsx`
- Resolution: reworked to the self-contained `EthiopianDateField` — the display is derived directly from the Gregorian anchor via `formatEthiopianDateLong(gregorianToEthiopian(value.year(), value.month() + 1, value.date()))` (lines 90-96); the dayjs `format` string is never used, so no proxy date can roll over. Typing parses Ethiopian text via `parseEthiopianDate` → `ethiopianToGregorian` → `dayjs` committed through `context.setValue` with `source: "field"` and `changeImportance: "set"` (lines 98-114); `usePickerContext` confirmed a public export of the installed `@mui/x-date-pickers/hooks` (v9.9.0); the Gregorian-anchor `value`/`onChange` contract is unchanged for consumers; CalendarIcon open button, `triggerStatus`, and `slotProps.input.endAdornment` (ReportFilterDialog ClearIcon) preserved. Corrected sample pairs (re-derived with the actual utilities; the first review's pairs were off by one day/year): Tikimt 29 = Gregorian 2025-11-08, Tikimt 30 = 2025-11-09, Pagume 1-5 of 2018 E.C. = 2026-09-06..2026-09-10, Gregorian 2026-09-11 = 2019-01-01 E.C.; the earlier "Eth 30-02-18 = Greg 08-11-2025" and "Pagume 1-6" numbers are superseded. Fix confirmed.

**Invalid business logic implemented**

- None beyond F-3-01 (logged above). Verified line by line: the status machine (draft → audio_attached via `createAudio` with the completed-409 guard at `audio.controller.js:31`; audio_attached → transcribed via `createTranscription` with the 409s at `transcription.controller.js:30,33`; updateTranscription's transcribed-state 409 at line 96); the `generated → generatedHistory[]` replacement logic (previous text pushed as `{ provider, text }`, provider 400-required when replacing, AD-010); the user-scoped, paginated list queries with `date`/`branchId`/`isArchived`/`search` filters (`report.controller.js:26-36,64,111,146`); the `{ success, message, data }` envelope; the 422 validation shape with `req.validated = { body, params, query }`; and the `Report.branches[].branchId` populate path with `REPORT_POPULATE_PATHS`.

**Edge cases to be handled**

---

#### F-3-04: the Pagume day cap is now leap-year-aware
- Severity: MEDIUM · Status: RESOLVED
- What: the first review's `day > 6` cap was wrong — Ethiopian leap years are `year % 4 === 3`, not `year % 4 === 0` (2015, 2019, 2023 leap — Pagume 6 days; 2016, 2018, 2020 common — 5 days).
- Where: `client/src/utils/ethiopianDate.js`
- Resolution: guard is `month === 13 && day > (year % 4 === 3 ? 6 : 5)`. Verified first-hand: `ethiopianToGregorian(2015, 13, 6)` → 2023-09-11 round-trips (leap); `(2019, 13, 6)` → 2027-09-11 (leap); `(2016, 13, 6)` → 2024-09-11 → rounds to `{2017, 1, 1}` so the parser must reject it; `parseEthiopianDate('06-13-2016')` → null, `('06-13-2019')` → `{6,13,2019}`, `('06-13-2018')` → null, `('05-13-2018')` → `{5,13,2018}`. Rule matches the real calendar (the 6th epagomenal day is added on 29 August of the Julian calendar; leap when the Ethiopian year leaves remainder 3 on division by 4). The rollover defect class is gone. Fix confirmed.

---

#### Observations (no action)
- `updateReport` strips an empty-string `generated` (`report.validator.js:59` uses `optional({ values: 'falsy' })`), so the API cannot clear generated text to empty; the UI has no clear action in Phase 3 and Generation arrives in Phase 5 — no behavior is reachable yet. Revisit when the Generate action lands.
- `MuiSelect` (`client/src/components/reusable/MuiSelect.jsx`) has no caller in Phase 3; it is spec-catalogued (`## MUI Component Standards` §14.1) and Phase 4's recorder/branch flows may consume it — keep, do not delete.

**Conflicts to be resolved**

---

#### F-3-05 (note, Phase 8 alignment) — `updateBranch` archived-guard returns 409 while §35.4 requires 403
- Severity: NOTE · Status: **OPEN**
- What: `backend/controllers/branch.controller.js:76-77` throws `CustomError(CONFLICT, 'Branch is archived')`; §35.4 requires 403 for non-lifecycle operations on archived resources, and `backend/utils/httpStatus.js` has no `FORBIDDEN` constant. Unreachable in Phase 3 (no archive endpoint yet — archiving ships with the §35 lifecycle in Phase 8), so not user-visible today and no user decision is needed.
- Must: no action in this fix round beyond keeping the guard as-is. **Binding for Phase 8:** add `httpStatus.FORBIDDEN = 403` and switch this guard to 403 per §35.4 when the archive endpoints ship. Recorded here so it is not lost.

---

#### C-3-01 (user decision 2026-08-04): DD-MM-YY display with 2- or 4-digit typing is implemented
- Severity: MEDIUM · Status: RESOLVED
- Resolution: (1) `MuiDatePicker.jsx` renders via `formatEthiopianDate` (DD-MM-YY, `ethiopianDate.js:145`) — `formatEthiopianDate(gregorianToEthiopian(...))` — exactly as REQ-110 / US-031 / §14.1.6 pin; (2) `parseEthiopianDate` accepts `^(\d{2})-(\d{2})-(\d{2}|\d{4})$`, resolving a 2-digit year as `year + 2000` before the F-3-04 leap-year test. Verified numerically: `parseEthiopianDate('30-02-18')` → `{30, 2, 2018}` → 2025-11-09 → round-trips ("30-02-18"); `('25-02-18')` → `{25, 2, 2018}` → 2025-11-04 → round-trips; `('06-13-2016')` → null (common year — the review's original "leap year" label for 2016 was wrong; 2019 is the leap acceptance case); `('07-13-18')` → null (common 2018, day 7 > 5). API strings unchanged; date filter, create dialog, and backend `?date` contract unaffected. Fix confirmed.

**Other required actions**

---

#### Live backend smoke (process gap — the reason F-3-01 slipped through the first review)
- Severity: HIGH · Status: RESOLVED
- Resolution: the fix round executed the required bounded single-shot backend smoke on the live DB (throwaway user, all probe data deleted, port released), recorded in the Phase 3 implementation-log entry: register 201 → branches 201 → reports 201 → audio 201 → `GET /audio` 200 (`docs` + `totalDocs` — F-3-01 live-verified) → `GET /branches` 200 → `GET /reports` 200 → `GET /reports/:id` 200 with `status: "audio_attached"` and `audio[]`/`branches[].branchId` populated — the full Phase 3 chain (draft → audio_attached) works end to end. Action item complete.

---

#### Phase 4 business-logic integration analysis (user-requested — executed in Phase 4; summary)
- Audio upload (physical file → metadata): Phase 4 adds the multipart upload on `POST /` of `backend/routes/audio.routes.js` (validated by `audio.validator.js`: `reportId` isMongoId, `originalName`/`mimeType` non-empty, `fileSize` isInt ≥ 0, `duration` isFloat ≥ 0; extend with the mime whitelist + size caps of `## Audio Recording STT` §2); `filePath` ready for the stored path; files land under the gitignored `backend/uploads/audio/` (24h cleanup per §8.3 — `archivedAt` TTL-index in `branch.model.js` is the precedent); the completed-409 guard and `Report.audio[]` push already exist.
- STT pipeline (Addis AI): Phase 3's `createTranscription` is the STT sink — enforces `audio_attached` (409 otherwise), one-transcription-per-report, audio_attached → transcribed; `Transcription.raw/latest/history` modeled for the review workflow — `PATCH /api/v1/transcriptions/:id` already writes `reviewed` (`transcription.controller.js:96`). Phase 4 only calls the Addis STT endpoint (`## Audio Recording STT` §3-§4) and writes through `createTranscription`'s path.
- Recorder UI: `CreateReportDialog.jsx:30-33` is the Phase 3 metadata-only dialog; Phase 4 adds the MediaRecorder section and converts the global clockIn/clockOut into per-branch times (`Report.branches[].clockIn/clockOut` fields already exist; `ReportDetails.jsx:102-113` already renders them).
- Redux/client plumbing: Phase 4 adds the audio endpoints following the exact `branchSlice.js`/`reportSlice.js` injection pattern (`injectEndpoints`, `transformResponse` unwrapping to `response.data`, `tagTypes` invalidation) and registers the slice in `redux/app/store.js`; `PAGINATION_DEFAULT_*`/`PAGINATION_MAX_LIMIT` already exist.
- Testing: Phase 4 must include DB e2e from the start (record → upload → STT → transcribed → reviewed, plus the 409 paths and the uploads TTL cleanup).
- Naming: all Phase 4 docs/code keep the "V2" project naming per AGENTS.md.

---

## Phase 4 — Audio Recording And STT

| Field | Value |
|---|---|
| Verdict | GREEN |
| Round | Re-review of the complete fix round (F-4-01..F-4-17 + two follow-ups: the browser-reported multipart 422 and the dark/light submit overlay) |

**Summary** — every finding is confirmed fixed and `RESOLVED` below; the two follow-ups are logged and resolved. The 422 defect (the reason for this re-review) is re-validated by a review-run live smoke against the final working tree: with the array-first `Audio.create([doc], { session })` form, a real `.webm` upload answers **201** and the report reaches `audio_attached` (populated `_id` match verified); no-clips → 422 with the exact REQ-198 `errors: [{ field, message }]` array (`{ field: 'clips', message: 'At least one audio clip is required' }`); bad MIME → 415; malformed `reportId` → 422 with the route-level cleanup middleware unlinking the just-stored file (F-4-06 runtime-verified). Nothing remains open. The fix round remains uncommitted, under user control.

**Gates**

| Gate | Result |
|---|---|
| `node --check` (every backend file) | PASS |
| Client `npm run lint` | PASS (exit 0) |
| One-shot `npx vite build` | PASS (0 errors; `client/dist/` deleted) |
| `python scripts/verify-initial-doc.py` | PASS (exit 0, SELF-ALIGNED) |
| Per-file audit of all eight modified backend files | PASS — no unused imports, no `console.*`, `httpStatus` imports used (no raw numeric statuses), JSDoc intact |
| Live smoke | PASS — throwaway data deleted, smoke clip unlinked, port 4005 released |

**Specification deviations**

---

#### F-4-01 (HIGH): per-branch `MuiTimePicker` error text now renders
- Severity: HIGH · Status: RESOLVED
- Where: `client/src/components/reusable/MuiTimePicker.jsx` (lines 26, 32-40)
- Resolution: extracts `error`/`helperText` from the spread and merges them into `slotProps.textField` (mirroring `MuiDatePicker`); MUI X pickers have no top-level helperText handling, so the §6.1 "Error on respective MuiTimePicker" requirement is met and the multi-branch silent dead end is gone. Fix confirmed.

---

#### F-4-02 (HIGH): details-page audio playback now authenticates
- Severity: HIGH · Status: RESOLVED
- Where: `client/src/components/reusable/AudioClipRow.jsx`
- Resolution: adds `crossOrigin="use-credentials"` to the `<audio>` element so the cross-origin `GET /audio/:id/stream` carries the httpOnly cookie (backend CORS is exact-origin + credentials, `backend/app.js`); without it Chrome blocks the media fetch as opaque and playback silently 401s. Fix confirmed.

---

#### F-4-03 (MEDIUM): `transcriptionSlice` is registered in `store.js`
- Severity: MEDIUM · Status: RESOLVED
- Where: `client/src/redux/app/store.js` (line 19)
- Resolution: side-effect imports `../features/transcriptionSlice.js`, so `useTranscribeReportMutation`/`useUpdateTranscriptionMutation` exist for every consumer, not only the lazy `ReportDetails` chunk. Fix confirmed.

---

#### F-4-04 (MEDIUM): the env fail-fast probe no longer breaks the system-path default
- Severity: MEDIUM · Status: RESOLVED
- Where: `backend/config/env.js` (lines 104-114)
- Resolution: replaced the `existsSync` directory-relative probe with `execFileSync(binaryPath, ['-version'])` in try/catch — PATH/PATHEXT-aware, so the documented `'ffmpeg'`/`'ffprobe'` defaults keep resolving while a genuinely missing binary still fails loudly at boot instead of a cryptic upload-time 422. Fix confirmed.

---

#### F-4-05 (MEDIUM): every upload-422 carries the REQ-198 errors-array shape
- Severity: MEDIUM · Status: RESOLVED
- Where: `backend/controllers/audio.controller.js` (lines 49-53, 138-144, 215-233); `client/src/components/report/CreateReportDialog.jsx`
- Resolution: the `validationFailure(field, message)` helper + empty-clips path return the full `{ success:false, message:'Validation failed', data:{ errors:[{ field, message }] } }` envelope. Two follow-ups closed the last mask of this class (the browser-reported 422): the catch block normalizes a Mongoose `ValidationError.errors` object-map to `[{ field, message }]` via `Object.entries(...)`, and `CreateReportDialog.jsx` resolves both the array and the object-map shapes before falling back to `error.data.message`. Fix confirmed.

**Invalid business logic implemented**

- None. Verified line by line on the final state: the status machine (draft → audio_attached on upload with the completed-409 guard, audio_attached → transcribed after STT, re-transcription accepting audio_attached/transcribed/reviewed and blocking only completed — `## Audio Recording STT` §9); the REQ-082/ADR-018 session transaction now genuinely covers the inserts (array-first `Audio.create([doc], { session })`; mongoose 9 treats a plain-object second argument as a second document — the F-4-07/422 trap); the 502 envelope echoing the report's real status; transcription overwrite with `raw` reset + `latest`/`history[]` reset (REQ-145) vs create-with-`latest: ''`/`history: []` (REQ-149); the 201 vs 200 distinction; `mapSttError` matching `## Addis AI` §12; the user-scoped list queries and envelope/422 shapes of the Phase 3 controllers unchanged.

**Edge cases to be handled**

---

#### F-4-06 (MEDIUM): a post-multer validator 422 no longer orphans the just-stored clip files
- Severity: MEDIUM · Status: RESOLVED
- Where: `backend/routes/audio.routes.js` (lines 33-52, 59)
- Resolution: `cleanupUploadedOnFailure` sits between `receiveUpload` and `validateAudioUpload`; on a non-2xx `'finish'` it unlinks `req.files` unless the controller already initiated cleanup (`req.cleanedUploads`) — a bad-`reportId` 422 cleans its file without double-unlinking the controller's own 422s. Runtime-verified during the re-review smoke (no leftover file). Fix confirmed.

---

#### F-4-07 (MEDIUM): the multi-clip upload write is transactional (REQ-082)
- Severity: MEDIUM · Status: RESOLVED
- Where: `backend/controllers/audio.controller.js` (lines 181-194)
- Resolution: the clip-create loop + `report.audio.push` + `draft` → `audio_attached` + `report.save` run inside one MongoDB session (start/commit/abort/endSession). Follow-up (the browser-reported 422, re-validated this cycle): `Model.create(doc, { session })` treats `{ session }` as a second document in mongoose 9 — options are honored only with the array-first `create([doc], { session })`; now used and live-verified as 201 with the report `audio_attached`. The catch normalizes the ValidationError map and aborts the session. Fix confirmed.

---

#### F-4-08 (MEDIUM): an unknown-outcome network-error retry can no longer duplicate Audio docs
- Severity: MEDIUM · Status: RESOLVED
- Where: `client/src/components/report/CreateReportDialog.jsx` (lines 151-153, 355, 371)
- Resolution: `audioUploadAttempted` is set on network-error uploads; a re-entered Submit with an existing report skips the re-upload and proceeds straight to transcribe; the 502 retry branch gates on `audioUploaded` (F-4-17c). Fix confirmed.

---

#### F-4-09 (MEDIUM): `streamAudio`/`downloadAudio` attach a `createReadStream` error handler
- Severity: MEDIUM · Status: RESOLVED
- Where: `backend/controllers/audio.controller.js` (lines 262-263, 292-293); `backend/middleware/error.middleware.js` (lines 31-34)
- Resolution: `stream.on('error', next)` is attached before `pipe`; the middleware forwards via `next(err)` when `res.headersSent` so Express destroys the connection instead of a second response. Fix confirmed.

---

#### F-4-10 (MEDIUM): the 502 payload's `status` echoes the report's real status
- Severity: MEDIUM · Status: RESOLVED
- Where: `backend/controllers/transcription.controller.js` (line 88)
- Resolution: returns `data: { reportId, status: report.status }` instead of the hardcoded `'audio_attached'` — correct on the re-transcription path where the report may already be transcribed/reviewed. Fix confirmed.

---

#### F-4-11 (MEDIUM): a stale cancel-discard `onstop` can no longer kill a new recording
- Severity: MEDIUM · Status: RESOLVED
- Where: `client/src/hooks/useAudioRecorder.js`
- Resolution: each session is tagged (`recordingSessionRef`, incremented in `startRecording`, snapshotted in `beginRecording`); a mismatched `onstop` is a no-op, and `discardRef` resets at the start of every `startRecording`. Fix confirmed.

---

#### F-4-12 (NOTE): addis.service defensive gaps closed
- Severity: NOTE · Status: RESOLVED
- Resolution: (a) empty/whitespace transcription is a non-retryable error (`statusCode: 200`) — an all-empty result can no longer advance the report to `transcribed` with `raw: ''`; (b) the AbortController timeout is cleared in a `finally` spanning `fetch` + `response.json()` — a provider that answers headers then stalls the body aborts instead of hanging (REQ-129); (c) `splitWavChunks` throws when `byteRate <= 0`; (d) `ADDIS_AI_STT_MAX_BYTES_PER_REQUEST` (10 MB, REQ-128) is enforced with a non-retryable throw. Fix confirmed.

---

#### F-4-12c (NOTE): the splitter infinite-loop guard
- Severity: NOTE · Status: RESOLVED
- Where: `backend/utils/wavSplitter.js`
- Resolution: throws `TypeError('Invalid byte rate')` when `byteRate <= 0` and `TypeError('Invalid chunk size')` when `chunkBytes <= 0`. Probe: byteRate 0 → TypeError; byteRate 32000 → 1 chunk. Fix confirmed.

---

#### F-4-13 (NOTE): dead code removed and the audit claim corrected
- Severity: NOTE · Status: RESOLVED
- Where: `backend/controllers/transcription.controller.js`
- Resolution: drops the unused `totalChunks` accumulator and the un-triggerable `if (!clip.filePath) continue;` skip; the implementation-log "no unused vars" line is corrected in place. Fix confirmed.

---

#### F-4-14 (NOTE): `Audio.filePath` is now `required: true`
- Severity: NOTE · Status: RESOLVED
- Where: `backend/models/audio.model.js` (line 28)
- Resolution: per `## Data Modeling` §4.2; the Phase 3 `default: ''` is removed and the controller no longer compensates for empty paths (the `transcribeReport` skip is gone — F-4-13; `resolveUploadPath` + 404-on-missing-file covers the rest). Fix confirmed.

---

#### F-4-15 (NOTE): `AudioClipRow` resets on natural end
- Severity: NOTE · Status: RESOLVED
- Where: `client/src/components/reusable/AudioClipRow.jsx` (lines 60-69)
- Resolution: `onEnded` restores the play icon, rewinds `currentTime`, and resets the position to 0. Fix confirmed.

---

#### F-4-16 (NOTE): details-page UX + reusable-component deviations fixed
- Severity: NOTE · Status: RESOLVED
- Where: `client/src/pages/ReportDetails.jsx`
- Resolution: the full-page spinner gates on `isLoading` (background refetches from tag invalidation no longer blank the transcription editor); the raw `TextField` became `MuiTextField` (`## MUI Component Standards` §8), which forwards `multiline`/`minRows`/`fullWidth` through `...rest`. Fix confirmed.

---

#### F-4-17 (NOTE): create-dialog/draft-store state edge cases + conventions fixed
- Severity: NOTE · Status: RESOLVED
- Resolution: (a) removing a branch filters `branchErrors` at the same index and selector `onApply` resets them — stale helper texts no longer mislabel rows; (b) `audioDraftStore.js` adds the `memoryAuthoritative` set — an IndexedDB write failure marks the key so `loadAudioDraft` reads the fresher memory tier instead of the stale IDB record; the mark clears on a successful write or clear; (c) the 502 branch gates on `audioUploaded`; (d) waveform magic values moved to `client/src/utils/constants.js` (`AUDIO_WAVEFORM_FFT_SIZE` 256, `BAR_WIDTH_RATIO` 0.6, `FALLBACK_WIDTH` 320, `CANVAS_HEIGHT` 64) and the submit overlay uses `rgb(${theme.vars.palette.background.paperChannel} / 0.85)` — MUI's per-scheme channel var resolves the correct paper color in both modes (the previous `alpha(...)` baked the static light value). Fix confirmed.

**Conflicts to be resolved**

- None needing a user decision — every finding above is closed. The recorded Phase 4 user decisions (split three-step create flow instead of the §6.2 single multipart request; deferred upload orphan sweep to Phase 8; indeterminate LinearProgress step overlays instead of progress events; single-branch global-times override; the unknown-outcome preservation semantics) are respected and are not findings; they stay as implemented.

**Other required actions**

---

#### Stale upload artifacts updated
- Severity: MEDIUM · Status: RESOLVED
- Resolution: the re-review smoke deleted its throwaway user/branch/report/audio docs and unlinked its own uploaded clip; port 4005 released. Reference audit of `backend/uploads/audio/`: `79b23e2c-2434-482b-b500-0e490e4d0600.webm` is referenced by an Audio document (kept); `e9772bb4-aae4-4d03-b195-4ae4d672cddb.webm` (the historical file previously labeled referenced by Audio doc `6a728082f76800bf721f3716`) and `f79b5f45-94a6-4f0c-b28b-33abe7cca81f.webm` are now **orphans** (their Audio docs were deleted during browser testing). Per the binding Phase 4 user decision the orphan sweep is deferred to **Phase 8** — leave all three for the Phase 8 sweeper. Decided and recorded.

---

#### Phase 5 business-logic integration analysis (user-requested precedent from Phase 3 — executed in Phase 5; summary)
- Generation endpoint: Phase 5 adds `POST /api/v1/reports/:reportId/generate` (`ai.controller.js`) consuming `## Addis AI` §6 `chat_generate` (`POST {ADDIS_AI_BASE_URL}/api/v1/chat_generate`, `x-api-key`, `generation_config` from the frozen constants group — temperature 0.2, maxOutputTokens 2048, topP 0.9, topK 40). Phase 3 already models the output side: `Report.generated` + `generatedHistory[]` with replacement semantics (`report.controller.js:140` area — previous text pushed as `{ provider, text }`, provider 400-required when replacing, AD-010). The 18 prompt seeds PR-01..18 must be assembled as constants (`backend/utils/constants.js` — S-5-01b bans inline prompt text in controllers).
- ChatConversation model: the Phase 1 review's binding item — create `backend/models/chatConversation.model.js` **in Phase 5** (per T-5-02b and AD-010) and update the §4 tree then (REQ-173). Delivered in Phase 5.
- Review gate: generation must run only from the reviewed transcription, never directly from raw audio (`## Transcription Review` §1, REQ-038) — guard on the transcription's `reviewed` flag / the report's status; Phase 3's `updateTranscription` PATCH already writes `reviewed` (`transcription.controller.js:169-171`).
- Correction flow: the Assistant chat (§11) drives the correction loop; the Edit action on ReportDetails/reportColumns opens the report in the chat; generation/correction responses write through the same `Report.generated` replacement path with `provider` recorded (REQ-133).
- Errors/retries: reuse `mapSttError`-style mapping for `chat_generate` errors (`## Addis AI` §12 table) and the mock-provider precedent (`mock-addis-stt.mjs`) extended to `chat_generate` for the S-5-xx validations.
- Naming: all Phase 5 docs/code keep the "V2" project naming per AGENTS.md.

---

#### MUI X Chat integration — Phase 4 → Phase 5 scope (user-mandated, binding for the implementation AI)
- **Covered — client (spec):** §12.6 Assistant page (line 3197): `pages/Assistant.jsx`, route `assistant` (the only protected route outside AppShell, full-screen), `<ChatBox adapter={assistantAdapter} features={{ conversationList: true }} sx={{ height: '100vh' }} />`; conversation rail (title, last-message preview, relative timestamp); "New Chat" → report picker dialog → create conversation (`POST /api/v1/assistant/conversations` `{ reportId }`) whose welcome message injects the raw transcription + report metadata; conversation title `"Report {date}"`; deep link `/assistant?conversation=<id>` (ChatBox selects the conversation and shows its history — where the Reports-list "Edit" and ReportDetails "Edit Report" actions land; there is no report edit page); tool-approval UI built into ChatBox (Approve/Reject with reason; "expired" on 60s timeout); adapter `client/src/components/assistant/chatAdapter.js` (`sendMessage`, `listConversations`, `listMessages`, `addToolApprovalResponse`); Redux `aiConversationSlice` + RTK endpoints in `assistantApi.js` (`## Redux RTK Query` §3, REQ-103); package `@mui/x-chat` `^9.0.0-alpha.15` — already in the manifest, **community edition only** (§14.5 REQ-111); sidebar "Assistant" nav item per §12.3/§12.6.
- **Covered — backend (spec):** ChatConversation model (§24.9/§4.6, lines 2084-2099): `user` + `report` ObjectId refs (required), `title` default `"New Chat"`, `messages[]` `{ id (uuid), role ("user"|"assistant"), status ("streaming"|"complete"|"failed"), parts [Mixed], provider ("addis"|"gemini"|"nvidia"), createdAt }` with the four `parts` tool shapes (line 2095: `text` | `tool-input-available` | `tool-approval-request` | `tool-output-available`); index `{ user: 1, updatedAt: -1 }` (line 2098); cascade-deletes with the report (§35.2/ADR-018, REQ-226). `save_transcription` tool semantics (line 2248): Transcription.latest + `history[]` push (`reviewer` = provider string) + Report status → `reviewed`, after user approval. Phase 5 `POST /reports/:reportId/generate` creates the ChatConversation record (T-5-02b/AD-010) and records `provider` on messages (REQ-133). PR-01..18 delivered via `chat_generate` (T-5-01, frozen constants group).
- **Not covered — gap (verified during the Phase 4 review; MUST be confirmed with the user while implementing):**
  1. **Assistant REST endpoints are absent from the spec's API Contract** — `## API Contract` §8 (lines 2267-2294) covers only Report/Branch/Audio/Transcription/ChatConversation model shapes, no `assistant/…` routes. The full endpoint table (`GET/POST /api/v1/assistant/conversations`, `GET/POST /api/v1/assistant/conversations/:id/messages`, `POST /api/v1/assistant/tools/:toolCallId/approval`) exists **only** in read-only `docs/initial-doc.md` (lines 1969-1975).
  2. **SSE streaming wire contract exists only in initial-doc** (lines 1977-2046): SSE event flow (`tool-input-available` → `tool-approval-request` → approval → `tool-output-available` → `finish`), in-memory pending map keyed by `toolCallId`, 60s approval expiry, `res.flush()` per write, keep-alive heartbeat every 15s.
  3. **Adapter wire-format gap:** the installed `@mui/x-chat`/`@mui/x-chat-headless` `9.0.0-alpha.15` `ChatAdapter` type requires `sendMessage(input) → Promise<ReadableStream<ChatMessageChunk | ChatStreamEnvelope>>` with chunk types `start / text-start / text-delta / text-end / tool-input-start / tool-input-available / tool-approval-request / tool-output-available / finish / abort`; `listConversations → { conversations: ChatConversation[] }` with `{ id, title, subtitle, lastMessageAt }`; `listMessages({ conversationId }) → { messages: ChatMessage[] }` with `{ id, role, parts, status, createdAt }`. The adapter must translate the backend response into these shapes — a user-confirmed design decision.
  4. **No implementation-phase task builds the ChatBox:** §12.6 specs the Assistant page but none of T-5-xx..T-8-xx assign the ChatBox/chatAdapter/Assistant page work.
  5. **`aiConversationSlice` streaming-parts ownership is unspecified:** the slice inventory (`## Redux RTK Query` §3) lists conversations list + `activeConversationId` + streaming parts, but how those synchronize with ChatBox's internally streamed state is undefined.
  6. **Open UX confirmations:** one conversation per report (find-or-create) vs many; behavior when the deep-linked conversation id does not exist; multi-conversation disambiguation in the rail; whether generation/correction is exercised through the chat (`save_transcription` + regenerate) or a separate flow.
- **Required protocol (user-mandated):** because the spec does not cover items 1-6, the implementation AI MUST (1) exhaustively analyze MUI X Chat — the installed package API and its real capabilities/limitations; (2) reason over every project aspect for MUI X Chat utilization — the report-correction loop, `save_transcription`, `history[]` reviewer/provider display, store integration, deep-link entry, provider indicator; (3) brainstorm and **ask the user** the open questions (gap items 1-6 and any new ones) before implementing; (4) implement based on the answers, then record each decision + its user answer as RESOLVED in the Phase 5 review.
- **Reference:** this bullet complements — does not overwrite — the Phase 5 business-logic integration analysis above.

---

## Phase 5 — AI Report Generation And Correction

| Field | Value |
|---|---|
| Verdict | **FAIL** — supersedes the earlier rework-round GREEN: this final review found contradictions between the log records and the code (F-5-02) plus the findings below. |
| Reviewed | 2026-08-06 (final review; earlier rework-round review also 2026-08-06) |
| Scope | Branch `phase-5-ai-generation-and-correction`, commit `92b52e6 feat: phase 5 ai generation and correction` — **not merged** |

**Summary** — generation endpoint, ChatConversation model (nullable `report`), provider-per-message, Addis→Gemini→Nvidia fallback, axios providers (REQ-138), SSE streaming, approval flow, and `Report.generated`/`generatedHistory[]` writes: implemented and verified per T-5-01..T-5-09. What fails: error mapping (F-5-01), a three-way doc/code contradiction on post-approval status (F-5-02), missing spec alignment (F-5-03), dead code and stale naming (F-5-04), raw MUI components (F-5-05), an inline prompt in a controller (F-5-06), and reasoning dropped on approve-persist (F-5-07). Info observations in F-5-08.

**Prior rounds (history — the rework re-review, all RESOLVED; the earlier "returns to reviewed" claim is superseded by F-5-02)**

---

#### Rework: Refresh token "doesn't work" / random logouts
- Severity: HIGH · Status: RESOLVED (superseded by none — stands)
- What: `baseQueryWithReauth` treated any refresh failure as a logout, and the chat adapter's raw fetch bypassed the RTK refresh path entirely.
- Where: `client/src/redux/features/api.js`; `client/src/utils/fetchWithReauth.js`; `client/src/utils/authRefresh.js`; `client/src/components/routes/SessionRefresher.jsx`
- Resolution: `api.js` only clears the session on a definitive 401/403 after a refresh attempt; transient refresh failures surface as an ordinary error; `authSlice` wipes the user only on 401/403; a shared serialized refresh promise now covers raw fetches; `SessionRefresher` (12-min interval) silently pre-refreshes under `ProtectedRoute`. Fix confirmed.

---

#### Rework: Provider selection "doesn't work"
- Severity: HIGH · Status: RESOLVED
- What: placeholder `"change me"` env values silently defaulted to the real base URLs, and the fallback chain masked a selected-provider failure by silently answering from Addis.
- Where: `backend/config/env.js`; `backend/controllers/ai.controller.js` (`generateWithFallback`)
- Resolution: `config/env.js` now fails startup loudly on placeholder values; `generateWithFallback` treats an explicit non-default provider as exclusive and surfaces its failure loudly (502 with the provider's name), while the default chain still falls through. Fix confirmed.

---

#### Rework: Cannot regenerate the report
- Severity: HIGH · Status: RESOLVED **as reworked** — **claim superseded, see F-5-02**
- What: the Generate affordance only rendered when `generated` was empty, and approved corrections never refreshed the report cache.
- Resolution (as recorded then): `ReportDetails` shows Generate/Regenerate whenever the report is back in `reviewed` ("the backend already returns to `reviewed` on an approved correction, T-5-04b"), and the chat adapter's `onToolApproved` invalidates the shared `Report` tag. **The re-verification this cycle proves the backend does NOT return to `reviewed` on `save_report` approval — it keeps `completed` (`ai.controller.js:737`). The original complaint is therefore only half-addressed; the required design decision and fix are F-5-02.**

---

#### Rework: Cannot have the AI modify part/whole of the report
- Severity: HIGH · Status: RESOLVED
- What: the assistant's correction output was offered as a `save_transcription` tool that wrote the corrected *report* text into `Transcription.latest` — the report itself never changed, so "the updated transcription doesn't link to report".
- Resolution (user-approved fix): new `save_report` tool (whole/part edits via the same approve flow) persists to `Report.generated` + `generatedHistory[]`, **keeping the report `completed`**. Fix confirmed; nothing further required.

---

#### Rework: Rendering issues (reports list, report details, assistant)
- Severity: MEDIUM · Status: RESOLVED
- What: `Reports` rendered an empty state on API failure; version-history timestamps could crash dayjs on invalid `generatedAt`; the assistant deep link stalled forever when the rail query failed.
- Resolution: error branches, defensive timestamp formatting, and a `failed`-status deep-link unblock are in place. Fix confirmed.

---

#### Rework: Cannot select reasoning when the AI supports it (e.g. deepseek flash 4)
- Severity: MEDIUM · Status: RESOLVED
- Resolution: reasoning is a first-class toggle in the composer toolbar; the validator accepts `reasoning`; Gemini (`thinkingConfig`) and NVIDIA (`enable_reasoning`, model override `NVIDIA_MODEL` → deepseek flash 4) services parse and return reasoning text; the SSE stream emits `reasoning` parts and the chat rehydrates them on reload. Fix confirmed (but see F-5-07 for report-correction runs).

---

#### Rework: Approved/rejected tool cards after reload
- Severity: MEDIUM · Status: RESOLVED
- Resolution (user decision): rehydrate as read-only tool cards. Persisted `tool-*` parts map back to `ChatToolMessagePart` (state `output-available`/`approval-responded`, never a fresh approval prompt), and message ids from the SSE `start`/`finish` events match the persisted history. Fix confirmed.

**Gates (this final review)**

| Gate | Result |
|---|---|
| `node --check` (every backend file) | PASS |
| `npm run lint` (client) | PASS (exit 0) |
| `python scripts/verify-initial-doc.py` | PASS (exit 0, SELF-ALIGNED) |
| `npx vite build` + delete `dist/` | NOT RE-RUN (deferred to build mode; rerun in the fix loop) |
| Live browser/provider pass (S-5-02a/03a/07) | NOT RUN — needs real credentials; stays with the user (no mock-addis chat stub exists in the repo, so those validations are unrecorded) |

**Specification deviations**

---

#### F-5-03 — Spec not aligned for the Phase 5 rework (Step 6 pending)
- Severity: MEDIUM · Status: OPEN
- What: the branch's spec diff contains only the Nvidia model rename (`z-ai/glm-5.2` → `deepseek-ai/deepseek-v4-flash`). The Phase-5 corrigenda and the assistant surface are unrecorded in `docs/specification.md`.
- Where: spec `## API Contract` §6.3 (line 2248 still says `save_transcription` semantics), `## AI Prompt Spec` §9/§11, `## Data Modeling` §4.6 (line 2089 `report` required — the code allows `null` for free chat), `## API Contract` §8 (no assistant REST/SSE rows), T-5-04b/S-5-04a (regeneration semantics).
- Spec: Step 6 of `## Phase Protocol`; AD-019.
- Must: record in the spec — (1) the `save_report` tool (writes `Report.generated` + `generatedHistory[]`, keeps `completed`); (2) `save_transcription` off the assistant wire (transcription-correction lane per T-5-04); (3) free chat (`ChatConversation.report` nullable, `report: null`); (4) the assistant REST endpoints + SSE stream contract rows in `## API Contract` §8; (5) the `reasoning` flag; (6) regeneration semantics after correction (per the F-5-02 decision).
- Accept when: spec grep finds `save_report`, the free-chat nullable `report`, and the assistant routes; `python scripts/verify-initial-doc.py` still exits 0.

---

#### F-5-05 — Raw MUI components bypass the reusable catalog (REQ-109)
- Severity: LOW · Status: OPEN
- What: `NewChatDialog.jsx` uses raw `@mui/material/Dialog`; `ProviderSelect.jsx` and `ReportDetails.jsx` use raw `@mui/material/Select` instead of the catalogued reusable components.
- Where: `client/src/components/assistant/NewChatDialog.jsx`; `client/src/components/assistant/ProviderSelect.jsx`; `client/src/pages/ReportDetails.jsx`
- Spec: REQ-109; `## MUI Component Standards` §14.3 (MuiDialog "is always used instead of raw `@mui/material/Dialog`") and §9/§14 (MuiSelect).
- Must: swap to the reusable `MuiDialog`/`MuiSelect`.
- Accept when: grep of `client/src` finds no raw `@mui/material/Dialog` / `@mui/material/Select` imports in those files.

---

#### F-5-06 — Inline prompt text in a controller (S-5-01b)
- Severity: LOW · Status: OPEN
- What: the free-chat user-turn directive is a literal string in the controller; S-5-01b bans prompt text inline in controllers (constants only).
- Where: `backend/controllers/ai.controller.js` (~line 448, the `'Respond to the conversation above.'` directive)
- Spec: S-5-01b.
- Must: move the directive into constants (e.g. `AI_ASSISTANT_USER_TURN`).
- Accept when: no prompt literals remain in `ai.controller.js`.

**Invalid business logic implemented**

---

#### F-5-01 — Provider exhaustion answers 500, not the unified 502
- Severity: HIGH · Status: OPEN
- What: when the default fallback chain (Addis→Gemini→Nvidia) is exhausted, the provider services throw a plain `{ retryable, statusCode, message }` object; `error.middleware.js` treats it as an unexpected error → HTTP 500, and in production the mapped message is replaced by the generic text. The explicit-selection path already throws `CustomError(502)` correctly — only the default chain is broken.
- Where: `backend/controllers/ai.controller.js` (`generateWithFallback` throw on exhaustion); `backend/services/addis.service.js`, `gemini.service.js`, `nvidia.service.js` (throw plain objects); `backend/middleware/error.middleware.js` (generic 500 branch)
- Spec: REQ-200; `## Error Handling` §2; T-5-08a.
- Must: wrap the exhausted chain's last error into `new CustomError(BAD_GATEWAY, <mapped safe message>)` before throwing, matching the explicit-selection path.
- Accept when: all three providers fail → 502 with the `{ success: false, message, data }` envelope and the mapped safe message; no 500 is ever emitted for provider failure.

---

#### F-5-04 — Dead `save_transcription` branch and stale naming
- Severity: LOW · Status: OPEN
- What: `approveToolCall` still contains the `save_transcription` else-branch (reads `toolInput.transcriptionId`/`toolInput.latest` — unreachable because no producer emits that tool, and it would crash if ever reached); `chatAdapter.js` docblocks and `AssistantToolCard.jsx` `CORRECTION_TOOLS` still advertise `save_transcription`.
- Where: `backend/controllers/ai.controller.js` (~lines 740-748); `client/src/components/assistant/chatAdapter.js` (lines 234-235, 345-347); `client/src/components/assistant/AssistantToolCard.jsx`
- Spec: per-file audit — no dead code or stale references.
- Must: remove the dead branch and the stale references (or rewire the tool back per the F-5-02 decision — Design B).
- Accept when: repo grep finds no `save_transcription` outside the spec's transcription-correction note.

---

#### F-5-07 — save_report runs drop the reasoning part on reload
- Severity: LOW · Status: OPEN
- What: the SSE stream emits a `reasoning` part for report-correction runs, but `approveToolCall` persists the assistant message without it — the reasoning shown live disappears after reload (only free chat rehydrates it), contradicting the recorded "rehydrate reasoning on reload" claim for corrections.
- Where: `backend/controllers/ai.controller.js` (`approveToolCall` / `streamAssistantGeneration`)
- Spec: the rework-round claim "the SSE stream emits reasoning parts and the chat rehydrates them into the MUI reasoning part on reload".
- Must: persist the `reasoning` part when persisting the approved tool message, or strip it consistently and correct the claim.
- Accept when: reload after an approved correction still shows the reasoning card.

**Edge cases to be handled**

---

#### F-5-08 — INFO observations (no action this round unless the user decides otherwise)
- Status: OPEN (observations)
- a. `approveToolCall` resolves the conversation without a user filter (grief vector via a guessed conversation id; the report write itself is user-scoped) — mitigate in a hardening pass.
- b. `generateText` reads `body?.data?.response_text`; the spec's `## Addis AI` §6 sample shows top-level `response_text` — verify against the live provider in the user's browser pass before trusting generation on the Addis default.
- c. Regenerating the welcome (assistant-first) message keeps the target instead of truncating (anchorIndex fallback) — confirm intended.
- d. Cosmetic: double-quote reformat in `App.jsx`/`AppShell.jsx`/`reportColumns.jsx`; `ProtectedRoute.jsx` missing trailing newline — lint passes; align to codebase style in the fix round.
- e. The `created` flag is dropped by `transformResponse` (`assistantApi.js:36` returns `response.data.conversation` only) — the "Assistant conversation started" toast in `useOpenInAssistant.js:29` never fires. Fix or remove the dead toast.

**Conflicts to be resolved**

---

#### F-5-02 — Status after an approved save_report: the docs contradict each other and the code (user decision required)
- Severity: MEDIUM · Status: OPEN (user decision — design A/B/C; see the review presentation)
- What: three-way contradiction — (1) code keeps `completed` after an approved `save_report` (`ai.controller.js:737`); (2) `docs/implementation-log.md:412` and this log's rework round claim "the backend already returns to `reviewed` on an approved correction, T-5-04b"; (3) `docs/implementation-log.md:417` and this log's `save_report` record claim "an approved `save_report` keeps `completed` status". Only claim (3) matches the code. Additionally: corrections are allowed from any status, but generation/regeneration requires `reviewed` (`ai.controller.js:156`) and nothing in the live code returns a `completed` report to `reviewed` — so the user's original "cannot regenerate the report" complaint is only half-addressed.
- Where: `backend/controllers/ai.controller.js` (lines 737, 740-748, 156); `docs/implementation-log.md` (lines 412, 417); this log's Phase 5 rework round
- Spec: T-5-04b, S-5-04a; `## Status Machine` (completed = final); the user-approved `save_report` corrigendum (keeps `completed`).
- Must: after the user picks the design — (A) return to `reviewed` on `save_report` approval (note: regeneration from the transcription would then discard the approved correction); (B) keep `completed` and rewire the `save_transcription` tool as the regeneration lane (transcription correction → report to `reviewed`, per spec line 2248 and T-5-04); or (C) keep `completed`, no regeneration after correction — implement the choice, then correct the contradictory records in `docs/implementation-log.md:412,417` and the rework-round claim in this log in place.
- Accept when: the code, both logs, and the spec tell one story; `ReportDetails`/`Reports` behavior matches the chosen design.

**Other required actions**

- Runtime pass: S-5-02a/03a/07 (mock/live provider + browser: composer send, approve a `save_report`, reload to see the read-only card, regenerate, reasoning toggle) remains with the user — it needs a live session and real provider keys. Run it and report back after the fix loop.
- Re-run `npx vite build` (0 errors) and delete `client/dist/` in the fix loop.
- The pending spec-note action ("tool names + `reasoning` flag") that the rework round deferred to the implementation AI's Step-6 pass is F-5-03 above — complete it in the fix loop.

---

## Phase 6 — Export And Analytics

| Field | Value |
|---|---|
| Verdict | PENDING |

**Summary** — (none yet — filled at the first review of Phase 6)

**Gates**

| Gate | Result |
|---|---|
| (tbd) | — |

**Specification deviations**

- (each finding: `Severity`/`Status`/`What`/`Where`/`Spec`/`Must`/`Accept when` — status `OPEN`)

**Invalid business logic implemented**

- (only if any already implemented: the logic, why it is invalid, what the implementation AI must do)

**Edge cases to be handled**

- (gaps the implementation AI must cover: the scenario, the expected behavior, what the implementation AI must do)

**Conflicts to be resolved**

- (contradictions between implementation and spec, between documents, or within the implementation itself: the conflicting positions, the required resolution, and whether a user decision is needed before the implementation AI can act)

**Other required actions**

- (anything else the implementation AI must do)

---

## Phase 7 — Mock Data And Hardening

| Field | Value |
|---|---|
| Verdict | PENDING |

**Summary** — (none yet — filled at the first review of Phase 7)

**Gates**

| Gate | Result |
|---|---|
| (tbd) | — |

**Specification deviations**

- (each finding: `Severity`/`Status`/`What`/`Where`/`Spec`/`Must`/`Accept when` — status `OPEN`)

**Invalid business logic implemented**

- (only if any already implemented: the logic, why it is invalid, what the implementation AI must do)

**Edge cases to be handled**

- (gaps the implementation AI must cover: the scenario, the expected behavior, what the implementation AI must do)

**Conflicts to be resolved**

- (contradictions between implementation and spec, between documents, or within the implementation itself: the conflicting positions, the required resolution, and whether a user decision is needed before the implementation AI can act)

**Other required actions**

- (anything else the implementation AI must do)

---

## Phase 8 — Quality Gates And Polish

| Field | Value |
|---|---|
| Verdict | PENDING |

**Summary** — (none yet — filled at the first review of Phase 8)

**Gates**

| Gate | Result |
|---|---|
| (tbd) | — |

**Specification deviations**

- (each finding: `Severity`/`Status`/`What`/`Where`/`Spec`/`Must`/`Accept when` — status `OPEN`)

**Invalid business logic implemented**

- (only if any already implemented: the logic, why it is invalid, what the implementation AI must do)

**Edge cases to be handled**

- (gaps the implementation AI must cover: the scenario, the expected behavior, what the implementation AI must do)

**Conflicts to be resolved**

- (contradictions between implementation and spec, between documents, or within the implementation itself: the conflicting positions, the required resolution, and whether a user decision is needed before the implementation AI can act)

**Other required actions**

- (anything else the implementation AI must do)

---

**Binding deferred items carried across phases (do not lose)**

- **F-3-05 (OPEN):** Phase 8 must add `httpStatus.FORBIDDEN = 403` and switch the `updateBranch` archived-guard to 403 per §35.4.
- **Orphan sweep (Phase 4 record):** `backend/uploads/audio/` files `e9772bb4-aae4-4d03-b195-4ae4d672cddb.webm` and `f79b5f45-94a6-4f0c-b28b-33abe7cca81f.webm` are orphans; sweep deferred to Phase 8 (user decision). `79b23e2c-2434-482b-b500-0e490e4d0600.webm` is referenced — keep.
- **ChatConversation model (Phase 1 record):** created in Phase 5 per T-5-02b/AD-010; the §4 tree update (REQ-173) is part of F-5-03.
- **Browser/probe pass:** S-5-xx runtime validations that need real provider keys remain with the user (see Phase 5).
