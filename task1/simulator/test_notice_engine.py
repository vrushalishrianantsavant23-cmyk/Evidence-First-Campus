from notice_engine import Engine


def test_1_normal():
    e = Engine()
    n = e.submit("faculty", "Exam schedule", "Sem VII exams start Monday", "sem7", important=True)
    assert n.status == "Delivered"
    e.acknowledge(n.id, "student_a")
    assert n.status == "Acknowledged"


def test_2_missing_information():
    e = Engine()
    n = e.submit("faculty", "", "Body only", "sem7")
    assert n.status == "Rejected"
    assert "title" in n.reason
    n2 = e.submit("faculty", "Fixed title", "Body only", "sem7")  # recovery
    assert n2.status == "Delivered"


def test_3_duplicate():
    e = Engine()
    first = e.submit("admin", "Holiday", "College closed Friday", "all")
    second = e.submit("admin", "Holiday", "College closed Friday", "all")
    assert first.status == "Delivered"
    assert second.status == "Rejected"
    assert second.reason == f"duplicate of notice {first.id}"


def test_4_unauthorized_request():
    e = Engine()
    n = e.submit("student", "Sell books", "Cheap books", "all")
    assert n.status == "PendingApproval"
    e.admin_decision(n.id, approve=False)
    assert n.status == "Rejected"
    # recovery: message to ONE faculty needs no approval
    m = e.submit("student", "Doubt", "Question about lab", "one:faculty_x")
    assert m.status == "Delivered"


def test_5_failed_step():
    e = Engine()
    n = e.submit("admin", "Scanned notice", "(blurry)", "all", ocr_confidence=0.3)
    assert n.status == "Failed"
    assert n.reason == "check original notice"
    e.manual_review(n.id, "Lab test moved to Tuesday")  # recovery
    assert n.status == "Delivered"


def test_escalation_of_unacknowledged_important_notice():
    e = Engine()
    n = e.submit("faculty", "Fee deadline", "Pay by Friday", "all", important=True)
    e.escalate_if_unacknowledged(n.id)
    assert n.status == "Escalated"
