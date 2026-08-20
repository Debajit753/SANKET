import Icon from "../lib/Icon.jsx";

/* ------------------------------------------------------------------ KPI */
export function StatCard({ label, value, unit, delta, sub }) {
  return (
    <div className="panel p-5">
      <div className="cap">{label}</div>
      <div className="mt-2.5 flex items-end gap-2">
        <span className="text-2xl font-semibold leading-none tracking-[-0.03em]">{value}</span>
        {unit && <span className="pb-0.5 text-sm text-ink-3">{unit}</span>}
      </div>
      <div className="mt-3 flex items-center gap-2">
        {delta && (
          <span className="pill">
            <Icon name={delta.down ? "trendDown" : "trendUp"} size={11} strokeWidth={2.5} />
            {delta.text}
          </span>
        )}
        {sub && <span className="text-xs text-ink-3">{sub}</span>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------- four indices */
export function IndexBars({ indices }) {
  return (
    <div className="flex flex-col gap-3.5">
      {indices.map((r) => {
        const watch = r.worseWhen === "high" ? r.z > 0 : r.z < 0;
        const width = Math.min((Math.abs(r.z) / 2) * 50, 50);
        const left = r.z >= 0 ? 50 : 50 - width;
        return (
          <div key={r.name} className="grid grid-cols-[84px_1fr_78px] items-center gap-3">
            <span className="text-sm font-medium">{r.name}</span>
            <span className="relative block h-2.5 rounded-full bg-surface-3" aria-hidden="true">
              <span className="absolute -top-1 -bottom-1 left-1/2 w-px bg-ink-4" />
              <span
                className="absolute inset-y-0 rounded-full"
                style={{
                  left: `${left}%`,
                  width: `${width}%`,
                  /* filled = watch, hatched = fine — a pattern, not a hue */
                  background: watch
                    ? "var(--color-series-1)"
                    : "repeating-linear-gradient(45deg, var(--color-series-2) 0 3px, var(--color-series-3) 3px 6px)",
                }}
              />
            </span>
            <span className="flex items-center justify-end gap-1.5 text-xs font-semibold tabular-nums">
              <Icon name={r.z > 0.2 ? "trendUp" : r.z < -0.2 ? "trendDown" : "minus"} size={12} strokeWidth={2.5} className="text-ink-3" />
              {r.z > 0 ? "+" : ""}
              {r.z.toFixed(1)}σ
            </span>
          </div>
        );
      })}
      <p className="mt-1 border-t border-divider pt-3 text-xs leading-relaxed text-ink-3">
        A solid bar needs watching — including a <span className="font-medium text-ink">fall</span> on a protective
        index. Hatched bars are moving the right way. Flag threshold is 1.5σ against this section&rsquo;s own baseline.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------- flags */
export function FlagList({ flags }) {
  return (
    <ul className="flex flex-col">
      {flags.map((f, i) => (
        <li key={f.title} className={`flex gap-3 py-3.5 ${i < flags.length - 1 ? "border-b border-divider" : ""}`}>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-surface-3 text-ink">
            <Icon name={f.icon} size={15} strokeWidth={2.2} />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-medium">{f.title}</span>
            <span className="mt-0.5 block text-xs leading-relaxed text-ink-3">{f.detail}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------ action brief */
export function ActionBrief({ brief, nextWave, onToggle }) {
  const doneCount = brief.actions.filter((a) => a.done).length;
  return (
    <div>
      <p className="text-sm leading-relaxed text-ink-2">{brief.summary}</p>

      <div className="mt-4 flex items-center justify-between">
        <span className="cap">Recommended actions</span>
        <span className="pill-outline pill tabular-nums">
          {doneCount} of {brief.actions.length} done
        </span>
      </div>

      <ul className="mt-2 flex flex-col">
        {brief.actions.map((a, i) => (
          <li key={a.text}>
            <label className="flex cursor-pointer items-start gap-3 rounded-md px-2 py-2.5 text-sm hover:bg-hover">
              <span
                className={`mt-px grid h-4.5 w-4.5 shrink-0 place-items-center rounded border ${
                  a.done ? "border-ink bg-ink text-white" : "border-line bg-surface"
                }`}
              >
                {a.done && <Icon name="check" size={11} strokeWidth={3} />}
              </span>
              <input type="checkbox" checked={a.done} onChange={() => onToggle(i)} className="sr-only" />
              <span className={a.done ? "text-ink-3 line-through" : ""}>{a.text}</span>
            </label>
          </li>
        ))}
      </ul>

      <p className="mt-3 flex items-center gap-2 border-t border-divider pt-3 text-xs text-ink-3">
        <Icon name="calendar" size={13} />
        From a curated library — re-measure by {nextWave}
      </p>
    </div>
  );
}

/* ------------------------------------------------- locked / refusal */
export function LockedPanel({ responses, threshold = 15 }) {
  const pct = Math.min((responses / threshold) * 100, 100);
  return (
    <div className="panel px-8 py-14 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-surface-3 text-ink">
        <Icon name="lock" size={24} />
      </span>
      <div className="mt-5 flex items-end justify-center gap-2">
        <span className="text-3xl font-semibold leading-none tracking-[-0.04em]">{responses}</span>
        <span className="pb-1 text-md text-ink-3">of {threshold} responses</span>
      </div>
      <div className="mx-auto mt-5 h-2.5 w-full max-w-sm overflow-hidden rounded-full bg-surface-3">
        <div className="h-full rounded-full bg-ink transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
      <h2 className="mt-6 text-lg font-semibold tracking-[-0.02em]">Not enough responses to show results</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-3">
        Every answer is already stored — it feeds district norms and this section&rsquo;s next wave. SANKET refuses to
        render any view from which a single student could be picked out. Below the threshold, not even a rounded count
        leaves the database.
      </p>
      <p className="mt-6 border-t border-divider pt-5 text-sm font-medium">
        We collect everything and show almost nothing.
      </p>
    </div>
  );
}

/* -------------------------------------------------------- schema strip */
export function SchemaStrip() {
  const absent = ["name", "roll number", "student ID", "device fingerprint", "IP address", "login or cookies", "exact timestamp", "insertion order"];
  return (
    <section className="mt-4 rounded-lg bg-ink p-6 text-white" aria-labelledby="schema-h">
      <h3 id="schema-h" className="flex items-center gap-2 text-sm font-semibold">
        <Icon name="database" size={15} />
        What this database can and cannot store
      </h3>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div>
          <div className="text-2xs font-medium uppercase tracking-wider text-white/45">Stored per response</div>
          <pre className="mt-2 overflow-x-auto rounded-md bg-white/[0.07] p-4 font-mono text-xs leading-relaxed text-white/85">{`answers   fifteen numbers
wave_id   section + date
hour      truncated to the hour
id        random UUID`}</pre>
        </div>
        <div>
          <div className="text-2xs font-medium uppercase tracking-wider text-white/45">Absent by design</div>
          <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-white/80">
            {absent.map((a) => (
              <li key={a} className="flex items-center gap-1.5">
                <Icon name="x" size={12} strokeWidth={2.5} className="text-white/40" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/55">
        A serial row number would be roll-call order in a computer lab, and an exact timestamp is an identity. Both are
        gone. If the registrar demanded to know which student said what, we could not comply — we would have to rebuild
        the product.
      </p>
    </section>
  );
}
