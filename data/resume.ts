import type {
  Certification,
  Education,
  Experience,
  NavItem,
  Person,
  Project,
  Publication,
  Skill,
} from "./types";

/* ===========================================================================
 * ⚠️  BEFORE YOU DEPLOY — every `TODO` below is a value I could not source
 *     from your CV. The site works with them as-is, but they should be
 *     corrected or removed. Search this file for "TODO".
 * ======================================================================== */

export const person: Person = {
  name: "Yñikko Arzee Neo Aguas",
  title: "AI Engineer",
  titles: ["AI Engineer", "Data Scientist", "Software Engineer"],
  tagline:
    "I build AI systems, turn data into decisions, and ship full-stack products — from CT segmentation models to platforms teams use every day.",
  bio: [
    "I'm a Computer Scientist specializing in Artificial Intelligence. I work across three tracks that keep feeding each other: building AI systems, analyzing data until it says something useful, and shipping the software that puts both in front of people.",
    "On the engineering side, I shipped 15+ production modules for an internal platform serving 30+ people — architecting the React and Supabase data layer, enforcing role-based access across 25+ PostgreSQL migrations, and building an in-app AI assistant with real-time sync. On the data side, I've built end-to-end analysis tools that go from raw exploratory work through to live prediction, paired with plain-language interpretation for non-technical readers.",
    "On the research side, I've published two IEEE papers in medical imaging and clinical NLP. What ties all of it together is the gap between something that scores well and something people can actually trust — evaluation you can defend, latency budgets you can meet, and interfaces that don't hide uncertainty.",
  ],
  photo: "/ynikko-aguas.jpg",
  photoAlt: "Portrait of Yñikko Arzee Neo Aguas",
  resumeUrl: "/resume.pdf",
  resumeFileName: "Aguas_Resume.pdf",
  cvUrl: "/cv.pdf",
  cvFileName: "Aguas_CV.pdf",
  location: "Makati City, Philippines",
  kicker: "Artificial intelligence · Data science · Software engineering",
  focus:
    "Natural language processing and computer vision, data analysis end to end, and full-stack product engineering.",
  email: "aguasynikko6@gmail.com",
  // Present on your CV, deliberately not rendered anywhere on the site:
  // public phone numbers get harvested by scrapers. It stays in the PDF.
  phone: "+63 966 267 8981",
  socials: [
    {
      label: "Email",
      href: "mailto:aguasynikko6@gmail.com",
      icon: "Mail",
      handle: "aguasynikko6@gmail.com",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/ynikko-aguas-jn010605",
      icon: "Linkedin",
      handle: "/in/ynikko-aguas-jn010605",
    },
    {
      label: "GitHub",
      href: "https://github.com/aguasynikko",
      icon: "Github",
      handle: "@aguasynikko",
    },
    {
      label: "IEEE Xplore",
      href: "https://ieeexplore.ieee.org/author/279252246342958",
      icon: "Ieee",
      handle: "Author profile",
    },
    {
      label: "ResearchGate",
      href: "https://www.researchgate.net/profile/Ynikko-Arzee-Neo-Aguas",
      icon: "ResearchGate",
      handle: "Research profile",
    },
    // TODO (optional): add ORCID once you have one — it is the identifier
    // most publishers and grant systems key off.
    // { label: "ORCID", href: "https://orcid.org/0000-0000-0000-0000",
    //   icon: "Orcid", handle: "0000-0000-0000-0000" },
  ],
};

