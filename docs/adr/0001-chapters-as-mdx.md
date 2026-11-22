# Memoir Chapters are MDX files, not entries in resume.ts

Everything else on the site renders from typed data in `data/resume.ts`, but each Memoir Chapter lives in its own MDX file under `content/memoir/`, with its metadata in frontmatter. Chapters are first-person essays with captioned Exhibits placed between paragraphs. Writing that inside TypeScript strings is awkward to edit and can't place photos inline. So prose content goes in MDX, and structured content stays in `resume.ts`. The cost is one dependency (`next-mdx-remote`) and a second place to look for content.
