export interface TeamMember {
  id: string;
  name: string;
  position: string;
  department: string;
  bio: string;
  avatar: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  specialties?: string[];
  featured: boolean;
}

export interface CompanyStats {
  years: number;
  clients: number;
  projects: number;
  teamMembers: number;
  countries: number;
}

export interface Achievement {
  id: string;
  year: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string;
  category: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "David Lee",
    position: "Chief Executive Officer",
    department: "Executive",
    bio: "With over 20 years of experience in technology leadership, David founded VTech with a vision to deliver innovative IT solutions that drive business transformation. He leads our strategic direction and fosters a culture of excellence and innovation.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    email: "david.lee@vtech.com",
    linkedin: "https://linkedin.com/in/davidlee",
    specialties: ["Strategic Planning", "Business Development", "Digital Transformation"],
    featured: true
  },
  {
    id: "2",
    name: "John Smith",
    position: "Chief Technology Officer",
    department: "Technology",
    bio: "John brings extensive experience in cloud architecture and software development. He oversees our technology strategy, ensuring we deliver cutting-edge solutions using the latest technologies and best practices.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    email: "john.smith@vtech.com",
    linkedin: "https://linkedin.com/in/johnsmith",
    specialties: ["Cloud Architecture", "Software Engineering", "AI/ML"],
    featured: true
  },
  {
    id: "3",
    name: "Sarah Johnson",
    position: "Director of Cybersecurity",
    department: "Security",
    bio: "Sarah is a certified security expert with deep expertise in enterprise security architecture. She leads our cybersecurity practice, ensuring our clients' systems and data remain protected against evolving threats.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    email: "sarah.johnson@vtech.com",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    specialties: ["Security Architecture", "Compliance", "Risk Management"],
    featured: true
  },
  {
    id: "4",
    name: "Michael Brown",
    position: "VP of Business Development",
    department: "Sales",
    bio: "Michael drives our business growth through strategic partnerships and client relationships. His expertise in IT consulting helps clients navigate their digital transformation journeys successfully.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    email: "michael.brown@vtech.com",
    linkedin: "https://linkedin.com/in/michaelbrown",
    specialties: ["Partnerships", "Client Relations", "Business Strategy"],
    featured: true
  },
  {
    id: "5",
    name: "Lisa Wang",
    position: "Head of Innovation",
    department: "Research",
    bio: "Lisa leads our innovation initiatives, exploring emerging technologies and their applications. She drives R&D efforts in AI, machine learning, and next-generation software solutions.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    email: "lisa.wang@vtech.com",
    linkedin: "https://linkedin.com/in/lisawang",
    specialties: ["Innovation", "AI/ML", "Product Development"],
    featured: true
  },
  {
    id: "6",
    name: "Robert Chen",
    position: "VP of Engineering",
    department: "Engineering",
    bio: "Robert manages our engineering teams, ensuring high-quality software delivery. With expertise in agile methodologies and modern development practices, he maintains our technical excellence.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    email: "robert.chen@vtech.com",
    specialties: ["Software Engineering", "Agile", "Team Leadership"],
    featured: false
  },
  {
    id: "7",
    name: "Emma Davis",
    position: "Director of Design",
    department: "Design",
    bio: "Emma leads our design team, creating intuitive and beautiful user experiences. Her user-centered approach ensures our products are both functional and delightful to use.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    email: "emma.davis@vtech.com",
    specialties: ["UI/UX Design", "User Research", "Design Systems"],
    featured: false
  },
  {
    id: "8",
    name: "James Wilson",
    position: "Head of Cloud Services",
    department: "Infrastructure",
    bio: "James specializes in cloud infrastructure and DevOps practices. He helps clients optimize their cloud environments for performance, security, and cost-efficiency.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    email: "james.wilson@vtech.com",
    specialties: ["Cloud Infrastructure", "DevOps", "System Architecture"],
    featured: false
  }
];

export const companyStats: CompanyStats = {
  years: 15,
  clients: 500,
  projects: 1200,
  teamMembers: 150,
  countries: 12
};

