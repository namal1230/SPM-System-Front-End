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
  selector: 'app-active-pharmacy',
  templateUrl: './active-pharmacy.component.html',
  styleUrls: ['./active-pharmacy.component.scss']
})
export class ActivePharmacyComponent implements OnInit, AfterViewInit {
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


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  loadData2(pageIndex: number = 0, pageSize: number = this.pageSize) {
    
    let params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('size', pageSize.toString());
    
    this.http.get<any>(
      "http://localhost:8080/api/v1/admin/get-all-pharmacy",{ params }
    ).subscribe((res:any) => {

       this.dataSource.data = res.content; 
        this.totalElements = res.totalElements;
        this.pageIndex = res.number;
        this.pageSize = res.size;   
      this.dataSource.sort = this.sort;
    });
  }

  //////////////////////////////////

  searchKey: string = '';
  list: Array<any> = [];
  
    loadData(){
      this.http.get<PeriodicElement | PeriodicElement[]>(
        "http://localhost:8080/api/v1/admin/find-pharmacy?name="+this.searchKey
      ).subscribe((res) => {
  
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

  report(id: any) {
    if (confirm("Are you sure to report this account ? " + id)) {
      this.http.get("http://localhost:8080/api/v1/admin/update-status-pharmacy?id=" + id)
        .subscribe(res => {
          alert('Pharmacy Status Changed Successfully..!');
          this.loadData2(this.pageIndex,this.pageSize);
        });
    }
  }

  onSearch() {
    this.loadData2(0, this.pageSize);
  }

  pageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData2(this.pageIndex, this.pageSize);
  }

  announceSortChange(sortState: Sort) {
    this.loadData2(this.pageIndex, this.pageSize);
  }

}
