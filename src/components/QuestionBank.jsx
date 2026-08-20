import Icon from "../lib/Icon.jsx";
import { QUESTIONS } from "../data/questions.js";

const core = QUESTIONS.filter((q) => q.core);
const rotating = QUESTIONS.filter((q) => !q.core);
const indices = [...new Set(QUESTIONS.map((q) => q.index))];

function Stat({ value, label }) {
  return (
    <div className="panel p-4">
      <div className="text-xl font-semibold leading-none tracking-[-0.03em]">{value}</div>
      <div className="mt-2 text-xs leading-snug text-ink-3">{label}</div>
    </div>
  );
}

function QuestionRow({ q, n }) {
  return (
    <li className="flex gap-4 border-b border-divider px-1 py-4 last:border-b-0">
      <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-md bg-surface-3 text-xs font-semibold tabular-nums">
        {n}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-2xs text-ink-3">{q.id}</span>
          <span className="pill-outline pill">{q.index}</span>
          {q.core ? (
            <span className="pill">Core · every wave</span>
          ) : (
            <span className="pill-outline pill">Rotating</span>
          )}
        </div>
        <p className="mt-1.5 text-base leading-snug">{q.text}</p>
        <ul className="mt-2.5 flex flex-wrap gap-1.5">
          {q.options.map((o, i) => (
            <li
              key={o}
              className="inline-flex items-center gap-1.5 rounded-md border border-line bg-surface-2 px-2 py-1 text-xs text-ink-2"
            >
              <span className="text-2xs tabular-nums text-ink-4">{i + 1}</span>
              {o}
            </li>
          ))}
          <li className="inline-flex items-center rounded-md border border-dashed border-line px-2 py-1 text-xs text-ink-4">
            Prefer not to answer
          </li>
        </ul>
      </div>
    </li>
  );
}

export default function QuestionBank() {
  return (
    <div>
      {/* header */}
      <div className="mb-5 flex flex-wrap items-start gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-[-0.03em]">Questions</h2>
          <p className="mt-1 text-xs text-ink-3">
            {QUESTIONS.length} items per wave · {core.length} core + {rotating.length} rotating · about 3 minutes
          </p>
        </div>
        <div className="flex-1" />
        <span className="pill-outline pill">Module A · environment &amp; access</span>
      </div>

      {/* the argument, up front */}
      <div className="panel mb-4 flex gap-3.5 p-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-ink text-white">
          <Icon name="eyeOff" size={17} />
        </span>
        <div>
          <h3 className="text-sm font-semibold">Not one question asks &ldquo;do you use&rdquo;</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
            Every item is about the environment, peers, or the student&rsquo;s own confidence. A student can answer all
            fifteen honestly and admit to nothing — which is what makes the answers usable, and what keeps the
            instrument out of the surveillance trap that sinks conventional screeners.
          </p>
        </div>
      </div>

      {/* stats */}
      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat value={core.length} label="Core items, asked in every wave — the only ones we trend" />
        <Stat value={rotating.length} label="Rotating items, swapped each wave for fresh angles" />
        <Stat value={indices.length} label={`Indices: ${indices.join(", ")}`} />
        <Stat value="0" label="Items that ask about the respondent's own substance use" />
      </div>

      {/* core */}
      <section className="panel mb-4 p-5" aria-labelledby="core-h">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3.5">
          <h3 id="core-h" className="text-sm font-semibold">
            Core battery
            <span className="ml-2 font-normal text-ink-3">identical in every wave, forever</span>
          </h3>
          <span className="pill">{core.length} items</span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink-3">
          These are the ruler. You cannot measure change with a different ruler, so nothing here is ever edited between
          waves — that is what makes the drift chart mean anything.
        </p>
        <ul className="mt-2">
          {core.map((q, i) => (
            <QuestionRow key={q.id} q={q} n={i + 1} />
          ))}
        </ul>
      </section>

      {/* rotating */}
      <section className="panel p-5" aria-labelledby="rot-h">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3.5">
          <h3 id="rot-h" className="text-sm font-semibold">
            Rotating module
            <span className="ml-2 font-normal text-ink-3">changes each wave · A → B → C → D</span>
          </h3>
          <span className="pill">{rotating.length} items</span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink-3">
          Reported as a this-wave snapshot only, never plotted as a trend. Rotation keeps the survey from feeling
          repetitive and surfaces angles the core battery does not cover.
        </p>
        <ul className="mt-2">
          {rotating.map((q, i) => (
            <QuestionRow key={q.id} q={q} n={core.length + i + 1} />
          ))}
        </ul>
      </section>

      {/* honest limits */}
      <div className="panel mt-4 flex gap-3.5 p-5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-surface-3">
          <Icon name="alert" size={17} />
        </span>
        <div>
          <h3 className="text-sm font-semibold">What this instrument is not</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
            A hackathon draft assembled from established constructs — not a validated psychometric scale. Real
            deployment needs pilot testing and expert review. It measures risk climate, not substance-use prevalence,
            and it detects drift rather than crisis.
          </p>
        </div>
      </div>
    </div>
  );
}
