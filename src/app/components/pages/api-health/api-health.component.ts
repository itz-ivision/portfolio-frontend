import { Component } from '@angular/core';
import { HealthStatus } from 'src/app/core/models';
import { BehaviorSubject, catchError, map } from 'rxjs';
import { HealthService } from 'src/app/core/services/api-health.service';

interface StatusItem {
  name: string;
  status: string;
}

@Component({
  selector: 'app-api-health',
  templateUrl: './api-health.component.html',
  styleUrls: ['./api-health.component.scss']
})
export class ApiHealthComponent {
  statuses$ = new BehaviorSubject<StatusItem[]>([]);
  lastUpdated = new BehaviorSubject<string>(new Date().toLocaleTimeString());
  error: string | null = null;
  
  isAllOperational$ = this.statuses$.pipe(
    map(statuses => statuses.every(status => status.status === 'OK'))
  );

  constructor(private healthService: HealthService) {}

  ngOnInit() {
    // Initial fetch
    this.fetchStatus();

    // Subscribe to periodic updates
    this.healthService.healthStatus$.pipe(
      catchError(error => {
        this.error = 'Unable to connect to the status service';
        throw error;
      })
    ).subscribe(status => {
      this.updateStatus(status);
    });
  }

  private fetchStatus() {
    this.healthService.fetchHealthStatus().pipe(
      catchError(error => {
        this.error = 'Unable to connect to the status service';
        throw error;
      })
    ).subscribe(status => {
      this.updateStatus(status);
    });
  }

  private updateStatus(status: HealthStatus) {
    const statusItems: StatusItem[] = [
      { name: 'Database', status: status.Database },
      { name: 'Cache', status: status.Cache },
      { name: 'Status', status: status.Status }
    ];
    
    console.log(statusItems);

    this.statuses$.next(statusItems);
    this.lastUpdated.next(new Date().toLocaleTimeString());
    this.error = null;
  }
}
