# Temp — Data Models & Report End-to-End

> This is a working draft. Once approved, content moves to `docs/workflow-data-flow-ui-ux.md`.

---

## 1. Data Models

### 1.1 Report

```js
{
  user:              { type: ObjectId, ref: "User", required: true },
  date:              { type: String, required: true },
  branches: [{
    branchId:        { type: ObjectId, ref: "Branch" },
    clockIn:         { type: String },
    clockOut:        { type: String }
  }],
  clockIn:           { type: String },
  clockOut:          { type: String },
  audio:             [{ type: ObjectId, ref: "Audio" }],
  transcription:     { type: ObjectId, ref: "Transcription", default: null },
  status:            { type: String, enum: [
                       "draft",
                       "audio_attached",
                       "transcribed",
                       "reviewed",
                       "completed"
                     ], default: "draft" },
  isArchived:        { type: Boolean, default: false },
  archivedAt:        { type: Date, default: null },
  generated:         { type: String, default: "" },
  generatedHistory: [{
    provider:        { type: String, enum: ["addis", "gemini", "nvidia"], required: true },
    text:            { type: String, required: true },
    generatedAt:     { type: Date, default: Date.now }
  }]
},
{
  timestamps: true,
  toJSON: {
    transform(_doc, ret) {
      delete ret.id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: {
    transform(_doc, ret) {
      delete ret.id;
      delete ret.__v;
      return ret;
    }
  }
}
```

**Field Notes:**
- `date`: DD-MM-YYYY string (e.g. `"30-07-2026"`). Not a Date object — it is a display value matching the Amharic date format. `createdAt` handles sorting and date math.
- All times are 12-hour format strings (e.g. `"02:30 PM"`). Formatted client-side via `dayjs.format("hh:mm A")` before submit. Stored as-is, no backend conversion.

**clockIn / clockOut Semantics (mapped from report samples):**

The Report model has two layers of time tracking — **top-level** and **per-branch**:

```
Example from report sample (2 branches visited):
ስራ የገባሁበት ሰዓት: 2:30                          ← top-level clockIn = 2:30
ከ02:30 - 07:40 መድኃኒዓለም ብራንች                   ← branch[0].clockIn=02:30, .clockOut=07:40
ከ07:55 - 12:20 ኤርፖርት ብራንች                      ← branch[1].clockIn=07:55, .clockOut=12:20
ከስራ የወጣሁበት ሰዓት: 12:20                         ← top-level clockOut = 12:20
```

| Field | Maps To | Meaning |
|---|---|---|
| `clockIn` (top-level) | ስራ የገባሁበት ሰዓት | The time the supervisor started the work day. First branch's clockIn often equals this. |
| `clockOut` (top-level) | ከስራ የወጣሁበት ሰዓት፡ | The time the supervisor ended the work day. Last branch's clockOut often equals this. |
| `branches[].clockIn` | ከ[time] - [time] [branch] | The time the supervisor arrived at that specific branch. |
| `branches[].clockOut` | ከ[time] - [time] [branch] | The time the supervisor left that specific branch. |

- If only one branch is visited: branch-level and top-level times may be the same or different — no restriction.
- Top-level `clockIn` may differ from the first branch's `clockIn` (e.g. travel time between branches is tracked separately).
- Top-level `clockOut` represents the final end of day, even if the last branch was left earlier.
- `audio`: array of ObjectId refs. Starts empty `[]` at creation. Populated after audio upload.
- `transcription`: single ObjectId ref. `null` at creation. Populated after transcription is complete.
- `archivedAt`: set when report is archived. Used by TTL index for automatic deletion after 30 days.
- `generated`: latest AI-generated report text (initial-doc §6.1 format). Empty string until the first successful `POST /reports/:id/generate` (§3.15). Set together with `status → completed`. Lives on Report (not Transcription) — generation consumes `Transcription.latest` and produces the Report output.
- `generatedHistory[]`: appended on every successful generation — `{ provider, text, generatedAt }`. No UI in this cycle (details History card = transcription history, §3.10.6). Re-generation overwrites `generated` and appends a new entry.

**Indexes:**
```js
schema.index({ user: 1, createdAt: -1 });
schema.index({ status: 1 });
schema.index({ archivedAt: 1 }, { expireAfterSeconds: 2592000, partialFilterExpression: { archivedAt: { $ne: null } } });
```

**Status Lifecycle:**
```
draft → audio_attached → transcribed → reviewed → completed
```

| Status | Meaning |
|---|---|
| `draft` | Report metadata created. No audio uploaded yet. |
| `audio_attached` | Audio files uploaded and linked to Report. Ready for transcription. |
| `transcribed` | All audio clips transcribed. Raw text available. |
| `reviewed` | Transcription reviewed (by user or AI). Ready for report generation. |
| `completed` | AI generated the final report. |

---

### 1.2 Audio

```js
{
  user:         { type: ObjectId, ref: "User", required: true },
  report:       { type: ObjectId, ref: "Report", required: true },
  originalName: { type: String, required: true },
  mimeType:     { type: String, required: true },
  filePath:     { type: String, required: true },
  fileSize:     { type: Number, required: true },
  duration:     { type: Number, required: true }
},
{
  timestamps: true,
  toJSON: {
    transform(_doc, ret) {
      delete ret.id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: {
    transform(_doc, ret) {
      delete ret.id;
      delete ret.__v;
      return ret;
    }
  }
}
```

**Field Notes:**
- `user`: who uploaded it.
- `report`: which report this audio belongs to (bidirectional ref with Report.audio).
- `originalName`: as sent from the browser (e.g. `"clip_1.webm"`).
- `mimeType`: media type from the browser (e.g. `"audio/webm;codecs=opus"`).
- `filePath`: server path where multer saved the file (e.g. `"uploads/audio/{crypto.randomUUID()}.webm"`).
- `fileSize`: raw byte size (validated server-side against `AUDIO_MAX_SIZE_BYTES` = 52428800).
- `duration`: seconds, validated server-side via ffprobe (max `AUDIO_MAX_DURATION_SEC` = 900).
- No `status` field on Audio. Individual audio status is not tracked — the Report status covers the aggregate state.

---

### 1.3 Transcription

```js
{
  user:      { type: ObjectId, ref: "User", required: true },
  report:    { type: ObjectId, ref: "Report", required: true },
  raw:       { type: String, default: "" },
  latest:    { type: String, default: "" },
  history: [{
    instruction: { type: String },
    reviewed:    { type: String },
    reviewer:    { type: Schema.Types.Mixed },
    // reviewer: ObjectId (ref: User) | "addis" | "gemini" | "nvidia"
    editedAt:    { type: Date, default: Date.now }
  }]
},
{
  timestamps: true,
  toJSON: {
    transform(_doc, ret) {
      delete ret.id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: {
    transform(_doc, ret) {
      delete ret.id;
      delete ret.__v;
      return ret;
    }
  }
}
```

