// Every word on the site lives here. Source of truth: Hitesh's master resume.
// Rule: never add a metric, link, client or achievement that is not in the resume.
// Missing information is `null` and the UI shows a clear "to be added" note instead of a dead button.

export const profile = {
  name: 'Hitesh Ahuja',
  firstName: 'Hitesh',
  role: 'Full-stack developer',
  title: 'Integration Solution Engineer at viaSocket',
  headline: 'Full-stack developer building web products end to end with React, Next.js and Node.js.',
  hero: {
    hello: "Hi, I'm Hitesh Ahuja.",
    tagline: ['Curious mind.', "Builder's energy.", 'Endless ideas.'],
    support:
      'Full-stack developer who builds products end to end: React and Next.js interfaces, Node.js backends, databases, and the automations that tie it all together.',
  },
  motto: 'Curious by nature. Persistent by choice. A builder by passion.',
  location: 'Indore, India',
  email: 'hiteshahuja633@gmail.com',
  linkedin: 'https://linkedin.com/in/hiteshahuja07',
  github: 'https://github.com/HiTesHweb07',
  resume: '/resume/Hitesh_Ahuja_Resume.pdf',
  about:
    '2026 B.Tech Computer Science graduate and full-stack developer. At Walkover I build features across the viaSocket SaaS platform, from the React and Next.js frontend to the Node.js backend, and I automate things: workflows that connect apps so people stop doing repetitive work. I design databases, write automated tests, debug across UI, API and data layers, and use AI coding tools (Claude Code) while reviewing and testing every line I ship.',
};

export type Pose = 'wave' | 'explore' | 'laptop' | 'think' | 'puzzled' | 'celebrate' | 'closing';

export const journey: { id: string; when: string; title: string; body: string; pose: Pose; tags: string[] }[] = [
  {
    id: 'begin',
    when: '2022 · Day one',
    title: 'Hello, World. Hello, Medi-Caps.',
    body: 'I walked into B.Tech Computer Science at Medi-Caps University, Indore, with one question I could not shake: how does software actually work? The answer started with C, C++ and a lot of data structures.',
    pose: 'wave',
    tags: ['B.Tech CSE', 'C / C++', 'DSA'],
  },
  {
    id: 'huddles',
    when: 'College years',
    title: 'Late-night huddles, loud ideas.',
    body: 'The best lessons happened after class: late-night huddles with friends, ideas sketched on whatever was nearby, and debugging sessions that ran past midnight. I learned the full stack by shipping, from React screens to Node.js APIs to PostgreSQL tables, and built SENSAI, an AI career coach on the Gemini API.',
    pose: 'explore',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Gemini API'],
  },
  {
    id: 'thinkdebug',
    when: 'Feb 2025 · First real codebase',
    title: 'Pull requests, code reviews, deadlines.',
    body: 'My internship at Think Debug put me inside a production codebase with six engineers and weekly sprints. On Kulies, a B2B2C e-commerce product, I built reusable React components, wired up REST APIs and made the frontend 18% faster.',
    pose: 'laptop',
    tags: ['Think Debug', 'Kulies', 'React', 'Redux Toolkit'],
  },
  {
    id: 'viasocket',
    when: 'May 2026 · Campus to corporate',
    title: 'Graduated, then straight into product.',
    body: 'I finished my degree in May 2026 and joined Walkover the same month. On viaSocket I work across the stack, from Next.js interfaces to Node.js services, and I automate things: workflows that connect apps so people stop doing the same task twice.',
    pose: 'think',
    tags: ['viaSocket', 'Next.js', 'Node.js', 'Automation'],
  },
  {
    id: 'next',
    when: 'Now',
    title: 'Building whole products, end to end.',
    body: 'On my own time I design, build and ship complete products: Meeting-to-Action Closer and Cairn, each with its own frontend, backend, database, tests and AI features. Next: bigger products and deeper AI.',
    pose: 'celebrate',
    tags: ['Full stack', 'AI products', 'Always learning'],
  },
];

export type Stat = { value: number; prefix?: string; suffix: string; label: string };

