# Sarah's Portfolio

A React + Tailwind portfolio, built with Vite. Includes:

1. **Intro section** (`src/components/Hero.jsx`) — avatar, name, role, one-line bio, on a white background.
2. **Perspective scroll section** (`src/components/PerspectiveScrollSection.jsx`) — a headline that tilts into place in 3D as you scroll, built with Motion.

## 1. Open the project

Unzip the folder and open it in VS Code:

```
code sarah-portfolio
```

## 2. Install dependencies and run it

```bash
bun install
bun run dev
```

Then open the local URL it prints (usually `http://localhost:5173`).

## 3. Make it yours

- `src/components/Hero.jsx` — edit the `PROFILE` object at the top (name, title, bio). Swap the initials avatar for a real photo by replacing the `<Avatar />` div with an `<img>` tag pointing at a photo in `public/`.
- `src/components/PerspectiveScrollSection.jsx` — edit the `LINES` array for your own headline copy.
- `tailwind.config.js` — the `ink` / `muted` / `accent` / `paper` colors are your palette; change `accent` if you want a different color than blue.

## 4. Adding the uselayouts component

`components.json` is already wired up with the `@uselayouts` registry, so your original command works as-is from the project root:

```bash
bunx --bun shadcn@latest add @uselayouts/perspective-text-scroll
```

This downloads the component into `src/components/ui/`. Since community registries change their exports between versions, once it's installed:

1. Open the new file in `src/components/ui/` and check what it exports (the component name and its props).
2. In `src/components/PerspectiveScrollSection.jsx`, replace the hand-built `<Line />` scroll effect with that component, passing it your headline text.
3. Run `bun run dev` again to see it.

The current `PerspectiveScrollSection.jsx` works on its own in the meantime — you don't need to install anything else to see the site running.

## 5. Build for deployment

```bash
bun run build
```

Outputs a static site to `dist/`, deployable to Vercel, Netlify, or any static host.
