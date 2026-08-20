import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import Icon from "../lib/Icon.jsx";
import { QUESTIONS, HELPLINES } from "../data/questions.js";
import { INSTITUTION } from "../data/sections.js";

const WELCOME = -1;
const DONE = QUESTIONS.length;

const PROMISES = [
  "No name, no roll number, no login",
  "Staff cannot see any individual answer",
  "You can skip any question",
  "You can stop at any time",
];

export default function Survey() {
  const [step, setStep] = useState(WELCOME);
  const [answers, setAnswers] = useState(() => new Array(QUESTIONS.length).fill(null));

  const q = step >= 0 && step < DONE ? QUESTIONS[step] : null;
  const progress = step <= WELCOME ? 0 : step >= DONE ? 100 : (step / QUESTIONS.length) * 100;

  const choose = useCallback(
    (i) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[step] = i;
        return next;
      });
      window.setTimeout(() => setStep((s) => s + 1), 200);
    },
    [step]
  );

  const skip = () => {
    setAnswers((prev) => {
      const next = [...prev];
      next[step] = "skipped";
      return next;
    });
    setStep((s) => s + 1);
  };

  /* Full keyboard operation: number keys pick, arrows navigate. */
  useEffect(() => {
    if (!q) return;
    const onKey = (e) => {
      const n = Number(e.key);
      if (n >= 1 && n <= q.options.length) {
        e.preventDefault();
        choose(n - 1);
      } else if (e.key === "ArrowLeft" && step > 0) {
        setStep(step - 1);
      } else if (e.key === "ArrowRight" && answers[step] !== null) {
        setStep(step + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [q, step, answers, choose]);

  return (
    <div className="flex min-h-dvh flex-col bg-canvas">
      {/* ------------------------------------------------ header */}
      <header className="flex items-center gap-3 px-4 py-4 sm:px-7">
        <Link
          to="/"
          className="rounded-md px-1 py-0.5 text-sm font-semibold tracking-[0.14em] transition hover:text-ink-2"
          title="Back to home"
        >
          SANKET
        </Link>
        <span className="hidden items-center gap-1.5 rounded-md border border-line bg-surface px-2.5 py-1.5 text-xs text-ink-2 sm:inline-flex">
          <Icon name="eyeOff" size={13} />
          Anonymous — no name collected
        </span>
        <div className="flex-1" />
        {step >= 0 && step < DONE && (
          <span className="text-xs tabular-nums text-ink-3">
            {step + 1} / {QUESTIONS.length}
          </span>
        )}
        <Link to="/" className="rounded-md px-2.5 py-2 text-xs text-ink-3 hover:text-ink">
          Exit
        </Link>
      </header>

      {/* progress */}
      <div className="mx-4 h-1 overflow-hidden rounded-full bg-line sm:mx-7" role="presentation">
        <div className="h-full rounded-full bg-ink transition-[width] duration-300" style={{ width: `${progress}%` }} />
      </div>

      {/* -------------------------------------------------- body */}
      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:py-12">
        {/* ---------- welcome ---------- */}
        {step === WELCOME && (
          <div className="w-full max-w-lg rounded-xl border border-line bg-surface p-8 shadow-[var(--shadow-app)] sm:p-10">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-surface-3">
              <Icon name="clipboard" size={22} />
            </span>
            <h1 className="mt-5 text-xl font-semibold tracking-[-0.03em]">
              A few questions about your surroundings
            </h1>
            <p className="mt-3 text-base leading-relaxed text-ink-2">
              This takes about three minutes. The questions are about your campus and your area — not about you. Your
              answers are combined with your whole section as one group, so no one can see what you personally said.
            </p>
            <ul className="mt-6 flex flex-col gap-2.5 border-t border-divider pt-5">
              {PROMISES.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm text-ink-2">
                  <Icon name="check" size={15} strokeWidth={2.5} className="text-ink" />
                  {p}
                </li>
              ))}
            </ul>
            <button className="btn btn-dark mt-7 w-full" onClick={() => setStep(0)}>
              Start
              <Icon name="arrowRight" size={15} />
            </button>
            <p className="mt-4 text-center text-xs text-ink-3">
              {INSTITUTION.unit} · {INSTITUTION.name}
            </p>
          </div>
        )}

        {/* ---------- question ---------- */}
        {q && (
          <div className="w-full max-w-lg rounded-xl border border-line bg-surface p-7 shadow-[var(--shadow-app)] sm:p-9">
            <div className="flex items-center justify-between">
              <span className="cap font-medium">Question {step + 1} of {QUESTIONS.length}</span>
              <span className="pill-outline pill">{q.core ? "Core item" : "Rotating item"}</span>
            </div>

            <h1 className="mt-3.5 text-lg font-semibold leading-snug tracking-[-0.02em]">{q.text}</h1>

            <fieldset className="mt-6">
              <legend className="sr-only">{q.text}</legend>
              <div className="flex flex-col gap-2">
                {q.options.map((o, i) => {
                  const sel = answers[step] === i;
                  return (
                    <button
                      key={o}
                      onClick={() => choose(i)}
                      aria-pressed={sel}
                      className={`flex min-h-11 w-full items-center gap-3 rounded-md border px-3.5 py-3 text-left text-base transition ${
                        sel
                          ? "border-ink bg-ink text-white"
                          : "border-line bg-surface hover:border-ink-4 hover:bg-hover"
                      }`}
                    >
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded border text-xs font-semibold tabular-nums ${
                          sel ? "border-white/30 bg-white/15 text-white" : "border-line text-ink-3"
                        }`}
                        aria-hidden="true"
                      >
                        {sel ? <Icon name="check" size={12} strokeWidth={3} /> : i + 1}
                      </span>
                      {o}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <button
              onClick={skip}
              className="mt-4 min-h-11 text-sm text-ink-3 underline decoration-line underline-offset-4 hover:text-ink"
            >
              Prefer not to answer
            </button>

            <div className="mt-4 flex items-center border-t border-divider pt-4">
              <button
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
                className="btn btn-quiet disabled:opacity-35"
              >
                <Icon name="arrowLeft" size={15} />
                Back
              </button>
              <div className="flex-1" />
              <button onClick={() => setStep(step + 1)} disabled={answers[step] === null} className="btn btn-dark">
                Next
                <Icon name="arrowRight" size={15} />
              </button>
            </div>

            <p className="mt-3 hidden text-center text-xs text-ink-4 sm:block">
              Press <span className="kbd">1</span>–<span className="kbd">{q.options.length}</span> to answer, or use the
              arrow keys
            </p>
          </div>
        )}

        {/* ---------- done ---------- */}
        {step === DONE && (
          <div className="w-full max-w-lg rounded-xl border border-line bg-surface p-8 text-center shadow-[var(--shadow-app)] sm:p-10">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-ink text-white">
              <Icon name="check" size={22} strokeWidth={2.5} />
            </span>
            <h1 className="mt-5 text-xl font-semibold tracking-[-0.03em]">Thank you</h1>
            <p className="mx-auto mt-3 max-w-md text-base leading-relaxed text-ink-2">
              Your answers were combined with your section as one group. They cannot be traced back to you — the system
              stores no name, roll number, or device details.
            </p>

            <p className="mt-7 border-t border-divider pt-6 text-sm font-medium">
              If you or a friend ever needs to talk to someone
            </p>
            <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
              {HELPLINES.map((h) => (
                <div key={h.number} className="rounded-md border border-line bg-surface-2 p-4 text-left">
                  <div className="flex items-center gap-2 text-lg font-semibold tabular-nums">
                    <Icon name="phone" size={16} />
                    {h.number}
                  </div>
                  <div className="mt-1 text-xs leading-relaxed text-ink-3">{h.who}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-ink-3">
              These are shown to every student, whatever they answered — a screen that appeared only for some answers
              would itself be a disclosure.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2.5 border-t border-divider pt-5">
              <button
                className="btn btn-light"
                onClick={() => {
                  setAnswers(new Array(QUESTIONS.length).fill(null));
                  setStep(WELCOME);
                }}
              >
                <Icon name="refresh" size={15} />
                Run it again
              </button>
              <Link to="/dashboard" className="btn btn-dark">
                <Icon name="grid" size={15} />
                See the counsellor view
              </Link>
            </div>
            <p className="mt-4 text-xs text-ink-4">Demo mode — answers are not sent anywhere.</p>
          </div>
        )}
      </main>
    </div>
  );
}
