# How This Portfolio Was Built

A guide to how [ananyacheripally.vercel.app](https://ananyacheripally.vercel.app) works: the tools behind it, how the code is organised, and how to update it.

---

## What's on the site

| Section | What you'll find |
|---|---|
| **Home** | "Hi, I'm Ananya Cheripally" with an illustrated character whose eyes follow the cursor |
| **About** | A short introduction, quick facts, and an island where the plane lands |
| **Skills** | Data Engineering, Databases & Modelling, Data Analysis & ML, plus technologies & tools |
| **Experience** | Software Engineer (part-time) and Business Analyst Intern roles |
| **Projects** | Filterable by Data Engineering, Databases and Machine Learning |
| **Education** | Degrees, scholarship and certifications (each certificate links to its verification page) |
| **Leadership & Volunteering** | Volunteering and student chapter roles |
| **Contact** | Contact form, email, LinkedIn, GitHub and résumé download |

---

## Tech stack

| Tool | What it does |
|---|---|
| [Next.js](https://nextjs.org) | The framework the site is built on: turns the code into fast web pages |
| [React](https://react.dev) | Builds the page from reusable components (Hero, Nav, Projects…) |
| [TypeScript](https://www.typescriptlang.org) | JavaScript with type checks, catching mistakes before they go live |
| [Tailwind CSS](https://tailwindcss.com) | Styling: colours, spacing and fonts written directly on each element |
| [Motion](https://motion.dev) + [Motion Primitives](https://motion-primitives.com) | Animations: text blurring in, cards fading in on scroll, the sliding menu highlight, magnetic buttons |
| [Lenis](https://lenis.darkroom.engineering) | Smooth, gliding scrolling |
| GitHub | Stores the code and every version of it |
| [Vercel](https://vercel.com) | Hosts the site and republishes it automatically on every push |

---

## How the code is organised

```
src/
├── app/
│   ├── page.tsx          ← the page: stacks all the sections in order
│   ├── layout.tsx        ← fonts + smooth scrolling for the whole site
│   └── globals.css       ← colours and all the little animations
├── content/
│   └── portfolio.ts      ← ALL the words: about, skills, projects, experience…
└── components/
    ├── Hero.tsx          ← "hi, I'm Ananya Cheripally" opening screen
    ├── Avatar.tsx        ← the illustrated character (drawn in code)
    ├── useEyeTracking.ts ← makes the eyes follow the cursor
    ├── Plane.tsx         ← the flying plane + dotted trail
    ├── Nav.tsx           ← the top menu
    ├── motion-primitives/← animation building blocks (from Motion Primitives)
    └── sections/         ← About + Island, Skills, Experience, Projects, Education, Contact…
public/
└── Ananya-Cheripally-Resume.pdf
```

**To change any text on the site, edit only [`src/content/portfolio.ts`](content/portfolio.ts).** Every section reads from that file automatically.

---

## How the fun parts work

- **The character** is an SVG: a drawing made from code (circles, curves and colours) rather than an image file. Because every part is a separate shape, the eyes can move on their own.
- **Eye tracking:** about 60 times a second, the code measures where the cursor is relative to each eye and nudges the pupils toward it. The character also blinks every few seconds.
- **The plane:** each section title has an invisible "landing pad". As you scroll, the code works out which two pads you're between, places the plane along a smooth S-curve between them, and caps its speed so it always glides slowly. The dotted trail is its last ~90 positions joined into a line.
- **Scroll effects:** the opening screen stays pinned while the name lifts away, then the next section slides up over it like a card.
- **Project filters:** choosing a tab filters the list, and Motion animates the cards rearranging.
- **Contact form:** opens the visitor's email app with their name, subject and message already filled in.

---

## How it was built

1. **Set up** an empty Next.js + Tailwind project and linked it to this GitHub repository.
2. **Connected Vercel** to the repository, so every push publishes the site automatically.
3. **Designed iteratively:** tried several styles (scrapbook, pencil, flat), characters and plane flights, keeping what worked.
4. **Built section by section:** hero, About + island, Skills, Experience, Projects, Education, Leadership, Contact, filling in real content along the way.
5. **Checked every change** before shipping: lint and type checks, a production build, and screenshots in a real browser on desktop and phone.
6. **Shipped:** committed each version, pushed it to GitHub, and Vercel put it live.

---

## Run it locally

You'll need [Node.js](https://nodejs.org) installed.

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the site at http://localhost:3000
```

Other commands:

```bash
npm run lint     # check the code for problems
npm run build    # build the production version (what Vercel runs)
```

## Updating the site

```
edit src/content/portfolio.ts  →  commit & push to GitHub  →  Vercel auto-publishes (~1 min)
```

You can also edit `src/content/portfolio.ts` directly on GitHub (open the file → ✏️ → **Commit changes**).

## Secrets

The site doesn't use any API keys or passwords. If one is ever needed, put it in a `.env.local` file (never committed; see `.gitignore`) and add it in Vercel under **Settings → Environment Variables**.
