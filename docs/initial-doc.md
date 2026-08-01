# Report Builder V2

## 1. Project Identity

### 1.1 Project Name

Report Builder V2. Any older project-version wording must be normalized to V2.

### 1.2 Project Type

Intelligent web-based Report Builder system. MERN-style web application using Node.js, Express, MongoDB/Mongoose, and React. JavaScript-only project.

### 1.3 Primary User

The user is an Area Supervisor in a restaurant company with more than 14 branches in Addis Ababa, Ethiopia. On a normal workday, the supervisor may visit one or more branches. At the end of each day, the supervisor prepares a report for the boss.

### 1.4 Core Objective

Enable an Area Supervisor to record Amharic audio describing daily supervision activities and generate a boss-ready, professional, structured Amharic daily supervision report with less manual writing.

### 1.5 Product Principle

Every major technical, design, and AI-prompt decision should be checked against this question: Does this help the supervisor generate a boss-ready Amharic daily report from recorded Amharic supervisor activity faster, more accurately, and with less manual writing? If the answer is no, the feature is secondary and should not distract from the core workflow.

### 1.6 Vision Statement

Eliminate the dependency on manually writing daily supervision reports using conventional document editing tools. Enable an Area Supervisor to speak their day in Amharic and receive a boss-ready, professionally structured daily supervision report with minimal manual effort.

### 1.7 Out of Scope

- Text-to-speech — deferred to later version.
- Realtime audio processing — deferred to later version.
- Advanced analytics dashboard with detailed metrics — deferred to later version.
- Mobile native apps (iOS/Android) — web-only.
- Role-based access control — single user type (Area Supervisor).
- Automated translation — reports remain in original language.

---

## 2. Problem Statement

### 2.1 Core Problem

Area Supervisors in restaurant companies with multiple branches are responsible for visiting one or more branches each day to monitor operations, evaluate compliance with company standards, identify operational issues, provide guidance to branch teams, and ensure that corrective actions are implemented. At the end of every working day, they are required to prepare a comprehensive supervision report that accurately documents all activities performed, observations made, issues identified, recommendations provided, and follow-up actions required.

Preparing these daily reports is a time-consuming and inefficient process. Since an Area Supervisor spends most of the working day traveling between branches and conducting supervision activities, there is little or no opportunity to prepare reports while on-site. As a result, reports are typically prepared manually after returning home using document editing tools such as Microsoft Word. The supervisor must recall the entire day's activities from memory, organize scattered information, manually format the report according to the required reporting structure, and ensure that all important details are included. This repetitive manual process is labor-intensive, mentally demanding, and prone to omissions, inconsistencies, formatting errors, and inaccuracies.

The challenge becomes greater because supervision activities are naturally unstructured. Throughout the day, the supervisor may inspect multiple branches, communicate with managers and employees, identify operational and maintenance issues, verify inventory and cleanliness, observe customer service quality, follow up on previous actions, and provide recommendations for operational improvements. These activities are often remembered as a continuous narration or conversation rather than as a structured report. Manually transforming this unorganized information into a professional report requires considerable effort and significantly increases the possibility of overlooking important observations and follow-up actions.

In addition to report preparation, there is no centralized system for managing supervision activities. Information related to branches, daily supervision reports, transcriptions, generated reports, AI conversations, and historical records is often maintained separately or manually, making it difficult to efficiently organize, search, update, retrieve, and review previous reports. Managing supervision records for multiple branches over an extended period becomes increasingly difficult, reducing operational efficiency and limiting the ability to monitor historical performance, identify recurring issues, and support informed decision-making.

The existing reporting process depends heavily on manual writing, including using Telegram and WhatsApp, rather than intelligent automation. Although supervisors can verbally describe everything they accomplished during the day, there is no integrated system capable of converting an unstructured audio recording into a structured, professional supervision report. Consequently, valuable time is spent rewriting information that has already been communicated verbally instead of allowing technology to automate the transformation process.

Existing speech-to-text and artificial intelligence solutions generally provide limited support for Ethiopian languages, particularly Amharic, making it difficult to accurately transcribe spoken supervision activities and generate professional reports. This limitation prevents supervisors from fully utilizing AI-assisted reporting workflows while maintaining the linguistic accuracy required for business reporting.

As a result, the current reporting process reduces productivity, consumes valuable personal time outside working hours, delays report submission, introduces inconsistencies in report quality, and increases administrative workload. Supervisors repeatedly perform routine documentation tasks that could otherwise be automated, allowing them to dedicate more time to operational supervision, problem solving, and continuous improvement across all branches.

Therefore, there is a need for an intelligent web-based Report Builder system that eliminates the dependency on manually writing daily supervision reports using conventional document editing tools. The proposed system should enable an Area Supervisor to record one or more audio narrations describing all supervision activities performed during a specific day, regardless of whether the narration is structured or conversational. The system should accurately transcribe the recorded audio, allow the supervisor to review and edit the transcription when necessary, utilize an AI model optimized for Amharic language processing to analyze the transcription, and automatically generate a professional, well-structured daily supervision report that follows the organization's reporting format.

In addition to automating report generation, the system should provide centralized management of branches, daily reports, transcriptions, AI conversations, generated reports, report version history, user profile information, and reporting analytics through a unified web application. Reports should remain editable after generation, preserve historical versions, support supervision activities performed across multiple branches within a single working day, and be exportable in multiple formats such as PDF, TXT, CSV, and spreadsheet documents. By transforming the complete reporting workflow from manual documentation into an AI-assisted digital process, the proposed system will significantly improve reporting efficiency, enhance report consistency and accuracy, simplify branch and report management, reduce administrative workload, eliminate repetitive manual report writing, and enable Area Supervisors to perform their daily reporting responsibilities more effectively and efficiently.

### 2.2 Real-World Context

The supervisor may perform the following activities at each branch:

- Check daily operational activities.
- Check cleanliness.
- Check employee readiness.
- Follow a checklist.
- Observe urgent branch problems.
- Communicate with staff or responsible people.
- Follow up on previously reported issues.
- Take action or give instructions.
- Form an opinion about branch performance.
- Identify things that need immediate attention.
- Identify things that can make the branch better.

At the end of each day, the report must explain:

- Date.
- Branch.
- Working time.
- Completed activities.
- Unresolved issues.
- General opinion.
- Work exit time.

### 2.3 Main Pain Points To Solve

#### 2.3.1 Manual Report Writing Takes Too Much Effort

The supervisor should not need to write the whole report manually after a long workday. Currently the process depends on Telegram, WhatsApp, Microsoft Word, or Google Docs.

#### 2.3.2 The Supervisor Is Mobile During The Day

Because the supervisor moves between branches, recording audio is more realistic than typing.

#### 2.3.3 The Source Information Is Conversational

The spoken explanation may not follow the final report order. The AI must organize it.

#### 2.3.4 Amharic Accuracy Matters

The conversation is always Amharic. The system must treat Amharic quality as a core requirement, not as an optional language feature.

#### 2.3.5 Report Tone Must Match Existing Reports

The output must sound like the provided report samples.

#### 2.3.6 Technical Words Must Sound Natural

English workplace terms must be represented in natural Amharic workplace transliteration, not literal translation.

#### 2.3.7 The User Must Stay In Control

The user must be able to review generated reports and request corrections. Corrections must update only the relevant part of the generated report without rewriting correct unrelated sections unnecessarily.

### 2.4 What The Project Is Not Mainly About

Secondary features should not distract from the core workflow of generating a boss-ready Amharic daily report from recorded Amharic supervisor activity.

---

## 3. Manual Reporting Mental Model

### 3.1 Person 1

Person 1 is the supervisor who wants a report to be prepared. Person 1 explains the day to Person 2 in Amharic. Person 1 may mention:

- The report date.
- The branch or branches visited.
- The time he entered work.
- The time he left work.
- The time range spent at each branch.
- The activities performed.
- The checklist-based work completed.
- The urgent issues or problems that require attention.
- The actions taken.
- The people contacted.
- The follow-up needed.
- General opinions about the branch.
- Opinions about raised issues or problems.
- Suggestions that could make things better.

Person 1 may explain the information naturally, not in report format. The explanation may be conversational, repeated, incomplete at first, or clarified later.

### 3.2 Person 2

Person 2 is a friend of Person 1. Person 2 does not have any work relationship with the company. Person 2 listens carefully and tries to understand what Person 1 wants to say. During the conversation, Person 2 may ask WH questions such as: What date was it? Which branch did you visit? What time did you enter work? What time did you leave? What activities did you perform? What problems did you find? What actions did you take? Who did you inform? What issue still needs a solution? What is your general opinion?

After listening and understanding, Person 2 writes a complete report for Person 1. Then Person 1 reviews the report. If something is wrong, missing, unclear, or not written in the desired way, Person 1 asks Person 2 to correct it. Person 2 updates the report until Person 1 is satisfied.

### 3.3 How This Mental Model Maps To The App

In the app:

- Person 1 is the user/supervisor.
- Person 2 is the Addis AI-powered system.

The supervisor provides a recorded Amharic audio explanation of the day. The app sends the audio to Addis AI speech-to-text to produce transcription. The transcription is expected to contain the needed information, but it will not be organized as a final report.

After transcription, the AI must process, extract, organize, and rewrite the information based on the required report rules, report format, tone, and system prompt.

The AI is responsible for:

- Extracting date information.
- Extracting branch names.
- Extracting working time and branch time ranges.
- Extracting performed activities.
- Extracting unresolved issues.
- Extracting urgent problems.
- Extracting actions already taken.
- Extracting general opinions.
- Organizing the extracted information into the required report format.
- Writing the report in Amharic.
- Matching the tone of the provided report samples.
- Correcting or updating the generated report when the user asks after review.

The AI must not treat the transcription as the final report. The transcription is only raw material. The generated report is the organized final output.

---

## 4. Supporting Features Needed Because Of The Core Problem

The following features support the central workflow:

- Authentication, so reports belong to the correct user.
- Profile, so supervisor identity can appear in reports.
- Branch management, so visited branches can be selected.
- Report management list and grid views, so previous reports can be found.
- Audio recording, so the supervisor can speak instead of writing.
- Audio playback and re-recording, so the supervisor can confirm the recording before submission.
- Addis AI speech-to-text, so Amharic audio becomes text.
- Transcription review by AI, so the user can correct raw AI transcription using AI before report generation.
- Addis AI text generation, so raw transcription becomes a structured report.
- Report CRUD, so the user can manage reports.
- Branch CRUD, so the user can manage branches.
- Export, so the report can be shared or archived.

---

## 5. Report And Branch Domain

### 5.1 Branch Context

- The company has more than 14 branches in Addis Ababa, Ethiopia.
- A supervisor may visit one or more branches in one working day.
- The report format must support one branch or multiple branches.
- Multi-branch reports must preserve branch-specific details.
- Multi-branch reports must preserve time ranges per branch when the audio contains them.
- All list endpoints use `mongoose-paginate-v2` with default page `1`, default limit `10`, and max limit `100`.
- Branch CRUD is required so the user can manage branch records.

### 5.2 Report Context

- Daily reports belong to the correct authenticated user.
- Reports should remain editable after generation.
- Reports should preserve historical versions.
- Report management requires list and grid views.
- Previous reports must be searchable, updateable, retrievable, and reviewable.
- All list endpoints use `mongoose-paginate-v2` with default page `1`, default limit `10`, and max limit `100`.
- Report CRUD is required so the user can manage reports.
- Report content must be generated from reviewed transcription, not directly from raw audio.

### 5.3 Report Fields Explicitly Named In The Source Notes

The generated report must include:

- ቀን
- ብራንች
- ስም
- ስራ የገባሁበት ሰዓት
- የተሰሩ ስራዎች
- መፍትሄ የሚፈሉ ጉዳዮች
- አጠቃላይ አስተያየት
- ከስራ የወጣሁበት ሰዓት

### 5.4 Additional Report-Related Records Explicitly Named In The Source Notes

The system should manage: daily supervision reports, transcriptions, AI conversations, generated reports, report version history, and reporting analytics. Detailed fields for those records are not fully specified in the source notes and must be defined during the data-modeling phase.

---

## 6. Report Format, Samples, And Tone

### 6.1 Required Report Format

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

The format must support one branch or multiple branches. When multiple branches are visited, the working time section should show the time range for each branch.

Example:

```text
ስራ የገባሁበት ሰዓት:
ከ02:30 - 07:40 መድኃኒዓለም ብራንች
ከ07:55 - 12:20 ኤርፖርት ብራንች
```

### 6.2 Report Output Sample 1

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

### 6.3 Report Output Sample 2

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

### 6.4 Report Output Sample 3

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

### 6.5 Required Report Tone

The generated report must sound like the samples above. The tone should be:

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

The AI must transform conversation into report language. For example, if the audio says something conversational like `እኔ ዛሬ መድኃኒዓለም ሄጄ ቼክሊስቱን አይቼ ነበር`, the report should not simply repeat the conversation. It should write in the report style:

```text
በቼክሊስቱ መሰረት በመድኃኒዓለም ቅርንጫፍ የሚከናወኑ መደበኛ የአሰራር ሂደቶችን አረጋግጫለሁ።
```

### 6.6 Strict AI Generation Rules

The AI must follow these rules when generating the report:

1. Generate the report in Amharic.
2. Use the exact section structure required by the report format.
3. Match the tone and writing style of the provided samples.
4. Use the reviewed transcription as the source of truth.
5. Do not invent missing dates, branch names, times, actions, people, problems, or opinions.
6. If required information is missing, leave it blank or mark it as not specified according to the chosen prompt rule.
7. Separate completed activities from unresolved issues.
8. Put urgent problems under `መፍትሄ የሚፈሉ ጉዳዮች`.
9. Put general branch opinion or improvement opinion under `አጠቃላይ አስተያየት`.
10. Preserve branch-specific details when multiple branches are mentioned.
11. Preserve time ranges per branch when the audio contains them.
12. Write from the supervisor's point of view.
13. Do not output an explanation of how the report was generated.
14. Do not include unrelated conversation content.
15. Do not include Person 2's questions unless the answer contains report information.
16. When the user asks for correction or update after review, update the report according to the user's instruction without changing unrelated correct content.

### 6.7 Strict Rule For English And Technical Words In The Audio

The audio conversation is Amharic, but it may include English or technical workplace words. The AI must not translate such words literally into unnatural Amharic. The AI must also not leave them in English spelling if the expected report style uses Amharic phonetic writing.

Instead, the AI must write English or technical words in the common Amharic workplace pronunciation/transliteration style. Example: if the audio mentions `deep fryer`, the report must not write `deep fryer` and must not translate it literally as `ጥልቅ መጥበሻ`. It must write `ዲፕ ፍራየር`. This rule applies to all English or technical words.

More examples:

- `locker` → `ሎከር`
- `kitchen` → `ኪችን`
- `exhaust fan` → `ኤግዝስት ፋን`
- `technician` → `ቴክኒሻን`
- `store` → `ስቶር`

### 6.8 What The Transcription Represents

The transcription is not the final report. The transcription is only the raw Amharic text version of the recorded conversation or spoken explanation. It may include repetition, unordered information, questions and answers, informal wording, clarifications, corrections, side comments, and mixed technical terms. When someone reads the transcription, they should be able to understand the information. But the transcription itself cannot be used directly as the report because it is not organized, polished, or formatted. The AI must process the transcription and convert it into the required report structure.

### 6.9 Required Correction And Update Behavior

After the AI generates the report, the supervisor must be able to review it. If the supervisor says something like:

- `ይህን ችግር ወደ መፍትሄ የሚፈሉ ጉዳዮች አስገባው`
- `የመውጫ ሰዓቱን 12:30 አድርገው`
- `ይህን አስተያየት አጠቃላይ አስተያየት ውስጥ አስገባው`
- `ይህን ክፍል አጥፋው`
- `ቃሉን እንደዚህ ቀይረው`

The AI must update only the relevant part of the generated report. It must not rewrite correct unrelated sections unnecessarily.

### 6.10 Example Of Audio Transcription Before AI Organization

The following example is conversational but contains necessary information:

```text
ቀን 09 11 18 ብራንች ጎላጉል እና ብስራተ ገብርኤል ብራንች ጎላጉል እና ብስራተ ገብርኤል ስም ቤዛ አያሌው ስም ቤዛ አያሌው ስራ የገባሁበት ሰዓት ከ አንድ ሰአት ከአምስት እስከ ሁለት ሰአት ከሃያ ጎላጉል ብራንች ከሶስት ሰአት ከ ሶስት ሰአት ከሰላሳ እስከ ዘጠኝ ሰአት ከሃያ በስራተ ገብርኤል ከዘጠኝ ሰአት ከሃምሳ አምስት እስከ አስራ ሁለት ሰአት ጎላጉል ብራንች የተሰራ ስራ በቴክ ሊስቱ መሰረት በቼክ ሊስቱ መሰረት በሁለቱም ብራንቾች የሚከናወኑ ስራዎችን በአግባቡ መሆናቸውን አረጋግጫለሁ። ሌላ የተሰራ ስራ አንዳንድ ሰራተኞች ብራንቹ የት ነበር? በጎላጎል ብራንድ ያሉ አንዳንድ ሰራተኞች ላይ የአሰራር ስርዓት ክፍተት ስለነበረ እነዚህ የአሰራር ስርዓት ያለባቸውን ሰራተኞችን እና ሱፐርቫይዘሩን ጨምሮ ያየሁትን የስራ አሰራር ክፍተት በድጋሚ እንዳይፈጽሙት መመሪያ ሰጥቻቸዋለሁ። በጎላጉል ቅርንጫፍ ማክሰኞ ሪፖርት ተደርጎ የነበረው የእቃ ማጠቢያ ሲንክ ድሬኔጅ እንዲስተካከል ጠይቄ የነበረው ማትያስ መጥቶ አስተካክሎታል። በብስራተ ገብርኤል ከዚህ በፊት ተጠይቆ የነበረው ኢንሴክት ኪለር በማትያስ አማካኝነት እንዲሰቀል አድርጌያለሁ።ሌላ ኢሹ ወይም አፋጣኝ መፍትሄ የሚፈልግ ጉዳዮች  አፋጣኝ መፍትሄ የሚፈልጉ ጉዳዮች በብስራተ ገብርኤል ያለው ዲፕ ፍራየር ኮንታክተር ችግር ነበረበት እሱ እንዲስተካከል ማትያስን አናግሬዋለሁ ስለዚህ ነገ መጥቶ ያስተካክለዋል ወይም እንደሚያስተካክለው አረጋግጦልኛል ሌላ በብስራተ ግብረ ኤል ያለ አፋጣኝ መፍትሄ የሚፈልግ ችግር በእግር ተረግጦ ኦፕሬት የሚደረግ እጅ መታጠቢያ አለ ይህ እጅ መታጠቢያ በቢውልዲንጉ ወይም ደግሞ በህንፃው ላይ ያሉ ሰራተኞች ወይም የሌላ ድርጅት ሰራተኞች አብረውን ስለሚጠቀሙ የከፍተኛ የሆነ የሳሙና እና የውሃ በክነት አለ የሆነ የሳሙና እና የውሃ ብክነት አለ። እጅ መታጠቢያውም ቶሎ ቶሎ እየተበላሸ ነው። ስለዚህ ይሄ ከህንፃው አሰራሮች ከህንፃው አሰራሮች ጋራ በመነጋገር አፋጣኝ መፍትሄ ይፈልጋል። እ ሌላ በጎላጉል ብራንች አፋጣኝ መፍትሄ የሚፈልግ ጉዳይ እ ሶኬት እና ማብሪያ ማጥፊያዎች የላሉ መስተካከል ያለባቸው ልክ ያልሆኑ አሉ። እነሱን እንደ እንዲያስተካክል ማቲያስን አናግሬው ነገ መጥቶ እንደሚያስተካክል አሳውቆኛል አጠቃላይ አስተያየት በሁለቱም ብራንቾች ያለው የስራ እንቅስቃሴ ጥሩ ነው
```

### 6.11 Example After AI Organization

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

