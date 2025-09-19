import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { RequestServiceService } from 'src/app/request-service.service';


export interface PeriodicElement {
  id:number;
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
  expiry: string;
  location: string;
  pharmacyName:string;
  button: any;
}

@Component({
  selector: 'app-find-page',
  templateUrl: './find-page.component.html',
  styleUrls: ['./find-page.component.scss']
})
export class FindPageComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id','name', 'brand', 'category','price','quantity','location','pharmacyName','button'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  @ViewChild(MatSort) sort!: MatSort;

  // google: any;
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  // map!: google.maps.Map;
  // directionsService!: google.maps.DirectionsService;
  // directionsRenderer!: google.maps.DirectionsRenderer;

  ngOnInit(): void {
   this.http.get<PeriodicElement | PeriodicElement[]>(
     "http://localhost:8080/api/v1/pharmacy/get-all-medicine"
   ).subscribe((res) => {
     console.log(res);

     if (Array.isArray(res)) {
       // Case: backend returns a list
       this.dataSource = new MatTableDataSource(res);
     } else {
       // Case: backend returns a single object
       this.dataSource = new MatTableDataSource([res]);
     }

     this.dataSource.sort = this.sort;
   });
 }


  ngAfterViewInit() {
     this.dataSource.sort = this.sort;
  }

   announceSortChange(sortState: Sort) {
     if (sortState.direction) {
       console.log(`Sorted ${sortState.direction}ending`);
     } else {
       console.log('Sorting cleared');
     }
   }

  // initMapAndRoute() {
  //   const mapOptions = {
  //     center: { lat: 7.2906, lng: 80.6337 }, // Central Sri Lanka
  //     zoom: 8
  //   };

    // this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    // this.directionsService = new google.maps.DirectionsService();
    // this.directionsRenderer = new google.maps.DirectionsRenderer();

    // this.directionsRenderer.setMap(this.map);

    // const routeRequest = {
    //   origin: 'Colombo, Sri Lanka',
    //   destination: 'Kandy, Sri Lanka',
    //   travelMode: google.maps.TravelMode.DRIVING
    // };

    // this.directionsService.route(routeRequest, (result: any, status: any) => {
    //   if (status === 'OK') {
    //     this.directionsRenderer.setDirections(result);
    //   } else {
    //     console.error('Error fetching directions', status);
    //   }
    // });
  // }

  constructor(private http: HttpClient,
      private request:RequestServiceService
  ) {}


    name:string="";
    location:string="";
    qty:number=0;
    loadData(){
      this.http.get<PeriodicElement | PeriodicElement[]>(
        "http://localhost:8080/api/v1/pharmacy/find-medicne-user?name="+this.name+"&location="+this.location+"&qty="+this.qty
    ).subscribe((res) => {
      console.log(res);

      if (Array.isArray(res)) {
        // Case: backend returns a list
        this.dataSource = new MatTableDataSource(res);
      } else {
        // Case: backend returns a single object
        this.dataSource = new MatTableDataSource([res]);
      }

      this.dataSource.sort = this.sort;
    });
    }

    requests(id:any,names:any,pharmacy:any,location:any){
      if(confirm("Are you sure to request this medicine ? "+id)){
        this.http.post<any>(this.request.baseUrl+'user/request-medicine',{
          pharmacyName:pharmacy,
          pharmacyAddress:location,
          medicineName:names,
          medicineId:id,
          requestQuantity:this.qty,
          userId:localStorage.getItem('id')
        })
        .subscribe(res=>{
          if(res){
            alert('Medicine Save SuccessFully..!')
          }
        });
      }
    }

     pay(id:any,names:any,pharmacy:any,location:any){
      const payment = {
      sandbox: true,
      merchant_id: '1232056', // from PayHere sandbox
      return_url: 'http://localhost:4200/',
      cancel_url: 'http://localhost:4200/',
      notify_url: 'http://localhost:8080/api/v1/payment/notify', // backend webhook

      order_id: 'ORDER_' + new Date().getTime(),
      items: 'Medicine Order',
      amount:  1000.00, // total amount
      currency: 'LKR',
      custom_1: "SmartPharmacy",
      custom_2: "Top-up Wallet",
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      phone: '0771234567',
      address: 'No. 123, Main Street',
      city: 'Colombo',
      country: 'Sri Lanka'
    };

    // Open PayHere checkout
    (window as any).payhere.startPayment(payment);
  }
}
