// Common interfaces
export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
  }
  
  export interface HealthStatus {
    Database: string;
    Cache: string;
    Status: string;
  }

  // About
  // export interface AboutPage {
  //   id: string;
  //   content: string;
  // }
  
  // BlogCategory
  export interface BlogCategory {
    id: number; 
    name: string;
    description?: string; // Optional field
  }  

  // BlogTag
  export interface Tag {
    id: number; 
    name: string;
  }
  
  // BlogPost
  export interface BlogPost {
    id: string; 
    title: string;
    slug?: string; // Optional field
    content: string;
    excerpt?: string; // Optional field
    author: number; 
    categories: BlogCategory[]; // Many-to-many relationship
    tags: Tag[]; // Many-to-many relationship
    image?: string; // Optional field, URL or path to the image
    published_date: string; // Date-time in ISO 8601 format
  }
  
  export type ContactReason = 'inquiry' | 'hire' | 'support' | 'collaboration' | 'other';

  export interface ContactMessage {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    reason: ContactReason;
    other_reason?: string;
    message: string;
    sent_at?: string;
    read?: boolean;
  }

  export const CONTACT_REASONS: { value: ContactReason; label: string }[] = [
    { value: 'inquiry', label: 'General Inquiry' },
    { value: 'hire', label: 'Hire' },
    { value: 'support', label: 'Support Request' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'other', label: 'Other' }
  ];

  // Chatbot
  export interface ChatbotApiResponse {
    response: string;
  }  

  export interface Message {
    text: string;
    isBot: boolean;
    timestamp: Date;
  }

  // Portfolio

  // Certificates
  export interface Certificate {
    id?: string;
    title: string;
    description: string;
    issuer: string;
    date: string;
    link: string;
    previewImage: string;
  }  

    // Github Repo
  export interface GithubRepo {
    name: string;
    description: string | null;
    image: string;
    video: string;
    url: string;
    stars: number;
    forks: number;
    language: string | null;
    created_at: string;
  }
  
  export interface Resume {
    id: number;                 
    title: string;            
    resume_format: string;     
    resume_url: string;      
    created_at: string; 
    updated_at: string;  
  }
  
  export interface SkillsCategory {
    id: number;
    name: string;
    description?: string;
    skills?: Skill[];
  }
  
  export interface Skill {
    id: number;
    name: string;
    proficiency: number;
    category: number;
    description?: string;
  }
  
  export interface Technology {
    id: number;
    name: string;
    description?: string;
    version?: string;
    website?: string;
    icon_url?: string
  }

  export interface Service {
    id: number;
    title: string;
    description: string;
    pricing: number;
    duration: string;
    technologies: Technology[];
    image?: string;
    is_active: boolean;
    featured: boolean;
    created_at: string;
    updated_at: string;
  }
  
  // Testimonials

  export interface Testimonial {
    id: string;
    client_name: string;
    client_position?: string;
    client_company?: string;
    testimonial_text: string;
    client_photo_url?: string;
    rating: number;
    is_featured: boolean;
    created_at: string;
  }
  