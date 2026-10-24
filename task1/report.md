# Task 1 Report: SIS Notice Board, from notice to acknowledgement

Student work, not an official college process. Evidence IDs (E1 to E18) point to `evidence-log.md`.

## 1. Process studied
How a notice reaches students through the SIS Notice Board. I studied it from my own student login and from a few oral answers by a senior academic official (role only, no name recorded). I had no written permission. The official answered some questions voluntarily and declined the approval question (E14), which I respected.

## 1a. Data sources and permission
| Source | What it gave me | Permission status |
|--------|-----------------|-------------------|
| My own SIS student login | Counts, dates and viewed marks of my own account (E1 to E10) | My own account only; no other student's data |
| Oral answers by a senior academic official (role only, no name) | E11 to E14 | Given voluntarily and orally, not in writing; one question was declined and I respected that |
| Synthetic data | All test cases and all time-saving inputs | Made up by me for testing; not real notices or real people |
| Sem VII elective timetable and basket list, given to me by the college (date not recorded) | Which elective courses exist and which baskets they sit in; used only as context for Task 2 | Given to me by the college as a student. I did not get separate written permission to republish it, so I copied no faculty names and uploaded no image, only course titles |

Where I did not have permission or data (approval chain, sender side, time spent), I did not collect it. I used ASSUMPTION labels or synthetic cases instead.

## 2. Problem
- The board is a date-ordered list. There is no priority, category or deadline field (E4).
- The sender cannot see who viewed a notice, and there is no acknowledgement option on either side (E13, oral, not verified).
- A sent notice cannot be edited or deleted, so a correction is a separate new notice and the old one stays visible (E12, oral, not verified).
- The Viewed tick or cross is for my own account only (E3).

## 3. Scale
- OBSERVED: 809 notices on 24 Oct 2026 (E1). One new notice appeared between 23 and 24 Oct (E2).
- ESTIMATE: 3 to 5 notices per week (E6: about 3.0 recent, E8: about 4.8 overall).
- OBSERVED, small sample: on my own account, 12 of 23 sampled notices were not opened (52 percent; 95 percent Wilson interval about 33 to 71 percent). One student, not random, so I do NOT scale it up to 809 or to other students (E9).
- ASSUMPTION: a cross means I did not open the notice, not that I missed the content, because title and date are visible without opening (E16).

## 4. Current process
See `process-map.md`. The approval chain and the sender side are unknown to me (E14, E15, E18).

## 5. Proposed process
See `improved-process.md`.
- Inputs: title, body, audience, priority flag, deadline, optional supersedes link.
- Nine statuses: Draft, PendingApproval, Published, Delivered, Acknowledged, Escalated, Superseded, Rejected, Failed.
- Accountable owner: an assumed department office role. This is a proposal, because the real chain is unknown.
- Approval boundaries: faculty and admin roles publish; a student may message one faculty directly; a student broadcast needs admin approval.
- Fallback: manual review of the original notice; escalation if an important notice gets no acknowledgement in a set window.
- No editing: a correction supersedes the old notice. Senders see only an acknowledgement count, not names.

It is a proposal, not an approved college feature.

## 6. Tests
Five synthetic cases (normal, missing information, duplicate, unauthorized request, failed step) plus three extra tests (escalation, correction that supersedes, acknowledgement count without double counting). They are written in pytest and ran on GitHub Actions on 24 Oct 2026: 8 collected, 8 passed (run #14, commit 550f446). Details are in `test-results.md`.

They show that my engine behaves as I designed it. They do not show that the design works in the real college. All inputs are synthetic.

## 7. Net time saved
See `net-time-saved.md`. No time was measured, so every time value is an ESTIMATE or ASSUMPTION and I show low, base and high scenarios.

| Scenario | Net per student (min/week) | Net for an assumed cohort of 100 (min/week) |
|----------|---------------------------:|--------------------------------------------:|
| Low | -0.345 | -34.5 |
| Base | 0.84 | 84 |
| High | 2.25 | 225 |

The net saving is small, and it is negative in the low scenario. Time is probably not the main benefit. The likelier benefit is that important notices become visible and a sender can see an acknowledgement count, but I did not measure that.

## 8. Ideas suggested orally (future, not built)
A campus placement portal, OCR of notices into a dashboard, two-way messaging and a personalised chatbot were suggested orally. They are not approved college features.
- Built in the simulator: only the two-way messaging rule (a student can message one faculty directly; a broadcast needs approval).
- Not built and not investigated: placement portal, OCR, chatbot.
- Idea only, not investigated: a short extension of the same statuses to elective registration reminders.

## 9. Personal contribution
- I did myself: looked at the Notice Board on my own login and recorded the observations; asked the official questions and recorded the answers (one was declined and I did not press); ran the tests on GitHub Actions and read the result; decided what to include and how to label every claim.
- Claude (Anthropic) helped: drafted document wording, the Python engine and tests, and the calculations. I reviewed them and corrected claims that did not match my evidence.
- The AI-use record is in `task2/ai-use/ai-use-record.md`.

## 10. Limitations
- One student's view and a few oral statements that I could not verify; no written permission; no classmate data.
- The sample (23 rows) is small and not random.
- The approval chain and the sender side are unknown.
- All time numbers are estimates or assumptions, not measurements, and the cohort size of 100 is assumed.
- Tests use synthetic data. OCR, chatbot and placement portal are not built.
- Thresholds (confidence 0.6, reminder window) are my own choices.