መፍትሄ የሚፈልጉ ጉዳዮች:
በብስራተ ገብርኤል ብራንች ያለው የዲፕ ፍራየር ኮንታክተር ተበላሽቶ ስለነበር ለማትያስ አሳውቄዋለሁ፤ ነገ መጥቶ እንደሚያስተካክለው አረጋግጦልኛል።
በብስራተ ገብርኤል በእግር ተረግጦ የሚሰራው የእጅ መታጠቢያ በህንፃው ላይ ባሉ የሌሎች ድርጅት ሰራተኞች ጭምር ጥቅም ላይ እየዋለ ይገኛል። በዚህም የተነሳ ከፍተኛ የሳሙና እና የውሃ ብክነት ከመኖሩም በላይ እጅ መታጠቢያው ቶሎ ቶሎ እየተበላሸ በመሆኑ፣ ከህንፃው አስተዳደር ጋር በመነጋገር አፋጣኝ መፍትሄ ሊሰጠው ይገባል።
በጎላጉል ብራንች የላሉ ሶኬቶች እና ማብሪያ ማጥፊያዎች ስላሉ ለማትያስ አሳውቄዋለሁ፤ ነገ መጥቶ እንደሚያስተካክል ነግሮኛል።

አጠቃላይ አስተያየት:
በአጠቃላይ በሁለቱም ብራንቾች ያለው የስራ እንቅስቃሴ ጥሩ ነው።

ከስራ የወጣሁበት ሰዓት: 12:00
```

---

## 7. Language Rules

- App shell, navigation, labels, buttons, validation messages, helper text, and everything else in the application interface must be English.
- Audio, transcription, AI chat, and report content can be Amharic, English, or mixed.
- Do not force translation unless the user explicitly chooses it.
- The conversation language in recorded audio is always Amharic.
- Addis AI is selected because it is specialized in Ethiopian Amharic language and is expected to produce more accurate transcription and report generation than general AI tools that are not focused on Ethiopian language use cases.

---

## 8. Transcription Accuracy Requirement

Transcription accuracy is the foundation of the entire product. Every subsequent step, including AI report generation, export, and review, depends on accurate transcription. Garbage transcription produces garbage reports.

Every implementation decision related to chunking strategy, format conversion, MIME type, error handling, and provider use must prioritize transcription accuracy over convenience, performance, or code simplicity. Convenience, performance, and code simplicity must also be perfect.

The chunking pipeline and correct MIME type per chunk are critical safeguards. Re-transcription must be available to verify accuracy on every audio recording.

Accuracy regression is a blocking defect. Any change to the STT pipeline, including chunking, format conversion, MIME type, language code, or provider endpoint, that degrades transcription quality must be reverted immediately. Accuracy must be verified with real Amharic audio before merging.

---

## 9. Technical Stack And Package Rules

### 9.1 Stack Rules

- Backend: Node.js, Express, Mongoose, ES Modules only (`"type": "module"`), no CommonJS, no `require()`.
- Initial backend packages are installed in `backend/package.json`.
- Required additional backend packages can be installed.
- Frontend: React 19, Vite 8, MUI 9, React Redux, Redux Toolkit, React Router 8, React Hook Form.
- Initial frontend packages are installed in `client/package.json`.
- Required additional frontend packages can be installed.
- JavaScript only.
- No TypeScript. No `.ts`. No `.tsx`. No TS config.
- No Next.js. No Remix. No other frameworks.
- No Tailwind CSS.
- Use MUI `sx` and `styled()` only.
- No automated test frameworks.
- No zod validation library — use manual resolvers with consistent error shape.
- HTTP client strategy: Addis AI calls use native `fetch` on the backend. All other service calls use axios. RTK Query uses `fetchBaseQuery` with `baseQueryWithReauth`.

### 9.2 Package Source Of Truth

- If package versions differ between notes and package manifests, `backend/package.json` and `client/package.json` are the source of truth.
- The packages are already installed.
- Other required packages can be installed if needed.

### 9.3 Backend Package Snapshot

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "dependencies": {
    "bcryptjs": "^3.0.3",
    "compression": "^1.8.1",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.6",
    "dayjs": "^1.11.21",
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "express-async-handler": "^1.2.0",
    "express-mongo-sanitize": "^2.2.0",
    "express-rate-limit": "^8.5.2",
    "express-validator": "^7.3.2",
    "helmet": "^8.3.0",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.7.4",
    "mongoose-paginate-v2": "^1.9.5",
    "multer": "^2.2.0"
  },
  "devDependencies": {
    "morgan": "^1.11.0",
    "nodemon": "^3.1.14"
  }
}
```

Note: Must change `"type": "commonjs"` to `"type": "module"` for ES Modules support.

### 9.4 Frontend Package Snapshot

```json
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@fontsource/inter": "^5.2.8",
    "@mui/icons-material": "^9.2.0",
    "@mui/lab": "^9.0.0-beta.6",
    "@mui/material": "^9.2.0",
    "@mui/x-charts": "^9.9.0",
    "@mui/x-chat": "^9.0.0-alpha.15",
    "@mui/x-data-grid": "^9.9.0",
    "@mui/x-date-pickers": "^9.9.0",
    "@reduxjs/toolkit": "^2.12.0",
    "dayjs": "^1.11.21",
    "jspdf": "^4.2.1",
    "jspdf-autotable": "^5.0.8",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-error-boundary": "^6.1.2",
    "react-hook-form": "^7.81.0",
    "react-media-recorder": "^1.7.2",
    "react-player": "^3.4.0",
    "react-redux": "^9.3.0",
    "react-router": "^8.2.0",
    "react-toastify": "^11.1.0"
  },
  "devDependencies": {
    "@babel/core": "^7.29.7",
    "@eslint/js": "^10.0.1",
    "@rolldown/plugin-babel": "^0.2.3",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "babel-plugin-react-compiler": "^1.0.0",
    "eslint": "^10.6.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.3",
    "globals": "^17.7.0",
    "vite": "^8.1.1"
  }
}
```

---

## 10. Backend Architecture

### 10.1 Routing

- All routes mounted under `/api/v1` in `app.js`.
- Each route module registered in `routes/index.js`.
- No routes registered directly in `app.js`.
- `routes/index.js` imports and mounts all route modules.
- New route modules must be created in `routes/`, imported, and mounted in `routes/index.js`.

### 10.2 Middleware

- Error handling pipeline required.
- Fixed global security middleware stack order: `helmet -> cors -> compression -> cookie-parser -> mongo-sanitize -> rate-limit`.
- The security middleware stack must not be reordered or removed.
- All middleware must be present.

### 10.3 Controllers

- One controller file per domain: auth, branch, report, audio, transcription, ai, user, analytics.
- `express-async-handler` from npm, imported as `asyncHandler`, wraps all controller handlers.
- No custom async wrapper.
- All write controllers use `try/catch/finally` with MongoDB sessions and transactions:
  - `mongoose.startSession()`
  - `session.startTransaction()`
  - write
  - commit or abort
  - `session.endSession()` in `finally`
- All model hooks, instance methods, and static methods must support session where relevant.
- `backend/mock/*` data injection and wipe must support session.
- Read-only endpoints such as get and list do not need transactions.
- Controllers forward errors via `next(error)`, handled automatically by `express-async-handler` to the global error handler.

### 10.4 Pagination

- Pagination uses `mongoose-paginate-v2` on all list endpoints.
- Default page: `1`.
- Default limit: `10`.
- Max limit: `100`.

### 10.5 Constants And Config

- Backend constants path: `backend/utils/constants.js`.
- Client constants path: `client/src/utils/constants.js`.
- No magic values anywhere.
- All constants objects are `Object.freeze()` frozen objects.
- New constants added to the relevant constants file, never hardcoded anywhere.
- All config via frozen `env` object from `config/env.js`.
- Never access `process.env` directly outside of `config/env.js`.
- All validation constants must be defined in the constants file, never hardcoded in validator files.

### 10.6 HTTP Status Codes

- HTTP status codes imported from `utils/httpStatus.js` by semantic name.
- Never hardcode numeric status codes.

### 10.7 Response Shape

- All successful backend responses use `{ success: true, message: "..", data: {..} }`.
- Error responses use `{ success: false, message: "..", data: {..} }`.

### 10.8 Server Startup And Shutdown

- Graceful shutdown on `SIGINT` and `SIGTERM`:
  - `server.close()`
  - Clean up temporary audio chunk files (if not linked to any report)
  - `mongoose.connection.close()`
  - `process.exit(1)`
- Graceful shutdown must not be removed or replaced.
- HTTP server starts before database connection so the health endpoint is reachable without DB.

### 10.9 Logging

- All logging via `utils/logger.js`.
- Winston used on backend only. Morgan in development mode only.
- No `console.log` in backend code — absolute ban. Winston replaces it in all environments.
- Log levels: error, warn, info, http, verbose, debug, silly. Development: debug level. Production: info level.
- Module labels via Winston child loggers: Server, DB, Auth, AI-Addis, AI-Gemini, AI-Nvidia.
- Log files written to `logs/` directory (gitignored), rotated daily via Winston daily rotate file transport, auto-deleted after 30 days.
- Safe logging in production logs must not include passwords, JWT token values, raw cookies, API keys or secrets, raw audio file contents, full transcription texts, or full generated report texts. Use message IDs or truncated previews instead.
- AI provider logs: log provider, model, status code, and timing. Do not log request or response bodies in production.

### 10.10 Validation

- Validators check `express-validator` results.
- Validation failure returns `422` with `{ success: false, message: "..", data: {..} }`.
- Validators live in separate files under `validators/*.js`, one per domain.
- Validators are applied as middleware on route before controller handler.
- Auth email validators use `normalizeEmail({ gmail_remove_dots: false })`.

### 10.11 Mongoose Schema Rules

- No schema field combines `unique: true` with separate indexes.
- Use `schema.index(..)`.
- Schema hooks, instance methods, and static methods must accept session options where relevant.

---

## 11. Authentication, Authorization, Cookies, And Tokens

- JWT-based authentication.
- Access token duration: `15m`.
- Refresh token duration: `7d`.
- Access token and refresh token stored in httpOnly cookies.
- Cookie options for both tokens:
  - `httpOnly: true`
  - `secure` in production
  - `sameSite: lax`
- Frontend uses `credentials: 'include'` on all calls, including public pages.
- `authenticate` middleware extracts JWT from `req.cookies.accessToken`.
- `authenticate` verifies the token, looks up the user, checks the user, and attaches the user document to `req.user`.
- `authenticate` uses `req.user._id.toString()` throughout, not `req.user.id`.
- Password hashing uses `bcryptjs` in a `pre('save')` hook with 12 salt rounds.
- `comparePassword(candidatePassword)` method uses `bcrypt.compare`.
- Plaintext passwords must never be compared.
- Refresh token rotated on each use to prevent replay.
- No sessions MongoDB collection — zero DB lookups for auth on each request.
- Registration form collects only `email` and `password`. No name field on the register form.
- On account creation, the backend auto-extracts `firstName` and `lastName` from the email local part (before `@`). For example, `beza@gmail.com` → `firstName=beza`, `lastName=beza`. Dotted local parts split: `beza.ayalew@gmail.com` → `firstName=beza`, `lastName=ayalew`.
- `avatar` and `position` are optional profile fields. The user updates them later from the Profile page, not during registration.
- Google OAuth registration uses Google-provided data instead of email extraction:
  - `firstName` and `lastName` extracted from Google profile name.
  - `email` taken from Google account email.
  - `avatar` taken from Google profile picture.
  - No password required for Google OAuth-created accounts.
  - Existing users matched by email and signed in; new users auto-created with Google data.
- Google OAuth button on login/register pages uses a Google icon start adornment and shows a loading spinner on click.
- Rate limiting three tiers:
  - Global: 100 requests per 15 minutes on all endpoints.
  - Auth: 20 requests per 15 minutes on register and login.
  - AI: 10 requests per 1 minute on generation and correction endpoints.
- OAuth architecture is provider-neutral.
- `oauth.service.js` checks `env.OAUTH_GOOGLE_*` credentials.
- Google is stubbed until credentials are configured.
- Future providers extend this service.
- `GET /oauth/google` route exists with `googleOAuth` controller using `getGoogleOAuthUrl()` service.

---

## 12. Frontend Architecture

### 12.1 Routing And Layout

- React Router data mode via `createBrowserRouter` and `RouterProvider`.
- Routes defined as flat array in `main.jsx`.
- No separate `AppRoutes.jsx` unless the file becomes unmanageably large.
- All new protected routes go inside `ProtectedRoute` element's children array.
- All new public routes go inside `PublicLayout` element's children array.
- Routes defined in `client/src/main.jsx`, not `App.jsx`.
- Each module uses lazy loading inside `createBrowserRouter`.
- Inside `createBrowserRouter`, never use `element`; use `Component`.
- `App.jsx` serves as root layout with AppTheme, CssBaseline, AppErrorBoundary, AppToastContainer, and `<Outlet />`.
- `LocalizationProvider` with `AdapterDayjs` wraps router in `main.jsx`.

### 12.2 Scroll And Shell Layout

- All layouts use outer `height: 100vh; overflow: hidden`.
- Chrome is fixed.
- Content uses `overflow-y: auto`.
- Never scroll `body` or `html`.
- PublicLayout uses MuiAppbar (fixed) plus scrollable content area.
- Protected layout AppShell uses AppSidebar and a content area as siblings. MuiAppbar (as the protected top bar) sits **inside** the content area, NOT spanning across the sidebar.
- AppShell uses the same `height: 100vh; overflow: hidden` outer wrapper.
- Content area structure: MuiAppbar (64px) → Page Header (icon + title, one line) → `<Outlet />`.

- 2.1 PublicLayout
  - **File:** `client/src/components/layout/PublicLayout.jsx`
  - **Purpose:** Root-level wrapper for public routes (Landing, Login, Register). No sidebar, no auth gating.
  - **Structure (column flex):**
    1. `MuiAppbar` (`position="fixed"`, public variant — logo, theme toggle, Login/Sign Up buttons)
    2. `<Outlet />` — scrollable content area, `overflow-y: auto`
  - **Outer container:** `height: 100vh; overflow: hidden`
  - **Auth Awareness:** Reads Redux `authSlice` — renders Login/Sign Up when unauthenticated, Logout (icon + tooltip) when authenticated
  - **Props:** none (structural layout)
  - **Setup:**
    - Tree-shaken imports
    - `displayName` set to `"PublicLayout"`


- 2.2 AppShell
  - **File:** `client/src/components/layout/AppShell.jsx`
  - **Purpose:** Protected layout wrapper for all authenticated pages (Dashboard, Reports, ReportDetails, Branches, BranchDetails, Profile, and the NotFound catch-all). Composes AppSidebar and MuiAppbar.
  - **Outer container:** `height: 100vh; overflow: hidden`
  - **Structure (horizontal flex):**
    - Left: `AppSidebar`
    - Right: content area — column flex:
      1. `MuiAppbar` (`position="static"`, 64px, protected variant — search icon, theme toggle, avatar dropdown)
      2. Page header (icon + title, one line) — rendered by each page, not a reusable component
      3. `<Outlet />` — scrollable content, `overflow-y: auto`
  - **Responsive Behavior:** Inherits AppSidebar responsive drawer behavior; content area resizes to fill remaining width
  - **Props:** none (structural layout)
  - **Setup:**
    - Tree-shaken imports
    - `displayName` set to `"AppShell"`


### 12.3 Sidebar And App Bar

#### MuiAppbar (Protected Layout Usage)

- MuiAppbar sits at the top-right of the content area (beside the sidebar, not across it).
- Components (right-aligned): Search icon (opens GlobalSearchDialog), Theme toggle (LightMode/DarkMode), User avatar (opens dropdown: Profile + Logout).
- No title text. No hamburger in this bar (hamburger is in sidebar header).
- Height: 64px.
- Responsive avatar sizes: 32px below 600px, 36px above 600px.

#### AppSidebar

- Sidebar header: Menu icon + Logo + App name "Report Builder". Menu icon toggles full/mini mode on permanent drawer.
- Nav items (top, `flexGrow: 1`): Dashboard, Reports, Branches, Profile. Each is a MuiListItemButton with icon + label.
- Bottom: MuiDivider + Logout (MuiListItemButton with icon + label).
- Responsive behavior:
  - `xs` (< 600px) and `sm` land (600-899px): Temporary overlay drawer, 240px, opens via sidebar header menu icon, closes on backdrop/nav select/Escape.
  - `md+` (≥ 900px) default: Permanent docked drawer, 240px, full icon + text.
  - `md+` after toggle: Permanent mini drawer, 64px, icons only (MuiTooltip on hover), header shows menu icon only.
- Nav item theming:
  - Default: `backgroundColor: transparent`, `color: text.secondary`.
  - Hover: `backgroundColor: action.hover`, `borderRadius: 8px`.
  - Selected: `backgroundColor: primary.main + 0.08`, `color: primary.main`, `fontWeight: 600`, `borderLeft: 3px solid primary.main`.
  - Icon selected: `color: primary.main`. Icon default: `color: action.active`.
  - Logout hover: `backgroundColor: error.main + 0.08`, `color: error.main`.
- Logout click dispatches `logout()` from RTK, clears cookies, navigates to `/login`.
- MuiAppbar logo navigates to `/dashboard` if authenticated, otherwise `/`.

#### GlobalSearchDialog

- Opened by search icon in MuiAppbar. Closed by back arrow, Escape, or click outside.
- Full-screen on < 600px and < 768px land (no border radius, 100vh). Centered dialog on larger screens (600-1200px: 80vh/600px, > 1200px: 70vh/720px).
- Search input uses React Hook Form `register('search')`, fires on Enter or click (no debounce).
- Results grouped by entity type (Reports, Branches) in MuiAccordion sections. Empty state shows "No results found".

- 2.3 AppSidebar
  - **File:** `client/src/components/layout/AppSidebar.jsx`
  - **Purpose:** Navigation sidebar for protected layout. Dual-mode: temporary overlay on mobile, permanent docked on desktop (full or mini).
  - **Drawer:** Uses MUI `Drawer` with `variant` switching between `"temporary"` and `"permanent"`
  - **Sidebar Header:** Menu icon + Logo + App name "Report Builder". Menu icon toggles full/mini mode on permanent drawer.
  - **Nav Items (top, `flexGrow: 1`):** Dashboard, Reports, Branches, Profile. Each is a `MuiListItemButton` with icon and label.
  - **Bottom:** `MuiDivider` + Logout (`MuiListItemButton` with icon + label). Logout dispatches `logout()` from RTK, clears cookies, navigates to `/login`.
  - **Responsive Drawer Logic:**
    - `< 600px` and `sm` land (600–899px): Temporary overlay drawer, 240px. Opens via menu icon, closes on backdrop / nav select / Escape.
    - `md+` (>= 900px) default: Permanent docked drawer, 240px. Full icon + text.
    - `md+` toggled: Permanent mini drawer, 64px. Icons only, `MuiTooltip` on hover. Header shows menu icon only.
  - **Nav Item Theming:**
    - Default: `backgroundColor: transparent`, `color: text.secondary`
    - Hover: `backgroundColor: action.hover`, `borderRadius: 8px`
    - Selected: `backgroundColor: primary.main + 0.08`, `color: primary.main`, `fontWeight: 600`, `borderLeft: 3px solid primary.main`
    - Icon selected: `color: primary.main`; icon default: `color: action.active`
    - Logout hover: `backgroundColor: error.main + 0.08`, `color: error.main`
  - **Props:** `open` (boolean), `onClose` (function), `sidebarMode` (`"full"` | `"mini"`), `onToggle` (function)
  - **Setup:**
    - Tree-shaken imports
    - `displayName` set to `"AppSidebar"`


### 12.4 Route Guards

- `ProtectedRoute` shows spinner during `initializing`.
- `ProtectedRoute` redirects unauthenticated users with `<Navigate to="/login" state={{ from: location }}>`.
- `ProtectedRoute` checks auth by calling `GET /api/v1/auth/me` on mount. On failure, clears auth state and redirects.
- `PublicRoute` is the inverse guard.
- `PublicRoute` redirects authenticated users to `/dashboard`.

### 12.5 Route Tree

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

