import { useState, useRef, useEffect } from "react";
import Icon from "../lib/Icon.jsx";

/**
 * AI assistant — demo, canned replies.
 *
 * The product argument lives in what it refuses to do: the model reads the
 * COMPUTED STATISTICS for a section, never a single student's answers, and it
 * never scores or classifies. Ask it who is at risk and it cannot answer,
 * because that data does not exist in the system.
 */

const GUARDRAILS = {
  can: [
    "Explain why a section was flagged, in plain language",
    "Turn computed statistics into a written action brief",
    "Pick interventions from a curated library",
    "Draft notes and summaries for staff",
  ],
  cannot: [
    "Score or classify a section",
    "See any individual student's answers",
    "Name or rank students — that data does not exist",
    "Invent an intervention or give clinical advice",
  ],
};

const SUGGESTIONS = [
  { q: "Which students are at risk?", tag: "watch this one" },
  { q: "Why is 3rd Sem A flagged?" },
  { q: "What should I do first?" },
  { q: "Did the August session work?" },
  { q: "Draft a note for the head of department" },
];

const REPLIES = {
  "Which students are at risk?": {
    refusal: true,
    text: "I cannot answer that, and neither can any other part of SANKET.\n\nThere is no student-level data in the system to look up. The response table stores fifteen numbers, a wave ID, and an hour — no name, no roll number, no device, no insertion order. I only ever receive the aggregated statistics for a section.\n\nIf it would help, I can tell you which section is drifting and what a class-level intervention should target.",
  },
  "Why is 3rd Sem A flagged?": {
    text: "Three things moved together in wave 3, which is what makes it worth acting on rather than noise.\n\nPerceived availability rose 2.1σ against this section's own April baseline — students report that getting hold of something has become easier. Perceived harm fell 1.7σ, and in the adolescent literature that is the earliest indicator available: belief that it is harmless moves before use does.\n\nThe third is the one I would not ignore. \"Is there an adult here you could talk to?\" dropped from 71% to 44%. That suppresses every help-seeking number underneath it, so treat the other two as probably understated.",
  },
  "What should I do first?": {
    text: "Fix the trust finding before you run any content.\n\nWith only 44% of the section naming an adult they could talk to, a norms session lands in a room where nobody would follow up with you afterwards. Publishing confidential drop-in hours and being visibly present is cheap and it unblocks the rest.\n\nThen run the norms-correction session. Item C2 shows this section believes far more of their peers have tried something than the survey supports, and that misperception is itself a risk driver — showing them the real number is a documented intervention, not just information.\n\nI would hold the refusal-skills workshop until wave 4, so you can attribute any change.",
  },
  "Did the August session work?": {
    text: "The direction is right, but treat it as encouraging rather than proven.\n\nRisk index went from +1.4σ in July to +0.5σ in September, and the protective index recovered from −1.1σ to +0.3σ. Both moved back toward baseline across the intervention, which is what you would hope for.\n\nTwo caveats worth stating if you report this upward. One wave-to-wave change is not a controlled result — there is no comparison section, and September also follows a break. And n fell from 38 to 36, so a small part of the shift could be composition. The pattern becomes credible if wave 4 holds.",
  },
  "Draft a note for the head of department": {
    text: "Here is a draft. It deliberately names no student and makes no claim about prevalence.\n\n—\n\nSubject: Class-climate follow-up, 3rd Sem A\n\nOur September section survey shows improvement in 3rd Sem A following the peer-led session in August: the composite risk indicator has moved from +1.4 to +0.5 standard deviations against the section's own April baseline.\n\nOne indicator still needs attention. The proportion of students who say there is an adult here they could approach about a serious problem is 44%, down from 71% in April. I would like to run confidential drop-in hours for this section this term and re-measure in six weeks.\n\nThe survey is anonymous and reports only at section level. No individual student is identified at any stage.\n\n—\n\nWant it shorter, or aimed at the registrar instead?",
  },
};

const FALLBACK =
  "This is a demo build with canned replies, so I can only answer the suggested questions below.\n\nIn a real deployment I would receive the computed statistics for the selected section — the four indices, the flagged items, and the wave history — and nothing else. Never a single student's answers.";