**Field Notes:**
- `raw`: original STT output, concatenated from all audio clips and their chunks.
- `latest`: the current reviewed/corrected text. Starts empty. Populated when user or AI completes a review.
- `history[]`: ordered array tracking each review/correction iteration.
  - `instruction`: what the user asked the AI to correct (only present when reviewer is AI). For direct user edits, instruction is empty string.
  - `reviewed`: the text produced by that review iteration.
  - `reviewer`: who or what produced this review.
    - If ObjectId (ref: User) → user manually edited the text.
    - If `"addis"` | `"gemini"` | `"nvidia"` → AI provider performed the correction.
  - `editedAt`: timestamp of when this history entry was created.
- No `status` field on Transcription. The Report.status reflects the current state.

**Review Modes (how history entries are created):**

| Mode | `instruction` | `reviewed` | `reviewer` |
|---|---|---|---|
| 1. User direct edit | `""` | User-typed text | User ObjectId |
| 2. User types instruction → AI corrects | User's instruction | AI-returned text | Provider string |
| 3. Voice → Addis STT → fills instruction → AI corrects | STT-transcribed instruction | AI-returned text | Provider string |

---

### 1.4 User

```js
{
  firstName:    { type: String, default: "" },
  lastName:     { type: String, default: "" },
  email:        { type: String, required: true, lowercase: true, trim: true },
  password:     { type: String, required: true, select: false },
  avatar:       { type: String, default: "" },
  position:     { type: String, default: "" },
  refreshToken: { type: String },
  authProvider: { type: String, enum: ["local", "google"], default: "local" }
},
{
  timestamps: true,
  toJSON: {
    transform(_doc, ret) {
      delete ret.id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  },
  toObject: {
    transform(_doc, ret) {
      delete ret.id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
}
```

**Indexes:**
```js
schema.index({ email: 1 }, { unique: true });
```

