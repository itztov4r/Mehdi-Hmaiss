# Repository audit — 4 November 2026

Source reviewed: `b9bf0d4d1a99bc843e69e6b362183b4671ef1f33` on `main`. Changes are proposed on `audit/repository-improvements-2026-11-04`; nothing was merged or deployed.

## Changes

- Make the hidden intro inert, focus its skip control when replaying and restore focus after dismissing it.
- Reject whitespace-only required contact fields and clear custom errors during editing.
- Preserve project filters, themes, image fallbacks and the mailto contact flow.

## Verification

0 automated behavioral tests passed. All 1 recorded source/test checks passed. Local verification used Node.js 26.12.0 and Python 3.15.0; CI should also confirm the configured deployment versions.

- `node --check for repository JavaScript files`

Local HTML asset references were compared with the complete GitHub file inventory. Real desktop/mobile visual verification was blocked in this environment: the in-app preview could not reach the local server and the desktop browser did not expose a usable window. No claim of browser/device acceptance is made. Automated DOM/canvas simulations, where present, do not replace that check.

## Remaining limits and rollout

- No authentication or database. The contact form opens a local mail client; it does not send mail from a backend.
- External photos/fonts require network access; local fallback paths were checked against the repository inventory.
