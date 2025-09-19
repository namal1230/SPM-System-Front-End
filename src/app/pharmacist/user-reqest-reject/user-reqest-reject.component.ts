import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RequestServiceService } from 'src/app/request-service.service';
export interface PeriodicElement {
  id:number;
  name: string;
  brand: string;
  category: string;
  quantity: number;
  userName: string;
  userEmail: string;
}
@Component({
  selector: 'app-user-reqest-reject',
  templateUrl: './user-reqest-reject.component.html',
  styleUrls: ['./user-reqest-reject.component.scss']
})
export class UserReqestRejectComponent {
displayedColumns: string[] = ['id','name', 'brand', 'category','quantity','userName','userEmail'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
   this.http.get<PeriodicElement | PeriodicElement[]>(
     "http://localhost:8080/api/v1/user/get-all-request-reject?id="+localStorage.getItem("id")
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

  constructor(private http: HttpClient,
      private request:RequestServiceService
  ) {}

    searchKey:string="";
    loadData(){
      this.http.get<PeriodicElement | PeriodicElement[]>(
        "http://localhost:8080/api/v1/user/get-request-name-reject?name="+this.searchKey+"&id="+localStorage.getItem("id")
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
}
