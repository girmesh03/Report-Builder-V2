# -*- coding: utf-8 -*-
"""
Verify strict alignment between docs/workflow-data-flow-ui-ux.md and docs/temp.md.

Mirrored sections must be line-identical after these normalization transforms:
  1. leading whitespace stripped
  2. empty lines and "---" separators dropped
  3. heading markers + numbers stripped ("#### 3.5.1.9 X" / "- 3.5.2 X" -> "X")
  4. cross-ref remap (workflow numbering <-> temp numbering) applied
  5. workflow-only metadata lines dropped (File/Layout Context/Setup/Backend
     reference/React.lazy/Tree-shaken/displayName)

Exit code 0 = aligned, 1 = mismatches. stdlib only.
"""
import difflib
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
WF = ROOT / "docs" / "workflow-data-flow-ui-ux.md"
TM = ROOT / "docs" / "temp.md"

PAIRS = [
    ("3.5.1 head block", "  - 3.5.1 Create Report Dialog", "#### 3.5.1.1 Local State (react-hook-form)", "### 3.1 Create Report Dialog", "### 3.2 Local State (react-hook-form)"),
    ("3.5.1.1 <-> 3.2", "#### 3.5.1.1 Local State (react-hook-form)", "#### 3.5.1.2 Data Model Mapping To Report Sections", "### 3.2 Local State (react-hook-form)", "### 3.3 Data Model Mapping To Report Sections"),
    ("3.5.1.2 <-> 3.3", "#### 3.5.1.2 Data Model Mapping To Report Sections", "#### 3.5.1.3 Dialog Layout (vertical stack)", "### 3.3 Data Model Mapping To Report Sections", "### 3.4 Dialog Layout (vertical stack)"),
    ("3.5.1.3 <-> 3.4", "#### 3.5.1.3 Dialog Layout (vertical stack)", "#### 3.5.1.4 MuiTimePicker (reusable component)", "### 3.4 Dialog Layout (vertical stack)", "### 3.5 MuiTimePicker (reusable component)"),
    ("3.5.1.4 <-> 3.5", "#### 3.5.1.4 MuiTimePicker (reusable component)", "#### 3.5.1.5 Audio Recording State Machine", "### 3.5 MuiTimePicker (reusable component)", "### 3.6 Audio Recording State Machine"),
    ("3.5.1.5 <-> 3.6", "#### 3.5.1.5 Audio Recording State Machine", "#### 3.5.1.6 Validation Rules (before frontend submit)", "### 3.6 Audio Recording State Machine", "### 3.7 Validation Rules (before frontend submit)"),
    ("3.5.1.6 <-> 3.7", "#### 3.5.1.6 Validation Rules (before frontend submit)", "#### 3.5.1.7 Submit Flow (frontend)", "### 3.7 Validation Rules (before frontend submit)", "### 3.8 Submit Flow (frontend)"),
    ("3.5.1.7 <-> 3.8", "#### 3.5.1.7 Submit Flow (frontend)", "#### 3.5.1.8 Backend Pipeline — `POST /reports`", "### 3.8 Submit Flow (frontend)", "### 3.9 Backend Pipeline — `POST /reports`"),
    ("3.5.1.8 <-> 3.9", "#### 3.5.1.8 Backend Pipeline — `POST /reports`", "#### 3.5.1.9 Post-Creation Flow — Review Transcription", "### 3.9 Backend Pipeline — `POST /reports`", "### 3.10 Post-Creation Flow — Review Transcription"),
    ("3.5.1.9 <-> 3.10", "#### 3.5.1.9 Post-Creation Flow — Review Transcription", "#### 3.5.1.10 Edge Cases", "### 3.10 Post-Creation Flow — Review Transcription", "### 3.11 Edge Cases"),
    ("3.5.1.10 <-> 3.11", "#### 3.5.1.10 Edge Cases", "#### 3.5.1.11 Response Shapes", "### 3.11 Edge Cases", "### 3.12 Response Shapes"),
    ("3.5.1.11 <-> 3.12", "#### 3.5.1.11 Response Shapes", "#### 3.5.1.12 Recap of Amended Namings", "### 3.12 Response Shapes", "### 3.13 Assistant — AI Report Chat"),
    ("3.5.1.12 <-> 4. recap", "#### 3.5.1.12 Recap of Amended Namings", "  - 3.5.2 Assistant — AI Report Chat", "## 4. Recap of Amended Namings", None),
    ("3.5.2 <-> 3.13", "  - 3.5.2 Assistant — AI Report Chat", "  - 3.6 Report Details Page", "### 3.13 Assistant — AI Report Chat", "### 3.14 Report Details Page"),
    ("3.6 <-> 3.14+3.15", "  - 3.6 Report Details Page", None, "### 3.14 Report Details Page", "## 4. Recap of Amended Namings"),
]

