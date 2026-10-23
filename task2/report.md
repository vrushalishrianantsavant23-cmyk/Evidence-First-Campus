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
