# Task 1: Net Time Saved (model, all inputs are estimates)

Net time saved = gross time saved by students - issuer effort - support effort.
I measured no time data. Every time value below is an ESTIMATE or an ASSUMPTION, so I show a low, base and high scenario instead of one number.

## 1. What I observed and used
- E8 (ESTIMATE from observed dates): 3 to 5 notices per week, so N = 3, 4, 5.
- E9 (OBSERVED, one student, 23 rows): I had not opened 12 of 23 notices, so I opened about 11 of 23 (48 percent). I round this to q_now = 0.5. It is a weak number: the tick may not mean "read" (E16).
- Not collected: any measured minutes for reading, issuing or support (see "What I did not collect" in `evidence-log.md`).

## 2. Formula (per week)

Per student per week: saved = N x [ (q_now - p) x t_open - p x t_ack ]
- q_now: share of notices a student opens now (ESTIMATE 0.5).
- p: share a student still opens when priority, deadline and acknowledgement are visible in the list (ASSUMPTION).
- t_open: minutes to open and read one notice (ASSUMPTION).
- t_ack: minutes to press acknowledge on an opened notice (ASSUMPTION, 0.1).

Cohort gross saved = saved per student x S, with S = 100 students (ASSUMPTION; the real audience size is unknown).
Costs per week: issuer effort = N x t_issue (extra minutes to fill priority and deadline), plus fixed support effort (questions, escalation follow-up).
Net = cohort gross saved - issuer effort - support effort.

## 3. Inputs (all ASSUMPTION unless marked)

| Symbol | Meaning | Low | Base | High |
|--------|---------|----:|-----:|-----:|
| N | notices per week (ESTIMATE, E6 and E8) | 3 | 4 | 5 |
| S | students in the audience | 100 | 100 | 100 |
| q_now | share opened now (ESTIMATE, E9) | 0.5 | 0.5 | 0.5 |
| p | share still opened with the new design | 0.45 | 0.30 | 0.25 |
| t_open | minutes to read one notice | 1.0 | 1.5 | 2.0 |
| t_ack | minutes to acknowledge | 0.1 | 0.1 | 0.1 |
| t_issue | extra minutes per notice for the issuer | 2.0 | 1.0 | 0.5 |
| support | minutes per week of support effort | 30 | 20 | 10 |

## 4. Results (checked by hand twice)

Per notice per student: (q_now - p) x t_open - p x t_ack
- Low: (0.5 - 0.45) x 1.0 - 0.45 x 0.1 = 0.05 - 0.045 = 0.005 min
- Base: (0.5 - 0.30) x 1.5 - 0.30 x 0.1 = 0.30 - 0.03 = 0.27 min
- High: (0.5 - 0.25) x 2.0 - 0.25 x 0.1 = 0.50 - 0.025 = 0.475 min

| Scenario | Saved per student (min/week) | Gross saved, cohort of 100 (min/week) | Issuer effort | Support effort | NET, cohort (min/week) | NET per student (min/week) |
|----------|------:|------:|------:|------:|------:|------:|
| Low | 0.015 | 1.5 | 6.0 (3 x 2.0) | 30 | -34.5 | -0.345 |
| Base | 1.08 | 108 | 4.0 (4 x 1.0) | 20 | 84 | 0.84 |
| High | 2.375 | 237.5 | 2.5 (5 x 0.5) | 10 | 225 | 2.25 |

## 5. What this means (honestly)
- The saving per student is small: about 0 to 2.4 minutes per week.
- In the low scenario the NET is NEGATIVE (-34.5 min per week for the cohort): if students still open almost everything, the extra issuer and support effort is not paid back.
- The result is most sensitive to p and to the support minutes. These are the numbers I most need to measure.
- The main benefit of the design is probably not time. It is that important notices become visible and a sender can see an acknowledgement count. I did not measure that benefit and it is not in this calculation.
- Not counted: the effort to build and maintain the system, and the cost of a student missing an important notice.

## 6. Limits
- No measured data; all time values are my assumptions, so the table is a model, not a result about the real college.
- q_now comes from one student's 23 rows. It is not scaled to all students or all 809 notices.
- A better next step would be to time a few consenting students and issuers with real notices.
