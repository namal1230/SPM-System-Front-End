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
        "http://localhost:8080/api/v1/pharmacy/get-medicine-by-name?key="+this.searchKey+"&id="+localStorage.getItem("id")
      ).subscribe((res) => {
        console.log(res);
    
        this.form.patchValue({
          id: res.id,
          name: res.name,
          brand: res.brand,
          category: res.category,
          price: res.price,
          quantity: res.quantity,
          expir: res.expiry
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
      expiry:this.form.get('expir')?.value
    })
    .subscribe(res=>{
      if(res){
        alert('Medicine Updated SuccessFully..!')
      }
    });
  }
}
