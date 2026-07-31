# Build Process: docs/* documents (single or multiple)

## Source Of Truth Hierarchy

1. **My direct instructions** (during the current session) — highest priority. If I say "change X", X changes regardless of what any document says.
2. **docs/initial-doc.md** — the base reference and the **final home** of all content. Contains many fixed rules and specifications. **However, it is not infallible.** Some items may need correction, update, or removal as we discover conflicts or better approaches during this session. When a conflict arises between initial-doc and my instruction, my instruction wins and initial-doc gets aligned afterward.
3. **The target document(s) under `docs/`** — the document(s) being built: an existing working document, a brand-new document (created only when I request it), or several documents at once. Content is added/replaced iteratively.
4. **Two build modes** — you use whichever I specify for each task:
   - **Working-docs mode** — you build and cross-align working docs (any new doc created only on my request) **without ever touching `docs/initial-doc.md`** during this phase. When GREEN and **when I decide**, you merge that green content into `docs/initial-doc.md`. Whether and when the working docs are deleted afterward is **my decision** — they may or may not exist after a certain period of time.
   - **Direct mode** — you build straight into `docs/initial-doc.md`, using the same loop, with no intermediate working docs.

## The Plan → Review → Build Loop

You create each section/unit of the target document(s) through this exact cycle:

```
  I give section/requirements (for one or more docs under docs/*)
                    │
                    ▼
        ┌─────────────────────┐
        │  PLAN MODE          │
        │  (read-only)        │
        │                     │
        │  • Read sources     │
        │  • Analyze input    │
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
        │  NEXT SECTION       │
        │  (repeat loop)      │
        └─────────┬───────────┘
                  │
                  ▼
   ┌─────────────────────────────┐
   │  When I decide:             │
   │  • Working-docs mode →      │
   │    merge green content into │
   │    docs/initial-doc.md      │
   │  • Delete or keep working   │
   │    docs: my decision        │
   └─────────────────────────────┘
```

## The Build Loop

Once I approve your plan, you enter build mode. You run this loop for every build — one section/unit of a single document or of multiple documents under `docs/`. You repeat it until everything is GREEN.

- **2.1 Analyze** — You perform an exhaustive, line-by-line, super deep analysis of what already exists in the target document(s) before writing anything.
- **2.2 Apply** — You apply the approved plan and nothing else. You respect everything that must be respected, and you do not touch anything untouchable.
- **2.3 Validate** — You validate that the approved plan was applied properly: constraints respected, untouchable content untouched, zero mismatch from top to bottom, and only the approved plan used unless I explicitly requested otherwise.
- **2.4 Found issue** — If validation finds any issue, you go back to 2.1 and repeat the loop.
- **2.5 GREEN** — If and only if everything is GREEN, you present what was applied and prepare for the next section.
- **2.6 Summary and commit** — You provide a summary and confirm you are ready to commit what is done on the local branch `project-planning-and-specifications`. If there are uncommitted changes, you never create a new branch — you always use `project-planning-and-specifications`. You commit only if I confirm; otherwise you ask.
- **2.7 Confirm ready** — You confirm you are ready for the next cycle.

## Working Docs and the Final Document

- You build and cross-align **working docs** (any new doc created only on my request) **among themselves** — never touching `docs/initial-doc.md` during this phase.
- When a working doc (or set of working docs) is GREEN and **I decide it is time**, you merge that green content into `docs/initial-doc.md` using the same Build Loop.
- Whether working docs are deleted after the merge, and when, is **my decision** — you never delete a working doc unless I ask.
- Sometimes there are no working docs at all: you build directly into `docs/initial-doc.md`.

## Key Rules

- **Plan mode is read-only.** You do not modify any files during planning. You ask questions and present plans, but nothing is written.
- **Build mode writes.** Only after I say "proceed", "output it", or similar does writing happen.
- **One section/unit per cycle.** Each loop covers exactly one logical section/unit of the target document(s) (e.g., "3.5.1 Create Report Dialog", or one unit of a new document). No jumping ahead.
- **Corrections are iterative.** I place comments in the doc or tell you what to change. You fix, I verify, then we move to the next section.
- **The Build Loop (2.1–2.7) is mandatory for every build cycle** — single or multiple documents, either mode.
- **The commit gate (2.6) runs after every GREEN cycle**, before you prepare the next section.
- **While working in working-docs mode, `docs/initial-doc.md` is untouchable.** Merge and delete timing are decided by me, case by case.
- **initial-doc.md is aligned after build** only when the new section introduces changes that contradict initial-doc. If the section is purely additive, alignment is skipped.
- **No tables** in output content (per my instruction).
- **initial-doc self-alignment (applies always)** — after every build cycle that touches `docs/initial-doc.md`, you run `python scripts/verify-initial-doc.py` — it must exit 0 (SELF-ALIGNED). It checks: no path/name reference to the retired working draft (`temp.md`) anywhere in the doc, top-level sections `## 1 .. ## 34` present and in order, no duplicate heading numbers, and every internal ref (`(N.M[.K])`, `(N.M[.K], Title)`, self `§N.M[.K]`) resolves to an existing heading number or numbered bullet. This rule always applies.