**Virtual:**
```js
schema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`.trim();
});
```

**Hooks:**
```js
schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
```

**Methods:**
```js
schema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
```

**Email extraction:** When registering via email+password or Google, extract the local-part of the email (before `@`) and split into firstName/lastName:
- Email `beza.ayalew@example.com` → firstName `"beza"`, lastName `"ayalew"`
- Email `bezaayalew@example.com` → firstName `"bezaayalew"`, lastName `""`

---

### 1.5 Branch

```js
{
  name:       { type: String, required: true },
  location:   { type: String },
  isArchived: { type: Boolean, default: false },
  archivedAt: { type: Date, default: null },
  user:       { type: ObjectId, ref: "User" }
},
{
  timestamps: true,
  toJSON: {
    transform(_doc, ret) {
      delete ret.id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: {
    transform(_doc, ret) {
      delete ret.id;
      delete ret.__v;
      return ret;
    }
  }
}
```

**Indexes:**
```js
schema.index({ user: 1, name: 1 }, { unique: true });
schema.index({ archivedAt: 1 }, { expireAfterSeconds: 2592000, partialFilterExpression: { archivedAt: { $ne: null } } });
```

---

### 1.6 ChatConversation

```js
{
  user:     { type: ObjectId, ref: "User", required: true },
  report:   { type: ObjectId, ref: "Report", required: true },
  title:    { type: String, default: "New Chat" },
  messages: [{
    id:        { type: String },   // uuid
    role:      { type: String },   // "user" | "assistant"
    status:    { type: String },   // "streaming" | "complete" | "failed"
    parts:     { type: [Mixed] },  // { type: "text", text } | { type: "tool-input-available", toolCallId, toolName, input } | { type: "tool-approval-request", toolCallId, toolName, input } | { type: "tool-output-available", toolCallId, output }
    createdAt: { type: Date }
  }]
},
{
  timestamps: true,
  toJSON: {
    transform(_doc, ret) {
      delete ret.id;
      delete ret.__v;
      return ret;
    }
  },
  toObject: {
    transform(_doc, ret) {
      delete ret.id;
      delete ret.__v;
      return ret;
    }
  }
}
```

**Indexes:**
```js
schema.index({ user: 1, updatedAt: -1 });
```

**Relationships:** one user → many conversations; one conversation → exactly one report. Deleting a report does NOT delete its conversations (conversation keeps the `report` id for deep links). Created via `POST /assistant/conversations` (3.13.2).

---

## 2. Relationships

```
Report (1) ──→ Audio (many, via Report.audio[])
Report (1) ──→ Transcription (1, via Report.transcription)

Audio (1) ──→ Report (1, via Audio.report)
Transcription (1) ──→ Report (1, via Transcription.report)

Report (1) ──→ User (1)
Branch (1) ──→ User (1)
Audio (1) ──→ User (1)
Transcription (1) ──→ User (1)
```

Report is the hub. Audio and Transcription both point back to Report. Report holds both refs for easy access. No redundant duplication.

---

## 3. Report End-to-End

### 3.1 Create Report Dialog

**Dialog File:** `client/src/components/report/CreateReportDialog.jsx`

**Trigger:** CreateButton (MuiButton, AddIcon) in Reports MuiPageHeader → opens MuiDialog.

**Base:** MuiDialog, `maxWidth="sm"`, fullWidth., `disableEscapeKeyDown={true}`, `onClose` is no-op (prevents close on backdrop click or Escape). Dialog only closes via Cancel button or successful submit.

**Title:** "Create New Report"

---

### 3.2 Local State (react-hook-form)

| Field | Type | Description |
|---|---|---|
| `date` | dayjs \| null | Ethiopian calendar date |
| `branches` | `[{ branchId, clockIn, clockOut }]` | Accumulator, starts empty |
| `clockIn` | dayjs \| null | Global work start (HH:mm) |
| `clockOut` | dayjs \| null | Global work end (HH:mm) |
| `audio` | `[{ id, blob, duration }]` | Recorded blobs, starts empty |
| `recordingState` | `"idle" \| "countdown" \| "recording" \| "paused" \| "review"` | Audio recording state machine |

---

### 3.3 Data Model Mapping To Report Sections

| Local State | Report Section (Amharic) |
|---|---|
| `date` | ቀን |
| `branches[].branchId` (resolved to name) | ብራንች header |
| `branches[].clockIn` / `branches[].clockOut` | ስራ የገባሁበት ሰዓት per-branch lines |
| `clockIn` | ስራ የገባሁበት ሰዓት (fallback when single branch) |
| `clockOut` | ከስራ የወጣሁበት ሰዓት፡ |

---

### 3.4 Dialog Layout (vertical stack)

**Row 1:** `Grid container spacing={2}`
- MuiDatePicker — left, `size={{ xs: 12, md: 6 }}`
- MuiButton "Select Branches" — right, `size={{ xs: 12, md: 6 }}`
  - On click → opens **BranchSelectorDialog**
  - **BranchSelectorDialog** (MuiDialog):
    - Title: "Select Branches"
    - Body: MuiList with MuiListItem (checkbox, branch name, location as secondary text)
    - Footer: Cancel + Apply MuiButtons
    - Branch list fetched from `GET /api/v1/branches` (Redux)
    - On Apply: selected branches pushed to `branches[]`, dialog closes
    - Already-selected branches are checked by default in the list

**Selected branches display:** below Row 1, for each entry in `branches[]`, rendered in order:
- **vw ≥ 600:** `[BranchName label] [MuiTimePicker clockIn] [MuiTimePicker clockOut] [✕ RemoveIconButton]` — all inline in one row
- **vw < 600:** BranchName (full width) + `[✕ Remove]` (end of branch name line). Below it: `[MuiTimePicker clockIn] [MuiTimePicker clockOut]` in a sub-row
- Each new branch appended below the previous. Remove button splices that branch from `branches[]` and discards its clockIn/clockOut.
- If a branch is unchecked in BranchSelectorDialog and Apply is clicked, that branch is removed from `branches[]`.
- BranchName for display is fetched from the branch list (comes from `GET /api/v1/branches` response).

**Divider 1:** visible only when `branches.length > 0`, below the selected branches section

**Global times row:** `Grid container spacing={2}`
- clockIn MuiTimePicker — left, `size={{ xs: 12, md: 6 }}`
- clockOut MuiTimePicker — right, `size={{ xs: 12, md: 6 }}`

**Divider 2:** always visible

**Audio recording section:** (see audio recording state machine below)

**Footer:** `Grid container justifyContent="space-between"`
- Cancel MuiButton: outlined, `onClick` clears all local state to defaults, closes dialog
- Submit MuiButton: contained, `loading={isSubmitting}`, disabled when `isSubmitting`

---

### 3.5 MuiTimePicker (reusable component)

**File:** `client/src/components/reusable/MuiTimePicker.jsx`

- Follows MuiDatePicker pattern: DesktopTimePicker on md+ (popper), MobileTimePicker below md (dialog), switch via `useMediaQuery(theme.breakpoints.up('md'))`
- `forwardRef`, `size="small"`, `format="hh:mm A"`, default `null`
- Requires RHF `Controller` (same as DatePicker — custom onChange)
- `displayName="MuiTimePicker"`

---

### 3.6 Audio Recording State Machine

**IDLE_EMPTY** (no clips): Shows "Start Recording" MuiButton with FiberManualRecordIcon (red). Click → transitions to COUNTDOWN.

**COUNTDOWN:** Lightbox overlay on audio section. Shows "3" → "2" → "1" (1 second each) → auto-transitions to RECORDING.

**RECORDING:**
- Live waveform canvas (Web Audio API AnalyserNode connected to MediaStream, renders real-time FFT bars)
- "⏸ Pause" MuiIconButton + "⏹ Stop" MuiIconButton
- Live duration ticker: `[MM:SS / 15:00]`
- Pause → PAUSED. Stop → finalizes blob → transitions to REVIEW.
- Auto-stop at `AUDIO_MAX_DURATION_SEC=900` (15 min, constant).

**PAUSED:**
- Waveform frozen. "▶ Resume" + "⏹ Stop" buttons.
- Resume → RECORDING. Stop → REVIEW.

**REVIEW** (clips exist):
- Each clip in `audio[]` displayed as a card/row:
  - "▶/⏸" PlayPauseIconButton — toggles playback
  - Seek bar (MuiSlider) — draggable, updates `currentTime`
  - Duration label: `[MM:SS / MM:SS]`
  - "✕" DeleteIconButton — removes clip from `audio[]`. If array becomes empty → transitions to IDLE_EMPTY.
- "+ Add Another Recording" text button below clip list — starts new COUNTDOWN.
- Playback uses HTMLAudioElement or react-player. Play/pause toggles per clip independently.

**Implementation stack:** MediaRecorder API for capture, Web Audio API AnalyserNode for waveform, `URL.createObjectURL(blob)` for playback, all state in `useAudioRecorder` custom hook (`client/src/hooks/useAudioRecorder.js`).

**MIME type priority (used by MediaRecorder):**
1. `audio/webm;codecs=opus`
2. `audio/webm`
3. `audio/mp4`
4. browser default

---

### 3.7 Validation Rules (before frontend submit)

| Field | Rule |
|---|---|
| `date` | Required. Valid Ethiopian date. Error + helperText on MuiDatePicker. |
| `branches` | `branches.length >= 1`. Toast "Select at least one branch" on submit attempt. |
| Each `branches[i].clockIn` | Required. Error on respective MuiTimePicker. |
| Each `branches[i].clockOut` | Required. Error on respective MuiTimePicker. Cross-field: "Out time must be after in time". |
| `clockIn` | Required. Error on MuiTimePicker. |
| `clockOut` | Required. Error on MuiTimePicker. Cross-field: "End time must be after start time". |
| `audio` | `audio.length >= 1`. Toast "Record at least one audio clip". |
| Each `audio[i].blob.size` | `<= 50 MB`. Blocked client-side, warning shown, user asked to re-record. |

**Server-side validation repeats all of the above** via `express-validator` middleware + multer validation for files.

---

### 3.8 Submit Flow (frontend)

1. Frontend form validation passes.
 2. Build FormData:
    - `metadata` field: JSON.stringify of:
      ```json
      {
        "date": "30-07-2026",
        "branches": [
          { "branchId": "br_001", "clockIn": "02:30 PM", "clockOut": "07:40 PM" },
          { "branchId": "br_002", "clockIn": "07:55 PM", "clockOut": "12:20 AM" }
        ],
        "clockIn": "02:30 PM",
        "clockOut": "12:20 AM",
        "audio": [
          { "id": "clip_1", "duration": 185 },
          { "id": "clip_2", "duration": 312 }
        ]
      }
      ```
3. `POST /reports` via RTK Query `useCreateReportMutation()`.
4. While submitting:
   - `isSubmitting = true`
   - Dialog shows indeterminate `LinearProgress` bar + overlay message "Creating report..."
   - All fields frozen, Cancel disabled
   - The submit is one request. The entire backend pipeline (create report → upload audio → transcribe) happens server-side before responding. Frontend does NOT see individual steps.
5. On **201** (success): close dialog, toast "Report created", refetch report list via `GET /reports`.
6. On **502 Transcription Failed**: show error "Transcription failed, retry?" with button to call `POST /reports/:id/transcribe`.
7. On **other error** (including audio upload failure): toast error message, re-enable form fields (keep metadata + audio blobs). Dialog stays open. User can click Submit again to retry or Cancel to discard.

---

### 3.9 Backend Pipeline — `POST /reports`

**Middleware chain (applied in order):**
1. `authenticate`: JWT verification from `req.cookies.accessToken`.
2. `upload.array("audio", 10)`: multer receives clips, stores to `backend/uploads/audio/`.
3. `createReportRules`: express-validator rules from `reportValidator.js`.
4. `validation`: shared middleware from `validation.js` — checks `validationResult(req)`, stores `req.validated`.
5. Controller: extracts `req.validated.body`, processes logic.

**Validator layer:**

`backend/middlewares/validators/validation.js`:
```js
import { validationResult, matchedData } from "express-validator";

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      data: { errors: errors.array() }
    });
  }
  req.validated = {
    body: matchedData(req, { locations: ["body"] }),
    params: matchedData(req, { locations: ["params"] }),
    query: matchedData(req, { locations: ["query"] }),
  };
  next();
};
```

`backend/middlewares/validators/reportValidator.js`:
```js
import { body } from "express-validator";