- The `assistant` route is the only protected route outside AppShell (full-screen chat, 3.5.2).
- NotFound is the catch-all inside AppShell's children; logged-out users hitting an unknown URL are redirected to `/login` instead.
- Report editing happens in the Assistant chat — there is no `reports/:id/edit` route (3.5.1.9 is superseded).

### 12.6 Page Components

Landing, Login, Register, Dashboard, Reports, ReportDetails, Branches, BranchDetails, Profile, NotFound, Assistant (AppShell sibling, full-screen). All lazy-loaded via `React.lazy()`. Each page has its own domain component folder under `client/src/components/<domain>/` — the domain folders are `landing`, `login`, `register`, `dashboard`, `report`, `branch`, `profile`, `assistant`, and `notFound` (e.g. `client/src/components/login/LoginForm.jsx`); branch editing is a dialog under `branch/`, and report editing happens in the Assistant chat.

#### Landing

- Route: `{ index: true, Component: Landing }` — index route inside PublicLayout's children.
- Layout: PublicLayout (MuiAppbar fixed + scrollable content).
- Structure: Hero section only (Features section TBD). Centered max-width 1200px wrapper.
- Hero section: App logo/icon, headline "Build Better Reports", subheadline "Record, transcribe, and generate professional reports with AI", two CTA buttons — "Get Started" (contained, navigates to `/register`) and "Sign In" (outlined, navigates to `/login`).
- Hero headline responsive: `h3` on md+, `h4` on xs.
- Static page — no data fetching, no Redux. CTAs use `useNavigate()`. PublicRoute redirects authenticated users away.

- 3.1 Landing
  - **File:** `client/src/pages/Landing.jsx`
  - **Route:** `{ index: true, Component: Landing }` — index route inside PublicLayout's children
  - **Layout Context:** Rendered inside PublicLayout (2.1), which provides:
    - MuiAppbar (1.1, public variant) — logo, theme toggle, Login button, Sign Up button
    - Scrollable content area (`overflow-y: auto`)
  - **Structure:** Sections stacked vertically, centered max-width wrapper `maxWidth={1200}`:
    1. **Hero Section** — `py: 8`, `textAlign: center`
       - App logo/icon (`fontSize: 64px`, `color: primary.main`)
       - Headline: `Typography variant="h3" fontWeight={700}` — "Build Better Reports"
       - Subheadline: `Typography variant="h6" color="text.secondary"` — "Record, transcribe, and generate professional reports with AI"
       - CTA Buttons row (`gap: 2`, `mt: 4`, centered):
         - **Get Started** (`MuiButton variant="contained" size="large"`) → navigates to `/register`
         - **Sign In** (`MuiButton variant="outlined" size="large"`) → navigates to `/login`
    2. **Features Section** — TBD
  - **Responsive:**
    - Hero headline: `h3` on `md+`, `h4` on `xs`
    - All text uses ellipsis on overflow; no horizontal scroll
  - **Routing Actions:** CTA buttons use `useNavigate()` from react-router-dom
  - **Data:** No data fetching — fully static page. Already-authenticated users redirected away by PublicRoute guard.
  - **Setup:**
    - `React.lazy(() => import('./pages/Landing.jsx'))` in `main.jsx`
    - Tree-shaken MUI imports
    - No Redux, no RTK Query calls — pure presentational
    - `displayName` set to `"Landing"`

#### Login

- Route: `{ path: 'login', Component: Login }` — under PublicLayout children.
- Layout: PublicLayout (MuiAppbar fixed + scrollable content). Centered card (`Paper elevation={3}`, `maxWidth: 420`).
- Card content: Logo/icon, "Sign In" title, Google OAuth button (outlined, Google icon, loading spinner, stubbed), "or" divider, email field (EmailIcon start adornment), password field (LockIcon start adornment, eye toggle), "Sign In" submit button (MuiButton contained, fullWidth, size="small", loading via isSubmitting), nav link to `/register`.
- RHF `useForm({ mode: 'onBlur' })`, `register` only. `useLoginMutation()` from RTK Query. On 422 → `setError`. On 401 → toast. On success → `reset()` + navigate to `/dashboard` or `location.state.from`.
- PublicRoute redirects authenticated users.
- Data flow: `POST /api/v1/auth/login`. Request body `{ email, password }`. Success 200 returns `{ success, message, data: { user: { _id, firstName, lastName, fullName (virtual), email, avatar, position } } }`. Sets httpOnly access (15m) + refresh (7d) cookies. 401 → toast, 422 → setError, 429 → toast.
- Google OAuth browser redirect: `http://localhost:4000/api/v1/auth/google` → consent → callback sets cookies → redirect to frontend → PublicRoute → `/dashboard`. Stubbed until credentials configured.

- 3.2 Login
  - **File:** `client/src/pages/Login.jsx`
  - **Route:** `{ path: 'login', Component: Login }` — under PublicLayout children
  - **Layout Context:** PublicLayout (2.1) — MuiAppbar (1.1 public variant) + scrollable content
  - **Page Layout:**
    - Outer: centered flexbox, `minHeight: calc(100vh - 64px)`, `display: flex`, `alignItems: center`, `justifyContent: center`, `py: 4`
    - Card: `MuiPaper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 420 }}`
  - **Card Content (stacked vertically):**
    - Logo/icon centered (`fontSize: 48px`, `color: primary.main`, `mb: 1`)
    - Title: `Typography variant="h5" fontWeight={600} textAlign="center"` — "Sign In"
    - Subtitle: `Typography variant="body2" color="text.secondary" textAlign="center" mb: 3` — "Welcome back! Sign in to continue"
    - Google OAuth Button: `MuiButton variant="outlined" fullWidth`, start adornment `GoogleIcon`, loading spinner on click (stubbed until credentials configured)
    - Divider: `MuiDivider sx={{ my: 2.5 }}` with `"or"` text via `textAlign="center"`
    - `email` field: `MuiTextField type="email"`, start adornment `<EmailIcon />`, `required: 'Email is required'`
    - `password` field: `MuiTextField type="password"`, start adornment `<LockIcon />`, eye toggle built-in, `required: 'Password is required'`
    - Submit: `MuiButton variant="contained" fullWidth size="small" sx={{ mt: 2, flexShrink: 0 }}`, `loading={isSubmitting}`, `loadingPosition="center"` — label "Sign In"
    - Nav link: `Typography variant="body2" textAlign="center" mt: 2` — "Don't have an account?" + `MuiButton variant="text"` → navigates to `/register`
  - **Submit Logic:**
    - RHF `useForm({ mode: 'onBlur' })`, `register` only
    - `handleSubmit(onSubmit)` → try/catch with `isSubmitting` guard
    - Calls `useLoginMutation()` from RTK Query
    - On 422: `setError('email', ...)` / `setError('password', ...)` for backend validation
    - On 401: toast "Invalid email or password"
    - On success: `reset()`, navigate to `location.state?.from?.pathname || '/dashboard'`
  - **Guard:** PublicRoute redirects authenticated users to `/dashboard`
  - **Setup:**
    - `React.lazy(() => import('./pages/Login.jsx'))`
    - Tree-shaken imports
    - `displayName` set to `"Login"`
  - **Data Flow:**
    - **Endpoint:** `POST /api/v1/auth/login`
    - **Request:**
      ```json
      { "email": "beza@example.com", "password": "mypassword" }
      ```
    - **Success Response (200):**

      ```json
      {
        "success": true,
        "message": "Login successful",
        "data": {
          "user": {
            "_id": "...",
            "firstName": "Beza",
            "lastName": "Ayalew",
            "fullName": "Beza Ayalew",
            "email": "beza@example.com",
            "avatar": null,
            "position": null,
            "..."
          }
        }
      }
      ```

      - Backend sets `accessToken` (15m) and `refreshToken` (7d) as httpOnly cookies via `Set-Cookie`
      - Frontend: `reset()`, navigate to `location.state?.from?.pathname || '/dashboard'`

    - **Error Responses:**
      - 401 (invalid credentials): `{ success: false, message: "Invalid email or password" }` → toast
      - 422 (validation): `{ success: false, message: "Validation failed", data: { errors: [{ field: "email", message: "..." }] } }` → `setError()`
      - 429 (rate limit): `{ success: false, message: "Too many requests, please try again later" }` → toast
    - **RTK Query:** `useLoginMutation()` from `authSlice.injectEndpoints`, `credentials: 'include'`
    - **Google OAuth:** Browser redirect to `http://localhost:4000/api/v1/auth/google` → consent → callback sets cookies → redirect to frontend → PublicRoute detects auth → `/dashboard`. Stubbed until credentials configured.


#### Register

- Route: `{ path: 'register', Component: Register }` — under PublicLayout children.
- Layout: Same centered card pattern as Login.
- Card content: Logo/icon, "Sign Up" title, Google OAuth button (same pattern), "or" divider, email field (EmailIcon start adornment), password field (LockIcon start adornment, eye toggle, minLength 6), confirmPassword field (validate match), "Sign Up" submit button, nav link to `/login`.
- No name field on form — backend extracts firstName/lastName from email local part: `beza@gmail.com` → fn "beza", ln "beza". `beza.ayalew@gmail.com` → fn "beza", ln "ayalew". Split on `@`, split local part on `.`; first segment = firstName, last segment = lastName.
- RHF `useForm({ mode: 'onBlur' })`, `register` only. `useRegisterMutation()` from RTK Query. On 422 → `setError`. On success → toast + navigate to `/dashboard`.
- PublicRoute redirects authenticated users.
- Data flow: `POST /api/v1/auth/register`. Request body `{ email, password }` (confirmPassword client-only). Success 201 returns user object with `fullName` virtual. 409 (duplicate) → setError, 422 → setError, 429 → toast. Sets httpOnly cookies same as Login.
- `fullName` virtual: `userSchema.virtual('fullName').get(function() { return \`${this.firstName} ${this.lastName}\`.trim() })`. Schema options `{ toJSON: { virtuals: true }, toObject: { virtuals: true } }`.
- Google OAuth: same redirect flow as Login.

- 3.3 Register
  - **File:** `client/src/pages/Register.jsx`
  - **Route:** `{ path: 'register', Component: Register }` — under PublicLayout children
  - **Layout Context:** PublicLayout (2.1) — MuiAppbar (1.1 public variant) + scrollable content
  - **Page Layout:** Same as Login — centered card, `maxWidth: 420`, same outer flexbox
  - **Card Content (stacked vertically):**
    - Logo/icon centered (same style)
    - Title: "Sign Up"
    - Subtitle: "Create your account to get started"
    - Google OAuth Button: same pattern as Login
    - Divider: same `"or"` divider
    - `email` field: `MuiTextField type="email"`, start adornment `<EmailIcon />`, `required: 'Email is required'`
    - `password` field: `MuiTextField type="password"`, start adornment `<LockIcon />`, eye toggle built-in, `required: 'Password is required'`, `minLength: { value: 6, message: 'At least 6 characters' }`
    - `confirmPassword` field: `MuiTextField type="password"`, start adornment `<LockIcon />`, eye toggle built-in, `validate: (v) => v === getValues('password') || 'Passwords must match'`
    - Submit: `MuiButton variant="contained" fullWidth size="small" sx={{ mt: 2, flexShrink: 0 }}`, `loading={isSubmitting}`, `loadingPosition="center"` — label "Sign Up"
    - Nav link: "Already have an account?" + button → navigates to `/login`
  - **Submit Logic:**
    - RHF `useForm({ mode: 'onBlur' })`, `register` only
    - `handleSubmit(onSubmit)` → try/catch
    - Calls `useRegisterMutation()` from RTK Query
    - On 422: `setError` for field-level (e.g. duplicate email)
    - On success: toast "Account created successfully", navigate to `/dashboard`
  - **No name field** — backend extracts firstName/lastName from email local part per §11
  - **Guard:** PublicRoute redirects authenticated users to `/dashboard`
  - **Setup:**
    - `React.lazy(() => import('./pages/Register.jsx'))`
    - Tree-shaken imports
    - `displayName` set to `"Register"`
  - **Data Flow:**
    - **Email-to-Name Extraction (backend):**
      - `beza@gmail.com` → `firstName: "beza"`, `lastName: "beza"`
      - `beza.ayalew@gmail.com` → `firstName: "beza"`, `lastName: "ayalew"`
      - Split on `@`, split local part on `.`; first segment = firstName, last segment = lastName
    - **Endpoint:** `POST /api/v1/auth/register`
    - **Request:**

      ```json
      { "email": "beza.ayalew@example.com", "password": "mypassword" }
      ```

      - `confirmPassword` validated client-side only (RHF `validate`), never sent to backend

    - **Success Response (201):**

      ```json
      {
        "success": true,
        "message": "Account created successfully",
        "data": {
          "user": {
            "_id": "...",
            "firstName": "beza",
            "lastName": "ayalew",
            "fullName": "beza ayalew",
            "email": "beza.ayalew@example.com",
            "avatar": null,
            "position": null,
            "..."
          }
        }
      }
      ```

      - Backend sets httpOnly cookies same as Login
      - Frontend: toast "Account created successfully", navigate to `/dashboard`

    - **Error Responses:**
      - 409 (duplicate email): `{ success: false, message: "Email already in use" }` → `setError('email', 'Email already in use')`
      - 422 (validation): `{ success: false, message: "Validation failed", data: { errors: [{ field: "email", message: "..." }] } }` → `setError()`
      - 429 (rate limit): `{ success: false, message: "Too many requests, please try again later" }` → toast
    - **RTK Query:** `useRegisterMutation()` from `authSlice.injectEndpoints`, `credentials: 'include'`
    - **User Model Virtual:**

      ```js
      userSchema.virtual("fullName").get(function () {
        return `${this.firstName} ${this.lastName}`.trim();
      });
      ```

      - Schema options: `{ toJSON: { virtuals: true }, toObject: { virtuals: true } }`

    - **Google OAuth:** Same redirect flow as Login


#### Dashboard

- Route: `{ path: 'dashboard', Component: Dashboard }` — first child under AppShell.
- Layout: AppShell. No Page Header.
- Structure:
  - Row 1: 4 stat cards (`Grid`, `size={{ xs: 12, sm: 6, md: 3 }}`), icon + value + label. Content TBD.
  - Row 2: Bar chart (`@mui/x-charts` BarChart, left) + Pie chart (PieChart, right). Content TBD.
  - Row 3: "Recent Activities" title + MuiDataGrid (server-side pagination, no action column). Content TBD.
- Auth strategy: `GET /api/v1/auth/me` on full page load populates Redux + localStorage. 401 → clear + redirect. SPA navigation reads Redux only — zero extra API calls.
- Setup: `React.lazy`, tree-shaken imports, `displayName="Dashboard"`.

- 3.4 Dashboard
  - **File:** `client/src/pages/Dashboard.jsx`
  - **Route:** `{ path: 'dashboard', Component: Dashboard }` — first child under AppShell
  - **Layout Context:** AppShell (2.2) — AppSidebar + content area (MuiAppbar protected variant → `<Outlet />`). No Page Header.
  - **Page Layout:** `p: 3`, rows stacked vertically with `gap: 3`
  - **Row 1 — Stat Cards:**
    - 4 cards, `Grid container spacing={3}`, `size={{ xs: 12, sm: 6, md: 3 }}`
    - Each: `MuiPaper elevation={2} sx={{ p: 3 }}`, icon + value + label
    - Content: **TBD**
  - **Row 2 — Charts:**
    - `Grid container spacing={3}`, `size={{ xs: 12, md: 6 }}`
    - Bar chart (left): `@mui/x-charts` `BarChart` — **TBD**
    - Pie chart (right): `@mui/x-charts` `PieChart` — **TBD**
  - **Row 3 — Recent Activities:**
    - Title: `Typography variant="h6"` — "Recent Activities"
    - `MuiDataGrid` (1.8) — server-side pagination, no action column
    - Columns, source endpoint: **TBD**
  - **Auth Strategy:**
    - Full page load: `GET /api/v1/auth/me` → populate Redux + localStorage
    - 401 on `/auth/me`: clear everything, redirect to `/login`
    - SPA navigation: ProtectedRoute reads Redux — zero API calls
  - **Data Flow:**
    - **Endpoint:** `GET /api/v1/auth/me`
    - **Success Response:**
      ```json
      {
        "success": true,
        "data": {
          "user": {
            "_id": "...",
            "firstName": "Beza",
            "lastName": "Ayalew",
            "fullName": "Beza Ayalew",
            "email": "beza@example.com",
            "avatar": null,
            "position": null
            "..."
          }
        }
      }
      ```
    - **Error (401):** `{ "success": false, "message": "Not authenticated" }` → clear + redirect
  - **Setup:**
    - `React.lazy(() => import('./pages/Dashboard.jsx'))`
    - Tree-shaken imports
    - `displayName` set to `"Dashboard"`