export default function AiAssistant({ sectionLabel }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: `I have the wave 3 statistics for ${sectionLabel} — the four indices, the flagged items, and the wave history.\n\nI have not been given, and cannot request, any individual student's answers. Ask me anything about the section.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, thinking]);

  const ask = (q) => {
    if (!q.trim() || thinking) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setThinking(true);
    const found = REPLIES[q];
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: found?.text ?? FALLBACK, refusal: found?.refusal },
      ]);
      setThinking(false);
    }, 520);
  };

  return (
    <div>
      {/* header */}
      <div className="mb-5 flex flex-wrap items-start gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-[-0.03em]">AI assistant</h2>
          <p className="mt-1 text-xs text-ink-3">
            Reads the computed statistics for {sectionLabel} · never a single student&rsquo;s answers
          </p>
        </div>
        <div className="flex-1" />
        <span className="pill-outline pill">Demo · canned replies</span>
      </div>

      {/* guardrails */}
      <div className="mb-4 grid gap-3 lg:grid-cols-2">
        <div className="panel p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Icon name="check" size={15} strokeWidth={2.5} />
            What it does
          </h3>
          <ul className="mt-3 flex flex-col gap-2">
            {GUARDRAILS.can.map((t) => (
              <li key={t} className="flex gap-2.5 text-sm text-ink-2">
                <Icon name="check" size={14} className="mt-1 shrink-0 text-ink" strokeWidth={2.5} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="panel bg-ink p-5 text-white">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <Icon name="x" size={15} strokeWidth={2.5} />
            What it cannot do
          </h3>
          <ul className="mt-3 flex flex-col gap-2">
            {GUARDRAILS.cannot.map((t) => (
              <li key={t} className="flex gap-2.5 text-sm text-white/80">
                <Icon name="x" size={14} className="mt-1 shrink-0 text-white/45" strokeWidth={2.5} />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-white/10 pt-3.5 text-xs leading-relaxed text-white/55">
            Scoring stays deterministic on purpose. When a counsellor asks why a section is flagged, the answer has to
            be a calculation someone can check — not a model&rsquo;s guess.
          </p>
        </div>
      </div>

      {/* chat */}
      <section className="panel flex flex-col overflow-hidden" aria-label="Assistant conversation">
        <div className="flex items-center gap-2.5 border-b border-line px-5 py-3.5">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-ink text-white">
            <Icon name="sparkles" size={15} />
          </span>
          <span className="text-sm font-semibold">Ask about this section</span>
          <div className="flex-1" />
          <button
            className="btn btn-quiet text-xs"
            onClick={() =>
              setMessages([
                {
                  role: "assistant",
                  text: `I have the wave 3 statistics for ${sectionLabel}. Ask me anything about the section.`,
                },
              ])
            }
          >
            <Icon name="refresh" size={13} />
            Reset
          </button>
        </div>

        {/* messages */}
        <div className="flex max-h-[440px] flex-col gap-4 overflow-y-auto px-5 py-5">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "assistant" && (
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-surface-3">
                  <Icon name="sparkles" size={14} />
                </span>
              )}
              <div
                className={`max-w-[min(46rem,88%)] whitespace-pre-line rounded-lg px-4 py-3 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-ink text-white"
                    : m.refusal
                    ? "border border-dashed border-ink-4 bg-surface-2 text-ink"
                    : "bg-surface-2 text-ink-2"
                }`}
              >
                {m.refusal && (
                  <span className="mb-2 flex items-center gap-1.5 text-2xs font-semibold uppercase tracking-wider text-ink">
                    <Icon name="lock" size={12} />
                    Cannot be answered by design
                  </span>
                )}
                {m.text}
              </div>
              {m.role === "user" && (
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-surface-3">
                  <Icon name="user" size={14} />
                </span>
              )}
            </div>
          ))}

          {thinking && (
            <div className="flex gap-3">
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-surface-3">
                <Icon name="sparkles" size={14} />
              </span>
              <div className="rounded-lg bg-surface-2 px-4 py-3">
                <span className="flex gap-1.5" aria-label="Thinking">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-4"
                      style={{ animationDelay: `${d * 130}ms` }}
                    />
                  ))}
                </span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* suggestions */}
        <div className="border-t border-line px-5 pt-4">
          <span className="cap">Try asking</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.q}
                onClick={() => ask(s.q)}
                disabled={thinking}
                className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink-2 transition hover:border-ink-4 hover:bg-hover disabled:opacity-50"
              >
                {s.q}
                {s.tag && <span className="pill-solid pill">{s.tag}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* input */}
        <form
          className="flex items-center gap-2 px-5 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            ask(input);
          }}
        >
          <label className="sr-only" htmlFor="ai-input">
            Ask the assistant about this section
          </label>
          <input
            id="ai-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this section..."
            className="min-h-11 flex-1 rounded-md border border-line bg-surface-2 px-3.5 text-base outline-none placeholder:text-ink-4 focus:border-ink-4"
          />
          <button type="submit" className="btn btn-dark" disabled={!input.trim() || thinking}>
            <Icon name="send" size={15} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </section>

      <p className="mt-4 text-xs leading-relaxed text-ink-3">
        In this demo the replies are written in advance so the behaviour is inspectable. The one thing that is not a
        demo shortcut is the refusal: there genuinely is no student-level record for a model to read.
      </p>
    </div>
  );
}
