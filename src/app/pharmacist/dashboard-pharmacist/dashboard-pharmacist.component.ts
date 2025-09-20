import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

export interface PeriodicElement {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
  expiry: string;
  button: any;
}

@Component({
  selector: 'app-dashboard-pharmacist',
  templateUrl: './dashboard-pharmacist.component.html',
  styleUrls: ['./dashboard-pharmacist.component.scss']
})
export class DashboardPharmacistComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id', 'name', 'brand', 'category', 'price', 'quantity', 'button'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  totalElements: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadData2();
  }

  loadData2(pageIndex: number = 0, pageSize: number = this.pageSize) {
    let params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString());

    this.http.get<any>(
      "http://localhost:8080/api/v1/pharmacy/get-medicine?id=" + localStorage.getItem("id"), { params }
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

  //////////////////////////////////

  searchKey: string = '';
  list: Array<any> = [];

  loadData() {
    this.http.get<PeriodicElement | PeriodicElement[]>(
      "http://localhost:8080/api/v1/pharmacy/get-medicine-by-name?key=" + this.searchKey + "&id=" + localStorage.getItem("id")
    ).subscribe((res) => {
      if (Array.isArray(res)) {
        this.dataSource = new MatTableDataSource(res);
      } else {
        this.dataSource = new MatTableDataSource([res]);
      }
      this.dataSource.sort = this.sort;
    });
  }

  delete(id: any) {
    if (confirm("Are you sure to delete this record ? " + id)) {
      this.http.delete("http://localhost:8080/api/v1/pharmacy/delete-medicine?medicine=" + id)
        .subscribe(res => {
          alert('Medicine Deleted Successfully..!');
          this.loadData();
        });
    }
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