- 3.5 Reports
  - **File:** `client/src/pages/Reports.jsx`
  - **Route:** `{ path: 'reports', Component: Reports }` — under AppShell children
  - **Layout Context:** AppShell (2.2) + MuiPageHeader (1.12)
  - **MuiPageHeader:**
    - Left: title="Reports", subtitle="Manage daily supervision reports"
    - Right: FilterIconButton (MuiBadge) + ToggleButtonGroup + CreateButton (MuiButton, start icon AddIcon)
  - **Filter Dialog:**
    - Base: MuiDialog (1.3), `maxWidth="sm"`
    - Title: "Filter Reports"
    - Row 1: `Grid container spacing={2}` — MuiDatePicker (left) + MuiSelectField for single branch (right)
    - Row 2: MuiSwitch label="Archived"
    - End adornments: MuiDatePicker + MuiSelectField have CloseIcon as `slotProps.input.endAdornment` for individual clear. On clear: field resets to empty, `activeFilterCount` decrements, badge updates immediately.
    - Cancel: close dialog, reset all filters to empty, badge → 0
    - Apply: set filter state, close dialog, badge → count of active filters (1–3)
    - Badge: MUI Badge on filter icon, `badgeContent={activeFilterCount}`, hidden when 0
  - **List/Grid Toggle:**
    - ToggleButtonGroup with ViewListIcon / ViewGridView
    - **List** → cards view
    - **Grid** → MuiDataGrid view
  - **Cards View (List toggle):**
    - `Grid container spacing={2}`
    - Each card: `MuiCard` with report metadata
    - Card actions (icon buttons with MuiTooltip):
      - View (`VisibilityIcon`, primary) → navigate `/reports/:id/details` (3.6)
      - Edit (`EditIcon`, primary) → opens the report in the Assistant chat (3.5.2) — new conversation for the report via the report picker
      - Archive/Restore/Delete conditional:
        - Not archived → ArchiveIcon (warning) → MuiConfirmDialog → confirm → `PATCH /api/v1/reports/:id/archive` → update UI
        - Archived → RestoreIcon (success) → MuiConfirmDialog → confirm → `PATCH /api/v1/reports/:id/restore` → update UI; DeleteIcon (error) → MuiConfirmDialog → confirm → `DELETE /api/v1/reports/:id` → update UI
    - Below cards: MuiPagination (1.7), `page` and `count` from server `totalPages`, `onChange` refetches list for the selected page
  - **MuiDataGrid View (Grid toggle):**
    - Standard MuiDataGrid (1.8) — server-side pagination, toolbar, export selection
    - Action column: view, edit, archive/restore/delete (same behavior as cards)
  - **Data Flow (Reports List):**
    - **Endpoint:** `GET /api/v1/reports?page=1&limit=10&date=&branch=&isArchived=`
    - **Success Response (200):**
      ```json
      {
        "success": true,
        "data": {
          "reports": [
            {
              "_id": "...",
              "date": "29-10-18",
              "branches": ["..."],
              "status": "completed",
              "createdAt": "...",
              "updatedAt": "..."
            }
          ],
          "pagination": {
            "page": 1,
            "limit": 10,
            "totalDocs": 50,
            "totalPages": 5,
            "hasNextPage": true,
            "hasPrevPage": false
          }
        }
      }
      ```
    - **Archive:** `PATCH /api/v1/reports/:id/archive` → 200 `{ success: true, message: "Report archived" }`
    - **Delete:** `DELETE /api/v1/reports/:id` → 200 `{ success: true, message: "Report deleted" }`
  - **Setup:**
    - `React.lazy(() => import('./pages/Reports.jsx'))`
    - Tree-shaken imports
    - `displayName` set to `"Reports"`
  - 3.5.1 Create Report Dialog

    **Dialog File:** `client/src/components/report/CreateReportDialog.jsx`

    **Trigger:** CreateButton (MuiButton, AddIcon) in Reports MuiPageHeader → opens MuiDialog.

    **Base:** MuiDialog, `maxWidth="sm"`, fullWidth., `disableEscapeKeyDown={true}`, `onClose` is no-op (prevents close on backdrop click or Escape). Dialog only closes via Cancel button or successful submit.

    **Title:** "Create New Report"


    #### 3.5.1.1 Local State (react-hook-form)

    | Field            | Type                                                           | Description                   |
    | ---------------- | -------------------------------------------------------------- | ----------------------------- |
    | `date`           | dayjs \| null                                                  | Ethiopian calendar date       |
    | `branches`       | `[{ branchId, clockIn, clockOut }]`                            | Accumulator, starts empty     |
    | `clockIn`        | dayjs \| null                                                  | Global work start (HH:mm)     |
    | `clockOut`       | dayjs \| null                                                  | Global work end (HH:mm)       |
    | `audio`          | `[{ id, blob, duration }]`                                     | Recorded blobs, starts empty  |
    | `recordingState` | `"idle" \| "countdown" \| "recording" \| "paused" \| "review"` | Audio recording state machine |


    #### 3.5.1.2 Data Model Mapping To Report Sections

    | Local State                                  | Report Section (Amharic)                    |
    | -------------------------------------------- | ------------------------------------------- |
    | `date`                                       | ቀን                                          |
    | `branches[].branchId` (resolved to name)     | ብራንች header                                 |
    | `branches[].clockIn` / `branches[].clockOut` | ስራ የገባሁበት ሰዓት per-branch lines              |
    | `clockIn`                                    | ስራ የገባሁበት ሰዓት (fallback when single branch) |
    | `clockOut`                                   | ከስራ የወጣሁበት ሰዓት፡                             |


    #### 3.5.1.3 Dialog Layout (vertical stack)

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


    #### 3.5.1.4 MuiTimePicker (reusable component)

    **File:** `client/src/components/reusable/MuiTimePicker.jsx`
    - Follows MuiDatePicker pattern: DesktopTimePicker on md+ (popper), MobileTimePicker below md (dialog), switch via `useMediaQuery(theme.breakpoints.up('md'))`
    - `forwardRef`, `size="small"`, `format="hh:mm A"`, default `null`
    - Requires RHF `Controller` (same as DatePicker — custom onChange)
    - `displayName="MuiTimePicker"`


    #### 3.5.1.5 Audio Recording State Machine

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


    #### 3.5.1.6 Validation Rules (before frontend submit)

    | Field                       | Rule                                                                                        |
    | --------------------------- | ------------------------------------------------------------------------------------------- |
    | `date`                      | Required. Valid Ethiopian date. Error + helperText on MuiDatePicker.                        |
    | `branches`                  | `branches.length >= 1`. Toast "Select at least one branch" on submit attempt.               |
    | Each `branches[i].clockIn`  | Required. Error on respective MuiTimePicker.                                                |
    | Each `branches[i].clockOut` | Required. Error on respective MuiTimePicker. Cross-field: "Out time must be after in time". |
    | `clockIn`                   | Required. Error on MuiTimePicker.                                                           |
    | `clockOut`                  | Required. Error on MuiTimePicker. Cross-field: "End time must be after start time".         |
    | `audio`                     | `audio.length >= 1`. Toast "Record at least one audio clip".                                |
    | Each `audio[i].blob.size`   | `<= 50 MB`. Blocked client-side, warning shown, user asked to re-record.                    |

    **Server-side validation repeats all of the above** via `express-validator` middleware + multer validation for files.


    #### 3.5.1.7 Submit Flow (frontend)
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


    #### 3.5.1.8 Backend Pipeline — `POST /reports`

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
    │   │       -sample_fmt s16 -acodec pcm_s16le staging.wav
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


    #### 3.5.1.9 Post-Creation Flow — Review Transcription

    > **SUPERSEDED (structure correction, 2026-08-02):** the edit page detailed below is replaced by chat-based report editing in the Assistant (3.5.2). The Reports list "Edit" action and the ReportDetails "Edit Report" action open the Assistant chat for that report (new conversation via the report picker, `POST /api/v1/assistant/conversations` with `reportId`). There is no `/reports/:id/edit` route and no ReportCorrection page. The backend behaviors specified in this block — voice corrections, provider selection for generation (default `addis`), review statuses, revision history — remain valid and are exercised through the chat; the detailed chat-based review/correction UI is specified in a later pass. The block is kept below for those behaviors.

    After `POST /reports` returns successfully, Report status is `transcribed` (or `audio_attached` if STEP 5 failed — see the "Transcription fails" row in 3.5.1.10). The Reports list shows the new item with its status badge; the "Edit" action opens the report in the Assistant chat (3.5.2).


    ##### `/reports/:id/edit` Page (removed — superseded)

    **Purpose:** review and correct the transcription of an existing report, edit its metadata, play back the recorded clips, and restore or delete past revisions.

    **Page component:** (removed — superseded by the Assistant chat, see the marker at the top of 3.5.1.9). This UI now lives in the Assistant page (3.5.2), which is the only protected route outside AppShell.

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
    - **"Open in Assistant" button** — MuiButton variant="outlined", start icon SmartToyIcon. On click: find or create the ChatConversation linked to this report, then `navigate("/assistant?conversation=<conversationId>")` (3.5.2).

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


    ##### Editor Tab

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

    | Button            | Action                                                                                                                             |
    | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
    | "Save"            | Direct edit (Mode 1). Saves editor content as `latest`.                                                                            |
    | "Correct with AI" | Opens inline form: instruction text field + AI provider dropdown + "Submit" button. On response, shows diff. User accepts → saves. |
    | "Voice Correct"   | Opens short recorder → on stop, sends to STT → fills instruction field → same as AI Correct flow.                                  |


    ##### Modes Detail

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

    **Assistant surface:** Modes 2 and 3 are also available inside the Assistant page (3.5.2) — the `save_transcription` tool performs the same update (`latest` + `history[]` push with `reviewer` = provider string, Report status → `reviewed`) after user approval.


    ##### Details Tab

    **Form** prefilled from the report:
    - `date` — MuiDatePicker
    - Branches — MuiButton "Select Branches" + BranchSelectorDialog; each selected branch shows per-branch `clockIn` / `clockOut` MuiTimePickers
    - Top-level `clockIn` / `clockOut` — MuiTimePickers (derived from first/last branch times)
    - Save → `PATCH /reports/:id` with `{ date, branches: [{ branchId, clockIn, clockOut }] }`
    - Reset → reverts the form to the last saved values
    - On 422: field-level errors from the backend; on success: toast "Report updated", metadata summary bar refreshes


    ##### Audio Tab

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


    ##### History Tab

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


    #### 3.5.1.10 Edge Cases

    | Scenario                                  | Behavior                                                                                                                                                                                                    |
    | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | Same branch selected twice                | Checkbox already checked in BranchSelectorDialog. Uncheck to remove.                                                                                                                                        |
    | All branches removed                      | No selected branches shown. "Select Branches" button ready.                                                                                                                                                 |
    | Browser blocks microphone                 | Toast "Microphone access required"                                                                                                                                                                          |
    | Clip exceeds 50 MB                        | Submit blocked. Warning shown.                                                                                                                                                                              |
    | All clips deleted                         | Return to IDLE_EMPTY state showing "Start Recording"                                                                                                                                                        |
    | Dialog closed mid-recording               | Stop MediaRecorder. Clear all state.                                                                                                                                                                        |
    | AI provider fails during correction       | Toast "Correction failed, try again". User can retry with same or different provider.                                                                                                                       |
    | Re-transcription requested                | `POST /reports/:id/transcribe` — backend runs STT pipeline again from stored audio files. Updates `Transcription.raw`. Resets `latest` + `history`. Report status → `transcribed`.                          |
    | Long audio (>60s)                         | Automatically chunked server-side via wavSplitter.js (PCM-level split, no per-chunk re-encoding).                                                                                                           |
    | Audio upload fails (STEP 3)               | Return 502 with `data: null`. Toast error, form stays open with metadata + audio blobs intact. Report not created (transaction aborted). User clicks Submit again or Cancel.                                |
    | Dialog closed via backdrop click / Escape | Prevented. `onClose` is no-op, `disableEscapeKeyDown={true}`. User must click Cancel explicitly.                                                                                                            |
    | Transcription fails (STEP 5)              | Report stays at `audio_attached`, Audio preserved. Dialog closes with toast "Report created but transcription failed". Edit page shows the retry banner on the Editor tab → `POST /reports/:id/transcribe`. |
    | Tool approval request expires (60s)       | Assistant ChatBox shows the approval UI as "expired". Server drops the pending run from the in-memory map. User resends the message.                                                                        |
    | Report deleted while conversation exists  | Conversation stays (keeps `report` id). Opening it still works; tool calls fail with 404 on missing transcription.                                                                                          |
    | DB failure at STEP 4/6/7                  | Error logged. Admin can repair via manual endpoint if needed.                                                                                                                                               |


    #### 3.5.1.11 Response Shapes

    ##### 201 Created — Report created successfully

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

    ##### Error Responses

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

    ##### Generate Report — POST /reports/:id/generate

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

    ##### Audio Playback — GET /api/v1/audio/:audioId/stream

    ```json
    // 200 — streaming body, Content-Type from Audio.mimeType,
    //       Accept-Ranges: bytes, Range request → 206 Partial Content
    // 404 — { "success": false, "message": "Audio not found", "data": null }
    ```

    ##### Audio Download — GET /api/v1/audio/:audioId/download

    ```json
    // 200 — attachment, Content-Disposition: attachment; filename="<originalName>",
    //       Content-Type from Audio.mimeType
    // 404 — { "success": false, "message": "Audio not found", "data": null }
    ```


    #### 3.5.1.12 Recap of Amended Namings

    | Old (current doc)               | New (this doc)                    | Reason                                      |
    | ------------------------------- | --------------------------------- | ------------------------------------------- |
    | `selectedBranches`              | `branches`                        | Simpler, matches backend field name         |
    | `selectedBranches[].branchName` | Removed from local state          | Resolved server-side from branchId          |
    | `workStarted`                   | `clockIn`                         | Matches Amharic "ስራ የገባሁበት ሰዓት"             |
    | `workEnd`                       | `clockOut`                        | Matches Amharic "ከስራ የወጣሁበት ሰዓት፡"           |
    | `audioClips`                    | `audio`                           | Simpler, consistent with Report model field |
    | `aiProvider`                    | Removed from dialog state         | Not needed at creation time (deferred)      |
    | `recordingState`                | Unchanged                         | Still valid                                 |
    | `timeIn`/`timeOut` (per-branch) | `clockIn`/`clockOut` (per-branch) | Consistent naming with top-level fields     |
    | `BranchSelector` component      | MuiButton + BranchSelectorDialog  | Better UX for multi-branch selection        |
    | `unique: true` on fields        | `schema.index()`                  | Consistent index management                 |
    | Missing `archivedAt`            | Added to Report + Branch          | Enables TTL auto-delete after 30 days       |
    | Missing toJSON/toObject         | Added to all schemas              | Strips `id`, `__v`, `password`              |

  - 3.5.2 Assistant — AI Report Chat

    ##### Page & Routing
    - **File:** `client/src/pages/Assistant.jsx`
    - **Route:** `{ path: 'assistant', Component: Assistant }` — AppShell **sibling** under ProtectedRoute (NOT inside AppShell children; page is full-screen)
    - **Sidebar:** new AppSidebar nav item "Assistant" (SmartToyIcon) — highlighted when on `/assistant`
    - **Layout:** `<ChatBox adapter={assistantAdapter} features={{ conversationList: true }} sx={{ height: '100vh' }} />`
    - **Conversation list** (built into ChatBox via `features={{ conversationList: true }}`):
      - Left rail lists conversations (title, last message preview, relative timestamp)
      - "New Chat" button → report picker dialog: pick one of the user's reports → `POST /assistant/conversations` `{ reportId }` → welcome assistant message injects the raw transcription text + report metadata
      - Conversation title: `"Report {date}"` (e.g. "Report 30-07-2026")
    - **Deep link:** `/assistant?conversation=<id>` — ChatBox selects that conversation and shows its message history (this is where the ReportDetails "Edit Report" action lands, 3.6)
    - **Adapter:** `client/src/components/assistant/chatAdapter.js` (plain JS object):
      - `sendMessage(messages)` → `POST /api/v1/assistant/conversations/:id/messages` with `{ content }` → returns `response.body` (ReadableStream) consumed by ChatBox
      - `listConversations()` → `GET /api/v1/assistant/conversations`
      - `listMessages(conversationId)` → `GET /api/v1/assistant/conversations/:id/messages`
      - `addToolApprovalResponse({ toolCallId, approved, reason })` → `POST /api/v1/assistant/tools/:toolCallId/approval`
    - **Tool approval flow (built into ChatBox):** on `tool-approval-request` ChatBox shows the approval UI → user Approves/Rejects → adapter calls `addToolApprovalResponse` → server resumes the provider run and emits `tool-output-available` then `finish`
    - **Redux:** `aiConversationSlice` (conversations list, activeConversationId, streaming parts) + RTK Query endpoints in `assistantApi.js`
    - **Package:** `@mui/x-chat` (v9.0.0-alpha.15, MIT license) — `npm install @mui/x-chat`

    ##### Routes (backend)

    | Method | Path                                           | Purpose                                                                                                                  |
    | ------ | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
    | GET    | `/api/v1/assistant/conversations`              | List current user's conversations, newest first                                                                          |
    | POST   | `/api/v1/assistant/conversations`              | Create conversation for a report. Body `{ reportId }`. Injects welcome assistant message (raw transcription + metadata). |
    | GET    | `/api/v1/assistant/conversations/:id/messages` | Full message history for one conversation                                                                                |
    | POST   | `/api/v1/assistant/conversations/:id/messages` | Send user message → SSE stream (tool-call lifecycle)                                                                     |
    | POST   | `/api/v1/assistant/tools/:toolCallId/approval` | Approve/reject a pending tool call                                                                                       |

    ##### Streaming & Tool Approval Flow
    1. Adapter POSTs the user message. Server persists the user message (`status: complete`), then starts the AI provider run.
    2. When the provider requests the `save_transcription` tool, the server emits `tool-input-available` (`toolCallId`, `toolName`, `input` with `transcriptionId` + proposed `latest`).
    3. Server holds the run in an in-memory pending map (keyed by `toolCallId`) and emits `tool-approval-request`.
    4. ChatBox shows the approval UI → user approves/rejects → `POST /tools/:toolCallId/approval` `{ approved, reason }`. On reject, server tells the provider "user rejected" so it can adjust.
    5. On approval: `save_transcription` updates `Transcription.latest`, pushes `history[]` with `reviewer` = provider string, sets Report status → `reviewed`. Server emits `tool-output-available` with the result, then `finish`.
    6. Assistant + tool messages are persisted into `conversation.messages[]` (`status: complete`).

    **Pending-map cleanup:** entries removed after `finish` or on 60s timeout (approval UI shows "expired", see 3.5.1.10).

    **Streaming discipline:** every SSE `event:`/`data:` write is flushed immediately (`res.flush()`) — no buffering, no aggregation — so partial text parts and tool events render without lag. Keep-alive heartbeat (`: ping` comment line) every 15s while the provider run is in flight.

    ##### Response Shapes

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

    **Setup:**
    - `React.lazy(() => import('./pages/Assistant.jsx'))`
    - Tree-shaken MUI + `@mui/x-chat` imports
    - `displayName` set to `"Assistant"`

    **Backend reference:** `ChatConversation` model and routes: §24.9 (Data Models); `save_transcription` tool flow: §3.5.2 (Streaming & Tool Approval Flow).


  - 3.6 Report Details Page

    **Purpose:** read-only detail view of a single report — metadata, reviewed transcription, generated report (when completed) with export actions, audio playback, and revision history.

    **Page component:** `client/src/pages/ReportDetails.jsx`. The page renders inside the protected root layout (AppShell) — AppShell is provided by routing, the page component does not render it. `/assistant` is the only protected route that lives outside AppShell (3.5.2).

    **Route:** `{ path: 'reports/:id/details', Component: ReportDetails }` — under AppShell children.

    **Layout Context:** AppShell (2.2) + MuiPageHeader (1.12). AppShell is provided by routing; the page component does not render it.

    **Entry Points:** Reports list "View" action and GlobalSearchDialog result click → `navigate("/reports/:id/details")`.

    **Page header (MuiPageHeader, 1.12):**
    - Left: title "Report Details", subtitle "{user.fullName} • {formatted report date}" — subtitle hidden on vw < 600 portrait.
    - Right slot (children), fixed order — all actions icon-only on mobile with MuiTooltip labels; Edit Report renders as an icon button on mobile:
      1. **MuiStatusBadge** — renders `report.status` with color mapping: `draft` → default, `audio_attached` → warning, `transcribed` → info, `reviewed` → primary, `completed` → success. Label shows the status text. Non-interactive.
      2. **Back** — icon button (ArrowBackIcon), tooltip "Back". On click: `navigate("/reports")`.
      3. **Edit Report** — MuiButton contained, start icon EditIcon, label "Edit Report". On click: opens the report in the Assistant chat (3.5.2) — find or create the ChatConversation linked to this report, then `navigate("/assistant?conversation=<conversationId>")`; a missing conversation is created via `POST /api/v1/assistant/conversations` `{ reportId }`. Hidden when the report is archived.
      4. **Archive/Restore/Delete** — conditional, same flows as the Reports page card actions:
         - Not archived → ArchiveIcon (warning), tooltip "Archive" → MuiConfirmDialog → confirm → `PATCH /api/v1/reports/:id/archive` → toast "Report archived" → header refreshes to archived state (Archive replaced by Restore and Delete).
         - Archived → RestoreIcon (success), tooltip "Restore" → MuiConfirmDialog → confirm → `PATCH /api/v1/reports/:id/restore` → toast "Report restored" → header refreshes to active state; DeleteIcon (error), tooltip "Delete" → MuiConfirmDialog → confirm → `DELETE /api/v1/reports/:id` → toast "Report deleted" → `navigate("/reports")`.
      5. **Copy** — icon button (ContentCopyIcon), tooltip "Copy report". Enabled only when generated text exists. Copies the generated report text to the clipboard; on clipboard failure falls back to legacy `execCommand("copy")`; toast "Copied".
      6. **Print** — icon button (PrintIcon), tooltip "Print / Save as PDF". Enabled only when generated text exists. Calls `window.print()` with print CSS that hides AppShell chrome and header actions, leaving the page title and the generated report.

    **Content (single scrollable column, top → bottom):**
    1. **Report Metadata card** — read-only: date; branches (names joined with ", "); per-branch rows (branch name + `clockIn`–`clockOut` time range); top-level clockIn / clockOut; createdAt / updatedAt (formatted).
    2. **Transcription card** — read-only: shows `Transcription.latest` when non-empty; otherwise shows `Transcription.raw` with the note "Not reviewed yet"; when both are empty → "No transcription yet".
    3. **Generated Report card** — status-dependent:
       - `completed`: generated report text in the §6.1 format, pre-wrap; action row: Copy, TXT download (Blob, `text/plain`, UTF-8 BOM `\uFEFF`, filename `Report-<date>.txt`), Print / Save as PDF; collapsible "Show reviewed transcription" for comparison.
       - `reviewed` (`latest` non-empty): "No generated report yet" + Generate Report button (contained) + provider selector (default "addis"; options "addis", "gemini", "nvidia") + helper "Generate the final report from the reviewed transcription".
       - `transcribed` (`latest` empty): Generate Report button disabled + tooltip "Review the transcription first".
       - `draft` / `audio_attached`: Generate Report button disabled + helper "Waiting for transcription".
       - Generate click → `POST /api/v1/reports/:id/generate` body `{ "provider": "..." }`; button shows loading state while pending; on 200 the card renders the generated text + toast "Report generated"; on 422 toast the message and keep the card unchanged; on 429 toast "Rate limit reached, try again later"; on 502 toast "Generation failed, try again".
    4. **Audio card** — read-only, one row per `report.audio` item: label = `originalName`, duration = `duration` seconds formatted `m:ss`. Play: streams `GET /api/v1/audio/:audioId/stream` into an inline `<audio>` player. Download: `GET /api/v1/audio/:audioId/download` → file attachment with `originalName`. Empty state "No audio recorded" when `report.audio` is empty.
    5. **History card** — read-only revision list (same data as 3.5.1.9 — transcription history): each entry shows reviewer (user fullName or provider string), timestamp, and status at revision time; expandable to show the text.

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
    - Archived report → header shows only Restore and Delete (Edit Report, Copy, Print, Archive hidden); Generate Report disabled.
    - Generate on archived report (API) → 403 → toast "Report is archived", card unchanged.
    - Generate invoked with empty `latest` → 422 → toast "Review the transcription before generating", card unchanged.
    - Provider rate limit (429) → toast "Rate limit reached, try again later", card unchanged.
    - Provider failure (502) → toast "Generation failed, try again", status and generated text unchanged.
    - Clipboard blocked → legacy `execCommand("copy")` fallback; still failing → toast "Copy failed".
    - Print → browser print dialog; print CSS hides AppShell chrome and page header actions.
    - Audio clips missing → "No audio recorded" empty state.
    - Transcription missing (`draft`) → "No transcription yet" empty state.

    ##### Generate Report — `POST /api/v1/reports/:id/generate`

    **Purpose:** produce the final report text from `Transcription.latest` using the selected provider (§8 — transcription accuracy is the foundation every subsequent step, including report generation, depends on; §5.2 — report content must be generated from the reviewed transcription, not directly from raw audio; §6.8 — the transcription is raw material, the AI converts it into the required report structure).

    **Request body:** `{ "provider": "addis" | "gemini" | "nvidia" }` — default `"addis"` (§18.7 Text Generation).

    **Preconditions (checked in order):**
    1. Report exists — else 404.
    2. Report not archived — else 403 `"Report is archived"`.
    3. `Transcription.latest` non-empty — else 422 `"Review the transcription before generating"`.

    **Flow:**
    1. Validate preconditions above.
    2. Build the generation prompt from the §6.1 report format + report metadata (date, branches with times, top-level clockIn/clockOut) + `Transcription.latest` (generation prompt per §21.1).
    3. Dispatch to the selected provider — §18 (Addis), §19.1 (Gemini; "no streaming" per §19.1), §19.2 (Nvidia). All providers return a full text response — no token streaming for generation.
    4. Success: write `report.generated`, append `report.generatedHistory` entry (`{ provider, text, generatedAt }`), set `report.status` → `completed`, respond 200 (`data.report` incl. `generated` + top-level `data.generated` echo).
    5. Provider rate limit → 429 `"Rate limit reached, try again later"` — status and `generated` unchanged.
    6. Provider/network failure (3 retries, exponential backoff — §19.1) → 502 `"Generation failed, try again"` — status and `generated` unchanged.

    **Re-generation:** allowed via API — overwrites `report.generated`, appends a new `generatedHistory` entry. No UI path currently (details page shows the Generate button only for status `reviewed`).

    **Frontend reference:** §3.6 (details page generate flow + edge cases).

    **Setup:**
    - `React.lazy(() => import('./pages/ReportDetails.jsx'))`
    - Tree-shaken imports
    - `displayName` set to `"ReportDetails"`

    **Backend reference:** details-page spec, response shapes, and edge cases: §3.6; generate endpoint spec: Generate Report block above; generate/audio response shapes: §3.5.1.11.


  - 3.7 Branches Page

    **File:** `client/src/pages/Branches.jsx`
    **Route:** `{ path: 'branches', Component: Branches }` — under AppShell children.
    **Layout Context:** AppShell (2.2) + MuiPageHeader (1.12).
    **Purpose:** branch list/grid with create and edit dialogs (branch editing is a dialog under `client/src/components/branch/`). Detailed spec in a later phase.


  - 3.8 BranchDetails Page

    **File:** `client/src/pages/BranchDetails.jsx`
    **Route:** `{ path: 'branches/:id/details', Component: BranchDetails }` — under AppShell children.
    **Layout Context:** AppShell (2.2).
    **Purpose:** detailed branch view. Detailed spec in a later phase.


  - 3.9 Profile Page

    **File:** `client/src/pages/Profile.jsx`
    **Route:** `{ path: 'profile', Component: Profile }` — under AppShell children.
    **Layout Context:** AppShell (2.2) + MuiPageHeader (1.12).
    **Purpose:** user profile and settings. Detailed spec in a later phase.


  - 3.10 NotFound Page

    **File:** `client/src/pages/NotFound.jsx`
    **Route:** `{ path: '*', Component: NotFound }` — catch-all inside AppShell children.
    **Layout Context:** AppShell (2.2).
    **Purpose:** renders inside AppShell; logged-out users hitting an unknown URL are redirected to `/login` instead. Detailed spec in a later phase.


