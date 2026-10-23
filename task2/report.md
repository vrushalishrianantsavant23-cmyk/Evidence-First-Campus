# Task 2 Report: Evidence-First Curriculum Proposal

> Student proposal, not an official syllabus revision. Every claim is tagged [OBSERVED], [ESTIMATE] or [ASSUMPTION].

## 1. Credit map by semester

Source: my own registered course path (codes, titles, credits only; no grades). Data file: `task2/data/courses.csv`. Proposal file: `task2/data/proposal.csv`. Interactive version: see `task2/calculator/`.

| Term | Credits before | Credits after | Note |
|------|---------------:|--------------:|------|
| Sem I | 20 | 20 | no change |
| Sem II | 24 | 24 | no change |
| Sem III | 24 | 24 | no change |
| Sem IV | 24 | 24 | no change |
| Sem V | 21 | 21 | DS303 (3) reduced, NEW1 (3) added in the same slot |
| Sem VI | 19 | 19 | ML302 (3) reduced, NEW2 (3) added in the same slot |
| Sem VII | 16 | 16 | no change in credits (content updates only) |
| IP-I (summer) | 3 | 3 | no change |
| Sem VIII (IP-II internship) | 15 | 15 | no change |
| **Total** | **166** | **166** | balanced |

- [OBSERVED] Credits per semester come from my own registered course path.
- [ASSUMPTION] The programme total of 166 is not yet verified against the official regulations. I have not found the official scheme document.
- [ASSUMPTION] EC308 Embedded Systems is counted as 3 credits (catalog value; my transcript row showed 0).
- [ASSUMPTION] Changed credits = credits of UPDATE courses + credits of REDUCE courses. An ADD that replaces a REDUCE in the same slot is counted once, through the REDUCE.
- [ESTIMATE] Changed credits = 6 (REDUCE) + 30 (UPDATE, 9 courses) = 36. 36 / 166 = 21.7%, inside the 20% to 25% target band (33.2 to 41.5 credits).

  
## 2. Reasons for the changes

| # | Change | Reason | Tag |
|---|--------|--------|-----|
| 1 | REDUCE DS303 Blockchain Technology (V, 3 cr) | None of the 3 job descriptions I collected mentions blockchain. | [OBSERVED] |
| 2 | REDUCE ML302 Fuzzy and Rough Set Theory (VI, 3 cr) | None of the 3 job descriptions mentions it. I read its full 34-lecture syllabus (fuzzy sets, fuzzy logic, rule systems, rough sets, reducts, decision tables). It moves to the elective pool, not deleted. | [OBSERVED] |
| 3 | ML302 overlap | Its automated-methods topics probably overlap with the ML and deep learning courses. I have not compared them topic by topic. | [ASSUMPTION] |
| 4 | ADD NEW1 AI Evaluation, Testing and Observability (V, 3 cr) | JD1 lists automated testing, AI evaluation and prompt engineering. | [OBSERVED] |
| 5 | ADD NEW2 MLOps and Deployment (VI, 3 cr) | JD1 lists APIs and microservices, JD2 lists Git and CI/CD, JD3 lists cloud and solution architecture. None of them uses the word "MLOps"; the course name is my own grouping. | [OBSERVED] for the skills, [ASSUMPTION] for the name |
| 6 | UPDATE CS206 DBMS, DS305 Data Wrangling and Visualization, DS307 Big Data Systems | JD2 lists SQL, ETL/ELT, data warehousing, data lakes, PySpark and Power BI. I have NOT checked these three syllabi, so I assume these topics are missing or thin. | [OBSERVED] for the JD, [ASSUMPTION] for the gap |
| 7 | UPDATE DS408 Generative AI (VII, 3 cr) | JD1 lists RAG, embeddings, tool calling and agent frameworks; JD3 lists LLM applications, RAG and AI agents. The course objectives I read cover VAE, GAN, autoregressive models, flows, diffusion, and training, fine-tuning, evaluating and deploying LLMs. I did not see RAG, embeddings, tool calling or agents in them. Only the objectives were checked, not the full syllabus. | [OBSERVED] |
| 8 | UPDATE CS205 Web-Enabled Technologies | JD1 lists APIs and microservices. I have NOT checked this syllabus, so I assume REST APIs and microservices are not covered in depth. | [OBSERVED] for the JD, [ASSUMPTION] for the gap |
| 9 | UPDATE DS202 Industry Coding Practice | JD1 lists automated testing; JD2 lists Git and CI/CD. I have NOT checked this syllabus. | [OBSERVED] for the JD, [ASSUMPTION] for the gap |
| 10 | UPDATE CS415 Ethical Hacking (shift towards data security, access control, governance) and CS307 Cloud Computing (add cloud AI and data services) | JD2 lists data security and governance and Azure data services; JD3 lists cloud. No JD mentions ethical hacking itself. I have NOT checked either syllabus. | [OBSERVED] for the JDs, [ASSUMPTION] for the gap |
| 11 | UPDATE SP301 Special Project, which becomes the Workflow Reliability capstone built from my Task 1 | This is a design choice, not a job-market finding. No JD asks for it directly, but JD1 (testing, evaluation) and JD2 (Git, CI/CD) both reward reliable, tested workflows. | [ASSUMPTION] |
| 12 | KEEP 130 credits untouched, including EC308 Embedded Systems, the 15-credit internship and zero-credit courses | EC308 is also listed under ECE, so changing it would involve two departments. The internship and zero-credit courses probably follow fixed regulations that I have not verified. | [ASSUMPTION] |

