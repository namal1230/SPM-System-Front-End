import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  id: number;
  name: string;
  brand: string;
  category: string;
  quantity: number;
  userName: string;
  userEmail: string;
  button: string;
}

@Component({
  selector: 'app-user-reqest-pending',
  templateUrl: './user-reqest-pending.component.html',
  styleUrls: ['./user-reqest-pending.component.scss']
})

export class UserReqestPendingComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'brand', 'category', 'quantity', 'userName', 'userEmail', 'button'];
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
      "http://localhost:8080/api/v1/user/get-all-request?id=" + localStorage.getItem("id"), { params }
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
   this.loadData2(this.pageIndex, this.pageSize);
  }

  constructor(private http: HttpClient) { }

  searchKey: string = "";

  loadData() {
    this.http.get<PeriodicElement | PeriodicElement[]>(
      "http://localhost:8080/api/v1/user/get-all-request-name?name=" + this.searchKey + "&id=" + localStorage.getItem("id")
    ).subscribe((res:any) => {
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

  accept(id: any) {
    if (confirm("Are you sure to accept this request ? " + id)) {
      this.http.get("http://localhost:8080/api/v1/user/update-user-request?id=" + id)
        .subscribe(res => {
          alert('Pharmacy Status Changed Successfully..!');
          this.loadData();
        });
    }
  }

  reject(id: any) {
    if (confirm("Are you sure to reject this request ? " + id)) {
      this.http.get("http://localhost:8080/api/v1/user/reject-user-request?id=" + id)
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
