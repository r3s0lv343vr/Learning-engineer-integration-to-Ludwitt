"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { AreaId } from "@/lib/content/areas";
import {
  libraryItemKindLabel,
  type LibraryCatalogItem,
} from "@/lib/library-types";

const PLATFORMS = [
  { id: "youtube", label: "YouTube" },
  { id: "x", label: "X" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "web", label: "Web" },
] as const;

const FILE_KINDS = [
  { id: "notes", label: "Notes (PDF)" },
  { id: "powerpoint", label: "PowerPoint / teaching deck" },
  { id: "pdf", label: "PDF" },
  { id: "ebook", label: "E-book" },
  { id: "paper", label: "Paper" },
  { id: "infographic", label: "Infographic" },
  { id: "jpeg", label: "JPEG" },
] as const;

const CLASSROOM_ROLES = [
  { id: "notes", label: "Classroom → Download Notes" },
  { id: "deck", label: "Classroom → Download PowerPoint" },
  { id: "link", label: "Classroom → Linked Sites" },
  { id: "none", label: "Shelf only (not on classroom buttons)" },
] as const;

export function LibraryAdminPanel({
  areaId,
  areaName,
  initialItems,
}: {
  areaId: AreaId;
  areaName: string;
  initialItems: LibraryCatalogItem[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [kind, setKind] = useState<(typeof FILE_KINDS)[number]["id"]>("notes");
  const [classroomRole, setClassroomRole] =
    useState<(typeof CLASSROOM_ROLES)[number]["id"]>("notes");
  const [file, setFile] = useState<File | null>(null);
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [platform, setPlatform] = useState<(typeof PLATFORMS)[number]["id"]>("web");

  const custom = items.filter((i) => i.source !== "seed");
  const seed = items.filter((i) => i.source === "seed");

  function refresh(next: LibraryCatalogItem[]) {
    setItems(next);
    startTransition(() => router.refresh());
  }

  async function uploadFile(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setMessage("Choose a PowerPoint, PDF notes, or other library file.");
      return;
    }
    const form = new FormData();
    form.set("areaId", areaId);
    form.set("title", title || file.name);
    form.set("description", description);
    form.set("kind", kind);
    form.set("classroomRole", classroomRole);
    form.set("file", file);
    const res = await fetch("/api/library", { method: "POST", body: form });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Upload failed");
      return;
    }
    refresh([...items, data.item]);
    setTitle("");
    setDescription("");
    setFile(null);
    setMessage(`Uploaded “${data.item.title}” to ${areaName} only.`);
  }

  async function attachLink(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/library", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "link",
        areaId,
        title: linkTitle || "Reading link",
        url: linkUrl,
        platform,
        classroomRole: "link",
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error ?? "Could not attach link");
      return;
    }
    refresh([...items, data.item]);
    setLinkTitle("");
    setLinkUrl("");
    setMessage(`Attached link to ${areaName} only.`);
  }

  async function removeItem(id: string) {
    const res = await fetch("/api/library", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "remove", areaId, id }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      setMessage(
        data.error === "admin_required"
          ? "Administrator access required."
          : "Seed titles stay on the shelf; only uploads/links can be removed.",
      );
      return;
    }
    refresh(items.filter((i) => i.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
            Library administrator · single city
          </p>
          <h1 className="display mt-1 text-2xl text-[var(--gold)]">{areaName}</h1>
          <p className="mt-1 max-w-2xl text-sm text-[var(--muted)]">
            Uploads and links here apply only to this library area. The learner
            Library Classroom shell is unchanged — admin materials overlay Notes,
            PowerPoint, and Linked Sites behind the existing buttons.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link className="btn btn-ghost text-sm" href="/admin/library">
            All libraries
          </Link>
          <Link
            className="btn btn-ghost text-sm"
            href={`/library/${areaId}/classroom`}
          >
            Preview classroom
          </Link>
        </div>
      </div>

      <section className="rounded-xl border border-[var(--path)]/30 bg-black/25 p-4">
        <h2 className="font-bold text-[var(--gold)]">Admin materials (this area)</h2>
        <p className="mt-1 text-xs text-[var(--muted)]">
          {custom.length} upload(s) / link(s) · seed shelf stays read-only
        </p>
        <div className="mt-3 space-y-3">
          {custom.length === 0 && (
            <p className="text-sm text-[var(--muted)]">
              No admin uploads yet for this city.
            </p>
          )}
          {custom.map((item) => {
            const external = item.kind === "link";
            return (
              <article
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--path)]/25 bg-black/30 p-4"
              >
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--accent)]">
                    {libraryItemKindLabel(item.kind)}
                    {item.platform ? ` · ${item.platform}` : ""}
                    {item.classroomRole ? ` · classroom: ${item.classroomRole}` : ""}
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
                    {external ? "Open" : "Download"}
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
          <h3 className="font-bold text-[var(--gold)]">Upload PowerPoint / notes</h3>
          <p className="mt-1 text-xs text-[var(--muted)]">
            PDF notes, teaching decks (PDF/PPTX), papers — scoped to {areaName}
          </p>
          <label className="mt-3 block text-sm">
            Title
            <input
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="City teaching deck"
            />
          </label>
          <label className="mt-3 block text-sm">
            Kind
            <select
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
              value={kind}
              onChange={(e) => {
                const next = e.target.value as typeof kind;
                setKind(next);
                if (next === "powerpoint") setClassroomRole("deck");
                else if (next === "notes" || next === "pdf") setClassroomRole("notes");
              }}
            >
              {FILE_KINDS.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.label}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-3 block text-sm">
            Classroom wiring
            <select
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
              value={classroomRole}
              onChange={(e) =>
                setClassroomRole(e.target.value as typeof classroomRole)
              }
            >
              {CLASSROOM_ROLES.filter((r) => r.id !== "link").map((r) => (
                <option key={r.id} value={r.id}>
                  {r.label}
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
              accept=".pdf,.epub,.ppt,.pptx,.png,.jpg,.jpeg,.webp"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
          <button type="submit" className="btn btn-forest mt-4" disabled={pending}>
            Upload to this library
          </button>
        </form>

        <form
          onSubmit={attachLink}
          className="rounded-xl border border-[var(--path)]/30 bg-black/20 p-4"
        >
          <h3 className="font-bold text-[var(--gold)]">Add linked reading</h3>
          <p className="mt-1 text-xs text-[var(--muted)]">
            YouTube, X, LinkedIn, or web — appears under View Linked Sites
          </p>
          <label className="mt-3 block text-sm">
            Title
            <input
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
              value={linkTitle}
              onChange={(e) => setLinkTitle(e.target.value)}
              placeholder="Mentor walkthrough"
            />
          </label>
          <label className="mt-3 block text-sm">
            Platform
            <select
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
              value={platform}
              onChange={(e) => setPlatform(e.target.value as typeof platform)}
            >
              {PLATFORMS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
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
            Attach link to this library
          </button>
        </form>
      </div>

      <section className="rounded-xl border border-[var(--path)]/20 bg-black/15 p-4">
        <h2 className="text-sm font-bold text-[var(--muted)]">
          Seed shelf (read-only · {seed.length})
        </h2>
        <ul className="mt-2 space-y-1 text-xs text-[var(--muted)]">
          {seed.map((item) => (
            <li key={item.id}>
              {libraryItemKindLabel(item.kind)} — {item.title}
            </li>
          ))}
        </ul>
      </section>

      {message && (
        <p className="rounded-lg bg-black/30 px-3 py-2 text-sm text-[var(--muted)]">
          {message}
        </p>
      )}
    </div>
  );
}