export const experience = [
  {
    id: 'viasocket',
    company: 'Walkover Web Solution',
    product: 'viaSocket',
    role: 'Integration Solution Engineer',
    when: 'May 2026 – Present',
    where: 'Indore, India (Remote)',
    summary:
      'I build and ship features across the full stack of viaSocket, a no-code AI automation platform: React and Next.js on the front, Node.js on the back. And I automate things, building multi-step workflows that connect apps so people stop doing repetitive work.',
    stats: [
      { value: 100000, suffix: '+', label: 'users on the viaSocket platform' },
      { value: 2200, suffix: '+', label: 'SaaS apps the platform connects' },
      { value: 100, suffix: '+', label: 'integration modules I built and maintain' },
    ] as Stat[],
    points: [
      'Build and ship product features across the React/Next.js frontend and the Node.js backend, and debug production issues across client, API and data layers.',
      'Turn UI/UX designs and wireframes into complete user flows: dynamic input forms with field validation and clear error handling.',
      'Automate business workflows: multi-step automations that connect apps on the platform.',
      'Designed, developed, tested and maintained 100+ reusable integration modules in Node.js, with OAuth 2.0, API keys, webhooks, pagination and JSON data mapping.',
      'Tested APIs against live endpoints and root-caused 4xx/5xx errors and pagination mismatches.',
      'Wrote technical documentation and worked with senior engineers, Product and Design through Git, pull requests and code reviews.',
      'Use AI coding tools to move faster, and test and review every line of AI-assisted code before handoff.',
    ],
    stack: ['Next.js', 'React', 'Node.js', 'Automation', 'OAuth 2.0', 'Webhooks'],
  },
  {
    id: 'thinkdebug',
    company: 'Think Debug',
    product: 'Kulies',
    role: 'Frontend Developer Intern',
    when: 'Feb 2025 – Apr 2025',
    where: 'Indore, India',
    summary:
      'I worked on Kulies, a B2B2C e-commerce application, delivering features on weekly sprint deadlines in a six-engineer Agile team.',
    stats: [
      { value: 15, suffix: '+', label: 'reusable responsive React components' },
      { value: 20, suffix: '+', label: 'REST APIs integrated with Axios' },
      { value: 18, suffix: '%', label: 'faster frontend after refactoring re-renders' },
      { value: 30, suffix: '+', label: 'defects debugged and resolved' },
    ] as Stat[],
    points: [
      'Developed 15+ reusable, responsive React components with Tailwind CSS, consistent across desktop, tablet and mobile.',
      'Integrated 20+ REST APIs with Axios, handling async data flow, loading and error states; managed shared state with Redux Toolkit.',
      'Improved frontend performance by 18% by refactoring components and reducing re-renders.',
      'Debugged and resolved 30+ defects with browser DevTools alongside backend engineers.',
      'Worked on product listing, cart, wishlist and real-time pricing.',
    ],
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Axios'],
  },
];

export type Project = {
  id: string;
  name: string;
  kicker: string;
  year: string;
  status?: string;
  short: string;
  problem: string;
  solution: string;
  contribution: string;
  highlights: string[];
  stack: string[];
  live: string | null;
  code: string | null;
  image: string | null;
  tone: 'forest' | 'sage' | 'clay' | 'paper' | 'ink';
};