export const achievements: Achievement[] = [
  {
    id: "1",
    year: "2024",
    title: "ISO 27001 Certification Achieved",
    description: "Successfully achieved ISO 27001 certification, demonstrating our commitment to information security management.",
    icon: "award"
  },
  {
    id: "2",
    year: "2023",
    title: "Best Digital Innovation Award",
    description: "Recognized at the Annual Tech Excellence Summit for outstanding contributions to digital transformation.",
    icon: "trophy"
  },
  {
    id: "3",
    year: "2023",
    title: "New R&D Center Launch",
    description: "Opened state-of-the-art R&D facility in Ho Chi Minh City, expanding our innovation capabilities.",
    icon: "building"
  },
  {
    id: "4",
    year: "2022",
    title: "500+ Clients Milestone",
    description: "Reached a major milestone of serving over 500 clients across 12 countries worldwide.",
    icon: "users"
  },
  {
    id: "5",
    year: "2021",
    title: "AI Platform Launch",
    description: "Launched proprietary AI-powered cloud platform, revolutionizing infrastructure management.",
    icon: "cpu"
  },
  {
    id: "6",
    year: "2020",
    title: "Strategic Partnership Expansion",
    description: "Formed partnerships with leading fintech companies to deliver innovative financial solutions.",
    icon: "handshake"
  }
];

export const partners: Partner[] = [
  {
    id: "1",
    name: "Vietcombank",
    logo: "https://logo.clearbit.com/vietcombank.com.vn",
    url: "https://vietcombank.com.vn",
    category: "Financial"
  },
  {
    id: "2",
    name: "Techcombank",
    logo: "https://logo.clearbit.com/techcombank.com.vn",
    url: "https://techcombank.com.vn",
    category: "Financial"
  },
  {
    id: "3",
    name: "FPT Software",
    logo: "https://logo.clearbit.com/fpt.com.vn",
    url: "https://fpt.com.vn",
    category: "Technology"
  },
  {
    id: "4",
    name: "CMC Corporation",
    logo: "https://logo.clearbit.com/cmcglobal.com.vn",
    url: "https://cmcglobal.com.vn",
    category: "Technology"
  },
  {
    id: "5",
    name: "Viettel Digital",
    logo: "https://logo.clearbit.com/viettel.com.vn",
    url: "https://viettel.com.vn",
    category: "Telecommunications"
  },
  {
    id: "6",
    name: "VNPT IT",
    logo: "https://logo.clearbit.com/vnpt.com.vn",
    url: "https://vnpt.com.vn",
    category: "Telecommunications"
  },
  {
    id: "7",
    name: "Bamboo Airways",
    logo: "https://logo.clearbit.com/bambooairways.com",
    url: "https://bambooairways.com",
    category: "Transportation"
  },
  {
    id: "8",
    name: "Vinhomes",
    logo: "https://logo.clearbit.com/vinhomes.com.vn",
    url: "https://vinhomes.com.vn",
    category: "Real Estate"
  },
  {
    id: "9",
    name: "Grab Vietnam",
    logo: "https://logo.clearbit.com/grab.com",
    url: "https://grab.com",
    category: "Transportation"
  },
  {
    id: "10",
    name: "Shopee Vietnam",
    logo: "https://logo.clearbit.com/shopee.vn",
    url: "https://shopee.vn",
    category: "E-Commerce"
  },
  {
    id: "11",
    name: "Lazada Vietnam",
    logo: "https://logo.clearbit.com/lazada.vn",
    url: "https://lazada.vn",
    category: "E-Commerce"
  },
  {
    id: "12",
    name: "MoMo",
    logo: "https://logo.clearbit.com/momo.vn",
    url: "https://momo.vn",
    category: "Fintech"
  }
];

export function getFeaturedTeamMembers(): TeamMember[] {
  return teamMembers.filter(member => member.featured);
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  return teamMembers.find(member => member.id === id);
}

export function getTeamMembersByDepartment(department: string): TeamMember[] {
  return teamMembers.filter(member => member.department === department);
}

export function getPartnersByCategory(category: string): Partner[] {
  return partners.filter(partner => partner.category === category);
}