## 3. Comparison with three real job descriptions (all accessed 23 Oct 2026)

Full details and URLs: `task2/data/job_descriptions.csv`.

- JD1: AI Engineer, Enterprise Conversational Platform, HiringBlaze (likely an intermediary), 0-2 yrs, posted 2026-10-14.
- JD2: Junior Data Engineer, Crowe, Hyderabad, 0-2 yrs, posted 2026-10-22.
- JD3: GenAI Engineer (contract), Workiy, remote, experience not stated (so not clearly entry-level), opened 2026-09-29.

| Skill named in the JD | JD1 | JD2 | JD3 | Course affected in my proposal |
|-----------------------|:---:|:---:|:---:|--------------------------------|
| SQL, data warehousing, data lakes | - | yes | - | UPDATE CS206 DBMS, DS307 Big Data Systems |
| ETL/ELT, Power BI | - | yes | - | UPDATE DS305 Data Wrangling and Visualization |
| Python/PySpark | Python | yes | - | UPDATE DS307 Big Data Systems |
| APIs, microservices, API integration | yes | - | yes | UPDATE CS205 Web-Enabled Technologies |
| Git, CI/CD | - | yes | - | UPDATE DS202 Industry Coding Practice |
| Automated testing, AI evaluation | yes | - | - | ADD NEW1 AI Evaluation, Testing and Observability |
| RAG, embeddings | yes | - | RAG | UPDATE DS408 Generative AI |
| Tool calling, agents / agent frameworks | yes | - | yes | UPDATE DS408 Generative AI |
| Prompt engineering | yes | - | yes | NEW1 and DS408 |
| Cloud, solution architecture, Azure data services | - | Azure | yes | UPDATE CS307 Cloud Computing, ADD NEW2 MLOps and Deployment |
| Data security and governance | - | yes | - | UPDATE CS415 Ethical Hacking |

- [OBSERVED] The skills in this table are copied from the three job descriptions.
- [OBSERVED] No JD mentions blockchain or fuzzy/rough sets.
- [ESTIMATE] Three job descriptions are a very small sample. They cannot represent the whole job market. They are all 0-2 years or unstated experience, and JD3 is a contract role.
- [ASSUMPTION] Whether my current courses already cover a skill is NOT checked for 8 of the 9 UPDATE courses (syllabus_checked = no in `proposal.csv`).

## 4. Prerequisites

| New course | Sem | Prerequisites (course codes from my path) |
|------------|-----|-------------------------------------------|
| NEW1 AI Evaluation, Testing and Observability | V | DS304, DS202 |
| NEW2 MLOps and Deployment | VI | DS304, CS302 |

- [ASSUMPTION] I chose these prerequisites by judgement. I have not confirmed that DS304, DS202 and CS302 are completed before Sem V / Sem VI in the official scheme. This must be checked against the official regulations.
- [ASSUMPTION] The UPDATE courses keep their existing prerequisites.

## 5. Regulatory conditions and risks

- [ASSUMPTION] This is a student proposal. Any real change would need approval from the university's academic bodies (for example the Academic Council or Board of Studies). I have not found their exact process.
- [OBSERVED] I have NOT found the official regulations or scheme document, and the programme total of 166 credits is therefore not verified.
- [OBSERVED] Internship discrepancy (sources accessed 23 Oct 2026): the IFHE website says IP-I (2 months, compulsory) is in the summer after Semester II, while my transcript shows IP-I in the summer after Semester IV. The website also says IP-II (5.5 months) is in Sem VII or VIII, with a thesis stream as an alternative.
  - https://ifheindia.org/icfai-tech-school-hyderabad/icfaitech-internship
  - https://ifheindia.org/lp/icfaitech2025
- [ASSUMPTION] Internship and zero-credit courses follow fixed rules, so I keep them unchanged.
- [OBSERVED] EC308 Embedded Systems is also listed under ECE, so changing it would involve two departments. I keep it unchanged.
- [ASSUMPTION] Moving ML302 to the elective pool requires an elective pool to exist for my branch. I have not verified that.
- [ASSUMPTION] Summer terms are also used for clearing backlogs. I have not verified this in the regulations.
- [ASSUMPTION] New courses (NEW1, NEW2) need syllabus, faculty, lab resources and approval, none of which I have.
