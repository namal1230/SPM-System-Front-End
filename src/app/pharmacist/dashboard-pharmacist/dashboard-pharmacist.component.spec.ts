import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPharmacistComponent } from './dashboard-pharmacist.component';

describe('DashboardPharmacistComponent', () => {
  let component: DashboardPharmacistComponent;
  let fixture: ComponentFixture<DashboardPharmacistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPharmacistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardPharmacistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
