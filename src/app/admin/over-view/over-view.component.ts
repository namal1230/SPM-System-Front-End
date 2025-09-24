import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-over-view',
  templateUrl: './over-view.component.html',
  styleUrls: ['./over-view.component.scss']
})
export class OverViewComponent implements AfterViewInit {

  @ViewChild('myPieChart') myPieChart!: ElementRef<HTMLCanvasElement>;

  constructor(private http: HttpClient
  ) { }

  ngAfterViewInit(): void {
    if (!this.myPieChart) {
      return;
    }

    const ctx = this.myPieChart.nativeElement.getContext('2d');
    if (!ctx) {
      return;
    }

    this.http.get<any>("http://localhost:8080/api/v1/admin/get-average-count")
      .subscribe((res) => {
        const data1 = res.data.count1;
        const data2 = res.data.count2;
        const data3 = res.data.count3;
        const data4 = res.data.count4;
        const data5 = res.data.count5;

        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['User', 'Pharmacy', 'Pharmacy Request', 'Report User', 'Report Pharmacy'],
            datasets: [{
              data: [data4, data1, data3, data5, data2],
              backgroundColor: [
                'rgba(213, 99, 255, 0.4)',
                'rgba(54, 190, 235, 0.4)',
                'rgba(218, 255, 86, 0.4)',
                'rgba(255, 182, 86, 0.4)',
                'rgba(255, 86, 86, 0.4)'
              ],
              borderColor: [
                'rgba(195, 99, 255, 1)',
                'rgba(54, 235, 223, 1)',
                'rgba(187, 255, 86, 1)',
                'rgba(255, 187, 86, 1)',
                'rgba(255, 86, 86, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'User Status Overview' }
            }
          }
        });
      });
  }
}
