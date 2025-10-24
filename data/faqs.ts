export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  helpful?: number;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  socialMedia: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    github?: string;
  };
  businessHours: {
    weekdays: string;
    weekends: string;
  };
}

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "What services does VTech provide?",
    answer: "VTech offers comprehensive IT solutions including Cloud Infrastructure, Cybersecurity, Custom Software Development, Data Analytics & AI, DevOps & Automation, and Digital Transformation Consulting. We work with businesses of all sizes across various industries to deliver tailored technology solutions that drive business growth.",
    category: "General",
    order: 1,
    helpful: 145
  },
  {
    id: "2",
    question: "How do I get started with VTech?",
    answer: "Getting started is easy! Simply reach out to us through our contact form, email, or phone. We'll schedule an initial consultation to understand your needs, challenges, and goals. After the consultation, we'll provide a customized proposal outlining our recommended solution, timeline, and pricing.",
    category: "General",
    order: 2,
    helpful: 132
  },
  {
    id: "3",
    question: "What industries do you serve?",
    answer: "We serve a wide range of industries including Financial Services, Healthcare, Retail & E-Commerce, Manufacturing, Logistics, Education, and more. Our team has deep expertise across multiple sectors and can adapt our solutions to meet industry-specific requirements and compliance standards.",
    category: "General",
    order: 3,
    helpful: 98
  },
  {
    id: "4",
    question: "Do you offer support after project completion?",
    answer: "Yes, we provide comprehensive post-launch support and maintenance services. Our support packages include 24/7 monitoring, regular updates, bug fixes, performance optimization, and technical assistance. We offer flexible support plans tailored to your needs and budget.",
    category: "General",
    order: 4,
    helpful: 156
  },
  {
    id: "5",
    question: "What is your typical project timeline?",
    answer: "Project timelines vary based on scope and complexity. Small projects may take 2-3 months, while larger enterprise solutions can take 6-12 months or more. During our initial consultation, we'll provide a detailed timeline specific to your project, including key milestones and deliverables.",
    category: "Projects",
    order: 5,
    helpful: 89
  },
  {
    id: "6",
    question: "How much do your services cost?",
    answer: "Our pricing is project-based and depends on several factors including scope, complexity, timeline, and technology requirements. We provide transparent, competitive pricing with no hidden fees. After understanding your requirements, we'll provide a detailed proposal with clear cost breakdowns.",
    category: "Pricing",
    order: 6,
    helpful: 201
  },
  {
    id: "7",
    question: "Do you work with remote teams?",
    answer: "Yes, we have extensive experience working with remote and distributed teams. We use modern collaboration tools and agile methodologies to ensure seamless communication and project management. We can work fully remote, on-site, or in a hybrid model based on your preference.",
    category: "Projects",
    order: 7,
    helpful: 76
  },
  {
    id: "8",
    question: "What cloud platforms do you specialize in?",
    answer: "We are certified experts in the major cloud platforms: Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform (GCP). We can help you choose the right platform for your needs, or work with your existing cloud infrastructure. We also specialize in multi-cloud and hybrid cloud architectures.",
    category: "Cloud Services",
    order: 8,
    helpful: 112
  },
  {
    id: "9",
    question: "Are your solutions scalable?",
    answer: "Absolutely! Scalability is a core principle in all our solutions. We design and build systems that can grow with your business, handling increased traffic, data, and users without performance degradation. We use modern architecture patterns like microservices and cloud-native technologies to ensure scalability.",
    category: "Technical",
    order: 9,
    helpful: 94
  },
  {
    id: "10",
    question: "How do you ensure data security?",
    answer: "Security is our top priority. We implement industry best practices including encryption at rest and in transit, multi-factor authentication, regular security audits, penetration testing, and compliance with international standards (ISO 27001, SOC 2, GDPR). Our security experts ensure your data and systems remain protected against evolving threats.",
    category: "Security",
    order: 10,
    helpful: 187
  },
  {
    id: "11",
    question: "Do you provide training for our team?",
    answer: "Yes, we offer comprehensive training programs as part of our service. This includes technical training for your IT team, user training for end-users, and knowledge transfer sessions. We also provide documentation, video tutorials, and ongoing support to ensure your team can effectively use and maintain the solutions we deliver.",
    category: "Support",
    order: 11,
    helpful: 68
  },
  {
    id: "12",
    question: "Can you integrate with our existing systems?",
    answer: "Yes, we specialize in system integration and have experience working with a wide variety of legacy and modern systems. We can integrate our solutions with your existing ERP, CRM, databases, APIs, and third-party services. We ensure smooth data flow and interoperability across your technology ecosystem.",
    category: "Technical",
    order: 12,
    helpful: 103
  },
  {
    id: "13",
    question: "What is your approach to project management?",
    answer: "We follow Agile methodologies, specifically Scrum and Kanban, which allow for flexibility, transparency, and continuous improvement. You'll have regular check-ins, sprint reviews, and access to project dashboards. We assign a dedicated project manager who serves as your primary point of contact throughout the project.",
    category: "Projects",
    order: 13,
    helpful: 81
  },
  {
    id: "14",
    question: "Do you sign NDAs?",
    answer: "Yes, we're happy to sign Non-Disclosure Agreements (NDAs) to protect your confidential information. We understand the importance of confidentiality and take all necessary measures to safeguard your intellectual property and sensitive data.",
    category: "Legal",
    order: 14,
    helpful: 59
  },
  {
    id: "15",
    question: "How do you handle changes in project scope?",
    answer: "We understand that requirements can evolve during a project. We use a formal change management process where any scope changes are documented, reviewed, and approved before implementation. We'll provide updated timelines and cost estimates for any significant changes, ensuring complete transparency.",
    category: "Projects",
    order: 15,
    helpful: 72
  },
  {
    id: "16",
    question: "What makes VTech different from other IT service providers?",
    answer: "VTech stands out through our combination of technical expertise, client-focused approach, and proven track record. We have 15+ years of experience, 500+ successful projects, and certifications in leading technologies. Our team includes industry veterans who bring deep knowledge and innovative thinking to every project. We prioritize long-term partnerships over one-time transactions.",
    category: "General",
    order: 16,
    helpful: 124
  },
  {
    id: "17",
    question: "Can you help with cloud migration?",
    answer: "Yes, cloud migration is one of our core services. We provide end-to-end migration services including assessment, planning, migration execution, testing, and optimization. We minimize downtime and risk through our proven migration methodologies and have successfully migrated hundreds of applications to the cloud.",
    category: "Cloud Services",
    order: 17,
    helpful: 95
  },
  {
    id: "18",
    question: "Do you offer emergency support?",
    answer: "Yes, we offer 24/7 emergency support for critical issues. Our support team is available around the clock to address urgent problems that impact your business operations. Response times vary based on your support plan, with our premium plans offering response times of 15 minutes or less.",
    category: "Support",
    order: 18,
    helpful: 108
  },
  {
    id: "19",
    question: "What programming languages and technologies do you work with?",
    answer: "Our team is proficient in a wide range of technologies including JavaScript/TypeScript, Python, Java, C#, Go, React, Angular, Vue.js, Node.js, .NET, Spring Boot, and more. We also have expertise in databases (SQL, NoSQL), cloud platforms, DevOps tools, AI/ML frameworks, and mobile development (iOS, Android, React Native, Flutter).",
    category: "Technical",
    order: 19,
    helpful: 87
  },
  {
    id: "20",
    question: "How can I track project progress?",
    answer: "We provide full transparency through project management tools like Jira, Asana, or Trello. You'll have real-time access to project boards, sprint progress, completed tasks, and upcoming milestones. We also schedule regular status meetings and provide detailed progress reports at agreed intervals.",
    category: "Projects",
    order: 20,
    helpful: 64
  }
];

