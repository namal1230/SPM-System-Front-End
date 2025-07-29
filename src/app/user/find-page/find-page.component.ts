import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'}
];

@Component({
  selector: 'app-find-page',
  templateUrl: './find-page.component.html',
  styleUrls: ['./find-page.component.scss']
})
export class FindPageComponent implements AfterViewInit {
  google: any;
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: google.maps.Map;
  directionsService!: google.maps.DirectionsService;
  directionsRenderer!: google.maps.DirectionsRenderer;

  ngAfterViewInit() {
    this.initMapAndRoute();
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
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  clickedRows = new Set<PeriodicElement>();
}
