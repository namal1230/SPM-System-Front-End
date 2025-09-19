import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Chart } from 'chart.js/auto';
import { RequestServiceService } from 'src/app/request-service.service';
import { PeriodicElement } from '../find-page/find-page.component';


@Component({
  selector: 'app-request-overview',
  templateUrl: './request-overview.component.html',
  styleUrls: ['./request-overview.component.scss']
})
export class RequestOverviewComponent implements AfterViewInit{
    @ViewChild('myPieChart') myPieChart!: ElementRef<HTMLCanvasElement>;

constructor(private http: HttpClient
  ) {}

  ngAfterViewInit(): void {
    if (!this.myPieChart) {
      console.error('Canvas element not found!');
      return;
    }

    const ctx = this.myPieChart.nativeElement.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not available!');
      return;
    }

    // Fetch data from API first
    this.http.get<any>("http://localhost:8080/api/v1/user/get-average-count")
      .subscribe((res) => {
        const data1 = res.count1;
        const data2 = res.count2;
        const data3 = res.count3;

        // Now create the chart with actual data
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['Accept', 'Reject', 'Pending'],
            datasets: [{
              data: [data1, data2, data3],
              backgroundColor: [
                'rgba(141, 255, 99, 0.4)',
                'rgba(235, 93, 54, 0.4)',
                'rgba(255, 206, 86, 0.4)'
              ],
              borderColor: [
                'rgba(141, 255, 99, 1)',
                'rgba(235, 93, 54, 1)',
                'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Medicine Status Overview' }
            }
          }
        });
      });
    }
}
