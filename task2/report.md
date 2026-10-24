# Task 2 Report: Curriculum audit and redesign (student proposal)

Student work for B.Tech Data Science and AI. It is not an official syllabus revision. Files: `data/courses.csv`, `data/proposal.csv`, `data/job_descriptions.csv`, `ai-use/ai-use-record.md`. Tool: [credit calculator](https://vrushalishrianantsavant23-cmyk.github.io/Evidence-First-Campus/task2/calculator/). No grades are used anywhere.

## 1. Credit map by semester (as registered, first attempt)
| Semester | Credits | Courses changed in the proposal |
|----------|--------:|---------------------------------|
| I | 20 | none |
| II | 24 | none |
| III | 24 | CS206 |
| IV | 24 | CS205, DS202 |
| V | 21 | DS303 (reduce), DS305, CS415 |
| VI | 19 | ML302 (reduce), DS307, SP301 |
| VII | 16 | CS307, DS408 |
| Semesters I to VII | 148 | |
| IP-I (summer) | 3 | none |
| IP-II (Sem VIII, my plan) | 15 | none |
| **Programme total** | **166** | |

Course credits come from the college SIS (student information system), which I read myself; no grades are used. The programme total of 166 is the sum of these credits, where IP-II (15 credits) is my planned Semester VIII internship. I did not read a separate regulations document. Semester totals do not change in the proposal, because every ADD replaces a REDUCE in the same slot.

## 2. The proposal in numbers
| Action | Courses | Credits |
|--------|---------|--------:|
| REDUCE (moved out of core) | DS303, ML302 | 6 |
| ADD (same slot, same credits) | NEW1 replaces DS303, NEW2 replaces ML302 | 6 |
| UPDATE (same credits, new content) | CS206, DS305, DS307, CS205, DS202, CS415, SP301, CS307, DS408 | 30 |
| KEEP | all other courses, including internships and zero-credit courses | 130 |

Counting rule (ASSUMPTION): changed credits = UPDATE credits + REDUCE credits. An ADD that replaces a REDUCE is counted once. So 30 + 6 = 36, and 36 / 166 = 21.7 percent, inside the 20 to 25 percent band. Other ways to count, shown so the choice is visible:
- REDUCE, ADD and UPDATE all counted separately: 42 credits = 25.3 percent.
- Only REDUCE and ADD counted: 12 credits = 7.2 percent.
- Without the DS303 change the changed credits would be 33 (19.9 percent, by my calculation), which is just outside the band. The calculator lets you untick any change.

Calculator check (OBSERVED, my own browser, 24 Oct 2026): the page showed total before 166, total after 166, Balanced Yes, changed credits 36, changed share 21.7 percent, and Inside 20 to 25 percent Yes.

## 3. Reasons for each change
Tags: OBSERVED = I saw it in a source. ASSUMPTION = my reading, not verified. JD1 to JD3 are in section 4. Only ML302 (full lecture plan) and DS408 (objectives only) had their syllabus checked. For the other 8 UPDATE courses I did not see the topic list, so what they lack today is an ASSUMPTION.

| # | Change | Reason | Tag |
|---|--------|--------|-----|
| 1 | UPDATE CS206 DBMS | JD2 names SQL, data warehousing and data lakes. Add warehousing, lakes and SQL optimisation. | JD: OBSERVED. Current gap: ASSUMPTION |
| 2 | UPDATE DS305 Data Wrangling and Visualization | JD2 names ETL/ELT. Add ETL and data quality checks. Power BI is only an advantage in JD2, so it is not required content. | JD: OBSERVED. Current gap: ASSUMPTION |
| 3 | UPDATE DS307 Big Data Systems | JD2 lists PySpark (preferred), data lakes and pipelines. | JD: OBSERVED. Current gap: ASSUMPTION |
| 4 | UPDATE CS205 Web-Enabled Technologies | JD1 lists APIs and microservices, JD3 lists API integration. Add REST APIs and microservices. | JD: OBSERVED. Current gap: ASSUMPTION |
| 5 | UPDATE DS202 Industry Coding Practice | JD1 lists automated testing, JD2 lists Git and CI/CD as preferred. Add Git and automated testing. | JD: OBSERVED. Current gap: ASSUMPTION |
| 6 | UPDATE DS408 Generative AI | JD1 and JD3 list RAG, embeddings, tool calling and agents. The objectives I saw cover VAE, GAN, autoregressive models, flows, diffusion, LLM training, fine-tuning, evaluation and deployment. I add RAG, embeddings, tool calling and agents, and reduce music and RL application coverage because ML303 covers RL. | JD and objectives: OBSERVED. ML303 overlap: ASSUMPTION |
| 7 | ADD NEW1 AI Evaluation, Testing and Observability (replaces DS303) | JD1 lists AI evaluation and automated testing. No course in my own path is named for it. | JD: OBSERVED. Gap: OBSERVED in my path only |
| 8 | ADD NEW2 MLOps and Deployment (replaces ML302) | JD1 (production microservices), JD2 (CI/CD preferred) and JD3 (cloud platforms) all touch deployment. | JD: OBSERVED. Treating them as one topic: ASSUMPTION |
| 9 | UPDATE CS307 Cloud Computing | JD2 names Azure data services, JD1 and JD3 mention cloud platforms. Add cloud AI and data services. | JD: OBSERVED. Current gap: ASSUMPTION |
| 10 | UPDATE CS415 Ethical Hacking (partial shift) | JD2 lists data security and governance. Shift part of the course toward data security and governance and keep the core labs. | JD: OBSERVED. Current gap: ASSUMPTION |
| 11 | REDUCE DS303 Blockchain Technology | Blockchain is absent from JD1 to JD3. This is weak evidence because there are only 3 job descriptions. | Absence: OBSERVED in 3 JDs. Conclusion: weak |
| 12 | REDUCE ML302 Fuzzy and Rough Set Theory | Absent from JD1 to JD3. Its lecture plan is numbered 1 to 34, while the catalog lists 42 sessions. Its automated-methods topics probably overlap DS304 and DS306. | Absence and numbering: OBSERVED. Overlap: ASSUMPTION |

SP301 Special Project is also an UPDATE: it becomes the Workflow Reliability capstone built from my Task 1 (section 8).

## 4. Job descriptions used (accessed 23 Oct 2026)
| ID | Role | Company | Posted | Experience | Link |
|----|------|---------|--------|------------|------|
| JD1 | AI Engineer, Enterprise Conversational Platform | HiringBlaze (likely an intermediary) | 2026-10-14 | 0 to 2 years | https://www.hirist.tech/j/ai-engineer-enterprise-conversational-platform-1678232 |
| JD2 | Junior Data Engineer | Crowe, Hyderabad | 2026-10-22 | 0 to 2 years | https://crowe.wd12.myworkdayjobs.com/en-US/external_careers/job/Hyderabad-Telangana-India/Junior-Data-Engineer_R-51712-1 |
| JD3 | GenAI Engineer (contract) | Workiy, remote | opened 2026-09-29 (an aggregator showed 6 Oct 2026) | not stated, so not clearly entry-level | https://workiy.zohorecruit.com/jobs/Workiy-Careers/574222000024500104 |

JD2 backup link: https://recentlypostedjobs.com/job/65377. In JD2, Power BI, PySpark, Git and CI/CD are preferred or an advantage, not required.

| Skill in the job post | In | Course in my proposal |
|-----------------------|----|-----------------------|
| SQL, data warehousing, data lakes | JD2 | CS206, DS307 |
| ETL/ELT, data quality | JD2 | DS305 |
| PySpark, data pipelines | JD1, JD2 | DS307 |
| Azure data services, cloud | JD1, JD2, JD3 | CS307, NEW2 |
| APIs, microservices, API integration | JD1, JD3 | CS205 |
| Git, CI/CD, automated testing | JD1, JD2 | DS202, NEW1, NEW2 |
| AI evaluation | JD1 | NEW1 |
| RAG, embeddings, tool calling, agents, LLM applications, prompt engineering | JD1, JD3 | DS408 |
| Data security and governance | JD2 | CS415 (partial) |
| Python | JD1, JD2 | existing courses; I did not check their syllabi (ASSUMPTION) |

Three job descriptions are a small sample. They show a pattern, not the whole job market.

## 5. Prerequisites for the new courses
| New course | Slot | Prerequisites | Why |
|------------|------|---------------|-----|
| NEW1 AI Evaluation, Testing and Observability | Sem V, 3 credits | DS304 Machine Learning, DS202 Industry Coding Practice (both Sem IV) | needs ML basics and testing practice first |
| NEW2 MLOps and Deployment | Sem VI, 3 credits | DS304 Machine Learning, CS302 Operating Systems (both Sem IV) | needs ML basics and system basics first |

## 6. Regulatory conditions and risks
- This is a student proposal. A real change would need Academic Council approval and would apply to a future batch, not to courses already completed.
- Internships (OBSERVED, sources accessed 23 Oct 2026: https://ifheindia.org/icfai-tech-school-hyderabad/icfaitech-internship and https://ifheindia.org/lp/icfaitech2025): the website says IP-I (2 months, compulsory) is in the summer after Semester II, while my transcript shows it after Semester IV. I did not resolve this. The website also says IP-II (5.5 months) is in Sem VII or VIII and that a thesis stream is an alternative. I leave internships unchanged (KEEP).
- Zero-credit courses (HS101, HS301) are likely untouchable and are KEEP.
- EC308 Embedded Systems is also listed under ECE, so changing it would involve two departments. It is KEEP.
- CS307 Cloud Computing and DS408 Generative AI appear in the Sem VII elective baskets in a timetable the college gave me. A change to them affects only students who choose them. I copied no faculty names from that document.
- Summer-term backlog rules are not verified.
- Each ADD replaces a REDUCE in the same slot, so every semester total stays the same.

## 7. AI-assisted checks (details in `ai-use/ai-use-record.md`)
Model for all five: Claude Sonnet 5.5. Date: 23 Oct 2026. The checking code was written with Claude's help. I ran it in Google Colab or SQLite Online and compared the results myself.

| # | Subject | Prompt (short) | How I verified | Result |
|---|---------|----------------|----------------|--------|
| 1 | Computer Networks | Split 192.168.10.0/24 into 6 subnets | Python `ipaddress` listed all 8 /27 subnets; I compared mask, first and last host; I checked by hand that 3 borrowed bits are needed | Correct |
| 2 | DBMS | Normalize an Orders table to 3NF, give SQLite CREATE statements | Ran the statements in SQLite Online, listed the 4 tables, checked each functional dependency by hand | Correct. My first run failed because I ran the script twice; fixed with DROP TABLE IF EXISTS |
| 3 | Algorithms | Solve T(n) = 3T(n/2) + n^2 with the Master theorem | Python recursion for n = 2^1 to 2^15: T(n)/n^2 settled near 4; I checked case 3 and the regularity condition (c = 3/4) by hand | Correct: Theta(n^2) |
| 4 | Operating Systems | Average waiting time for 4 processes under SRTF and Round Robin (q = 3) | Python simulation; compared per-process waiting times and both averages | Correct: SRTF 6.5, Round Robin 13.5 |
| 5 | Deep Learning | Gradients of one sigmoid neuron with MSE (x=2, w=0.5, b=0.1, y=1) | Central-difference numerical check for both MSE conventions | Correct for the 1/2 convention: dL/dw about -0.0936, dL/db about -0.0468 |

Limitations of these checks (from the record): the subnetting code assumes /27 from the start, so I checked the choice of /27 by hand. The Master theorem numeric test supports the growth rate but is not a proof, and it assumes T(1) = 1. Round Robin depends on a tie-break convention (I used "new arrival goes first"), and per-process waiting times can differ under the other convention. The sigmoid answer is correct only for the stated MSE convention, and the numeric check tests numbers, not the derivation steps. I tested one example per subject, and no foreign-key test data was inserted for DBMS.

## 8. Capstone built from Task 1 (proposal for SP301)
Name: Workflow Reliability capstone. SP301 Special Project (Sem VI, 3 credits) becomes a team project in which students take a small campus or office workflow and make it reliable. My Task 1 is the worked example. I do not know what SP301 contains today, so this is a proposal and not a description of the current course.

- Studio brief: pick one small workflow, map steps, handoffs, approvals and exceptions, and keep a dated evidence log tagged OBSERVED, ESTIMATE or ASSUMPTION.
- Build: a status engine with defined inputs, statuses, an accountable owner, approval boundaries and a fallback (the Task 1 `simulator/` is the template).
- Test: at least five synthetic cases (normal, missing information, duplicate, unauthorized request, failed step) with expected results and recovery, run automatically on GitHub Actions.
- Measure: a net-time-saved model with low, base and high scenarios, counting review and support effort, using only ESTIMATE or ASSUMPTION labels unless time is measured with consenting people.
- Rules: only permitted or synthetic data; no names, IDs, marks or private messages; anyone who declines is respected.
- Assessment: evidence log quality, design clarity, test results, honest limitations. A perfect system is not required.
- Prerequisites (ASSUMPTION): DS202 (Git and testing), CS205 (APIs), DS305 (data quality), all before Sem VI.
- Link to job descriptions: JD1 (testing and evaluation), JD2 (data quality checks and monitoring), JD3 (API integration).

## 9. Feedback
At the time of writing (24 Oct 2026) I have not received voluntary feedback on this proposal from a faculty member, graduate or senior. I will not write feedback that I did not receive. If any arrives before submission, it will be added here with the date and the role of the person, without a name.

## 10. Limitations
- - 9 of the 11 changed courses (the 8 UPDATE courses other than DS408, and DS303) were not checked against their syllabus; only ML302 and DS408 were. What they lack today is an ASSUMPTION.
- Course credits are from the college SIS. I did not read a separate regulations document, and the 15 credits of IP-II are my planned Semester VIII internship, not yet registered.
- Three job descriptions are a weak basis. JD3 does not state experience, and JD1 may come from an intermediary.
- Absence from three job posts is weak evidence for REDUCE.
- CS415 appears with an "Only CSE" label in an elective timetable I saw, yet it is on my own transcript. I did not resolve which branches take it.
- The counting rule for changed credits is my assumption. Other rules give 7.2 to 25.3 percent.
- The capstone is a proposal and has not been tried with students.
- No feedback has been received yet.
