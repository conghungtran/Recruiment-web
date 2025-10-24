export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  duration: string;
  teamSize: number;
  image: string;
  gallery?: string[];
  featured: boolean;
  category: string;
  completedAt: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "retail-max-cloud-migration",
    title: "E-Commerce Platform Cloud Migration",
    client: "RetailMax Corporation",
    industry: "Retail & E-Commerce",
    summary: "Successfully migrated a high-traffic e-commerce platform to AWS, achieving 40% performance improvement and 35% cost reduction.",
    description: "RetailMax Corporation needed to modernize their legacy e-commerce infrastructure to handle growing traffic and improve customer experience. We designed and executed a comprehensive cloud migration strategy that transformed their entire technology stack.",
    challenge: "RetailMax's legacy infrastructure was struggling with scalability issues, frequent downtime during peak sales periods, and high operational costs. Their monolithic application architecture made it difficult to deploy new features quickly and respond to market demands.",
    solution: "We implemented a phased migration approach, re-architecting their monolithic application into microservices deployed on AWS EKS (Elastic Kubernetes Service). We utilized AWS RDS for database management, CloudFront for content delivery, and implemented comprehensive monitoring with CloudWatch and Datadog.",
    results: [
      "40% improvement in application performance",
      "35% reduction in infrastructure costs",
      "99.99% uptime during peak sales periods",
      "50% faster deployment cycles",
      "Ability to handle 5x traffic spikes seamlessly",
      "Enhanced security with AWS security best practices"
    ],
    technologies: ["AWS", "Kubernetes", "Docker", "Node.js", "React", "PostgreSQL", "Redis", "CloudFront"],
    duration: "6 months",
    teamSize: 12,
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    ],
    featured: true,
    category: "Cloud Migration",
    completedAt: "2024-01-20",
    metrics: [
      { label: "Performance Gain", value: "40%" },
      { label: "Cost Reduction", value: "35%" },
      { label: "Uptime", value: "99.99%" }
    ]
  },
  {
    id: "2",
    slug: "financial-services-security",
    title: "Banking Security Infrastructure Overhaul",
    client: "SecureBank Financial",
    industry: "Financial Services",
    summary: "Implemented comprehensive cybersecurity solutions for a regional bank, achieving ISO 27001 compliance and reducing security incidents by 85%.",
    description: "SecureBank Financial required a complete security infrastructure upgrade to meet regulatory requirements and protect against sophisticated cyber threats. We delivered an enterprise-grade security solution that exceeded compliance standards.",
    challenge: "The bank faced increasing cybersecurity threats, regulatory pressure to achieve ISO 27001 certification, and outdated security infrastructure that couldn't protect against modern attack vectors. They needed a comprehensive security transformation without disrupting ongoing operations.",
    solution: "We implemented a defense-in-depth security architecture including next-generation firewalls, intrusion detection/prevention systems, SIEM (Security Information and Event Management), multi-factor authentication, and data encryption at rest and in transit. We also conducted extensive security training for all staff members.",
    results: [
      "Achieved ISO 27001 certification within 8 months",
      "85% reduction in security incidents",
      "100% compliance with banking regulations",
      "Zero data breaches since implementation",
      "Real-time threat detection and response",
      "Enhanced customer trust and satisfaction"
    ],
    technologies: ["Palo Alto Networks", "Splunk", "Azure Sentinel", "CrowdStrike", "Fortinet", "Okta"],
    duration: "8 months",
    teamSize: 10,
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80",
    featured: true,
    category: "Cybersecurity",
    completedAt: "2024-01-10",
    metrics: [
      { label: "Security Improvement", value: "85%" },
      { label: "Compliance", value: "100%" },
      { label: "Data Breaches", value: "0" }
    ]
  },
  {
    id: "3",
    slug: "healthcare-patient-portal",
    title: "Healthcare Patient Portal Development",
    client: "HealthCare Plus",
    industry: "Healthcare",
    summary: "Built a comprehensive patient portal with telemedicine capabilities, serving 100,000+ patients and improving patient engagement by 65%.",
    description: "HealthCare Plus needed a modern patient portal to enhance patient engagement, enable telemedicine, and streamline administrative processes. We delivered a HIPAA-compliant solution that transformed their patient experience.",
    challenge: "The healthcare provider had no digital patient engagement platform, resulting in high administrative overhead, poor patient satisfaction, and missed opportunities for preventive care. They needed a solution that was secure, user-friendly, and HIPAA-compliant.",
    solution: "We developed a comprehensive web and mobile application using React Native for cross-platform compatibility. The portal includes appointment scheduling, telemedicine video consultations, electronic health records access, prescription refills, and secure messaging with healthcare providers. We integrated with their existing EHR system and implemented strict security measures for HIPAA compliance.",
    results: [
      "100,000+ registered patients within first year",
      "65% increase in patient engagement",
      "45% reduction in administrative phone calls",
      "4.8/5 average user rating",
      "30% improvement in appointment adherence",
      "Full HIPAA compliance with zero violations"
    ],
    technologies: ["React Native", "Node.js", "PostgreSQL", "WebRTC", "AWS", "HL7 FHIR"],
    duration: "10 months",
    teamSize: 15,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    featured: true,
    category: "Software Development",
    completedAt: "2023-12-15",
    metrics: [
      { label: "Active Users", value: "100K+" },
      { label: "Engagement Increase", value: "65%" },
      { label: "User Rating", value: "4.8/5" }
    ]
  },
  {
    id: "4",
    slug: "logistics-iot-platform",
    title: "IoT Fleet Management Platform",
    client: "LogisticsPro Global",
    industry: "Logistics & Transportation",
    summary: "Developed an IoT-powered fleet management system that reduced fuel costs by 22% and improved delivery efficiency by 35%.",
    description: "LogisticsPro Global needed a modern fleet management solution to optimize routes, reduce operational costs, and provide real-time visibility into their logistics operations across multiple countries.",
    challenge: "Managing a fleet of 500+ vehicles across international borders with limited visibility, high fuel costs, inefficient routing, and manual reporting processes. The company needed real-time data analytics and predictive maintenance capabilities.",
    solution: "We built a comprehensive IoT platform integrating GPS tracking, vehicle telematics, and AI-powered route optimization. The system collects real-time data from vehicles, analyzes patterns, predicts maintenance needs, and optimizes delivery routes using machine learning algorithms.",
    results: [
      "22% reduction in fuel costs",
      "35% improvement in delivery efficiency",
      "Real-time visibility across entire fleet",
      "Predictive maintenance reduced breakdowns by 40%",
      "Automated reporting saving 100+ hours monthly",
      "Enhanced customer satisfaction with accurate ETAs"
    ],
    technologies: ["IoT", "Python", "TensorFlow", "MongoDB", "Apache Kafka", "React", "Google Maps API"],
    duration: "9 months",
    teamSize: 11,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    featured: true,
    category: "IoT & Analytics",
    completedAt: "2023-11-28",
    metrics: [
      { label: "Fuel Savings", value: "22%" },
      { label: "Efficiency Gain", value: "35%" },
      { label: "Fleet Size", value: "500+" }
    ]
  },
  {
    id: "5",
    slug: "manufacturing-erp-system",
    title: "Enterprise Resource Planning Modernization",
    client: "ManufactureTech Industries",
    industry: "Manufacturing",
    summary: "Modernized legacy ERP system, resulting in 50% faster order processing and 28% inventory cost reduction.",
    description: "ManufactureTech Industries needed to replace their 20-year-old ERP system with a modern, cloud-based solution that could integrate with their existing machinery and provide real-time insights.",
    challenge: "The legacy system was causing bottlenecks in production, inventory mismanagement, and inability to scale. Data silos between departments prevented efficient collaboration and decision-making.",
    solution: "We implemented a custom cloud-based ERP solution using microservices architecture, integrating production management, inventory control, supply chain, finance, and HR modules. The system includes real-time dashboards, automated workflows, and predictive analytics for demand forecasting.",
    results: [
      "50% faster order processing",
      "28% reduction in inventory costs",
      "Real-time visibility across all departments",
      "Eliminated data silos and manual data entry",
      "Improved demand forecasting accuracy by 45%",
      "Enhanced collaboration between departments"
    ],
    technologies: ["Angular", "Java Spring Boot", "PostgreSQL", "Apache Kafka", "Docker", "Kubernetes"],
    duration: "12 months",
    teamSize: 18,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    featured: false,
    category: "Enterprise Systems",
    completedAt: "2023-10-05",
    metrics: [
      { label: "Processing Speed", value: "+50%" },
      { label: "Cost Reduction", value: "28%" },
      { label: "Forecast Accuracy", value: "+45%" }
    ]
  },
  {
    id: "6",
    slug: "fintech-mobile-banking",
    title: "Mobile Banking Application",
    client: "NeoBank Digital",
    industry: "Financial Technology",
    summary: "Launched a feature-rich mobile banking app that acquired 250,000+ users in the first 6 months with 4.7/5 app store rating.",
    description: "NeoBank Digital, a new digital-only bank, needed a comprehensive mobile banking application to compete with established banks and fintech startups.",
    challenge: "Enter a competitive market with a compelling mobile-first banking experience, ensure top-tier security, integrate with banking infrastructure, and achieve regulatory compliance while maintaining excellent user experience.",
    solution: "We developed native iOS and Android applications with features including instant account opening, P2P transfers, bill payments, budgeting tools, investment options, and biometric authentication. The app includes AI-powered financial insights and 24/7 chatbot support.",
    results: [
      "250,000+ users acquired in first 6 months",
      "4.7/5 average app store rating",
      "85% user retention rate",
      "Average session time of 8 minutes",
      "Successfully passed all regulatory audits",
      "Featured in App Store's 'New Apps We Love'"
    ],
    technologies: ["Swift", "Kotlin", "Node.js", "MongoDB", "AWS", "Firebase", "Plaid API"],
    duration: "8 months",
    teamSize: 14,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    featured: false,
    category: "Mobile Development",
    completedAt: "2023-09-12",
    metrics: [
      { label: "Users", value: "250K+" },
      { label: "App Rating", value: "4.7/5" },
      { label: "Retention", value: "85%" }
    ]
  }
];

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
  return projects.filter(project => project.category === category);
}

export function getProjectsByIndustry(industry: string): Project[] {
  return projects.filter(project => project.industry === industry);
}

export function getAllProjectSlugs(): string[] {
  return projects.map(project => project.slug);
}

