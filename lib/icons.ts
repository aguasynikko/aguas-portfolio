import type { IconType } from "react-icons";
import {
  SiCplusplus,
  SiDocker,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGooglecloud,
  SiGooglecolab,
  SiGooglescholar,
  SiGradio,
  SiHtml5,
  SiIntellijidea,
  SiJira,
  SiJupyter,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiOllama,
  SiOpencv,
  SiOpenjdk,
  SiOrcid,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiRaspberrypi,
  SiReact,
  SiRoboflow,
  SiScikitlearn,
  SiShadcnui,
  SiStreamlit,
  SiSupabase,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiUltralytics,
  SiVercel,
  SiVite,
  SiCss,
  SiJavascript,
} from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa6";
import { Globe, Mail } from "lucide-react";

/**
 * Explicit icon registry.
 *
 * Imports are named (not a namespace import) so unused logos are tree-shaken
 * out of the bundle. Keys are our own stable names rather than raw Simple
 * Icons exports, which lets us swap a source without touching `resume.ts`.
 *
 * Adding a logo: import it above, add one line here, then reference the key
 * from a skill's `icon` field. Anything missing renders a monogram tile.
 */
export const iconMap: Record<string, IconType> = {
  // Languages
  Python: SiPython,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Java: SiOpenjdk, // Simple Icons has no Java mark (trademark) — OpenJDK stands in
  Cpp: SiCplusplus,
  HTML: SiHtml5,
  CSS: SiCss,

  // Frontend
  React: SiReact,
  NextJS: SiNextdotjs,
  Tailwind: SiTailwindcss,
  Shadcn: SiShadcnui,
  Vite: SiVite,

  // Backend & data
  Node: SiNodedotjs,
  Supabase: SiSupabase,
  PostgreSQL: SiPostgresql,
  Firebase: SiFirebase,
  Streamlit: SiStreamlit,
  Gradio: SiGradio,

  // AI & ML
  TensorFlow: SiTensorflow,
  ScikitLearn: SiScikitlearn,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  Ultralytics: SiUltralytics,
  OpenCV: SiOpencv,
  Ollama: SiOllama,
  Roboflow: SiRoboflow,
  Jupyter: SiJupyter,

  // Cloud & DevOps
  Docker: SiDocker,
  GCP: SiGooglecloud,
  Vercel: SiVercel,
  Git: SiGit,
  GitHub: SiGithub,
  RaspberryPi: SiRaspberrypi,

  // Tools
  IntelliJ: SiIntellijidea,
  Colab: SiGooglecolab,
  Jira: SiJira,

  // Social — Simple Icons dropped LinkedIn, so Font Awesome supplies the mark
  Linkedin: FaLinkedinIn,
  Github: SiGithub,
  Orcid: SiOrcid,
  Scholar: SiGooglescholar,
  Mail: Mail as IconType,
  Globe: Globe as IconType,
};

export function getIcon(key?: string): IconType | undefined {
  if (!key) return undefined;
  return iconMap[key];
}

/**
 * Monogram used when a technology has no logo: first letters of each word,
 * capped at two characters. "scikit-learn" → "SL", "FAISS" → "FA".
 */
export function monogram(name: string): string {
  const words = name.split(/[\s\-_/.]+/).filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
