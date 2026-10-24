# Task 1: Improved Process Design (proposal)

Status: [PROPOSAL] designed by me. Not approved by or tested with the college. All data in tests is [SYNTHETIC].

## 1. Inputs

| Input | Required | Note |
|-------|----------|------|
| Issuer role (not a name) | yes | must be on an allowed-roles list |
| Title and body text, or notice image | yes | image goes through OCR (section 6) |
| Audience (all, a programme/semester, or one faculty/student) | yes | |
| Deadline or expiry date | for action notices | |
| Importance (normal / important) | yes | |

## 2. Statuses

Draft -> PendingApproval -> Published -> Delivered -> Acknowledged

Side exits: Rejected, Withdrawn, Escalated, Failed.

- Escalated: an important notice is still not acknowledged after the reminder window.
- Failed: a step (for example OCR or delivery) did not work; the item goes to manual handling.

## 3. Accountable owner

| Item | Accountable owner (role) |
|------|--------------------------|
| A published notice and its correctness | The issuing role |
| Approval of broadcast notices | Department admin role |
| Delivery and status tracking | The SIS notice module (system) |
| Escalation follow-up | Department admin role |

[ASSUMPTION] These roles exist in the college. Not verified.

## 4. Approval boundaries

- A student can send a message to ONE faculty: no approval needed.
- A student message to EVERYONE (broadcast) needs PendingApproval by the admin role first.
- A student cannot publish a notice. Only allowed issuer roles can.
- A notice with a mistake can be Withdrawn only by its issuer or the admin role.
- OCR output is a helper only. The original image is always kept and linked.

## 5. Fallback

- If OCR confidence is low or OCR fails: status Failed, show "check original notice", and an admin or the issuer reads it manually.
- If delivery fails: retry once, then Failed and manual follow-up by the admin role.
- If an important notice is not acknowledged within the reminder window: Escalated to the admin role.

## 6. Features (scope)

| Feature | Plan |
|---------|------|
| Status engine and 5 tests | built and tested (Python, pytest) |
| Two-way messaging (to one faculty / broadcast with approval) | built in the same engine |
| OCR from a notice image to a dashboard summary | small prototype on a synthetic notice image |
| Chatbot | basic rule-based FAQ on synthetic notices; says "I do not know" when unsure |
| Placement portal | synthetic prototype using the same statuses (Applied, Shortlisted, Offered, Declined); not investigated at the college |

## 7. Five synthetic test cases (expected results and recovery)

| # | Case | Input (synthetic) | Expected result | Recovery |
|---|------|-------------------|-----------------|----------|
| 1 | Normal | Allowed issuer role posts a complete notice to a semester | Published, Delivered, then Acknowledged by students | none needed |
| 2 | Missing information | Notice with no audience or no title | Rejected with a message naming the missing field | issuer fills the field and resubmits |
| 3 | Duplicate | Same title, body and audience posted twice | Second one blocked as duplicate, links to the first | issuer is told, no second copy shown |
| 4 | Unauthorized request | A student tries to broadcast to everyone | Not published; goes to PendingApproval, and is Rejected if the admin does not approve | student can send the message to one faculty instead |
| 5 | Failed step | OCR on a blurry notice image fails or has low confidence | Failed, shows "check original notice" | admin or issuer reads the notice manually |

## 8. Net time saved (method, numbers added after the simulator)

Net time saved per student per week = (time saved by status view, summary and reminders) - (time to review OCR/summary output) - (support effort for failed or flagged items).

All time values will be labelled [ESTIMATE] or [ASSUMPTION]. See `net-time-saved.md`.
