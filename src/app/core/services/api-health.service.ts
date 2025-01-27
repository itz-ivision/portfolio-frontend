import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { HealthStatus } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HealthService {
  private readonly API_URL = 'http://127.0.0.1:8000/api/health-check/';
  
  // Poll every 30 seconds and share the result with all subscribers
  public healthStatus$ = interval(30000).pipe(
    switchMap(() => this.fetchHealthStatus()),
    shareReplay(1)
  );

  constructor(private http: HttpClient) {}

  // Initial fetch
  public fetchHealthStatus(): Observable<HealthStatus> {
    return this.http.get<HealthStatus>(this.API_URL).pipe(
      map(response => ({
        Database: response.Database,
        Cache: response.Cache,
        Status: response.Status
      }))
    );
  }
}