/**
 * Section drift — grouped bar chart, monochrome.
 * A section is only ever plotted against its OWN baseline.
 *
 * With no hue available, the two series are separated three ways:
 * solid fill vs diagonal hatch, a legend with matching swatches, and
 * printed values on every bar.
 */
export default function DriftChart({ waves, intervention, height = 280 }) {
  const W = 760;
  const H = height;
  const L = 44, R = 20, T = 34, B = 58;
  const zMin = -1.5, zMax = 2;

  const plotH = H - T - B;
  const y = (v) => T + ((zMax - v) * plotH) / (zMax - zMin);
  const zeroY = y(0);

  const bandW = (W - L - R) / waves.length;
  const barW = Math.min(26, bandW / 3.2);
  const gap = 8;

  // x centre of each wave band
  const cx = waves.map((_, i) => L + bandW * (i + 0.5));

  const bar = (centre, value, side) => {
    const x = side === "left" ? centre - barW - gap / 2 : centre + gap / 2;
    const top = value >= 0 ? y(value) : zeroY;
    const h = Math.max(Math.abs(zeroY - y(value)), 1.5);
    return { x, y: top, h, w: barW };
  };

  let markerX = null;
  if (intervention && waves.length > intervention.afterWave) {
    markerX = (cx[intervention.afterWave - 1] + cx[intervention.afterWave]) / 2;
  }

  const summary =
    `Risk index by wave: ${waves.map((w) => `${w.tag} ${w.risk > 0 ? "plus " : ""}${w.risk} sigma`).join("; ")}. ` +
    `Protective index: ${waves.map((w) => `${w.tag} ${w.prot > 0 ? "plus " : ""}${w.prot} sigma`).join("; ")}.` +
    (intervention ? ` Intervention between waves: ${intervention.label}.` : "");

  const fmt = (v) => `${v > 0 ? "+" : ""}${v.toFixed(1)}`;

  return (
    <div>
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[520px]" role="img" aria-label={summary}>
          <defs>
            <pattern id="hatch" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill="var(--color-series-3)" />
              <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-series-2)" strokeWidth="3" />
            </pattern>
          </defs>

          {/* gridlines + y labels */}
          {[2, 1, 0, -1].map((v) => (
            <g key={v}>
              <line
                x1={L} y1={y(v)} x2={W - R} y2={y(v)}
                stroke={v === 0 ? "var(--color-ink-4)" : "var(--color-divider)"}
                strokeWidth="1"
              />
              <text x={L - 8} y={y(v) + 4} textAnchor="end" fontSize="11" fill="var(--color-ink-4)">
                {v > 0 ? `+${v}` : v}
              </text>
            </g>
          ))}

          {/* intervention divider between two wave bands */}
          {markerX !== null && (
            <g>
              <line x1={markerX} y1={T - 6} x2={markerX} y2={H - B} stroke="var(--color-ink-3)" strokeWidth="1.5" strokeDasharray="5 4" />
              <rect x={markerX - 78} y={T - 26} width="156" height="20" rx="5" fill="var(--color-surface-3)" />
              <text x={markerX} y={T - 12} textAnchor="middle" fontSize="10.5" fontWeight="600" fill="var(--color-ink)">
                {intervention.label}
              </text>
            </g>
          )}

          {/* bars */}
          {waves.map((w, i) => {
            const risk = bar(cx[i], w.risk, "left");
            const prot = bar(cx[i], w.prot, "right");
            return (
              <g key={w.tag}>
                <rect x={risk.x} y={risk.y} width={risk.w} height={risk.h} rx="4" fill="var(--color-series-1)" />
                <rect x={prot.x} y={prot.y} width={prot.w} height={prot.h} rx="4" fill="url(#hatch)" stroke="var(--color-series-2)" strokeWidth="1" />

                {/* printed values, so the read is never fill-dependent */}
                <text
                  x={risk.x + risk.w / 2}
                  y={w.risk >= 0 ? risk.y - 7 : risk.y + risk.h + 15}
                  textAnchor="middle" fontSize="11" fontWeight="600" fill="var(--color-ink)"
                >
                  {fmt(w.risk)}
                </text>
                <text
                  x={prot.x + prot.w / 2}
                  y={w.prot >= 0 ? prot.y - 7 : prot.y + prot.h + 15}
                  textAnchor="middle" fontSize="11" fontWeight="500" fill="var(--color-ink-2)"
                >
                  {fmt(w.prot)}
                </text>
              </g>
            );
          })}

          {/* x labels */}
          {waves.map((w, i) => (
            <text key={`x${i}`} x={cx[i]} y={H - 30} textAnchor="middle" fontSize="11" fill="var(--color-ink-3)">
              {w.tag.replace(" · ", " ")}
            </text>
          ))}

          {/* legend */}
          <g fontSize="11">
            <rect x={L} y={H - 18} width="11" height="11" rx="2.5" fill="var(--color-series-1)" />
            <text x={L + 17} y={H - 9} fill="var(--color-ink-2)">Risk index</text>
            <rect x={L + 92} y={H - 18} width="11" height="11" rx="2.5" fill="url(#hatch)" stroke="var(--color-series-2)" strokeWidth="1" />
            <text x={L + 109} y={H - 9} fill="var(--color-ink-2)">Protective index</text>
            <text x={W - R} y={H - 9} textAnchor="end" fill="var(--color-ink-4)">
              σ from this section&rsquo;s baseline
            </text>
          </g>
        </svg>
      </div>

      <table className="sr-only">
        <caption>Index values by wave, in standard deviations from this section&rsquo;s baseline</caption>
        <thead>
          <tr><th>Wave</th><th>Responses</th><th>Risk index</th><th>Protective index</th></tr>
        </thead>
        <tbody>
          {waves.map((w) => (
            <tr key={w.tag}><td>{w.tag}</td><td>{w.n}</td><td>{fmt(w.risk)}</td><td>{fmt(w.prot)}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
