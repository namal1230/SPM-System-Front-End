import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';

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
  selector: 'app-dashboard-pharmacist',
  templateUrl: './dashboard-pharmacist.component.html',
  styleUrls: ['./dashboard-pharmacist.component.scss']
})
export class DashboardPharmacistComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['id','name', 'brand', 'category','price','quantity','button'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

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
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      console.log(`Sorted ${sortState.direction}ending`);
    } else {
      console.log('Sorting cleared');
    }
  }

  //////////////////////////////////

  searchKey: string = '';
  list:Array<any> = [];

  loadData(){
    this.http.get<PeriodicElement | PeriodicElement[]>(
      "http://localhost:8080/api/v1/pharmacy/get-medicine-by-name?key="+this.searchKey
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

  delete(id:any){
    if(confirm("Are you sure to delete this record ? "+id)){
      this.http.delete("http://localhost:8080/api/v1/pharmacy/delete-medicine?medicine="+id)
      .subscribe(res=>{
        alert('Medicine Deleted Successfully..!');
        this.loadData();
      });
    }
  }

}