export const contactInfo: ContactInfo = {
  email: "contact@vtech.com",
  phone: "+84 28 1234 5678",
  address: {
    street: "123 Innovation Boulevard, District 1",
    city: "Ho Chi Minh City",
    state: "Ho Chi Minh",
    country: "Vietnam",
    postalCode: "700000"
  },
  socialMedia: {
    linkedin: "https://linkedin.com/company/vtech",
    twitter: "https://twitter.com/vtech",
    facebook: "https://facebook.com/vtech",
    github: "https://github.com/vtech"
  },
  businessHours: {
    weekdays: "Monday - Friday: 9:00 AM - 6:00 PM ICT",
    weekends: "Saturday - Sunday: Closed"
  }
};

export function getFAQsByCategory(category: string): FAQ[] {
  return faqs.filter(faq => faq.category === category).sort((a, b) => a.order - b.order);
}

export function getAllFAQCategories(): string[] {
  return Array.from(new Set(faqs.map(faq => faq.category)));
}

export function getFAQById(id: string): FAQ | undefined {
  return faqs.find(faq => faq.id === id);
}

export function searchFAQs(query: string): FAQ[] {
  const lowercaseQuery = query.toLowerCase();
  return faqs.filter(
    faq => 
      faq.question.toLowerCase().includes(lowercaseQuery) ||
      faq.answer.toLowerCase().includes(lowercaseQuery)
  );
}