### 12.7 Hooks

- `useAudioRecorder`: MediaRecorder state/actions hook.
- `useAuth`: Auth state convenience hook.

---

## 13. Redux, RTK Query, And API Client

### 13.1 Redux Structure

- Use `@reduxjs/toolkit`.
- Use `@reduxjs/toolkit/query/react`.
- Use `injectEndpoints`.
- Store path: `client/src/redux/app/store.js`.
- API slice path: `client/src/redux/features/api.js`.
- Feature slice pattern: `client/src/redux/features/<name>Slice.js`.
- Feature slices: authSlice, branchSlice, reportSlice, audioSlice, transcriptionSlice, userSlice, aiConversationSlice, analyticsSlice.
- Use `fetchBaseQuery`.
- Use `baseQueryWithReauth`.
- Use `createApi`.
- The Redux store wraps `App.jsx` in `main.jsx`.

### 13.2 API Client Requirements

- All HTTP calls go through `baseQueryWithReauth` in `client/src/redux/features/api.js`.
- `baseQueryWithReauth` calls `fetchBaseQuery`.
- `fetchBaseQuery` uses `VITE_API_BASE_URL` from `API_CONFIG` in `utils/constants.js`.
- `fetchBaseQuery` uses `credentials: "include"`.
- On 401, where `result.error && result.error.status === 401`, `baseQueryWithReauth` attempts `/api/v1/auth/refresh` via `baseQuery({ url }, api, extraOptions)`.
- On refresh success, retry original request with `result = await baseQuery(args, api, extraOptions);`.
- On refresh failure, clear everything, dispatch logout, and the user must be outside of protected routes.
- Auth endpoints are excluded from 401 handling on public pages.
- Proper backend response transformation is required.

---

## 14. MUI, MUI X, Theme, And Component Standards

### 14.1 MUI Import And Styling Rules

- Tree-shaking MUI imports required, for example `import TextField from '@mui/material/TextField'`.
- Never import from the `@mui/material` barrel.
- MUI Grid uses `size` prop, not `item`. Example: `<Grid size={{ xs: 12, md: 6 }}>`.
- Never use deprecated MUI props:
  - `margin="normal"` becomes `sx={{ mb: 2 }}`.
  - `InputProps` becomes `slotProps.input`.
  - `Box component="form"` becomes native `<form>`.
  - `Box component="img"` becomes native `<img>`.
  - `Link component="button"` becomes `Link slots={{ root: 'button' }}`.
- Use MUI `sx` and `styled()` for styling.
- Never use Tailwind.
- Never use inline `style`.
- `sx` uses theme-aware tokens such as `color: 'text.secondary'`, `bgcolor: 'background.paper'`, and `color: 'error.main'`.
- Never import from `themePrimitives.js` directly.
- For grey colors, use `theme.palette.grey[N]`.
- Never use `gray[50]`, `gray[800]`, or `brand[400]` directly.
- All `sx` color values must be mode-aware, such as `text.primary`, `background.default`, and `grey.500`.

### 14.2 Reusable MUI Components

- Reusable MUI components live in `client/src/components/reusable/*`.
- Reusable MUI components are prefixed with `Mui`.
- Input reusable components use `forwardRef`. Presentation wrappers do not need `forwardRef`.
- Set `displayName` on wrapped components.
- Default to `size="small"` where applicable, including TextField, Select, and Button.
- Pass through all standard MUI props.
- Wrappers are pure wrappers with no custom API surface.
- Use `slotProps.input` for input adornments, never `InputProps`.
- Every input element must have a proper start adornment.

### 14.3 Specific Reusable Component Requirements

- `MuiTextField`: Handles password type internally (no separate MuiPasswordField). Eye toggle via `useState` and `useCallback`. `onMouseDown` prevents focus loss. No layout shift. Merges caller's `slotProps.input.endAdornment`.
- `MuiButton`: Uses MUI native `loading`. Uses `loadingIndicator={<CircularProgress size={20} />}`. Uses `loadingPosition="center"`. Defaults `size="small"`.
- `MuiDialog`: Must pass or support `disableEnforceFocus` and `disableRestoreFocus`. Defaults both to `true`. Always use reusable `MuiDialog` instead of raw `@mui/material/Dialog`.
- `MuiConfirmDialog`: Preset confirmation dialog built on MuiDialog. Props: `open`, `onClose`, `onConfirm`, `title`, `message`, `confirmText`, `cancelText`, `confirmColor`. Used by MuiDataGrid archive/restore/delete flow and other confirm/dismiss scenarios.
- `MuiDataGrid`: Must have toolbar. Export selection required. Columns must be defined in `client/src/components/columns/*`. Action column includes tooltip and icon with proper color. Action column supports view, update, archive, restore, and delete. Archived item flow: archived -> MuiConfirmDialog -> restore or delete -> update UI. Server-side pagination. Skeleton loading rows.
- `MuiDatePicker`: Must explicitly switch between `DesktopDatePicker` on `md+` with popper and `MobileDatePicker` below `md` with dialog. Must use `theme.breakpoints.up('md')`. Never rely on DatePicker auto-switching.
- `MuiSelect`: Defaults `MenuProps={{ slotProps: { paper: { sx: { maxHeight: 300 } } } }}` for consistent dropdown height.
- `MuiPagination`: Defaults `color="primary"` and `shape="rounded"`. Used for list view pagination only.
- `GlobalSearchDialog`: Uses `react-hook-form` `useForm` with `register` for the search input. Search input is uncontrolled with no re-render on keystroke. Left arrow `ArrowBackIcon` start adornment clears field, resets results, and closes dialog.
- `LoadingSpinner`: Centered CircularProgress for full-page loading. Optional message prop.
- DataGrid action column icon colors use `sx` theme-path strings such as `'primary.main'`, `'warning.main'`, and `'error.main'`. Do not use the `color` prop on IconButton for DataGrid action column icon colors.
- Always use reusable components instead of raw `@mui/material/<component>` and put proper default props such as `size="small"` default.

### 14.4 Theme Rules

- All theme configuration lives in `client/src/theme/`.
- Do not inline theme overrides in page components.
- Add component overrides via new files in `customizations/`.
- `AppTheme.jsx` composes full MUI theme with `createTheme`, `cssVariables`, color schemes, and all customizations.
- Theme customization files use `@module`, not `@file`.
- `AppTheme.jsx` uses `@module`.
- Theme customization files: inputs, dataDisplay, feedback, navigation, surfaces, dataGrid, datePickers, charts.

### 14.5 MUI X

- All MUI X components, including charts, date picker, data grid, and any other MUI X component, are community version.
- MUI X Chat references: `https://mui.com/x/react-chat/` and `https://mui.com/x/react-chat/backend/adapters/`.

---

- 1.1 MuiAppbar
  - **File:** `client/src/components/reusable/MuiAppbar.jsx`
  - **Purpose:** Single reusable app bar configurable for both PublicLayout (full-width, top-level) and AppShell (inside content area, beside sidebar).
  - **Props:**
    - `position` — MUI AppBar position, default `"fixed"`
    - `elevation` — shadow depth, default `1`
    - `color` — MUI AppBar color prop, default `"inherit"`
    - `sx` — additional sx overrides
    - All standard MUI AppBar props passed through (pure wrapper, no custom API surface)
  - **Left Section:** Logo icon + app name. Click navigates to `/dashboard` if authenticated, `/` if not.
  - **Right Section:** Renders conditionally based on auth state.
  - **Public Layout Behavior:**
    - Full width (`width: 100%`)
    - `position="fixed"`
    - Unauthenticated: Theme toggle, Login button, Sign Up button
    - Authenticated: Theme toggle, Logout button (icon + tooltip)
  - **Protected Layout (AppShell) Behavior:**
    - Sits inside content area (NOT spanning across sidebar)
    - `position="static"`
    - Height: `64px`
    - No title text in the bar
    - Right section: Search icon (opens GlobalSearchDialog), Theme toggle, User avatar (dropdown: Profile + Logout)
    - Avatar sizes: `32px` below 600px, `36px` above 600px
  - **Auth Detection:** Reads auth state from Redux `authSlice` via `useSelector`
  - **Excluded from MuiAppbar:**
    - Search dialog content → handled via `GlobalSearchDialog`
    - User dropdown menu → rendered inline where used
    - Hamburger menu → handled by `AppSidebar` header
- 1.2 MuiButton
  - **File:** `client/src/components/reusable/MuiButton.jsx`
  - **Purpose:** Pure wrapper around MUI Button with safe defaults. Presentation wrapper — no `forwardRef` needed.
  - **Defaults:**
    - `size="small"`
    - `loadingIndicator={<CircularProgress size={20} />}`
    - `loadingPosition="center"`
    - Uses MUI native `loading` prop (not custom loading state)
  - **Prop Passthrough:** All standard MUI Button props pass through (`variant`, `color`, `disabled`, `onClick`, `type`, `startIcon`, `endIcon`, `sx`, `fullWidth`, etc.). Pure wrapper — no custom API surface.
  - **Setup:**
    - Tree-shaken import: `import Button from '@mui/material/Button'`
    - `displayName` set to `"MuiButton"`
  - **Variants (via passthrough):** `contained` (default), `outlined`, `text`
  - **Form Usage:**
    - Submit buttons use `type="submit"` and `size="small"`
    - `sx={{ flexShrink: 0 }}` to prevent shrinking
    - Disabled via `isSubmitting` from RHF `formState`
  - **Icon Rules:**
    - Icon-only buttons use raw `@mui/material/IconButton`, not MuiButton
    - Buttons with icons use standard `startIcon` / `endIcon` props
- 1.3 MuiDialog
  - **File:** `client/src/components/reusable/MuiDialog.jsx`
  - **Purpose:** Structural wrapper providing common dialog skeleton — title bar, scrollable content area, action buttons — with built-in dividers and responsive fullscreen. Always used instead of raw `@mui/material/Dialog`.
  - **Internal Structure:**
    - `<Dialog>` with defaults and passthrough props
    - `<DialogTitle>` with bottom `borderBottom` divider — rendered only if `title` prop is provided
    - `<DialogContent>` with `overflowY: auto` — the only scrollable section
    - `<Divider />` — rendered only if `actions` prop is provided
    - `<DialogActions>` — rendered only if `actions` prop is provided
  - **Props:**
    - `title` — string or ReactNode, rendered in DialogTitle with bottom divider
    - `children` — ReactNode, rendered inside scrollable DialogContent
    - `actions` — ReactNode, rendered inside DialogActions preceded by a Divider
    - `disableEnforceFocus` — default `true`
    - `disableRestoreFocus` — default `true`
    - All standard MUI Dialog props pass through (`open`, `onClose`, `maxWidth`, `fullWidth`, `fullScreen`, `scroll`, `PaperProps`, `sx`, `slotProps`, etc.)
  - **Responsive Fullscreen:**
    - Internal `useMediaQuery` checks `theme.breakpoints.down('sm')` OR `theme.breakpoints.down('md')` with landscape
    - When matched: `fullScreen={true}` — no border radius, 100vh
    - Overridable by caller passing explicit `fullScreen` prop
  - **MuiButton Integration:**
    - Caller provides MuiButton components inside the `actions` slot with proper props (e.g., `<MuiButton variant="outlined">Cancel</MuiButton>`)
    - Exception: GlobalSearchDialog (1.11) is a standalone component and does not use MuiDialog's actions slot
  - **Setup:**
    - Tree-shaken imports: `Dialog`, `DialogTitle`, `DialogContent`, `DialogActions`, `Divider`
    - `displayName` set to `"MuiDialog"`
- 1.4 MuiTextField
  - **File:** `client/src/components/reusable/MuiTextField.jsx`
  - **Purpose:** Single reusable text input wrapping MUI TextField. Handles all text types including password (no separate MuiPasswordField). `forwardRef` for RHF `register` compatibility.
  - **Defaults:**
    - `size="small"`
    - Tree-shaken: `import TextField from '@mui/material/TextField'`
    - `displayName` set to `"MuiTextField"`
  - **forwardRef & RHF Integration:**
    - Wrapped with `forwardRef` so `register('fieldName')` works directly
    - Props: `name`, `label`, `error` (bool), `helperText` (string)
    - Caller connects: `error={!!errors.fieldName} helperText={errors.fieldName?.message}`
  - **Start Adornment (mandatory):**
    - Every instance must have a proper start adornment
    - Caller passes via `slotProps.input.startAdornment`
    - Uses `slotProps.input` — never deprecated `InputProps`
  - **End Adornment:**
    - Caller passes via `slotProps.input.endAdornment`
    - When `type="password"`, eye toggle is internally injected as end adornment
  - **Password Type Handling (replaces MuiPasswordField):**
    - When `type="password"`, internal `useState` toggles between `"password"` and `"text"`
    - Eye icon (`Visibility`/`VisibilityOff`) as end adornment
    - `onMouseDown` on eye icon prevents focus loss
    - No layout shift on toggle
    - Merges caller's `slotProps.input.endAdornment` after the eye icon
  - **Prop Passthrough:** All standard MUI TextField props: `type`, `placeholder`, `disabled`, `required`, `multiline`, `rows`, `maxRows`, `fullWidth`, `sx`, `slotProps`, etc. `type` defaults to `"text"`.
  - **Error Display:** `error` and `helperText` passed directly to MUI TextField.
  - **Validation:** No zod — manual validation with consistent error shape.
- 1.5 MuiSelect
  - **File:** `client/src/components/reusable/MuiSelect.jsx`
  - **Purpose:** Reusable select input wrapping MUI Select. `forwardRef` for RHF `register` compatibility.
  - **Defaults:**
    - `size="small"`
    - `MenuProps={{ slotProps: { paper: { sx: { maxHeight: 300 } } } }}` — consistent dropdown height
    - Tree-shaken: `import Select from '@mui/material/Select'`
    - `displayName` set to `"MuiSelect"`
  - **forwardRef & RHF Integration:**
    - Wrapped with `forwardRef` so `register('fieldName')` works directly
    - Props: `name`, `label`, `error` (bool), `helperText` (string), `value`, `onChange`
    - Caller connects: `error={!!errors.fieldName} helperText={errors.fieldName?.message}`
  - **Start Adornment (mandatory):**
    - Every instance must have a proper start adornment
    - Caller passes via `slotProps.input.startAdornment`
    - Uses `slotProps.input` — never deprecated `InputProps`
  - **Children (Options):** Caller provides `<MenuItem>` children rendered directly inside `<Select>`.
  - **Prop Passthrough:** All standard MUI Select props: `variant`, `placeholder`, `disabled`, `required`, `fullWidth`, `sx`, `displayEmpty`, `renderValue`, `slotProps`, etc.
  - **Error Display:** `error` and `helperText` passed directly to MUI Select.
  - **Validation:** No zod — manual validation with consistent error shape.
