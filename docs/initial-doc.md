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
          ...
        ]}
      ]},
      { path: '*', Component: NotFound },
    ]
  }
])
```

### 12.6 Page Components

Landing, Login, Register, Dashboard, BranchList, BranchForm, ReportList, ReportGrid, ReportCreate, ReportDetail, ReportReview, ReportCorrection, Profile, NotFound. All lazy-loaded via `React.lazy()`.

#### Landing

- Route: `{ index: true, Component: Landing }` — index route inside PublicLayout's children.
- Layout: PublicLayout (MuiAppbar fixed + scrollable content).
- Structure: Hero section only (Features section TBD). Centered max-width 1200px wrapper.
- Hero section: App logo/icon, headline "Build Better Reports", subheadline "Record, transcribe, and generate professional reports with AI", two CTA buttons — "Get Started" (contained, navigates to `/register`) and "Sign In" (outlined, navigates to `/login`).
- Hero headline responsive: `h3` on md+, `h4` on xs.
- Static page — no data fetching, no Redux. CTAs use `useNavigate()`. PublicRoute redirects authenticated users away.

#### Login

- Route: `{ path: 'login', Component: Login }` — under PublicLayout children.
- Layout: PublicLayout (MuiAppbar fixed + scrollable content). Centered card (`Paper elevation={3}`, `maxWidth: 420`).
- Card content: Logo/icon, "Sign In" title, Google OAuth button (outlined, Google icon, loading spinner, stubbed), "or" divider, email field (EmailIcon start adornment), password field (LockIcon start adornment, eye toggle), "Sign In" submit button (MuiButton contained, fullWidth, size="small", loading via isSubmitting), nav link to `/register`.
- RHF `useForm({ mode: 'onBlur' })`, `register` only. `useLoginMutation()` from RTK Query. On 422 → `setError`. On 401 → toast. On success → `reset()` + navigate to `/dashboard` or `location.state.from`.
- PublicRoute redirects authenticated users.
- Data flow: `POST /api/v1/auth/login`. Request body `{ email, password }`. Success 200 returns `{ success, message, data: { user: { _id, firstName, lastName, fullName (virtual), email, avatar, position } } }`. Sets httpOnly access (15m) + refresh (7d) cookies. 401 → toast, 422 → setError, 429 → toast.
- Google OAuth browser redirect: `http://localhost:4000/api/v1/auth/google` → consent → callback sets cookies → redirect to frontend → PublicRoute → `/dashboard`. Stubbed until credentials configured.

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

#### Dashboard

- Route: `{ path: 'dashboard', Component: Dashboard }` — first child under AppShell.
- Layout: AppShell. No Page Header.
- Structure:
  - Row 1: 4 stat cards (`Grid`, `size={{ xs: 12, sm: 6, md: 3 }}`), icon + value + label. Content TBD.
  - Row 2: Bar chart (`@mui/x-charts` BarChart, left) + Pie chart (PieChart, right). Content TBD.
  - Row 3: "Recent Activities" title + MuiDataGrid (server-side pagination, no action column). Content TBD.
- Auth strategy: `GET /api/v1/auth/me` on full page load populates Redux + localStorage. 401 → clear + redirect. SPA navigation reads Redux only — zero extra API calls.
- Setup: `React.lazy`, tree-shaken imports, `displayName="Dashboard"`.

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
- `MuiConfirmDialog`: Preset confirmation dialog built on MuiDialog. Props: `open`, `onClose`, `onConfirm`, `title`, `message`, `confirmText`, `cancelText`, `confirmColor`. Used by MuiDataGrid archive/delete flow and other confirm/dismiss scenarios.
- `MuiDataGrid`: Must have toolbar. Export selection required. Columns must be defined in `client/src/components/columns/*`. Action column includes tooltip and icon with proper color. Action column supports view, update, and archive. Archived item flow: archived -> MuiConfirmDialog -> delete -> update UI. Server-side pagination. Skeleton loading rows.
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
| GOOGLE_SERVICE_ACCOUNT_EMAIL       | No       | —                              | Required if Google Docs export enabled                  |
| GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY | No       | —                              | Required if Google Docs export enabled                  |

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

Reports should be exportable in multiple formats. PDF, TXT, CSV, and XLSX export is client-side only. Google Docs export is backend-only using a Google Service Account.

- **PDF:** `jspdf` with `jspdf-autotable`. A4 format. Noto Sans Ethiopic font for Amharic text. Section headers. Page numbers.
- **TXT:** Blob with UTF-8 encoding. Plain structure preserving report format.
- **CSV:** Blob with UTF-8 with BOM for Excel compatibility. Structured columns.
- **XLSX:** Multi-sheet workbook: content sheet (report), version history sheet (all versions with metadata), metadata sheet (provider, dates, status).
- **Google Docs:** Backend uses Google Docs API with a Google Service Account to create a document from the generated report content, set sharing to "Anyone with link can view", and return the URL. Frontend opens the URL in a new tab. User can edit freely in Google Docs.

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