export const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Stack", href: "#skills" },
  { label: "Publications", href: "#publications" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

/* ---------------------------------------------------------------- experience
 * Employment only. The research work lives in `publications` and renders in
 * its own section, so the two are never conflated.
 * ------------------------------------------------------------------------ */
export const experience: Experience[] = [
  {
    id: "exoasia",
    role: "Software Engineer Intern",
    company: "Exoasia Innovation Hub",
    start: "Apr. 2026",
    end: "Jun. 2026",
    sortKey: "2026-04",
    kind: "work",
    summary:
      "Owned feature delivery across a three-role internal platform, from database schema to shipped UI.",
    achievements: [
      {
        text: "Shipped 15+ production feature modules for a 3-role internal platform used by 30+ people, architecting a React + Supabase data layer with role-based access enforced through 25+ PostgreSQL migrations and Row-Level Security.",
        tech: ["React", "Supabase", "PostgreSQL"],
      },
      {
        text: "Built X-O, an in-app AI assistant with a slash-command palette, and added real-time sync across 10+ modules that cut manual data entry and enabled live updates for announcements, messages, and project changes.",
        tech: ["Supabase Edge Functions", "Supabase Realtime"],
      },
      {
        text: "Delivered Google OAuth, a full dark/light theming system, and Excel/PDF export across a responsive UI spanning mobile, tablet, and desktop.",
        tech: ["React", "OAuth", "TypeScript"],
      },
    ],
  },
];

/* ------------------------------------------------------------------ projects
 * TODO: `demo` and `repo` are omitted everywhere — no links were on your CV.
 * Add them per project and the card buttons appear automatically.
 * TODO: drop a 16:10 image in /public/projects and set `image` to light up
 * the thumbnail; without it the card renders a generated monogram plate.
 * ---------------------------------------------------------------------- */
export const projects: Project[] = [
  {
    slug: "edge-ai-food-label",
    categories: ["Artificial Intelligence"],
    title: "Edge AI Food Label Analysis",
    year: "2026",
    blurb:
      "A fully offline dietary-analysis system running end to end on a Raspberry Pi 5, grounding every answer in WHO, FDA, and FARE guidance with zero cloud dependency.",
    highlights: [
      "Built an offline dietary-analysis system deployed entirely on a Raspberry Pi 5, grounding responses in WHO, FDA, and FARE health guidelines with no cloud dependency.",
      "Engineered a per-field retrieval strategy over a 682-chunk vector store, achieving a mean cosine similarity of 0.854 with all queries clearing the 0.75 confidence threshold.",
      "Deployed a 4-bit quantized Llama 3.2 3B model via Ollama, cutting the memory footprint from 6GB to 2GB to fit the device's 8GB budget.",
      "Integrated YOLOv8 label detection (0.969 mAP50) with the language pipeline via a subprocess architecture isolating conflicting ARM dependencies.",
    ],
    tech: [
      "Python",
      "YOLOv8",
      "RapidOCR",
      "RAG",
      "ChromaDB",
      "Ollama",
      "Raspberry Pi 5",
    ],
    image: "/projects/edge-ai-food-label.webp",
    featured: true,
  },
  {
    slug: "kidney-segmentation-app",
    categories: ["Artificial Intelligence"],
    title: "Kidney Abnormality Segmentation",
    year: "2026",
    blurb:
      "The deployed companion to my first-authored IEEE paper: real-time, privacy-preserving CT inference with color-coded abnormality overlays.",
    highlights: [
      "Implemented a YOLOv12 architecture detecting and segmenting cysts, stones, and tumors across axial and coronal CT scans.",
      "Reached mAP@0.5 of 0.946 (axial) and 0.885 (coronal) on a class-balanced dataset of 14,761 annotated scans.",
      "Shipped a Streamlit interface that runs inference locally, so patient imaging never leaves the machine.",
    ],
    tech: ["Python", "YOLOv12", "Roboflow", "Streamlit"],
    image: "/projects/kidney-segmentation.webp",
    featured: true,
  },
  {
    slug: "rag-clinical-chatbot",
    categories: ["Artificial Intelligence"],
    title: "RAG Clinical Guideline Chatbot",
    year: "2026",
    blurb:
      "A retrieval-augmented chatbot answering atrial-fibrillation questions strictly from ESC clinical guidelines — built as a project, later published as an IEEE paper.",
    highlights: [
      "Grounded every answer in 100+ pages of ESC atrial-fibrillation guidelines, reaching a BERTScore F1 of 0.835 against clinician-style queries.",
      "Built the retrieval pipeline with biomedical embeddings, vector search, and reranking, raising answer faithfulness to 8.75/10 across 20 clinical queries.",
      "Deployed quantized LLMs to hit 0.7s latency and 7.9 tokens/sec, fast enough for real-time decision support.",
      "Shipped a Gradio interface so clinicians could interrogate the guidelines conversationally.",
    ],
    tech: ["Python", "Gradio", "MedCPT", "FAISS", "BGE", "Ollama", "Llama-3"],
    image: "/projects/rag-clinical-chatbot.webp",
    featured: true,
  },
  {
    slug: "earthquake-analysis",
    categories: ["Data Science"],
    title: "Earthquake Data Analysis & Prediction",
    year: "2025",
    blurb:
      "A multi-page analytics application taking seismic data from raw exploration through to live tsunami, alert-level, and magnitude prediction.",
    highlights: [
      "Developed a multi-page Streamlit web application for end-to-end earthquake analysis, from exploratory data analysis to live prediction.",
      "Trained Random Forest, KNN, and Linear Regression models for tsunami, alert-level, and magnitude prediction, reaching 96% top accuracy.",
      "Designed geospatial density maps and KDE/temporal plots, each paired with plain-language interpretations for non-technical readers.",
    ],
    tech: ["Python", "Streamlit", "Scikit-learn", "pandas", "Seaborn"],
    image: "/projects/earthquake-analysis.webp",
    featured: true,
  },
  {
    slug: "vault-file-manager",
    categories: ["Software Development"],
    title: "Vault — File Manager",
    year: "2025",
    blurb:
      "A cloud file-management system with organization, favorites, and a recoverable trash tier, built on an accessible component foundation.",
    highlights: [
      "Architected a file management system with organization, favorites, and a secure trash section, using shadcn/ui for a responsive, accessible interface.",
      "Built custom account-management modules, backed by Supabase for secure cloud storage.",
    ],
    tech: ["React", "Supabase", "shadcn/ui", "TypeScript"],
    image: "/projects/vault-file-manager.webp",
  },
  {
    slug: "myapt-dashboard",
    categories: ["Software Development"],
    title: "MyApt — Apartment Management",
    year: "2025",
    blurb:
      "A property-management platform pairing real-time occupancy tracking with automated reporting and a tenant–manager messaging center.",
    highlights: [
      "Built a property-management platform with real-time data tracking, automated reporting, and a tenant–manager messaging center.",
      "Integrated secure authentication and tracked feature development with Jira across mobile and desktop.",
    ],
    tech: ["React", "Firebase", "Jira"],
    image: "/projects/myapt-dashboard.webp",
  },
  {
    slug: "heart-disease-risk",
    categories: ["Data Science"],
    title: "Heart Disease Risk Detection",
    year: "2025",
    blurb:
      "A comparative modelling study on cardiovascular risk, from messy clinical data through tuned, evaluated classifiers.",
    highlights: [
      "Led preprocessing and cleaning of complex medical datasets to prepare them for machine learning pipelines.",
      "Evaluated Logistic Regression, SVC, and Random Forest models to assess patient cardiovascular risk.",
      "Tuned hyperparameters with Grid Search CV to improve prediction accuracy.",
    ],
    tech: ["Python", "Streamlit", "Scikit-learn"],
    image: "/projects/heart-disease-risk.webp",
  },
];

/* -------------------------------------------------------------- publications
 * TODO: add co-authors (only your name is listed — citations need the rest),
 * the exact venue name, DOI, and IEEE Xplore link for each record.
 * The abstracts below are drawn from your CV bullets; replace them with the
 * papers' real abstracts when convenient.
 * ---------------------------------------------------------------------- */
export const publications: Publication[] = [
  {
    id: "rag-afib",
    title:
      "Open-Source LLMs for Evidence-Grounded Clinical Question Answering: A RAG Framework Based on the 2024 ESC Atrial Fibrillation Guidelines",
    authors: [
      "Carl Emmanuel M. Macabales",
      "Rolando R. Magat",
      "Yñikko Arzee Neo D. Aguas",
      "Lysa V. Comia",
    ],
    venue:
      "2026 22nd IEEE International Colloquium on Signal Processing & Its Applications (CSPA)",
    publisher: "IEEE",
    pages: "460-465",
    doi: "10.1109/CSPA68262.2026.11517831",
    keywords: [
      "atrial fibrillation",
      "clinical decision support",
      "large language models",
      "retrieval-augmented generation",
      "semantic similarity",
    ],
    year: 2026,
    type: "Conference",
    abstract:
      "This study presents a Retrieval-Augmented Generation (RAG) chatbot designed for clinical question answering based on the 2024 European Society of Cardiology (ESC) Guidelines for Atrial Fibrillation. Three open-source instruction-tuned language models — LLaMA 3 (8B), Phi-3 Mini (3.8B), and Qwen3 (4B) — were evaluated within a unified retrieval pipeline using MedCPT embeddings, FAISS vector indexing, and a BGE cross-encoder reranker. Performance was assessed across 20 clinical queries using ROUGE-1, BERTScore F1, cosine similarity, and LLM-as-judge metrics (Faithfulness, Answer Relevancy, Context Recall). LLaMA 3 achieved the highest lexical and semantic alignment (ROUGE-1 = 0.4564; cosine similarity = 0.6647; BERTScore F1 = 0.8351), while Phi-3 demonstrated the strongest factual grounding (Faithfulness = 9.75/10). Qwen3 showed competitive semantic performance (BERTScore F1 ≈ 0.8187) and the fastest inference (∼7.9 tokens/sec) but produced one clinically significant hallucination. All models exhibited reduced performance on figure-based guideline content, highlighting limitations of text-only RAG pipelines. The system was deployed via a Gradio web interface on a Google Colab NVIDIA T4 GPU, demonstrating a practical and accessible approach for guideline-grounded clinical NLP applications.",
    highlights: [
      "BERTScore F1 of 0.835 against ESC guideline ground truth.",
      "Answer faithfulness of 8.75/10 across 20 clinical queries.",
      "0.7s latency and 7.9 tokens/sec via quantized local inference.",
    ],
    tech: ["Python", "Gradio", "MedCPT", "FAISS", "BGE", "Ollama"],
    link: "https://ieeexplore.ieee.org/document/11517831",
  },
  {
    id: "kidney-segmentation",
    title:
      "Clinically Oriented Deep Learning Framework for Multi-Class Kidney Abnormality Instance Segmentation in CT Images",
    authors: ["Yñikko Arzee Neo Aguas"], // TODO: add co-authors; you are first author
    venue: "IEEE", // TODO: full conference or journal name
    publisher: "IEEE",
    year: 2026,
    type: "Conference",
    abstract:
      "This study presents a clinically oriented deep learning framework for multi-class kidney abnormality instance segmentation in Computed Tomography (CT) images using the YOLOv12 architecture. A comprehensive and class-balanced dataset of 14,761 axial and coronal CT scans was curated, preprocessed, and augmented to support robust model training and generalization across cyst, stone, and tumor cases. The YOLOv12 models were trained and evaluated separately for axial and coronal orientations, demonstrating strong performance in both views, with mAP@0.5 scores of 0.946 and 0.885, respectively. Training analysis showed rapid convergence in classification tasks, nearly identical segmentation performance across orientations, and slightly superior bounding box localization in axial scans due to clearer spatial cues. Model testing on high-quality and simulated low-quality images confirmed consistent kidney detection (0.92–0.96 confidence) and reliable abnormality identification under challenging imaging conditions, emphasizing clinical robustness. The final system was deployed via a Streamlit-based web interface enabling real-time, privacy-preserving inference with intuitive visualization of detected organs and abnormalities. The results demonstrate the feasibility and clinical promise of YOLOv12 for supporting faster, more consistent kidney abnormality assessment, reducing radiologist workload, and enabling potential deployment in both well-resourced and resource-limited clinical environments.",
    highlights: [
      "mAP@0.5 of 0.946 (axial) and 0.885 (coronal).",
      "Class-balanced dataset of 14,761 annotated CT scans.",
      "Privacy-preserving local inference — imaging never leaves the device.",
    ],
    tech: ["Python", "YOLOv12", "Roboflow", "Streamlit"],
    link: "https://ieeexplore.ieee.org/document/11438968",
    // TODO: add the DOI once assigned — it makes the citation complete.
  },
];

export const education: Education[] = [
  {
    school: "Mapúa University",
    degree: "Bachelor of Science in Computer Science",
    specialization: "Artificial Intelligence",
    location: "Makati City, Philippines",
    start: "Aug. 2023",
    end: "Oct. 2026",
    notes: [
      "Two IEEE-published papers completed during the program, in medical imaging and clinical NLP.",
      "Coursework and capstone work concentrated on computer vision, retrieval systems, and applied machine learning.",
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "Google Cybersecurity Professional Certificate",
    issuer: "Google",
    group: "Security & Networking",
    date: "6-course series",
  },
  {
    name: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco Networking Academy",
    group: "Security & Networking",
    date: "Oct. 2025",
  },
  {
    name: "Data Science Methodology",
    issuer: "IBM",
    group: "Data Science & AI",
  },
  {
    name: "Big Data & AI Ethics",
    issuer: "UC Davis",
    group: "Data Science & AI",
  },
  {
    name: "AI Data Fairness and Bias",
    issuer: "LearnQuest",
    group: "Data Science & AI",
  },
  {
    name: "Introduction to Software Engineering",
    issuer: "IBM",
    group: "Software Engineering",
  },
  {
    name: "Data Structures",
    issuer: "UC San Diego",
    group: "Software Engineering",
  },
  {
    name: "Programming Languages",
    issuer: "University of Washington",
    group: "Software Engineering",
  },
  {
    name: "UI/UX Design Specialization",
    issuer: "CalArts",
    group: "Design",
  },
];

/* -------------------------------------------------------------------- skills
 * `icon` keys map to lib/icons.ts. An unknown key renders a monogram tile,
 * so it is always safe to add a skill before wiring up a logo.
 * TODO: `level` and `years` are my estimates — adjust to taste. Remove both
 * fields from an entry to hide its tooltip.
 * ---------------------------------------------------------------------- */
export const skills: Skill[] = [
  // Languages
  { name: "Python", icon: "Python", category: "Languages", level: "Advanced", years: 3 },
  { name: "TypeScript", icon: "TypeScript", category: "Languages", level: "Proficient", years: 2 },
  { name: "JavaScript", icon: "JavaScript", category: "Languages", level: "Advanced", years: 3 },
  { name: "SQL", icon: "PostgreSQL", category: "Languages", level: "Proficient", years: 2 },
  { name: "Java", icon: "Java", category: "Languages", level: "Proficient", years: 2 },
  { name: "C++", icon: "Cpp", category: "Languages", level: "Foundational", years: 2 },
  { name: "HTML", icon: "HTML", category: "Languages", level: "Advanced", years: 3 },
  { name: "CSS", icon: "CSS", category: "Languages", level: "Advanced", years: 3 },

  // Frontend
  { name: "React", icon: "React", category: "Frontend", level: "Advanced", years: 3 },
  { name: "Next.js", icon: "NextJS", category: "Frontend", level: "Proficient", years: 2 },
  { name: "Tailwind CSS", icon: "Tailwind", category: "Frontend", level: "Advanced", years: 2 },
  { name: "shadcn/ui", icon: "Shadcn", category: "Frontend", level: "Proficient", years: 1 },
  { name: "Vite", icon: "Vite", category: "Frontend", level: "Proficient", years: 2 },

  // Backend & Data
  { name: "Node.js", icon: "Node", category: "Backend & Data", level: "Proficient", years: 2 },
  { name: "Supabase", icon: "Supabase", category: "Backend & Data", level: "Advanced", years: 2 },
  { name: "PostgreSQL", icon: "PostgreSQL", category: "Backend & Data", level: "Proficient", years: 2 },
  { name: "Firebase", icon: "Firebase", category: "Backend & Data", level: "Proficient", years: 2 },
  { name: "Streamlit", icon: "Streamlit", category: "Backend & Data", level: "Advanced", years: 2 },
  { name: "Gradio", icon: "Gradio", category: "Backend & Data", level: "Proficient", years: 1 },

  // AI & ML
  { name: "TensorFlow", icon: "TensorFlow", category: "AI & ML", level: "Proficient", years: 2 },
  { name: "scikit-learn", icon: "ScikitLearn", category: "AI & ML", level: "Advanced", years: 3 },
  { name: "pandas", icon: "Pandas", category: "AI & ML", level: "Advanced", years: 3 },
  { name: "NumPy", icon: "NumPy", category: "AI & ML", level: "Advanced", years: 3 },
  { name: "Matplotlib", category: "AI & ML", level: "Proficient", years: 3 },
  { name: "YOLO", icon: "Ultralytics", category: "AI & ML", level: "Advanced", years: 2 },
  { name: "nnU-Net", category: "AI & ML", level: "Proficient", years: 1 },
  { name: "OpenCV", icon: "OpenCV", category: "AI & ML", level: "Proficient", years: 2 },
  { name: "FAISS", category: "AI & ML", level: "Proficient", years: 1 },
  { name: "ChromaDB", category: "AI & ML", level: "Proficient", years: 1 },
  { name: "Ollama", icon: "Ollama", category: "AI & ML", level: "Proficient", years: 1 },
  { name: "Roboflow", icon: "Roboflow", category: "AI & ML", level: "Proficient", years: 2 },

  // Cloud & DevOps
  { name: "Docker", icon: "Docker", category: "Cloud & DevOps", level: "Proficient", years: 2 },
  { name: "Google Cloud", icon: "GCP", category: "Cloud & DevOps", level: "Foundational", years: 1 },
  { name: "Vercel", icon: "Vercel", category: "Cloud & DevOps", level: "Proficient", years: 2 },
  { name: "Git", icon: "Git", category: "Cloud & DevOps", level: "Advanced", years: 3 },
  { name: "GitHub", icon: "GitHub", category: "Cloud & DevOps", level: "Advanced", years: 3 },

  // Tools
  { name: "VS Code", category: "Tools", level: "Advanced", years: 3 },
  { name: "IntelliJ IDEA", icon: "IntelliJ", category: "Tools", level: "Proficient", years: 2 },
  { name: "Google Colab", icon: "Colab", category: "Tools", level: "Advanced", years: 3 },
  { name: "Jira", icon: "Jira", category: "Tools", level: "Proficient", years: 1 },
];

/**
 * Headline metrics for the hero strip — the 30-second scan.
 * Deliberately one from each track: engineering, breadth, data, research.
 */
export const stats = [
  // Derived from the skills array, so it can never drift out of date.
  { value: String(skills.length), label: "Technologies in my stack" },
  { value: String(projects.length), label: "Projects across AI, data & web" },
  { value: "96%", label: "Top model accuracy" },
  { value: "2", label: "IEEE publications" },
];
