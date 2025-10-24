export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  benefits: string[];
  technologies?: string[];
  caseStudies?: {
    title: string;
    client: string;
    result: string;
  }[];
  featured: boolean;
  category: string;
}

export const services: Service[] = [
  {
    id: "1",
    slug: "cloud-infrastructure",
    title: "Cloud Infrastructure Solutions",
    shortDescription: "Scalable and secure cloud infrastructure designed to power your business transformation.",
    description: `Transform your IT infrastructure with our enterprise-grade cloud solutions. We provide comprehensive cloud services including migration, optimization, and management across AWS, Azure, and Google Cloud Platform.

Our cloud infrastructure solutions are designed to scale with your business needs while ensuring maximum uptime, security, and performance. We leverage cutting-edge technologies and best practices to deliver robust, cost-effective cloud environments.`,
    icon: "cloud",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    features: [
      "Multi-cloud architecture design and implementation",
      "Cloud migration and modernization services",
      "Auto-scaling and load balancing",
      "Disaster recovery and backup solutions",
      "24/7 monitoring and support",
      "Cost optimization and resource management"
    ],
    benefits: [
      "Up to 40% cost reduction through intelligent resource allocation",
      "99.99% uptime guarantee",
      "Enhanced security with enterprise-grade protection",
      "Seamless scalability to match business growth",
      "Reduced time-to-market for new applications"
    ],
    technologies: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Terraform", "Docker"],
    caseStudies: [
      {
        title: "E-commerce Platform Migration",
        client: "RetailMax Corp",
        result: "Achieved 40% performance improvement and 35% cost reduction"
      }
    ],
    featured: true,
    category: "Infrastructure"
  },
  {
    id: "2",
    slug: "cybersecurity-services",
    title: "Cybersecurity & Compliance",
    shortDescription: "Comprehensive security solutions to protect your business from evolving cyber threats.",
    description: `Protect your valuable data and systems with our comprehensive cybersecurity services. We provide end-to-end security solutions including threat detection, vulnerability assessment, penetration testing, and compliance management.

Our certified security experts implement industry-leading security frameworks and best practices to safeguard your organization against evolving cyber threats.`,
    icon: "shield",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    features: [
      "Security assessment and vulnerability testing",
      "24/7 threat monitoring and incident response",
      "Identity and access management (IAM)",
      "Data encryption and protection",
      "Compliance management (ISO 27001, SOC 2, GDPR)",
      "Security awareness training"
    ],
    benefits: [
      "Reduced security incidents by up to 85%",
      "Compliance with international security standards",
      "Real-time threat detection and response",
      "Protection of sensitive data and intellectual property",
      "Enhanced customer trust and reputation"
    ],
    technologies: ["Splunk", "CrowdStrike", "Palo Alto", "Azure Sentinel", "Fortinet"],
    featured: true,
    category: "Security"
  },
  {
    id: "3",
    slug: "custom-software-development",
    title: "Custom Software Development",
    shortDescription: "Tailored software solutions built with modern technologies to meet your unique business needs.",
    description: `We design and develop custom software applications that perfectly align with your business objectives. Our experienced development team specializes in creating scalable, maintainable solutions using the latest technologies and agile methodologies.

From web applications to mobile apps and enterprise systems, we deliver high-quality software that drives business growth and operational efficiency.`,
    icon: "code",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    features: [
      "Full-stack web application development",
      "Mobile app development (iOS & Android)",
      "API design and integration",
      "Legacy system modernization",
      "Microservices architecture",
      "Agile development methodology"
    ],
    benefits: [
      "Custom solutions tailored to your exact requirements",
      "Faster time-to-market with agile approach",
      "Scalable architecture for future growth",
      "Clean, maintainable codebase",
      "Ongoing support and maintenance"
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "Python", "React Native"],
    featured: true,
    category: "Development"
  },
  {
    id: "4",
    slug: "data-analytics-ai",
    title: "Data Analytics & AI Solutions",
    shortDescription: "Transform your data into actionable insights with advanced analytics and artificial intelligence.",
    description: `Unlock the power of your data with our advanced analytics and AI solutions. We help organizations leverage machine learning, predictive analytics, and business intelligence to make data-driven decisions and gain competitive advantages.

Our data scientists and AI engineers build custom models and analytics platforms that turn raw data into valuable business insights.`,
    icon: "chart",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    features: [
      "Business intelligence and reporting",
      "Predictive analytics and forecasting",
      "Machine learning model development",
      "Natural language processing (NLP)",
      "Computer vision solutions",
      "Real-time data streaming and processing"
    ],
    benefits: [
      "Data-driven decision making",
      "Improved operational efficiency",
      "Enhanced customer insights",
      "Predictive maintenance and cost savings",
      "Automated business processes"
    ],
    technologies: ["Python", "TensorFlow", "PyTorch", "Apache Spark", "Power BI", "Tableau"],
    featured: true,
    category: "Analytics"
  },
  {
    id: "5",
    slug: "devops-automation",
    title: "DevOps & Automation",
    shortDescription: "Accelerate software delivery with DevOps practices and CI/CD automation.",
    description: `Streamline your software delivery pipeline with our DevOps and automation services. We implement industry best practices for continuous integration, continuous deployment, and infrastructure automation to help your team deliver software faster and more reliably.

Our DevOps experts design and implement automated workflows that reduce manual effort, minimize errors, and accelerate time-to-market.`,
    icon: "cog",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",
    features: [
      "CI/CD pipeline design and implementation",
      "Infrastructure as Code (IaC)",
      "Container orchestration with Kubernetes",
      "Automated testing and quality assurance",
      "Release management and deployment automation",
      "Monitoring and observability solutions"
    ],
    benefits: [
      "Up to 60% faster software delivery",
      "Reduced deployment failures",
      "Improved collaboration between teams",
      "Automated testing and quality gates",
      "Consistent and repeatable deployments"
    ],
    technologies: ["Jenkins", "GitLab CI", "GitHub Actions", "Terraform", "Ansible", "Prometheus"],
    featured: true,
    category: "Operations"
  },
  {
    id: "6",
    slug: "digital-transformation",
    title: "Digital Transformation Consulting",
    shortDescription: "Strategic guidance to modernize your business processes and embrace digital innovation.",
    description: `Navigate your digital transformation journey with confidence. Our consulting services help organizations develop and execute comprehensive digital strategies that drive business value, improve customer experiences, and create competitive advantages.

We combine strategic thinking with technical expertise to guide your transformation from planning through implementation and beyond.`,
    icon: "trending-up",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    features: [
      "Digital strategy development",
      "Business process optimization",
      "Change management and training",
      "Technology roadmap planning",
      "Legacy system modernization",
      "Innovation workshops and ideation"
    ],
    benefits: [
      "Clear digital transformation roadmap",
      "Improved operational efficiency",
      "Enhanced customer experience",
      "Reduced operational costs",
      "Competitive advantage through innovation"
    ],
    technologies: ["Agile", "Design Thinking", "Lean", "Six Sigma"],
    featured: false,
    category: "Consulting"
  }
];

export function getFeaturedServices(): Service[] {
  return services.filter(service => service.featured);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(service => service.slug === slug);
}

export function getServicesByCategory(category: string): Service[] {
  return services.filter(service => service.category === category);
}

export function getAllServiceSlugs(): string[] {
  return services.map(service => service.slug);
}

