import { Component, OnInit } from '@angular/core';
import { ApiResponse, Service, Technology } from 'src/app/core/models';
import { ServiceService } from 'src/app/core/services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit{
  servicesList: Service[] = [];
  technologiesList: Technology[] = [];
  filteredService: Service[] = [];
  searchQuery: string = '';
  isFiltered: boolean = false;
  showButton: boolean = true;
  loading = false;
  error: string | null = null;

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.loadServices();
    this.loadTechnologies()
  }

  loadServices(): void {
    this.loading = true;
    this.error = null;
    this.showButton = false;

    this.serviceService.getServices().subscribe({
      next: (response: Service[]) => {
        this.servicesList = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load services';
        this.loading = false;
        console.log('Error while fetching the services:', error)
      }
    });
  }

  searchServicesByTechnology(): void {

    if (!this.searchQuery.trim()) {
      this.isFiltered = false; // Reset to show all posts if query is empty
      return;
    }

    console.log(this.searchQuery);
    if (this.searchQuery.length <1) {
      this.error = 'Write something to search'
    }
    this.serviceService.searchServicesByTechnology(this.searchQuery).subscribe({
      next: (response) => {
        this.filteredService = response;
        this.isFiltered = true;
      },
      error: (error) => {
        console.log('Error loading services:', error);
        this.error = 'Failed to fetch services!'
      }
    });
    this.searchQuery = '';
  }

  loadTechnologies(): void {
    this.loading = true;
    this.error = null;
  
    this.serviceService.getServiceTechnologies().subscribe({
      next: (response: Technology[]) => {
        // Access the `data` property which contains the array of Technologies
        this.technologiesList = response;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load services technologies';
        this.loading = false;
        console.log('Error while fetching the services technologies:', error);
      }
    });
  }

}
