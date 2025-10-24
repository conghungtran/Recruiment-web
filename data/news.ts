export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  published: boolean;
}

export const newsArticles: NewsArticle[] = [
  {
    id: "1",
    slug: "ai-powered-cloud-solutions",
    title: "VTech Launches Advanced AI-Powered Cloud Solutions",
    excerpt: "Our new AI-powered cloud infrastructure promises 40% better performance and enhanced security features for enterprise clients.",
    content: `VTech is proud to announce the launch of our revolutionary AI-powered cloud solutions. This groundbreaking technology combines artificial intelligence with robust cloud infrastructure to deliver unprecedented performance improvements for our enterprise clients.

The new platform leverages machine learning algorithms to optimize resource allocation, predict system bottlenecks, and automatically scale infrastructure based on demand patterns. Our clients have reported up to 40% improvement in application performance and significant cost savings through intelligent resource management.

Key features include:
- Intelligent auto-scaling based on AI predictions
- Enhanced security with ML-powered threat detection
- Real-time performance optimization
- Comprehensive monitoring and analytics dashboard
- 99.99% uptime guarantee

This launch represents a major milestone in our mission to provide cutting-edge technology solutions that drive business transformation. We're committed to continuous innovation and delivering exceptional value to our clients.`,
    date: "2024-01-15",
    author: "John Smith, CTO",
    category: "Cloud Solutions",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    published: true
  },
  {
    id: "2",
    slug: "iso-27001-certification",
    title: "Cybersecurity Excellence: VTech Achieves ISO 27001 Certification",
    excerpt: "This certification demonstrates our commitment to maintaining the highest standards of information security management.",
    content: `VTech has successfully achieved ISO 27001 certification, the international standard for information security management systems. This achievement demonstrates our unwavering commitment to protecting our clients' data and maintaining the highest security standards.

The certification process involved a comprehensive audit of our security policies, procedures, and technical controls. Our team worked diligently to ensure all aspects of our information security management system meet or exceed international standards.

This certification validates our approach to:
- Risk assessment and management
- Security policy implementation
- Access control and authentication
- Data encryption and protection
- Incident response procedures
- Business continuity planning

We're proud of this achievement and will continue to invest in security measures to protect our clients' valuable information assets.`,
    date: "2024-01-10",
    author: "Sarah Johnson, Security Director",
    category: "Cybersecurity",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80",
    published: true
  },
  {
    id: "3",
    slug: "fintech-partnerships",
    title: "Partnership Announcement: VTech Teams Up with Leading Fintech Companies",
    excerpt: "Strategic partnerships will enable us to deliver innovative financial technology solutions to the banking sector.",
    content: `VTech is excited to announce strategic partnerships with several leading fintech companies. These collaborations will enable us to deliver comprehensive financial technology solutions to banks and financial institutions.

Our new partnerships bring together expertise in digital payments, blockchain technology, and financial analytics. Together, we'll develop innovative solutions that help financial institutions modernize their operations and deliver better services to their customers.

The partnerships will focus on:
- Digital banking platforms
- Payment processing solutions
- Blockchain and cryptocurrency integration
- AI-powered financial analytics
- Regulatory compliance tools

These collaborations represent our commitment to driving innovation in the financial services sector and helping our clients stay ahead in a rapidly evolving digital landscape.`,
    date: "2024-01-05",
    author: "Michael Brown, VP Business Development",
    category: "Partnerships",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&q=80",
    published: true
  },
  {
    id: "4",
    slug: "new-rd-center-hcm",
    title: "VTech Expands Operations with New R&D Center in Ho Chi Minh City",
    excerpt: "The new facility will focus on developing cutting-edge software solutions and will create 200+ new job opportunities.",
    content: `VTech is expanding its operations with a state-of-the-art Research & Development center in Ho Chi Minh City, Vietnam. This 10,000 square meter facility will serve as a hub for innovation and software development excellence.

The new R&D center will focus on developing next-generation software solutions in areas including artificial intelligence, cloud computing, and cybersecurity. We're investing significantly in creating a world-class work environment that attracts top talent and fosters innovation.

Highlights of the new facility:
- Modern collaborative workspaces
- Advanced technology labs
- Innovation center for prototyping
- Training and development facilities
- Recreational areas and amenities

This expansion will create over 200 new job opportunities for software engineers, data scientists, designers, and other technology professionals. We're committed to contributing to Vietnam's growing technology ecosystem and developing local talent.`,
    date: "2023-12-28",
    author: "David Lee, CEO",
    category: "Company Growth",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
    published: true
  },
  {
    id: "5",
    slug: "innovation-award-2023",
    title: "Innovation Award: VTech Recognized for Outstanding Digital Transformation Solutions",
    excerpt: "We are proud to receive the 'Best Digital Innovation' award at the Annual Tech Excellence Summit 2023.",
    content: `VTech has been honored with the prestigious 'Best Digital Innovation' award at the Annual Tech Excellence Summit 2023. This recognition celebrates our outstanding contributions to digital transformation and technology innovation.

The award specifically recognizes our comprehensive digital transformation platform that has helped dozens of enterprises modernize their operations and achieve significant business outcomes. Our solutions have enabled clients to increase operational efficiency, improve customer experiences, and drive revenue growth.

Key achievements that led to this recognition:
- 500+ successful digital transformation projects
- Average 35% improvement in operational efficiency
- 95% client satisfaction rate
- Industry-leading innovation in AI and cloud technologies
- Commitment to sustainable technology practices

We're grateful for this recognition and remain committed to pushing the boundaries of what's possible in technology. This award motivates us to continue delivering exceptional value to our clients and contributing to the advancement of the technology industry.`,
    date: "2023-12-20",
    author: "Lisa Wang, Head of Innovation",
    category: "Awards",
    image: "https://images.unsplash.com/photo-1569705460033-cfaa4bf9f822?w=800&q=80",
    published: true
  }
];

export function getPublishedNews(): NewsArticle[] {
  return newsArticles.filter(article => article.published);
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find(article => article.slug === slug);
}

export function getNewsById(id: string): NewsArticle | undefined {
  return newsArticles.find(article => article.id === id);
}

