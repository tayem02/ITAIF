# ITAIF 2026 Presentation

Cinematic 16:9 web presentation for:

1. Event opening
2. Session 1 introduction — The Power of AI in Business
3. Pixel-faithful images of every original Session 1 PowerPoint slide

## Run

```powershell
npm install
npm run dev
```

Open the local URL shown in the terminal. The presentation works offline after dependencies and assets are installed.

## Import the PowerPoint

Place `01______ITAIF2026_Power_of_AI_in_Business.pptx` in the project root, then run:

```powershell
npm run import:pptx
```

The importer uses Microsoft PowerPoint on Windows to render every source slide at 1920×1080 into `public/slides`, preserving the final PowerPoint appearance. It also extracts the most likely speaker photograph to `public/speaker.jpg`; verify that candidate before the event.

To import from another location:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/import-pptx.ps1 -Path "C:\path\deck.pptx"
```

## Controls

- Next: Right Arrow, Down Arrow, Space, Page Down
- Previous: Left Arrow, Up Arrow, Backspace, Page Up
- First/last: Home / End
- Fullscreen: `F` (or `Esc` to exit)

The slide position is stored in the URL hash, so refreshing keeps the current slide.
