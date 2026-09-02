export type SkillGroup = {
  title: string;
  items: string[];
};

export type ArchitectureItem = {
  label: string;
  value: string;
};

export type DetailItem = {
  title: string;
  description: string;
};

export type ProjectLinks = {
  github?: string;
  live?: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  category: string;
  status: string;
  description: string;

  technologies?: string[];
  highlights?: string[];

  overview: string;
  problem: string;
  solution: string;

  architecture?: ArchitectureItem[];
  features?: DetailItem[];
  challenges?: DetailItem[];

  deployment: string;

  learnings?: string[];
  futureImprovements?: string[];

  links?: ProjectLinks;
};

export type BlogPost = {
  id: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
};

export type AboutTranslation = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };

  story: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };

  skills: {
    eyebrow: string;
    title: string;
    description: string;
    items: SkillGroup[];
  };

  cta: {
    eyebrow: string;
    title: string;
    description: string;
  };
};

export type HomeTranslation = {
  hero: {
    availability: string;
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    description: string;

    architecture: {
      title: string;

      frontend: ArchitectureItem;
      backend: ArchitectureItem;
      ai: ArchitectureItem;
      data: ArchitectureItem;
      deployment: ArchitectureItem;
    };
  };

  featuredProjects: {
    eyebrow: string;
    title: string;
    description: string;
    viewAll: string;
    featured: string;
  };

  technicalNotes: {
    eyebrow: string;
    title: string;
    description: string;
    viewAll: string;
  };

  contact: {
    eyebrow: string;
    title: string;
    description: string;
    email: string;
  };
};

export type ProjectTranslation = {
  page: {
    eyebrow: string;
    title: string;
    description: string;
  };

  detail: {
    back: string;
    technologies: string;
    status: string;
    type: string;
    highlights: string;
  };
};

export type BlogTranslation = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
  };

  posts: {
    eyebrow: string;
    title: string;
    description: string;
  };

  cta: {
    eyebrow: string;
    title: string;
    description: string;
  };
};

export type CommonTranslation = {
  nav: {
    about: string;
    projects: string;
    blog: string;
    contact: string;
  };

  buttons: {
    discussProject: string;
    viewWork: string;
    downloadCV: string;
    caseStudy: string;
    liveDemo: string;
    github: string;
  };

  readArticle: string;
  rights: string;
};

