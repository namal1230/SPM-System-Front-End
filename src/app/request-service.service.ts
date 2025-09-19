import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestServiceService {

  baseUrl='http://localhost:8080/api/v1/';

  private data = new BehaviorSubject<any>(null);
  currentData = this.data.asObservable();

  constructor(){}

  setData(data: any) {
    this.data.next(data);
  }

}