- 1.6 MuiDatePicker
  - **File:** `client/src/components/reusable/MuiDatePicker.jsx`
  - **Purpose:** Responsive date picker for Ethiopian dates with English day/month names. Always community version.
  - **Responsive Switching (explicit, never auto):**
    - `md+` (>=900px): `DesktopDatePicker` — popper mode
    - `<md` (<900px): `MobileDatePicker` — dialog mode
    - Uses `theme.breakpoints.up('md')` via `useMediaQuery`
    - Both imported tree-shaken from `@mui/x-date-pickers`
  - **Ethiopian Calendar Integration:**
    - Utility file: `client/src/utils/ethiopianDate.js`
      - `ethiopianToGregorian(ethDate)` → JS Date
      - `gregorianToEthiopian(jsDate)` → `{ day, month, year }`
    - Custom lightweight conversion (no external npm package)
    - Ethiopian year offset (~7-8 years behind Gregorian), 13-month structure
  - **Display Format:**
    - Input/display value: DD-MM-YY numeric (e.g., `25-02-18`)
    - Day names: English (Monday, Tuesday...)
    - Month names: English mapped to Ethiopian months (September...August + Pagume)
    - Achieved via custom `format` prop and view format
  - **RHF Integration (Controller required):**
    - Uses `Controller` because DatePicker uses custom onChange (documented with code comment)
    - Props: `name`, `control`, `label`, `error`, `helperText`
  - **Community Edition:**
    - `@mui/x-date-pickers` community only — no Pro features
    - `LocalizationProvider` + `AdapterDayjs` already wraps app in `main.jsx`
  - **Prop Passthrough:** `minDate`, `maxDate`, `disabled`, `slotProps`, `sx`, etc.
  - **Setup:**
    - Tree-shaken imports
    - `displayName` set to `"MuiDatePicker"`
- 1.7 MuiPagination
  - **File:** `client/src/components/reusable/MuiPagination.jsx`
  - **Purpose:** Pure wrapper around MUI Pagination with safe defaults. Used for list view pagination only (not DataGrid).
  - **Defaults:**
    - `color="primary"`
    - `shape="rounded"`
    - Tree-shaken: `import Pagination from '@mui/material/Pagination'`
    - `displayName` set to `"MuiPagination"`
  - **Props:**
    - `count` — total pages (from server response)
    - `page` — current page (from server response)
    - `onChange` — page change handler
    - All standard MUI Pagination props pass through
  - **Backend Integration:**
    - `count` = `totalPages` from server response (`mongoose-paginate-v2` returns `totalPages` directly, no client-side calculation)
    - Constants: `PAGINATION_DEFAULT_PAGE=1`, `PAGINATION_DEFAULT_LIMIT=10`, `PAGINATION_MAX_LIMIT=100`
  - **Usage:** List views only. Parent manages page state via `useState` or Redux. Not used inside DataGrid.
- 1.8 MuiDataGrid
  - **File:** `client/src/components/reusable/MuiDataGrid.jsx`
  - **Package:** `@mui/x-data-grid` — community version only.
  - **Columns:** Defined per domain in `client/src/components/columns/*.js`. Each file exports a `columns` array. Action column is the last column in every domain column set.
  - **Action Column:**
    - View — `Visibility` icon, `sx={{ color: 'primary.main' }}`, tooltip "View", onClick navigates to `/${resource}/${id}` via `useNavigate`
    - Edit — `Edit` icon, `sx={{ color: 'warning.main' }}`, tooltip "Edit", onClick TBD
    - Archive/Delete — conditionally rendered:
      - Active items show `Archive` icon, `sx={{ color: 'text.secondary' }}`, tooltip "Archive"
      - Archived items show `Delete` icon, `sx={{ color: 'error.main' }}`, tooltip "Delete"
    - IconButton uses `sx` for color, never the `color` prop
    - Each action is an `IconButton` in `Tooltip` wrapper inside a `Stack direction="row"`
  - **Archive/Restore/Delete Flow:**
    - Archive click → `MuiConfirmDialog` → confirm → dispatch archive → update UI
    - Archived row shows restore and delete icons instead of archive
    - Restore click → `MuiConfirmDialog` → confirm → dispatch restore → update UI
    - Delete click → `MuiConfirmDialog` → confirm → dispatch permanent delete → update UI
  - **Export Selection:**
    - `checkboxSelection` enabled
    - `disableRowSelectionOnClick={true}`
    - Export button in toolbar for selected rows
  - **Toolbar:** Uses `GridToolbar` from `@mui/x-data-grid` (columns toggle, filter, density, CSV export).
  - **Server-Side Pagination:**
    - `paginationMode="server"`
    - `rowCount` from server's `totalDocs`
    - `onPaginationModelChange` handler
    - `pageSizeOptions={[10, 25, 50, 100]}`
    - Defaults: page=1, pageSize=10
  - **State Coverage:**
    - Loading: `loading` prop with skeleton via `slotProps={{ loadingOverlay: { variant: 'skeleton' } }}`
    - Empty: custom `slotProps={{ noRowsOverlay }}`
  - **Prop Passthrough:** `rows`, `columns`, `loading`, `rowCount`, `paginationModel`, `onPaginationModelChange`, `density`, `slots`, `slotProps`, etc.
  - **Setup:**
    - Tree-shaken imports
    - `displayName` set to `"MuiDataGrid"`
    - Default `sx={{ height: 400 }}` (overridable)
- 1.9 MuiConfirmDialog
  - **File:** `client/src/components/reusable/MuiConfirmDialog.jsx`
  - **Purpose:** Preset confirmation dialog built on MuiDialog. Used for archive/delete and other confirm/dismiss scenarios.
  - **Props:**
    - `open` — dialog visibility
    - `onClose` — dismiss handler
    - `onConfirm` — confirm action handler
    - `title` — dialog title (e.g., "Archive Report")
    - `message` — confirmation message (e.g., "Are you sure you want to archive this report?")
    - `confirmText` — confirm MuiButton label, default `"Confirm"`
    - `cancelText` — cancel MuiButton label, default `"Cancel"`
    - `confirmColor` — MuiButton color for confirm, default `"primary"` (overridable to `"error"` for delete)
  - **Structure:** Uses MuiDialog internally with title, message in content, and two MuiButtons in actions (Cancel + Confirm).
  - **Setup:** `displayName` set to `"MuiConfirmDialog"`
- 1.10 LoadingSpinner
  - **File:** `client/src/components/reusable/LoadingSpinner.jsx`
  - **Purpose:** Centered full-page or full-section loading indicator.
  - **Structure:**
    - Outer `Box` with `display: flex`, `alignItems: center`, `justifyContent: center`, full available dimensions
    - `CircularProgress` centered
    - Optional `message` rendered as `Typography` below the spinner
  - **Props:**
    - `message` — optional string, muted text beneath spinner
    - `size` — CircularProgress size, default `40`
    - `minHeight` — wrapper min-height, default `"100vh"` for full-page, overridable (e.g., `"400px"` for section-level)
    - All standard Box/CircularProgress props pass through
  - **Usage:** ProtectedRoute during `initializing`, page lazy-loading, section-level data fetch.
  - **Setup:**
    - Tree-shaken imports
    - `displayName` set to `"LoadingSpinner"`
- 1.11 GlobalSearchDialog
  - **File:** `client/src/components/reusable/GlobalSearchDialog.jsx`
  - **Purpose:** Global search across Reports and Branches. Opened from MuiAppbar search icon. Standalone — does not use MuiDialog's actions slot.
  - **Responsive Sizing:**
    - `< 600px` and `< 768px` land: full-screen (no border radius, 100vh)
    - `600-1200px`: centered dialog, 80vh / 600px
    - `> 1200px`: centered dialog, 70vh / 720px
    - Uses `Dialog` directly with `fullScreen` and `PaperProps.sx` for sizing
  - **Open/Close:** Opened via `open` prop from MuiAppbar search icon. Closed by back arrow, Escape, or click outside.
  - **Search Input:**
    - `useForm({ mode: 'onSubmit' })` with `register('search')`
    - Uncontrolled — no re-render on keystroke
    - Start adornment: `ArrowBackIcon` — clears field, resets results, closes dialog
    - Fires on Enter or search icon click (no debounce)
  - **Results Display:**
    - Grouped by entity type (Reports, Branches) in MuiAccordion sections
    - Each result navigates to detail page and closes dialog
    - Empty state: "No results found"
  - **Props:** `open`, `onClose`
  - **Setup:**
    - Tree-shaken imports
    - `displayName` set to `"GlobalSearchDialog"`
- 1.12 MuiPageHeader
  - **File:** `client/src/components/reusable/MuiPageHeader.jsx`
  - **Purpose:** Consistent page header for protected pages. Left side: title + subtitle (hidden on vw < 600 portrait). Right side: children slot for action elements.
  - **Structure:** Flex container, `justifyContent="space-between"`, `alignItems="center"`, `mb: 2`, bottom border 1px solid divider
  - **Props:** `title` (string, required), `subtitle` (string, optional), `children` (ReactNode, optional)
  - **Setup:** Tree-shaken imports, `displayName="MuiPageHeader"`
- 1.13 MuiStatusBadge
  - **File:** `client/src/components/reusable/MuiStatusBadge.jsx`
  - **Purpose:** Color-coded, non-interactive status chip for `report.status`. Read-only presentation — no click handling, no hover pointer.
  - **Structure:** MUI `Chip`, `size="small"`, `label={status}`, cursor stays default (no pointer). Never renders inside a button.
  - **Props:** `status` (string, required — one of `draft` | `audio_attached` | `transcribed` | `reviewed` | `completed`)
  - **Color mapping:**
    - `draft` → default
    - `audio_attached` → warning
    - `transcribed` → info
    - `reviewed` → primary
    - `completed` → success
  - **Usage:** Report Details header (3.6).
  - **Setup:** Tree-shaken imports, `displayName` set to `"MuiStatusBadge"`


## 15. React Hook Form Standards

- All forms use `react-hook-form` with `register` by default.
- Use `const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur' })`.
- No `watch`. Use `getValues` in validate functions for cross-field validation.
- Use `register` by default. Use `Controller` only when `register` cannot work, such as MUI X DatePicker or TimePicker which use custom onChange values instead of native events. If `Controller` is used, document why with a code comment.
- For cross-field validation such as confirm password, use `validate: (value) => value === getValues('password') || 'Passwords must match'`.
- Use `formState.errors` for validation error display.
- Use MUI `error` and `helperText` props on wrapped components.
- Never debounce input. Never use `useDebounce`. Direct register integration only.
- Use `setError` for backend validation: `setError('fieldName', { message: error.data?.data?.errors?.[0]?.message })`.
- Submission: `handleSubmit(onSubmit)` with try/catch; `reset()` after success.
- Loading: `isSubmitting` from formState disables submit button and shows spinner.
- Schema validation via manual resolver with consistent error shape. No zod.
- All reusable Mui input components must use `forwardRef`.

---

## 16. UI Rules

- App shell, navigation, labels, buttons, validation messages, helper text, and everything else must be English.
- Audio, transcription, AI chat, and report content can be Amharic, English, or mixed.
- Do not force translation unless the user explicitly chooses it.
- Use `size="small"` on form submit buttons.
- Form submit buttons must not shrink on flex.
- Always use icons on `vw < 600`.
- Always use icons on `vw < 768 && landscape`.
- Text must not overflow or overlap at mobile or desktop widths.
- All text must use ellipsis after a certain character.

---

## 17. Environment Variables

### 17.1 Environment File Rules

- `.env` files are gitignored and not committed.
- `.env` files exist locally with placeholder or correct values.
- No `.env.example` files.
- New env vars are added by:
  1. Adding to local `.env`.
  2. Adding field to config object in `config/env.js`.
  3. Adding validation/default logic in `config/env.js`.
- Never access `process.env` directly outside of `config/env.js`.
- Client env vars must be prefixed with `VITE_` and accessed via `import.meta.env.*`.

### 17.2 Backend Required And Optional Environment Variables

| Variable                           | Required | Default                        | Description                                             |
| ---------------------------------- | -------- | ------------------------------ | ------------------------------------------------------- |
| NODE_ENV                           | Yes      | development                    | Environment mode                                        |
| PORT                               | Yes      | 4000                           | Server port                                             |
| CLIENT_ORIGIN                      | Yes      | http://localhost:3000          | CORS allowed origin                                     |
| MONGODB_URI                        | Yes      | —                              | MongoDB connection string (database: report-builder-v2) |
| JWT_ACCESS_SECRET                  | Yes      | —                              | Access token signing secret (min 32 chars)              |
| JWT_REFRESH_SECRET                 | Yes      | —                              | Refresh token signing secret (min 32 chars)             |
| JWT_ACCESS_EXPIRES_IN              | Yes      | 15m                            | Access token TTL                                        |
| JWT_REFRESH_EXPIRES_IN             | Yes      | 7d                             | Refresh token TTL                                       |
| ADDIS_AI_BASE_URL                  | Yes      | https://api.addisassistant.com | Addis AI API base URL                                   |
| ADDIS_AI_API_KEY                   | Yes      | sk\_... (placeholder)          | Addis AI secret key                                     |
| ADDIS_AI_TEXT_MODEL                | Yes      | Addis-፩-አሌፍ                    | Text generation model                                   |
| ADDIS_AI_STT_MODEL                 | Yes      | default                        | Speech-to-text model                                    |
| ADDIS_AI_DEFAULT_TARGET_LANGUAGE   | Yes      | am                             | Default target language code                            |
| ADDIS_AI_STT_LANGUAGE_CODE         | Yes      | am                             | STT language code                                       |
| ADDIS_AI_TIMEOUT_MS                | Yes      | 360000                         | Addis AI request timeout (ms)                           |
| LOG_LEVEL                          | Yes      | debug (dev) / info (prod)      | Winston log level                                       |
| NVIDIA_API_KEY                     | Yes      | —                              | Nvidia API key                                          |
| GEMINI_API_KEY                     | Yes      | —                              | Gemini API key                                          |
| NVIDIA_API_BASE_URL                | Yes      | —                              | Nvidia NIM API base URL                                 |
| GEMINI_API_BASE_URL                | Yes      | —                              | Gemini API base URL                                     |
| FFMPEG_PATH                        | Yes      | ffmpeg (system)                | Custom ffmpeg binary path                               |
| FFPROBE_PATH                       | Yes      | ffprobe (system)               | Custom ffprobe binary path                              |
| OAUTH_GOOGLE_CLIENT_ID             | No       | —                              | Google OAuth client ID                                  |
| OAUTH_GOOGLE_CLIENT_SECRET         | No       | —                              | Google OAuth client secret                              |
| OAUTH_GOOGLE_CALLBACK_URL          | No       | —                              | Google OAuth callback URL                               |

The Google Docs export reuses the optional `OAUTH_GOOGLE_*` keys — the document is created with the user's own Google OAuth token (the login flow extended with the `drive.file` scope), so no service-account credentials are needed (Phase 25 user decision).

### 17.3 Client Environment Variables

| Variable          | Required | Default                      | Description              |
| ----------------- | -------- | ---------------------------- | ------------------------ |
| VITE_API_BASE_URL | Yes      | http://localhost:4000/api/v1 | Backend API base URL     |
| VITE_APP_NAME     | Yes      | Report Builder V2            | Application display name |

### 17.4 AI Key Rules

- Addis AI API keys starting with `sk_` must never appear in client code.
- Addis AI API keys must never appear in Vite env vars sent to browser.
- Addis AI API keys must never appear in localStorage.
- Addis AI API keys must never appear in Redux state.
- Addis AI API keys must never appear in client logs.
- Nvidia and Gemini API keys are placed in `backend/.env` only.

### 17.5 Constants (backend/utils/constants.js)

Exported as a single `Object.freeze()` frozen object. Key groups:

- **Audio:** `AUDIO_MAX_DURATION_SEC=900`, `AUDIO_MAX_SIZE_BYTES=52428800` (50MB), `AUDIO_ALLOWED_MIME_TYPES=[audio/mpeg, audio/wav, audio/mp4, audio/webm]`
- **Pagination:** `PAGINATION_DEFAULT_PAGE=1`, `PAGINATION_DEFAULT_LIMIT=10`, `PAGINATION_MAX_LIMIT=100`
- **STT:** `ADDIS_AI_STT_MAX_DURATION_SEC=60`
- **Auth:** `BCRYPT_SALT_ROUNDS=12`
- **AI Generation:** `AI_TEMPERATURE=0.2`, `AI_MAX_OUTPUT_TOKENS=2048`, `AI_TOP_P=0.9`, `AI_TOP_K=40`
- **AI Correction:** `AI_CORRECTION_MAX_OUTPUT_TOKENS=2048`, `AI_CORRECTION_TEMPERATURE=0.15`

---

## 18. Addis AI Integration

### 18.1 Primary Sources

- `https://www.addisai.ch/`
- `https://docs.addisassistant.com/docs/get-started/introduction`
- `https://docs.addisassistant.com/docs/get-started/quickstart`
- `https://docs.addisassistant.com/docs/capabilities/text-generation`
- `https://docs.addisassistant.com/docs/capabilities/text-to-speech`
- `https://docs.addisassistant.com/docs/capabilities/speech-to-text`
- `https://docs.addisassistant.com/docs/capabilities/multimodal`
- `https://docs.addisassistant.com/docs/capabilities/realtime`
- `https://docs.addisassistant.com/docs/capabilities/translation`
- `https://docs.addisassistant.com/docs/integration/web`
- `https://docs.addisassistant.com/docs/integration/server`
- `https://docs.addisassistant.com/docs/integration/voice-interface`
- `https://docs.addisassistant.com/docs/platform/errors`

### 18.2 Provider Identity

Addis AI provides African-language AI infrastructure for voice, chat, retrieval, translation, and localization. The platform supports voice AI, cross-lingual RAG, chat, speech-to-text, text-to-speech, translation, and enterprise deployments.

### 18.3 Base URLs And Platform

- Developer/API base URL: `https://api.addisassistant.com`
- Playground/dashboard: `https://platform.addisassistant.com`
- Realtime relay: `wss://relay.addisassistant.com/ws?apiKey=<API_KEY>`

### 18.4 Authentication

- API keys are generated in the Addis AI dashboard.
- Secret keys start with `sk_`.
- REST authentication uses `x-api-key` header.
- The key must never be exposed in frontend code.
- The app must call Addis AI only from the backend.
- Backend-only proxy. No direct client-to-Addis AI calls.
- AI endpoints protected by authentication.
- Rate limits on auth and AI endpoints.

### 18.5 Core Model Families

- Text model: `Addis-፩-አሌፍ`
- Voice models: `አሌፍ-Audio-AM`, `አሌፍ-Audio-OM`
- Realtime audio model: `አሌፍ-1.2-realtime-audio`

### 18.6 Language Support Relevant To This Project

Current support includes English, Amharic, Afan Oromo, and Tigrinya. Text generation docs emphasize Amharic and Afan Oromo. STT docs specifically support Amharic and Afan Oromo. Translation supports bidirectional between Amharic `am`, Afan Oromo `om`, and English `en`. For this app, implement Amharic `am` and English-aware prompting as first-class. Keep language constants extensible for Oromo `om` and Tigrinya where appropriate.

### 18.7 Text Generation

Endpoint: `POST https://api.addisassistant.com/api/v1/chat_generate`

Request body is JSON:

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

Response shape:

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

- Use this endpoint after the user reviews transcription.
- Use a strict report-generation prompt and ask for structured JSON-like output.
- Use low temperature, ideally `0.2`, for factual report generation.
- Keep AI keys only in backend `.env`.
- The backend HTTP client uses native `fetch` for Addis AI calls.

### 18.8 Speech To Text

Endpoint: `POST https://api.addisassistant.com/api/v2/stt`

Request is `multipart/form-data` with:

- `audio`: uploaded audio file.
- `request_data`: stringified JSON, for example `{ "language_code": "am" }`.

Response shape:

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

Supported audio formats: WAV (`audio/wav`, `audio/x-wav`, `audio/wave`), MP3 (`audio/mpeg`, `audio/mp3`), M4A (`audio/mp4`, `audio/x-m4a`), WebM (`audio/webm`).

Documented constraints:

- Max duration: 60 seconds per request, chunk by chunk.
- Max file size per request: 10 MB.
- Recommended sample rate: 16 kHz or higher. Mono preferred.
- Quiet environment and 10-30cm microphone distance recommended.
- Optimized for single-speaker audio.
- Overlapping voices and heavy code-switching may reduce accuracy.

