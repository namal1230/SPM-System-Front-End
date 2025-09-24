import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { DirectionsServiceService } from '../directions-service.service';
import { ActivatedRoute } from '@angular/router';

declare module 'leaflet' {
  namespace Routing {
    function control(options: any): any;
    function osrmv1(options?: any): any;
  }
}


delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: 'assets/leaf-green.png',
  shadowUrl: 'assets/leaf-shadow.png',
});

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements AfterViewInit,OnInit{

  private map!: L.Map;
  private routingControl: any;

  origin: string = '';
  destination: string = '';
  summary: string = '';
  steps: string[] = [];
  constructor(private locationService: DirectionsServiceService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id) {
      this.destination = id;
      if (this.origin) this.getDirections();
    }
  });

  }

  async ngAfterViewInit(): Promise<void> {
    this.map = L.map('map').setView([6.9271, 79.8612], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  async getDirections() {
    if (!this.destination) {
      alert('Please enter a destination');
      return;
    }

    const originCoords = await this.resolveLocation(this.origin);
    const destCoords = await this.resolveLocation(this.destination);

    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
    }

    this.routingControl = L.Routing.control({
      waypoints: [
        L.latLng(originCoords.lat, originCoords.lon),
        L.latLng(destCoords.lat, destCoords.lon)
      ],
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1'
      }),
      showAlternatives: false,
      routeWhileDragging: false
    }).addTo(this.map);

    await this.loadStepByStep(originCoords, destCoords);
  }

  private async resolveLocation(query: string): Promise<{ lat: number, lon: number }> {
    if (query.includes(',')) {
      const parts = query.split(',').map(s => parseFloat(s.trim()));
      return { lat: parts[0], lon: parts[1] };
    }

    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!data.length) throw new Error('Address not found');
    return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
  }

  private async loadStepByStep(origin: { lat: number, lon: number }, dest: { lat: number, lon: number }) {
    const url = `https://router.project-osrm.org/route/v1/driving/${origin.lon},${origin.lat};${dest.lon},${dest.lat}?overview=false&steps=true`;
    const res = await fetch(url);
    const data = await res.json();

    this.steps = [];
    this.summary = '';

    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      this.summary = `Distance: ${(route.distance / 1000).toFixed(2)} km, Duration: ${(route.duration / 60).toFixed(1)} min`;

      for (const leg of route.legs) {
        for (const step of leg.steps) {
          this.steps.push(step.maneuver.instruction || 'Continue');
        }
      }
    }
  }
}
