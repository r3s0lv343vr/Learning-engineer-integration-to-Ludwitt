"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

/** 1 = full poster fit. Higher = expanded city scale (layout-sized, not CSS-blur scale). */
const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;
const DEFAULT_ZOOM = 1.35;
const ZOOM_STEP = 0.2;
const DRAG_THRESHOLD = 7;

type Pan = { x: number; y: number };

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function clampPan(pan: Pan, zoom: number, size: number): Pan {
  // Max travel so the oversized world can be explored without leaving empty void
  const overflow = Math.max(0, (zoom - 1) * size);
  const max = overflow * 0.5;
  return {
    x: clamp(pan.x, -max, max),
    y: clamp(pan.y, -max, max),
  };
}

/**
 * Pan + zoom viewport. Zoom changes the world's layout size (width/height)
 * so the poster stays sharp — avoids blurry CSS transform upscaling.
 */
export function MapPanZoom({
  children,
  overlay,
}: {
  children: ReactNode;
  overlay?: ReactNode;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [pan, setPan] = useState<Pan>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);

  const dragRef = useRef<{
    id: number;
    startX: number;
    startY: number;
    origin: Pan;
    moved: boolean;
  } | null>(null);
  const suppressClickRef = useRef(false);

  const sizeOf = useCallback(() => {
    const el = viewportRef.current;
    return el ? Math.min(el.clientWidth, el.clientHeight) : 720;
  }, []);

  const setZoomClamped = useCallback(
    (next: number, anchorPan?: Pan) => {
      const z = clamp(next, MIN_ZOOM, MAX_ZOOM);
      setZoom(z);
      setPan((p) => clampPan(anchorPan ?? p, z, sizeOf()));
    },
    [sizeOf],
  );

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (e.button !== 0) return;
    if ((e.target as HTMLElement).closest("[data-map-chrome]")) return;
    if ((e.target as HTMLElement).closest("[data-coin-token]")) return;
    dragRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origin: pan,
      moved: false,
    };
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.moved && Math.hypot(dx, dy) >= DRAG_THRESHOLD) {
      d.moved = true;
      suppressClickRef.current = true;
    }
    if (!d.moved) return;
    setPan(clampPan({ x: d.origin.x + dx, y: d.origin.y + dy }, zoom, sizeOf()));
  }

  function endDrag(e: ReactPointerEvent<HTMLDivElement>) {
    const d = dragRef.current;
    if (!d || d.id !== e.pointerId) return;
    dragRef.current = null;
    setDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    if (d.moved) {
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
  }

  function onClickCapture(e: React.MouseEvent) {
    if (suppressClickRef.current) {
      e.preventDefault();
      e.stopPropagation();
      suppressClickRef.current = false;
    }
  }

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onResize = () => setPan((p) => clampPan(p, zoom, sizeOf()));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [zoom, sizeOf]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const dir = e.deltaY > 0 ? -1 : 1;
      setZoomClamped(zoom + dir * ZOOM_STEP * 0.7);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoom, setZoomClamped]);

  const pct = zoom * 100;

  return (
    <div className="map-stage">
      <div
        ref={viewportRef}
        className={`map-viewport ${dragging ? "dragging" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        role="presentation"
      >
        <div
          className="map-world"
          style={{
            width: `${pct}%`,
            height: `${pct}%`,
            left: `calc(50% - ${pct / 2}% + ${pan.x}px)`,
            top: `calc(50% - ${pct / 2}% + ${pan.y}px)`,
          }}
        >
          {children}
        </div>

        <div className="map-chrome" data-map-chrome>
          {overlay}
          <div className="map-zoom-controls" aria-label="Map zoom">
            <button
              type="button"
              className="map-zoom-btn"
              aria-label="Zoom in"
              title="Zoom in"
              onClick={() => setZoomClamped(zoom + ZOOM_STEP)}
            >
              +
            </button>
            <button
              type="button"
              className="map-zoom-btn"
              aria-label="Zoom out"
              title="Zoom out"
              onClick={() => setZoomClamped(zoom - ZOOM_STEP)}
            >
              −
            </button>
            <button
              type="button"
              className="map-zoom-btn map-zoom-reset"
              aria-label="Reset view"
              title="Reset view"
              onClick={() => {
                setZoom(DEFAULT_ZOOM);
                setPan({ x: 0, y: 0 });
              }}
            >
              ⌂
            </button>
            <span className="map-zoom-readout" aria-live="polite">
              {Math.round(zoom * 100)}%
            </span>
          </div>
          <p className="map-pan-hint">Drag to pan · scroll / + − to zoom</p>
        </div>
      </div>
    </div>
  );
}
