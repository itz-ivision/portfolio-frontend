import { Component } from '@angular/core';
import { Service } from 'src/app/core/models';
import { ServiceService } from 'src/app/core/services/service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  
  servicesList: Service[] = [];
  loading = false;
  error: string | null = null;

  constructor(private serviceService: ServiceService,) { }

  ngOnInit(): void {;
    this.loadServices();
  }

  loadServices(): void {
      this.loading = true;
      this.error = null;
  
      this.serviceService.getServices().subscribe({
        next: (response: Service[]) => {
          this.servicesList = response.slice(0, 4);
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load services';
          this.loading = false;
          console.log('Error while fetching the services:', error)
        }
      });
    }
}
