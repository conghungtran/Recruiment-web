export interface Job {
  id: string;
  slug: string;
  title: string;
  location: string;
  department: string;
  shortDescription: string;
  description: string;
  requirements: string[];
  benefits: string[];
  featured: boolean;
}

export const jobs: Job[] = [
  {
    id: "1",
    slug: "senior-full-stack-developer",
    title: "Senior Full Stack Developer",
    location: "Ho Chi Minh City, Vietnam",
    department: "Engineering",
    shortDescription: "Join our engineering team to build scalable web applications using modern technologies and frameworks.",
    description: `We are seeking an experienced Full Stack Developer to join our dynamic engineering team. You will be responsible for designing, developing, and maintaining web applications that serve thousands of users. You'll work with cutting-edge technologies and collaborate with cross-functional teams to deliver high-quality solutions.

As a Senior Full Stack Developer, you will lead technical initiatives, mentor junior developers, and contribute to architectural decisions. This role offers the opportunity to work on challenging projects that directly impact our business growth.`,
    requirements: [
      "5+ years of experience in full-stack web development",
      "Strong proficiency in JavaScript/TypeScript, React, Node.js, and Next.js",
      "Experience with modern CSS frameworks (Tailwind CSS preferred)",
      "Solid understanding of RESTful APIs and database design (SQL/NoSQL)",
      "Experience with version control (Git) and CI/CD pipelines",
      "Strong problem-solving skills and attention to detail",
      "Excellent communication skills in English",
      "Bachelor's degree in Computer Science or related field"
    ],
    benefits: [
      "Competitive salary and performance bonuses",
      "Flexible working hours and remote work options",
      "Health insurance and annual health check-ups",
      "Professional development opportunities and training budget",
      "Modern office environment with latest tech equipment",
      "Team building activities and company trips",
      "13th-month salary and annual salary review",
      "Free snacks, drinks, and parking"
    ],
    featured: true
  },
  {
    id: "2",
    slug: "devops-engineer",
    title: "DevOps Engineer",
    location: "Ho Chi Minh City, Vietnam",
    department: "Infrastructure",
    shortDescription: "Help us build and maintain robust infrastructure for our cloud-native applications and services.",
    description: `We're looking for a talented DevOps Engineer to join our infrastructure team. You will be responsible for designing, implementing, and maintaining our cloud infrastructure, automating deployment processes, and ensuring high availability of our services.

In this role, you'll work closely with development teams to improve our CI/CD pipelines, optimize system performance, and implement best practices for security and reliability. You'll have the opportunity to work with modern cloud technologies and contribute to our infrastructure strategy.`,
    requirements: [
      "3+ years of experience in DevOps or Site Reliability Engineering",
      "Strong experience with cloud platforms (AWS, Azure, or GCP)",
      "Proficiency in containerization (Docker, Kubernetes)",
      "Experience with Infrastructure as Code (Terraform, CloudFormation)",
      "Strong scripting skills (Python, Bash, or PowerShell)",
      "Knowledge of monitoring and logging tools (Prometheus, Grafana, ELK)",
      "Understanding of networking, security, and system administration",
      "Experience with CI/CD tools (Jenkins, GitLab CI, GitHub Actions)"
    ],
    benefits: [
      "Competitive salary package",
      "Flexible working arrangements",
      "Comprehensive health insurance",
      "Latest technology and tools",
      "Certification support (AWS, GCP, Azure)",
      "Collaborative and innovative work environment",
      "Annual performance bonus",
      "Regular team events and activities"
    ],
    featured: true
  },
  {
    id: "3",
    slug: "ui-ux-designer",
    title: "UI/UX Designer",
    location: "Ho Chi Minh City, Vietnam",
    department: "Design",
    shortDescription: "Create beautiful and intuitive user experiences for our digital products and services.",
    description: `We are seeking a creative and user-focused UI/UX Designer to join our design team. You will be responsible for creating engaging user interfaces and exceptional user experiences across our web and mobile applications.

You'll work closely with product managers and developers to transform ideas into intuitive designs. Your work will directly impact how users interact with our products, and you'll have the opportunity to shape the visual identity of our brand.`,
    requirements: [
      "3+ years of experience in UI/UX design",
      "Strong portfolio demonstrating web and mobile design projects",
      "Proficiency in design tools (Figma, Sketch, Adobe XD)",
      "Understanding of user-centered design principles and methodologies",
      "Experience conducting user research and usability testing",
      "Knowledge of responsive design and mobile-first approach",
      "Basic understanding of HTML/CSS and front-end technologies",
      "Excellent visual design skills with attention to typography, color, and layout"
    ],
    benefits: [
      "Attractive salary and benefits package",
      "Creative and inspiring work environment",
      "Latest design software and hardware (MacBook Pro, design tools)",
      "Professional growth opportunities",
      "Health insurance coverage",
      "Flexible working hours",
      "Regular design workshops and training",
      "Annual company trips and team activities"
    ],
    featured: true
  },
  {
    id: "4",
    slug: "project-manager",
    title: "Technical Project Manager",
    location: "Ho Chi Minh City, Vietnam",
    department: "Project Management",
    shortDescription: "Lead cross-functional teams to deliver technology projects on time and within budget.",
    description: `We are looking for an experienced Technical Project Manager to oversee our software development projects. You will be responsible for planning, executing, and delivering projects while ensuring alignment with business objectives and stakeholder expectations.

As a Technical Project Manager, you'll coordinate between technical teams, stakeholders, and clients. You'll manage project timelines, resources, and budgets while fostering a collaborative environment that enables teams to do their best work.`,
    requirements: [
      "5+ years of experience in technical project management",
      "Strong understanding of software development lifecycle and Agile methodologies",
      "Proven track record of delivering complex technical projects",
      "Excellent leadership and team management skills",
      "Strong communication and stakeholder management abilities",
      "Experience with project management tools (Jira, Asana, MS Project)",
      "PMP or Agile certification is a plus",
      "Bachelor's degree in Computer Science, Engineering, or related field"
    ],
    benefits: [
      "Competitive compensation package",
      "Leadership development programs",
      "Health and wellness benefits",
      "Flexible work arrangements",
      "Performance-based bonuses",
      "Professional certification support",
      "International project opportunities",
      "Modern office facilities"
    ],
    featured: true
  },
  {
    id: "5",
    slug: "data-analyst",
    title: "Data Analyst",
    location: "Ho Chi Minh City, Vietnam",
    department: "Data & Analytics",
    shortDescription: "Transform data into actionable insights to drive business decisions and strategy.",
    description: `Join our data team as a Data Analyst where you'll turn complex data into actionable insights. You will work with large datasets, create meaningful reports and dashboards, and help stakeholders make data-driven decisions.

You'll collaborate with various departments to understand their data needs, develop analytics solutions, and communicate findings effectively. This role offers the opportunity to work with modern data tools and contribute to our data-driven culture.`,
    requirements: [
      "3+ years of experience in data analysis or business intelligence",
      "Strong proficiency in SQL and data visualization tools (Tableau, Power BI)",
      "Experience with Python or R for data analysis",
      "Understanding of statistical analysis and data modeling",
      "Ability to translate business requirements into technical solutions",
      "Strong analytical and problem-solving skills",
      "Excellent presentation and communication skills",
      "Bachelor's degree in Statistics, Mathematics, Computer Science, or related field"
    ],
    benefits: [
      "Competitive salary package",
      "Modern data tools and technologies",
      "Training and certification opportunities",
      "Health insurance and wellness programs",
      "Flexible working hours",
      "Collaborative work environment",
      "Career advancement opportunities",
      "Annual bonuses and salary reviews"
    ],
    featured: true
  }
];

export function getFeaturedJobs(): Job[] {
  return jobs.filter(job => job.featured);
}

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find(job => job.slug === slug);
}

export function getAllJobSlugs(): string[] {
  return jobs.map(job => job.slug);
}

