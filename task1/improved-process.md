# Task 1: Improved Process Design (PROPOSAL)

Status: this is my proposal. It is not approved by or tested with the college. The real approval chain is unknown to me (E14, E18), so the roles below are ASSUMPTIONS. All test data is synthetic.

## 1. Problem it answers
From `evidence-log.md`: the Notice Board is a date-ordered list with no priority, category or deadline (E4); the sender cannot see who viewed or acknowledged a notice (E13); a notice cannot be edited, so a correction is a separate new notice (E12); about 3 to 5 notices arrive per week (E6, E8); and on my own account 12 of 23 sampled notices were not opened (E9, small sample, one student).

## 2. Inputs for every notice

| Input | Required | Note |
|-------|----------|------|
| Issuer role (not a name) | yes | must be an allowed role |
| Title | yes | |
| Body | yes | |
| Audience (all, a programme or semester, or one faculty) | yes | |
| Priority flag (normal or important) | yes | |
| Deadline or expiry date | for notices that need action | |
| Supersedes link (id of an earlier notice) | optional | used for corrections |

## 3. Statuses

| Status | Meaning | Set by |
|--------|---------|--------|
| Draft | issuer is composing | issuer |
| PendingApproval | a student broadcast waits for an admin decision | system |
| Published | passed the checks, being sent | system |
| Delivered | visible to the audience | system |
| Acknowledged | at least one student acknowledged it | system (count only) |
| Escalated | important notice with no acknowledgement in the reminder window | system, then admin follows up |
| Superseded | replaced by a correction (the old notice stays visible but marked) | system |
| Rejected | missing information, duplicate, role not allowed, or admin said no | system or admin |
| Failed | an automatic step failed; goes to manual review | system |

Main path: Draft, Published, Delivered, Acknowledged. Side exits: PendingApproval, Escalated, Superseded, Rejected, Failed.

## 4. Accountable owner (ASSUMPTION, marked as proposal)

| Item | Accountable owner |
|------|-------------------|
| Correctness of a notice | the issuing role (faculty or admin) |
| Approval of student broadcasts | an admin role of the department office |
| Follow-up on escalated notices | the same admin role |
| Delivery and counts | the SIS notice module (system) |

## 5. Approval boundaries
- Faculty and admin roles can publish a notice.
- A student can message ONE faculty directly with no approval.
- A student broadcast to many people needs admin approval first (PendingApproval).
- A student cannot publish a notice or supersede one.
- A notice is never edited. A correction is a new notice that supersedes the old one.
- Acknowledgement shows only a COUNT to the sender, not names.

## 6. Fallback
- If an automatic step fails (Failed): the system shows "check original notice" and an admin or the issuer reads the original manually.
- If an important notice has no acknowledgement in the reminder window: Escalated to the admin role.
- If the new module is unavailable: the existing Notice Board keeps working as today, because the proposal runs alongside it and does not replace it (ASSUMPTION).

## 7. Five synthetic test cases (expected result and recovery)

| # | Case | Synthetic input | Expected result | Recovery | Test |
|---|------|-----------------|-----------------|----------|------|
| 1 | Normal | faculty posts a complete notice | Delivered, then Acknowledged | none needed | test_1_normal |
| 2 | Missing information | notice with an empty title | Rejected, reason names the title | issuer fills it and resubmits, Delivered | test_2_missing_information |
| 3 | Duplicate | same title, body and audience posted twice | second one Rejected, reason points to the first | none, no second copy shown | test_3_duplicate |
| 4 | Unauthorized request | a student broadcasts to everyone | PendingApproval, then Rejected when admin declines | student messages one faculty instead, Delivered | test_4_unauthorized_request |
| 5 | Failed step | an automatic step fails (modelled by a synthetic confidence 0.3, below my chosen threshold 0.6) | Failed, "check original notice" | admin or issuer reviews manually, Delivered | test_5_failed_step |

Extra tests: escalation of an unacknowledged important notice, a correction that supersedes an old notice (and a bad supersede id is rejected), and an acknowledgement count that does not double count.

## 8. What is built and what is not

| Item | Status |
|------|--------|
| Status engine in Python with 8 pytest tests | written (code in `simulator/`); run results are in `test-results.md` |
| Two-way messaging (student to one faculty; broadcast needs approval) | built in the same engine, covered by test 4 |
| Net time saved model | calculated in `net-time-saved.md`, all inputs are estimates |
| OCR of notice images | NOT built. The failed-step test uses a made-up number only |
| Chatbot, placement portal, dashboard | NOT built, NOT investigated. Suggested orally by faculty (see evidence log). Future ideas only |
| Mockup | not done (optional) |

## 9. Short extension: elective registration reminders (idea, not investigated)
The same statuses and acknowledgement count could be used for a registration deadline notice. I did not investigate how registration works or who owns it. This is an idea only.

## 10. Known limits of the engine
- The escalation window is not simulated; the function is called by hand.
- Any allowed issuer can supersede any live notice. The engine does not check that it is the original issuer.
- To avoid double counting, the engine keeps synthetic student ids inside a notice. The design only SHOWS a count to senders.
- Thresholds (confidence 0.6, reminder window) are my own choices, not measured values.