export const createReportRules = [
  body("metadata").custom((value) => {
    try { JSON.parse(value); return true; }
    catch { throw new Error("Invalid JSON in metadata"); }
  }),
  body("branches").isArray({ min: 1 }).withMessage("At least one branch required"),
  body("branches.*.branchId").notEmpty().withMessage("Branch ID is required"),
  body("branches.*.clockIn").notEmpty().withMessage("Branch clock in is required"),
  body("branches.*.clockOut").notEmpty().withMessage("Branch clock out is required"),
  body("clockIn").notEmpty().withMessage("Clock in is required"),
  body("clockOut").notEmpty().withMessage("Clock out is required"),
];
```

**Controller — `asyncHandler` wrapper:**

All controllers use `express-async-handler` (imported as `asyncHandler`). Errors are forwarded via `next(error)`:

```js
import asyncHandler from "express-async-handler";

export const create = asyncHandler(async (req, res, next) => {
  // logic
});
```

The global error handler in `app.js` catches all `next(error)` calls and returns consistent error responses.

**Controller — step by step:**

```
STEP 1 — Parse and validate
├── Parse req.body.metadata → JSON.parse → { date, branches, clockIn, clockOut }
├── req.files → array of uploaded audio files from multer
├── Validate audio files count ≥ 1
├── For each file:
│   ├── Validate mimeType ∈ AUDIO_ALLOWED_MIME_TYPES → 415 if invalid
│   ├── Validate file.size ≤ AUDIO_MAX_SIZE_BYTES → 413 if exceeded
│   └── ffprobe duration → validate ≤ AUDIO_MAX_DURATION_SEC

STEP 2 — Create Report (draft)
├── Report.create([{
│     user: req.user._id,
│     date,
│     branches,
│     clockIn,
│     clockOut,
│     status: "draft"
│   }], { session })
└── reportId = createdReport[0]._id
    → If DB failure: next(error) → 500

STEP 3 — Create Audio docs and attach to Report
├── audioIds = []
├── For each file in req.files:
│   ├── audioDoc = Audio.create([{
│   │     user: req.user._id,
│   │     report: reportId,
│   │     originalName: file.originalname,
│   │     mimeType: file.mimetype,
│   │     filePath: file.path,
│   │     fileSize: file.size,
│   │     duration: ffprobeResult
│   │   }], { session })
│   └── audioIds.push(audioDoc[0]._id)
├── Report.findByIdAndUpdate(reportId,
│     { $push: { audio: { $each: audioIds } } },
│     { session })
│
├── If any audio creation fails →
│   └── Abort transaction
│   └── Return 502:
│       {
│         success: false,
│         message: "Audio upload failed",
│         data: null
│       }

STEP 4 — Update Report status to audio_attached
├── Report.findByIdAndUpdate(reportId,
│     { status: "audio_attached" },
│     { session })
│   → If DB failure: next(error) → 500 (Report exists, status stuck at draft)

STEP 5 — Transcribe each audio clip
├── fullRawText = ""
├── For each audioId in audioIds:
│   ├── audioDoc = Audio.findById(audioId)
│   ├── Convert to WAV:
│   │   └── ffmpeg -i audioDoc.filePath -ac 1 -ar 16000
│   │       -sample_fmt s16 -acodec pcm_s16le temp.wav
│   ├── PCM-level split via wavSplitter.js:
│   │   └── Chunks of ADDIS_AI_STT_MAX_DURATION_SEC (60s)
│   │       (in-memory, no per-chunk re-encoding)
│   ├── clipRawText = ""
│   ├── For each chunk:
│   │   ├── POST https://api.addisassistant.com/api/v2/stt
│   │   │   FormData: { audio: chunk, request_data: { language_code: "am" } }
│   │   ├── On network failure: retry 3× (1s, 2s, 4s backoff)
│   │   ├── On provider error (4xx/5xx): mark chunk failed, continue
│   │   └── On success: concatenate chunk.transcription → clipRawText
│   └── fullRawText += clipRawText + "\n"
│
├── If transcription fails for all audio →
│   └── Do NOT abort transaction. Keep Report at audio_attached with audio preserved.
│   └── Commit transaction (saving Report + Audio docs)
│   └── Return 502:
│       {
│         success: false,
│         message: "Transcription failed",
│         data: { reportId, status: "audio_attached" }
│       }
│   └── Frontend: show "Transcription failed, retry?" + button to call
│       POST /reports/:id/transcribe

STEP 6 — Create Transcription doc
├── transcriptionDoc = Transcription.create([{
│     user: req.user._id,
│     report: reportId,
│     raw: fullRawText,
│     latest: "",
│     history: []
│   }], { session })
│   → If DB failure: abort transaction in this sub-step only.
│     Report stays at audio_attached. Audio preserved.

STEP 7 — Link Transcription to Report → status transcribed
├── Report.findByIdAndUpdate(reportId,
│     {
│       transcription: transcriptionDoc[0]._id,
│       status: "transcribed"
│     },
│     { session })
│   → If DB failure: Transcription exists but not linked.
│     Report stays at audio_attached.

STEP 8 — Commit transaction
├── await session.commitTransaction()
├── Populate: report = Report.findById(reportId)
│     .populate("user", "firstName lastName email")
│     .populate("branches.branchId", "name location")
│     .populate("audio")
│     .populate("transcription")
└── Return 201:
      {
        "success": true,
        "message": "Report created successfully",
        "data": { "report": { ... } }
      }