export const projects: Project[] = [
  {
    id: 'cairn',
    name: 'Cairn',
    kicker: 'Latest build',
    year: '2026',
    short: 'Measures the value of work, not the volume: a ranked weekly Priority Stack, quality ratings and no tracking.',
    problem:
      'Teams often reward whoever looks busiest. Hours and activity counts say little about whether the most important work got done well.',
    solution:
      'Each person keeps a weekly ranked Priority Stack. Finished work is rated for quality, coins sit beside the score, and anyone can dispute a rating. There is no screen or activity tracking, and the AI helper explains and drafts but never scores anyone.',
    contribution:
      'Built it end to end: product idea, scoring rules, backend, frontend, design system, AI helper, integrations, tests and deployment.',
    highlights: [
      'I built the backend: a REST API on Node.js and Express with SQLite, covering people, weekly priorities, quality ratings and disputes.',
      'I built the frontend from scratch in vanilla JavaScript: a single-page app with light and dark themes, reduced-motion support and an accessibility contrast check on every screen.',
      'I built Ask Cairn, a Gemini-powered helper with a prompt-injection guard and per-user hourly limits. It explains and drafts, but never scores anyone.',
      'I connected Slack and Keka through viaSocket, added phone alerts through M91 and built password resets by email.',
      'I wrote 27 automated API tests.',
    ],
    stack: ['Node.js', 'Express', 'SQLite', 'JavaScript', 'Gemini API', 'viaSocket'],
    live: 'https://proof-of-impact.embarko.app',
    code: 'https://github.com/HiTesH-web07/Cairn',
    image: '/projects/cairn.webp',
    tone: 'ink',
  },
  {
    id: 'meeting-to-action',
    name: 'Meeting-to-Action Closer',
    kicker: 'Featured',
    year: '2026',
    short: 'Turns meeting transcripts into structured Asana tasks with AI and posts summaries to Slack.',
    problem:
      'Decisions made in meetings get lost between the transcript and the task tracker, and nobody follows up.',
    solution:
      'The app reads meeting transcripts, uses AI to turn decisions into structured Asana tasks and posts summaries to Slack. Task owners update status from Slack and it syncs back to Asana.',
    contribution:
      'Built, deployed and tested it end to end: UI, API, database and every integration.',
    highlights: [
      'I built the whole app and deployed it: the Next.js and React UI, the API, the database and every integration.',
      'I integrated the Asana, Slack, Google Calendar and Fireflies REST APIs, handling authentication, data mapping and errors.',
      'I built role-based access control and made every database write duplicate-safe.',
      'I modelled the relational data in PostgreSQL with Prisma ORM.',
      'I wrote 47 automated tests covering the core logic.',
    ],
    stack: ['Next.js', 'React', 'TypeScript', 'Prisma', 'PostgreSQL', 'REST APIs'],
    live: 'https://meeting-to-action-closer.embarko.app',
    code: null,
    image: '/projects/mtac.webp',
    tone: 'forest',
  },
  {
    id: 'sensai',
    name: 'SENSAI',
    kicker: 'AI career coach',
    year: '',
    short: 'An AI career coaching platform that generates resume and interview-prep guidance with the Gemini API.',
    problem: 'Job seekers need focused help with resumes and interview preparation.',
    solution:
      'A full-stack app that generates resume and interview-prep guidance through the Gemini API, with each feature behind its own REST API route.',
    contribution: 'Built the full stack: API routes, AI features, authentication and the database.',
    highlights: [
      'I built the AI features on the Gemini API, each behind its own REST API route.',
      'I added authentication and session management with Clerk.',
      'I designed the PostgreSQL schema and queried it through Prisma ORM.',
      'I improved load performance by 35% with a modular, API-based architecture.',
    ],
    stack: ['Next.js', 'React', 'Gemini API', 'Clerk', 'Prisma', 'PostgreSQL'],
    live: null,
    code: null,
    image: null,
    tone: 'sage',
  },
  {
    id: 'kulies',
    name: 'Kulies',
    kicker: 'B2B2C e-commerce',
    year: '2025',
    status: 'In progress',
    short: 'A B2B2C e-commerce platform I worked on during my Think Debug internship.',
    problem: 'A B2B2C store needs fast, consistent shopping flows across desktop, tablet and mobile.',
    solution:
      'During my internship I worked on product listing, cart, wishlist and real-time pricing in the React frontend.',
    contribution:
      'Frontend Developer Intern: reusable React components, REST API integrations with Axios, Redux Toolkit state and performance refactoring. Figures on this page are my internship contributions only.',
    highlights: [
      'I built 15+ reusable, responsive React components with Tailwind CSS.',
      'I integrated 20+ REST APIs with Axios and managed shared state with Redux Toolkit.',
      'I made the frontend 18% faster by refactoring components and cutting re-renders.',
      'I debugged and resolved 30+ defects with browser DevTools.',
    ],
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Node.js'],
    live: 'https://kulies.com/',
    code: null,
    image: null,
    tone: 'clay',
  },
];

