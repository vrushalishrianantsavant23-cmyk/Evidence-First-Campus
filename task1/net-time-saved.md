# Task 1: Net Time Saved (model with labelled estimates)

Everything in this file is a model. Only the numbers in section 1 were observed. All time values are [ASSUMPTION], so I show a low, base and high scenario instead of one confident number.

## 1. What I actually observed
- [OBSERVED] 2026-10-23: my own SIS Notice Board shows 808 notices in total. In the top 10 rows, 5 were viewed and 5 were not viewed.
- The SIS has no option to show 50 rows or filter by viewed status, so I could not collect a larger sample. [OBSERVED] 2026-10-24.
- [ESTIMATE] 5 of 10 gives 50% not viewed. With only 10 rows, a 95% Wilson interval is about 24% to 76%. This is far too wide to call it the real rate. I do NOT use it to scale up to the 808 notices.

## 2. Formula (per cohort per week)

Gross saving = (time per student now - time per student with the new design) x number of students
Net saving = gross saving - review effort - support effort

- Time now = N x t_open
- Time new = N x t_glance + N x p x t_open
- Review effort = N x t_review + N x f x t_fail
- Support effort = fixed minutes per week for student questions

## 3. Inputs (all [ASSUMPTION])

| Symbol | Meaning | Low | Base | High |
|--------|---------|----:|-----:|-----:|
| S | students in the audience | 100 | 100 | 100 |
| N | notices per week for that audience | 5 | 10 | 15 |
| t_open | minutes to open and read one notice now | 1.0 | 1.5 | 2.0 |
| t_glance | minutes to glance at a one-line summary | 0.25 | 0.25 | 0.25 |
| p | share of notices a student still opens fully | 0.6 | 0.3 | 0.2 |
| t_review | minutes for the issuer to check a summary | 1 | 1 | 1 |
| f | share of items that fail or are flagged | 0.1 | 0.1 | 0.1 |
| t_fail | minutes to handle one failed item by hand | 10 | 10 | 10 |
| support | minutes per week answering questions | 10 | 10 | 10 |

## 4. Results (calculated, checked with a short Python script)

| Scenario | Time now per student (min/week) | Time new per student | Gross saved per student | Gross saved per cohort | Review + support | NET saved per cohort (min/week) | NET per student (min/week) |
|----------|-------:|-------:|-------:|--------:|-------:|---------:|--------:|
| Low | 5.0 | 4.25 | 0.75 | 75 | 20 | 55 | 0.55 |
| Base | 15.0 | 7.0 | 8.0 | 800 | 30 | 770 | 7.7 |
| High | 30.0 | 9.75 | 20.25 | 2025 | 40 | 1985 | 19.85 |

Base example: now 10 x 1.5 = 15. New 10 x 0.25 + 10 x 0.3 x 1.5 = 2.5 + 4.5 = 7.0. Gross 8.0 x 100 = 800. Review 10 x 1 + 10 x 0.1 x 10 = 20, plus support 10 = 30. Net 800 - 30 = 770 min = 12.8 hours per week for the cohort.

## 5. What this means
- [ESTIMATE] Under all three scenarios net saving stays positive, because review and support effort is a small fixed cost.
- [ESTIMATE] The result is most sensitive to p (how often students still open the notice) and t_open. If students do not trust the summary and open everything, the saving shrinks towards zero.
- [ASSUMPTION] None of these inputs were measured. The next step would be to time real students reading real notices, with their consent.
- Not counted: time to build and maintain the system, OCR errors that mislead a student, and the cost of a missed notice.
- [ASSUMPTION] A summary is shown for every notice and the original is always one click away.
