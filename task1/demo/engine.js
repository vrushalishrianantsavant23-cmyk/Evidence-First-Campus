const ALLOWED_ISSUERS = new Set(["faculty", "admin"]);
const REQUIRED_FIELDS = ["title", "body", "audience"];
const OCR_MIN_CONFIDENCE = 0.6;

function createEngine() {
  const notices = [];
  const api = {
    notices,
    submit(issuer, f) {
      f = Object.assign({ title: "", body: "", audience: "", important: false, ocrConfidence: null }, f || {});
      const n = { id: notices.length + 1, issuer, title: f.title, body: f.body, audience: f.audience,
        important: f.important, status: "Draft", reason: "", ackedBy: new Set() };
      notices.push(n);
      const missing = REQUIRED_FIELDS.filter(k => !String(n[k]).trim());
      if (missing.length) { n.status = "Rejected"; n.reason = "missing: " + missing.join(", "); return n; }
      for (const o of notices.slice(0, -1)) {
        if (o.status !== "Rejected" && o.status !== "Failed" &&
            o.title === n.title && o.body === n.body && o.audience === n.audience) {
          n.status = "Rejected"; n.reason = "duplicate of notice " + o.id; return n;
        }
      }
      if (f.ocrConfidence !== null && f.ocrConfidence < OCR_MIN_CONFIDENCE) {
        n.status = "Failed"; n.reason = "check original notice"; return n;
      }
      if (ALLOWED_ISSUERS.has(issuer)) { /* published */ }
      else if (issuer === "student") {
        if (!n.audience.startsWith("one:")) {
          n.status = "PendingApproval"; n.reason = "broadcast needs admin approval"; return n;
        }
      } else { n.status = "Rejected"; n.reason = "role not allowed"; return n; }
      n.status = "Delivered";
      return n;
    },
    get(id) { return notices[id - 1]; },
    adminDecision(id, approve) {
      const n = api.get(id);
      if (n.status !== "PendingApproval") return n;
      if (approve) { n.status = "Delivered"; n.reason = ""; }
      else { n.status = "Rejected"; n.reason = "admin did not approve"; }
      return n;
    },
    manualReview(id, text) {
      const n = api.get(id);
      if (n.status === "Failed") { n.body = text; n.status = "Delivered"; n.reason = "manually reviewed"; }
      return n;
    },
    acknowledge(id, student) {
      const n = api.get(id);
      if (n.status === "Delivered" || n.status === "Acknowledged") { n.ackedBy.add(student); n.status = "Acknowledged"; }
      return n;
    },
    escalate(id) {
      const n = api.get(id);
      if (n.important && n.status === "Delivered" && n.ackedBy.size === 0) {
        n.status = "Escalated"; n.reason = "no acknowledgement in window";
      }
      return n;
    }
  };
  return api;
}

function runFiveCases() {
  const out = [];
  const check = (name, expected, fn) => {
    let got, ok;
    try { got = fn(); ok = got === expected; } catch (e) { got = "error: " + e.message; ok = false; }
    out.push({ name, expected, got, ok });
  };
  check("1 Normal", "Acknowledged", () => {
    const e = createEngine(); const n = e.submit("faculty", { title: "Exam", body: "Starts Monday", audience: "sem7", important: true });
    e.acknowledge(n.id, "s1"); return n.status; });
  check("2 Missing information", "Rejected: missing: title", () => {
    const e = createEngine(); const n = e.submit("faculty", { body: "Body", audience: "sem7" });
    return n.status + ": " + n.reason; });
  check("2b Recovery (resubmit)", "Delivered", () => {
    const e = createEngine(); e.submit("faculty", { body: "Body", audience: "sem7" });
    return e.submit("faculty", { title: "T", body: "Body", audience: "sem7" }).status; });
  check("3 Duplicate", "Rejected: duplicate of notice 1", () => {
    const e = createEngine(); const f = { title: "Holiday", body: "Closed", audience: "all" };
    e.submit("admin", f); const n = e.submit("admin", f); return n.status + ": " + n.reason; });
  check("4 Unauthorized broadcast", "Rejected", () => {
    const e = createEngine(); const n = e.submit("student", { title: "Sell", body: "Books", audience: "all" });
    if (n.status !== "PendingApproval") return n.status; e.adminDecision(n.id, false); return n.status; });
  check("4b Recovery (message one faculty)", "Delivered", () => {
    const e = createEngine(); return e.submit("student", { title: "Doubt", body: "Lab question", audience: "one:faculty_x" }).status; });
  check("5 Failed step (blurry OCR)", "Failed: check original notice", () => {
    const e = createEngine(); const n = e.submit("admin", { title: "Scan", body: "x", audience: "all", ocrConfidence: 0.3 });
    return n.status + ": " + n.reason; });
  check("5b Recovery (manual review)", "Delivered", () => {
    const e = createEngine(); const n = e.submit("admin", { title: "Scan", body: "x", audience: "all", ocrConfidence: 0.3 });
    return e.manualReview(n.id, "Lab test moved").status; });
  check("Escalation", "Escalated", () => {
    const e = createEngine(); const n = e.submit("faculty", { title: "Fee", body: "Pay", audience: "all", important: true });
    return e.escalate(n.id).status; });
  return out;
}