Project use:

- Frontend imposes no duration limit.
- Backend chunks long WAV recordings before STT.
- Accuracy-critical pipeline: convert full audio to WAV via ffmpeg in a single pass using `pcm_s16le`, `16kHz`, mono, before PCM-level split.
- Per-segment re-encoding causes Opus decoder priming artifacts that degrade transcription quality.
- Error handling: network failure retry 3 times with exponential backoff (1s, 2s, 4s). Provider error (4xx, 5xx) marks the chunk as failed and continues processing remaining chunks.

### 18.9 Text To Speech

Endpoint: `POST https://api.addisassistant.com/api/v1/audio`

Request body is JSON: `{ "text": "string", "language": "am", "voice_id": "male_1", "stream": false }`.

Response includes Base64 WAV audio, commonly under `audio`.

Project use: TTS is not required for the first report-builder workflow. Keep service support possible for later voice playback or AI chat.

### 18.10 Multimodal

Endpoint: `POST https://api.addisassistant.com/api/v1/chat_generate`

Request is `multipart/form-data` when attaching files: fields include `image` or `audio` and `request_data` (stringified JSON with `prompt`, `target_language`, and generation config).

### 18.11 Translation

Endpoint: `POST https://api.addisassistant.com/api/v1/translate`

Request body: `{ "text": "string", "source_language": "am", "target_language": "en" }`. Response nests translation under `data.translation`.

Project use: Optional. Do not translate by default because the report may be intentionally Amharic, English, or mixed. Consider a later UI control if the user wants final reports in a chosen target language.

### 18.12 Realtime

Endpoint: `wss://relay.addisassistant.com/ws?apiKey=<API_KEY>`

Protocol: Client waits for `{ "setupComplete": true }`. Client sends base64 PCM16 audio chunks in JSON envelopes: `{ "data": "BASE64_ENCODED_PCM16_CHUNK", "mimeType": "audio/pcm;rate=16000" }`. Server returns base64 PCM16 audio under `serverContent.modelTurn.parts[0].inlineData.data`.

Project use: Do not expose secret keys in browser WebSocket URLs. Realtime is not required for the V2 report creation workflow. If later implemented, use a backend-controlled strategy and verify whether Addis AI supports short-lived client tokens.

### 18.13 Errors

Error object: `{ "status": "error", "error": { "code": "invalid_api_key", "message": "...", "param": "optional" } }`.

Status codes:

- `400`: invalid request or missing field.
- `401`: missing or invalid API key.
- `403`: key lacks permission.
- `404`: endpoint or model missing.
- `429`: rate limit or quota.
- `500`: Addis AI server error.
- `503`: service overloaded.

Project handling:

- Map Addis AI errors to safe user messages.
- Log provider request IDs and status codes, not raw sensitive report content.
- Implement timeout. On network failure: retry 3 times with exponential backoff (1s, 2s, 4s). On provider error (4xx, 5xx): mark chunk as failed and continue.

### 18.14 Package And Implementation Implications

- Use backend proxy only.
- Use native `fetch` in Node for Addis AI calls.
- Use `multer` for receiving browser audio uploads.
- Use Node `FormData`/`Blob` if available.
- If project Node version does not support reliable multipart forwarding, add a small documented multipart helper package.
- Do not install an Addis AI SDK unless official docs publish one. Docs currently say JavaScript/TypeScript SDKs are coming soon.

---

## 19. Other AI Providers

- In addition to Addis AI, Nvidia and Gemini will be used.
- STT always uses Addis AI.
- All AI providers used must be free, with no credit card or subscription required. Never use non-free AI.
- Nvidia and Gemini API keys are placed in `backend/.env`.
- Gemini model: `gemini-3.1-flash-lite`.
- Nvidia model: `z-ai/glm-5.2` at least for now.
- Other free models can also be added.
- HTTP client for Gemini and Nvidia: use axios.
- All three providers available. Provider selected by user at generation time via dropdown or buttons. Default: Addis.
- Provider stored per AI conversation message. Different providers can be used for corrections versus initial generation.
- Provider fallback chain: Addis → Gemini → Nvidia.

### 19.1 Gemini Integration

Model: `gemini-3.1-flash-lite`. Endpoint: `POST https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_API_KEY}`. Request: `{ contents: [{ role, parts: [{ text }] }], systemInstruction: { parts: [{ text }] }, generationConfig: { temperature: 0.2, maxOutputTokens: 2048, topP: 0.9, topK: 40 } }`. No streaming. Error handling: network failure retry 3 times with exponential backoff; provider error returns 502.

### 19.2 Nvidia Integration

Model: `z-ai/glm-5.2`. Uses Nvidia API message format with `Authorization: Bearer` token. Same retry pattern as Gemini.

---

## 20. Audio Recording And STT Pipeline

### 20.1 Audio Recording Rules

- Max duration: 15 minutes per clip (configurable via `AUDIO_MAX_DURATION_SEC` in constants).
- Max file size: 50 MB per clip (configurable via `AUDIO_MAX_SIZE_BYTES` in constants).
- Limits enforced client-side after recording stops.
- If `blob.size > 50 MB`, submit is blocked, warning is shown, and user is asked to re-record.
- Long recordings exceeding STT per-request duration of 60 seconds are chunked by backend before STT.
- Frontend records audio as clips, each added to an array in local state. User submits the full array as `multipart/form-data` (field name `'clips'`).
- Audio blob uses component-local state with `useState` and `useRef` in a custom hook.
- Audio blob is not persisted to Redux, redux-persist, or localStorage.
- MIME type priority:
  - `audio/webm;codecs=opus`
  - `audio/webm`
  - `audio/mp4`
  - browser default
- Browser `MediaRecorder` API.
- `react-media-recorder` and `react-player` are already installed in the client.

### 20.2 Audio Validation

- At least one audio clip is required.
- Max file size is 50 MB (configurable).
- Allowed MIME types must be validated.
- Duration metadata is informational.
- Duration is validated server-side via ffprobe.
- Audio type and size are validated server-side.

### 20.3 Upload Storage

- Use `multer` for receiving browser audio uploads.
- Audio stored temporarily under `backend/uploads/audio/`.
- `backend/uploads/audio/` uses `.gitignore`.
- Uploaded files are not committed.

### 20.4 Approved Chunking Pipeline

The only approved chunking pipeline for STT is:

1. ffmpeg full-file WAV conversion using `pcm_s16le`, `16kHz`, mono.
2. In-memory PCM-level WAV split via `wavSplitter.js` (60-second chunks, configurable via `ADDIS_AI_STT_MAX_DURATION_SEC` in constants).
3. Each chunk MIME type: `audio/wav` — never `audio/webm` for chunks.

Any alternative chunking approach that degrades accuracy is forbidden unless proven equivalent. Per-segment ffmpeg re-encoding causes Opus decoder priming artifacts that degrade transcription quality.

### 20.5 Re-Transcription

Re-transcription must be available so accuracy can be verified across multiple attempts. Backend must accept both `audio_recorded` and `transcribed` statuses. Frontend must show a "Re-transcribe" button on completed transcription.

---

## 21. AI Prompt Requirements

### 21.1 Generation Prompt

System message: "You are an expert report writer for a restaurant company's supervision department. Generate structured daily supervision reports in Amharic based on field note transcriptions."

Parameters: temperature `0.2`, maxOutputTokens `2048`.

### 21.2 Correction Prompt

System message: "You are an expert report editor. The user has provided corrections to a previously generated report. Incorporate the corrections while maintaining the original structure and style."

Parameters: temperature `0.15`, maxOutputTokens `2048`.

### 21.3 Voice Correction

Correction audio → STT → correction text → used in same correction prompt.

### 21.4 Transcription Correction

Uses the system to fix transcription errors (fill gaps, fix misrecognized words). Returns corrected text as `aiCorrectedText` in the Transcription model.

### 21.5 Amharic Generation Rules

The AI prompt must enforce these rules:

1. Generate the report in Amharic.
2. Use exact section structure: ቀን, ብራንች, ስም, ስራ የገባሁበት ሰዓት, የተሰሩ ስራዎች, መፍትሄ የሚፈሉ ጉዳዮች, አጠቃላይ አስተያየት, ከስራ የወጣሁበት ሰዓት.
3. Match tone and writing style of provided samples: professional, direct, clear, work-report oriented, supervisor perspective.
4. Use reviewed transcription as source of truth.
5. Do not invent missing information.
6. If required information is missing, leave blank or mark as not specified.
7. Separate completed activities from unresolved issues.
8. Preserve branch-specific details for multi-branch reports.
9. Preserve time ranges per branch.
10. Write from supervisor's point of view.
11. Do not output explanation of how report was generated.
12. Do not include unrelated conversation content.
13. For corrections: update only relevant part, do not rewrite correct unrelated sections.
14. English or technical words must use Amharic workplace transliteration (example: `deep fryer` → `ዲፕ ፍራየር`).

---

## 22. Export

Reports should be exportable in multiple formats. PDF, TXT, CSV, and XLSX export is client-side only. Google Docs export is backend-only: the document is created directly in the user's own Google Drive with the user's own Google OAuth token.

- **PDF:** `jspdf` with `jspdf-autotable`. A4 format. Noto Sans Ethiopic font for Amharic text. Section headers. Page numbers.
- **TXT:** Blob with UTF-8 encoding. Plain structure preserving report format.
- **CSV:** Blob with UTF-8 with BOM for Excel compatibility. Structured columns.
- **XLSX:** Multi-sheet workbook: content sheet (report), version history sheet (all versions with metadata), metadata sheet (provider, dates, status).
- **Google Docs:** Backend uses the Google Docs API with the user's own Google OAuth token (the Google login flow, extended with the `drive.file` scope) to create a document from the generated report content directly in the user's own Google Drive. The user owns the document and can edit, share, download, or move it freely — no sharing-permission step is needed. Returns the document URL. Frontend opens the URL in a new tab. The user's token is stored and refreshed server-side only. (Phase 25 user decision: replaced the earlier Google Service Account approach, which cannot place files in a user's Drive.)

`jspdf` and `jspdf-autotable` are already installed in the client package list.

---

## 23. Mock Data

The `backend/mock/*` data injection and wipe must support MongoDB sessions. Additional mock data requirements are not specified in the source notes.

---

## 24. Data Model

### 24.1 Models Or Records Explicitly Named

- **User** — fields: `firstName`, `lastName`, `email`, `password` (hashed). Optional: `avatar` (URL string), `position` (string). Timestamps.
- Branches.
- Daily reports.
- Transcriptions.
- AI conversations.
- Generated reports.
- Report version history (unified `ReportVersion` replaces separate GeneratedReport + ReportVersion).
- Reporting analytics.
- Audio uploads or recordings.

### 24.2 Explicit Data-Modeling Rules

- All model hooks, instance methods, and static methods must support session options where relevant.
- No schema field combines `unique: true` with separate indexes.
- Use `schema.index(..)`.
- Password hashing uses `bcryptjs` `pre('save')` hook with 12 salt rounds.
- `comparePassword(candidatePassword)` uses `bcrypt.compare`.
- All list endpoints use pagination with `mongoose-paginate-v2`.

### 24.3 Data Fields Not Specified

Detailed fields, hooks, methods, static methods, virtuals, and relationships for all models are not fully specified. These must be defined in the data-modeling phase using only codebase analysis, this document, and user-approved clarifications.

---

### 24.4 Report

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
- `generated`: latest AI-generated report text (§6.1 format). Empty string until the first successful `POST /reports/:id/generate` (3.6, Generate Report). Set together with `status → completed`. Lives on Report (not Transcription) — generation consumes `Transcription.latest` and produces the Report output.
- `generatedHistory[]`: appended on every successful generation — `{ provider, text, generatedAt }`. No UI in this cycle (details History card = transcription history, 3.5.1.9). Re-generation overwrites `generated` and appends a new entry.

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

### 24.5 Audio

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

### 24.6 Transcription

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

### 24.7 User

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

### 24.8 Branch

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

### 24.9 ChatConversation

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

**Relationships:** one user → many conversations; one conversation → exactly one report. Deleting a report does NOT delete its conversations (conversation keeps the `report` id for deep links). Created via `POST /assistant/conversations` (3.5.2, Routes (backend)).


### 24.10 Relationships

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


## 25. Project Directory Structure

### 25.1 Explicit Backend Paths

- `app.js`
- `server.js`
- `config/env.js`
- `config/db.js`
- `routes/index.js`
- `routes/`
- `validators/*.js`
- `utils/constants.js`
- `utils/httpStatus.js`
- `utils/logger.js`
- `services/oauth.service.js`
- `middleware/notFound.middleware.js`
- `backend/mock/*`
- `backend/uploads/audio/`

### 25.2 Explicit Frontend Paths

- `client/src/main.jsx`
- `client/src/App.jsx`
- `client/src/pages/*` — one lazy-loaded file per page (§12.6): Landing, Login, Register, Dashboard, Reports, ReportDetails, Branches, BranchDetails, Profile, NotFound, Assistant
- `client/src/components/layout/*` — PublicLayout, AppShell, AppSidebar (§12.2–12.3)
- `client/src/components/<domain>/*` — domain component folders: landing, login, register, dashboard, report, branch, profile, assistant, notFound (§12.6)
- `client/src/utils/constants.js`
- `client/src/redux/app/store.js`
- `client/src/redux/features/api.js`
- `client/src/redux/features/<name>Slice.js`
- `client/src/components/reusable/*`
- `client/src/components/columns/*`
- `client/src/theme/`
- `client/src/theme/customizations/`
- `client/src/theme/AppTheme.jsx`
- `client/src/theme/themePrimitives.js`

### 25.3 Directory Structure Details Not Specified

A complete final project directory structure is not fully specified. It must be generated in the dedicated documentation phase from current `backend/*`, current `client/*`, and this document.

---

## 26. Code Quality And Coding Conventions

- ES Modules only throughout backend (`import`/`export`, never `require()`/`module.exports`).
- Backend package must use `"type": "module"`.
- No console.log in backend code. Winston replaces it in all environments. Allowed in frontend.
- No zod validation library — use manual resolvers with consistent error shape.
- Semicolons required. Single quotes. Trailing commas. 2-space indentation. 100 character width. LF line endings. UTF-8 encoding.
- camelCase for variables and functions. PascalCase for classes and components. kebab-case for file names. UPPER_SNAKE_CASE for constants and environment variables.
- Import order: built-in modules → npm packages → local modules (alphabetical within groups).
- Named imports for utilities and functions. Default import for React components. Never use `*` imports.
- JSDoc on all public modules with `@module`. JSDoc on functions with `@param`, `@returns`, and `@throws`. JSDoc on constants with `@type`. JSDoc on exports.
- JSDoc block comments on every single file or module.
- Unused parameters use `_` prefix, for example `_req`, `_res`, `_next`, to signal intentional non-use.
- No unused imports. Every `import X from Y` must be referenced in the file body.
- No unused exports. Every exported function or constant must be imported elsewhere.
- No dead code. Remove unused constants, variables, and methods.
- Functional components with hooks. Props destructured in function signature. Event handlers prefixed with `handle`.
- `req.user._id.toString()` pattern for user ID.
- Frontend must pass `npx vite build` with 0 errors.
- Frontend must also pass lint.

---

## 27. JSDoc Conventions

- Module-level: `@module path/name` at top of each file.
- Function-level: `@param {type} name - description`, `@returns {type}`, and `@throws {ErrorType} reason` where applicable.
- Constants: `@type {TypeDefinition}` on exported constants.
- Theme customizations: use `@module`, not `@file`.
- `AppTheme.jsx`: use `@module`.
- Express types: `import('express').Request`, `import('express').Response`, `import('express').NextFunction`.
- Mongoose middleware types: `@returns {Promise<void>}` for async middleware.
- Component JSDoc: `@param {Object} props` with name, label, error, helperText, control props documented.
- Model JSDoc: `@typedef {Object} ModelName` with `@property {Type} fieldName - description`.
- Middleware JSDoc: `@param {import('express').Request} req`, `@param {import('express').Response} res`, `@param {import('express').NextFunction} next`.
- Types: No TypeScript, so JSDoc provides type documentation. Use `@typedef` for object shapes, `@param {Object}` with destructured properties, `@returns {Promise<Type>}` for async functions.

---

## 28. Error Handling Patterns

### 28.1 Server-Side Error Handling

- Global error handler distinguishes operational `CustomError` from unexpected errors.
- `CustomError` class with `statusCode`, `message`, and `isOperational` properties.
- `notFound.middleware.js` catches unmatched routes, creates `CustomError(404, ..)`, and forwards via `next()`.
- Validation errors return `422` with `{ success: false, message: "..", data: {..} }`.
- All async controllers wrapped with `express-async-handler`.
- Global error handler: Development returns full stack trace. Production returns generic message and logs programmer errors.

### 28.2 Error Types And HTTP Status Codes

| Error                          | Status | Description                                          |
| ------------------------------ | ------ | ---------------------------------------------------- |
| Validation                     | 422    | express-validator failures                           |
| Auth (missing/invalid token)   | 401    | No access token, invalid signature, or expired token |
| Auth (refresh expired)         | 401    | Refresh token expired or invalid                     |
| Not Found                      | 404    | Resource not found with descriptive message          |
| File size exceeded             | 413    | Audio upload too large                               |
| Invalid MIME type              | 415    | Audio format not allowed                             |
| Mongoose CastError             | 400    | Invalid ObjectId                                     |
| Mongoose ValidationError       | 422    | Field-format error messages                          |
| Mongoose duplicate key (11000) | 409    | Unique constraint violation                          |
| JsonWebTokenError              | 401    | Invalid token                                        |
| TokenExpiredError              | 401    | Expired access token (triggers refresh flow)         |
| AI service error               | 502    | Provider returned error                              |

### 28.3 Frontend Error Handling

RTK Query `baseQueryWithReauth`: on 401 → `POST /api/v1/auth/refresh` → if refresh succeeds, retry original request (cookies set automatically) → if refresh fails, clear auth state, redirect to login.

In `onQueryStarted`: catch errors from `baseQuery` with `if (error)` pattern. Display server-formatted validation errors per field using `error.data.data.errors`. Toast notifications via `AppToastContainer` for success/error. Error message extraction: `error.data?.message || error.data?.data?.errors?.[0]?.message || 'Something went wrong'`.

`AppErrorBoundary`: class component catching React render errors, showing fallback UI.

---

## 29. Security

### 29.1 Environment And Secrets

- `.env` files in `.gitignore`. Never committed. No `.env.example` files.
- All API keys stored only in `backend/.env`.
- All service calls proxied through backend — never called directly from frontend.
- No API keys in frontend code, Vite env vars, localStorage, Redux state, or client logs.

### 29.2 JWT Cookie Security

- Two-token system with httpOnly cookies.
- Access token: 15min TTL, path `/`, signed with `JWT_ACCESS_SECRET`.
- Refresh token: 7d TTL, path `/api/v1`, signed with `JWT_REFRESH_SECRET`.
- Tokens never exposed to JavaScript (httpOnly prevents XSS token theft).
- Refresh token rotated on each use (prevents replay).
- `secure` flag in production, `sameSite: lax`.
- No sessions MongoDB collection — zero DB lookups for auth on each request.

### 29.3 CORS

CORS origin configured via `CLIENT_ORIGIN` env var (default: `http://localhost:3000`). `credentials: true` to allow cookies.

### 29.4 Rate Limiting

Three tiers:

| Limiter | Window     | Max Requests | Applied To                      |
| ------- | ---------- | ------------ | ------------------------------- |
| Global  | 15 minutes | 100          | All endpoints                   |
| Auth    | 15 minutes | 20           | /auth/register, /auth/login     |
| AI      | 1 minute   | 10           | Generation/correction endpoints |

### 29.5 Middleware Stack (FIXED ORDER)

`helmet → cors → compression → cookie-parser → mongo-sanitize → rate-limit`

This order is intentional and must not be changed:

1. helmet — Security headers first.
2. cors — Cross-origin before cookie parsing.
3. compression — Compress responses with gzip.
4. cookie-parser — Parse cookies before route handlers.
5. mongo-sanitize — Strip `$` and `.` from request data before it reaches controllers.
6. rate-limit — Global rate limiting before API routes.

