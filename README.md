# For Zainab ❤️

A cinematic interactive 3D rooftop birthday experience — built with Next.js, React, Tailwind CSS, Framer Motion, GSAP, and Three.js (`@react-three/fiber` + `drei`).

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Adding your own assets (placeholders are used out of the box)

### Photos for the memory gallery
Drop images into `public/images/` named:

```
public/images/memory-1.jpg
public/images/memory-2.jpg
...
public/images/memory-8.jpg
```

(Captions live in `lib/content.js` — edit freely.)

### Music & ambient audio
Drop these files into `public/audio/`:

```
public/audio/music.mp3      ← romantic background track (toggled by the radio / nav)
public/audio/ambient.mp3    ← city / wind ambience (toggled in the top-right HUD)
```

If the files aren't there, the toggles silently do nothing — no errors thrown.

### Text content
All copy lives in `lib/content.js`. Open it and rewrite freely:
- `memories` — gallery captions
- `loveNotes` — long-form notes
- `openWhenLetters` — "open when…" cards
- `playlist` — songs
- `reasons` — 100 reasons (currently 99 + a final one)
- `dreams` — future-dreams cards
- `telescopeQuotes` — quotes shown when zooming via the telescope
- `lanternMessages` — hidden notes inside lanterns

## What to click in the scene
- 🌙 **Moon** → triggers the magical "Zainab ❤" star animation in the sky
- 🎂 **Birthday cake** → confetti + birthday message
- 🔭 **Telescope** → zooms into the night sky with romantic quotes
- 🖼 **Polaroid wall** → opens the memory gallery
- 📻 **Radio** → toggles the romantic background music
- 🏮 **Lanterns (5 of them)** → each reveals a hidden love note
- 📽 **Projector screen** → opens "Future Dreams Together"
- 🤫 **Hidden ❤** somewhere on the rooftop railing → easter egg
- ✨ **Finale button** (top-right) → fireworks, floating hearts, and the final message

## Folder structure

```
app/
  layout.js              ← fonts + global wrapping
  page.js                ← entry
  globals.css            ← tailwind + glassmorphism utils
components/
  Experience.jsx         ← orchestrates phases (loading → intro → scene → finale)
  LoadingScreen.jsx
  IntroOverlay.jsx
  EasterEgg.jsx
  EndingSequence.jsx     ← canvas-based fireworks + GSAP cinematic lines
  audio/
    AudioProvider.jsx    ← shared music + ambience state
  ui/
    Hud.jsx              ← floating nav, audio toggles, finale button
  scene/
    RooftopScene.jsx     ← R3F Canvas root + lighting
    SceneCamera.jsx      ← parallax / breathing camera
    Sky.jsx              ← stars + shooting stars
    Clouds.jsx
    CitySkyline.jsx      ← procedural twinkling-window city
    Rooftop.jsx          ← floor + railing
    FairyLights.jsx
    Cushions.jsx
    CakeTable.jsx
    PolaroidWall.jsx
    Telescope.jsx
    MusicPlayer.jsx
    Lanterns.jsx
    ProjectorScreen.jsx
    Moon.jsx              ← clickable, with halo
    Fireflies.jsx         ← instanced sprite swarm
    StarNameMagic.jsx     ← samples "Zainab ❤" pixels into 3D star particles
    Hotspot.jsx           ← reusable hover-glow + click wrapper
  modals/
    Modal.jsx             ← base glass modal
    ModalRouter.jsx
    GalleryModal.jsx
    LoveNotesModal.jsx
    OpenWhenModal.jsx
    PlaylistModal.jsx
    ReasonsModal.jsx
    DreamsModal.jsx
    TelescopeModal.jsx
    CakeModal.jsx
    LanternModal.jsx
    MusicHintModal.jsx
    EasterEggModal.jsx
lib/
  content.js              ← every piece of editable text
public/
  images/                 ← drop memory photos here
  audio/                  ← drop music.mp3 + ambient.mp3 here
```

## Performance notes
- 3D scene mounts client-side only via `next/dynamic` (`ssr: false`).
- `@react-three/drei`'s `PerformanceMonitor` + `AdaptiveDpr` automatically scale pixel-density on weaker devices.
- Geometry is kept low-poly; only a handful of point lights are used. Bulbs and lanterns are emissive materials with sprite halos rather than real lights.
- The "Zainab ❤" star storm uses an `InstancedMesh` so thousands of points are one draw call.
- Camera respects `prefers-reduced-motion` indirectly via the Tailwind global rule.

Made with all my love. Happy birthday, Zainab. ❤️
