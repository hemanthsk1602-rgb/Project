export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  features: string[];
  metrics?: { label: string; value: string }[];
  githubUrl: string;
  liveDemoUrl: string;
  category: 'Web' | 'AI/ML' | 'Python';
  badge?: string;
}

export interface PythonProjectItem {
  id: string;
  name: string;
  filename: string;
  tagline: string;
  description: string;
  category: 'Security' | 'Game' | 'Utility' | 'AI Assistant';
  tags: string[];
  codeSnippet: string;
}

export interface SkillItem {
  name: string;
  category: string;
  description: string;
  iconName: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface TimelineMilestone {
  period: string;
  role: string;
  organization: string;
  description: string;
  badge: string;
  skillsLearned: string[];
}

export interface SocialLink {
  platform: string;
  label: string;
  href: string;
  iconName: string;
}

export interface ExploringTopic {
  title: string;
  description: string;
  iconName: string;
  tag: string;
  level: string;
}

export const PERSONAL_INFO = {
  name: 'HEMANTH',
  displayName: 'Hemanth',
  intro: "Hello, I'm",
  role: 'AI & ML Student | Full-Stack Developer | Problem Solver',
  headline: 'Building intelligent ideas into real-world experiences.',
  subheadline:
    "I'm a passionate AI & ML student who enjoys building modern web applications, experimenting with AI, and solving real-world problems through technology.",
  status: 'Open to opportunities',
  location: 'Chennai, India',
  email: 'contact@hemanth.dev',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  education: {
    institution: 'Crescent Institute of Science and Technology',
    degree: 'B.Tech / Undergraduate — Artificial Intelligence & Machine Learning',
    year: '2nd Year',
    timeline: '2024 — 2028',
    location: 'Chennai, India',
    focusAreas: [
      'Artificial Intelligence',
      'Machine Learning',
      'Data Structures & Algorithms',
      'Full-Stack Web Development',
      'Database Management Systems',
      'Discrete Mathematics',
    ],
  },
  stats: [
    { value: 2, suffix: '+', label: 'Years Learning & Building', subtext: 'Continuous coding & exploration' },
    { value: 12, suffix: '+', label: 'Multiple Projects', subtext: 'Web applications & AI models' },
    { value: 2, prefix: '', suffix: 'nd Year', label: 'AI & ML Student', subtext: 'Crescent Institute of Science & Tech' },
    { value: 100, suffix: '%', label: 'Always Learning', subtext: 'Committed to technological growth' },
  ],
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'GitHub',
    label: 'github.com/hemanth',
    href: 'https://github.com',
    iconName: 'Github',
  },
  {
    platform: 'LinkedIn',
    label: 'linkedin.com/in/hemanth',
    href: 'https://linkedin.com',
    iconName: 'Linkedin',
  },
  {
    platform: 'Email',
    label: 'contact@hemanth.dev',
    href: 'mailto:contact@hemanth.dev',
    iconName: 'Mail',
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    title: 'Programming',
    description: 'Foundational languages for problem solving, algorithm design, and core development.',
    skills: [
      { name: 'Python', iconName: 'FileCode2', category: 'Programming', description: 'Core language for AI/ML, data scripting, OOP, and automation workflows.' },
      { name: 'JavaScript', iconName: 'Braces', category: 'Programming', description: 'Modern ES6+, async programming, event loop, and DOM manipulation.' },
      { name: 'TypeScript', iconName: 'FileCode', category: 'Programming', description: 'Strict static typing, interfaces, generics, and resilient frontend code.' },
      { name: 'C/C++', iconName: 'Cpu', category: 'Programming', description: 'Memory management, pointers, Data Structures & Algorithms, and high-performance computing.' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Modern component-driven web technologies and responsive design systems.',
    skills: [
      { name: 'HTML', iconName: 'Layout', category: 'Frontend', description: 'Semantic structure, accessibility standards (a11y), and SEO best practices.' },
      { name: 'CSS', iconName: 'Palette', category: 'Frontend', description: 'Modern CSS3, Flexbox, Grid, keyframe animations, and responsive styling.' },
      { name: 'React', iconName: 'Layers', category: 'Frontend', description: 'Component lifecycle, hooks, state management, and modern component architecture.' },
      { name: 'Next.js', iconName: 'Globe', category: 'Frontend', description: 'App router, server-side rendering (SSR), static generation (SSG), and routing.' },
      { name: 'Tailwind CSS', iconName: 'Sparkles', category: 'Frontend', description: 'Utility-first styling, customized design tokens, responsive breakpoints, and modern aesthetics.' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & Database',
    description: 'Server runtime environments, RESTful APIs, and relational/non-relational database management.',
    skills: [
      { name: 'Node.js', iconName: 'Server', category: 'Backend & Database', description: 'Asynchronous event-driven runtime for scalable backend services.' },
      { name: 'Express', iconName: 'Zap', category: 'Backend & Database', description: 'RESTful API endpoints, middleware architecture, routing, and request handling.' },
      { name: 'MongoDB', iconName: 'Database', category: 'Backend & Database', description: 'NoSQL document schemas, aggregation pipelines, and flexible data modeling.' },
      { name: 'MySQL', iconName: 'Table', category: 'Backend & Database', description: 'Relational database design, ACID compliance, complex SQL queries, and normalization.' },
    ],
  },
  {
    id: 'ai-ml',
    title: 'AI & ML',
    description: 'Machine learning fundamentals, predictive modeling, data analysis, and intelligent algorithms.',
    skills: [
      { name: 'Python', iconName: 'Terminal', category: 'AI & ML', description: 'NumPy, Pandas, model prototyping, and algorithmic script execution.' },
      { name: 'Machine Learning', iconName: 'Brain', category: 'AI & ML', description: 'Supervised & unsupervised learning, regression, classification, and model metrics.' },
      { name: 'Data Analysis', iconName: 'BarChart3', category: 'AI & ML', description: 'Exploratory data analysis, statistical evaluation, preprocessing, and insight visualization.' },
      { name: 'AI Applications', iconName: 'Bot', category: 'AI & ML', description: 'Building practical AI tools, recommendation systems, and integrating LLM APIs.' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    description: 'Version control, developer environment, and interface design software.',
    skills: [
      { name: 'Git', iconName: 'GitBranch', category: 'Tools', description: 'Version control, branch management, collaborative merging, and conflict resolution.' },
      { name: 'GitHub', iconName: 'Github', category: 'Tools', description: 'Repository hosting, collaborative pull requests, issues, and continuous deployment.' },
      { name: 'VS Code', iconName: 'AppWindow', category: 'Tools', description: 'Advanced code editing, debugger configuration, snippets, and productivity extensions.' },
      { name: 'Figma', iconName: 'Figma', category: 'Tools', description: 'UI/UX wireframing, high-fidelity prototypes, component design, and responsive layouts.' },
    ],
  },
];

export const PYTHON_PROJECTS_LIST: PythonProjectItem[] = [
  {
    id: 'jarvis',
    name: 'Project JARVIS',
    filename: 'jarvis.py',
    tagline: 'AI Desktop Voice Assistant with Speech Recognition & TTS',
    description:
      'Voice-activated desktop assistant that listens via microphone, speaks using pyttsx3, opens VS Code, searches Google and YouTube, and reports system time/date.',
    category: 'AI Assistant',
    tags: ['SpeechRecognition', 'pyttsx3', 'Automation', 'Voice AI'],
    codeSnippet: `import speech_recognition as sr
import pyttsx3, datetime, webbrowser, os

def speak(text):
    print("JARVIS:", text)
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

def listen():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        recognizer.adjust_for_ambient_noise(source, duration=0.5)
        audio = recognizer.listen(source)
    try:
        return recognizer.recognize_google(audio).lower()
    except Exception:
        return ""

speak("Hello sir. I am online.")
while True:
    command = listen()
    if "time" in command:
        speak(f"Sir, the time is {datetime.datetime.now().strftime('%I:%M %p')}")
    elif "youtube" in command:
        speak("Opening YouTube, sir.")
        webbrowser.open("https://www.youtube.com")
    elif "vs code" in command:
        speak("Opening Visual Studio Code, sir.")
        os.system("code")
    elif "search" in command:
        query = command.replace("search", "", 1).strip()
        webbrowser.open("https://www.google.com/search?q=" + query.replace(" ", "+"))`,
  },
  {
    id: 'password-generator',
    name: 'Secure Password Generator',
    filename: 'Password generator.py',
    tagline: 'Cryptographic Alphanumeric & Symbol Password Generator',
    description:
      'Generates secure randomized passwords by combining uppercase, lowercase, numeric digits, and special punctuation symbols with customized character length.',
    category: 'Security',
    tags: ['random', 'string', 'Security', 'Cryptography'],
    codeSnippet: `import random
import string

length = int(input("Enter the length of the password: "))
characters = string.ascii_letters + string.digits + string.punctuation
password = ""

for i in range(length):
    password += random.choice(characters)

print("Your generated password is:", password)`,
  },
  {
    id: 'quiz',
    name: 'Interactive Quiz Game',
    filename: 'quize.py',
    tagline: 'Dynamic Knowledge Evaluation Engine with Score Counter',
    description:
      'A trivia assessment engine that iterates through structured question dictionaries, sanitizes user inputs, and calculates real-time scores with feedback.',
    category: 'Game',
    tags: ['Dictionaries', 'Control Flow', 'Trivia Engine'],
    codeSnippet: `questions = {
    "Who is the GOAT of Cricket?": "MS Dhoni",
    "What is 5 * 5": "25",
}
score = 0
for question in questions:
    answer = input(question).strip().lower()
    if answer.lower() == questions[question].strip().lower():
        score += 1
        print("Correct Answer! Your score is:", score)
    else:
        print("Incorrect Answer")`,
  },
  {
    id: 'rock-paper-scissors',
    name: 'Rock, Paper, Scissors',
    filename: 'Rock Paper Scissors.py',
    tagline: 'Classic Game vs. Computer Random Choice AI',
    description:
      'Player vs computer showdown utilizing randomized choice selection and comprehensive game condition branching to determine wins, losses, and ties.',
    category: 'Game',
    tags: ['RNG', 'Game Logic', 'Conditionals'],
    codeSnippet: `import random

print("Welcome to Rock, Paper, Scissors!")
choices = ["rock", "paper", "scissors"]
computer_choice = random.choice(choices)
player_choice = input("Enter your choice: ").lower()
print("Computer Chose:", computer_choice)

if player_choice == computer_choice:
    print("It's a Tie!")
elif player_choice == "rock" and computer_choice == "scissors":
    print("You Win!")
elif player_choice == "paper" and computer_choice == "rock":
    print("You Win!")
elif player_choice == "scissors" and computer_choice == "paper":
    print("You Win!")
else:
    print("Computer Wins!")`,
  },
  {
    id: 'expense-tracker-cli',
    name: 'Expense Tracker CLI',
    filename: 'Expense Tracker.py',
    tagline: 'Itemized Spending Logger with Dynamic Running Totals',
    description:
      'Terminal application managing financial records via dictionary lists, with capabilities to add new expenses, inspect existing logs, and calculate aggregate spending.',
    category: 'Utility',
    tags: ['Data Structures', 'Aggregations', 'Finance CLI'],
    codeSnippet: `expenses = []
while True:
    print("1. Add Expense\\n2. View Expenses\\n3. Show Total\\n4. Exit")
    choice = input("Enter your choice: ")
    if choice == "1":
        item = input("Enter expense item: ")
        amount = float(input("Enter expense amount: "))
        expenses.append({"item": item, "amount": amount})
        print("Expense Added!")
    elif choice == "2":
        for expense in expenses:
            print(expense["item"], "-", expense["amount"])
    elif choice == "3":
        print("Total:", sum(expense["amount"] for expense in expenses))
    elif choice == "4":
        break`,
  },
  {
    id: 'number-guessing',
    name: 'Number Guessing Game',
    filename: 'Number guessing.py',
    tagline: 'Binary-Search Hint Engine with Target Number Discovery',
    description:
      'An engaging numeric guessing game where the computer picks a random number from 1 to 100, providing algorithmic "Too high" and "Too low" hints until discovery.',
    category: 'Game',
    tags: ['Binary Search', 'Loops', 'Game Engine'],
    codeSnippet: `import random

secret_number = random.randint(1, 100)
while True:
    guess = int(input("Guess a number between 1 and 100: "))
    if guess == secret_number:
        print("Congratulations you have guessed the number!")
        break
    elif guess > secret_number:
        print("Your guess is too high!")
    else:
        print("Your guess is too low!")`,
  },
  {
    id: 'menu-card',
    name: 'Menu Card & Billing POS',
    filename: 'Menu Card.py',
    tagline: 'Interactive Restaurant Ordering System & Order Confirmation',
    description:
      'A food ordering system presenting authentic dishes (Butter Chicken, Curd Rice, Grill Chicken, Mutton Curry, Beef Biriyani) with validation and order receipt generation.',
    category: 'Utility',
    tags: ['Menu System', 'Order Validation', 'POS'],
    codeSnippet: `print("====MENU====")
print("1.Butter Chicken\\n2.Curd Rice\\n3.Grill Chicken\\n4.Mutton Curry\\n5.Beef Biriyani")

choice = input("Enter your choice: ")
menu = {
    "1": "Butter Chicken",
    "2": "Curd Rice",
    "3": "Grill Chicken",
    "4": "Mutton Curry",
    "5": "Beef Biriyani"
}

if choice in menu:
    print("You have ordered", menu[choice])
else:
    print("Invalid Choice")`,
  },
  {
    id: 'calculator',
    name: 'Arithmetic Calculator',
    filename: 'Calculator.py',
    tagline: 'Core Arithmetic Calculator with Division Safety Guards',
    description:
      'Math evaluation engine executing addition, subtraction, multiplication, and floating-point division with zero-division error handling.',
    category: 'Utility',
    tags: ['Math', 'Error Handling', 'Floating Point'],
    codeSnippet: `a = float(input("Enter a number: "))
b = float(input("Enter a number: "))
operation = input("Enter an Operation (+, -, *, /): ")

if operation == "+":
    print("Result:", a + b)
elif operation == "-":
    print("Result:", a - b)
elif operation == "*":
    print("Result:", a * b)
elif operation == "/" and b != 0:
    print("Result:", a / b)
else:
    print("Invalid operation or division by zero!")`,
  },
  {
    id: 'todo-list',
    name: 'Task & To-Do Manager',
    filename: 'To do list.py',
    tagline: 'List-Based Task Queue with Append & View Operations',
    description:
      'A straightforward task manager to queue upcoming daily tasks, display the current task list, and manage productivity goals.',
    category: 'Utility',
    tags: ['Lists', 'State Management', 'CLI Queue'],
    codeSnippet: `tasks = []
while True:
    print("1. Add task\\n2. View tasks\\n3. Exit")
    choice = input("Enter your choice: ")
    if choice == "1":
        task = input("Enter the task: ")
        tasks.append(task)
        print("Task added successfully")
    elif choice == "2":
        print("Current tasks:", tasks)
    elif choice == "3":
        print("Exiting...")
        break`,
  },
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: 'fitplus',
    title: 'FitPlus',
    tagline: 'AI-Powered Full-Stack Fitness & Training Web Application',
    description:
      'A complete fitness tracking web application featuring personalized routine recommendations, workout logger, macro nutrition calculator, and recovery analytics.',
    longDescription:
      'FitPlus bridges fitness science with responsive frontend engineering. It provides custom workout splits, exercise progression trackers, AI-powered coaching recommendations, and an interactive workout player for Gym, Calisthenics, and Hybrid athletes with real-time telemetry.',
    technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'React Context', 'Lucide Icons', 'AI Coach Engine'],
    features: [
      'Full web app with 6 dedicated modules: Dashboard, Workout, AI Coach, Nutrition, Progress, Recovery',
      'Mode switcher: Gym Hypertrophy, Calisthenics Mastery, and Hybrid Athlete splits',
      'Real-time workout player with active timer, set logging, and volume tracking',
      'AI Coach providing personalized overload advice and form recommendations',
      'Nutrition macro tracking (Calories, Protein, Water) with visual progress rings',
    ],
    metrics: [
      { label: 'Live Modules', value: '6 Interactive Views' },
      { label: 'Workout Modes', value: 'Gym & Calisthenics' },
      { label: 'Architecture', value: 'Next.js 14 App Router' },
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: '/dashboard',
    category: 'Web',
    badge: 'Flagship Web App',
  },
  {
    id: 'project-jarvis',
    title: 'Project JARVIS',
    tagline: 'AI Desktop Voice Assistant Powered by Python',
    description:
      'An intelligent desktop voice assistant built with Python speech recognition, text-to-speech synthesis (pyttsx3), browser control, and system automation.',
    longDescription:
      'Engineered as an autonomous personal desktop assistant. Listens for speech input with ambient noise calibration, executes voice commands, launches applications like VS Code, automates Google and YouTube web searches, and speaks real-time updates.',
    technologies: ['Python', 'SpeechRecognition', 'pyttsx3', 'WebBrowser API', 'OS Automation'],
    features: [
      'Microphone ambient noise calibration for clear audio capture',
      'Natural Text-to-Speech (TTS) vocal feedback using pyttsx3',
      'Automated search pipeline for YouTube and Google web queries',
      'Application automation to launch VS Code and system utilities',
      'Real-time clock, calendar, and conversational voice intent recognition',
    ],
    metrics: [
      { label: 'Voice Engine', value: 'pyttsx3 TTS' },
      { label: 'Input', value: 'SpeechRecognition' },
      { label: 'Automation', value: 'Desktop & Web' },
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: '#jarvis-simulator',
    category: 'AI/ML',
    badge: 'AI Voice Assistant',
  },
  {
    id: 'python-mini-projects',
    title: 'Python Projects Suite',
    tagline: '8 Algorithmic Systems, Cryptography & Interactive Utilities',
    description:
      'A comprehensive collection of 8 practical Python applications showcasing algorithms, data structures, cryptographic generation, and interactive terminal interfaces.',
    longDescription:
      'Features a cryptographically secure Password Generator, an Interactive Trivia Quiz Engine, Rock-Paper-Scissors against computer AI, a CLI Expense Tracker, Number Guessing Game with binary search hints, Restaurant Menu Ordering System, Arithmetic Calculator, and Task To-Do Manager.',
    technologies: ['Python 3', 'Data Structures', 'Cryptography', 'Randomization', 'CLI Architecture'],
    features: [
      '8 complete Python projects with clean modular architecture',
      'Interactive browser simulation and source code viewer for each project',
      'Algorithms for arithmetic parsing, binary search guessing, and random selection',
      'Real-time expense tallying and restaurant billing logic',
    ],
    metrics: [
      { label: 'Projects', value: '8 Functional Apps' },
      { label: 'Language', value: 'Python 3.11+' },
      { label: 'Scope', value: 'CLI, Math & Games' },
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: '#python-suite',
    category: 'Python',
    badge: '8 Python Applications',
  },
  {
    id: 'expense-tracker',
    title: 'Expense Tracker',
    tagline: 'A Responsive Personal Expense Management Application',
    description:
      'A responsive expense management application to track personal spending, manage monthly budgets, and visualize categorized expenditure with instant calculation.',
    longDescription:
      'Designed with clean typography and intuitive UX, this application enables users to log income and expenditures, organize them by category, view real-time spending summaries, and monitor budget health.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'LocalStorage'],
    features: [
      'Add expenses with description, amount, and date',
      'Track spending across customized categories',
      'Categorize expenses (Food, Bills, Transport, Entertainment)',
      'Simple dashboard with visual balance breakdowns',
      'Responsive interface optimized for mobile and desktop screens',
    ],
    metrics: [
      { label: 'Storage', value: 'Client LocalStorage' },
      { label: 'Responsive', value: 'Mobile-first' },
      { label: 'Speed', value: 'Zero Dependency' },
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: '#',
    category: 'Web',
    badge: 'Popular Utility',
  },
  {
    id: 'bat-escape',
    title: 'Bat Escape',
    tagline: 'Challenging Progressive Pixel-Art Arcade Flight Game',
    description:
      'A high-octane 6-level arcade game featuring responsive flight physics, procedural fairness-guaranteed obstacle generation, combo systems, boss battles, and Web Audio chiptune synthesis.',
    longDescription:
      'Engineered with HTML5 Canvas and modular ES6 JavaScript targeting 60 FPS. Features a progressive difficulty manager with 6 biomes, mathematical reachability verification to prevent impossible configurations, milestone boss battles (Gargoyle and Nightmare Overlord), risk-reward pickups, power-ups, and full local achievement persistence.',
    technologies: ['HTML5 Canvas', 'JavaScript ES6', 'Web Audio API', 'Physics Engine', 'LocalStorage', 'Next.js'],
    features: [
      '6 progressive difficulty tiers: Night Flight, Deep Forest, Haunted Castle, Dark Caves, Demon Realm, Nightmare Mode',
      'Mathematical fairness validator ensuring 100% playable paths',
      'Combo multipliers (up to 5x) and close-call "PERFECT!" pass mechanics',
      'Milestone boss encounters with telegraphed attacks and survival awards',
      'Object-pooled particle system and procedural Web Audio chiptune synthesizer',
      '10 unlockable retro achievements with persistent local storage',
    ],
    metrics: [
      { label: 'Levels', value: '6 Biomes' },
      { label: 'Framerate', value: '60 FPS Target' },
      { label: 'Audio', value: 'Procedural Web Audio' },
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: '/bat-escape',
    category: 'Web',
    badge: 'New Arcade Game',
  },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    period: '2026',
    role: 'AI & ML Student',
    organization: 'Crescent Institute of Science and Technology',
    description:
      'Learning artificial intelligence, machine learning, full-stack development, and data structures. Building deep theoretical foundations in predictive models and algorithm optimization.',
    badge: 'Academic Journey',
    skillsLearned: ['Artificial Intelligence', 'Machine Learning', 'Data Structures', 'Python', 'Mathematics'],
  },
  {
    period: '2025–2026',
    role: 'Development & Projects',
    organization: 'Independent Engineering',
    description:
      'Building practical applications and improving frontend/backend development skills. Architected projects like FitPlus and Expense Tracker using React, Next.js, and TypeScript.',
    badge: 'Hands-on Building',
    skillsLearned: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'API Integration'],
  },
  {
    period: 'Present',
    role: 'Continuous Learning',
    organization: 'Personal Growth & Open Source',
    description:
      'Working on personal projects, improving programming skills, and exploring AI-powered applications. Actively sharpening software design and preparing for engineering internships.',
    badge: 'Active Focus',
    skillsLearned: ['AI Systems', 'System Design', 'Clean Code', 'Problem Solving'],
  },
];

export const CURRENTLY_EXPLORING: ExploringTopic[] = [
  {
    title: 'Artificial Intelligence',
    description: 'Neural networks, autonomous agents, prompt architectures, and intelligent heuristics.',
    iconName: 'Sparkles',
    tag: 'Core Domain',
    level: 'Advanced Study',
  },
  {
    title: 'Machine Learning',
    description: 'Supervised/unsupervised algorithms, evaluation metrics, and predictive modeling pipelines.',
    iconName: 'Brain',
    tag: 'Data Science',
    level: 'Deepening',
  },
  {
    title: 'Advanced React',
    description: 'React Server Components, custom rendering hooks, memoization patterns, and suspense boundaries.',
    iconName: 'Layers',
    tag: 'Frontend',
    level: 'Active Practice',
  },
  {
    title: 'Next.js',
    description: 'Next.js 14 App Router, streaming SSR, parallel routes, server actions, and edge optimizations.',
    iconName: 'Globe',
    tag: 'Full-Stack',
    level: 'Production Focus',
  },
  {
    title: 'Backend Development',
    description: 'Node.js event loop, RESTful microservice patterns, database indexing, and API security.',
    iconName: 'Server',
    tag: 'Architecture',
    level: 'Expanding',
  },
  {
    title: 'Data Structures & Algorithms',
    description: 'Graph traversals, trees, dynamic programming, space-time complexity analysis, and competitive coding.',
    iconName: 'Cpu',
    tag: 'Computer Science',
    level: 'Continuous Practice',
  },
];
