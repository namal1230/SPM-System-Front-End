import { TestBed } from '@angular/core/testing';

import { DirectionsServiceService } from './directions-service.service';

describe('DirectionsServiceService', () => {
  let service: DirectionsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectionsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
