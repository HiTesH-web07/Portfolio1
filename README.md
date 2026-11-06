# Hitesh Ahuja · Portfolio

"Curious by nature. Persistent by choice. A builder by passion."

A single-page portfolio with an illustrated avatar that changes pose through the story, scroll-driven engineering stories, and **Ask Hitesh**, an AI assistant grounded in the resume.

Live: https://hitesh-ahuja.embarko.app

## Stack

- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3
- GSAP + ScrollTrigger (text reveals, pinned Engineering Stories, counters, parallax)
- Framer Motion (buttons, cards, case-study dialog, chat messages, nav)
- Lucide icons; Space Grotesk, DM Sans and Instrument Serif, self-hosted through Fontsource
- Gemini API for Ask Hitesh, called only from the server route `src/app/api/chat/route.ts`

## Editing content

All text lives in **`src/data/content.ts`**: profile, journey, experience, projects, stories, skills, interests and the suggested chat questions. The assistant's knowledge base (`src/data/knowledge-base.ts`) is generated from the same file, so the site and the AI can never disagree.

Rule: only facts from the master resume. Unknown links are `null`; the UI then shows "to be added" instead of a dead button.

## Running locally

```bash
npm install
```

```bash
GEMINI_API_KEY=your-key npm run dev
```

Settings (environment variables, never committed):

| Name | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Ask Hitesh. Without it, the chat says it is not configured. |
| `GEMINI_MODEL` | Optional, defaults to `gemini-2.5-flash`. |
| `SITE_URL` | Optional, for canonical and Open Graph URLs. |

## Ask Hitesh safeguards

- Key stays on the server; the browser only calls `/api/chat`.
- Answers come only from the knowledge base; the prompt forbids inventing facts, sharing private data or naming integration clients.
- Disclosed as an AI assistant in the section copy, the chat header and the welcome message.
- 15 questions per visitor per 10 minutes, 300 per hour overall, 600 characters per message, last 10 turns only.
- Phone-number patterns are scrubbed from replies.

## Accessibility and motion

- `prefers-reduced-motion` turns off GSAP scenes, floating and blinking; content stays fully visible.
- Skip link, labelled landmarks, keyboard-closable dialog with focus return, 44px touch targets.
- Contrast checked in light and dark themes.

## The avatar

`src/components/avatar/Avatar.tsx` is one SVG character drawn from Hitesh's photos (swept-up dark hair with short sides, trimmed beard and moustache, olive bomber jacket over a black tee). Seven poses (wave, explore, laptop, think, puzzled, celebrate, closing) share the same head and body, so proportions never drift.

**Asset plan, if you want a 3D version later:** commission or render the same character as 3D stills in these seven poses, as transparent WebP at 1200px. Each can replace the SVG pose with the `<Avatar>` props unchanged.

## Placeholders still to fill

- Meeting-to-Action Closer: GitHub link
- SENSAI: live link, GitHub link, screenshot
- Kulies: description, stack and links beyond the internship work (marked "In progress")
- "Beyond the code" one-line descriptions: written for you, please confirm the wording
- Real company logos (typographic marks are used until genuine assets are provided)

## Deploy

Hosted on Embarko. `GEMINI_API_KEY` is set in the app's environment variables, not in the code.
