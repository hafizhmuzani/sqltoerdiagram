# 🗂️ dbdiga

Paste a SQL schema script → get a clean, interactive ER diagram. Free, fast, and
runs **entirely in your browser** — no server, no signup, nothing leaves the page.

![dbdiga](https://img.shields.io/badge/deps-2-blue) ![bundle](https://img.shields.io/badge/bundle-22KB%20gzip-brightgreen)

## Why

Every other SQL-diagram tool is either paywalled, ugly, or slow. dbdiga is a single
static page that:

- Parses `CREATE TABLE` / `ALTER TABLE` DDL (MySQL, Postgres, SQL-Server-ish).
- Renders tables on a **canvas** with cached bitmaps + viewport culling, so it stays
  smooth at **hundreds of tables** (benchmarked ~120fps while zooming 300 tables / 593 FKs).
- **Declutters dense schemas**: FK lines are soft by default; **hover** a table to
  highlight just its relationships, **click** to pin focus (fades every unrelated
  table and line). Click empty space to clear.
- **Edit on the canvas → SQL updates**: **double-click** a table name, column name,
  or column type to edit it inline. The change is applied as a *surgical text edit*
  to your SQL (comments, formatting and unsupported clauses are preserved), and a
  table rename automatically updates every `REFERENCES` to it.
- **Add columns**: click a table to pin it, then **+ add column**. The new column is
  inserted into your SQL with a default type for the selected **dialect**
  (PostgreSQL / MySQL / SQLite / SQL Server), and opens inline so you can name it.
  Editing a column type shows dialect-aware type suggestions.
- **Your arrangement is saved**: drag tables wherever you like — positions and the
  camera persist automatically, so reloading restores your exact layout instead of
  re-arranging. Editing SQL keeps your manual positions; only brand-new tables get
  auto-placed (beside the rest). **Arrange** re-runs auto-layout when you want it.
- **Save / Open projects**: **Save** downloads a `.dbdiga.json` (SQL + layout + camera
  + dialect); **Open** loads one back. Keep multiple diagrams or share them.
- **Share link**: **Share** copies a URL with the entire project (SQL + node positions
  + camera + dialect) encoded in the URL hash — gzip-compressed + base64. The data
  lives in the link itself (the `#…` fragment is never sent to a server), so sharing
  needs **no backend**. Opening the link restores the exact diagram.
- **Annotations** (bottom-left palette): add **sticky notes** and **group boxes** to
  label and cluster sections. Drag to move, drag the corner to resize, double-click to
  edit text, click to select (colour swatches + delete), or press Delete. They're part
  of the diagram — included in save, share links, and PNG/SVG exports.
- **Overlap-free layout**: auto-arrange runs a separation pass so no two tables overlap.
- **Hide the SQL panel** (⬚ in the toolbar) for a full-width diagram.
- **Syntax-highlighted SQL editor**: keywords / types / strings / comments / numbers
  are colored via a paint layer behind the textarea. Re-tokenizing is a single linear
  pass coalesced to one animation frame, so typing stays instant (~6ms full repaint on
  a 45KB / 300-table script, sub-ms on normal schemas).
- Lets you **drag** tables, **scroll/pinch to zoom**, pan, and **smart auto-arrange**:
  hub-aware layered layout (the most-connected table is placed on one side with its
  related tables aligned beside it), with **Horizontal/Vertical** direction and
  **Compact/Comfortable/Spacious** spacing options under the **Arrange ▾** menu.
- Exports **PNG** (raster) and **SVG** (vector).
- Has light + dark themes, and remembers your last schema locally.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build & host

```bash
npm run build    # outputs static files to dist/
```

`dist/` is plain static HTML/JS/CSS — drop it on any static host:

- **GitHub Pages** — push `dist/` to a `gh-pages` branch, or use an action.
- **Netlify / Vercel / Cloudflare Pages** — build command `npm run build`, publish dir `dist`.
- **Any web server / S3 bucket** — just upload the contents of `dist/`.

Preview the production build locally: `npm run preview`.

## Supported SQL

- `CREATE TABLE [IF NOT EXISTS] name ( ... )` with quoted / backtick / `[bracket]` / `schema.qualified` names.
- Inline column constraints: `PRIMARY KEY`, `NOT NULL`, `UNIQUE`, `REFERENCES other(col)`.
- Table-level constraints: `PRIMARY KEY (...)`, `UNIQUE (...)`,
  `FOREIGN KEY (...) REFERENCES other(...)`, `CONSTRAINT ... FOREIGN KEY ...`.
- `ALTER TABLE x ADD [CONSTRAINT ...] FOREIGN KEY (...) REFERENCES y(...)`.
- Line (`--`, `#`) and block (`/* */`) comments are ignored.

## Tech

- **Vite** — build + dev server.
- **@dagrejs/dagre** — layered auto-layout.
- Custom canvas renderer + SQL DDL parser (no heavy SQL-parser dependency).

## Shortcuts

- **⌘/Ctrl + Enter** — re-arrange.
- **Double-click** canvas — zoom in.
- Drag the divider between panes to resize the editor.
