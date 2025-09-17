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
  button: any;
}

@Component({
  selector: 'app-find-page',
  templateUrl: './find-page.component.html',
  styleUrls: ['./find-page.component.scss']
})
export class FindPageComponent implements AfterViewInit, OnInit {
  
  displayedColumns: string[] = ['id','name', 'brand', 'category','price','quantity','button'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  
  @ViewChild(MatSort) sort!: MatSort;
  



  google: any;
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: google.maps.Map;
  directionsService!: google.maps.DirectionsService;
  directionsRenderer!: google.maps.DirectionsRenderer;

  ngOnInit(): void {
   this.http.get<PeriodicElement | PeriodicElement[]>(
     "http://localhost:8080/api/v1/pharmacy/get-medicine"
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
     this.initMapAndRoute();
   }
 
   announceSortChange(sortState: Sort) {
     if (sortState.direction) {
       console.log(`Sorted ${sortState.direction}ending`);
     } else {
       console.log('Sorting cleared');
     }
   }

  initMapAndRoute() {
    const mapOptions = {
      center: { lat: 7.2906, lng: 80.6337 }, // Central Sri Lanka
      zoom: 8
    };

    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();

    this.directionsRenderer.setMap(this.map);

    const routeRequest = {
      origin: 'Colombo, Sri Lanka',
      destination: 'Kandy, Sri Lanka',
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(routeRequest, (result: any, status: any) => {
      if (status === 'OK') {
        this.directionsRenderer.setDirections(result);
      } else {
        console.error('Error fetching directions', status);
      }
    });
  }
  constructor(private http: HttpClient,
      private request:RequestServiceService
    ) {}
  
    form=new FormGroup({
      name:new FormControl('',Validators.required),
      brand:new FormControl('',Validators.required),
      category:new FormControl('',Validators.required),
      price:new FormControl('',Validators.required),
      quantity:new FormControl('',Validators.required),
      expir:new FormControl('',Validators.required),
    })
    createData() {
      this.http.post<any>(this.request.baseUrl+'pharmacy/save-medicine',{
        name:this.form.get('name')?.value,
        brand:this.form.get('brand')?.value,
        category:this.form.get('category')?.value,
        price:this.form.get('price')?.value,
        quantity:this.form.get('quantity')?.value,
        expiryDate:this.form.get('expir')?.value
      })
      .subscribe(res=>{
        if(res){
          alert('Medicine Save SuccessFully..!')
        }
      });
    }
    searchKey:string="";
    loadData(){}
}
