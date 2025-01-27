import { Component, OnInit } from '@angular/core';
import { GithubRepo } from 'src/app/core/models';
import { PortfolioService } from 'src/app/core/services/portfolio.service';

@Component({
  selector: 'app-portfolio-projects-list',
  templateUrl: './portfolio-projects-list.component.html',
  styleUrls: ['./portfolio-projects-list.component.scss']
})
export class PortfolioProjectsListComponent implements OnInit{
  
  projectsList: GithubRepo[] = [];
  filteredProjectList: GithubRepo[] = [];
  searchQuery: string = '';
  isFiltered: boolean = false;
  loading = false;
  error: string | null = null;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.error = null;

    this.portfolioService.getGithubRepos().subscribe({
      next: (response: GithubRepo[]) =>{
        this.projectsList = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load projects!';
        this.loading = false;
        console.log('Error while fetching projects  :  ', error)
      }
    });

  }

  searchProject(): void {
    if (!this.searchQuery.trim()) {
      this.isFiltered = false; // Reset to show all posts if query is empty
      return;
    }

    this.portfolioService.searchGithubRepos(this.searchQuery).subscribe({
      next: (response) => {
        this.filteredProjectList = response;
        this.isFiltered = true; // Show filtered posts
      },
      error: (error) => {
        this.error = 'Failed to filter blog posts';
        console.error('Error filtering blog posts:', error);
      }
    });

    this.searchQuery = ''; // Clear the search input
  }

}
