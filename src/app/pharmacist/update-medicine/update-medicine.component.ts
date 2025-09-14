import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestServiceService } from 'src/app/request-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-medicine',
  templateUrl: './update-medicine.component.html',
  styleUrls: ['./update-medicine.component.scss']
})
export class UpdateMedicineComponent {
constructor(private http: HttpClient,
    private request:RequestServiceService
  ) {}

  searchKey: string = '';
    list:Array<any> = [];
  
    loadData(){
      this.http.get<any>(
        "http://localhost:8080/api/v1/pharmacy/get-medicine-by-name?key="+this.searchKey
      ).subscribe((res) => {
        console.log(res);
    
        this.form.patchValue({
          id: res[0].id,
          name: res[0].name,
          brand: res[0].brand,
          category: res[0].category,
          price: res[0].price,
          quantity: res[0].quantity,
          expir: res[0].expiry
        });
      });
    }

    /////////////////////////////////////

  form=new FormGroup({
    id:new FormControl({value: '', disabled: true},Validators.required),
    name:new FormControl('',Validators.required),
    brand:new FormControl('',Validators.required),
    category:new FormControl('',Validators.required),
    price:new FormControl('',Validators.required),
    quantity:new FormControl('',Validators.required),
    expir:new FormControl('',Validators.required),
  })
  updateData() {
    this.http.put<any>(this.request.baseUrl+'pharmacy/update-medicine?id='+this.form.get('id')?.value,{
      name:this.form.get('name')?.value,
      brand:this.form.get('brand')?.value,
      category:this.form.get('category')?.value,
      price:this.form.get('price')?.value,
      quantity:this.form.get('quantity')?.value,
      expiryDate:this.form.get('expir')?.value
    })
    .subscribe(res=>{
      if(res){
        alert('Medicine Updated SuccessFully..!')
      }
    });
  }
}
