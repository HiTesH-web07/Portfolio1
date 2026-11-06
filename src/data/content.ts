// Every word on the site lives here. Source of truth: Hitesh's master resume.
// Rule: never add a metric, link, client or achievement that is not in the resume.
// Missing information is `null` and the UI shows a clear "to be added" note instead of a dead button.

export const profile = {
  name: 'Hitesh Ahuja',
  firstName: 'Hitesh',
  role: 'Full-stack developer',
  title: 'Integration Solution Engineer at viaSocket',
  headline: 'Full-stack engineer building production APIs and web products with Next.js and Node.js.',
  hero: {
    hello: "Hi, I'm Hitesh Ahuja.",
    tagline: ['Curious mind.', "Builder's energy.", 'Endless ideas.'],
    support:
      'Full-stack developer building production APIs, web products and intelligent automation experiences.',
  },
  motto: 'Curious by nature. Persistent by choice. A builder by passion.',
  location: 'Indore, India',
  availability: 'Open to on-site roles in Bengaluru',
  email: 'hiteshahuja633@gmail.com',
  linkedin: 'https://linkedin.com/in/hiteshahuja07',
  github: 'https://github.com/HiTesHweb07',
  resume: '/resume/Hitesh_Ahuja_Resume.pdf',
  about:
    '2026 B.Tech Computer Science graduate and software engineer. I work on the viaSocket SaaS platform (Next.js and Node.js) at Walkover and have built 100+ API integration modules. I have strong DSA and OOP fundamentals, write automated tests, debug across frontend, API and database layers, and use AI coding tools (Claude Code) while reviewing and testing every line I ship.',
};

export type Pose = 'wave' | 'explore' | 'laptop' | 'think' | 'puzzled' | 'celebrate' | 'closing';

export const journey: { id: string; when: string; title: string; body: string; pose: Pose; tags: string[] }[] = [
  {
    id: 'begin',
    when: '2022',
    title: 'It started with "how does this work?"',
    body: 'I joined B.Tech Computer Science and Engineering at Medi-Caps University, Indore. Curiosity about how software actually runs pulled me into data structures, algorithms and object oriented design.',
    pose: 'wave',
    tags: ['B.Tech CSE', 'DSA in C/C++', 'OOP'],
  },
  {
    id: 'explore',
    when: 'During college',
    title: 'Learning by building',
    body: 'I learned web development the hands-on way: a Pokedex and a product listing page with React and Redux Toolkit, an employee management dashboard with Next.js, and SENSAI, an AI career coach on the Gemini API.',
    pose: 'explore',
    tags: ['React', 'Next.js', 'Redux Toolkit', 'Gemini API'],
  },
  {
    id: 'thinkdebug',
    when: 'Feb to Apr 2025',
    title: 'First production codebase',
    body: 'As a Frontend Developer Intern at Think Debug I worked on Kulies, a B2B2C e-commerce product, in a six-engineer Agile team: reusable React components, REST API integrations, and performance work.',
    pose: 'laptop',
    tags: ['Think Debug', 'Kulies', 'Weekly sprints'],
  },
  {
    id: 'viasocket',
    when: 'May 2026 to now',
    title: 'Real-world engineering at scale',
    body: 'At Walkover Web Solution I build on viaSocket, a no-code AI automation platform. I have built 100+ reusable API integration modules and debug the hard parts: OAuth, webhooks, pagination and 4xx/5xx errors.',
    pose: 'think',
    tags: ['viaSocket', 'OAuth 2.0', 'Webhooks', 'Node.js'],
  },
  {
    id: 'next',
    when: "What's next",
    title: 'Bigger products, smarter systems',
    body: 'I want to build larger products and go deeper into AI. Meeting-to-Action Closer and Cairn are where that is already happening, alongside IBM courses in Agentic AI and Generative AI.',
    pose: 'celebrate',
    tags: ['AI products', 'Automation', 'Always learning'],
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
      'I build and ship features on viaSocket, a no-code AI automation platform built on Next.js and Node.js, across the React frontend and the Node.js backend APIs.',
    stats: [
      { value: 100, suffix: '+', label: 'API integration modules I built and maintain' },
      { value: 100000, suffix: '+', label: 'users on the viaSocket platform' },
      { value: 2200, suffix: '+', label: 'SaaS apps the platform connects' },
    ] as Stat[],
    points: [
      'Designed, developed, tested and maintained 100+ reusable API integration modules in Node.js and JavaScript, plus multi-step workflow automations.',
      'Implemented OAuth 2.0 and API key authentication, webhooks, pagination and JSON data mapping.',
      'Turned UI/UX designs and wireframes into complete user flows: dynamic input forms with field validation and clear error handling.',
      'Tested APIs against live endpoints and root-caused 4xx/5xx errors and pagination mismatches.',
      'Wrote technical documentation and worked with senior engineers, Product and Design through Git, pull requests and code reviews.',
      'Use AI coding tools to move faster, and test and review every line of AI-assisted code before handoff.',
    ],
    stack: ['Next.js', 'React', 'Node.js', 'OAuth 2.0', 'Webhooks', 'Postman'],
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
      'Ask Cairn: a Gemini helper with a prompt-injection guard and per-user hourly limits.',
      'Slack and Keka connected through viaSocket, phone alerts through M91, password resets by email.',
      'Light and dark themes, reduced-motion support and an accessibility contrast check across the app.',
      '27 automated API tests.',
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
      'Integrates the Asana, Slack, Google Calendar and Fireflies REST APIs with authentication, data mapping and error handling.',
      'Role-based access control and duplicate-safe database writes.',
      'Relational data modelled with Prisma ORM.',
      '47 automated tests covering core logic.',
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
      'Authentication and session management with Clerk.',
      'PostgreSQL designed and queried through Prisma ORM.',
      'Improved load performance by 35% with a modular, API-based architecture.',
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
      '15+ reusable responsive React components.',
      '20+ REST APIs integrated with Axios.',
      '18% faster frontend after refactoring and reducing re-renders.',
      '30+ defects resolved.',
    ],
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Node.js'],
    live: 'https://kulies.com/',
    code: null,
    image: null,
    tone: 'clay',
  },
  {
    id: 'employees',
    name: 'Employee Management App',
    kicker: 'Dashboard',
    year: '',
    short: 'A dashboard with search, filters, sorting and dynamic employee detail pages.',
    problem: 'Finding one person in a long staff list is slow without good search and filters.',
    solution: 'A Next.js dashboard over the DummyJSON users API with search, filters, sorting and a detail page per employee.',
    contribution: 'Built the whole app.',
    highlights: ['Search, filters and sorting.', 'Dynamic routes for employee detail pages.'],
    stack: ['Next.js', 'DummyJSON API'],
    live: null,
    code: null,
    image: null,
    tone: 'paper',
  },
  {
    id: 'pokedex',
    name: 'Product Listing and Pokedex',
    kicker: 'Two React apps',
    year: '',
    short: 'A product listing page with filtering, sorting and skeleton loading, and a Pokedex on Redux Toolkit.',
    problem: 'Practice projects to master React state, loading states and forms.',
    solution:
      'A product listing with filtering, sorting, skeleton loading and form validation, and a Pokedex app with Redux Toolkit state management.',
    contribution: 'Built both apps.',
    highlights: ['Skeleton loading and form validation.', 'Redux Toolkit state management.'],
    stack: ['React', 'Vite', 'Redux Toolkit', 'Tailwind CSS'],
    live: null,
    code: null,
    image: null,
    tone: 'sage',
  },
];