// Engineering stories: real kinds of problems from the resume, across the stack, told as the process I follow.
export const stories = [
  {
    id: 'perf',
    label: 'Slow frontend',
    where: 'Frontend · Kulies at Think Debug',
    steps: {
      problem: {
        title: 'The UI does more work than it should.',
        body: 'Components re-render far more often than the data changes, and the page feels heavier than it is.',
        code: ['<ProductList/> render', '<ProductList/> render', '<ProductList/> render'],
      },
      investigation: {
        title: 'Find who renders, and why.',
        body: 'Trace renders with browser DevTools and look at which props and shared state trigger them.',
        code: ['props changed: none', 'state: shared slice', 'cause: too many re-renders'],
      },
      solution: {
        title: 'Refactor, then measure.',
        body: 'Refactor the components and cut the extra re-renders. The frontend got 18% faster.',
        code: ['renders: reduced', 'performance: +18%', 'shipped'],
      },
    },
  },
  {
    id: 'duplicates',
    label: 'Duplicate records',
    where: 'Database · Meeting-to-Action Closer',
    steps: {
      problem: {
        title: 'One meeting must never become two sets of tasks.',
        body: 'If the same transcript is processed more than once, a naive write would create every task again.',
        code: ['transcript #42 → 3 tasks', 'transcript #42 → 3 tasks', 'Asana: 6 tasks ✗'],
      },
      investigation: {
        title: 'Design the write path, not just the happy path.',
        body: 'Model the data in Prisma so every task has a stable identity, and look at every place a write can be repeated.',
        code: ['model ActionItem { … }', 'identity: meeting + item', 'repeat paths: listed'],
      },
      solution: {
        title: 'Duplicate-safe writes, proven by tests.',
        body: 'Make the writes duplicate-safe and cover the core logic with automated tests: 47 of them in the project.',
        code: ['transcript #42 → 3 tasks', 'replay → 0 new tasks', 'tests: 47 passing'],
      },
    },
  },
  {
    id: 'auth',
    label: 'Authentication failure',
    where: 'Backend · automations at viaSocket',
    steps: {
      problem: {
        title: 'An automation stops: 401 Unauthorized.',
        body: 'A workflow that should run keeps failing, and the only message is "failed".',
        code: ['POST /v1/records', '→ 401 Unauthorized', '{ "error": "invalid_token" }'],
      },
      investigation: {
        title: 'Read the request, not the guess.',
        body: 'Inspect the headers, validate the credentials and scopes, re-read the documentation and replay the call against the live endpoint in Postman.',
        code: ['Authorization: Bearer ••••', 'scope: read write ?', 'docs: token type, expiry'],
      },
      solution: {
        title: 'Fix the root cause, then prove it.',
        body: 'Correct the implementation, test the edge cases and verify the result against the live service before handoff.',
        code: ['POST /v1/records', '→ 200 OK', 'automation: running'],
      },
    },
  },
] as const;

