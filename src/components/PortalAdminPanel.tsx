"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { AreaId } from "@/lib/content/areas";
import {
  portalMaterialKindLabel,
  type PortalCatalogDoc,
  type PortalMaterialKind,
} from "@/lib/portal-types";
const FILE_KINDS: { id: PortalMaterialKind; label: string }[] = [
  { id: "pdf", label: "PDF / reading" },
  { id: "document", label: "Document" },
  { id: "video", label: "Video file" },
  { id: "diagram", label: "Diagram / image" },
];

const LINK_KINDS: { id: PortalMaterialKind; label: string }[] = [
  { id: "video", label: "Video link (YouTube / Vimeo / web)" },
  { id: "news", label: "News article" },
  { id: "link", label: "Web link" },
  { id: "pdf", label: "Online PDF / document link" },
];

export function PortalAdminPanel({
  areaId,
  areaName,
  moduleId,
  moduleNumber,
  moduleTitle,
  baseSummary,
  baseLesson,
  baseScenario,
  baseOutcome,
  initialDoc,
}: {
  areaId: AreaId;
  areaName: string;
  moduleId: string;
  moduleNumber: number;
  moduleTitle: string;
  baseSummary: string;
  baseLesson: string;
  baseScenario: string;
  baseOutcome: string;
  initialDoc: PortalCatalogDoc;
}) {
  const router = useRouter();
  const [doc, setDoc] = useState(initialDoc);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);

  const [summary, setSummary] = useState(initialDoc.text.summary ?? baseSummary);
  const [lesson, setLesson] = useState(initialDoc.text.lesson ?? baseLesson);
  const [scenario, setScenario] = useState(
    initialDoc.text.scenario ?? baseScenario,
  );
  const [outcome, setOutcome] = useState(initialDoc.text.outcome ?? baseOutcome);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [kind, setKind] = useState<PortalMaterialKind>("pdf");
  const [file, setFile] = useState<File | null>(null);

  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkKind, setLinkKind] = useState<PortalMaterialKind>("video");

  function refresh(next: PortalCatalogDoc) {
    setDoc(next);
    startTransition(() => router.refresh());
  }

  async function saveText(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/portals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update_text",
        moduleId,
        summary,
        lesson,
        scenario,
        outcome,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Could not save portal text");
      return;
    }
    refresh(data.doc);
    setMessage("Portal teaching text updated (shell unchanged).");
  }

  async function resetText() {
    setSummary(baseSummary);
    setLesson(baseLesson);
    setScenario(baseScenario);
    setOutcome(baseOutcome);
    const res = await fetch("/api/portals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update_text",
        moduleId,
        summary: "",
        lesson: "",
        scenario: "",
        outcome: "",
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Could not reset text");
      return;
    }
    refresh(data.doc);
    setMessage("Restored base portal text from syllabus.");
  }

  async function uploadFile(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setMessage("Choose a PDF, document, video, or diagram file.");
      return;
    }
    const form = new FormData();
    form.set("moduleId", moduleId);
    form.set("title", title || file.name);
    form.set("description", description);
    form.set("kind", kind);
    form.set("file", file);
    const res = await fetch("/api/portals", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Upload failed");
      return;
    }
    refresh({ ...doc, materials: [...doc.materials, data.item] });
    setTitle("");
    setDescription("");
    setFile(null);
    setMessage(`Uploaded “${data.item.title}” to Portal M${moduleNumber} only.`);
  }

  async function attachLink(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/portals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "link",
        moduleId,
        title: linkTitle || "Portal link",
        url: linkUrl,
        kind: linkKind,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Could not attach link");
      return;
    }
    refresh({ ...doc, materials: [...doc.materials, data.item] });
    setLinkTitle("");
    setLinkUrl("");
    setMessage(`Attached link to Portal M${moduleNumber} only.`);
  }

  async function removeItem(id: string) {
    const res = await fetch("/api/portals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "remove", moduleId, id }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      setMessage(data.error ?? "Remove failed");
      return;
    }
    refresh({ ...doc, materials: doc.materials.filter((m) => m.id !== id) });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
            Portal administrator · {areaName}
          </p>
          <h1 className="display mt-1 text-2xl text-[var(--gold)]">
            M{moduleNumber} · {moduleTitle}
          </h1>
          <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">
            Review and improve teaching text, or upload PDFs, documents, videos,
            diagrams, and news/video links for this portal only. Map icons and
            positions are never changed here.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link className="btn btn-ghost text-sm" href={`/admin/portals/${areaId}`}>
            City portals
          </Link>
          <Link className="btn btn-ghost text-sm" href={`/quest/${moduleId}`}>
            Preview portal
          </Link>
        </div>
      </div>

      <form
        onSubmit={saveText}
        className="rounded-xl border border-[var(--path)]/30 bg-black/20 p-4 space-y-3"
      >
        <h2 className="font-bold text-[var(--gold)]">Review / improve portal text</h2>
        <p className="text-xs text-[var(--muted)]">
          Overlays summary, lesson, scenario, and outcome only — portal shell stays
          standard.
        </p>
        <label className="block text-sm">
          Summary
          <textarea
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
            rows={2}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          Lesson
          <textarea
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
            rows={5}
            value={lesson}
            onChange={(e) => setLesson(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          Scenario
          <textarea
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
            rows={3}
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          Outcome
          <textarea
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
            rows={2}
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
          />
        </label>
        <div className="flex flex-wrap gap-2">
          <button type="submit" className="btn btn-forest" disabled={pending}>
            Save text overlay
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={resetText}
            disabled={pending}
          >
            Restore syllabus text
          </button>
        </div>
      </form>

      <section className="rounded-xl border border-[var(--path)]/30 bg-black/25 p-4">
        <h2 className="font-bold text-[var(--gold)]">Portal materials</h2>
        <p className="mt-1 text-xs text-[var(--muted)]">
          {doc.materials.length} item(s) assigned to this portal / city
        </p>
        <div className="mt-3 space-y-3">
          {doc.materials.length === 0 && (
            <p className="text-sm text-[var(--muted)]">No materials yet.</p>
          )}
          {doc.materials.map((item) => {
            const external =
              item.source === "link" || /^https?:\/\//i.test(item.href);
            return (
              <article
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--path)]/25 bg-black/30 p-4"
              >
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--accent)]">
                    {portalMaterialKindLabel(item.kind)}
                    {item.platform ? ` · ${item.platform}` : ""}
                    {` · ${item.source}`}
                  </p>
                  <h3 className="font-bold text-[var(--gold)]">{item.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{item.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    className="btn btn-gold text-sm"
                    href={item.href}
                    {...(external
                      ? { target: "_blank", rel: "noreferrer" }
                      : { download: item.downloadName })}
                  >
                    Open
                  </a>
                  <button
                    type="button"
                    className="btn btn-ghost text-sm"
                    onClick={() => removeItem(item.id)}
                    disabled={pending}
                  >
                    Remove
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={uploadFile}
          className="rounded-xl border border-[var(--path)]/30 bg-black/20 p-4"
        >
          <h3 className="font-bold text-[var(--gold)]">Upload file</h3>
          <p className="mt-1 text-xs text-[var(--muted)]">
            PDF, documents, videos, diagrams — scoped to this portal
          </p>
          <label className="mt-3 block text-sm">
            Title
            <input
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="mt-3 block text-sm">
            Kind
            <select
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
              value={kind}
              onChange={(e) => setKind(e.target.value as PortalMaterialKind)}
            >
              {FILE_KINDS.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.label}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-3 block text-sm">
            Description
            <textarea
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label className="mt-3 block text-sm">
            File
            <input
              className="mt-1 block w-full text-sm"
              type="file"
              accept=".pdf,.doc,.docx,.txt,.mp4,.webm,.mov,.png,.jpg,.jpeg,.webp,.svg,.gif"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
          <button type="submit" className="btn btn-forest mt-4" disabled={pending}>
            Upload to this portal
          </button>
        </form>

        <form
          onSubmit={attachLink}
          className="rounded-xl border border-[var(--path)]/30 bg-black/20 p-4"
        >
          <h3 className="font-bold text-[var(--gold)]">Add link</h3>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Videos, news articles, or other web readings
          </p>
          <label className="mt-3 block text-sm">
            Title
            <input
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
              value={linkTitle}
              onChange={(e) => setLinkTitle(e.target.value)}
            />
          </label>
          <label className="mt-3 block text-sm">
            Kind
            <select
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
              value={linkKind}
              onChange={(e) => setLinkKind(e.target.value as PortalMaterialKind)}
            >
              {LINK_KINDS.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.label}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-3 block text-sm">
            URL
            <input
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://"
              required
            />
          </label>
          <button type="submit" className="btn btn-forest mt-4" disabled={pending}>
            Attach link to this portal
          </button>
        </form>
      </div>

      {message && (
        <p className="rounded-lg bg-black/30 px-3 py-2 text-sm text-[var(--muted)]">
          {message}
        </p>
      )}
    </div>
  );
}
