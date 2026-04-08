# CLAUDE.md — React Portfolio Website Rules

## Project Goal
Build and maintain a personal portfolio website in React.

This project is a modern, scalable, and easy-to-maintain portfolio landing page with the following sections:

- Header / Navbar
- Hero
- About
- Skills
- Experience
- Projects
- Tech Stack
- Contact
- Footer

The website should feel premium, minimal, professional, and personal.  
The codebase must be clean, modular, and easy to extend in the future.

---

## Core Working Principles

- Always prioritize clean architecture over quick hacks.
- Always write code that is readable and easy to refactor.
- Always prefer reusable components over duplicated markup.
- Always keep the project scalable for future sections like Projects, Testimonials, Blog, or Services.
- Never create messy monolithic components.
- Never mix layout, business logic, and hardcoded content unnecessarily.
- Never use placeholder structure that will be hard to maintain later.

---

## Tech Stack Defaults

Unless explicitly told otherwise, use:

- React
- Vite
- JavaScript (or TypeScript only if requested)
- CSS Modules or a clean global CSS structure
- Responsive, mobile-first design
- Semantic HTML
- Accessible components

If styling is needed, prefer one consistent approach across the whole app.  
Do not mix many styling systems unless requested.

---

## Architecture Rules

Always organize the project by responsibility and scalability.

Preferred structure:

```bash
src/
├── assets/
│   ├── images/
│   │   ├── profile/
│   │   ├── backgrounds/
│   │   └── projects/
│   ├── icons/
│   └── logos/
│
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── SectionTitle.jsx
│       ├── Card.jsx
│       └── Container.jsx
│
├── sections/
│   ├── Hero/
│   │   ├── Hero.jsx
│   │   └── Hero.module.css
│   ├── About/
│   │   ├── About.jsx
│   │   └── About.module.css
│   ├── Skills/
│   │   ├── Skills.jsx
│   │   └── Skills.module.css
│   ├── Experience/
│   │   ├── Experience.jsx
│   │   └── Experience.module.css
│   ├── Projects/
│   │   ├── Projects.jsx
│   │   └── Projects.module.css
│   ├── TechStack/
│   │   ├── TechStack.jsx
│   │   └── TechStack.module.css
│   ├── Contact/
│   │   ├── Contact.jsx
│   │   └── Contact.module.css
│
├── data/
│   ├── personalInfo.js
│   ├── skills.js
│   ├── experience.js
│   └── techStack.js
│
├── hooks/
│   └── useScrollSpy.js
│
├── utils/
│   ├── constants.js
│   └── helpers.js
│
├── styles/
│   ├── globals.css
│   ├── variables.css
│   └── reset.css
│
├── App.jsx
└── main.jsx
```