### 29.6 NoSQL Injection Prevention

`express-mongo-sanitize` strips `$` and `.` from `req.body`, `req.query`, `req.params` globally.

### 29.7 Input Validation

All inputs validated using `express-validator`. Validation errors return 422 with response shape: `{ success: false, message: 'Validation failed', data: { errors: [...] } }`.

### 29.8 Audio Upload Validation

Server-side MIME type check, file size check, duration validation via ffprobe.

### 29.9 Safe Logging

In production, logs must never include: passwords, JWT token values, raw cookies, API keys or secrets, raw audio file contents, full transcription texts, or full generated report texts. Use message IDs or truncated previews instead.

### 29.10 MongoDB Transactions

All multi-document write operations use Mongoose sessions with transactions. Pattern: `startSession → startTransaction → writes → commitTransaction → catch → abortTransaction → finally → endSession`.

### 29.11 Password Handling

Algorithm: `bcryptjs`. Salt rounds: 12. Plaintext passwords never compared — always use `User.comparePassword()`. Password field excluded from JSON serialization.

### 29.12 Graceful Shutdown

On `SIGINT`/`SIGTERM`: `server.close()` → cleanup temp audio files → `mongoose.connection.close()` → `process.exit(1)`. Force exit after 30 seconds if shutdown hangs.

---

## 30. New File Creation Rules

- Never write new files unless explicitly required by the phase.
- When creating new files, understand existing code conventions first.
- Mimic code style.
- Use existing libraries.
- Follow existing patterns.
- Never proactively create documentation files (`*.md`) or README files unless explicitly requested.
- Never add code explanation summaries unless requested.
- Never create placeholder, stub, or boilerplate files without explicit request.
- Verify a file does not already exist before creating it.
- After working on a file, just stop.

---

## 31. Validation And Audit

- Run `node --check` on all backend files after changes.
- Run `npx vite build` on client after changes with 0 errors.
- Always delete `dist/*` after checking build.
- Check every file for unused imports.
- Check every file for unused variables.
- Check every file for unused parameters.
- Check every file for missing JSDoc.
- No hardcoded magic values. Everything must be in `constants.js` or config.
- No deprecated MUI props.
- Check all new components.
- HTTP status codes imported from `httpStatus`. Never hardcode HTTP status codes.

Build commands:

| Environment    | Command                    | Description                    |
| -------------- | -------------------------- | ------------------------------ |
| Backend dev    | `npm run dev` (backend)    | nodemon server.js on port 4000 |
| Backend prod   | `npm start` (backend)      | Production start               |
| Backend check  | `node --check`             | Syntax validation              |
| Frontend dev   | `npm run dev` (client)     | Vite on port 3000              |
| Frontend build | `npm run build` (client)   | Vite production build          |
| Frontend lint  | `npx eslint src/` (client) | ESLint                         |
| Root dev       | `npm run dev` (root)       | Concurrently both              |

---

## 32. Git And Phase Protocol

### 32.1 High-Level Git Rules

- Every phase starts with a feature branch named `phase-N-description`.
- No direct commits to `main`.
- Phase protocol has 6 steps in order:
  1. Pre-Git: check status and create feature branch.
  2. Deep codebase analysis.
  3. Analysis of all prior phases.
  4. Phase execution and validation.
  5. User review and explicit approval.
  6. Post-Git: stage, commit, push, merge, and delete branch.
- Never proceed to Step 6 without explicit user approval.
- Commit messages: `feat: phase N description` for feature phases, `chore: phase N description` for hardening.
- No amending after push.
- Merge feature branch into `main` after approval.
- Delete both local and remote feature branches after verifying merge.

### 32.2 Step 1: Pre-Git Requirement Before Phase Execution

1. Check current state: `git status` to check current branch name, uncommitted changes, and untracked files. `git branch -vv` to display all local branches and tracking information.
2. Update remote information: `git fetch origin`.
3. Handle uncommitted changes: If uncommitted changes exist, stage, commit, push, merge, and delete feature branch. Verify branch names and merge targets.
4. Synchronize local with remote: If local branch is behind remote, `git pull origin <branch>`. If merge conflicts are detected, halt immediately and prompt user.
5. Create feature branch: `git checkout -b <descriptive-branch-name>`. Use clear, descriptive branch names matching phase number.
6. Verify clean state: `git status` to confirm clean working directory.

### 32.3 Step 2: Deep Codebase Analysis

Capture every detail of the codebase to ensure absolute alignment with requirements, designs, specifications, and constraints. Critical analysis areas: codebase deep dive, specification analysis, requirements, design, constraints, phases, analysis outcome.

### 32.4 Step 3: Analysis Of Previously Implemented All Phases

1. Identify all previous phases.
2. Analyze each previous phase.
3. Perform consistency verification.
4. Perform gap analysis.
5. Produce analysis outcome.

### 32.5 Step 4: Phase Execution Without Deviation

Implement the phase with absolute adherence to requirements, designs, specifications, and constraints. Mandatory compliance: requirements, design, code. Validation: validate implementation using documented rules. Each implementation phase must result in meaningful, visible changes.

### 32.6 Step 5: User Review And Feedback Integration

1. Present implementation.
2. Request functionality review.
3. Handle feedback: If user requests changes, apply required updates. If user approves without changes, confirm explicit approval and proceed to Step 6.
4. Verification before proceeding: Ensure user has explicitly stated approval. Confirm no additional changes are needed. Get clear go-ahead for Git operations.

### 32.7 Step 6: Post-Git Requirement After Phase Completion

1. Verify current state: `git status`, `git branch -vv`, `git fetch origin`.
2. Stage and commit changes: Review all changes with `git diff`. Stage with `git add .`. Verify with `git status`. Commit with descriptive message.
3. Push feature branch: `git push origin <feature-branch>`. Verify push success.
4. Checkout base branch: Checkout `main`, pull latest changes with `git pull origin main`.
5. Merge feature branch: `git merge <feature-branch>`. If merge conflicts occur, halt immediately and prompt user.
6. Push merged changes: `git push origin main`.
7. Delete feature branch locally and remotely: Verify merge success. `git branch -d <feature-branch>` local, `git push origin --delete <feature-branch>` remote.
8. Final synchronization verification: `git status` clean. `git branch -vv` shows main in sync. `git log --oneline -5` shows recent commit.
9. Cleanup verification: No orphaned branches, no uncommitted changes, correct branch.

### 32.8 Protocol Enforcement

This protocol is mandatory for every phase. No shortcuts allowed. No exceptions permitted. All six steps must be completed in order. Each step must be verified before proceeding to the next. User approval required before Step 6.

---

## 33. Decision Log (ADRs)

- **ADR-001:** Amharic-First Stack — Addis STT-only, user-selectable text generation across Addis/Gemini/Nvidia.
- **ADR-002:** Backend-Only Proxy for all providers.
- **ADR-003:** Status Machine (7 states, forward + explicit backward transitions).
- **ADR-004:** Dual-Token JWT httpOnly (access 15min + refresh 7d rotated).
- **ADR-005:** Unified ReportVersion (replaces separate GeneratedReport + ReportVersion).
- **ADR-006:** Client-Side Export Only for PDF/TXT/CSV/XLSX; Google Docs is backend-only.
- **ADR-007:** ffmpeg + wavSplitter Chunking Pipeline (accuracy-critical).
- **ADR-008:** Hybrid HTTP Clients (fetch for Addis, axios for others).
- **ADR-009:** Self-Service Registration (single user type, no RBAC).
- **ADR-010:** Multi-Branch Report Support.
- **ADR-011:** Ethiopian Calendar Display (numeric notation, English UI).
- **ADR-012:** MUI Community Edition Only (no licensed MUI X Pro).
- **ADR-013:** Graceful Shutdown Protocol.
- **ADR-014:** Provider Fallback Chain (Addis → Gemini → Nvidia).
- **ADR-015:** Two-Path Deletion Lifecycle (archive → permanent delete).
- **ADR-016:** Error Handling Strategy (CustomError class, global handler, 422 for validation).
- **ADR-017:** Transform Layer for API Responses (DTO mapping).
- **ADR-018:** Session-Based Transactions for All Write Operations.
- **ADR-019:** Safe Logging Policy (Winston, no console.log in backend).
- **ADR-020:** Frozen Config and Constants Objects.
- **ADR-021:** JSDoc as Documentation Standard.
- **ADR-022:** ES Modules Enforced Throughout (no CommonJS).
- **ADR-023:** MUI X Chat for Correction Interface.
- **ADR-024:** Google OAuth Stubbed Implementation.
- **ADR-025:** React Router Data Mode with Lazy Loading.
- **ADR-026:** Redux Toolkit with injectEndpoints Pattern.
- **ADR-027:** 8-Phase Implementation Plan (Foundation through Polish).
- **ADR-028:** Feature Branch Git Strategy per Phase.
- **ADR-029:** Rate Limiting Strategy (global, auth, AI tiers).
- **ADR-030:** Re-transcription and AI-Transcription-Correction Support.
- **ADR-031:** Provider-Neutral OAuth Service Architecture.
- **ADR-032:** Ethiopian Date Display Using Numeric Notation Only.
- **ADR-033:** Per-Component State Coverage (loading, error, empty, success).
- **ADR-034:** Client-Side Pagination for DataGrid (server-side via mongoose-paginate-v2).
- **ADR-035:** Fixed Middleware Stack Order (not reorderable).
- **ADR-036:** No Roles/RBAC — Single User Type.
- **ADR-037:** Mock Data Seeding Strategy (metadata-only audio clips).

---

## 34. Glossary

| Term                | Definition                                                                 |
| ------------------- | -------------------------------------------------------------------------- |
| Area Supervisor     | The primary user who visits restaurant branches and prepares daily reports |
| STT                 | Speech-to-text processing                                                  |
| MUI                 | Material UI component library                                              |
| RTK Query           | Redux Toolkit Query for data fetching                                      |
| RHF                 | React Hook Form                                                            |
| Noto Sans Ethiopic  | Font used for Amharic text rendering                                       |
| Addis               | The primary language model provider for speech-to-text and text generation |
| Gemini              | Alternative language model provider (Google)                               |
| Nvidia              | Alternative language model provider                                        |
| PCM                 | Pulse-code modulation audio format                                         |
| ffmpeg              | Multimedia framework used for audio conversion                             |
| wavSplitter         | Service that splits WAV files into 60-second chunks for STT                |
| Multer              | Node.js middleware for handling multipart/form-data file uploads           |
| httpOnly            | Cookie flag that prevents JavaScript access (prevents XSS token theft)     |
| baseQueryWithReauth | RTK Query wrapper that handles token refresh on 401 responses              |
| Two-Path Deletion   | Archive then permanent delete (user-initiated or after 30 days)            |

---

## 35. Archive, Delete, And Restore Lifecycle

### 35.1 Two-Path Deletion Model

Every archivable resource (Report (24.4), Branch (24.8)) follows the two-path deletion lifecycle. Archiving is always the first step; permanent deletion is only reachable from the archived state.

```
Path 1 (user-initiated):  Active → Archive → User clicks Delete → MuiConfirmDialog → Cascade hard-delete
Path 2 (automatic):       Active → Archive → 30-day wait → Auto cascade hard-delete
```

- **Archive** — the resource is marked `isArchived: true` and `archivedAt` is set to the current time. An archived resource is hidden from selection lists (branch picker, global search, default list queries). All list and selection endpoints default to returning only active resources (`isArchived: false`) unless the caller explicitly requests archived ones (the Reports list endpoint already supports an explicit `isArchived` query parameter (12.6)).
- **Restore** — the resource is put back into active use: `isArchived: false` and `archivedAt: null`. Restore is only possible while the resource is archived and before the 30-day deletion deadline (35.4) and (35.6). It cannot be invoked on an active resource.
- **Permanent delete** — a cascade hard-delete that removes the resource and all of its dependents (35.2). It is never reachable from the active state; it only runs after archive, through Path 1 or Path 2.

### 35.2 Archivable Resources And Cascade Scope

- **Report** cascade hard-delete removes, in one transaction:
  - the Report document itself (including its embedded `generatedHistory`)
  - its Transcription document (24.6)
  - its Audio documents (24.5) plus their physical files on disk (`filePath`)
  - all ChatConversation documents linked to the report (24.9)
- **Branch** cascade hard-delete removes only the Branch document (24.8). Reports that reference the branch are **never** deleted: branch data is embedded in each report's `branches[]` entries (branchId + name snapshot) and remains fully readable (12.6).
- No other model is archivable. A model becomes archivable only when it is explicitly added here, gains `isArchived` / `archivedAt` fields, a TTL-compatible `archivedAt` index, and the same lifecycle.

### 35.3 Endpoints

All endpoints below are authenticated, mounted under `/api/v1`, registered in `routes/index.js` (10.1), and take no request body.

- **Report**
  - `PATCH /api/v1/reports/:id/archive` → 200 `{ success: true, message: "Report archived", data: { report } }`
  - `PATCH /api/v1/reports/:id/restore` → 200 `{ success: true, message: "Report restored", data: { report } }`
  - `DELETE /api/v1/reports/:id` → 200 `{ success: true, message: "Report deleted", data: null }`
- **Branch**
  - `PATCH /api/v1/branches/:id/archive` → 200 `{ success: true, message: "Branch archived", data: { branch } }`
  - `PATCH /api/v1/branches/:id/restore` → 200 `{ success: true, message: "Branch restored", data: { branch } }`
  - `DELETE /api/v1/branches/:id` → 200 `{ success: true, message: "Branch deleted", data: null }`

### 35.4 Preconditions And Status Codes

Guards are checked in this order inside every archive / restore / delete controller:

1. Resource exists — else 404 `{ success: false, message: "Report not found" | "Branch not found", data: null }` (existing 404 wording (12.6)).
2. Lifecycle precondition (else 409 Conflict, `{ success: false, message, data: null }`):
   - Archive an already-archived resource → `"Report is already archived"` / `"Branch is already archived"`
   - Restore a non-archived resource → `"Report is not archived"` / `"Branch is not archived"`
   - Delete a non-archived resource → `"Archive the report before deleting"` / `"Archive the branch before deleting"`
   - Restore a resource whose 30-day deadline has already passed → `"Report can no longer be restored; the 30-day deletion window has passed"` / `"Branch can no longer be restored; the 30-day deletion window has passed"`
3. Proceed with the operation.

- 409 is already an established code in this project (duplicate key 11000, register duplicate email). Status codes are imported from `utils/httpStatus.js` by semantic name; add `CONFLICT: 409` there if it is not already present (10.6).
- Archived-state blocking for other operations is unchanged: operating on an archived resource that is not archive/restore/delete returns 403 (e.g. generate (12.6)).
- The automatic path deletes the same way as Path 1 but is triggered by the sweeper (35.6), never by the user.

### 35.5 Session And Transaction Requirements

- Archive, restore, and cascade delete always run inside a Mongoose session with a transaction: `startSession → startTransaction → writes → commitTransaction → catch → abortTransaction → finally → endSession` (10.3) and (29.10); ADR-018.
- Model hooks, instance methods, and static methods used by these flows accept a `session` option where relevant (10.11).
- Cascade delete executes inside a single transaction: all dependents (35.2) and the parent document are removed together — no partial deletes.
- Physical audio file removal (`fs.unlink` of each deleted `Audio.filePath`) runs **after** `commitTransaction`, as best-effort post-commit cleanup. File removal failures never roll back or block the transaction; they are logged via Winston (`logger.warn`) and retried by the orphan sweep (35.6). This is the only step of the flow that is not transactional.
- Read-only endpoints (get, list) do not need transactions (10.3).

### 35.6 Automatic 30-Day Path

- The deadline for every archived resource is `archivedAt + 30 days` (30 × 24 × 60 × 60 = 2592000 seconds, the same value used by the TTL indexes (24.4) and (24.8)).
- An app-level **cleanup sweeper** enforces the automatic path:
  - Runs periodically on an interval defined in `backend/utils/constants.js` (10.5) — no magic values; a per-hour run is the default.
  - Started alongside the HTTP server and stopped during graceful shutdown (10.8).
  - **Expired sweep** — finds resources with `isArchived: true` and `archivedAt` at or before the deadline, then performs the same cascade delete (35.5) for each one, each in its own transaction.
  - **Orphan sweep** — finds dependent documents whose report no longer exists (or whose report passed the deadline) and removes them: Audio documents + physical files, Transcription documents, ChatConversation documents. This covers the case where the TTL safety net fired before the sweeper.
- The TTL indexes on `archivedAt` (24.4 Report, 24.8 Branch) remain as the MongoDB-internal safety net: if the app is down when the deadline passes, MongoDB deletes the parent document automatically after 30 days. TTL deletion runs server-side, cannot cascade dependents, and cannot use a Mongoose session — it is the single documented exception to 35.5, and the orphan sweep exists precisely to clean up after it.
- When both mechanisms race, the sweeper wins: it deletes the parent inside a transaction first, so the TTL index never fires for that document.

### 35.7 Frontend Flows

The flows below apply to every surface that lists or shows an archivable resource: Reports list cards (12.6), Reports MuiDataGrid action column, and the Report Details page header (12.6).

- **Active resource** — shows Archive only (ArchiveIcon, warning, tooltip "Archive"):
  - Click → MuiConfirmDialog (title "Archive Report" / "Archive Branch", message "Are you sure you want to archive this report?" / "Are you sure you want to archive this branch?", confirmText "Archive") → confirm → dispatch `PATCH /:id/archive` → toast "Report archived" / "Branch archived" → the item moves to the archived state in the UI.
- **Archived resource** — shows Restore and Delete (Restore replaces Archive):
  - **Restore** — RestoreIcon (success), tooltip "Restore" → MuiConfirmDialog (title "Restore Report" / "Restore Branch", message "Restore this report to active use?" / "Restore this branch to active use?", confirmText "Restore") → confirm → dispatch `PATCH /:id/restore` → toast "Report restored" / "Branch restored" → the item returns to the active state in the UI.
  - **Delete** — DeleteIcon (error), tooltip "Delete" → MuiConfirmDialog (title "Delete Report" / "Delete Branch", message "This permanently deletes the report, its transcription, audio files, and chat history. This cannot be undone." / "This permanently deletes this branch. This cannot be undone.", confirmText "Delete", confirmColor "error") → confirm → dispatch `DELETE /:id` → toast "Report deleted" / "Branch deleted".
- On the Report Details page, after a successful delete the page navigates to `/reports` (existing behavior (12.6)); after a successful restore the header refreshes to the active state (Edit Report, Copy, Print, Archive reappear).
- On failure, the API message is toasted and the UI stays unchanged: 409 → the lifecycle message; 404 → "Report not found" / "Branch not found".
- Archived resources appear in lists only when the user explicitly filters for archived ones, and are shown with an "Archived" indicator.

### 35.8 Edge Cases

- **Restore after deadline but before the sweeper ran** — the resource still exists but restore returns 409 with the 30-day window message (35.4). The resource is deleted on the next sweeper run.
- **Double delete or delete/restore race with the sweeper** — the second request returns 404; the UI toasts "Report not found" / "Branch not found" and refreshes (existing 404 handling (12.6)).
- **Sweeper crash mid-transaction** — the transaction aborts, nothing is partially deleted, and the next run retries.
- **TTL fires before the sweeper** — the parent document is gone; the orphan sweep removes its dependents on the next run; any open UI shows the existing 404 behavior.
- **Physical file deletion fails after commit** — database state is already consistent; the failure is logged and the orphan sweep retries the file removal.
- **Archived branch** — reports keep their embedded branch snapshot and stay fully readable; the branch picker and selection lists simply stop offering the archived branch (35.1).

### 35.9 Consistency Notes

- ADR-015 (Two-Path Deletion Lifecycle) and ADR-018 (Session-Based Transactions) remain authoritative and are implemented by this section.
- The glossary term "Two-Path Deletion" is unchanged.
- The existing statements that `archivedAt` "is used by TTL index for automatic deletion after 30 days" (24.4 field notes) remain true — the TTL index is the safety net, the sweeper is the primary in-app mechanism (35.6).