```

---

### 3.10 Post-Creation Flow — Review Transcription

After `POST /reports` returns successfully, Report status is `transcribed` (or `audio_attached` if STEP 5 failed — see the "Transcription fails" row in 3.11). The Reports list shows the new item with its status badge. The user clicks an "Edit" action button → navigates to `/reports/:id/edit`.

---

#### 3.10.1 `/reports/:id/edit` Page

**Purpose:** review and correct the transcription of an existing report, edit its metadata, play back the recorded clips, and restore or delete past revisions.

**Page component:** `client/src/pages/ReportCorrection.jsx`. The page renders inside the protected root layout (AppShell) — AppShell is provided by routing, the page component does not render it. `/assistant` is the only protected route that lives outside AppShell (3.13).

**Overall structure (top to bottom):**
1. Header bar
2. Metadata summary bar
3. Tab bar (four tabs)
4. Active tab panel — content swaps when the user switches tabs

**Header bar (left → right):**
- **Back button** — MuiButton with start icon ArrowBackIcon, label "Back". On click: `navigate("/reports")`.
- **Page title** — Typography variant="h6", text "Edit Report".
- **Flex spacer** — pushes the remaining items to the right edge.
- **MuiStatusBadge** — renders `report.status` with color mapping: `draft` → default, `audio_attached` → warning, `transcribed` → info, `reviewed` → primary, `completed` → success. Label shows the status text.
- **"Open in Assistant" button** — MuiButton variant="outlined", start icon SmartToyIcon. On click: find or create the ChatConversation linked to this report, then `navigate("/assistant?conversation=<conversationId>")` (3.13).

**Metadata summary bar:**
- One line of Typography variant="body2", color="text.secondary", placed directly below the header.
- Shows the report's Date, Branches (names joined with ", "), Clock In, and Clock Out.
- Sample content:
```
Date: 30-07-2026  |  Branches: መድኃኒዓለም, ኤርፖርት  |  Clock In: 02:30 PM  |  Clock Out: 12:20 AM
```

**Tab bar:**
- MUI Tab components in a TabList, placed below the metadata summary bar, separated from the panel content by a MuiDivider.
- Four tabs in this exact order:
  1. "Editor" (value `editor`) — active by default when the page loads
  2. "Details" (value `details`)
  3. "Audio" (value `audio`)
  4. "History" (value `history`)
- Clicking a tab switches the visible panel below and highlights the selected tab.
- The active tab is kept in local state (`tab`); switching tabs does not change the URL.

**Tab panels:**
| Tab | Section |
|---|---|
| Editor | Editor Tab (below) |
| Details | Details Tab (below) |
| Audio | Audio Tab (below) |
| History | History Tab (below) |

---

#### 3.10.2 Editor Tab

**Retry banner** (shown only when `report.status === "audio_attached"`):
- MuiAlert variant="outlined" severity="warning" at the top of the tab
- Text: "Transcription failed. Retry?" + MuiButton "Retry Transcription"
- Click → `POST /reports/:id/transcribe` → backend runs the STT pipeline again from stored audio files → on success: status becomes `transcribed`, editor reloads with `Transcription.raw`, banner disappears
- On failure: toast "Transcription failed, try again" — banner stays

**Rich text editor:**
- Uses a rich text editor with toolbar (Bold, Italic, Font size, Text color) for Amharic text editing.
- Pre-filled with `Transcription.raw` (if `latest` is empty) or `Transcription.latest`.
- Disabled while `status === "audio_attached"` (nothing to edit yet).

**Three action buttons below the editor:**

| Button | Action |
|---|---|
| "Save" | Direct edit (Mode 1). Saves editor content as `latest`. |
| "Correct with AI" | Opens inline form: instruction text field + AI provider dropdown + "Submit" button. On response, shows diff. User accepts → saves. |
| "Voice Correct" | Opens short recorder → on stop, sends to STT → fills instruction field → same as AI Correct flow. |

---

#### 3.10.3 Modes Detail

**Mode 1 — User Direct Edit:**
- User edits the rich text area → clicks "Save"
- `PATCH /transcriptions/:id`
- Body: `{ "reviewed": "የተስተካከለ ጽሑፍ..." }`
- Controller: push to history with `reviewer: req.user._id`, update `latest`, update Report status to `reviewed`

**Mode 2 — AI Correction (typed instruction):**
- User types instruction like "Fix the branch names" → selects provider → clicks "Correct"
- `POST /transcriptions/:id/correct`
- Body: `{ "instruction": "Fix the branch names", "provider": "gemini" }`
- Backend sends raw text + instruction to AI provider → returns corrected text
- Frontend shows diff/preview → user clicks "Accept"
- `PATCH /transcriptions/:id` with same shape, `reviewer` is provider string

**Mode 3 — Voice Correction:**
- User clicks "Record correction" → records short audio → stops
- `POST /transcriptions/:id/correct-by-voice`
- Request: `multipart/form-data` with `audio` blob
- Backend: STT via Addis AI → returns transcribed instruction text
- Frontend fills instruction field → user selects provider → same as Mode 2 from there

**Assistant surface:** Modes 2 and 3 are also available inside the Assistant page (3.13) — the `save_transcription` tool performs the same update (`latest` + `history[]` push with `reviewer` = provider string, Report status → `reviewed`) after user approval.

---

#### 3.10.4 Details Tab

**Form** prefilled from the report:
- `date` — MuiDatePicker
- Branches — MuiButton "Select Branches" + BranchSelectorDialog; each selected branch shows per-branch `clockIn` / `clockOut` MuiTimePickers
- Top-level `clockIn` / `clockOut` — MuiTimePickers (derived from first/last branch times)
- Save → `PATCH /reports/:id` with `{ date, branches: [{ branchId, clockIn, clockOut }] }`
- Reset → reverts the form to the last saved values
- On 422: field-level errors from the backend; on success: toast "Report updated", metadata summary bar refreshes

---

#### 3.10.5 Audio Tab

**Clip list** — one row per `report.audio` item:
| Column | Content |
|---|---|
| # | Index |
| File | `originalName` |
| Duration | `duration` seconds, formatted `m:ss` |
| Size | `fileSize` bytes, formatted KB/MB |
| Actions | Play button (inline audio player), Download button |

- **Play:** streams `GET /api/v1/audio/:audioId/stream` into an inline `<audio>` player
- **Download:** `GET /api/v1/audio/:audioId/download` → file attachment with `originalName`
- Clips are read-only here (recording happens on the create page)

---

#### 3.10.6 History Tab

**Table/cards** showing each history item:
| Column | Content |
|---|---|
| # | Index |
| Reviewed (preview) | First 100 chars of `reviewed` text |
| Reviewer | User ObjectId → "You (Beza Ayalew)" ; Provider string → "AI (Gemini)" |
| Edited At | `editedAt` timestamp, formatted |
| Actions | Restore button, Delete button |

- **Restore:** clicking a history item sets its `reviewed` text as the current `latest` and pushes a new history entry.
- **Delete:** removes the item from `history[]` array via `PATCH /transcriptions/:id/history/:historyId`.

**Endpoint for history deletion:** `DELETE /transcriptions/:id/history/:historyId`

**Controller:** `$pull: { history: { _id: historyId } }`

**Distinguishing reviewer in UI:**
```js
if (mongoose.Types.ObjectId.isValid(entry.reviewer)) {
  // Look up user name → "You (Beza Ayalew)"
} else {
  // entry.reviewer is "addis" | "gemini" | "nvidia" → "AI (Gemini)"
}
```

---

### 3.11 Edge Cases

| Scenario | Behavior |
|---|---|
| Same branch selected twice | Checkbox already checked in BranchSelectorDialog. Uncheck to remove. |
| All branches removed | No selected branches shown. "Select Branches" button ready. |
| Browser blocks microphone | Toast "Microphone access required" |
| Clip exceeds 50 MB | Submit blocked. Warning shown. |
| All clips deleted | Return to IDLE_EMPTY state showing "Start Recording" |
| Dialog closed mid-recording | Stop MediaRecorder. Clear all state. |
| AI provider fails during correction | Toast "Correction failed, try again". User can retry with same or different provider. |
| Re-transcription requested | `POST /reports/:id/transcribe` — backend runs STT pipeline again from stored audio files. Updates `Transcription.raw`. Resets `latest` + `history`. Report status → `transcribed`. |
| Long audio (>60s) | Automatically chunked server-side via wavSplitter.js (PCM-level split, no per-chunk re-encoding). |
| Audio upload fails (STEP 3) | Return 502 with `data: null`. Toast error, form stays open with metadata + audio blobs intact. Report not created (transaction aborted). User clicks Submit again or Cancel. |
| Dialog closed via backdrop click / Escape | Prevented. `onClose` is no-op, `disableEscapeKeyDown={true}`. User must click Cancel explicitly. |
| Transcription fails (STEP 5) | Report stays at `audio_attached`, Audio preserved. Dialog closes with toast "Report created but transcription failed". Edit page shows the retry banner on the Editor tab → `POST /reports/:id/transcribe`. |
| Tool approval request expires (60s) | Assistant ChatBox shows the approval UI as "expired". Server drops the pending run from the in-memory map. User resends the message. |
| Report deleted while conversation exists | Conversation stays (keeps `report` id). Opening it still works; tool calls fail with 404 on missing transcription. |
| DB failure at STEP 4/6/7 | Error logged. Admin can repair via manual endpoint if needed. |

---

### 3.12 Response Shapes

#### 201 Created — Report created successfully

```json
{
  "success": true,
  "message": "Report created successfully",
  "data": {
    "report": {
      "_id": "665a1b2c3d4e5f6a7b8c9d0e",
      "user": {
        "_id": "664a...",
        "firstName": "beza",
        "lastName": "ayalew",
        "fullName": "beza ayalew",
        "email": "beza.ayalew@example.com"
      },
      "date": "30-07-2026",
      "branches": [
        {
          "branchId": {
            "_id": "br_001",
            "name": "መድኃኒዓለም"
          },
          "clockIn": "02:30 PM",
          "clockOut": "07:40 PM"
        },
        {
          "branchId": {
            "_id": "br_002",
            "name": "ኤርፖርት"
          },
          "clockIn": "07:55 PM",
          "clockOut": "12:20 AM"
        }
      ],
      "clockIn": "02:30 PM",
      "clockOut": "12:20 AM",
      "audio": [
        {
          "_id": "aud_001",
          "originalName": "clip_1.webm",
          "mimeType": "audio/webm;codecs=opus",
          "fileSize": 1234567,
          "duration": 185
        },
        {
          "_id": "aud_002",
          "originalName": "clip_2.webm",
          "mimeType": "audio/webm;codecs=opus",
          "fileSize": 2345678,
          "duration": 312
        }
      ],
      "transcription": {
        "_id": "tr_001",
        "raw": "ሙሉ የተቀዳ ጽሑፍ...",
        "latest": "",
        "status": "transcribed"
      },
      "status": "transcribed",
      "isArchived": false,
      "createdAt": "2026-07-30T14:30:00.000Z",
      "updatedAt": "2026-07-30T14:35:00.000Z"
    }
  }
}
```

#### Error Responses

```json
// 422 Validation Error
{
  "success": false,
  "message": "Validation failed",
  "data": {
    "errors": [
      { "field": "branches", "message": "At least one branch is required" }
    ]
  }
}

