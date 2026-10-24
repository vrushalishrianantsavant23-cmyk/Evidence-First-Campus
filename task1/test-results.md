# Task 1 Test Results (synthetic cases)

All inputs are [SYNTHETIC]. No real notices, names or student data were used.

## Where the tests ran
- [OBSERVED] 2026-10-24, GitHub Actions workflow "tests", commit 962990e (message: "Add GitHub Actions workflow for pytest tests").
- [OBSERVED] Environment printed in the log: Python 3.12.15, pytest 9.1.1, 6 items collected, "6 passed in 0.02s".
- Run page: https://github.com/vrushalishrianantsavant23-cmyk/Evidence-First-Campus/actions/runs/40066416492
- Code: `task1/simulator/notice_engine.py`. Tests: `task1/simulator/test_notice_engine.py`.

## Results

| # | Case | Expected result | Recovery tested | Result (from the log) |
|---|------|-----------------|-----------------|-----------------------|
| 1 | Normal | Delivered, then Acknowledged | none needed | PASSED |
| 2 | Missing information | Rejected, reason names the missing field | resubmit with the field filled, then Delivered | PASSED |
| 3 | Duplicate | Second copy Rejected, reason points to the first notice | none (no second copy shown) | PASSED |
| 4 | Unauthorized request | Student broadcast goes to PendingApproval, Rejected if admin does not approve | student messages ONE faculty instead, Delivered | PASSED |
| 5 | Failed step | Low OCR confidence gives Failed, "check original notice" | admin or issuer reviews manually, then Delivered | PASSED |
| extra | Escalation | Important notice with no acknowledgement becomes Escalated | admin follow-up | PASSED |

## What these results do and do not show
- [OBSERVED] The engine behaves as I designed it for these six synthetic cases.
- [ASSUMPTION] This does not show the design works inside the real college system. It was not tested with the college, staff or real notices.
- [ASSUMPTION] The OCR confidence value in case 5 is a number I set in the test. No real OCR was run in this test.
- The thresholds (for example OCR confidence 0.6) are my own choices, not measured values.