const MONTHS = "Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec";
const DAYS = "Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday";
const TAG_RULES = [
  [/exam|timetable/i, "Exam"], [/fee|payment/i, "Fee"], [/deadline|last date|closes|register by/i, "Deadline"],
  [/holiday|closed/i, "Holiday"], [/\blab\b/i, "Lab"], [/placement|interview|company/i, "Placement"],
  [/registration|elective/i, "Registration"], [/project|review/i, "Project"], [/library/i, "Library"]
];
function keyPoints(text) {
  const dateRe = new RegExp("\\b(\\d{1,2}\\s?(?:" + MONTHS + ")[a-z]*|" + DAYS + ")\\b", "gi");
  const dates = [...new Set((text.match(dateRe) || []).map(s => s.trim()))];
  const tags = TAG_RULES.filter(([re]) => re.test(text)).map(([, t]) => t);
  const first = (text.split(/(?<=[.!?])\s+/)[0] || "").trim();
  return { summary: first, dates, tags };
}

const STOP = new Set("the is are when what a an of for to in on my me do i there any about how can where which who be it and or at this that please tell".split(" "));
function tokens(s) { return (s.toLowerCase().match(/[a-z0-9]+/g) || []).filter(w => !STOP.has(w)); }
function stem(w) { return w.replace(/(ing|es|s)$/, ""); }
function answer(question, notices) {
  const q = tokens(question).map(stem);
  let best = null, bestScore = 0;
  for (const n of notices) {
    if (n.status === "Rejected" || n.status === "Failed") continue;
    const kp = keyPoints(n.title + ". " + n.body);
    const hay = new Set(tokens(n.title + " " + n.body + " " + kp.tags.join(" ")).map(stem));
    const titleSet = new Set(tokens(n.title).map(stem));
    const score = q.reduce((s, w) => s + (titleSet.has(w) ? 2 : hay.has(w) ? 1 : 0), 0);
    if (score > bestScore) { bestScore = score; best = n; }
  }
  if (!best || bestScore < 1) return { found: false, text: "I do not know. I only answer from the notices on this page. Please read the original notice or ask the department admin." };
  const kp = keyPoints(best.body);
  return { found: true, id: best.id, text: "Notice " + best.id + " (" + best.title + "): " + kp.summary + (kp.dates.length ? " Dates: " + kp.dates.join(", ") + "." : "") };
}

const COURSES = {
  CS206: "DBMS (UPDATE)", DS305: "Data Wrangling and Visualization (UPDATE)", DS307: "Big Data Systems (UPDATE)",
  CS205: "Web-Enabled Technologies (UPDATE)", DS202: "Industry Coding Practice (UPDATE)", CS415: "Ethical Hacking (UPDATE)",
  CS307: "Cloud Computing (UPDATE)", DS408: "Generative AI (UPDATE)", NEW1: "AI Evaluation, Testing and Observability (ADD)",
  NEW2: "MLOps and Deployment (ADD)"
};
const SKILL_MAP = {
  "SQL": ["CS206"], "Data warehousing": ["CS206", "DS307"], "Data lakes": ["CS206", "DS307"], "ETL/ELT": ["DS305"],
  "Power BI": ["DS305"], "PySpark": ["DS307"], "Data pipelines": ["DS307"], "APIs": ["CS205"], "API integration": ["CS205"],
  "Microservices": ["CS205"], "Git": ["DS202"], "CI/CD": ["DS202"], "Automated testing": ["DS202", "NEW1"],
  "AI evaluation": ["NEW1"], "Prompt engineering": ["NEW1", "DS408"], "RAG": ["DS408"], "Embeddings": ["DS408"],
  "Tool calling": ["DS408"], "Agent frameworks": ["DS408"], "AI agents": ["DS408"], "LLM applications": ["DS408"],
  "Claude API": ["DS408"], "Cloud": ["CS307", "NEW2"], "Azure data services": ["CS307"], "Solution architecture": ["NEW2"],
  "Data security and governance": ["CS415"], "Python": []
};
const JOBS = [
  { id: "JD1", role: "AI Engineer, Enterprise Conversational Platform", company: "HiringBlaze (likely an intermediary)", posted: "2026-10-14",
    url: "https://www.hirist.tech/j/ai-engineer-enterprise-conversational-platform-1678232",
    skills: ["Python", "APIs", "Data pipelines", "Microservices", "RAG", "Embeddings", "Tool calling", "Agent frameworks", "Automated testing", "Prompt engineering", "AI evaluation"] },
  { id: "JD2", role: "Junior Data Engineer", company: "Crowe, Hyderabad", posted: "2026-10-22",
    url: "https://crowe.wd12.myworkdayjobs.com/en-US/external_careers/job/Hyderabad-Telangana-India/Junior-Data-Engineer_R-51712-1",
    skills: ["SQL", "ETL/ELT", "Data warehousing", "Data lakes", "Azure data services", "Python", "PySpark", "Power BI", "Data security and governance", "Git", "CI/CD"] },
  { id: "JD3", role: "GenAI Engineer (contract)", company: "Workiy, remote", posted: "2026-09-29",
    url: "https://workiy.zohorecruit.com/jobs/Workiy-Careers/574222000024500104",
    skills: ["LLM applications", "Claude API", "Prompt engineering", "RAG", "AI agents", "API integration", "Cloud", "Solution architecture"] }
];
function matchJob(job) {
  const rows = job.skills.map(s => ({ skill: s, courses: (SKILL_MAP[s] || []) }));
  const mapped = rows.filter(r => r.courses.length).length;
  return { rows, mapped, total: rows.length, pct: Math.round(100 * mapped / rows.length) };
}

const ALLOWED_NEXT = {
  Applied: ["Shortlisted", "Rejected"], Shortlisted: ["Offered", "Rejected"],
  Offered: ["Accepted", "Declined"], Accepted: [], Declined: [], Rejected: []
};
function moveApplication(app, next) {
  if (!(ALLOWED_NEXT[app.status] || []).includes(next))
    return { ok: false, message: "Blocked: " + app.status + " cannot go directly to " + next };
  app.status = next; return { ok: true, message: "Moved to " + next };
}
