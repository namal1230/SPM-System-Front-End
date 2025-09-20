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
  loading: boolean = false;

  constructor(private http: HttpClient) { }

  sendRequest() {
    this.loading = true;
    this.http.get('http://localhost:8080/api/v1/ai/' + this.question)
      .subscribe((response: any) => {
        this.AIResponse = response.data;
        this.loading = false;
      }, (error) => {
        this.loading = false;
      });
  }
}
