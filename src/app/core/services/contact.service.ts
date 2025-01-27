import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ApiResponse, ContactMessage } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private apiService: ApiService) {}

  /**
   * Send a new contact message
   */
  sendMessage(message: ContactMessage): Observable<ContactMessage> {
    return this.apiService.post<ContactMessage>('/contact/create/', message);
  }

}