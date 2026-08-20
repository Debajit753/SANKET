import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Icon from "../lib/Icon.jsx";
import { INSTITUTION, SECTIONS } from "../data/sections.js";
import DriftChart from "../components/DriftChart.jsx";
import QuestionBank from "../components/QuestionBank.jsx";
import AiAssistant from "../components/AiAssistant.jsx";
import { StatCard, IndexBars, FlagList, ActionBrief, LockedPanel, SchemaStrip } from "../components/DashboardParts.jsx";

const NAV_MAIN = [
  { id: "overview", icon: "grid", label: "Overview", live: true },
  { id: "questions", icon: "clipboard", label: "Questions", badge: "15", live: true },
  { id: "assistant", icon: "sparkles", label: "AI assistant", live: true },
  { id: "sections", icon: "layers", label: "Sections" },
  { id: "waves", icon: "activity", label: "Waves" },
  { id: "reports", icon: "fileText", label: "Reports" },
];

const NAV_MORE = [
  { id: "institution", icon: "users", label: "Institution" },
  { id: "privacy", icon: "shield", label: "Privacy" },
];

const STATE_META = {
  active: { label: "Report ready" },
  locked: { label: "Below threshold" },
  baseline: { label: "Baseline only" },
};

export default function Dashboard() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [navPage, setNavPage] = useState("overview");
  const [navOpen, setNavOpen] = useState(false);
  const [briefState, setBriefState] = useState(() =>
    Object.fromEntries(SECTIONS.filter((s) => s.brief).map((s) => [s.id, s.brief.actions.map((a) => a.done)]))
  );
  const [toast, setToast] = useState(null);

  const section = useMemo(() => SECTIONS.find((s) => s.id === activeId), [activeId]);
  const lastWave = section.waves?.at(-1);

  const showToast = (msg) => {
    setToast(msg);
    window.clearTimeout(showToast.t);
    showToast.t = window.setTimeout(() => setToast(null), 2800);
  };

  const toggleAction = (i) =>
    setBriefState((prev) => {
      const next = [...prev[activeId]];
      next[i] = !next[i];
      return { ...prev, [activeId]: next };
    });

  return (
    <div className="min-h-dvh bg-canvas p-0 sm:p-5 lg:p-7">
      <div className="mx-auto flex min-h-dvh max-w-[1320px] overflow-hidden bg-surface sm:min-h-0 sm:rounded-xl sm:border sm:border-line sm:shadow-[var(--shadow-app)]">
        {/* ================================================= sidebar */}
        <aside
          className={`${
            navOpen ? "fixed inset-0 z-50 w-[268px]" : "hidden"
          } shrink-0 border-r border-line bg-surface p-4 lg:relative lg:block lg:w-[236px]`}
        >
          <div className="flex items-center justify-between px-1.5 py-1">
            <Link
              to="/"
              className="rounded-md px-1 py-0.5 text-md font-semibold tracking-[0.14em] transition hover:text-ink-2"
              title="Back to home"
            >
              SANKET
            </Link>
            <button
              className="grid h-9 w-9 place-items-center rounded-md text-ink-3 hover:bg-hover lg:hidden"
              onClick={() => setNavOpen(false)}
              aria-label="Close menu"
            >
              <Icon name="x" size={17} />
            </button>
          </div>

          <nav className="mt-5 flex flex-col gap-0.5" aria-label="Main">
            {NAV_MAIN.map((n) => (
              <button
                key={n.id}
                className="nav-item"
                aria-current={navPage === n.id ? "true" : undefined}
                onClick={() => {
                  setNavOpen(false);
                  if (n.live) setNavPage(n.id);
                  else showToast(`${n.label} is out of scope for this demo`);
                }}
              >
                <Icon name={n.icon} size={17} strokeWidth={2} />
                <span className="flex-1">{n.label}</span>
                {n.badge && <span className="pill-outline pill">{n.badge}</span>}
              </button>
            ))}
          </nav>

          <div className="my-4 border-t border-line" />

          <nav className="flex flex-col gap-0.5" aria-label="Secondary">
            {NAV_MORE.map((n) => (
              <button key={n.id} className="nav-item" onClick={() => showToast(`${n.label} is out of scope for this demo`)}>
                <Icon name={n.icon} size={17} strokeWidth={2} />
                <span className="flex-1">{n.label}</span>
              </button>
            ))}
          </nav>

          <div className="my-4 border-t border-line" />

          <div className="px-1.5">
            <div className="cap">Sections</div>
          </div>
          <div className="mt-2 flex flex-col gap-0.5">
            {SECTIONS.map((s) => {
              const on = s.id === activeId;
              const meta = s.state === "locked" ? `${s.responses}/15` : s.state === "baseline" ? "W1" : `n=${s.waves.at(-1).n}`;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveId(s.id);
                    setNavPage("overview");
                    setNavOpen(false);
                  }}
                  aria-current={on ? "true" : undefined}
                  className="nav-item"
                  title={STATE_META[s.state].label}
                >
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${on ? "bg-ink" : "bg-ink-4"}`} />
                  <span className="min-w-0 flex-1 truncate text-sm">{s.label}</span>
                  <span className="shrink-0 text-2xs tabular-nums text-ink-3">{meta}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-0.5 border-t border-line pt-4">
            <button className="nav-item" onClick={() => showToast("Help centre is out of scope for this demo")}>
              <Icon name="help" size={17} />
              <span>Help centre</span>
            </button>
            <button className="nav-item" onClick={() => showToast("Settings are out of scope for this demo")}>
              <Icon name="settings" size={17} />
              <span>Settings</span>
            </button>
          </div>
        </aside>

        {/* ================================================= right side */}
        <div className="flex min-w-0 flex-1 flex-col bg-surface-2">
          {/* ---------------------------------------------- topbar */}
          <header className="flex h-[68px] shrink-0 items-center gap-3 border-b border-line bg-surface px-4 sm:px-6">
            <button
              className="grid h-10 w-10 place-items-center rounded-md text-ink-2 hover:bg-hover lg:hidden"
              onClick={() => setNavOpen(true)}
              aria-label="Open menu"
            >
              <Icon name="menu" size={19} />
            </button>

            <h1 className="text-lg font-semibold tracking-[-0.02em]">Overview</h1>

            <div className="flex-1" />

            {/* search */}
            <label className="hidden items-center gap-2 rounded-md border border-line bg-surface-2 px-3 py-2 md:flex">
              <Icon name="search" size={15} className="text-ink-3" />
              <input
                type="search"
                placeholder="Search sections"
                className="w-40 bg-transparent text-sm outline-none placeholder:text-ink-4"
                onKeyDown={(e) => e.key === "Enter" && showToast("Search is out of scope for this demo")}
              />
              <span className="kbd">⌘K</span>
            </label>

            <button
              className="hidden h-10 w-10 place-items-center rounded-md text-ink-2 hover:bg-hover sm:grid"
              aria-label="Help"
              onClick={() => showToast("Help centre is out of scope for this demo")}
            >
              <Icon name="help" size={18} />
            </button>
            <button
              className="relative hidden h-10 w-10 place-items-center rounded-md text-ink-2 hover:bg-hover sm:grid"
              aria-label="Notifications, 1 unread"
              onClick={() => showToast("1 section is below the response threshold")}
            >
              <Icon name="bell" size={18} />
              <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-ink" />
            </button>

            <div className="ml-1 flex items-center gap-2.5 border-l border-line pl-3">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-xs font-semibold text-white">
                RD
              </span>
              <span className="hidden leading-tight sm:block">
                <span className="block text-sm font-medium">R. Deka</span>
                <span className="block text-xs text-ink-3">Counselling Cell</span>
              </span>
              <Icon name="chevronDown" size={15} className="hidden text-ink-3 sm:block" />
            </div>
          </header>

          {/* ---------------------------------------------- content */}
          <main className="min-w-0 flex-1 overflow-x-hidden p-4 sm:p-6">
            {navPage === "questions" && <QuestionBank />}
            {navPage === "assistant" && <AiAssistant sectionLabel={section.label} />}

            {navPage === "overview" && (
            <>
            {/* section header row */}
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-xl font-semibold tracking-[-0.03em]">{section.label}</h2>
                  <span className="pill-outline pill">{STATE_META[section.state].label}</span>
                </div>
                <p className="mt-1 text-xs text-ink-3">
                  {INSTITUTION.name} · {INSTITUTION.city} · {INSTITUTION.year}
                </p>
              </div>
              <div className="flex-1" />
              <button className="btn btn-light" onClick={() => showToast("Report exported as PDF")}>
                <Icon name="fileText" size={15} />
                Export
              </button>
              <button
                className="btn btn-dark"
                onClick={() =>
                  showToast(
                    section.state === "locked"
                      ? "Wave link copied — share it in the computer lab"
                      : "New wave created — open for the next 7 days"
                  )
                }
              >
                <Icon name={section.state === "locked" ? "clipboard" : "plus"} size={15} />
                {section.state === "locked" ? "Copy wave link" : "New wave"}
              </button>
            </div>

            {/* ================= ACTIVE ================= */}
            {section.state === "active" && (
              <div className="grid gap-4 xl:grid-cols-[1fr_1fr_1fr_300px]">
                <StatCard
                  label="Responses"
                  value={lastWave.n}
                  unit={`of ${section.strength}`}
                  delta={{ down: false, text: `${Math.round((lastWave.n / section.strength) * 100)}%` }}
                  sub="of the section"
                />
                <StatCard
                  label="Risk index"
                  value={`+${lastWave.risk.toFixed(1)}σ`}
                  delta={{ down: true, text: `${Math.abs(lastWave.risk - section.waves.at(-2).risk).toFixed(1)}σ` }}
                  sub="vs last wave"
                />
                <StatCard label="Data quality" value="Passed" delta={{ down: true, text: "0 flags" }} sub="checks clear" />

                {/* upcoming — spans two rows on wide screens */}
                <section className="panel row-span-2 p-5" aria-labelledby="up-h">
                  <div className="flex items-center justify-between">
                    <h3 id="up-h" className="text-sm font-semibold">Wave timeline</h3>
                    <Icon name="clock" size={15} className="text-ink-3" />
                  </div>
                  <ol className="mt-4 flex flex-col">
                    {section.waves.map((w, i) => (
                      <li key={w.tag} className="flex gap-3 pb-4 last:pb-0">
                        <span className="relative flex flex-col items-center">
                          <span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-2xs font-semibold text-white">
                            {i + 1}
                          </span>
                          {i < section.waves.length - 1 && <span className="mt-1 w-px flex-1 bg-line" />}
                        </span>
                        <span className="min-w-0 pb-1">
                          <span className="block text-sm font-medium">{w.tag}</span>
                          <span className="block text-xs text-ink-3">
                            {w.n} responses · risk {w.risk > 0 ? "+" : ""}
                            {w.risk}σ
                          </span>
                        </span>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-1 rounded-md bg-surface-3 p-3.5">
                    <div className="flex items-center gap-2 text-xs font-medium">
                      <Icon name="users" size={13} />
                      {section.intervention.label}
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink-3">
                      Logged between wave 2 and wave 3 — this is what the September re-measure tests.
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-divider pt-4">
                    <span className="cap">Next wave</span>
                    <span className="text-sm font-medium">{section.nextWave}</span>
                  </div>
                </section>

                {/* drift chart */}
                <section className="panel p-5 xl:col-span-3" aria-labelledby="drift-h">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 id="drift-h" className="text-sm font-semibold">Section drift</h3>
                      <p className="mt-1 text-xs text-ink-3">Compared only to its own baseline — never to another section</p>
                    </div>
                    <span className="pill-outline pill">3 waves</span>
                  </div>
                  <div className="mt-4">
                    <DriftChart waves={section.waves} intervention={section.intervention} />
                  </div>
                  <p className="mt-2 border-t border-divider pt-3 text-xs leading-relaxed text-ink-3">
                    Risk rose through July, a peer-led session ran in August, and the September re-measure shows
                    recovery. This is the loop a counsellor has never been able to close.
                  </p>
                </section>

                {/* indices */}
                <section className="panel p-5 xl:col-span-2" aria-labelledby="idx-h">
                  <div className="flex items-center justify-between">
                    <h3 id="idx-h" className="text-sm font-semibold">Four indices</h3>
                    <span className="cap">wave 3 vs baseline</span>
                  </div>
                  <div className="mt-4">
                    <IndexBars indices={section.indices} />
                  </div>
                </section>

                {/* flags */}
                <section className="panel p-5 xl:col-span-2" aria-labelledby="flags-h">
                  <h3 id="flags-h" className="text-sm font-semibold">Flags this wave</h3>
                  <div className="mt-1">
                    <FlagList flags={section.flags} />
                  </div>
                </section>

                {/* brief */}
                <section className="panel p-5 xl:col-span-4" aria-labelledby="brief-h">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 id="brief-h" className="text-sm font-semibold">Action brief</h3>
                    <span className="cap">written from the numbers above — the model never scores</span>
                  </div>
                  <div className="mt-3">
                    <ActionBrief
                      brief={{
                        ...section.brief,
                        actions: section.brief.actions.map((a, i) => ({ ...a, done: briefState[section.id][i] })),
                      }}
                      nextWave={section.nextWave}
                      onToggle={toggleAction}
                    />
                  </div>
                </section>
              </div>
            )}

            {/* ================= LOCKED ================= */}
            {section.state === "locked" && (
              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <StatCard label="Responses" value={section.responses} unit="of 15 needed" sub={`section strength ${section.strength}`} />
                  <StatCard label="Risk index" value="—" sub="locked below the threshold" />
                  <StatCard label="Data quality" value="—" sub="evaluated when it unlocks" />
                  <StatCard label="Window" value="7 days" sub={section.windowNote} />
                </div>
                <LockedPanel responses={section.responses} />
              </div>
            )}

            {/* ================= BASELINE ================= */}
            {section.state === "baseline" && (
              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <StatCard label="Responses" value={section.waves[0].n} unit={`of ${section.strength}`} sub={section.waves[0].tag} />
                  <StatCard label="Risk index" value="0.0σ" sub="this is the baseline" />
                  <StatCard label="Data quality" value="Passed" delta={{ down: true, text: "0 flags" }} sub="checks clear" />
                  <StatCard label="Re-measure" value={section.nextWave} sub="21-day minimum" />
                </div>
                <section className="panel p-5" aria-labelledby="base-h">
                  <h3 id="base-h" className="text-sm font-semibold">One reading is not a signal</h3>
                  <p className="mt-1 text-xs text-ink-3">The trend is the product</p>
                  <div className="mt-4">
                    <DriftChart waves={section.waves} />
                  </div>
                  <p className="mt-2 border-t border-divider pt-3 text-xs leading-relaxed text-ink-3">
                    A single wave tells us almost nothing, by design. This section becomes readable when wave 2 lands —
                    and nothing here compares it to any other section.
                  </p>
                </section>
              </div>
            )}

            <SchemaStrip />
            </>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-5">
              <p className="flex-1 text-xs leading-relaxed text-ink-3">
                Demo build with sample data. The instrument is a hackathon draft, not a validated scale. SANKET measures
                risk climate, not substance-use prevalence, and detects drift rather than crisis.
              </p>
              <Link to="/survey" className="btn btn-light">
                <Icon name="clipboard" size={15} />
                Student view
              </Link>
            </div>
          </main>
        </div>
      </div>

      {/* toast */}
      <div
        role="status"
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-lg bg-ink px-4 py-2.5 text-sm text-white shadow-[var(--shadow-pop)] transition-all duration-200 ${
          toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        {toast}
      </div>
    </div>
  );
}
