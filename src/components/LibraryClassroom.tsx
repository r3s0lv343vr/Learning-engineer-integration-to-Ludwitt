"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import type { ClassroomLesson } from "@/lib/content/classroom";
import type { GameState } from "@/lib/types";
import { portfolioValue } from "@/lib/game-state";
import { ClassroomFigureView } from "@/components/ClassroomFigure";

/**
 * Shared Library Classroom shell for every city library.
 * Layout, Slides vertical scroll, and tools are identical; only theme colour + lesson content change.
 */
export function LibraryClassroom({
  lesson,
  state,
}: {
  lesson: ClassroomLesson;
  state: GameState;
}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [showLinks, setShowLinks] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [askText, setAskText] = useState("");
  const [askReply, setAskReply] = useState<string | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const thumbListRef = useRef<HTMLDivElement>(null);

  const slide = lesson.slides[slideIndex] ?? lesson.slides[0];
  const total = lesson.slides.length;

  const filteredSlides = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return lesson.slides.map((s, index) => ({ s, index }));
    return lesson.slides
      .map((s, index) => ({ s, index }))
      .filter(({ s }) => {
        const inFigure =
          s.figure &&
          (s.figure.caption.toLowerCase().includes(q) ||
            ("lines" in s.figure &&
              s.figure.lines.some((line) => line.toLowerCase().includes(q))) ||
            ("headers" in s.figure &&
              s.figure.headers.some((h) => h.toLowerCase().includes(q))));
        return (
          s.title.toLowerCase().includes(q) ||
          s.thumbLabel.toLowerCase().includes(q) ||
          s.bullets.some((b) => b.toLowerCase().includes(q)) ||
          Boolean(inFigure)
        );
      });
  }, [lesson.slides, query]);

  const xpCurrent = state.completedModules.length * 140 + state.goldBars * 20;
  const xpNext = Math.max(2000, Math.ceil((xpCurrent + 1) / 500) * 500);
  const level = 1 + Math.floor(state.completedModules.length / 3);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "PageDown") {
        setSlideIndex((i) => Math.min(total - 1, i + 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        setSlideIndex((i) => Math.max(0, i - 1));
      } else if (e.key === "Escape") {
        setFullscreen(false);
        setShowLinks(false);
        setAskOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1101px)");
    const apply = () => {
      document.body.style.overflow = mq.matches ? "hidden" : "";
    };
    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const list = thumbListRef.current;
    if (!list) return;
    const active = list.querySelector<HTMLElement>(".classroom-thumb.active");
    if (!active) return;
    // Keep scrolling inside the Slides panel only — never move the page/board.
    const listTop = list.scrollTop;
    const listBottom = listTop + list.clientHeight;
    const itemTop = active.offsetTop;
    const itemBottom = itemTop + active.offsetHeight;
    if (itemTop < listTop) {
      list.scrollTo({ top: itemTop - 8, behavior: "smooth" });
    } else if (itemBottom > listBottom) {
      list.scrollTo({
        top: itemBottom - list.clientHeight + 8,
        behavior: "smooth",
      });
    }
  }, [slideIndex, filteredSlides]);

  const portalNumber = Math.min(
    lesson.moduleEnd,
    Math.max(lesson.moduleStart, lesson.moduleStart + slideIndex),
  );

  function askLibrarian() {
    const q = askText.trim() || slide.title;
    setAskReply(
      `Librarian: For “${q}”, use this teaching board and Download Notes for this city’s materials. Linked sites and slides will expand as this library is authored.`,
    );
  }

  return (
    <div
      className={`classroom-room ${fullscreen ? "is-fullscreen" : ""}`}
      style={
        {
          "--classroom-accent": lesson.themeColor,
          "--classroom-accent-deep": lesson.themeColorDeep,
        } as CSSProperties
      }
    >
      <header className="classroom-top">
        <div className="classroom-brand">
          <span className="classroom-brand-icon" aria-hidden />
          <div>
            <p className="classroom-brand-kicker">Library Classroom</p>
            <p className="classroom-brand-sub">{lesson.topic}</p>
          </div>
        </div>
        <label className="classroom-search">
          <span className="sr-only">Search lessons</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search lessons, topics, or resources…"
          />
        </label>
        <nav className="classroom-top-icons" aria-label="Classroom tools">
          <Link href={`/quest/m${portalNumber}`} title="Quests">
            Quests
            {state.unlockedModules.length > 0 && (
              <span className="classroom-badge">{state.unlockedModules.length}</span>
            )}
          </Link>
          <Link href="/portfolio" title="Journal / book">
            Journal
          </Link>
          <Link href="/formulae" title="Skills desk">
            Skills
          </Link>
          <a href="#classroom-help" title="Help">
            Help
          </a>
        </nav>
      </header>

      <div className="classroom-body">
        <aside className="classroom-left">
          <section className="classroom-panel classroom-thumbs">
            <div className="classroom-thumbs-head">
              <h2>Slides</h2>
              <span className="classroom-thumbs-count">
                {slideIndex + 1} / {total}
              </span>
            </div>
            <div
              className="classroom-thumb-list"
              ref={thumbListRef}
              role="listbox"
              aria-label="Slide titles"
              tabIndex={0}
            >
              {filteredSlides.map(({ s, index: i }) => (
                <button
                  key={s.id}
                  type="button"
                  role="option"
                  aria-selected={i === slideIndex}
                  className={`classroom-thumb ${i === slideIndex ? "active" : ""}`}
                  onClick={() => setSlideIndex(i)}
                  title={s.title}
                >
                  <span className="classroom-thumb-num">{s.number}</span>
                  <span className="classroom-thumb-preview">
                    <strong>{s.thumbLabel}</strong>
                    <em>{s.title}</em>
                  </span>
                </button>
              ))}
            </div>
          </section>
        </aside>

        <section className="classroom-stage" aria-label="Teaching board">
          <div className="classroom-board-chrome">
            <div>
              <p className="classroom-lesson-label">{lesson.title}</p>
              <p className="classroom-slide-count">
                Slide {slide.number} / {total}
              </p>
            </div>
            <div className="classroom-board-actions">
              <button
                type="button"
                className="classroom-chip"
                onClick={() => setFullscreen((v) => !v)}
              >
                {fullscreen ? "Exit full" : "Fullscreen"}
              </button>
              <button
                type="button"
                className="classroom-chip"
                disabled={slideIndex <= 0}
                onClick={() => setSlideIndex((i) => Math.max(0, i - 1))}
              >
                Prev
              </button>
              <button
                type="button"
                className="classroom-chip primary"
                disabled={slideIndex >= total - 1}
                onClick={() => setSlideIndex((i) => Math.min(total - 1, i + 1))}
              >
                Next
              </button>
            </div>
          </div>

          <article
            className="classroom-board"
            style={{ ["--slide-accent" as string]: slide.accent }}
          >
            <div className="classroom-board-frame" aria-hidden>
              <span className="corner tl" />
              <span className="corner tr" />
              <span className="corner bl" />
              <span className="corner br" />
            </div>
            <div className="classroom-board-inner">
              <div className="classroom-board-seal" aria-hidden />
              <p className="classroom-board-kicker">Teaching board · PowerPoint lesson</p>
              <h1>{slide.title}</h1>
              {slide.subtitle && <p className="classroom-board-sub">{slide.subtitle}</p>}
              <ul>
                {slide.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              {slide.figure ? <ClassroomFigureView figure={slide.figure} /> : null}
              {slide.footer && <p className="classroom-board-footer">{slide.footer}</p>}
            </div>
          </article>

          <div className="classroom-board-foot">
            <a className="classroom-chip" href={lesson.deckHref} download={lesson.deckDownloadName}>
              Download PowerPoint
            </a>
            <Link className="classroom-chip primary" href={`/quest/m${portalNumber}`}>
              Open matching portal
            </Link>
          </div>
        </section>

        <aside className="classroom-right">
          <section className="classroom-panel">
            <h2>Classroom Tools</h2>
            <div className="classroom-tools">
              <a
                className="classroom-tool"
                href={lesson.notesHref}
                download={lesson.notesDownloadName}
              >
                <span className="classroom-tool-icon icon-notes" aria-hidden />
                <span>
                  <strong>Download Notes</strong>
                  <em>Get a copy of the lesson notes.</em>
                </span>
              </a>
              <button
                type="button"
                className="classroom-tool"
                onClick={() => {
                  setShowLinks((v) => !v);
                  setAskOpen(false);
                }}
              >
                <span className="classroom-tool-icon icon-globe" aria-hidden />
                <span>
                  <strong>View Linked Sites</strong>
                  <em>Explore related web readings.</em>
                </span>
              </button>
              <button
                type="button"
                className="classroom-tool"
                onClick={() => {
                  setAskOpen((v) => !v);
                  setShowLinks(false);
                }}
              >
                <span className="classroom-tool-icon icon-ask" aria-hidden />
                <span>
                  <strong>Ask the Librarian</strong>
                  <em>Get help on this slide.</em>
                </span>
              </button>
            </div>

            {showLinks && (
              <ul className="classroom-links" id="classroom-help">
                {lesson.linkedSites.map((site) => (
                  <li key={site.id}>
                    <a href={site.url} target="_blank" rel="noreferrer">
                      {site.title}
                      <span>{site.platform}</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {askOpen && (
              <div className="classroom-ask">
                <textarea
                  rows={3}
                  value={askText}
                  onChange={(e) => setAskText(e.target.value)}
                  placeholder="Ask about this slide…"
                />
                <button type="button" className="classroom-chip primary" onClick={askLibrarian}>
                  Ask
                </button>
                {askReply && <p>{askReply}</p>}
              </div>
            )}
          </section>

          <section className="classroom-panel classroom-current">
            <h2>Current Lesson</h2>
            <p className="classroom-current-subject">{lesson.subject}</p>
            <p className="classroom-current-topic">{lesson.topic}</p>
            <p className="classroom-current-meta">
              Book ${portfolioValue(state).toLocaleString()} · {state.goldBars} gold ·{" "}
              {state.hearts}/{state.maxHearts} hearts
            </p>
          </section>

          <section className="classroom-quote">
            <div className="classroom-quote-ink" aria-hidden />
            <p>“{lesson.quote.text}”</p>
            <footer>— {lesson.quote.author}</footer>
          </section>
        </aside>
      </div>

      <footer className="classroom-footer">
        <Link href="/map" className="classroom-exit">
          Return to Map
        </Link>
        <nav className="classroom-dock" aria-label="Classroom navigation">
          <Link href="/portfolio">Backpack</Link>
          <Link href="/formulae">Skills</Link>
          <button type="button" onClick={() => setAskOpen(true)}>
            Messages
          </button>
        </nav>
        <div className="classroom-xp">
          <span>
            Level {level} Explorer
          </span>
          <div
            className="classroom-xp-bar"
            role="progressbar"
            aria-valuenow={xpCurrent}
            aria-valuemin={0}
            aria-valuemax={xpNext}
          >
            <i style={{ width: `${Math.min(100, (xpCurrent / xpNext) * 100)}%` }} />
          </div>
          <span>
            {xpCurrent.toLocaleString()} / {xpNext.toLocaleString()} XP
          </span>
        </div>
      </footer>
    </div>
  );
}
