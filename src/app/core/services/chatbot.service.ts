import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { ChatbotApiResponse, ApiResponse } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
    
    constructor(private apiService: ApiService) {}

    getChatResponse(message: string): Observable<ChatbotApiResponse> {
        if (!message || message.trim() === '') {
            console.error('Error: Message is empty or invalid.');
            return of({ response: 'Message cannot be empty.' }); // Return a fallback response
        }
        return this.apiService.getWithParams<ChatbotApiResponse>('/chat-bot/', { query: message });
    }    

}