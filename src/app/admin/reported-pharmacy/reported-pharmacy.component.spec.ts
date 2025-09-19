import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedPharmacyComponent } from './reported-pharmacy.component';

describe('ReportedPharmacyComponent', () => {
  let component: ReportedPharmacyComponent;
  let fixture: ComponentFixture<ReportedPharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportedPharmacyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportedPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
