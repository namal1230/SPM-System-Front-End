import { HttpClient } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestServiceService } from 'src/app/request-service.service';

@Component({
  selector: 'app-save-medicine',
  templateUrl: './save-medicine.component.html',
  styleUrls: ['./save-medicine.component.scss']
})
export class SaveMedicineComponent {
  
  constructor(private http: HttpClient,
    private request: RequestServiceService
  ) { }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    expir: new FormControl('', Validators.required),
  })
  
  createData() {
    this.http.post<any>(this.request.baseUrl + 'pharmacy/save-medicine', {
      name: this.form.get('name')?.value,
      brand: this.form.get('brand')?.value,
      category: this.form.get('category')?.value,
      price: this.form.get('price')?.value,
      quantity: this.form.get('quantity')?.value,
      expiry: this.form.get('expir')?.value,
      userId: localStorage.getItem("id")
    })
      .subscribe(res => {
        if (res) {
          alert('Medicine Save SuccessFully..!')
        }
      });
  }
}
