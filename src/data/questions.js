/**
 * The instrument: 10 fixed core items (asked every wave — these are what we trend)
 * + 5 rotating items (Module A · environment & access).
 *
 * Not one question asks "do you use". Every item is about the environment, peers,
 * or the respondent's own confidence — so a student can answer all fifteen
 * honestly and admit to nothing.
 *
 * NOTE: this is a hackathon draft assembled from established constructs.
 * It is NOT a validated psychometric scale.
 */

export const QUESTIONS = [
  // ---------- core (C1–C10) ----------
  {
    id: "C1",
    core: true,
    index: "Access",
    text: "If someone your age around here wanted to get tobacco, alcohol or something else, how easy would it be?",
    options: ["Very hard", "Hard", "Not sure", "Easy", "Very easy"],
  },
  {
    id: "C2",
    core: true,
    index: "Norms",
    text: "Out of 10 students your age around you, how many do you think have ever tried something?",
    options: ["None", "1–2", "3–4", "5–6", "7 or more"],
  },
  {
    id: "C3",
    core: true,
    index: "Norms",
    text: "If someone in your friend group tried something, how would the others react?",
    options: ["Strongly disapprove", "Disapprove", "Say nothing", "Be okay with it", "Would not care at all"],
  },
  {
    id: "C4",
    core: true,
    index: "Protection",
    text: "If a friend you really liked offered you something, how sure are you that you could say no?",
    options: ["Not sure at all", "A little sure", "Somewhat sure", "Quite sure", "Completely sure"],
  },
  {
    id: "C5",
    core: true,
    index: "Access",
    text: "In the last 30 days, has anyone around you offered or suggested trying something?",
    options: ["Never", "Once", "A few times", "Many times"],
  },
  {
    id: "C6",
    core: true,
    index: "Norms",
    text: "How much do you think regular use would harm someone your age?",
    options: ["Not at all", "A little", "Somewhat", "Quite a lot", "A great deal"],
  },
  {
    id: "C7",
    core: true,
    index: "Protection",
    text: "How strongly do you agree: “I feel like I belong on this campus.”",
    options: ["Strongly disagree", "Disagree", "Not sure", "Agree", "Strongly agree"],
  },
  {
    id: "C8",
    core: true,
    index: "Protection",
    text: "Is there an adult on this campus you could talk to about a serious problem?",
    options: ["Yes", "Not sure", "No"],
  },
  {
    id: "C9",
    core: true,
    index: "Wellbeing",
    text: "On a normal day, how many hours are you out with friends with no adult around?",
    options: ["0", "Less than 1", "1–2", "3–4", "5 or more"],
  },
  {
    id: "C10",
    core: true,
    index: "Wellbeing",
    text: "In the last two weeks, how often have you felt down, hopeless, or unable to enjoy things?",
    options: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
  },

  // ---------- rotating · Module A (environment & access) ----------
  {
    id: "A1",
    core: false,
    index: "Access",
    text: "How far is the nearest place where someone your age could get something?",
    options: ["Walking distance", "A short ride away", "Far away", "I do not know"],
  },
  {
    id: "A2",
    core: false,
    index: "Access",
    text: "Does any of this happen on the campus itself?",
    options: ["Never", "Rarely", "Sometimes", "Often", "I do not know"],
  },
  {
    id: "A3",
    core: false,
    index: "Access",
    text: "Do people your age get things through phones or online?",
    options: ["Never heard of it", "Heard of it", "It is common", "I do not know"],
  },
  {
    id: "A4",
    core: false,
    index: "Access",
    text: "When does it mostly happen?",
    options: ["During class hours", "Right after class", "In the evenings", "On weekends", "I do not know"],
  },
  {
    id: "A5",
    core: false,
    index: "Access",
    text: "Is cost a barrier for someone your age?",
    options: ["Yes, too expensive", "Somewhat", "No, it is cheap", "I do not know"],
  },
];

export const HELPLINES = [
  { number: "14416", who: "Tele-MANAS — free and confidential, 24×7" },
  { number: "14446", who: "NMBA de-addiction helpline" },
];