export const skills = [
  { group: 'Frontend', icon: 'layout', items: ['React.js', 'Next.js', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS', 'HTML5', 'CSS3', 'Bootstrap 5'] },
  { group: 'Backend', icon: 'server', items: ['Node.js', 'Express.js', 'Next.js API Routes', 'REST APIs', 'Authentication (OAuth 2.0, Clerk)'] },
  { group: 'Databases', icon: 'database', items: ['PostgreSQL', 'MySQL', 'SQLite', 'Prisma ORM', 'Relational design'] },
  { group: 'Automation and integrations', icon: 'plug', items: ['Workflow automation', 'Webhooks', 'Third-party APIs', 'Pagination', 'JSON mapping', 'Postman'] },
  { group: 'Languages', icon: 'code', items: ['JavaScript (ES6+)', 'TypeScript', 'Java', 'Python', 'C', 'C++', 'SQL'] },
  { group: 'Testing and quality', icon: 'bug', items: ['Jest', 'Automated tests', 'Debugging', 'Code review', 'Agile/Scrum', 'Documentation'] },
  { group: 'Tools and AI', icon: 'sparkles', items: ['Git', 'GitHub', 'VS Code', 'Browser DevTools', 'Gemini API', 'Claude Code', 'ChatGPT', 'OpenRouter'] },
] as const;

export const fundamentals = ['Arrays', 'Trees', 'Graphs', 'Dynamic programming', 'BFS / Dijkstra', 'Binary search', 'Backtracking', 'Bitmask DP', 'OOP', 'MVC'];

export const certifications = [
  { name: 'IBM DevOps Foundation', year: '2026' },
  { name: 'IBM Agentic AI', year: '2026' },
  { name: 'IBM Generative AI', year: '2026' },
  { name: 'Cisco CCNA', year: '2025' },
];

export const education = [
  { school: 'Medi-Caps University, Indore', degree: 'B.Tech, Computer Science and Engineering', when: 'Aug 2022 – May 2026', note: 'CGPA 7.92/10 · No backlogs' },
  { school: 'Keshav International School, Jhabua', degree: 'Class 12 (CBSE)', when: '2022', note: '81.8%' },
];

export const beyond = [
  { id: 'badminton', title: 'Badminton', body: 'My favourite way to reset. Quick feet, quicker decisions.' },
  { id: 'reading', title: 'Non-fiction', body: 'Books about how people, companies and ideas actually work.' },
  { id: 'side', title: 'Side projects', body: 'If an idea will not leave me alone, I build a small version of it.' },
  { id: 'ai', title: 'AI and automation', body: 'Finding the boring task, then making a machine do it well.' },
  { id: 'learn', title: 'Learning new tech', body: 'New tool, small project, notes on what I learned.' },
];

export const askSuggestions = [
  'Why should we hire Hitesh?',
  'What does he build and automate at viaSocket?',
  'What did he build at Think Debug?',
  'What is his full-stack skill set?',
  'Tell me about Meeting-to-Action Closer.',
  'What makes his engineering approach different?',
];

export const nav = [
  { id: 'journey', label: 'Journey' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'stories', label: 'Stories' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

// ---------- Redesign (preview): hero identity and four story chapters ----------
export const heroStory = {
  kicker: "Hi, I'm",
  role: 'Full-stack developer',
  roleLine: 'I build web products end to end, and automate the work in between.',
  motto: [
    { lead: 'Curious', rest: 'by nature.' },
    { lead: 'Persistent', rest: 'by choice.' },
    { lead: 'A builder', rest: 'by passion.' },
  ],
  intro:
    "I'm a full-stack developer: React and Next.js interfaces, Node.js backends, databases and workflow automation. I build at viaSocket, and in AI-powered products of my own.",
  interests: ['Full-stack product engineering', 'Workflow automation', 'AI-powered products'],
  facts: [
    { k: 'Role', v: 'Full-stack developer at viaSocket' },
    { k: 'Stack', v: 'React · Next.js · Node.js · PostgreSQL' },
    { k: 'Based in', v: 'Indore, India' },
  ],
  now: { label: 'Latest build', name: 'Cairn', note: 'Measures the value of work, not the volume.', image: '/projects/cairn.webp', href: 'https://proof-of-impact.embarko.app' },
};

export type Chapter = {
  id: string; numeral: string; kind: 'Education' | 'Employment' | 'Independent'; when: string; title: string;
  body: string[]; lesson: string; bridge?: string; pose: Pose; expression: 'smile' | 'joy' | 'focus' | 'puzzled' | 'curious' | 'calm';
  tone: 'cream' | 'sage' | 'forest' | 'clay'; artifact: 'notebook' | 'kulies' | 'workflow' | 'products'; tags: string[];
};

export const chapters: Chapter[] = [
  {
    id: 'student', numeral: 'I', kind: 'Education', when: '2022 – 2026 · B.Tech CSE, Medi-Caps University', tone: 'cream', artifact: 'notebook', pose: 'explore', expression: 'curious',
    title: 'The curious student',
    body: [
      "I didn't start with a plan. I started with a question that wouldn't leave me alone: how does software actually work?",
      'Then I found the puzzles. Late nights went into DSA problems in C and C++: dynamic programming, graphs with BFS and Dijkstra, binary search, backtracking, bitmask DP. Most problems beat me the first time. So I learned to slow down: break the problem into smaller ones, question my first idea, prove it on paper, and try again until the solution was clean.',
      'Late-night huddles with friends turned that habit into real software: React apps, Node.js APIs, PostgreSQL tables, and SENSAI, an AI career coach on the Gemini API.',
    ],
    lesson: "Every hard problem is a few small ones I haven't found yet.",
    bridge: 'Puzzles taught me to think. Next, I needed to learn how real teams ship.',
    tags: ['DSA in C / C++', 'Dynamic programming', 'Graphs', 'Problem solving', 'SENSAI'],
  },
  {
    id: 'thinkdebug', numeral: 'II', kind: 'Employment', when: 'Feb – Apr 2025 · Frontend Developer Intern, Think Debug', tone: 'sage', artifact: 'kulies', pose: 'laptop', expression: 'focus',
    title: 'My first real codebase',
    body: [
      "Think Debug was the first time my code lived inside someone else's product: Kulies, a B2B2C e-commerce app, built by six engineers in weekly sprints, where my pull requests came back with review comments.",
      'It taught me that good code is code other people can build on. I wrote 15+ reusable React components, connected 20+ REST APIs, fixed 30+ defects and made the frontend 18% faster by removing re-renders nobody needed.',
    ],
    lesson: 'Shipping is a team sport, and every review makes you better.',
    bridge: 'Then college ended, and the work got bigger.',
    tags: ['React', 'Redux Toolkit', 'Tailwind CSS', '18% faster'],
  },
  {
    id: 'viasocket', numeral: 'III', kind: 'Employment', when: 'May 2026 – now · Integration Solution Engineer, Walkover (viaSocket)', tone: 'forest', artifact: 'workflow', pose: 'think', expression: 'focus',
    title: 'Full stack, at scale',
    body: [
      'I graduated in May 2026 and joined Walkover the same month. viaSocket is a no-code AI automation platform used by 100,000+ people, so the things I build reach real users.',
      'This is where I grew into a full-stack engineer: Next.js screens, Node.js services and 100+ integration modules handling OAuth, webhooks and pagination. And I automate things, building workflows that take repetitive work off people\'s plates.',
    ],
    lesson: 'Every layer is my layer: interface, API, data or automation.',
    bridge: 'Working across the stack, I kept noticing gaps. So I started filling them.',
    tags: ['Next.js', 'Node.js', 'Automation', '100+ integrations'],
  },
  {
    id: 'products', numeral: 'IV', kind: 'Independent', when: 'Now · Independent projects, on my own initiative', tone: 'clay', artifact: 'products', pose: 'celebrate', expression: 'joy',
    title: 'Building what was missing',
    body: [
      'While working, I kept seeing gaps: decisions made in meetings that nobody followed up on, and teams that rewarded looking busy over doing what mattered. Noticing was not enough. I built.',
      'Meeting-to-Action Closer turns meeting transcripts into Asana tasks and follows up in Slack. Cairn measures the value of work, not the volume. I designed, built, tested and shipped both myself, each with its own frontend, backend, database and AI features.',
    ],
    lesson: "If something's missing, build it. Next: bigger products and deeper AI.",
    tags: ['Meeting-to-Action Closer', 'Cairn', 'Initiative', 'AI products'],
  },
];

// ---------- Redesign (preview): case-study framing for projects ----------
export type Arch = { layer: string; items: string[] }[];
export const caseStudies: Record<string, { label: 'Independent project' | 'Personal project' | 'Work project'; gap: string; arch: Arch; side?: { label: string; items: string[] } }> = {
  cairn: {
    label: 'Independent project',
    gap: 'Teams often reward whoever looks busiest. Hours and activity counts say little about whether the most important work got done well.',
    arch: [
      { layer: 'Interface', items: ['Single-page app', 'Vanilla JavaScript', 'Light and dark themes'] },
      { layer: 'API', items: ['Node.js + Express', 'REST endpoints', 'Auth and roles'] },
      { layer: 'Data', items: ['SQLite', 'People, priorities, ratings, disputes'] },
    ],
    side: { label: 'Connected services', items: ['Gemini (Ask Cairn)', 'Slack and Keka via viaSocket', 'M91 phone alerts', 'Email resets'] },
  },
  'meeting-to-action': {
    label: 'Independent project',
    gap: 'Decisions made in meetings get lost between the transcript and the task tracker, and nobody follows up.',
    arch: [
      { layer: 'Interface', items: ['Next.js + React', 'TypeScript', 'Role-based views'] },
      { layer: 'API', items: ['Next.js API routes', 'AI task extraction', 'Duplicate-safe writes'] },
      { layer: 'Data', items: ['PostgreSQL', 'Prisma ORM'] },
    ],
    side: { label: 'Connected services', items: ['Fireflies', 'Google Calendar', 'Asana', 'Slack'] },
  },
  sensai: {
    label: 'Personal project',
    gap: 'Job seekers need focused, personal help with resumes and interview preparation.',
    arch: [
      { layer: 'Interface', items: ['Next.js + React'] },
      { layer: 'API', items: ['One REST route per feature', 'Gemini API'] },
      { layer: 'Data', items: ['PostgreSQL', 'Prisma ORM'] },
    ],
    side: { label: 'Services', items: ['Clerk authentication', 'Gemini API'] },
  },
  kulies: {
    label: 'Work project',
    gap: 'A B2B2C store needs fast, consistent shopping flows on every screen size.',
    arch: [
      { layer: 'Interface (my scope)', items: ['React components', 'Tailwind CSS', 'Redux Toolkit state'] },
      { layer: 'API', items: ['20+ REST APIs via Axios', 'Loading and error states'] },
    ],
  },
};

// ---------- Journey v2 (preview): concise, factual, five chapters ----------
export type Step = {
  id: string; numeral: string; kind: 'Education' | 'Employment' | 'Independent' | 'Exploring'; when: string; title: string;
  did: string; learned: string; evidence: string[]; next?: string;
  pose: Pose; expression: 'smile' | 'joy' | 'focus' | 'puzzled' | 'curious' | 'calm';
  tone: 'cream' | 'sage' | 'forest' | 'clay' | 'ink'; artifact: 'notebook' | 'kulies' | 'workflow' | 'products' | 'ai';
};

export const steps: Step[] = [
  {
    id: 'college', numeral: 'I', kind: 'Education', when: '2022 – 2026 · B.Tech CSE, Medi-Caps University, Indore', tone: 'cream', artifact: 'notebook', pose: 'wave', expression: 'smile',
    title: 'Where curiosity turned into code',
    did: 'I started with C and C++, then spent most of my practice on data structures and algorithms: dynamic programming, graphs (BFS, Dijkstra), binary search, backtracking and bitmask DP. Later I moved to the web, building small React and Next.js apps.',
    learned: 'To break a problem into steps before writing code, and the OOP and MVC basics behind larger codebases.',
    evidence: ['C / C++', 'DSA', 'OOP', 'React', 'Next.js', 'CGPA 7.92'],
    next: 'Next, I wanted to see how this works inside a real product, with a team.',
  },
  {
    id: 'thinkdebug', numeral: 'II', kind: 'Employment', when: 'Feb – Apr 2025 · Frontend Developer Intern, Think Debug', tone: 'sage', artifact: 'kulies', pose: 'laptop', expression: 'focus',
    title: 'My first taste of real product engineering',
    did: 'I worked on Kulies, a B2B2C e-commerce app, in a six-engineer Agile team: product listing, cart, wishlist and real-time pricing, shipped in weekly sprints with code reviews.',
    learned: 'To write components other engineers can reuse, and to measure performance instead of guessing.',
    evidence: ['15+ React components', '20+ REST APIs', '18% faster frontend', '30+ defects fixed'],
    next: 'Calling APIs from the frontend made me want to understand what happens behind them.',
  },
  {
    id: 'viasocket', numeral: 'III', kind: 'Employment', when: 'May 2026 – now · Integration Solution Engineer, Walkover (viaSocket)', tone: 'forest', artifact: 'workflow', pose: 'think', expression: 'focus',
    title: 'Understanding systems beyond the UI',
    did: 'On viaSocket, a no-code AI automation platform built on Next.js and Node.js, I build integration modules that connect it to third-party APIs, multi-step workflow automations, and the forms users configure them with.',
    learned: 'How systems talk to each other: OAuth 2.0, API keys, webhooks, pagination and data mapping, and how to debug 4xx/5xx errors against live endpoints.',
    evidence: ['100+ integration modules', 'Workflow automation', 'OAuth 2.0', 'Webhooks', 'Node.js'],
    next: 'Seeing how much work automation removes, I started building products for problems I noticed.',
  },
  {
    id: 'products', numeral: 'IV', kind: 'Independent', when: 'Independent projects', tone: 'clay', artifact: 'products', pose: 'celebrate', expression: 'joy',
    title: 'From identifying problems to building products',
    did: 'SENSAI gives resume and interview-prep guidance with the Gemini API. Meeting-to-Action Closer turns meeting transcripts into Asana tasks and Slack summaries. Cairn measures the value of work, not the volume. I built each one end to end.',
    learned: 'Owning a whole product: the data model, API, UI, tests and deployment.',
    evidence: ['SENSAI', 'Meeting-to-Action Closer', 'Cairn', '47 tests', '35% faster load (SENSAI)'],
    next: 'Most of these products use AI, which is where most of my learning goes now.',
  },
  {
    id: 'next', numeral: 'V', kind: 'Exploring', when: 'Now · and next', tone: 'ink', artifact: 'ai', pose: 'explore', expression: 'curious',
    title: "Always exploring what's next",
    did: 'I build with AI in my products and use AI tools in my daily workflow. Now I am learning how to build systems that plan and act on their own: AI agents that call tools and APIs.',
    learned: 'Where AI genuinely helps a workflow, and where a plain automation is the better tool.',
    evidence: ['Gemini API', 'LLM features', 'Agentic AI', 'Automation'],
  },
];

// Chapter V detail: every item is either used in a real project or clearly marked as exploring.
export type TechItem = { name: string; status: 'used' | 'exploring'; where: string; link?: string };
export const exploring: { group: string; items: TechItem[] }[] = [
  {
    group: 'AI and Generative AI',
    items: [
      { name: 'Gemini API', status: 'used', where: 'SENSAI, Ask Cairn and this site\'s Ask Hitesh', link: 'sensai' },
      { name: 'LLM-powered features', status: 'used', where: 'Meeting-to-Action Closer turns transcripts into tasks', link: 'meeting-to-action' },
      { name: 'Prompt engineering', status: 'used', where: 'Grounded prompts with injection guards in Ask Cairn and Ask Hitesh', link: 'cairn' },
      { name: 'AI-assisted development', status: 'used', where: 'Claude Code daily, with every line reviewed and tested' },
    ],
  },
  {
    group: 'AI agents and automation',
    items: [
      { name: 'Workflow automation', status: 'used', where: 'Multi-step automations at viaSocket' },
      { name: 'API orchestration', status: 'used', where: '100+ integration modules; Asana, Slack, Calendar and Fireflies in one flow', link: 'meeting-to-action' },
      { name: 'AI business workflows', status: 'used', where: 'AI extraction feeding Asana and Slack in Meeting-to-Action Closer', link: 'meeting-to-action' },
      { name: 'Agentic AI', status: 'exploring', where: 'IBM Agentic AI course (2026); agents that call tools and APIs' },
    ],
  },
  {
    group: 'Modern software engineering',
    items: [
      { name: 'Next.js and TypeScript', status: 'used', where: 'Meeting-to-Action Closer (Next.js, TypeScript); Next.js at viaSocket', link: 'meeting-to-action' },
      { name: 'Node.js and PostgreSQL', status: 'used', where: 'SENSAI, Meeting-to-Action Closer (Prisma)', link: 'sensai' },
      { name: 'Testing and debugging', status: 'used', where: '47 tests in Meeting-to-Action Closer, 27 in Cairn', link: 'cairn' },
      { name: 'OpenRouter', status: 'exploring', where: 'Using OpenRouter to try different LLMs' },
    ],
  },
];

// ---------- v3 (preview): concise 7-section site ----------
export const milestones: { id: string; numeral: string; kind: 'Education' | 'Employment' | 'Independent'; when: string; title: string; text: string; learned: string; tags: string[]; pose: Pose; tone: 'cream' | 'sage' | 'forest' | 'clay' }[] = [
  { id: 'college', numeral: 'I', kind: 'Education', when: '2022 – 2026', title: 'Where curiosity turned into code', pose: 'wave', tone: 'cream',
    text: 'B.Tech CSE at Medi-Caps University. I started with C, C++ and DSA, then moved to building web apps with React and Next.js.',
    learned: 'Break the problem into steps before writing code.', tags: ['C / C++', 'DSA', 'React'] },
  { id: 'thinkdebug', numeral: 'II', kind: 'Employment', when: '2025 · Think Debug', title: 'My first real product codebase', pose: 'laptop', tone: 'sage',
    text: 'A frontend internship on Kulies, a B2B2C e-commerce app, in a six-engineer team shipping every week with code reviews.',
    learned: 'Write components others can reuse, and measure before optimising.', tags: ['React', 'Redux Toolkit', 'Tailwind'] },
  { id: 'viasocket', numeral: 'III', kind: 'Employment', when: '2026 – now · viaSocket', title: 'Systems beyond the UI', pose: 'think', tone: 'forest',
    text: 'Full-stack work on a no-code AI automation platform: integrations with third-party APIs, workflow automations and the UI to configure them.',
    learned: 'How systems talk: OAuth, webhooks, pagination and live API debugging.', tags: ['Next.js', 'Node.js', 'Automation'] },
  { id: 'products', numeral: 'IV', kind: 'Independent', when: 'Independent', title: 'From problems to products', pose: 'celebrate', tone: 'clay',
    text: 'I build products for gaps I notice: an AI career coach, a meeting-to-tasks tool and a work-value tracker, each end to end.',
    learned: 'Own the whole product: data, API, UI, tests and deployment.', tags: ['SENSAI', 'Meeting-to-Action', 'Cairn'] },
];

export const featuredWork: { id: string; pitch: string; url?: string }[] = [
  { id: 'cairn', pitch: 'A weekly ranked Priority Stack, quality ratings and disputes, with no activity tracking. Ask Cairn, a Gemini helper, explains but never scores.', url: 'proof-of-impact.embarko.app' },
  { id: 'meeting-to-action', pitch: 'Turns meeting transcripts into Asana tasks with AI and posts summaries to Slack. Owners update status from Slack and it syncs back.', url: 'meeting-to-action-closer.embarko.app' },
  { id: 'sensai', pitch: 'Resume and interview-prep guidance from the Gemini API, with Clerk authentication and PostgreSQL through Prisma.' },
];

export const v3nav = [
  { id: 'journey', label: 'Journey' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'beyond', label: 'Beyond' },
  { id: 'contact', label: 'Contact' },
];
