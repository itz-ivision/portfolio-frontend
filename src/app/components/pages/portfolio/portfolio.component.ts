import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPost, Certificate, GithubRepo, Resume, Skill, SkillsCategory } from 'src/app/core/models';
import { BlogService } from 'src/app/core/services/blog.service';
import { PortfolioService } from 'src/app/core/services/portfolio.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit{
  title = 'Data Scientist Portfolio';
  currentYear = new Date().getFullYear();
  email1 = "arnab.gupta.ar7@gmail.com"
  email2 = "arnab@thirdivision.in"

  educations = [
    {
      title: "Diploma in Computer Science and Eng",
      clg: "Techno India University, West Bengal",
      desc: "Completed a Diploma in Computer Science and Engineering, acquiring a strong foundation in computer science concepts, software development, and system design. The program emphasized practical skills in programming, data structures, and algorithms, equipping students with the technical expertise to solve real-world problems in the IT industry.",
      year: "2015-2018"
    },
    {
      title: "B.Tech in Computer Science and Eng",
      clg: "Techno India University, West Bengal",
      desc: "Pursued a Bachelor’s degree in Computer Science and Engineering, focusing on advanced topics in software development, computer systems, data analytics, and artificial intelligence. The program included hands-on projects, coding assignments, and industry-oriented training, preparing graduates for roles in software engineering, data science, and IT management. Graduated with comprehensive knowledge of modern computing technologies, tools, and methodologies.",
      year: "2018-2021"
    }
  ]

  experiences = [
    {
      company: 'Personal Freelancer',
      location: '',
      period: 'November 2021 - December 2022',
      role: 'Backend Developer',
      description:
        'Worked in Django backend as per requirements, building RESTful APIs using Django REST Framework.',
      tags: ['Django', 'Backend', 'API Development'],
    },
    {
      company: 'VirSoftech Pvt. Ltd.',
      location: '',
      period: 'December 2023 - May 2024',
      role: 'Software Quality Engineer Intern',
      description:
        'Testing and deployment of software applications, ensuring quality and performance standards.',
      tags: ['Software Testing', 'Quality Analysis', 'Deployment'],
    },
  ];
  
  certificates: Certificate[] = [];    
  skillsCategories: SkillsCategory[] = [];
  skills: Skill[] = [];
  projectsList: GithubRepo[] = [];
  blogPosts: BlogPost[] = [];
  resumes: Resume[] = [];
  pdfResumeUrl: string | null = null;
  docxResumeUrl: string | null = null;
  docxResumes: Resume[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private portfolioService: PortfolioService,
    private blogService: BlogService, 
    private router: Router) {}

  ngOnInit(): void {
    this.loadCertificates();
    this.loadSkillCat();
    this.loadProjects();
    this.loadBlogPosts();
    this.loadResumes();
  }

  loadCertificates(): void {
    this.loading = true;
    this.error = null;

    this.portfolioService.getCertificates().subscribe({
      next: (response: Certificate[]) => {
        this.certificates = response.slice(0, 3);
        this.loading = false;
      },
      error: (error) => {
        this.error = "Failed to load certificates!";
        this.loading = false;
        console.log("Error while loading certificates : ", error)
      }
    });
  }

  loadSkillCat(): void {
    this.loading = true;
    this.error = null;

    this.portfolioService.getSkillCategories().subscribe({
      next: (response: SkillsCategory[]) =>{
        this.skillsCategories = response.slice(0, 3);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load skills!';
        this.loading = false;
        console.log('Error while fetching skills  :  ', error)
      }
    })
  }

  loadSkills(): void {
    this.loading = true;
    this.error = null;

    this.portfolioService.getSkills().subscribe({
      next: (response: Skill[]) =>{
        this.skills = response.slice(0, 3);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load skills!';
        this.loading = false;
        console.log('Error while fetching skills  :  ', error)
      }
    })
  }

  loadProjects(): void {
    this.loading = true;
    this.error = null;

    this.portfolioService.getGithubRepos().subscribe({
      next: (response: GithubRepo[]) =>{
        this.projectsList = response.slice(0, 3);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load projects!';
        this.loading = false;
        console.log('Error while fetching projects  :  ', error)
      }
    });
  }

  navigateToBlogPost(id: string): void {
    this.router.navigate(['/blog', id]);
  }

  loadBlogPosts(): void {
    this.loading = true;
    this.error = null;

    this.blogService.getBlogPosts().subscribe({
      next: (response) => {
        // Slice the first 3 blog posts
        this.blogPosts = response.slice(0, 3);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load blog posts';
        this.loading = false;
        console.error('Error loading blog posts:', error);
      }
    });
  }

  loadResumes(): void {
    this.loading = true;
    this.error = null;
  
    this.portfolioService.getResumes().subscribe({
      next: (response) => {
        this.resumes = response;
  
        // Filter resumes based on format
        const pdfResume = this.resumes.find((resume) => resume.resume_format === 'pdf');
        const docxResume = this.resumes.find((resume) => resume.resume_format === 'docx');
  
        // Assign to class variables for template access
        this.pdfResumeUrl = pdfResume?.resume_url || null; 
        this.docxResumeUrl = docxResume?.resume_url || null;
  
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load resumes!';
        this.loading = false;
        console.error('Error while fetching resumes:', error);
      }
    });
  }
  

}
