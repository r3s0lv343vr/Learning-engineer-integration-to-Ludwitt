import type { Candle } from "@/lib/content/markets";

export function CandleChart({
  title,
  candles,
}: {
  title: string;
  candles: Candle[];
}) {
  const lows = candles.map((c) => c.l);
  const highs = candles.map((c) => c.h);
  const min = Math.min(...lows);
  const max = Math.max(...highs);
  const span = Math.max(max - min, 0.0001);

  return (
    <div className="panel rounded-2xl p-4">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h3 className="display text-lg text-[var(--gold)]">{title}</h3>
        <span className="text-xs text-[var(--muted)]">Simulated decision tape</span>
      </div>
      <div className="candle">
        {candles.map((c, i) => {
          const top = ((max - c.h) / span) * 100;
          const wickH = ((c.h - c.l) / span) * 100;
          const bodyTop = ((max - Math.max(c.o, c.c)) / span) * 100;
          const bodyH = (Math.abs(c.c - c.o) / span) * 100;
          const up = c.c >= c.o;
          return (
            <div key={`${c.t}-${i}`} className="candle-col h-full">
              <div
                className="candle-wick"
                style={{ top: `${top}%`, height: `${wickH}%` }}
              />
              <div
                className={`candle-body ${up ? "up" : "down"}`}
                style={{
                  top: `${bodyTop}%`,
                  height: `${Math.max(bodyH, 2)}%`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