// 502 Audio Upload Failed (STEP 3 failure)
{
  "success": false,
  "message": "Audio upload failed",
  "data": null
}

// 502 Transcription Failed (STEP 5 failure)
{
  "success": false,
  "message": "Transcription failed",
  "data": {
    "reportId": "665a...",
    "status": "audio_attached"
  }
}

// 500 Internal Server Error
{
  "success": false,
  "message": "Internal server error",
  "data": null
}
```

#### Generate Report — POST /reports/:id/generate

```json
// 200 Generated
{
  "success": true,
  "message": "Report generated",
  "data": {
    "report": {
      "_id": "rpt_001",
      "status": "completed",
      "generated": "የመጨረሻ ሪፖርት ጽሑፍ..."
    },
    "generated": "የመጨረሻ ሪፖርት ጽሑፍ..."
  }
}

// 403 Archived
{ "success": false, "message": "Report is archived", "data": null }

// 422 No Reviewed Transcription
{ "success": false, "message": "Review the transcription before generating", "data": null }

// 429 Provider Rate Limit
{ "success": false, "message": "Rate limit reached, try again later", "data": null }

// 502 Provider Failure
{ "success": false, "message": "Generation failed, try again", "data": null }
```

#### Audio Playback — GET /api/v1/audio/:audioId/stream

```json
// 200 — streaming body, Content-Type from Audio.mimeType,
//       Accept-Ranges: bytes, Range request → 206 Partial Content
// 404 — { "success": false, "message": "Audio not found", "data": null }
```

#### Audio Download — GET /api/v1/audio/:audioId/download

```json
// 200 — attachment, Content-Disposition: attachment; filename="<originalName>",
//       Content-Type from Audio.mimeType
// 404 — { "success": false, "message": "Audio not found", "data": null }
```

---

### 3.13 Assistant — AI Report Chat

#### 3.13.1 Page & Routing

- **File:** `client/src/pages/Assistant.jsx`
- **Route:** `{ path: 'assistant', Component: Assistant }` — AppShell **sibling** under ProtectedRoute (NOT inside AppShell children; page is full-screen)
- **Sidebar:** new AppSidebar nav item "Assistant" (SmartToyIcon) — highlighted when on `/assistant`
- **Layout:** `<ChatBox adapter={assistantAdapter} features={{ conversationList: true }} sx={{ height: '100vh' }} />`
- **Conversation list** (built into ChatBox via `features={{ conversationList: true }}`):
  - Left rail lists conversations (title, last message preview, relative timestamp)
  - "New Chat" button → report picker dialog: pick one of the user's reports → `POST /assistant/conversations` `{ reportId }` → welcome assistant message injects the raw transcription text + report metadata
  - Conversation title: `"Report {date}"` (e.g. "Report 30-07-2026")
- **Deep link:** `/assistant?conversation=<id>` — ChatBox selects that conversation and shows its message history (this is where "Open in Assistant" on the edit page lands, 3.10.1)
- **Adapter:** `client/src/components/assistant/chatAdapter.js` (plain JS object):
  - `sendMessage(messages)` → `POST /api/v1/assistant/conversations/:id/messages` with `{ content }` → returns `response.body` (ReadableStream) consumed by ChatBox
  - `listConversations()` → `GET /api/v1/assistant/conversations`
  - `listMessages(conversationId)` → `GET /api/v1/assistant/conversations/:id/messages`
  - `addToolApprovalResponse({ toolCallId, approved, reason })` → `POST /api/v1/assistant/tools/:toolCallId/approval`
- **Tool approval flow (built into ChatBox):** on `tool-approval-request` ChatBox shows the approval UI → user Approves/Rejects → adapter calls `addToolApprovalResponse` → server resumes the provider run and emits `tool-output-available` then `finish`
- **Redux:** `aiConversationSlice` (conversations list, activeConversationId, streaming parts) + RTK Query endpoints in `assistantApi.js`
- **Package:** `@mui/x-chat` (v9.0.0-alpha.15, MIT license) — `npm install @mui/x-chat`

#### 3.13.2 Routes (backend)

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/v1/assistant/conversations` | List current user's conversations, newest first |
| POST | `/api/v1/assistant/conversations` | Create conversation for a report. Body `{ reportId }`. Injects welcome assistant message (raw transcription + metadata). |
| GET | `/api/v1/assistant/conversations/:id/messages` | Full message history for one conversation |
| POST | `/api/v1/assistant/conversations/:id/messages` | Send user message → SSE stream (tool-call lifecycle) |
| POST | `/api/v1/assistant/tools/:toolCallId/approval` | Approve/reject a pending tool call |

