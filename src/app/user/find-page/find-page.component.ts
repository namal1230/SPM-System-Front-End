import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RequestServiceService } from 'src/app/request-service.service';


export interface PeriodicElement {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
  expiry: string;
  location: string;
  pharmacyName: string;
  button: any;
}

@Component({
  selector: 'app-find-page',
  templateUrl: './find-page.component.html',
  styleUrls: ['./find-page.component.scss']
})
export class FindPageComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'name', 'brand', 'category', 'price', 'quantity', 'location', 'pharmacyName', 'button'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  totalElements: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadData2();
  }

  loadData2(pageIndex: number = 0, pageSize: number = this.pageSize) {
    let params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString());

    this.http.get<any>(
      "http://localhost:8080/api/v1/pharmacy/get-all-medicine", { params }
    ).subscribe((res) => {
      this.dataSource.data = res.content;
      this.totalElements = res.totalElements;
      this.pageIndex = res.number;
      this.pageSize = res.size;
      this.dataSource.sort = this.sort;
    });
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
    } else {
    }
  }

  constructor(private http: HttpClient,
    private request: RequestServiceService
  ) { }

  name: string = "";
  location: string = "";
  qty: number=1;

  loadData() {
    this.http.get<PeriodicElement | PeriodicElement[]>(
      "http://localhost:8080/api/v1/pharmacy/find-medicne-user?name=" + this.name + "&location=" + this.location + "&qty=" + this.qty
    ).subscribe((res) => {
      if (Array.isArray(res)) {
        this.dataSource = new MatTableDataSource(res);
      } else {
        this.dataSource = new MatTableDataSource([res]);
      }

      this.dataSource.sort = this.sort;
    });
  }

  requests(id: any, names: any, pharmacy: any, location: any) {
    if (confirm("Are you sure to request this medicine ? " + id)) {
      this.http.post<any>(this.request.baseUrl + 'user/request-medicine', {
        pharmacyName: pharmacy,
        pharmacyAddress: location,
        medicineName: names,
        medicineId: id,
        requestQuantity: this.qty,
        userId: localStorage.getItem('id')
      })
        .subscribe(res => {
          if (res) {
            alert('Medicine Save SuccessFully..!')
          }
        });
    }
  }

  pay(id: any, names: any, pharmacy: any, location: any) {
    var payment = {
      "sandbox": true,
      "merchant_id": '1232056',
      "return_url": 'http://localhost:4200/',
      "cancel_url": 'http://localhost:4200/',
      "notify_url": 'http://localhost:8080/api/v1/payment/notify',

      "order_id": 'ORDER_' + new Date().getTime(),
      "items": 'Medicine Order',
      "amount": 1000.00,
      "currency": 'LKR',
      "custom_1": "SmartPharmacy",
      "custom_2": "Top-up Wallet",
      "first_name": 'John',
      "last_name": 'Doe',
      "email": 'john@example.com',
      "phone": '0771234567',
      "address": 'No. 123, Main Street',
      "city": 'Colombo',
      "country": 'Sri Lanka',
      "delivery_address": "No. 46, Galle road, Kalutara South",
      "delivery_city": "Kalutara",
      "delivery_country": "Sri Lanka",
      "hash": "45D3CBA93E9F2189BD630ADFE19AA6DC"
    };

    (window as any).payhere.startPayment(payment);
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData2(this.pageIndex, this.pageSize);
  }

  onSearch() {
    this.loadData2(0, this.pageSize);
  }
}
