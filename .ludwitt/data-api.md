# Hosted-Data API

The hosted-data API gives apps registered with `useHostedStorage: true` a
zero-backend JSON document store. Documents are scoped to **(your app, this
user)** automatically — there is no API to read a different user's data, and
there is no API to spread data across apps.

If your app is BYOB (`useHostedStorage: false`), all of these endpoints
return `403 hosted_storage_disabled`.

## Storage model

```
your_app
  └── users
        └── alice                   ← scoped from the bearer token, not the URL
              ├── notes              ← collection (declared at registration)
              │     ├── note-001    ← docId you choose
              │     └── note-002
              └── sessions
                    └── 2026-05-03
```

- A **collection** is a named bucket (e.g. `notes`, `sessions`). Declared at
  app registration; at most 32 collections per app.
- A **docId** is a name you choose (e.g. `note-001`). Up to 64 characters,
  `[a-zA-Z0-9_-]` only — no slashes, no dots, no Unicode.
- A **document** is a JSON value (object, array, primitive). Up to 256 KB
  serialized.
- **Storage is private to (app, user)** — your app sees only the data you
  stored on behalf of the authenticated user.

## Endpoints

### Write a document
```
PUT /api/v1/data/:collection/:docId
Authorization: Bearer <access_token>      # scope: data:write
Content-Type: application/json

{ "data": { ...your json... } }
```

Optional headers:
- `If-Match: "<etag>"` — conditional write; rejects with 412 if the stored
  ETag doesn't match. Use this for read-modify-write loops.

Response (200):
```json
{
  "etag": "<32-hex-char etag>",
  "sizeBytes": 247,
  "quota": { "docCount": 12, "totalBytes": 4823, "quota": { ...caps... } }
}
```

### Read a document
```
GET /api/v1/data/:collection/:docId
Authorization: Bearer <access_token>      # scope: data:read
```

Response (200):
```json
{
  "data": { ...your json... },
  "etag": "<32-hex-char etag>",
  "updatedAt": "2026-05-03T12:34:56.789Z",
  "sizeBytes": 247,
  "expiresAt": "2026-06-01T00:00:00.000Z"   // present only if _ttl is set
}
```

ETag is also returned as the standard `ETag: "..."` HTTP header.

404 if the document doesn't exist OR has expired (see TTL below).

### Delete a document
```
DELETE /api/v1/data/:collection/:docId
Authorization: Bearer <access_token>      # scope: data:write
```

Optional `If-Match: "<etag>"` for conditional delete.

Response (200):
```json
{ "ok": true, "quota": { ...updated quota... } }
```

### List documents in a collection
```
GET /api/v1/data/:collection
  ?limit=50                          # default 50, max 200
  &cursor=<opaque>                   # from a previous page's nextCursor
  &where=field:value                 # equality filter on a declared indexed field
  &orderBy=field                     # asc; prefix with - for desc; defaults to docId asc
Authorization: Bearer <access_token>  # scope: data:read
```

Response (200):
```json
{
  "docs": [
    { "docId": "note-001", "data": {...}, "etag": "...", "updatedAt": "...", "sizeBytes": 247 },
    ...
  ],
  "nextCursor": "<opaque-string-or-null>"
}
```

`nextCursor` is null when you've reached the end. Pass it back as `?cursor=`
to get the next page. Cursors are opaque — don't try to parse them.

### Read your storage usage
```
GET /api/v1/data/_meta/usage
Authorization: Bearer <access_token>      # scope: data:read
```

Response (200):
```json
{
  "docCount": 12,
  "totalBytes": 4823,
  "quota": {
    "maxDocCountPerUser": 1000,
    "maxBytesPerUser": 10485760,
    "maxDocBytes": 262144
  },
  "storageTier": "hosted",
  "revenueShareEngineerPct": 35
}
```

Use this to render "X of Y MB used" in your UI.

## Filtering with `?where=`

`where` is a single equality filter: `field:value`. Both field name and value
are URL-encoded.

- The `field` must be one of the `indexedFields` you declared for this
  collection at registration (max 3 per collection).
- The `value` is treated as an opaque string — no JSON parsing, no operators,
  no globs.
- Compound filters, range filters, and `OR` are not supported in v1.

Example:
```
GET /api/v1/data/notes?where=priority:high&orderBy=-updatedAt
```

To declare a new indexed field, edit the app's registration on Ludwitt
(adding fields is admin-mediated today; this is on the v2 roadmap).

## TTL — auto-deleting documents

If you declared `ttlEnabled: true` for a collection at registration, you may
set a `_ttl` field in the document body containing an ISO timestamp:

```json
{
  "data": {
    "_ttl": "2026-06-01T00:00:00.000Z",
    "title": "Reminder",
    "body": "..."
  }
}
```

Documents past their `_ttl` are:
- excluded from `GET` and list responses (we surface them as 404 / omit),
- physically deleted by Firestore's TTL sweeper within 24 hours.

`_ttl` is the only underscore-prefixed field name allowed in document
bodies. All other underscore-prefixed names are reserved for Ludwitt and
return 400.

## ETags + optimistic concurrency

Every write returns a fresh `etag`. Reads return both a JSON `etag` field
and a standard `ETag: "..."` header.

To avoid lost updates, store the ETag from your last GET, then send it on
the next PUT or DELETE as `If-Match: "..."`. If another writer (or another
of your own retries) modified the doc since your read, you get **412
Precondition Failed** — re-read, merge, retry.

Without `If-Match`, writes are last-write-wins.

## Quotas

Default per-(app, user) limits:

| Limit | Default |
|---|---|
| `maxDocCountPerUser` | 1,000 |
| `maxBytesPerUser` | 10 MB (10,485,760 bytes) |
| `maxDocBytes` | 256 KB (262,144 bytes) |

Hitting a quota returns **413 Payload Too Large** with details:
```json
{
  "error": "quota_exceeded",
  "error_description": "would exceed maxBytesPerUser (10485760)",
  "details": { "currentBytes": 10000000, "attemptedBytes": 10500000, "maxBytes": 10485760 }
}
```

Quotas are admin-tunable per app; reach out if you need more.

## Reserved keys in document bodies

These keys are rejected with 400:
- Anything starting with `_` (Ludwitt-reserved namespace)
  — except `_ttl`, which is the documented sentinel
- `__proto__`, `constructor`, `prototype` (prototype-pollution defense)

## What you must protect

The bearer token is the only credential proving the user authorized your app.
Treat it like any other access secret:
- Never expose it in browser-side code (a public client app must use PKCE
  and skip the secret entirely)
- Never log it, never email it, never store it unencrypted
- Rotate via the refresh token flow before each access expires
- Revoke via `/api/oauth/revoke` on user logout

If a token leaks, `POST /api/oauth/revoke` immediately. Your app continues
to work for other users — only the affected user is signed out.

## Lifecycle events you should plan for

| Event | What happens |
|---|---|
| User revokes your app | Tokens revoked instantly. Subsequent calls return 401 `access_revoked`. Their data enters a 30-day grace window — preserved if they re-authorize, deleted otherwise. |
| User deletes their Ludwitt account | After Ludwitt's 90-day GDPR grace, all their data in your app is purged. |
| You disable your app (or admin disables) | All tokens for all users are revoked. User data enters a 90-day grace, then is purged. |
| You miss billing on Ludwitt | Doesn't affect storage; storage is paid for via revenue share, not directly. |
