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
