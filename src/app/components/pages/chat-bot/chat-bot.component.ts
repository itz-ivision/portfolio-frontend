import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatbotService } from 'src/app/core/services/chatbot.service';
import { ChatbotApiResponse, Message } from 'src/app/core/models';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LucideAngularModule, Send, X, Bot } from 'lucide-angular';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({ height: '*', opacity: 1 })),
      state('closed', style({ height: '0px', opacity: 0 })),
      transition('open <=> closed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class ChatBotComponent implements OnInit, AfterViewChecked{
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  isOpen = false;
  message = '';
  isLoading = false;
  messages: Message[] = [
    {
      text: `Welcome! 👋
            I’m ThirdEyeBot, your AI assistant. I’m here to assist you with any questions you have about ThirdEyeVision, its services, and the visionary behind it, Arnab Gupta.`,
      isBot: true,
      timestamp: new Date()
    }          
  ];

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit() {
    LucideAngularModule.pick({ Send, X, Bot });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  sendMessage(): void {
    if (!this.message.trim() || this.isLoading) return;

    const userMessage: Message = {
      text: this.message,
      isBot: false,
      timestamp: new Date()
    };

    this.messages = [...this.messages, userMessage];
    const userInput = this.message;
    this.message = '';
    this.isLoading = true;

    this.chatbotService.getChatResponse(userInput).subscribe({
      next: (response) => {
        console.log(response);
        const botMessage: Message = {
          text: response.response,
          isBot: true,
          timestamp: new Date()
        };
        this.messages = [...this.messages, botMessage];
      },
      error: (error) => {
        console.error('Error getting chatbot response:', error);
        const errorMessage: Message = {
          text: "I'm sorry, I encountered an error. Please try again later.",
          isBot: true,
          timestamp: new Date()
        };
        this.messages = [...this.messages, errorMessage];
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