REMAP = [
    ("3.5.1.10", "3.11"),
    ("3.5.1.9", "3.10"),
    ("3.10.6", "3.10"),
    ("3.10.1", "3.10"),
    ("3.5.2", "3.13"),
]

DROPS = (
    "**File:**",
    "**Layout Context:**",
    "**Setup:**",
    "**Backend reference:**",
    "- `displayName`",
    "- Tree-shaken",
    "- `React.lazy(",
    "- React.lazy(",
)

HEADING_RE = re.compile(r"^#{1,6}\s*(?:\d+(?:\.\d+)*\.?\s+)?(.*)$")
DASH_HEADING_RE = re.compile(r"^-\s*(\d+(?:\.\d+)*)\s+(.*)$")


def strip_heading(s):
    m = HEADING_RE.match(s)
    if m:
        return m.group(1)
    m = DASH_HEADING_RE.match(s)
    if m:
        return m.group(2)
    return s


def normalize(lines):
    out = []
    for raw in lines:
        s = raw.strip()
        if not s or s == "---":
            continue
        m = strip_heading(s)
        s = m
        for old, new in REMAP:
            s = s.replace(old, new)
        if s.startswith(DROPS):
            continue
        out.append(s)
    return out


def extract(doc_lines, anchor):
    start = None
    for i, ln in enumerate(doc_lines):
        if ln.startswith(anchor):
            start = i
            break
    if start is None:
        return None
    return doc_lines[start:]


def find_line(lines, anchor):
    for i, ln in enumerate(lines):
        if ln.lstrip().startswith(anchor.lstrip()):
            return i
    return None


def span(doc_lines, start_anchor, end_anchor):
    start = find_line(doc_lines, start_anchor)
    if start is None:
        return []
    end = len(doc_lines)
    if end_anchor is not None:
        end_line = find_line(doc_lines[start + 1:], end_anchor)
        if end_line is not None:
            end = start + 1 + end_line
    return doc_lines[start:end]


def count_changes(a, b):
    sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
    total = 0
    samples = []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == "equal":
            continue
        if tag == "replace":
            total += max(len(a[i1:i2]), len(b[j1:j2]))
        elif tag == "delete":
            total += len(a[i1:i2])
        elif tag == "insert":
            total += len(b[j1:j2])
        for k in range(min(i2 - i1, j2 - j1)):
            if len(samples) < 5:
                samples.append(("wf: " + a[i1 + k], "tm: " + b[j1 + k]))
        if len(samples) < 5 and i2 - i1 > j2 - j1:
            for k in range(j2 - j1, i2 - i1):
                samples.append(("wf-only: " + a[i1 + k], ""))
                if len(samples) >= 5:
                    break
        if len(samples) < 5 and j2 - j1 > i2 - i1:
            for k in range(i2 - i1, j2 - j1):
                samples.append(("", "tm-only: " + b[j1 + k]))
                if len(samples) >= 5:
                    break
    return total, samples


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    wf_lines = WF.read_text(encoding="utf-8").splitlines()
    tm_lines = TM.read_text(encoding="utf-8").splitlines()

    grand_total = 0
    for name, wf_start, wf_end, tm_start, tm_end in PAIRS:
        wf_sec = span(wf_lines, wf_start, wf_end)
        tm_sec = span(tm_lines, tm_start, tm_end)
        wf_norm = normalize(wf_sec)
        tm_norm = normalize(tm_sec)
        total, samples = count_changes(wf_norm, tm_norm)
        grand_total += total
        status = "OK" if total == 0 else "DIFF"
        print(f"[{status}] {name}: {total} differing lines")
        for wf_line, tm_line in samples:
            print(f"    {wf_line}")
            print(f"    {tm_line}")
        if total == 0 and (not wf_sec or not tm_sec):
            print("    !! empty section detected (anchor mismatch?)")
            grand_total += 1

    if grand_total == 0:
        print(f"\nALIGNED: all {len(PAIRS)} mirrored pairs match.")
        return 0
    print(f"\nMISALIGNED: {grand_total} differing lines total.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
