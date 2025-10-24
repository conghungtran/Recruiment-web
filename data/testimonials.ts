export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  rating: number;
  avatar?: string;
  published: boolean;
  createdAt: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Chen",
    position: "CTO",
    company: "TechCorp Solutions",
    testimonial: "VTech transformed our entire IT infrastructure with their cloud solutions. The 40% performance improvement exceeded our expectations, and their support team is exceptional.",
    rating: 5,
    published: true,
    createdAt: "2024-01-10"
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    position: "VP Engineering",
    company: "InnovateLabs",
    testimonial: "Working with VTech has been a game-changer for our development process. Their expertise in DevOps and cloud architecture helped us reduce deployment time by 60%.",
    rating: 5,
    published: true,
    createdAt: "2024-01-08"
  },
  {
    id: "3",
    name: "Emily Watson",
    position: "CEO",
    company: "DataSystems Inc",
    testimonial: "The cybersecurity solutions implemented by VTech gave us peace of mind. Their team is professional, knowledgeable, and always available when we need support.",
    rating: 5,
    published: true,
    createdAt: "2024-01-05"
  },
  {
    id: "4",
    name: "James Kim",
    position: "Director of IT",
    company: "CloudFirst Technologies",
    testimonial: "VTech's software development team delivered our project on time and within budget. The quality of their work and attention to detail is outstanding.",
    rating: 5,
    published: true,
    createdAt: "2023-12-28"
  },
  {
    id: "5",
    name: "Lisa Anderson",
    position: "Product Manager",
    company: "FinTech Solutions",
    testimonial: "Their innovative approach to digital transformation helped us modernize our legacy systems. The results have been remarkable – improved efficiency and customer satisfaction.",
    rating: 5,
    published: true,
    createdAt: "2023-12-20"
  }
];

export function getPublishedTestimonials(): Testimonial[] {
  return testimonials.filter(t => t.published);
}

export function getTestimonialById(id: string): Testimonial | undefined {
  return testimonials.find(t => t.id === id);
}

