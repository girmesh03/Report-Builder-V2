# -*- coding: utf-8 -*-
"""
Verify docs/initial-doc.md (post-merge single source of truth) is complete
and self-aligned:

  1. no references to the deleted/retired working drafts anywhere
     (temp.md / temp.wav / standalone "temp" — prose like "temp audio files"
     is exempt)
  2. top-level sections "## 1 .. ## 34" present, in order
  3. no duplicate heading numbers (real "#" headings only)
  4. every internal ref (N.M[.K][, Title]) and every self §N.M[.K] resolves
     to an existing heading number or a numbered bullet ("- N.M ...").
     A trailing ", Title" is matched against the heading/sub-block titles
     when possible; unmatched titles are warnings only.

Exit code 0 = OK, 1 = violations. stdlib only.
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOC = ROOT / "docs" / "initial-doc.md"

SECTION_ORDER = [
    "## 1. Project Identity",
    "## 2. Problem Statement",
    "## 3. Manual Reporting Mental Model",
    "## 4. Supporting Features Needed Because Of The Core Problem",
    "## 5. Report And Branch Domain",
    "## 6. Report Format, Samples, And Tone",
    "## 7. Language Rules",
    "## 8. Transcription Accuracy Requirement",
    "## 9. Technical Stack And Package Rules",
    "## 10. Backend Architecture",
    "## 11. Authentication, Authorization, Cookies, And Tokens",
    "## 12. Frontend Architecture",
    "## 13. Redux, RTK Query, And API Client",
    "## 14. MUI, MUI X, Theme, And Component Standards",
    "## 15. React Hook Form Standards",
    "## 16. UI Rules",
    "## 17. Environment Variables",
    "## 18. Addis AI Integration",
    "## 19. Other AI Providers",
    "## 20. Audio Recording And STT Pipeline",
    "## 21. AI Prompt Requirements",
    "## 22. Export",
    "## 23. Mock Data",
    "## 24. Data Model",
    "## 25. Project Directory Structure",
    "## 26. Code Quality And Coding Conventions",
    "## 27. JSDoc Conventions",
    "## 28. Error Handling Patterns",
    "## 29. Security",
    "## 30. New File Creation Rules",
    "## 31. Validation And Audit",
    "## 32. Git And Phase Protocol",
    "## 33. Decision Log (ADRs)",
    "## 34. Glossary",
]

NUM_HEADING_RE = re.compile(r"^\s*#{1,6}\s*(\d+(?:\.\d+)*)\.?\s+(.*)$")
DASH_HEADING_RE = re.compile(r"^\s*-\s+(\d+(?:\.\d+)*)\s+(.*)$")
SUB_HEADING_RE = re.compile(r"^\s*#{5,6}\s+([^#].*)$")
PAREN_REF_RE = re.compile(r"\((\d+\.\d+(?:\.\d+)*)(?:,\s*([^)]+))?\)")
SECTION_REF_RE = re.compile(r"§(\d+\.\d+(?:\.\d+)*)(?:,\s*([^)]+))?")


def strip_num_title(s):
    m = NUM_HEADING_RE.match(s)
    if m:
        return m.group(1), m.group(2).strip()
    m = DASH_HEADING_RE.match(s)
    if m:
        title = m.group(2).strip()
        if title[:1].isupper() and ":" not in title:
            return m.group(1), title
    return None, None


def norm_title(s):
    return re.sub(r"[()]", "", s).strip().lower()


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    text = DOC.read_text(encoding="utf-8")
    lines = text.splitlines()
    errors = []
    warnings = []

    temp_hits = [ln for ln in lines if re.search(r"\btemp\b", ln) and "temp audio" not in ln]
    if temp_hits:
        for ln in temp_hits[:5]:
            errors.append(f"working-draft \"temp\" reference: {ln.strip()[:100]}")
    else:
        print("[OK] no temp working-draft references")

    positions = []
    for sec in SECTION_ORDER:
        positions.append(next((i for i, ln in enumerate(lines) if ln.rstrip() == sec), None))
    if any(p is None for p in positions):
        for sec, p in zip(SECTION_ORDER, positions):
            if p is None:
                errors.append(f"missing section: {sec}")
    elif positions != sorted(positions):
        errors.append("sections out of order")
    else:
        print(f"[OK] sections ## 1 .. ## 34 present, in order ({len(SECTION_ORDER)} sections)")

    headings = []       # (num, title, line) — headings AND numbered bullets
    numbered = []       # real "#" heading numbers only (duplicate check)
    bullet_nums = set() # numbers of numbered bullets ("- N.M ...")
    current_num = None
    for i, ln in enumerate(lines, 1):
        is_heading = bool(NUM_HEADING_RE.match(ln))
        num, title = strip_num_title(ln)
        if num:
            headings.append((num, title, i))
            if is_heading:
                numbered.append(num)
            else:
                bullet_nums.add(num)
            current_num = num
        elif current_num:
            m = SUB_HEADING_RE.match(ln)
            if m:
                headings.append((current_num, m.group(1).strip(), i))

    seen = {}
    for num in numbered:
        seen.setdefault(num, []).append(0)
    for num, idxs in seen.items():
        if len(idxs) > 1:
            errors.append(f"duplicate heading number {num} ({len(idxs)} entries)")
    if not errors:
        print(f"[OK] heading numbers unique ({len(set(numbered))} numbered headings, "
              f"{len(headings)} total heading/bullet entries)")

    def resolve(num, title, line_no):
        if num not in seen and num not in bullet_nums:
            return False, f"no heading {num}"
        if title:
            want = norm_title(title)
            if not any(n == num and norm_title(t).startswith(want)
                       for n, t, i in headings):
                warnings.append(f"L{line_no}: ref ({num}, {title.strip()}) — title matches no "
                                f"sub-block under {num}; number itself resolves")
        return True, None

    for i, ln in enumerate(lines, 1):
        for m in PAREN_REF_RE.finditer(ln):
            num, title = m.group(1), m.group(2)
            ok, why = resolve(num, title, i)
            if not ok:
                errors.append(f"L{i}: unresolvable ref ({num}{', ' + title.strip() if title else ''}): {why}")
        for m in SECTION_REF_RE.finditer(ln):
            num, title = m.group(1), m.group(2)
            ok, why = resolve(num, title, i)
            if not ok:
                errors.append(f"L{i}: unresolvable ref §{num}: {why}")

    for w in warnings:
        print("[warn] " + w)
    if errors:
        print(f"\nFAILED: {len(errors)} violation(s)")
        for e in errors:
            print("  " + e)
        return 1
    print("\nSELF-ALIGNED: no temp working-draft refs, sections complete, all refs resolve.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
