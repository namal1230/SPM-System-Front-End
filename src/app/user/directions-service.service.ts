import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectionsServiceService {

  private originSource = new BehaviorSubject<string>('');
  origin$ = this.originSource.asObservable();

  setOrigin(value: string) {
    this.originSource.next(value);
  }
}