#### 3.13.3 Streaming & Tool Approval Flow

1. Adapter POSTs the user message. Server persists the user message (`status: complete`), then starts the AI provider run.
2. When the provider requests the `save_transcription` tool, the server emits `tool-input-available` (`toolCallId`, `toolName`, `input` with `transcriptionId` + proposed `latest`).
3. Server holds the run in an in-memory pending map (keyed by `toolCallId`) and emits `tool-approval-request`.
4. ChatBox shows the approval UI → user approves/rejects → `POST /tools/:toolCallId/approval` `{ approved, reason }`. On reject, server tells the provider "user rejected" so it can adjust.
5. On approval: `save_transcription` updates `Transcription.latest`, pushes `history[]` with `reviewer` = provider string, sets Report status → `reviewed`. Server emits `tool-output-available` with the result, then `finish`.
6. Assistant + tool messages are persisted into `conversation.messages[]` (`status: complete`).

**Pending-map cleanup:** entries removed after `finish` or on 60s timeout (approval UI shows "expired", see 3.11).

**Streaming discipline:** every SSE `event:`/`data:` write is flushed immediately (`res.flush()`) — no buffering, no aggregation — so partial text parts and tool events render without lag. Keep-alive heartbeat (`: ping` comment line) every 15s while the provider run is in flight.

#### 3.13.4 Response Shapes

```
// GET /assistant/conversations → 200
{
  "success": true,
  "data": {
    "conversations": [
      { "_id": "...", "reportId": "...", "title": "Report 30-07-2026", "lastMessageAt": "...", "createdAt": "..." }
    ]
  }
}

// POST /assistant/conversations → 201
{
  "success": true,
  "data": {
    "conversation": {
      "_id": "...",
      "reportId": "...",
      "title": "Report 30-07-2026",
      "messages": [
        { "id": "...", "role": "assistant", "status": "complete",
          "parts": [{ "type": "text", "text": "..." }], "createdAt": "..." }
      ]
    }
  }
}

// GET /assistant/conversations/:id/messages → 200
{
  "success": true,
  "data": {
    "messages": [
      { "id": "...", "role": "user", "status": "complete",
        "parts": [{ "type": "text", "text": "..." }], "createdAt": "..." }
    ]
  }
}

// POST /assistant/conversations/:id/messages → text/event-stream
event: part
data: { "type": "text", "text": "..." }

event: part
data: { "type": "tool-input-available", "toolCallId": "...", "toolName": "save_transcription",
        "input": { "transcriptionId": "tr_001", "latest": "..." } }

event: part
data: { "type": "tool-approval-request", "toolCallId": "...", "toolName": "save_transcription",
        "input": { "latest": "..." } }

event: part
data: { "type": "tool-output-available", "toolCallId": "...",
        "output": { "message": "Transcription updated" } }

event: finish
data: {}

// POST /tools/:toolCallId/approval → 200
{ "success": true }
```

---

### 3.14 Report Details Page

**Purpose:** read-only detail view of a single report — metadata, reviewed transcription, generated report (when completed) with export actions, audio playback, and revision history.

**Page component:** `client/src/pages/ReportDetail.jsx`. The page renders inside the protected root layout (AppShell) — AppShell is provided by routing, the page component does not render it. `/assistant` is the only protected route that lives outside AppShell (3.13).

**Route:** `{ path: 'reports/:id/details', Component: ReportDetail }` — under AppShell children.

**Entry Points:** Reports list "View" action and GlobalSearchDialog result click → `navigate("/reports/:id/details")`.

**Page header (MuiPageHeader, 1.12):**
- Left: title "Report Details", subtitle "{user.fullName} • {formatted report date}" — subtitle hidden on vw < 600 portrait.
- Right slot (children), fixed order — all actions icon-only on mobile with MuiTooltip labels; Edit Report renders as an icon button on mobile:
  1. **MuiStatusBadge** — renders `report.status` with color mapping: `draft` → default, `audio_attached` → warning, `transcribed` → info, `reviewed` → primary, `completed` → success. Label shows the status text. Non-interactive.
  2. **Back** — icon button (ArrowBackIcon), tooltip "Back". On click: `navigate("/reports")`.
  3. **Edit Report** — MuiButton contained, start icon EditIcon, label "Edit Report". On click: `navigate("/reports/:id/edit")`. Hidden when the report is archived.
  4. **Archive/Delete** — conditional, same flows as the Reports page card actions:
     - Not archived → ArchiveIcon (warning), tooltip "Archive" → MuiConfirmDialog → confirm → `PATCH /api/v1/reports/:id/archive` → toast "Report archived" → header refreshes to archived state (Archive replaced by Delete).
     - Archived → DeleteIcon (error), tooltip "Delete" → MuiConfirmDialog → confirm → `DELETE /api/v1/reports/:id` → toast "Report deleted" → `navigate("/reports")`.
  5. **Copy** — icon button (ContentCopyIcon), tooltip "Copy report". Enabled only when generated text exists. Copies the generated report text to the clipboard; on clipboard failure falls back to legacy `execCommand("copy")`; toast "Copied".
  6. **Print** — icon button (PrintIcon), tooltip "Print / Save as PDF". Enabled only when generated text exists. Calls `window.print()` with print CSS that hides AppShell chrome and header actions, leaving the page title and the generated report.

