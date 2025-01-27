import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse, Service, Technology } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private readonly endpoint = '/services';

  constructor(private apiService: ApiService) {}

  getServices(): Observable<Service[]> {
    return this.apiService.get<Service[]>(`${this.endpoint}`);
  }

  getService(id: number): Observable<ApiResponse<Service>> {
    return this.apiService.get<ApiResponse<Service>>(`${this.endpoint}/${id}`);
  }

  searchServicesByTechnology(technology: string): Observable<Service[]> {
    return this.apiService.getWithParams<Service[]>(`${this.endpoint}`, {
      search: technology
    });
  }

  getServiceTechnologies(): Observable<Technology[]> {
    return this.apiService.get<Technology[]>(`${this.endpoint}/technologies/`);
  }

  getTechnology(id: number): Observable<ApiResponse<Technology>> {
    return this.apiService.get<ApiResponse<Technology>>(`${this.endpoint}/technology/${id}`)
  }
   
}