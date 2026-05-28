export type UserRole = "recruiter" | "candidate";
export type EmploymentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship";
export type ApplicationStatus = "applied" | "shortlisted" | "rejected";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  resumeUrl?: string;
}

export interface Job {
  _id: string;
  recruiterId: string;
  title: string;
  location: string;
  employmentType: EmploymentType;
  salaryRange: string;
  description: string;
  closed: boolean;
  createdAt: string;
}

export interface Application {
  _id: string;
  jobId: Job | string;
  candidateId: User | string;
  coverLetter: string;
  status: ApplicationStatus;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface CreateJobData {
  title: string;
  location: string;
  employmentType: EmploymentType;
  salaryRange: string;
  description: string;
}

export interface ApplyJobData {
  coverLetter: string;
}
