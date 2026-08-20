import { Link } from "react-router-dom";
import Icon from "../lib/Icon.jsx";
import { INSTITUTION } from "../data/sections.js";

const CARDS = [
  {
    to: "/dashboard",
    icon: "grid",
    title: "Counsellor dashboard",
    body: "Section drift across waves, the four indices, the response threshold, and the action brief. Three sections show three different states.",
    cta: "Open the dashboard",
  },
  {
    to: "/survey",
    icon: "clipboard",
    title: "Student survey",
    body: "What a student actually sees: fifteen anonymous questions, one per screen, about three minutes. No name is ever collected.",
    cta: "Open the survey",
  },
];

export default function Landing() {
  return (
    <main className="min-h-dvh bg-canvas">
      <div className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6 py-16">
        <span className="text-sm font-semibold tracking-[0.18em]">SANKET</span>

        <h1 className="mt-6 text-2xl font-semibold leading-tight tracking-[-0.04em] sm:text-3xl">
          Take the pulse of a classroom,
          <br />
          never a child.
        </h1>
        <p className="mt-4 max-w-xl text-md leading-relaxed text-ink-2">
          Every school drug-prevention tool asks which <em className="not-italic font-medium text-ink">student</em> is at
          risk. In India a named answer reaches a teacher, then a parent, then sometimes the police — so counsellors
          measure nothing at all. SANKET reads the <em className="not-italic font-medium text-ink">section</em> instead,
          and cannot identify anyone even if asked to.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {CARDS.map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group rounded-lg border border-line bg-surface p-6 transition hover:border-ink-4 hover:shadow-[var(--shadow-app)]"
            >
              <span className="grid h-10 w-10 place-items-center rounded-md bg-ink text-white">
                <Icon name={c.icon} size={18} />
              </span>
              <h2 className="mt-4 text-base font-semibold">{c.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-3">{c.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium">
                {c.cta}
                <Icon name="arrowRight" size={15} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-6 text-xs text-ink-3">
          <span>{INSTITUTION.name}, {INSTITUTION.city}</span>
          <span>Demo build — sample data, nothing is sent anywhere</span>
        </div>
      </div>
    </main>
  );
}
