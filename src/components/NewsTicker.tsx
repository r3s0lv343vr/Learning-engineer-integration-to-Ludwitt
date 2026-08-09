import type { NewsItem } from "@/lib/content/news";

export function NewsTicker({ items }: { items: NewsItem[] }) {
  const line = items.map((n) => `${n.source}: ${n.title}`).join("   •   ");
  return (
    <div className="news-ticker rounded-xl">
      <span>
        {line}   •   {line}
      </span>
    </div>
  );
}