**Content (single scrollable column, top → bottom):**
1. **Report Metadata card** — read-only: date; branches (names joined with ", "); per-branch rows (branch name + `clockIn`–`clockOut` time range); top-level clockIn / clockOut; createdAt / updatedAt (formatted).
2. **Transcription card** — read-only: shows `Transcription.latest` when non-empty; otherwise shows `Transcription.raw` with the note "Not reviewed yet"; when both are empty → "No transcription yet".
3. **Generated Report card** — status-dependent:
   - `completed`: generated report text in the initial-doc §6.1 format, pre-wrap; action row: Copy, TXT download (Blob, `text/plain`, UTF-8 BOM `\uFEFF`, filename `Report-<date>.txt`), Print / Save as PDF; collapsible "Show reviewed transcription" for comparison.
   - `reviewed` (`latest` non-empty): "No generated report yet" + Generate Report button (contained) + provider selector (default "addis"; options "addis", "gemini", "nvidia") + helper "Generate the final report from the reviewed transcription".
   - `transcribed` (`latest` empty): Generate Report button disabled + tooltip "Review the transcription first".
   - `draft` / `audio_attached`: Generate Report button disabled + helper "Waiting for transcription".
   - Generate click → `POST /api/v1/reports/:id/generate` body `{ "provider": "..." }`; button shows loading state while pending; on 200 the card renders the generated text + toast "Report generated"; on 422 toast the message and keep the card unchanged; on 429 toast "Rate limit reached, try again later"; on 502 toast "Generation failed, try again".
4. **Audio card** — read-only, one row per `report.audio` item: label = `originalName`, duration = `duration` seconds formatted `m:ss`. Play: streams `GET /api/v1/audio/:audioId/stream` into an inline `<audio>` player. Download: `GET /api/v1/audio/:audioId/download` → file attachment with `originalName`. Empty state "No audio recorded" when `report.audio` is empty.
5. **History card** — read-only revision list (same data as the edit page History tab, 3.10.6): each entry shows reviewer (user fullName or provider string), timestamp, and status at revision time; expandable to show the text.

**Data Flow:**
- `GET /api/v1/reports/:id` → 200:
```json
{
  "success": true,
  "data": {
    "report": {
      "_id": "rpt_001",
      "date": "30-07-2026",
      "branches": [
        { "_id": "br_001", "name": "መድኃኒዓለም", "clockIn": "02:30", "clockOut": "07:40" },
        { "_id": "br_002", "name": "ኤርፖርት", "clockIn": "07:55", "clockOut": "12:20" }
      ],
      "audio": [
        { "_id": "aud_001", "originalName": "clip_1.webm", "mimeType": "audio/webm;codecs=opus", "duration": 272 }
      ],
      "clockIn": "02:30",
      "clockOut": "12:20",
      "status": "completed",
      "generated": "...",
      "isArchived": false,
      "user": { "fullName": "Beza Ayelue" },
      "createdAt": "...",
      "updatedAt": "..."
    },
    "transcription": {
      "_id": "tr_001",
      "raw": "...",
      "latest": "...",
      "history": []
    }
  }
}
```
- 404 → `{ "success": false, "message": "Report not found" }` → toast "Report not found" + `navigate("/reports")`.
- `POST /api/v1/reports/:id/generate` body `{ "provider": "addis" }` → 200 `{ "success": true, "data": { "report": { "...", "status": "completed", "generated": "..." }, "generated": "..." } }`.
  - 403 archived → toast "Report is archived", card unchanged.
  - 422 empty `latest` → toast the message, card unchanged.
  - 429 → toast "Rate limit reached, try again later", card unchanged.
  - 502 → toast "Generation failed, try again", status and generated text unchanged.

**Edge Cases:**
- Report 404 (deleted or bad id) → toast "Report not found" + navigate to `/reports`.
- Archived report → header shows only Delete (Edit Report, Copy, Print, Archive hidden); Generate Report disabled.
- Generate on archived report (API) → 403 → toast "Report is archived", card unchanged.
- Generate invoked with empty `latest` → 422 → toast "Review the transcription before generating", card unchanged.
- Provider rate limit (429) → toast "Rate limit reached, try again later", card unchanged.
- Provider failure (502) → toast "Generation failed, try again", status and generated text unchanged.
- Clipboard blocked → legacy `execCommand("copy")` fallback; still failing → toast "Copy failed".
- Print → browser print dialog; print CSS hides AppShell chrome and page header actions.
- Audio clips missing → "No audio recorded" empty state.
- Transcription missing (`draft`) → "No transcription yet" empty state.

---

### 3.15 Generate Report — `POST /api/v1/reports/:id/generate`

**Purpose:** produce the final report text from `Transcription.latest` using the selected provider (initial-doc §8 — transcription accuracy is the foundation every subsequent step, including report generation, depends on; §5.2 — report content must be generated from the reviewed transcription, not directly from raw audio; §6.8 — the transcription is raw material, the AI converts it into the required report structure).

**Request body:** `{ "provider": "addis" | "gemini" | "nvidia" }` — default `"addis"` (initial-doc §18.7 Text Generation).

**Preconditions (checked in order):**
1. Report exists — else 404.
2. Report not archived — else 403 `"Report is archived"`.
3. `Transcription.latest` non-empty — else 422 `"Review the transcription before generating"`.

**Flow:**
1. Validate preconditions above.
2. Build the generation prompt from the initial-doc §6.1 report format + report metadata (date, branches with times, top-level clockIn/clockOut) + `Transcription.latest` (generation prompt per initial-doc §21.1).
3. Dispatch to the selected provider — initial-doc §18 (Addis), §19.1 (Gemini; "no streaming" per §19.1), §19.2 (Nvidia). All providers return a full text response — no token streaming for generation.
4. Success: write `report.generated`, append `report.generatedHistory` entry (`{ provider, text, generatedAt }`), set `report.status` → `completed`, respond 200 (`data.report` incl. `generated` + top-level `data.generated` echo).
5. Provider rate limit → 429 `"Rate limit reached, try again later"` — status and `generated` unchanged.
6. Provider/network failure (3 retries, exponential backoff — initial-doc §19.1) → 502 `"Generation failed, try again"` — status and `generated` unchanged.

**Re-generation:** allowed via API — overwrites `report.generated`, appends a new `generatedHistory` entry. No UI path currently (details page shows the Generate button only for status `reviewed`).

**Frontend reference:** workflow §3.6 (details page generate flow + edge cases).

---

## 4. Recap of Amended Namings

| Old (current doc) | New (this doc) | Reason |
|---|---|---|
| `selectedBranches` | `branches` | Simpler, matches backend field name |
| `selectedBranches[].branchName` | Removed from local state | Resolved server-side from branchId |
| `workStarted` | `clockIn` | Matches Amharic "ስራ የገባሁበት ሰዓት" |
| `workEnd` | `clockOut` | Matches Amharic "ከስራ የወጣሁበት ሰዓት፡" |
| `audioClips` | `audio` | Simpler, consistent with Report model field |
| `aiProvider` | Removed from dialog state | Not needed at creation time (deferred) |
| `recordingState` | Unchanged | Still valid |
| `timeIn`/`timeOut` (per-branch) | `clockIn`/`clockOut` (per-branch) | Consistent naming with top-level fields |
| `BranchSelector` component | MuiButton + BranchSelectorDialog | Better UX for multi-branch selection |
| `unique: true` on fields | `schema.index()` | Consistent index management |
| Missing `archivedAt` | Added to Report + Branch | Enables TTL auto-delete after 30 days |
| Missing toJSON/toObject | Added to all schemas | Strips `id`, `__v`, `password` |
