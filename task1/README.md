# Task 1: SIS Notice Board workflow

Student work, not an official college process. Main page: [root README](../README.md).

**Process studied:** how a notice reaches students through the SIS Notice Board, from my own student login, a few oral answers by a senior academic official (role only, no name) and synthetic test data. No written permission was received; the official declined to explain how notices are created and approved, and I did not press.

## Files

| File | What it holds |
|------|---------------|
| [`report.md`](report.md) | The full Task 1 report: problem, scale, proposal, tests, net time saved, limitations |
| [`evidence-log.md`](evidence-log.md) | Dated evidence E1 to E18, each labelled OBSERVED, ESTIMATE or ASSUMPTION |
| [`process-map.md`](process-map.md) | Current process: steps, handoffs, approvals, exceptions (unknowns marked) |
| [`improved-process.md`](improved-process.md) | Proposed process: inputs, statuses, accountable owner, approval boundaries, fallback |
| [`test-results.md`](test-results.md) | The five synthetic cases with expected results and recovery |
| [`net-time-saved.md`](net-time-saved.md) | Net time saved after review and support effort (low / base / high) |
| [`simulator/`](simulator/) | `notice_engine.py` and `test_notice_engine.py`: 8 pytest tests, all data synthetic |

## Key numbers

| Number | Meaning |
|--------|---------|
| 809 | Notices on the board on 24 Oct 2026 (OBSERVED, my account) |
| 3 to 5 per week | Estimated notices posted per week |
| 12 of 23 | Sampled notices not opened in my own account (one student, not random, NOT scaled up) |
| 8 passed | pytest on GitHub Actions, run #14, commit 550f446, 24 Oct 2026 |
| -0.345 / 0.84 / 2.25 | Net minutes saved per student per week (low / base / high); a model, not measured |

## Limitations

- No written permission; only my own SIS account, oral statements by a senior academic official and synthetic data. The approval chain and the sender side are not mapped.
- The 23-notice sample is one student and not random; it is not scaled to 809. Time numbers are estimates (cohort of 100 assumed).
- Tests are synthetic and never ran against the real SIS (no permission). Escalation has no clock; the 0.6 confidence threshold is my own choice.
- OCR, chatbot and placement portal are NOT built; they are future work only. The elective timetable was given to me by the college; I have no permission to republish it, so I copied no names.

Full list: [`report.md`](report.md) section 10.
