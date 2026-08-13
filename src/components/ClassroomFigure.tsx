import type { ClassroomFigure as Figure } from "@/lib/content/classroom";

/** Compact teaching-board diagrams — does not alter the classroom room shell. */
export function ClassroomFigureView({ figure }: { figure: Figure }) {
  if (figure.kind === "bars") {
    const max = Math.max(...figure.items.map((i) => i.value), 1);
    return (
      <figure className="classroom-figure">
        <figcaption>{figure.caption}</figcaption>
        <div className="classroom-figure-bars" role="img" aria-label={figure.caption}>
          {figure.items.map((item) => (
            <div key={item.label} className="classroom-figure-bar-row">
              <span className="classroom-figure-bar-label">{item.label}</span>
              <div className="classroom-figure-bar-track">
                <div
                  className="classroom-figure-bar-fill"
                  style={{
                    width: `${(item.value / max) * 100}%`,
                    background: item.color || "var(--slide-accent, var(--gold))",
                  }}
                />
              </div>
              <span className="classroom-figure-bar-value">
                {figure.unit === "%"
                  ? `${item.value}%`
                  : figure.unit === "$"
                    ? `$${item.value.toLocaleString()}`
                    : String(item.value)}
              </span>
            </div>
          ))}
        </div>
      </figure>
    );
  }

  if (figure.kind === "stack") {
    const total = figure.items.reduce((s, i) => s + i.value, 0) || 1;
    return (
      <figure className="classroom-figure">
        <figcaption>{figure.caption}</figcaption>
        <div
          className="classroom-figure-stack"
          role="img"
          aria-label={figure.caption}
        >
          {figure.items.map((item) => (
            <div
              key={item.label}
              className="classroom-figure-stack-seg"
              style={{
                flexGrow: item.value,
                background: item.color || "var(--slide-accent, var(--gold))",
              }}
              title={`${item.label}: ${((item.value / total) * 100).toFixed(0)}%`}
            >
              <span>
                {item.shortLabel ?? item.label}
                <br />
                {((item.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
        <ul className="classroom-figure-legend">
          {figure.items.map((item) => (
            <li key={item.label}>
              <i style={{ background: item.color || "var(--slide-accent)" }} />
              {item.label}
              {figure.showValues
                ? ` · $${item.value.toLocaleString()} (${((item.value / total) * 100).toFixed(0)}%)`
                : ""}
            </li>
          ))}
        </ul>
      </figure>
    );
  }

  if (figure.kind === "hierarchy") {
    return (
      <figure className="classroom-figure">
        <figcaption>{figure.caption}</figcaption>
        <ol className="classroom-figure-hierarchy">
          {figure.levels.map((level, idx) => (
            <li key={level.label}>
              <strong>
                {idx + 1}. {level.label}
              </strong>
              <span>{level.detail}</span>
            </li>
          ))}
        </ol>
      </figure>
    );
  }

  if (figure.kind === "flow") {
    return (
      <figure className="classroom-figure">
        <figcaption>{figure.caption}</figcaption>
        <div className="classroom-figure-flow" role="list">
          {figure.steps.map((step, idx) => (
            <div key={step} className="classroom-figure-flow-step" role="listitem">
              <span className="classroom-figure-flow-num">{idx + 1}</span>
              <span>{step}</span>
              {idx < figure.steps.length - 1 ? (
                <span className="classroom-figure-flow-arrow" aria-hidden>
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </figure>
    );
  }

  if (figure.kind === "table") {
    return (
      <figure className="classroom-figure">
        <figcaption>{figure.caption}</figcaption>
        <div className="classroom-figure-table-wrap">
          <table className="classroom-figure-table">
            <thead>
              <tr>
                {figure.headers.map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {figure.rows.map((row, i) => (
                <tr key={`${row[0]}-${i}`}>
                  {row.map((cell, j) => (
                    <td key={`${i}-${j}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </figure>
    );
  }

  // calc
  return (
    <figure className="classroom-figure classroom-figure--calc">
      <figcaption>{figure.caption}</figcaption>
      <pre className="classroom-figure-calc">
        {figure.lines.map((line) => (
          <code key={line}>{line}</code>
        ))}
      </pre>
    </figure>
  );
}
