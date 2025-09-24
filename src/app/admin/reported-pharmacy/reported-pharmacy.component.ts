import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  id: number;
  address: string;
  name: string;
  phone: String;
  status: String;
  button: any;
}
@Component({
  selector: 'app-reported-pharmacy',
  templateUrl: './reported-pharmacy.component.html',
  styleUrls: ['./reported-pharmacy.component.scss']
})
export class ReportedPharmacyComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'address', 'name', 'phone', 'status', 'button'];
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
      "http://localhost:8080/api/v1/admin/get-reported-pharmacy", { params }
    ).subscribe((res) => {
      const page = res.data;
      this.dataSource.data = page.content;
      this.totalElements = page.totalElements;
      this.pageIndex = page.number;
      this.pageSize = page.size;
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
      "http://localhost:8080/api/v1/admin/find-reported-pharmacy?name=" + this.searchKey
    ).subscribe((res: any) => {
      const page = res.data;
      if (Array.isArray(page)) {
        this.dataSource = new MatTableDataSource(page);
      } else {
        this.dataSource = new MatTableDataSource([page]);
      }

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  active(id: any) {
    if (confirm("Are you sure to re-Active this account ? " + id)) {
      this.http.get("http://localhost:8080/api/v1/admin/reactive-status-Pharmacy?id=" + id)
        .subscribe(res => {
          alert('Pharmacy Status Changed Successfully..!');
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
    this.pageIndex = 0;
    if (this.searchKey.trim() !== '') {
      this.loadData();
    } else {
      this.loadData2(this.pageIndex, this.pageSize); // reload all
    }
  }
}