// Engineering stories: real kinds of problems from the resume, told as the process I follow.
export const stories = [
  {
    id: 'auth',
    label: 'Authentication failure',
    where: 'API integrations at viaSocket',
    steps: {
      problem: {
        title: 'The request comes back 401 Unauthorized.',
        body: 'An integration that should work refuses every call. The UI only says "failed".',
        code: ['POST /v1/records', '→ 401 Unauthorized', '{ "error": "invalid_token" }'],
      },
      investigation: {
        title: 'Read the request, not the guess.',
        body: 'Inspect the headers, validate the credentials and scopes, re-read the API documentation and replay the call against the live endpoint in Postman.',
        code: ['Authorization: Bearer ••••', 'scope: read write ?', 'docs: token type, expiry'],
      },
      solution: {
        title: 'Fix the root cause, then prove it.',
        body: 'Correct the implementation, test the edge cases and verify the result against the live API before handoff.',
        code: ['POST /v1/records', '→ 200 OK', 'edge cases: tested'],
      },
    },
  },
  {
    id: 'pagination',
    label: 'Pagination mismatch',
    where: 'API integrations at viaSocket',
    steps: {
      problem: {
        title: 'Some records go missing between pages.',
        body: 'The first page looks right, but the totals never add up.',
        code: ['page 1 → 100 items', 'page 2 → 100 items', 'expected 250, got 200'],
      },
      investigation: {
        title: 'Compare what the API says with what it does.',
        body: 'Check how the API pages its results in the docs, log every page boundary, and compare the response metadata with what the integration requests.',
        code: ['next_cursor: "a9f…"', 'requested: offset=200', 'mismatch found'],
      },
      solution: {
        title: 'Page the way the API expects.',
        body: 'Correct the pagination handling and test the edges: empty pages, the last page and very large result sets.',
        code: ['pages: 3', 'items: 250 / 250', 'last page: handled'],
      },
    },
  },
  {
    id: 'perf',
    label: 'Slow frontend',
    where: 'Kulies at Think Debug',
    steps: {
      problem: {
        title: 'The UI does more work than it should.',
        body: 'Components re-render far more often than the data changes.',
        code: ['<ProductList/> render', '<ProductList/> render', '<ProductList/> render'],
      },
      investigation: {
        title: 'Find who renders, and why.',
        body: 'Trace renders with browser DevTools and look at which props and shared state trigger them.',
        code: ['props changed: none', 'state: shared slice', 'cause: broad subscription'],
      },
      solution: {
        title: 'Refactor, then measure.',
        body: 'Refactor components and reduce re-renders. The result was an 18% frontend performance improvement.',
        code: ['renders: reduced', 'performance: +18%', 'shipped'],
      },
    },
  },
] as const;

export const skills = [
  { group: 'Languages', icon: 'code', items: ['JavaScript (ES6+)', 'TypeScript', 'Java', 'Python', 'C', 'C++', 'SQL'] },
  { group: 'Frontend', icon: 'layout', items: ['React.js', 'Next.js', 'Redux Toolkit', 'Tailwind CSS', 'HTML5', 'CSS3', 'Bootstrap 5'] },
  { group: 'Backend', icon: 'server', items: ['Node.js', 'Express.js', 'Next.js API Routes'] },
  { group: 'APIs and integrations', icon: 'plug', items: ['REST APIs', 'OAuth 2.0', 'Webhooks', 'Pagination', 'JSON', 'Axios', 'Postman'] },
  { group: 'Databases', icon: 'database', items: ['PostgreSQL', 'MySQL', 'Prisma ORM', 'Relational design'] },
  { group: 'Testing and debugging', icon: 'bug', items: ['Jest', 'Debugging', 'Code review', 'Agile/Scrum', 'Documentation'] },
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
  'Tell me about his API integration experience.',
  'What did he build at Think Debug?',
  'What are his strongest technical skills?',
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
