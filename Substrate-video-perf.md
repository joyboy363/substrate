# Substrate Studio — Phase 1.5: Video payload fix

## Context (from your own phase 1 report)

You correctly flagged this in the "important gap" section: videos are the real payload driver, not images. Confirming: `firefly.mp4` (16.4 MB) + `hands-background.mp4` (2.7 MB) + `intro.mp4` (0.4 MB) = 19.5 MB, autoplaying on load, no lazy strategy.

Phase 1 image work is good and stays. Do NOT revert it. This is a second pass to add on top.

## Goals

Cut the 19.5 MB video payload by at least 60% and defer any video that isn't strictly above-the-fold, WITHOUT changing the cinematic feel of the site.

## Rules of engagement

### 1. Compression + format

For each of the three MP4 files (`firefly.mp4`, `hands-background.mp4`, `intro.mp4`):

1. Report current: dimensions, bitrate, codec, duration, file size.
2. Re-encode to H.264 (compatibility) OR H.265/HEVC (better compression, less compatible). Default to H.264 unless the file is currently already H.264 and huge, in which case try HEVC with an H.264 fallback via `<video>` `<source>` tags.
3. Target dimensions: **max 1920×1080** for hero videos, **max 1280×720** for background/ambient videos.
4. Target bitrate:
   - Hero video (foreground, focal): 2–4 Mbps
   - Ambient background video: 800 Kbps – 1.5 Mbps
5. Consider adding a **WebM/VP9 source** as the first `<source>` — smaller than H.264 at same quality, most modern browsers accept.
6. Do NOT drop resolution below 720p or bitrate below 800 Kbps for hero/foreground video — quality floor matters more than bytes.

### 2. Loading strategy

For each `<video>` tag currently rendering on the page:

1. Identify which video is truly above-the-fold on initial mobile viewport render (probably `hands-background.mp4` on the hero, based on Contact component using hand-logo separately).
2. **Above-the-fold video** (hero):
   - Keep autoplay + muted + playsinline + loop as-is
   - Add `preload="auto"` explicitly
   - Add a poster image (compressed WebP, the first frame or a designed still) so users see SOMETHING immediately while the video loads
3. **Below-the-fold video** (anything not visible on initial paint):
   - Change `preload="auto"` or default to `preload="none"` or `preload="metadata"`
   - Use IntersectionObserver to start loading only when the section is within ~200px of viewport
   - Add poster image so the section doesn't flash black
4. If any video is autoplaying but visually decorative (background loop that isn't essential to the message): consider whether a static image would carry the same aesthetic weight — flag but don't remove without approval.

### 3. Progressive delivery

If any file remains over 5 MB even after re-encoding:
- Consider splitting into a short intro loop (2-3 sec) that plays instantly and a longer version that loads in the background
- Or accept it as a hero-only load with a strong poster fallback

## Do NOT

- Remove any video without explicit approval — Diego picked those for a reason
- Alter the visual composition, cropping, or duration of any video
- Change any of the phase 1 image work
- Push or commit — Diego reviews first
- Enter phase 2 (JS work) — that's still gated

## Verification

After the pass:
- Report: total video payload before vs after
- Report: what encoding params were used per file
- Report: which videos got which loading strategy and why
- Confirm poster images exist for every deferred video
- Confirm `next build` still passes
- Do NOT run Lighthouse yourself — Diego will re-test after push

## Tooling note

If ffmpeg isn't in your environment, tell Diego — he'll need to install it (`winget install ffmpeg` on Windows) or run the encodes himself. Do NOT install system tools without asking.

Report findings and stop.
