export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  resumeUrl: string;
  status: "pending" | "reviewing" | "interviewed" | "accepted" | "rejected";
  appliedAt: string;
  updatedAt: string;
  
  // Extended fields for recruitment workflow
  pipeline?: "new" | "screening" | "shortlisted" | "interview" | "offer" | "hired" | "rejected";
  priority?: "low" | "medium" | "high" | "urgent";
  source?: "website" | "linkedin" | "referral" | "job_board" | "other";
  assignedTo?: string; // HR/Recruiter ID or name
  rating?: number; // 1-5 stars
  tags?: string[]; // e.g. ["senior", "remote", "urgent"]
  interviewDate?: string;
  interviewType?: "phone" | "video" | "onsite" | "technical";
  notes?: string;
  salary?: {
    expected?: string;
    offered?: string;
  };
  skills?: string[];
  location?: string;
  availability?: string;
}

export const jobApplications: JobApplication[] = [
  {
    id: "app-001",
    jobId: "1",
    jobTitle: "Senior Full Stack Developer",
    fullName: "Nguyen Van A",
    email: "nguyenvana@example.com",
    phone: "+84 901 234 567",
    experience: "5 years 6 months",
    coverLetter: "I am excited to apply for the Senior Full Stack Developer position at VTech. With over 5 years of experience in web development and a strong background in React, Node.js, and Next.js, I am confident I can contribute significantly to your team...",
    resumeUrl: "/uploads/resumes/nguyen-van-a-resume.pdf",
    status: "pending",
    appliedAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "app-002",
    jobId: "2",
    jobTitle: "DevOps Engineer",
    fullName: "Tran Thi B",
    email: "tranthib@example.com",
    phone: "+84 902 345 678",
    experience: "4 years 2 months",
    coverLetter: "As a passionate DevOps Engineer with extensive experience in AWS, Kubernetes, and CI/CD pipelines, I am thrilled about the opportunity to join VTech. My track record includes successfully implementing infrastructure automation...",
    resumeUrl: "/uploads/resumes/tran-thi-b-resume.pdf",
    status: "reviewing",
    appliedAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-15T09:00:00Z"
  },
  {
    id: "app-003",
    jobId: "3",
    jobTitle: "UI/UX Designer",
    fullName: "Le Van C",
    email: "levanc@example.com",
    phone: "+84 903 456 789",
    experience: "3 years 8 months",
    coverLetter: "I am a creative UI/UX Designer with a passion for creating intuitive and beautiful user experiences. My portfolio demonstrates my ability to translate complex requirements into elegant design solutions...",
    resumeUrl: "/uploads/resumes/le-van-c-resume.pdf",
    status: "interviewed",
    appliedAt: "2024-01-13T11:45:00Z",
    updatedAt: "2024-01-15T16:30:00Z"
  },
  {
    id: "app-004",
    jobId: "1",
    jobTitle: "Senior Full Stack Developer",
    fullName: "Pham Thi D",
    email: "phamthid@example.com",
    phone: "+84 904 567 890",
    experience: "6 years",
    coverLetter: "With 6 years of professional experience in full-stack development, I have successfully delivered numerous web applications using modern technologies. I am particularly interested in VTech's innovative approach...",
    resumeUrl: "/uploads/resumes/pham-thi-d-resume.pdf",
    status: "accepted",
    appliedAt: "2024-01-12T09:15:00Z",
    updatedAt: "2024-01-16T11:00:00Z"
  },
  {
    id: "app-005",
    jobId: "4",
    jobTitle: "Technical Project Manager",
    fullName: "Hoang Van E",
    email: "hoangvane@example.com",
    phone: "+84 905 678 901",
    experience: "7 years 3 months",
    coverLetter: "As an experienced Technical Project Manager with a proven track record of delivering complex software projects, I am excited about the opportunity to lead projects at VTech...",
    resumeUrl: "/uploads/resumes/hoang-van-e-resume.pdf",
    status: "pending",
    appliedAt: "2024-01-11T15:30:00Z",
    updatedAt: "2024-01-11T15:30:00Z"
  }
];

export function getApplicationById(id: string): JobApplication | undefined {
  return jobApplications.find(app => app.id === id);
}

export function getApplicationsByJobId(jobId: string): JobApplication[] {
  return jobApplications.filter(app => app.jobId === jobId);
}

export function getApplicationsByStatus(status: JobApplication["status"]): JobApplication[] {
  return jobApplications.filter(app => app.status === status);
}

