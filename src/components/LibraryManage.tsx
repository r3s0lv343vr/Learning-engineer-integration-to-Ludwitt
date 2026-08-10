"use client";

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
  { id: "pdf", label: "PDF" },
  { id: "ebook", label: "E-book" },
  { id: "paper", label: "Paper" },
  { id: "powerpoint", label: "PowerPoint" },
  { id: "infographic", label: "Infographic" },
  { id: "jpeg", label: "JPEG" },
] as const;

export function LibraryManage({
  areaId,
  initialItems,
}: {
  areaId: AreaId;
  initialItems: LibraryCatalogItem[];
}) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [kind, setKind] = useState<(typeof FILE_KINDS)[number]["id"]>("notes");
  const [file, setFile] = useState<File | null>(null);
  const [linkTitle, setLinkTitle] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [platform, setPlatform] = useState<(typeof PLATFORMS)[number]["id"]>("web");

  function refresh(next: LibraryCatalogItem[]) {
    setItems(next);
    startTransition(() => router.refresh());
  }

  async function uploadFile(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setMessage("Choose a PDF, e-book, paper, or PowerPoint file.");
      return;
    }
    const form = new FormData();
    form.set("areaId", areaId);
    form.set("title", title || file.name);
    form.set("description", description);
    form.set("kind", kind);
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
    setMessage(`Uploaded “${data.item.title}”.`);
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
    setMessage(`Attached ${platform} link.`);
  }

  async function removeItem(id: string) {
    const res = await fetch("/api/library", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "remove", id }),
    });
    const data = await res.json();
    if (!data.ok) {
      setMessage("Seed library titles stay on the shelf; only uploads/links can be removed.");
      return;
    }
    refresh(items.filter((i) => i.id !== id));
  }

  return (
    <div className="mt-8 space-y-6">
      <div>
        <h2 className="display text-xl text-[var(--accent)]">Library shelf</h2>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Notes · PDFs · e-books · papers · PowerPoints · YouTube / X / LinkedIn / web links
        </p>
        <div className="mt-3 space-y-3">
          {items.map((item) => {
            const external = item.kind === "link";
            return (
              <article
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--path)]/30 bg-black/25 p-4"
              >
                <div>
                  <p className="text-xs uppercase tracking-wide text-[var(--accent)]">
                    {libraryItemKindLabel(item.kind)}
                    {item.platform ? ` · ${item.platform}` : ""}
                    {item.source !== "seed" ? ` · ${item.source}` : ""}
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
                  {item.source !== "seed" && (
                    <button
                      type="button"
                      className="btn btn-ghost text-sm"
                      onClick={() => removeItem(item.id)}
                      disabled={pending}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          onSubmit={uploadFile}
          className="rounded-xl border border-[var(--path)]/30 bg-black/20 p-4"
        >
          <h3 className="font-bold text-[var(--gold)]">Upload reading</h3>
          <p className="mt-1 text-xs text-[var(--muted)]">
            PDF notes, ebooks, papers, PowerPoint slides
          </p>
          <label className="mt-3 block text-sm">
            Title
            <input
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Purple City chapter notes"
            />
          </label>
          <label className="mt-3 block text-sm">
            Kind
            <select
              className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2"
              value={kind}
              onChange={(e) => setKind(e.target.value as typeof kind)}
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
              accept=".pdf,.epub,.ppt,.pptx,.png,.jpg,.jpeg,.webp"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>
          <button type="submit" className="btn btn-forest mt-4" disabled={pending}>
            Upload to library
          </button>
        </form>

        <form
          onSubmit={attachLink}
          className="rounded-xl border border-[var(--path)]/30 bg-black/20 p-4"
        >
          <h3 className="font-bold text-[var(--gold)]">Attach link</h3>
          <p className="mt-1 text-xs text-[var(--muted)]">
            YouTube, X, LinkedIn, or any web reading
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
            Attach link
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
