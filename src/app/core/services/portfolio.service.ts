import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Certificate, GithubRepo, Resume, Skill, ApiResponse, SkillsCategory } from '../models';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  constructor(private apiService: ApiService) {}

  // Get all certificates
  getCertificates(): Observable<Certificate[]> {
    return this.apiService.get<Certificate[]>(`/portfolio/certificates/`);
  }

  getGithubRepo(id: string): Observable<ApiResponse<GithubRepo>> {
    return this.apiService.get<ApiResponse<GithubRepo>>(`/portfolio/github/github-repo/${id}`);
  }

  getGithubRepos(): Observable<GithubRepo[]> {
    return this.apiService.get<GithubRepo[]>('/portfolio/github/github-repos/');
  }

  searchGithubRepos(searchTerm: string): Observable<GithubRepo[]> {
    return this.apiService.getWithParams<GithubRepo[]>('/portfolio/github/github-repos/', {
      query: searchTerm
    });
  }

  getResumes(): Observable<Resume[]> {
    return this.apiService.get<Resume[]>('/portfolio/resume');
  }

  getSkills(): Observable<Skill[]> {
    return this.apiService.get<Skill[]>('/portfolio/skills');
  }

  getSkillCategories(): Observable<SkillsCategory[]> {
    return this.apiService.get<SkillsCategory[]>('/portfolio/skills/categories');
  }

}