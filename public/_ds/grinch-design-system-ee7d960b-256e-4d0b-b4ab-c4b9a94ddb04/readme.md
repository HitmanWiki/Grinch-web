# $GRINCH Design System

Brand and UI system for **$GRINCH** — *Pepe Grinch on TON*, a crypto meme token.
Built to power `grinchpepe.vip` pages — starting with the **$GRINCH Content Contest** landing page.

> **Source note:** No codebase, Figma, or screenshots of the live site were provided. This
> system was derived from the written **Content Contest build brief** (final copy + explicit
> design notes: bg `#050505`, neon green `#39FF14`, near-white text `#F2FBF0`, gold `#FFD43B`
> for the podium). Treat the visual choices below as a faithful interpretation of that brief —
> confirm against the real site and replace fonts / logo / OG image with the genuine assets.

---

## Vibe
Dark crypto + Pepe meme energy. Near-black canvas, **glowing neon-green** headers and CTAs,
**gold** reserved exclusively for the top-3 podium. Bold, clean, generously spaced, mobile-first.
No clutter, no gradients-for-the-sake-of-it. The glow *is* the brand.

---

## CONTENT FUNDAMENTALS
How $GRINCH copy reads (from the brief):

- **Voice:** confident, punchy, meme-aware but not silly. Short declaratives.
  *"This is not a giveaway."* / *"Good luck."* / *"Don't get Grinched."*
- **Person:** uses **"we"** for the project ("We are looking for the best writers…") and
  addresses the entrant implicitly ("who should enter"). Not heavily "you"-driven.
- **Casing:** Title Case or sentence case for body; **UPPERCASE** reserved for eyebrow labels
  and the display hero. The cashtag is always written `$GRINCH` (uppercase, dollar prefix).
- **Numbers:** abbreviated crypto style — `6M`, `2.0M`, `1.25M`, `750K`, `500K`, always
  suffixed `$GRINCH`.
- **Signature sign-off:** every page ends *"Don't get Grinched."* and the meta line
  `grinchpepe.vip/contest • $GRINCH — Pepe Grinch on TON • Don't get Grinched`.
- **Emoji:** none in the brief. Avoid emoji; use the neon check/dot markers and badges instead.
- **Tone words:** competition, narrative, effort, consistency, ecosystem, skin in the game.

---

## VISUAL FOUNDATIONS

- **Colors** — Background `#050505`; surface ramp `#0A0C0A → #10130F → #161A14`. Primary accent
  neon green `#39FF14` (`--neon`), pressed `#2AD60F`. Podium gold `#FFD43B` (`--gold`) is the
  *only* second accent and is reserved for top-3 / prize emphasis. Text near-white `#F2FBF0`,
  muted greenish-gray `#9BB39A`, dim `#5E6B5D`.
- **Type** — Display **Bungee** (chunky, uppercase, glowing hero + section numbers).
  Body **Space Grotesk** (clean techy, 400–700). Mono **Space Mono** for the countdown,
  prize amounts, and the footer meta line. *(All substitutions — see source note.)*
- **Spacing** — 4px base step. Section vertical rhythm `--space-9` (96px). Single column,
  max width `720px` (`--container`), 24px gutters. Tap targets ≥ 48px.
- **Backgrounds** — flat near-black. The one decorative element is a soft **radial neon glow**
  behind the hero (`radial-gradient` of `--neon` at low alpha). No photos, no full-bleed
  imagery, no repeating textures.
- **Glow / shadow** — the defining motif. `--glow-neon` / `--glow-neon-strong` on the CTA and
  active borders; `--text-glow-neon` / `--text-glow-gold` on headers and numerals. Depth from
  darkness + glow rather than soft drop shadows (`--shadow-card` is subtle).
- **Borders** — 1px hairlines in `--neon-a18` (faint) or `--neon-a40` (strong); gold cards use
  `--gold-a40`. No heavy borders.
- **Corner radii** — `sm 6 / md 12 / lg 20 / pill`. Buttons and badges are **pill**; cards are
  `lg`; rows are `md`.
- **Cards** — dark raised surface (`--surface-raised`), 1px neon border, `lg` radius. `glow`
  prop adds the neon halo; `accent="gold"` switches to the gold treatment for podium content.
- **Hover** — lift `translateY(-2px)` + intensify glow (CTA), border brightens to solid neon
  (outline). **Press** — handled by the lift returning; no shrink.
- **Motion** — `--dur 200ms` with `--ease-out` (cubic-bezier(.22,1,.36,1)). Fades/lifts only,
  no bounces. Countdown ticks once per second. Sticky mobile CTA slides up past 600px scroll.
- **Transparency / blur** — sticky header uses `rgba(5,5,5,0.82)` + `backdrop-filter: blur(12px)`.
  Glow backdrops use low-alpha radial gradients.

---

## ICONOGRAPHY
The brief specifies **no icon set**. This system uses:
- A small inline **SVG neon check** and a **glowing dot** as the only iconography
  (see `ChecklistItem`) — stroke-style, drop-shadowed to glow.
- An arrow glyph `→` (unicode) on CTAs.
- Rank **medallions** (numerals in a pill) for the prize table.
- **No emoji, no icon font.** If a real icon set surfaces on the live site, copy it into
  `assets/` and document it here. A `$GRINCH` logo / mascot and the site OG image are **not yet
  provided** — `assets/` is intentionally empty; supply them to replace the text logo and the
  empty `og:image`.

---

## Index / manifest

Root:
- `styles.css` — global entry (imports only). Consumers link this.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css`.
- `foundations/` — specimen cards (Colors, Type, Spacing, Effects) for the Design System tab.
- `SKILL.md` — Agent-Skill front matter for use in Claude Code.

Components (`window.GRINCHDesignSystem_*` namespace — run `check_design_system` for the exact suffix):
- `components/core/` — **Button**, **Badge**, **Card**.
- `components/contest/` — **ChecklistItem**, **PrizeRow**, **CountdownTimer**.

UI kits:
- `ui_kits/contest/` — the full **$GRINCH Content Contest** landing page (`index.html` +
  `ContestLanding.jsx`). Mobile-first single page: hero → what we want → duration/countdown →
  judging → bonus → prize table → spirit → footer CTA, plus a sticky mobile CTA.

Generated (do not edit): `_ds_bundle.js`, `_ds_manifest.json`, `_adherence.oxlintrc.json`.

---

## CAVEATS
- **Fonts are substitutions** (Bungee / Space Grotesk / Space Mono via Google Fonts CDN) — not
  the real grinchpepe.vip typefaces, and not self-hosted. Provide the genuine `.woff2` files.
- **No logo / mascot / OG image** — the `$GRINCH` wordmark is rendered as glowing text and
  `og:image` is empty. Supply assets to finalize.
- **Final CTA link** ("X hashtag or Telegram") is a placeholder `#` — Fabio to confirm.
- Visual interpretation derived from the brief only; verify against the live site.
