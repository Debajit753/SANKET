# SANKET

**Take the pulse of a classroom, never a child.**

Anonymous, section-level substance-risk sensing for schools and colleges. Built for the
Nasha Mukt Bharat hackathon. Demo institution: Assam Science & Technology University, Guwahati.

React + Vite + Tailwind CSS v4. Monochrome, no images, no icon fonts — every icon is inline SVG.

---

## The idea in one paragraph

Every school drug-prevention tool asks *which student is at risk*. In India, where use is a
criminal offence under the NDPS Act, a named answer reaches a teacher, then a parent, then
sometimes the police — so counsellors sensibly measure nothing at all. SANKET asks which
**section** is drifting instead. Fifteen anonymous questions, none of which ask "do you use",
reported only at section level, with nothing rendered below fifteen responses. Six weeks later the
same section is re-measured, so a counsellor can finally find out whether what they did worked.

## Pages

| Route | What it is |
|---|---|
| `/` | Landing — the argument, and links to both views |
| `/#/dashboard` | Counsellor dashboard — Overview, Questions, AI assistant |
| `/#/survey` | The student survey — 15 questions, one per screen |

### Dashboard sections

- **Overview** — stat cards, the section drift bar chart, four indices, flags, and the action
  brief. Switch sections in the sidebar to see three states:
  - *B.Tech CSE · 3rd Sem A* — full report, three waves, intervention marked
  - *B.Tech Civil · 5th Sem B* — **the locked state**: 9 of 15 responses, nothing rendered
  - *B.Tech Mechanical · 1st Sem C* — baseline only, one wave
- **Questions** — all 15 items: 10 core (trended) + 5 rotating, with every answer option
- **AI assistant** — what the model may and may not do, plus a chat. Ask *"Which students are at
  risk?"* and it refuses, because no student-level record exists to read.

## Run locally

```bash
npm install
npm run dev
```

Then open the printed URL. `npm run build` outputs to `dist/`.

## Deploy

**Vercel** — import the repo and accept the defaults. `vercel.json` sets the Vite framework
preset, the `dist` output directory, and an SPA rewrite. Nothing else to configure.

**GitHub Pages** — push to `main`. `.github/workflows/deploy.yml` builds and publishes
automatically; enable it once under *Settings → Pages → Build and deployment → Source:
GitHub Actions*.

Both work without a base-path change: `vite.config.js` sets `base: './'` for relative assets and
the app uses `HashRouter`, so deep links survive a static host with no rewrite rules.

## Design notes

- **Monochrome by constraint.** No hue anywhere, which means meaning can never rest on colour.
  The two chart series are separated by fill (solid vs diagonal hatch), a legend, and printed
  values. The index bars add an arrow and a signed number. Charts also ship a visually-hidden
  data table.
- **Accessibility.** Focus rings are never removed, `prefers-reduced-motion` is honoured, touch
  targets are at least 44px, and the survey is fully keyboard-operable — press `1`–`5` to answer,
  arrows to navigate.
- **Tokens, not hex.** Everything is a CSS custom property in the `@theme` block at the top of
  `src/index.css`. Change the palette there and the whole app follows.

## Project structure

```
src/
  index.css                  design tokens + component classes
  App.jsx                    routes
  lib/Icon.jsx               inline SVG icon set
  data/sections.js           demo sections, waves, indices, flags, briefs
  data/questions.js          the 15-item instrument + helplines
  components/
    DriftChart.jsx           grouped bar chart, pure SVG
    DashboardParts.jsx       stat cards, index bars, flags, brief, locked panel, schema strip
    QuestionBank.jsx         the Questions page
    AiAssistant.jsx          the AI assistant page
  pages/
    Landing.jsx  Dashboard.jsx  Survey.jsx
```

## Honest limits

The 15-item instrument is a hackathon draft assembled from established constructs — **not** a
validated psychometric scale, and real deployment would need pilot testing and expert review. All
figures in the app are sample data. SANKET measures risk *climate*, not substance-use prevalence,
and it detects drift, not crisis: it is not a safeguarding or crisis-response system. The AI
assistant's replies are written in advance so its behaviour is inspectable.
