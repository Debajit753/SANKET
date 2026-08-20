/**
 * Demo data for the counsellor dashboard.
 * Institution: Assam Science and Technology University (ASTU), Guwahati.
 * Nothing here is real student data — z-scores are illustrative.
 */

export const INSTITUTION = {
  name: "Assam Science & Technology University",
  city: "Guwahati, Assam",
  unit: "Student Counselling Cell",
  year: "2026–27",
};

export const SECTIONS = [
  {
    id: "cse3a",
    label: "B.Tech CSE · 3rd Sem A",
    strength: 42,
    state: "active",
    quality: { verdict: "ok", detail: "0 reliability flags · attention checks passed" },
    nextWave: "6 Oct 2026",
    waves: [
      { tag: "Apr · Wave 1", n: 38, risk: 0, prot: 0 },
      { tag: "Jul · Wave 2", n: 38, risk: 1.4, prot: -1.1 },
      { tag: "Sep · Wave 3", n: 36, risk: 0.5, prot: 0.3 },
    ],
    intervention: { afterWave: 2, label: "Peer-led session · 12 Aug" },
    indices: [
      { name: "Access", z: 1.8, worseWhen: "high" },
      { name: "Norms", z: 1.2, worseWhen: "high" },
      { name: "Protection", z: -1.5, worseWhen: "low" },
      { name: "Wellbeing", z: -0.6, worseWhen: "low" },
    ],
    flags: [
      {
        icon: "trendUp",
        tone: "risk",
        title: "Perceived availability",
        detail: "+2.1σ against this section's own baseline — students report access getting easier.",
      },
      {
        icon: "trendDown",
        tone: "risk",
        title: "Perceived harm",
        detail: "−1.7σ. The earliest warning sign in the literature: it moves before use does.",
      },
      {
        icon: "users",
        tone: "warn",
        title: "“Is there an adult here you could talk to?”",
        detail: "71% → 44% since April. Help-seeking metrics below are suppressed by this.",
      },
    ],
    brief: {
      summary:
        "Availability is rising while perceived harm falls — the classic early-drift pattern. Trust in adults has dropped sharply, so start by making support visible before running any content session.",
      actions: [
        { text: "Norms-correction session — show the section the real peer numbers", done: true },
        { text: "Refusal-skills workshop for the whole section", done: false },
        { text: "Publish confidential drop-in counselling hours, announced in class", done: false },
      ],
    },
  },
  {
    id: "civil5b",
    label: "B.Tech Civil · 5th Sem B",
    strength: 40,
    state: "locked",
    responses: 9,
    windowNote: "Wave 2 open until 27 Aug — 6 more responses needed",
  },
  {
    id: "mech1c",
    label: "B.Tech Mechanical · 1st Sem C",
    strength: 44,
    state: "baseline",
    quality: { verdict: "ok", detail: "no reliability flags" },
    nextWave: "from 28 Sep 2026",
    waves: [{ tag: "Aug · Wave 1", n: 41, risk: 0, prot: 0 }],
    indices: [],
    flags: [],
  },
];

export const getSection = (id) => SECTIONS.find((s) => s.id === id) ?? SECTIONS[0];
