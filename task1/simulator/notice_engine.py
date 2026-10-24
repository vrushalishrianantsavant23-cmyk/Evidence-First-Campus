"""Synthetic notice workflow engine. All data used with it is [SYNTHETIC].

Statuses: Draft, PendingApproval, Published, Delivered, Acknowledged,
Escalated, Superseded, Rejected, Failed.
"""
from dataclasses import dataclass, field

ALLOWED_ISSUERS = {"faculty", "admin"}
REQUIRED_FIELDS = ("title", "body", "audience")
OCR_MIN_CONFIDENCE = 0.6
LIVE_STATUSES = ("Delivered", "Acknowledged", "Escalated")


@dataclass
class Notice:
    id: int
    issuer: str
    title: str
    body: str
    audience: str
    important: bool = False
    status: str = "Draft"
    reason: str = ""
    supersedes: int = 0
    acked_by: set = field(default_factory=set)

    @property
    def ack_count(self):
        """Senders see only this number, never who acknowledged."""
        return len(self.acked_by)


class Engine:
    def __init__(self):
        self.notices = []

    def _new(self, issuer, title, body, audience, important):
        n = Notice(len(self.notices) + 1, issuer, title, body, audience, important)
        self.notices.append(n)
        return n

    def _find(self, notice_id):
        if 1 <= notice_id <= len(self.notices):
            return self.notices[notice_id - 1]
        return None

    def submit(self, issuer, title="", body="", audience="", important=False,
               ocr_confidence=None, supersedes=None):
        """Submit a notice or a message.

        ocr_confidence is set only for image notices (synthetic number).
        supersedes is the id of an earlier notice that this one corrects.
        """
        n = self._new(issuer, title, body, audience, important)

        missing = [f for f in REQUIRED_FIELDS if not getattr(n, f).strip()]
        if missing:
            n.status, n.reason = "Rejected", "missing: " + ", ".join(missing)
            return n

        for other in self.notices[:-1]:
            if (other.status not in ("Rejected", "Failed")
                    and (other.title, other.body, other.audience)
                    == (n.title, n.body, n.audience)):
                n.status, n.reason = "Rejected", f"duplicate of notice {other.id}"
                return n

        if ocr_confidence is not None and ocr_confidence < OCR_MIN_CONFIDENCE:
            n.status, n.reason = "Failed", "check original notice"
            return n

        if issuer in ALLOWED_ISSUERS:
            if supersedes is not None:
                old = self._find(supersedes)
                if old is None or old.status not in LIVE_STATUSES:
                    n.status = "Rejected"
                    n.reason = f"cannot supersede notice {supersedes}"
                    return n
                old.status, old.reason = "Superseded", f"replaced by notice {n.id}"
                n.supersedes = supersedes
            n.status = "Published"
        elif issuer == "student":
            if n.audience.startswith("one:"):
                n.status = "Published"  # message to one faculty, no approval
            else:
                n.status, n.reason = "PendingApproval", "broadcast needs admin approval"
                return n
        else:
            n.status, n.reason = "Rejected", "role not allowed"
            return n

        n.status = "Delivered"
        return n

    def admin_decision(self, notice_id, approve):
        n = self.notices[notice_id - 1]
        if n.status != "PendingApproval":
            return n
        if approve:
            n.status, n.reason = "Delivered", ""
        else:
            n.status, n.reason = "Rejected", "admin did not approve"
        return n

    def manual_review(self, notice_id, text):
        """Admin or issuer reads a Failed notice by hand."""
        n = self.notices[notice_id - 1]
        if n.status == "Failed":
            n.body, n.status, n.reason = text, "Delivered", "manually reviewed"
        return n

    def acknowledge(self, notice_id, student):
        n = self.notices[notice_id - 1]
        if n.status in ("Delivered", "Acknowledged"):
            n.acked_by.add(student)
            n.status = "Acknowledged"
        return n

    def escalate_if_unacknowledged(self, notice_id):
        n = self.notices[notice_id - 1]
        if n.important and n.status == "Delivered" and not n.acked_by:
            n.status, n.reason = "Escalated", "no acknowledgement in window"
        return n
