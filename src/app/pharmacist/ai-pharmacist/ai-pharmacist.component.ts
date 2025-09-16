import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RequestServiceService } from '../../request-service.service';

@Component({
  selector: 'app-ai-pharmacist',
  templateUrl: './ai-pharmacist.component.html',
  styleUrls: ['./ai-pharmacist.component.scss']
})
export class AiPharmacistComponent {
  question: string = '';
  AIResponse: string = '';
  constructor(private http:HttpClient,
    private baseURL:RequestServiceService
  ) {}
  sendRequest() {
    // Logic to send the question to the AI service and handle the response
    console.log('Question sent to AI:', this.question);
    this.http.get('http://localhost:8080/api/v1/ai/'+ this.question)
      .subscribe((response: any) => {
        console.log('AI Response:', response.data);
        this.AIResponse = response.data;
        // Handle the AI response (e.g., display it in the UI)
      }, (error) => {
        console.error('Error occurred while communicating with AI service:', error);
      });
  }
}
