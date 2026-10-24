# Task 1 Test Results (synthetic cases)

All inputs are SYNTHETIC. No real notices, names or student data were used.

## Where the tests ran
- OBSERVED: 24 Oct 2026, GitHub Actions workflow "tests", run #14, commit 550f446 (message: "Revise Task 1 Evidence Log for SIS Notice Board").
- OBSERVED: the log printed Python 3.12.15, pytest 9.1.1, "collected 8 items" and "8 passed in 0.02s".
- Run page: https://github.com/vrushalishrianantsavant23-cmyk/Evidence-First-Campus/actions/runs/40079556691
- Code: `task1/simulator/notice_engine.py`. Tests: `task1/simulator/test_notice_engine.py`.
- An earlier run (6 tests, 6 passed, commit 962990e) is replaced by this one.

## Results (from the pytest log)

| # | Test name in the log | Case | Expected result (my design, see improved-process.md) | Result |
|---|----------------------|------|------------------------------------------------------|--------|
| 1 | test_1_normal | Normal | Delivered, then Acknowledged | PASSED |
| 2 | test_2_missing_information | Missing information | Rejected, reason names the missing field; resubmit with the field filled, then Delivered | PASSED |
| 3 | test_3_duplicate | Duplicate | Second copy Rejected, reason points to the first notice | PASSED |
| 4 | test_4_unauthorized_request | Unauthorized request | Student broadcast goes to PendingApproval, Rejected if admin declines; student messages ONE faculty instead, Delivered | PASSED |
| 5 | test_5_failed_step | Failed step | Failed, "check original notice"; admin or issuer reviews manually, then Delivered | PASSED |
| 6 | test_escalation_of_unacknowledged_important_notice | Extra: escalation | Important notice with no acknowledgement becomes Escalated | PASSED |
| 7 | test_7_correction_supersedes_old_notice | Extra: correction | A correction supersedes the old notice | PASSED |
| 8 | test_8_ack_count_does_not_double_count | Extra: acknowledgement count | The acknowledgement count does not double count | PASSED |

## What these results do and do not show
- OBSERVED: the engine behaves as I designed it for these 8 synthetic tests (8 passed).
- ASSUMPTION: this does not show that the design works inside the real college system. It was not tested with the college, staff or real notices.
- ASSUMPTION: the "failed step" in test 5 is modelled with a synthetic confidence number that I chose. No real OCR was run.
- The thresholds (for example confidence 0.6) and the escalation window are my own choices, not measured values.
- The escalation window is not simulated over time; the escalation function is called directly by the test.
